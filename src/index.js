import { createFreebuffAuth } from "@freebuff/auth";
import { Hono } from "hono";
import { app } from "./api.js";

export default {
  async fetch(request, env, ctx) {
    const auth = createFreebuffAuth({
      clientId: env.FREEBUFF_CLIENT_ID,
      baseUrl: env.APP_ORIGIN,
      allowInsecureLocalhost: env.APP_ORIGIN && env.APP_ORIGIN.startsWith("http://localhost")
    });

    let user = null;
    try {
      user = await auth.getUser(request);
    } catch {
      // If Freebuff auth is not configured for this environment, skip it.
    }

    // Expose the Freebuff user for downstream handlers via a header.
    const userHeader = user ? JSON.stringify(user) : "";
    const requestWithUser = new Request(request.url, request);
    requestWithUser.headers.set("x-freebuff-user", userHeader);
    return app.fetch(requestWithUser, env, ctx);
  }
};

// Static assets (favicon, styles, app.js, manifest) are served through the
// Freebuff Sites ASSETS binding in production. In local dev they are served by
// wrangler from ./public automatically when assets.directory is configured.
