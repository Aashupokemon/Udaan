# Udaan app

A small, global-facing help app built on Cloudflare Workers + D1 (SQLite), with phone-number OTP auth, then password + one-tap PIN sign-in.

The promo site already lives at **https://aashupokemon.github.io/Udaan/**. This app is the next step: a real app shell behind Freebuff auth and a D1 database.

## Stack

- Runtime/hosting: Cloudflare Workers
- Database: D1 (SQLite binding `DB`)
- Auth: Freebuff Sign in with Freebuff for the shell, plus a phone-OTP flow using a demo-mode OTP helper now (Twilio-ready path later)
- Frontend: static HTML/CSS/JS shell served by the Worker (and, later, by GitHub Pages for the promo URL)
- SMS/OTP: Twilio path is stubbed; app runs in demo mode locally and in preview until you wire real SMS credentials

## What the app does in this build

- Phone-number login via 6-digit OTP
- First-time users create an account with a password and a 4–6 digit PIN
- Returning users can sign in with OTP, or use one-tap PIN sign-in
- Basic user profile page with language preference (English/Hindi) stored server-side
- Public "help" resources page seeded with sample, globally useful data (emergency numbers note, women and child helplines for India, general help-center style resources, categories)

This is a demo build. OTPs are logged locally in demo mode and are not sent over SMS until you add real SMS credentials.

## Dev setup

Install dependencies and start the local Workers dev server:

```bash
npm install
npm run dev
```

The dev server uses `wrangler.jsonc` with the local Freebuff auth development variables and the `DB` binding. For preview/deploy specifics, use the Freebuff Sites flow for this project.

Before running locally, set the Freebuff auth development variables in your environment so the Freebuff auth handler can initialize:

- `FREEBUFF_CLIENT_ID`
- `FREEBUFF_ISSUER`
- `APP_ORIGIN`

For local preview, the Freebuff auth setup for this site already returned development variables. Keep secrets out of committed files.

## Auth flow

1. `POST /api/auth/otp/request` — sends a 6-digit OTP (demo) for a phone number, creating the user if needed.
2. `POST /api/auth/otp/verify` — verifies the code, starts a session cookie.
3. If the account has no password/PIN yet, the client moves to `POST /api/auth/register` to set password + PIN.
4. Once registered, `POST /api/auth/pin` implements one-tap PIN sign-in.
5. `GET /api/me` returns the current user; `POST /api/auth/signout` ends the session.
6. `GET /api/resources` returns the public sample data.

## Data

Sample data is seeded into D1 via `seedDefaultResources` the first time the app runs in an environment. It is replaceable: change `src/resources.js` and re-seed, or replace with verified local data later. The app does not present itself as an emergency service; the disclaimer is shown on every page.

## OTP / SMS note

The app is intentionally built so the OTP sender can be swapped later. Right now it runs in demo mode. To send real SMS, add a sender (Twilio or a similar provider) and plug it into the OTP request path without changing the rest of the flow.

## Next

- Wire real SMS (Twilio or equivalent) when you have a sender number and the countries you want to send to.
- Replace sample help data with verified local sources.
- Add a waitlist or updates path if you want users to receive launch news.
- Deploy to the preview origin and verify auth + the OTP flow end-to-end.
