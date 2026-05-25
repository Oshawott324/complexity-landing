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

## Files

```text
complexity-landing/
  api/submit.js       # Vercel contact-form endpoint
  index.html          # Landing page markup
  styles.css          # Responsive site styles
  script.js           # Navigation, reveal animations, contact form handling
  package.json        # Minimal verification command
```

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
