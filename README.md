# Complexity AI Website

Static marketing website for Complexity AI: RL environments that train AI scientists on real lab work.

## Current Story

The October 13, 2026 deck is the source of truth:
- **Problem:** AI knows biology but can't judge experiments, and labs can't train what they can't grade.
- **Now:** RL environments graded by real experiments (cytometry, single-cell, assays, imaging; OT-2 twin prototype) for frontier labs and RL environment vendors.
- **Next:** a task engine that turns failures from expert sessions and paid analysis jobs into new tasks.
- **Roadmap (24 months, targets):** frontier packs, failure library, paid analysis service, instrument twins, run-QC models.

The site publishes no team profiles, market sizing, competitor analysis, contract sizes, or companies in talks.

## Structure

- `index.html`: homepage with top navigation, graded-task hero, design-partner strip, problem, RL environments and task engine, six-step loop, customers, OT-2 twin film, roadmap, contact, footer. Icons are an inline Lucide SVG sprite at the top of `<body>`.
- `styles.css`: dark, Arena-inspired design (warm charcoal surfaces, bordered cards, light serif headlines).
- `script.js`: accessible navigation and section highlighting, six-step loop tabs, OT-2 twin film playback, contact form.
- `api/submit.js`: existing Vercel contact endpoint.
- `llms.txt`: agent-readable summary.
- `docs/website-refresh-2026-10-12.md`: content sources, visual decisions, and verification scope.

## Check Locally

```sh
npm ci
npm test
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. The static preview does not execute the Vercel contact endpoint; form success/failure behavior is tested with isolated mocks.

## Deployment

Existing Vercel project: `complexity-landing`, linked by `.vercel/project.json`.
Existing public domain: https://www.complexity-ai.com/.

```sh
vercel --prod --yes
```

The contact endpoint requires `GOOGLE_SHEETS_WEB_APP_URL` in the Vercel environment. Do not submit fake leads to the production form during testing.

## Evidence Boundaries

The OT-2 section shows a rendered replay from the OT-2 twin built from one robot's records: real runs of Opentrons' official 8.8.2 software and the pre-run check (`assets/showcase/ot2-twin-precheck.mp4`, OT-2 only). The bad-move protocol is a test file. It does not certify live hardware or physical safety.

Design partners Fleet and micro1 appear as monochrome text wordmarks. The site does not publish individual team profiles, investor forecasts, or companies merely in discussions. `scripts/check-site-content.js` fails if team roles reappear or the partner strip changes.
