const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function readState() {
  try {
    return JSON.parse($("#app-state").textContent || "{}");
  } catch {
    return {};
  }
}

async function json(body) {
  const res = await fetch(body.url, {
    method: body.method || "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body.data)
  });
  return res.json().catch(() => ({ ok: false, error: "Network error" }));
}

function toast(msg) {
  const existing = $("#toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.id = "toast";
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("in"));
  setTimeout(() => {
    el.classList.remove("in");
    setTimeout(() => el.remove(), 200);
  }, 2600);
}

async function setCookie(name, value, opts = {}) {
  const expires = opts.maxAge ? `; max-age=${opts.maxAge}` : "";
  const secure = opts.secure ? "; secure" : "";
  const path = opts.path ? `; path=${opts.path}` : "; path=/";
  const sameSite = opts.sameSite ? `; samesite=${opts.sameSite}` : "";
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}${secure}${path}${sameSite}`;
}

function readCookie(name) {
  const parts = document.cookie.split("; ").reduce((acc, part) => {
    const [k, ...v] = part.split("=");
    if (k === name) acc = decodeURIComponent(v.join("="));
    return acc;
  }, "");
  return parts || null;
}

function removeCookie(name) {
  setCookie(name, "", { maxAge: 0, path: "/" });
}

async function refreshMe() {
  const res = await fetch("/api/me", { credentials: "same-origin" });
  if (!res.ok) throw new Error("session");
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "session");
  return data.user;
}

async function navigate(path) {
  // Simple push-state navigation for in-app links that should not reload the Worker HTML.
  // For this demo we mostly rely on real navigation; this is a placeholder for future SPA routing.
  window.location.href = path;
}

// ---------------------------------------------------------------------------
// Language toggle
// ---------------------------------------------------------------------------

async function applyLanguage(lang) {
  const res = await fetch("/api/language", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ language: lang })
  });
  const data = await res.json();
  if (!data.ok && lang !== "en") {
    toast("Language change failed. Try again.");
  }
  // Optimistically update visible text by reloading the current page in the current locale.
  window.location.reload();
}

// ---------------------------------------------------------------------------
// OTP request + verify flow (login → verify → register/set password+pIN)
// ---------------------------------------------------------------------------

async function sendOtp(phone, form) {
  const res = await json({ url: "/api/auth/otp/request", data: { phone } });
  if (!res.ok) {
    toast(res.error || "Could not send code.");
    return false;
  }
  toast(res.message || "Code sent.");
  if (res.demoCode && window.location.hostname === "localhost") {
    // In demo mode during local dev, show the code so the reviewer can test OTP verify.
    const existing = $("#demo-code");
    if (!existing) {
      const el = document.createElement("p");
      el.id = "demo-code";
      el.className = "demo-code";
      el.textContent = "Demo code: " + res.demoCode + " (this appears only on localhost in demo mode)";
      const formEl = form || $("#login-phone").closest(".phone-form");
      if (formEl) formEl.after(el);
    }
  }
  return true;
}

async function verifyOtp(phone, code) {
  const res = await json({ url: "/api/auth/otp/verify", data: { phone, code } });
  if (!res.ok) {
    toast(res.error || "Check the code and try again.");
    return null;
  }
  return res;
}

async function finishRegistration(userId, password, pin, pinConfirm) {
  const res = await json({ url: "/api/auth/register", data: { userId, password, pin, pinConfirm } });
  if (!res.ok) {
    toast(res.error || "Could not finish setup.");
    return false;
  }
  toast(res.message || "Done.");
  return true;
}

async function pinSignIn(userId, pin) {
  const res = await json({ url: "/api/auth/pin", data: { userId, pin } });
  if (!res.ok) {
    toast(res.error || "PIN did not match.");
    return false;
  }
  toast(res.message || "Signed in.");
  window.location.reload();
  return true;
}

async function signOut() {
  await fetch("/api/auth/signout", { method: "POST", credentials: "same-origin" });
  removeCookie("session");
  window.location.href = "/login";
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------

function wire() {
  const state = readState();

  // Language toggle if present on the page
  const langToggle = $("#lang-toggle");
  if (langToggle) {
    const current = state.locale || "en";
    langToggle.textContent = current === "hi" ? "English" : "हिंदी";
    langToggle.onclick = () => applyLanguage(current === "hi" ? "en" : "hi");
  }

  // Phone OTP send
  const phoneForm = $(".phone-form");
  if (phoneForm) {
    phoneForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const phone = $("#login-phone").value.trim();
      if (!phone) return;
      const ok = await sendOtp(phone, phoneForm);
      if (ok) {
        $("#login-phone").value = "";
      }
    });
  }

  // OTP verify form (the verify step uses a hidden phone field or re-entry depending on the route).
  const verifyForm = $(".verify-form");
  if (verifyForm) {
    verifyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const phone = ($("#verify-phone").value || "").trim();
      const code = ($("#verify-code").value || "").trim();
      if (!phone || !code) return;
      const res = await verifyOtp(phone, code);
      if (!res) return;
      if (res.needsSetup) {
        // Move to password + PIN setup
        const setupCard = $("#setup-card");
        if (setupCard) {
          setupCard.hidden = false;
          const setupForm = $("#setup-form");
          if (setupForm) {
            setupForm.dataset.userId = res.userId;
          }
          const nextBtn = $("#verify-next");
          if (nextBtn) nextBtn.hidden = true;
        }
      } else {
        // Already registered: go to me
        window.location.href = "/me";
      }
    });
  }

  // Setup (password + PIN) form
  const setupForm = $("#setup-form");
  if (setupForm) {
    setupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userId = Number(setupForm.dataset.userId);
      const password = $("#setup-password").value;
      const pin = $("#setup-pin").value.trim();
      const pinConfirm = $("#setup-pin-confirm").value.trim();
      if (!userId || !password || !pin || !pinConfirm) {
        toast("Please fill in all fields.");
        return;
      }
      const ok = await finishRegistration(userId, password, pin, pinConfirm);
      if (ok) {
        window.location.href = "/me";
      }
    });
  }

  // PIN sign-in button on /me
  const pinBtn = $("#pin-signin-btn");
  if (pinBtn) {
    pinBtn.onclick = async () => {
      const ok = await refreshMe();
      if (!ok) {
        toast("Sign in again.");
        return;
      }
      // Show the PIN entry prompt
      const existing = $("#pin-prompt");
      if (!existing) {
        const el = document.createElement("div");
        el.id = "pin-prompt";
        el.className = "pin-prompt card flow";
        el.innerHTML = `
          <h2 class="card-title">Sign in with PIN</h2>
          <p class="card-sub">Enter the PIN you set up.</p>
          <form class="pin-form" autocomplete="off">
            <label class="field" for="pin-input">PIN</label>
            <input id="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" class="input" placeholder="4–6 digits" required>
            <button type="submit" class="btn btn-primary btn-full" id="pin-submit">Sign in</button>
          </form>
          <p class="switch"><button type="button" class="link-btn" id="pin-cancel">Use password instead</button></p>
        `;
        const main = $("#main");
        main.prepend(el);
        const form = el.querySelector(".pin-form");
        form.addEventListener("submit", async (ev) => {
          ev.preventDefault();
          const pinInput = el.querySelector("#pin-input");
          const pinVal = pinInput.value.trim();
          if (!/^\d{4,6}$/.test(pinVal)) {
            toast("Enter a 4–6 digit PIN.");
            return;
          }
          const me = await refreshMe();
          if (!me) {
            toast("Session invalid. Sign in again.");
            return;
          }
          const signed = await pinSignIn(me.id, pinVal);
          if (signed) {
            el.remove();
          }
        });
        el.querySelector("#pin-cancel").onclick = () => el.remove();
      }
      $("#pin-prompt").hidden = false;
      $("#pin-input").focus();
    };
  }

  // Sign-out
  const signOutBtn = $("#signout-btn");
  if (signOutBtn) {
    signOutBtn.onclick = signOut;
  }

  // Category expand/collapse
  $$(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const list = btn.nextElementSibling;
      if (!list || !list.classList.contains("category-list")) return;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      list.hidden = open;
    });
  });

  // Keyboard shortcuts on inputs
  $$("input[type=tel], input[type=password], input[type=text]").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const form = input.closest("form");
        if (form) form.requestSubmit();
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wire);
} else {
  wire();
}
