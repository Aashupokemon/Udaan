# UDAAN — Coming Soon

A single-page promo site for UDAAN: a verified, consent-first way to find local help in India.

No build step, no dependencies, no framework. Open `index.html` or serve the folder.

## Preview

```bash
python -m http.server 4173
```

Then open <http://localhost:4173>.

## Configure

| What | Where |
|---|---|
| Launch date and countdown | `assets/app.js` → `LAUNCH_ISO` |
| English and Hindi copy | `assets/app.js` → `copy` |
| GitHub links and page metadata | `index.html` |
| Colors, spacing, animation | `assets/styles.css` |

The countdown is set to **1 July 2027 (IST)** as a placeholder. Change it before sharing the page publicly.

The page is self-contained: system fonts only, inline SVG icons, no analytics, no external requests, no cookies. Language choice is stored in `localStorage`; nothing is sent anywhere.

## Deploy

Enable GitHub Pages for this repository and serve from the `main` branch, root folder. The `.nojekyll` file keeps the assets folder untouched.

## Accessibility

- Keyboard-complete, visible focus, skip link.
- Language toggle updates the document language.
- Status is conveyed with text and icon, not color alone.
- `prefers-reduced-motion` disables the countdown-independent rotation, particles, reveals, and ticker.
- The countdown is marked as a timer and is not announced every second.

## Notes

UDAAN is a working name. The launch date, coverage claims, and pilot details are indicative. UDAAN is not an emergency service.
