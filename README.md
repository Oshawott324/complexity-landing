# Complexity AI — landing site

One-page site for Complexity AI, an RL lab that builds RL environments and licenses data for AI labs.

## What's here

| File | Job |
|---|---|
| `index.html` | The page: hero, letter, RL environments, data, benchmarks (coming soon), contact |
| `styles.css` | All styling. Colours and fonts are variables at the top |
| `script.js` | Nav state, fade-in on scroll, card hover light, contact form |
| `api/submit.js` | Serverless form handler. Forwards to a Google Sheet |

No build step. No dependencies in the browser.

## Run it

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173. The contact form needs the serverless function, so it only sends on a deployed host (or `vercel dev`).

## Deploy

Vercel, zero config. Set one environment variable:

- `GOOGLE_SHEETS_WEB_APP_URL` — the Google Apps Script web app that writes form rows to the sheet.

## Edit the content

All copy lives in `index.html`. The cube logo is the inline `.cube` SVG (nav, footer and favicon).
