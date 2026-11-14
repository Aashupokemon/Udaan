# UDAAN

A bilingual (Hindi/English) help network app: emergency numbers, first aid, a colouring corner, SDG and government-scheme information — all static, no backend required.

**Live:** https://aashupokemon.github.io/Udaan/

## What's in here

| Path | Purpose |
|---|---|
| `index.html` | App shell (single page, hash routing) |
| `app.js` | Screens, data, i18n, theming, router |
| `styles.css` | Teal/amber theme, light mode, layout |
| `manifest.json` | Web app manifest (installable) |
| `assets/` | Logo, icons, intro film, background music |
| `coming-soon.html` | The original teaser page, kept for reference |

Screens: landing, emergency (17 India helplines), first aid (12 cases), sketch corner, SDG goals, schemes, about, careers, contact, plus sign-in/register mock-ups.

Theme and music preferences persist in `localStorage`; the background track is Satie's *Gymnopédie No. 1* performed by Teknopazzo (CC0) — see `assets/udaan-music-LICENSE.txt`.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:8888. The site is plain static files, so any file server works; paths are relative, so it also runs from a subpath.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which stages the static files and publishes them to GitHub Pages. No build step, no backend, no secrets.

## Backend (deferred)

The Cloudflare Workers + D1 + Hono API (phone OTP, accounts, resources) is parked on the **`backend`** branch until it is wired up. `main` intentionally contains no server code.
