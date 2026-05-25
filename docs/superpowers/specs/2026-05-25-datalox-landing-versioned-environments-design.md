# Datalox Landing Page: Versioned Agent Task Environments

Date: 2026-05-25
Status: approved design direction, pending implementation plan

## Goal

Reposition the current Datalox landing page around the buyer-facing product:
versioned agent task environments.

The page should no longer lead with "recording traces" or "replay bundles" as
the product. Recording and replay remain important, but they are infrastructure
inside the environment story.

Primary homepage claim:

> Datalox provides versioned agent task environments: live domain MCP
> environments and replay-backed API/MCP snapshot worlds for reproducible
> training, eval, and regression.

## Audience

The page is for AI teams building, evaluating, or training agents that act
through tools, APIs, MCP servers, sandboxes, or domain workspaces.

The page should be readable by technical buyers and agent engineers. It should
make the environment boundary clear enough that an agent or engineer can infer
what Datalox owns and what stays outside Datalox.

## Reference Learning From Apify

Borrow these patterns:

- Lead with a clear category, not implementation mechanics.
- Show a concrete catalog or registry object early.
- Make developer consumption visible with install/run commands.
- Show recognizable source surfaces and use cases as proof.
- Turn abstract infrastructure into named, installable units.

Do not copy these patterns:

- Do not imply Datalox is a generic web scraping or automation marketplace.
- Do not claim a large marketplace before the fixture library justifies it.
- Do not blur Datalox into a generic sandbox, runtime, or behavioral simulator.
- Do not make logo grids the primary explanation of the product.

## Positioning Model

Use this hierarchy:

```text
1. Live domain env
   Real Datalox-owned MCP/domain workspace where agents do live work.

2. Versioned API/MCP snapshot
   Frozen tool catalog, request/response observations, tasks, verifier
   metadata, checksums, and export metadata.

3. Replay engine
   Serves the snapshot as a deterministic fixture world.
```

Buyer-facing wording:

```text
Datalox provides versioned agent task environments.
```

Authoring wording:

```text
Recording is how private snapshots are created.
```

## Homepage Structure

### 1. Navigation

Use concise nav labels:

- Environments
- Fixtures
- How It Works
- Contact

Primary CTA:

- Request Demo

Optional secondary CTA in hero:

- Explore Environments

### 2. Hero

Headline:

```text
Versioned agent task environments.
```

Supporting copy:

```text
Live domain MCP environments and replay-backed API/MCP snapshot worlds for
reproducible agent training, eval, and regression.
```

Hero CTAs:

- Explore Environments
- Bring a Task World

Hero visual:

Show "world anatomy," not a generic trace pipeline. The visual should make one
versioned world feel like a concrete object containing:

- tool catalog
- recorded observations
- task specs
- verifier metadata
- replay bundle
- checksums
- train/dev/test splits
- optional SFT/eval exports

Example visual title:

```text
github-pr-review@2026-05.0
```

### 3. Two Environment Types

Section headline:

```text
Two ways to give agents a stable world.
```

Cards:

- Live domain MCP environments
  - Datalox-owned domain workspaces such as flow cytometry, molecule biology,
    or protein visualization.
  - These own live domain files, parsers, tools, revisions, and compact UIs.

- Replay-backed API/MCP snapshots
  - Versioned fixture worlds made from frozen tool catalogs, requests,
    observations, tasks, verifier metadata, and checksums.
  - These replay observed scenarios deterministically and return explicit
    replay misses for unseen calls.

### 4. Three User Modes

Section headline:

```text
Use a published world, run live, or create your own.
```

Cards:

- Mode A: Use a published fixture
  - Install a pinned fixture or fixture set.
  - Run agents against replay with live upstream off.

- Mode B: Use a live domain env
  - Agents act in Datalox-owned MCP/domain environments.
  - Rollouts can emit replay evidence for eval or training exports.

- Mode C: Create a private fixture
  - A team routes one rollout through Datalox recording/proxy.
  - Datalox records exact tool observations and packages a private versioned
    fixture.

### 5. What Is Inside A World

This is the primary explanatory section after the hero.

Use a structured visual, not only text. The section should show that a
versioned world is a bundle of stable, inspectable pieces:

- tools and schemas
- exact observations
- task prompts/specs
- verifier specs or reference rubrics
- replay miss rules
- checksums and trust/export status
- splits and optional derivatives

This section should preserve Datalox's boundary: it does not invent behavior
for unobserved paths and does not replace external reward engines.

### 6. Fixture And Source Grid

Use an Apify-like grid lower on the page as supporting proof.

The grid should mix fixture families and source surfaces, for example:

- GitHub PR review
- GitHub CI failure
- Slack support thread
- Stripe billing edge cases
- Search policy corpus
- AppWorld calendar
- Flow cytometry
- Molecule sequence annotation
- Protein viewer snapshot
- Custom MCP

The grid should say "example worlds and source surfaces," not "all
integrations." Avoid implying broad production support for sources that are
only roadmap or example fixtures.

### 7. Developer Flow

Include concise CLI snippets to make consumption concrete.

Published fixture:

```bash
datalox fixtures install github-pr-review-basic@2026-05.0
datalox replay --fixture github-pr-review-basic@2026-05.0
```

Fixture set:

```bash
datalox fixture-sets install support-triage-basic@2026-05.0
datalox replay --fixture-set support-triage-basic@2026-05.0
```

Private authoring:

```bash
datalox proxy --mode record
datalox bundle pack --bundle-id private-task-world
datalox replay --bundle .datalox/replay-bundles/private-task-world
```

The snippets should be illustrative, not an exhaustive quickstart.

### 8. Recording As Authoring

Place recording below consumption. The section should state:

```text
Recording is how private snapshots are authored.
```

Explain the pipeline:

```text
live MCP/API/domain env -> agent rollout -> tool_io_record.v1 ->
replay_bundle.v1 -> fixture pack/version
```

This section can reuse some current replay/schema content from the existing
page, but it should not become the main story.

### 9. Contact

CTA headline:

```text
Bring one agent task world.
```

Supporting copy:

```text
We will help identify whether it should be a live domain environment, a
replay-backed snapshot, or a private fixture authored from one rollout.
```

Contact form interests should align to the new framing:

- Published fixture
- Live domain MCP environment
- Private fixture authoring
- Training/eval exports
- Other

## Visual Direction

Keep the current clean, technical, restrained style. The site should feel like
a developer infrastructure product, not a marketing-heavy marketplace.

Visual rules:

- Use the world anatomy visual as the main hero/product graphic.
- Use the source/fixture grid lower as proof.
- Keep cards compact and bordered.
- Avoid decorative graphics that do not explain the environment model.
- Keep color restrained, with enough contrast between environment types and
  replay artifacts.
- Avoid making the page read as a one-hue blue-only theme.

## Content To Demote Or Rewrite

Current content that should move lower or be rewritten:

- "MCP-compatible VCR for agent tools"
- "Turn messy agent traces into replayable data"
- "Record first. Replay later. Derive only after evidence exists"
- Detailed action/observation schema block

These ideas remain valid, but they should appear under "how private snapshots
are authored" or "what is inside a world."

## Non-Goals

Do not position Datalox as:

- a generic agent memory layer
- a generic sandbox runtime
- a behavioral mock generator
- a reward engine or judge-agent provider
- a broad integration marketplace
- a trace normalization product only

## Implementation Notes

The current site is a static HTML/CSS/JS page. The implementation should stay
static unless a specific need appears. Reuse the existing contact endpoint and
client-side behavior.

Expected touched files:

- `index.html`
- `styles.css`
- `script.js` only if navigation labels or behavior require it
- `README.md` to update the product message and local verification notes
- `package.json` only if the description needs to match the new framing

Avoid changing unrelated deployment or contact-form behavior.

## Verification

Before calling the implementation complete:

- Run `npm test`.
- Start a local static server.
- Inspect the page in a browser at desktop and mobile widths.
- Confirm no hero/button/card text overflows.
- Confirm the page makes "versioned agent task environments" clear in the
  first viewport.
- Confirm recording appears as an authoring path, not the primary product.
