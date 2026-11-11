import { createFreebuffAuth } from "@freebuff/auth";
import { Hono } from "hono";
import { app } from "./api.js";

export default {
  async fetch(request, env, ctx) {
    // Freebuff auth is optional for this app: the OTP + PIN flow is the app's
    // own auth and must work even when Freebuff auth is not configured for an
    // environment (missing vars, etc.). If createFreebuffAuth fails, skip it
    // and leave the Freebuff user empty so the app still serves requests.
    let auth = null;
    try {
      auth = createFreebuffAuth({
        clientId: env.FREEBUFF_CLIENT_ID,
        issuer: env.FREEBUFF_ISSUER,
        baseUrl: env.APP_ORIGIN,
        allowInsecureLocalhost: env.APP_ORIGIN && env.APP_ORIGIN.startsWith("http://localhost")
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[UDAAN] Freebuff auth not configured for this environment:", e && e.message ? e.message : e);
    }

    let user = null;
    if (auth) {
      try {
        user = await auth.getUser(request);
      } catch {
        // Freebuff auth check failed; user stays null.
      }
    }

    // Expose the Freebuff user for downstream handlers via a header (empty when
    // Freebuff auth is not available).
    const userHeader = user ? JSON.stringify(user) : "";
    const requestWithUser = new Request(request.url, request);
    requestWithUser.headers.set("x-freebuff-user", userHeader);

    try {
      const response = await app.fetch(requestWithUser, env, ctx);

      // If the Hono app did not handle the request (for example a static asset
      // like /app.js, /styles.css, /favicon.svg or /manifest.json), fall back to
      // the Freebuff Sites ASSETS binding so those files are served in production.
      // In local dev wrangler serves ./public automatically when assets.directory is
      // configured, so this path is only hit in production for unmatched requests.
      if (response.status === 404 && env.ASSETS) {
        return env.ASSETS.fetch(requestWithUser);
      }
      return response;
    } catch (e) {
      // Temporary diagnostics: surface the real error and the available env so we
      // can see why a route 500s in the deployed preview. Remove once the app is
      // verified working.
      const dbBound = !!(env && env.DB);
      const clientId = env && env.FREEBUFF_CLIENT_ID ? env.FREEBUFF_CLIENT_ID.slice(0, 12) + "…" : null;
      const issuer = env && env.FREEBUFF_ISSUER || null;
      const origin = env && env.APP_ORIGIN || null;
      const nodeEnv = env && env.NODE_ENV || null;
      const body = JSON.stringify({
        error: e && e.message ? e.message : String(e),
        env: { dbBound, clientId, issuer, origin, nodeEnv }
      });
      return new Response(body, {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
      });
    }
  }
};

// Static assets (favicon, styles, app.js, manifest) are served through the
// Freebuff Sites ASSETS binding in production. In local dev they are served by
// wrangler from ./public automatically when assets.directory is configured.
