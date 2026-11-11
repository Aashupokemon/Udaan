import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { hashPassword, verifyPassword, hashPin, verifyPin } from "./hash.js";
import {
  withDb,
  migrate,
  getOne,
  createUser,
  getUserByPhone,
  setPassword,
  setPin,
  getUserPin,
  upsertOtp,
  verifyOtp,
  createSession,
  getSession,
  deleteSession,
  getResource,
  seedDefaultResources,
  getDb,
  CATEGORIES,
  RESOURCES
} from "./db.js";
import { generateOtp, normalizePhone, codeMatches } from "./otp.js";

export const app = new Hono();

app.all("/*", cors());
app.all("/*", logger());
app.all("/*", prettyJSON());

const OTP_TTL_SECONDS = 180;
const SESSION_TTL_DAYS = 7;

const TEXT_HTML = {
  en: {
    title: "UDAAN",
    tagline: "Help that reaches you.",
    phoneLabel: "Mobile number",
    phonePlaceholder: "+919876543210",
    otpTitle: "Check your phone",
    otpSubtitle: "We sent a 6-digit code to your number.",
    otpHint: "Code expires in a few minutes.",
    nextLabel: "I have the code",
    resendLabel: "Resend code",
    resendHint: "Code not received? Try again.",
    registerTitle: "Set up your UDAAN account",
    registerSubtitle: "Create a password and a quick PIN you can use to sign in fast.",
    passwordLabel: "Password",
    passwordHint: "Use something only you know.",
    pinLabel: "PIN (4-6 digits)",
    pinHint: "You'll use this to sign in quickly.",
    pinConfirmLabel: "Confirm PIN",
    confirmMismatch: "PINs do not match.",
    setPasswordTitle: "Almost done",
    setPasswordSubtitle: "You've signed in with your code. Add a password and PIN so you can sign in next time without waiting for a code.",
    loginTitle: "Sign in to UDAAN",
    loginSubtitle: "Sign in once with a code, then save a PIN for fast sign-in.",
    meTitle: "Your UDAAN account",
    resourcesTitle: "Available help",
    resourcesSubtitle: "Basic, public information to get started. Verified local data comes later.",
    categoriesLabel: "What kind of help are you looking for?",
    disclaimer: "UDAAN is not an emergency service. If someone is in immediate danger, call local emergency services (for example 112).",
    footerNote: "Udaan app - demo build",
    otpSent: "Code sent.",
    otpVerified: "Code verified.",
    success: "Done.",
    errorBadPhone: "Enter a valid mobile number with country code.",
    errorOtpSent: "Could not send the code. Try again.",
    errorOtpBad: "Check the code and try again.",
    errorOtpUsed: "This code has already been used. Request a new one.",
    errorOtpExpired: "The code expired. Request a new one.",
    errorOtpAttempts: "Too many tries. Request a new code.",
    errorNoAccount: "No account found for this number. Start with a code to create one.",
    errorPasswordShort: "Password must be at least 8 characters.",
    errorPinShort: "PIN must be 4-6 digits.",
    errorPinMismatch: "PINs do not match.",
    errorPasswordWeak: "Pick a stronger password.",
    errorSessionInvalid: "Sign in again.",
    errorUnknown: "Something went wrong. Try again.",
    signIn: "Sign in",
    browseHelp: "Browse help",
    sendCode: "Send code",
    noAccount: "New here? Start here.",
    back: "Back",
    accountNameFallback: "Account",
    pinSignIn: "Sign in with PIN",
    signOut: "Sign out",
    language: "App language",
    otherHelp: "Other help",
    comingSoon: "This part is still landing.",
    comingSoonSub: "The app shell is here; the next page is being built.",
    home: "Back home",
    trustCopy1: "Phone number only - no email required.",
    trustCopy2: "PIN sign-in you can use fast.",
    trustCopy3: "Starts with public sample data."
  },
  hi: {
    title: "उड़ान",
    tagline: "जो तुम तक पहुँचे।",
    phoneLabel: "मोबाइल नंबर",
    phonePlaceholder: "+919876543210",
    otpTitle: "अपने फ़ोन की जाँच करें",
    otpSubtitle: "हमने तुम्हारे नंबर पर 6 अंकों का कोड भेजा है।",
    otpHint: "कोड कुछ मिनट में समाप्त होता है।",
    nextLabel: "कोड मिल गया",
    resendLabel: "कोड दोबारा भेजें",
    resendHint: "कोड नहीं मिला? दोबारा試試।",
    registerTitle: "अपना UDAAN अकाउंट सेट करें",
    registerSubtitle: "एक पासवर्ड और एक जल्दी साइनइन के लिए PIN बनाएँ।",
    passwordLabel: "पासवर्ड",
    passwordHint: "सिर्फ अपनी जानकारी वाला कुछ चुनें।",
    pinLabel: "PIN (4-6 अंक)",
    pinHint: "तुम इसे जल्दी साइनइन के लिए इस्तेमाल करोगे।",
    pinConfirmLabel: "PIN दोबारा लिखें",
    confirmMismatch: "PIN मेल नहीं रहे।",
    setPasswordTitle: "लगभग पूरा",
    setPasswordSubtitle: "तुमने कोड से साइनइन कर लिया है। अगली बार बिना कोड के साइनइन करने के लिए पासवर्ड और PIN जोड़ें।",
    loginTitle: "UDAAN में साइनइन करें",
    loginSubtitle: "एक बार कोड से साइनइन करें, फिर तेज़ी से साइनइन के लिए PIN सहेजें।",
    meTitle: "तुम्हारा UDAAN अकाउंट",
    resourcesTitle: "उपलब्ध मदद",
    resourcesSubtitle: "शुरू करने के लिए बुनियादी सार्वजनिक जानकारी। बाद में पुष्टि की गई स्थानीय जानकारी आएगी।",
    categoriesLabel: "तुम किस तरह की मदद खोज रहे हो?",
    disclaimer: "UDAAN आपातकालीन सेवा नहीं है। यदि किसी को तुरंत खतरा है, तो स्थानीय आपातकालीन सेवाओं को कॉल करें (उदाहरण के लिए 112)।",
    footerNote: "उड़ान ऐप - डेमो",
    otpSent: "कोड भेजा गया।",
    otpVerified: "कोड पुष्टि हो गया।",
    success: "हो गया।",
    errorBadPhone: "देश का कोड सहित एक मान्य मोबाइल नंबर डालें।",
    errorOtpSent: "कोड नहीं भेज सके। दोबारा試試।",
    errorOtpBad: "कोड जाँचें और दोबारा試試।",
    errorOtpUsed: "यह कोड पहले ही इस्तेमाल हो चुका है। नए कोड का अनुरोध करें।",
    errorOtpExpired: "कोड समाप्त हो गया। नए कोड का अनुरोध करें।",
    errorOtpAttempts: "बहुत बार Trying। नए कोड का अनुरोध करें।",
    errorNoAccount: "इस नंबर का कोई अकाउंट नहीं मिला। अकाउंट बनाने के लिए कोड से शुरू करें।",
    errorPasswordShort: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
    errorPinShort: "PIN 4-6 अंकों का होना चाहिए।",
    errorPinMismatch: "PIN मेल नहीं रहे।",
    errorPasswordWeak: "ज़्यादा मज़बूत पासवर्ड चुनें।",
    errorSessionInvalid: "दोबारा साइनइन करें।",
    errorUnknown: "कुछ गड़बड़ हो गया। दोबारा試試।"
  }
};

function t(locale, key, fallbackKey = "en") {
  const dict = TEXT_HTML[locale] || TEXT_HTML.en;
  return dict[key] ?? TEXT_HTML[fallbackKey][key] ?? key;
}

function page(locale, titleKey, body, { showBack = false, dataTestId, headExtra = "" } = {}) {
  const out = [];
  out.push(`<!doctype html>`);
  out.push(`<html lang="${locale}">`);
  out.push(`<head>`);
  out.push(`<meta charset="utf-8">`);
  out.push(`<meta name="viewport" content="width=device-width, initial-scale=1">`);
  out.push(`<title>${t(locale, titleKey)}</title>`);
  out.push(`<meta name="theme-color" content="#0d2a2a">`);
  out.push(`<link rel="manifest" href="/manifest.json">`);
  out.push(`<link rel="icon" href="/favicon.svg" type="image/svg+xml">`);
  out.push(`<link rel="stylesheet" href="/styles.css">`);
  out.push(headExtra);
  out.push(`</head>`);
  out.push(`<body>`);
  out.push(`<a class="skip-link" href="#main">Skip to content</a>`);
  out.push(`<header class="site-header">`);
  out.push(`<div class="brand">`);
  out.push(`<svg class="brand-mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">`);
  out.push(`<path d="M3 20 C 6 14, 10 9, 16 7 C 22 9, 26 14, 29 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`);
  out.push(`<path d="M16 7 L 16 26" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`);
  out.push(`</svg>`);
  out.push(`<span class="brand-name">${t(locale, "title")}</span>`);
  out.push(`</div>`);
  if (showBack) {
    out.push(`<nav class="site-nav" aria-label="Back">`);
    out.push(`<a href="/" class="back-link" data-i18n="back">Back</a>`);
    out.push(`</nav>`);
  }
  out.push(`<div class="header-shell"></div>`);
  out.push(`<button type="button" class="lang-toggle" id="lang-toggle" aria-label="Switch language"></button>`);
  out.push(`</header>`);
  out.push(`<main id="main" class="container" role="main">`);
  out.push(body);
  out.push(`</main>`);
  out.push(`<footer class="site-footer">`);
  out.push(`<p class="footer-note" data-i18n="footerNote">${escapeHtml(t(locale, "footerNote"))}</p>`);
  out.push(`<p class="disclaimer" data-i18n="disclaimer">${escapeHtml(t(locale, "disclaimer"))}</p>`);
  out.push(`</footer>`);
  out.push(`<script type="application/json" id="app-state">${JSON.stringify({ locale, dataTestId })}<\/script>`);
  out.push(`<script type="module" src="/app.js"><\/script>`);
  out.push(`</body>`);
  out.push(`</html>`);
  return out.join("\n");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFreebuffUser(c) {
  try {
    return JSON.parse(c.req.header("x-freebuff-user") || "null");
  } catch {
    return null;
  }
}

function readAppSession(c, db) {
  const sessionCookie = c.req.header("cookie")?.split("; ").find((line) => line.startsWith("session="))?.split("=")[1];
  if (!sessionCookie) return null;
  return getSession(db, sessionCookie);
}

app.on(["GET", "POST"], "/", async (c) => {
  return c.html(
    page("en", "tagline", `
      <section class="landing-hero">
        <div class="hero-copy">
          <h1 class="hero-title">${escapeHtml(t("en", "tagline"))}</h1>
          <p class="hero-sub">Support that follows through. Sign in with your mobile number to get started.</p>
          <div class="hero-actions">
            <a href="/login" class="btn btn-primary" data-i18n="signIn">Sign in</a>
            <a href="/resources" class="btn btn-ghost" data-i18n="browseHelp">Browse help</a>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <svg class="hero-wing" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 70 C 25 100, 60 120, 100 120 C 140 120, 175 100, 190 70" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M100 120 L 100 70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M30 90 C 55 105, 85 115, 100 115" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
            <path d="M170 90 C 145 105, 115 115, 100 115" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          </svg>
        </div>
      </section>
      <section class="landing-trust">
        <div class="trust-grid">
          <div class="trust-item"><span class="trust-mark" aria-hidden="true">✓</span><span class="trust-text" data-i18n="trustCopy1">Phone number only - no email required.</span></div>
          <div class="trust-item"><span class="trust-mark" aria-hidden="true">✓</span><span class="trust-text" data-i18n="trustCopy2">PIN sign-in you can use fast.</span></div>
          <div class="trust-item"><span class="trust-mark" aria-hidden="true">✓</span><span class="trust-text" data-i18n="trustCopy3">Starts with public sample data.</span></div>
        </div>
      </section>
    `, { dataTestId: "landing" })
  );
});

app.get("/login", async (c) => {
  return c.html(
    page("en", "loginTitle", `
      <section class="card flow">
        <h1 class="card-title" data-i18n="loginTitle">${escapeHtml(t("en", "loginTitle"))}</h1>
        <p class="card-sub" data-i18n="loginSubtitle">${escapeHtml(t("en", "loginSubtitle"))}</p>
        <form class="phone-form" method="POST" action="/api/auth/otp/request" data-i18n-form="login">
          <label class="field" for="login-phone" data-i18n="phoneLabel">${escapeHtml(t("en", "phoneLabel"))}</label>
          <input id="login-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="${escapeHtml(t("en", "phonePlaceholder"))}" required class="input">
          <button type="submit" class="btn btn-primary btn-full" data-i18n="sendCode">Send code</button>
        </form>
        <p class="switch">
          <a href="/" data-i18n="noAccount">New here? Start here.</a>
        </p>
      </section>
    `, { showBack: true, dataTestId: "login" })
  );
});

app.get("/me", async (c) => {
  const freebuffUser = getFreebuffUser(c);
  if (freebuffUser) {
    const language = "en";
    const body = `
      <section class="card flow">
        <div class="account-head">
          <div class="account-avatar" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="40" height="40"><circle cx="16" cy="12" r="6" fill="currentColor"/><path d="M4 28 C 8 24, 12 24, 16 26 C 20 24, 24 24, 28 28 Z" fill="currentColor"/></svg>
          </div>
          <div>
            <h1 class="account-name">${escapeHtml(t(language, "accountNameFallback") || "Account")}</h1>
            <p class="account-phone">${escapeHtml(freebuffUser.email || "")}</p>
          </div>
        </div>
        <div class="account-actions">
          <button type="button" class="btn btn-ghost btn-full" id="pin-signin-btn" data-i18n="pinSignIn">Sign in with PIN</button>
          <button type="button" class="btn btn-ghost btn-full" id="signout-btn" data-i18n="signOut">Sign out</button>
        </div>
        <div class="account-country row-sm">
          <span class="label" data-i18n="language">App language</span>
          <span class="value" data-i18n-lang="${language === "hi" ? "hi" : "en"}">${language === "hi" ? "हिंदी" : "English"}</span>
        </div>
      </section>
    `;
    return c.html(page(language, "meTitle", body, { showBack: true, dataTestId: "me" }));
  }

  return c.redirect("/login");
});

app.get("/resources", async (c) => {
  const language = "en";
  const categories = CATEGORIES;
  const resources = RESOURCES;

  const body = `
    <section class="card flow">
      <h1 class="card-title" data-i18n="resourcesTitle">${escapeHtml(t(language, "resourcesTitle"))}</h1>
      <p class="card-sub" data-i18n="resourcesSubtitle">${escapeHtml(t(language, "resourcesSubtitle"))}</p>
      <div class="categories" role="list">
        ${categories.map(c => {
          const items = resources.filter(r => r.category === c.id);
          if (!items.length) return "";
          return `
            <div class="category" role="listitem">
              <button type="button" class="category-btn" data-category="${escapeHtml(c.id)}" aria-expanded="false">
                <span class="category-icon" aria-hidden="true">${categoryIcon(c.icon)}</span>
                <span class="category-label">${escapeHtml(c["label" + (language === "hi" ? "Hi" : "En")])}</span>
              </button>
              <div class="category-list" hidden>
                ${items.map(r => resourceCard(language, r)).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
  return c.html(page(language, "resourcesTitle", body, { showBack: true, dataTestId: "resources" }));
});

app.post("/api/auth/otp/request", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.phone !== "string") {
    return c.json({ ok: false, error: t("en", "errorBadPhone") }, 400);
  }
  const phone = normalizePhone(body.phone);
  if (!phone) {
    return c.json({ ok: false, error: t("en", "errorBadPhone") }, 400);
  }

  const db = await withDb((db) => db, c.env);

  try {
    const existing = await getUserByPhone(db, phone);
    if (!existing) {
      await createUser(db, phone, null, "en");
    }
  } catch (err) {
    console.error("otp request user check failed", err);
    return c.json({ ok: false, error: t("en", "errorUnknown") }, 500);
  }

  const code = generateOtp(6);
  try {
    await upsertOtp(db, phone, code, OTP_TTL_SECONDS);
  } catch (err) {
    console.error("otp upsert failed", err);
    return c.json({ ok: false, error: t("en", "errorOtpSent") }, 500);
  }

  console.log(`[UDAAN demo OTP] phone=${phone} code=${code}`);

  return c.json({
    ok: true,
    message: t("en", "otpSent"),
    demoCode: process.env.NODE_ENV !== "production" ? code : void 0
  });
});

app.post("/api/auth/otp/verify", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.phone !== "string" || typeof body.code !== "string") {
    return c.json({ ok: false, error: t("en", "errorBadPhone") }, 400);
  }
  const phone = normalizePhone(body.phone);
  if (!phone) {
    return c.json({ ok: false, error: t("en", "errorBadPhone") }, 400);
  }

  const db = await withDb((db) => db, c.env);

  const result = await verifyOtp(db, phone, body.code);
  if (!result.ok) {
    const errorKey = {
      no_valid_otp: "errorOtpExpired",
      too_many_attempts: "errorOtpAttempts",
      bad_code: "errorOtpBad"
    }[result.reason] || "errorUnknown";
    return c.json({ ok: false, error: t("en", errorKey) }, 400);
  }

  const user = await getUserByPhone(db, phone);
  if (!user) {
    return c.json({ ok: false, error: t("en", "errorNoAccount") }, 400);
  }

  const sessionId = await createSession(db, user.id);
  c.cookie("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60
  });

  const needsSetup = !user.password_hash;
  return c.json({
    ok: true,
    message: t("en", "otpVerified"),
    needsSetup,
    userId: user.id,
    demoCode: process.env.NODE_ENV !== "production" ? null : undefined
  });
});

app.post("/api/auth/register", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.userId !== "number") {
    return c.json({ ok: false, error: t("en", "errorUnknown") }, 400);
  }

  const db = await withDb((db) => db, c.env);

  const pwd = body.password;
  if (typeof pwd !== "string" || pwd.length < 8) {
    return c.json({ ok: false, error: t("en", "errorPasswordShort") }, 400);
  }
  if (/\s{2,}/.test(pwd)) {
    return c.json({ ok: false, error: t("en", "errorPasswordWeak") }, 400);
  }

  const pin = body.pin;
  if (!pin || !/^\d{4,6}$/.test(pin)) {
    return c.json({ ok: false, error: t("en", "errorPinShort") }, 400);
  }
  const pinConfirm = body.pinConfirm;
  if (pin !== pinConfirm) {
    return c.json({ ok: false, error: t("en", "errorPinMismatch") }, 400);
  }

  const passwordHash = await hashPassword(pwd);
  const pinHash = await hashPin(pin);

  try {
    await setPassword(db, body.userId, passwordHash);
    await setPin(db, body.userId, pinHash, "one_tap");
  } catch (err) {
    console.error("register finish failed", err);
    return c.json({ ok: false, error: t("en", "errorUnknown") }, 500);
  }

  return c.json({ ok: true, message: t("en", "success") });
});

app.post("/api/auth/pin", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.userId !== "number" || typeof body.pin !== "string") {
    return c.json({ ok: false, error: t("en", "errorUnknown") }, 400);
  }

  const db = await withDb((db) => db, c.env);

  const row = await getOne(db, "SELECT phone FROM users WHERE id = ?1", body.userId);
  const user = row ? await getUserByPhone(db, row.phone) : null;
  if (!user || !user.pin_hash) {
    return c.json({ ok: false, error: t("en", "errorNoAccount") }, 400);
  }

  const ok = await verifyPin(body.pin, user.pin_hash);
  if (!ok) {
    return c.json({ ok: false, error: t("en", "errorOtpBad") }, 400);
  }

  const sessionId = c.req.header("cookie")?.split("; ").find((line) => line.startsWith("session="))?.split("=")[1];
  if (sessionId) {
    await deleteSession(db, sessionId);
  }
  const newSessionId = await createSession(db, user.id);
  c.cookie("session", newSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60
  });

  return c.json({
    ok: true,
    message: t("en", "success")
  });
});

app.get("/api/me", async (c) => {
  const freebuffUser = getFreebuffUser(c);
  if (freebuffUser) {
    return c.json({
      ok: true,
      user: {
        id: freebuffUser.sub,
        phone: freebuffUser.email || null,
        displayName: freebuffUser.name || null,
        language: "en"
      }
    });
  }

  const sessionCookie = c.req.header("cookie")?.split("; ").find((line) => line.startsWith("session="))?.split("=")[1];
  if (!sessionCookie) {
    return c.json({ ok: false, error: t("en", "errorSessionInvalid") }, 401);
  }
  const db = await withDb((db) => db, c.env);
  const session = await getSession(db, sessionCookie);
  if (!session) {
    return c.json({ ok: false, error: t("en", "errorSessionInvalid") }, 401);
  }
  return c.json({
    ok: true,
    user: {
      id: session.user_id,
      phone: session.phone,
      displayName: session.display_name || null,
      language: session.language || "en"
    }
  });
});

app.post("/api/auth/signout", async (c) => {
  const sessionId = c.req.header("cookie")?.split("; ").find((line) => line.startsWith("session="))?.split("=")[1];
  if (sessionId) {
    try {
      const db = await getDb(c.env);
      await deleteSession(db, sessionId);
    } catch (err) {
      console.error("signout session delete failed", err);
    }
  }
  c.cookie("session", "", { path: "/", maxAge: 0 });
  return c.json({ ok: true });
});

app.get("/api/resources", async (c) => {
  return c.json({ ok: true, categories: CATEGORIES, resources: RESOURCES });
});

app.get("/api/language", async (c) => {
  return c.json({ ok: true, language: "en" });
});

app.post("/api/language", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || !body.language || !["en", "hi"].includes(body.language)) {
    return c.json({ ok: false, error: t("en", "errorUnknown") }, 400);
  }

  const freebuffUser = getFreebuffUser(c);
  if (freebuffUser) {
    try {
      const db = await withDb((db) => db, c.env);
      await db.prepare("UPDATE users SET language = ?1, updated_at = datetime('now') WHERE id = ?2").run(body.language, freebuffUser.sub);
      return c.json({ ok: true, language: body.language });
    } catch (err) {
      console.error("language update failed for freebuff user", err);
      return c.json({ ok: false, error: t("en", "errorUnknown") }, 500);
    }
  }

  const sessionCookie = c.req.header("cookie")?.split("; ").find((line) => line.startsWith("session="))?.split("=")[1];
  if (!sessionCookie) {
    return c.json({ ok: false, error: t("en", "errorSessionInvalid") }, 401);
  }
  try {
    const db = await withDb((db) => db, c.env);
    const session = await getSession(db, sessionCookie);
    if (!session) {
      return c.json({ ok: false, error: t("en", "errorSessionInvalid") }, 401);
    }
    await db.prepare("UPDATE users SET language = ?1, updated_at = datetime('now') WHERE id = ?2").run(body.language, session.user_id);
    return c.json({ ok: true, language: body.language });
  } catch (err) {
    console.error("language update failed for session user", err);
    return c.json({ ok: false, error: t("en", "errorUnknown") }, 500);
  }
});

app.onError((err, c) => {
  const body = JSON.stringify({
    error: err && err.message ? err.message : String(err)
  });
  return new Response(body, {
    status: 500,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
});

app.notFound((c) => {
  const accept = c.req.header("accept") || "";
  if (accept.includes("text/html")) {
    return c.html(
      page("en", "title", `
        <section class="card flow">
          <h1 class="card-title" data-i18n="comingSoon">This part is still landing.</h1>
          <p class="card-sub" data-i18n="comingSoonSub">The app shell is here; the next page is being built.</p>
          <a href="/" class="btn btn-primary" data-i18n="home">Back home</a>
        </section>
      `, { dataTestId: "notfound" })
    );
  }
  return c.json({ ok: false, error: "not found" }, 404);
});

function maskPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return phone;
  const visible = digits.slice(-4);
  const masked = digits.slice(0, -4).replace(/\d/g, "•");
  return "+" + masked + visible;
}

function categoryIcon(icon) {
  const icons = {
    alert: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M12 2 L 12 22 M 5 20 L 12 4 L 19 20 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/></svg>",
    shield: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M12 3 L 4 7 L 4 12 C 4 17 7 21 12 23 C 17 21 20 17 20 12 L 20 7 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/><path d='M9 12 L 11 14 L 15 10' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
    heart: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M12 21 C 4 16, 4 8, 12 8 C 20 8, 20 16, 12 21 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/><path d='M12 14 L 12 18' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>",
    home: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M3 12 L 12 4 L 21 12 L 21 20 L 3 20 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/><path d='M9 20 L 9 14 L 15 14 L 15 20' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/></svg>",
    scale: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M6 5 C 3 8, 3 11, 6 14 L 6 20 L 18 20 L 18 14 C 21 11, 21 8, 18 5 L 12 4' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/><path d='M12 4 L 12 20' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>",
    book: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M4 4 H 20 V 20 H 4 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/><path d='M8 4 V 20 M 12 4 V 20 M 16 4 V 20' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>",
    people: "<svg viewBox='0 0 24 24' width='18' height='18'><circle cx='9' cy='7' r='3' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><circle cx='17' cy='9' r='2' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><path d='M3 22 C 5 18, 7 16, 9 16 C 11 16, 13 18, 15 22 L 3 22 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/><path d='M16 16 C 17 18, 18 20, 19 22 L 13 22' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/></svg>",
    care: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M12 2 C 8 6, 7 10, 9 14 L 11 18 L 13 18 L 15 14 C 17 10, 16 6, 12 2 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/></svg>",
    plane: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M3 12 L 7 10 L 10 13 L 14 9 L 17 11 L 21 12' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/><path d='M3 12 C 5 8, 9 9, 12 9 C 15 9, 19 8, 21 12' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>",
    wheelchair: "<svg viewBox='0 0 24 24' width='18' height='18'><circle cx='9' cy='19' r='3' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><circle cx='9' cy='19' r='1.5' fill='currentColor' stroke='none'/><path d='M6 12 L 12 12 L 12 5 L 20 5 L 20 7 L 12 7' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/></svg>",
    more: "<svg viewBox='0 0 24 24' width='18' height='18'><circle cx='12' cy='5' r='2' fill='currentColor'/><circle cx='12' cy='12' r='2' fill='currentColor'/><circle cx='12' cy='19' r='2' fill='currentColor'/></svg>"
  };
  return icons[icon] || icons.more;
}

function resourceCard(language, r) {
  const t = (key) => {
    const en = r[key];
    const hi = r[key + "Hi"] || r[key.replace("En", "Hi")] || r[key];
    return language === "hi" && hi ? hi : en;
  };
  const val = r.value;
  const note = r["note" + (language === "hi" ? "Hi" : "En")] || null;
  return `
    <article class="resource-card">
      <div class="resource-head">
        <span class="resource-type" data-type="${escapeHtml(r.type)}">${escapeHtml(r.type.replace("-", " "))}</span>
        ${val ? `<span class="resource-value">${escapeHtml(val)}</span>` : ""}
      </div>
      <h3 class="resource-title">${escapeHtml(t("title"))}</h3>
      <p class="resource-body">${escapeHtml(t("body"))}</p>
      ${note ? `<p class="resource-note">${escapeHtml(note)}</p>` : ""}
      <div class="resource-meta">
        ${r.region ? `<span class="resource-region">${escapeHtml("Region: " + r.region)}</span>` : ""}
      </div>
    </article>
  `;
}
