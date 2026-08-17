# Datalox Landing Page

Static landing page for Datalox versioned agent task environments.

Datalox provides live domain MCP environments and replay-backed API/MCP
snapshot worlds for reproducible agent training, eval, and regression.

## Product Message

The page is aligned around the current Datalox boundary:

```text
versioned API/MCP snapshot -> fixture set -> replay runtime -> agent run -> training/eval exports
```

Recording is an authoring mechanism for private snapshots:

```text
live MCP/API/domain env -> agent rollout -> tool_io_record.v1 -> replay_bundle.v1 -> fixture pack/version
```

The landing page should not position Datalox as a scientific runtime, a generic
memory layer, a hosted sandbox, a reward engine, or a broad integration
marketplace.

The homepage presents recorded task programs first, maps them to explicit
evaluation tracks, explains the environment model, and shows a compact,
evidence-labeled provider sample later as grounding coverage. Model rankings
belong on the page only after comparable agent runs exist.

## Files

```text
complexity-landing/
  assets/showcase/    # Recorded dry-run workflow MP4s and poster frames
  api/submit.js       # Vercel contact-form endpoint
  index.html          # Landing page markup
  styles.css          # Responsive site styles
  script.js           # Navigation, reveal animations, contact form handling
  package.json        # Minimal verification command
```

The science workflow recordings are reference-world demonstrations. They show
PyLabRobot-shaped dry-run programs and declared benchmark dynamics; they do not
claim live instrument execution or make Datalox a science-specific runtime.

## Local Verification

```bash
npm test
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deployment

The project is linked to Vercel under `.vercel/project.json`.

```bash
vercel --prod --yes
```

The contact form posts to `/api/submit`, which expects
`GOOGLE_SHEETS_WEB_APP_URL` in the Vercel environment.
