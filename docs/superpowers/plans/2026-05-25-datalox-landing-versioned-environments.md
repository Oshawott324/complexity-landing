# Datalox Landing Versioned Environments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the static Datalox landing page so it leads with versioned agent task environments, shows world anatomy first, and uses a fixture/source grid as supporting proof.

**Architecture:** Keep the existing static HTML/CSS/JS structure. Replace the content hierarchy in `index.html`, extend `styles.css` for world anatomy and source-grid sections, preserve the existing mobile navigation/contact form behavior in `script.js`, and update README/package metadata to match the new product framing.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Font Awesome icons, Vercel serverless contact endpoint, Node syntax checks via `npm test`.

---

## File Structure

- Modify `index.html`: Update SEO metadata, navigation labels, hero copy, page section order, contact form interests, and footer copy.
- Modify `styles.css`: Reuse current layout primitives and add focused styles for environment cards, world anatomy, source grid, CLI snippets, and authoring flow.
- Modify `script.js`: Keep existing behavior; update only if changed nav anchors expose any smooth-scroll issue.
- Modify `README.md`: Update product message and verification notes from "Agent Replay" to "versioned agent task environments."
- Modify `package.json`: Update package description only.
- Do not modify `api/submit.js`: Contact form payload shape remains `name`, `email`, `interest`, `message`.

## Task 1: Metadata, Navigation, And Hero

**Files:**
- Modify: `index.html`
- Test: Browser first viewport after Task 4

- [ ] **Step 1: Update document metadata**

Replace the current `<title>` and meta description block in `index.html` with:

```html
    <title>Datalox - Versioned Agent Task Environments</title>
    <meta name="description" content="Datalox provides versioned agent task environments: live domain MCP environments and replay-backed API/MCP snapshot worlds for reproducible training, eval, and regression.">
    <meta property="og:title" content="Datalox - Versioned Agent Task Environments">
    <meta property="og:description" content="Live domain MCP environments and replay-backed API/MCP snapshots for reproducible agent training, eval, and regression worlds.">
    <meta property="og:type" content="website">
```

Expected result: The first viewport and social metadata now use the approved product category.

- [ ] **Step 2: Update navigation labels and anchors**

Replace the `.nav-menu` links in `index.html` with:

```html
            <div class="nav-menu">
                <a href="#environments" class="nav-link">Environments</a>
                <a href="#fixtures" class="nav-link">Fixtures</a>
                <a href="#how-it-works" class="nav-link">How It Works</a>
                <a href="#contact" class="nav-link">Contact</a>
                <a href="mailto:contact@complexity-ai.com" class="contribution-btn">
                    <i class="fas fa-paper-plane"></i>
                    Request Demo
                </a>
            </div>
```

Expected result: Navigation matches the approved spec and does not include old "Problem/Pipeline/Schema" framing.

- [ ] **Step 3: Replace hero copy**

Replace the current `.hero-content` block in `index.html` with:

```html
                <div class="hero-content">
                    <div class="hero-badge">
                        <i class="fas fa-layer-group"></i>
                        <span>Versioned task worlds for tool-using agents</span>
                    </div>
                    <h1 class="hero-title">Versioned agent task environments.</h1>
                    <p class="hero-description">
                        Datalox provides live domain MCP environments and replay-backed API/MCP snapshot worlds for reproducible agent training, eval, and regression.
                    </p>
                    <div class="hero-highlights">
                        <div class="highlight-pill"><i class="fas fa-cubes"></i> Published fixture worlds</div>
                        <div class="highlight-pill"><i class="fas fa-flask-vial"></i> Live domain MCP envs</div>
                        <div class="highlight-pill"><i class="fas fa-lock"></i> Private versioned snapshots</div>
                    </div>
                    <div class="hero-buttons">
                        <a href="#environments" class="btn btn-primary">
                            <i class="fas fa-compass"></i>
                            Explore Environments
                        </a>
                        <a href="#contact" class="btn btn-secondary">
                            <i class="fas fa-box-open"></i>
                            Bring a Task World
                        </a>
                    </div>
                </div>
```

Expected result: The hero no longer leads with trace recording or replay bundles.

- [ ] **Step 4: Replace hero visual with world anatomy**

Replace the current `.hero-visual` block in `index.html` with:

```html
                <div class="hero-visual" aria-label="Versioned world anatomy">
                    <div class="world-panel">
                        <div class="panel-toolbar">
                            <div class="panel-dots" aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span>github-pr-review@2026-05.0</span>
                        </div>
                        <div class="world-map">
                            <div class="world-core">
                                <span class="step-label">versioned world</span>
                                <strong>coding-review-ci-basic</strong>
                                <code>fixture set + replay runtime</code>
                            </div>
                            <div class="world-node tools">
                                <i class="fas fa-screwdriver-wrench"></i>
                                <span>Tool catalog</span>
                            </div>
                            <div class="world-node observations">
                                <i class="fas fa-database"></i>
                                <span>Observations</span>
                            </div>
                            <div class="world-node tasks">
                                <i class="fas fa-list-check"></i>
                                <span>Task specs</span>
                            </div>
                            <div class="world-node verifiers">
                                <i class="fas fa-scale-balanced"></i>
                                <span>Verifier metadata</span>
                            </div>
                            <div class="world-node trust">
                                <i class="fas fa-shield-halved"></i>
                                <span>Checksums</span>
                            </div>
                            <div class="world-node exports">
                                <i class="fas fa-code-branch"></i>
                                <span>SFT/eval exports</span>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <span><i class="fas fa-plug-circle-check"></i> Live upstream off</span>
                            <span><i class="fas fa-fingerprint"></i> Request hash</span>
                            <span><i class="fas fa-circle-exclamation"></i> Explicit misses</span>
                        </div>
                    </div>
                </div>
```

Expected result: The hero visual teaches what is inside a versioned task world.

- [ ] **Step 5: Commit Task 1**

Run:

```bash
git diff -- index.html
git add index.html
git commit -m "Update landing hero positioning"
```

Expected result: Commit contains only the metadata, navigation, and hero changes.

## Task 2: Replace Main Sections With Environment Story

**Files:**
- Modify: `index.html`
- Test: Browser page scan after Task 4

- [ ] **Step 1: Replace the old problem section with two environment types**

Replace the section beginning `<section id="problem" class="how-it-works">` through its closing `</section>` with:

```html
        <section id="environments" class="how-it-works">
            <div class="container">
                <div class="section-header">
                    <span class="section-kicker">Environment Types</span>
                    <h2>Two ways to give agents a stable world.</h2>
                    <p>Datalox separates live domain environments from replay-backed snapshots so teams can choose the right boundary for training, eval, and regression.</p>
                </div>
                <div class="how-grid">
                    <div class="how-card live-env reveal">
                        <div class="card-icon active"><i class="fas fa-flask-vial"></i></div>
                        <h3>Live domain MCP environments</h3>
                        <p>Constrained Datalox-owned workspaces where agents do real domain work through MCP tools.</p>
                        <ul class="how-list">
                            <li>Flow cytometry, molecule biology, and protein visualization workspaces.</li>
                            <li>Domain files, parsers, validation, revisions, and compact UIs stay in the live env repo.</li>
                            <li>Rollouts can emit replay evidence for training and eval exports.</li>
                        </ul>
                    </div>
                    <div class="how-card snapshot-env reveal">
                        <div class="card-icon active-green"><i class="fas fa-box-archive"></i></div>
                        <h3>Replay-backed API/MCP snapshots</h3>
                        <p>Frozen fixture worlds that replay observed tool catalogs, requests, observations, tasks, and verifier metadata.</p>
                        <ul class="how-list">
                            <li>Install a pinned fixture or fixture set by version.</li>
                            <li>Serve recorded observations with live upstream off.</li>
                            <li>Return explicit replay misses instead of inventing unseen behavior.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
```

Expected result: The page introduces the two environment types before any recording mechanics.

- [ ] **Step 2: Replace the old replay loop section with three user modes**

Replace the section beginning `<section id="pipeline" class="advantages">` through its closing `</section>` with:

```html
        <section id="modes" class="advantages">
            <div class="container">
                <div class="section-header">
                    <span class="section-kicker">User Modes</span>
                    <h2>Use a published world, run live, or create your own.</h2>
                    <p>Recording is one authoring path. Most users should start by consuming a versioned environment.</p>
                </div>
                <div class="advantage-grid mode-grid">
                    <div class="advantage-card reveal">
                        <span class="adv-number">A</span>
                        <h3>Use a published fixture</h3>
                        <p>Install a pinned fixture world such as <code>github-pr-review-basic@2026-05.0</code> and run agents against deterministic replay.</p>
                    </div>
                    <div class="advantage-card reveal">
                        <span class="adv-number">B</span>
                        <h3>Use a live domain env</h3>
                        <p>Give agents access to a Datalox-owned MCP workspace for domain work, then capture rollout evidence when useful.</p>
                    </div>
                    <div class="advantage-card reveal">
                        <span class="adv-number">C</span>
                        <h3>Create a private fixture</h3>
                        <p>Route one rollout through the recording proxy, pack exact tool observations, and keep the fixture private or approved for sharing.</p>
                    </div>
                </div>
                <div class="code-band reveal" role="img" aria-label="Datalox environment consumption model">
                    <span>fixture set</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>replay runtime</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>agent run</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>training/eval exports</span>
                </div>
            </div>
        </section>
```

Expected result: The three user modes from the spec are visible and ordered around consumption first.

- [ ] **Step 3: Replace the old schema section with world contents**

Replace the section beginning `<section id="schema" class="vision">` through its closing `</section>` with:

```html
        <section id="world" class="vision">
            <div class="container">
                <div class="vision-content">
                    <div class="vision-text">
                        <span class="section-kicker">Inside A World</span>
                        <h2>A versioned world is more than a trace.</h2>
                        <p class="vision-subtitle">Each replay-backed environment packages the stable pieces an agent needs to run the same task world again.</p>
                        <div class="vision-points">
                            <div class="vision-point reveal">
                                <div class="point-number">T</div>
                                <div class="point-content">
                                    <h4>Tools and observations</h4>
                                    <p>Frozen MCP tool catalogs, exact requests, exact observations, request hashes, and sequence indexes.</p>
                                </div>
                            </div>
                            <div class="vision-point reveal">
                                <div class="point-number">S</div>
                                <div class="point-content">
                                    <h4>Tasks and verifier metadata</h4>
                                    <p>Task specs, scaffold specs, verifier refs, reference rubrics, and replay miss rules preserved as metadata.</p>
                                </div>
                            </div>
                            <div class="vision-point reveal">
                                <div class="point-number">V</div>
                                <div class="point-content">
                                    <h4>Versioning and trust</h4>
                                    <p>Replay bundles, checksums, export gates, train/dev/test splits, and optional SFT or eval derivatives.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="world-detail-panel reveal">
                        <div class="panel-toolbar">
                            <div class="panel-dots" aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span>fixture-world.manifest</span>
                        </div>
                        <div class="manifest-list">
                            <div><strong>tools</strong><span>github, shell, repo files</span></div>
                            <div><strong>observations</strong><span>recorded tool results</span></div>
                            <div><strong>tasks</strong><span>review PR, inspect CI, cite risks</span></div>
                            <div><strong>verifiers</strong><span>evidence and rubric metadata</span></div>
                            <div><strong>trust</strong><span>checksums, export gate, provenance</span></div>
                            <div><strong>splits</strong><span>train, dev, test task membership</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
```

Expected result: The world contents section explains the object Datalox sells.

- [ ] **Step 4: Commit Task 2**

Run:

```bash
git diff -- index.html
git add index.html
git commit -m "Add environment and world sections"
```

Expected result: Commit contains the main page hierarchy rewrite.

## Task 3: Fixture Grid, Developer Flow, Authoring, And Contact

**Files:**
- Modify: `index.html`
- Test: Browser page scan after Task 4

- [ ] **Step 1: Replace the use-cases section with fixture/source grid**

Replace the section beginning `<section id="use-cases" class="architecture">` through its closing `</section>` with:

```html
        <section id="fixtures" class="architecture">
            <div class="container">
                <div class="section-header">
                    <span class="section-kicker">Fixture And Source Coverage</span>
                    <h2>Published worlds and source surfaces.</h2>
                    <p>Start from curated fixture families, Datalox-owned domain environments, or your own MCP/API surface.</p>
                </div>
                <div class="source-grid reveal" aria-label="Example Datalox worlds and source surfaces">
                    <div class="source-cell featured"><i class="fab fa-github"></i><span>GitHub PR review</span></div>
                    <div class="source-cell"><i class="fas fa-code-branch"></i><span>GitHub CI failure</span></div>
                    <div class="source-cell"><i class="fab fa-slack"></i><span>Slack support thread</span></div>
                    <div class="source-cell"><i class="fas fa-credit-card"></i><span>Stripe billing edge cases</span></div>
                    <div class="source-cell"><i class="fas fa-magnifying-glass"></i><span>Search policy corpus</span></div>
                    <div class="source-cell"><i class="fas fa-calendar-days"></i><span>AppWorld calendar</span></div>
                    <div class="source-cell"><i class="fas fa-chart-simple"></i><span>Flow cytometry</span></div>
                    <div class="source-cell"><i class="fas fa-dna"></i><span>Molecule sequence annotation</span></div>
                    <div class="source-cell"><i class="fas fa-atom"></i><span>Protein viewer snapshot</span></div>
                    <div class="source-cell"><i class="fas fa-plug"></i><span>Custom MCP</span></div>
                </div>
                <p class="source-note">Examples show fixture families and source surfaces, not a generic integration marketplace.</p>
            </div>
        </section>
```

Expected result: The Apify-like grid appears as proof below the explanatory sections.

- [ ] **Step 2: Add developer flow section before contact**

Insert this section immediately before `<section id="contact" class="contact">`:

```html
        <section id="how-it-works" class="developer-flow">
            <div class="container">
                <div class="section-header">
                    <span class="section-kicker">How It Works</span>
                    <h2>Install a world, replay it, or author a private snapshot.</h2>
                    <p>The core flow is consumption first. Recording exists to create new private snapshots from live environments.</p>
                </div>
                <div class="flow-grid">
                    <div class="cli-card reveal">
                        <h3>Use a published fixture</h3>
                        <pre><code>datalox fixtures install github-pr-review-basic@2026-05.0
datalox replay --fixture github-pr-review-basic@2026-05.0</code></pre>
                    </div>
                    <div class="cli-card reveal">
                        <h3>Use a fixture set</h3>
                        <pre><code>datalox fixture-sets install support-triage-basic@2026-05.0
datalox replay --fixture-set support-triage-basic@2026-05.0</code></pre>
                    </div>
                    <div class="cli-card reveal">
                        <h3>Create a private fixture</h3>
                        <pre><code>datalox proxy --mode record
datalox bundle pack --bundle-id private-task-world
datalox replay --bundle .datalox/replay-bundles/private-task-world</code></pre>
                    </div>
                </div>
                <div class="authoring-path reveal">
                    <span>live MCP/API/domain env</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>agent rollout</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>tool_io_record.v1</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>replay_bundle.v1</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span>fixture pack/version</span>
                </div>
            </div>
        </section>
```

Expected result: Recording appears as an authoring path, not as the primary product.

- [ ] **Step 3: Update contact section text and form interests**

In the existing contact section, replace the contact info header and paragraph with:

```html
                        <span class="section-kicker">Design Partners</span>
                        <h2>Bring one agent task world.</h2>
                        <p>We will help identify whether it should be a live domain environment, a replay-backed snapshot, or a private fixture authored from one rollout.</p>
```

Replace the `<select id="interest" name="interest" required>` options with:

```html
                                <select id="interest" name="interest" required>
                                    <option value="">Select interest</option>
                                    <option value="published-fixture">Published fixture</option>
                                    <option value="live-domain-mcp-environment">Live domain MCP environment</option>
                                    <option value="private-fixture-authoring">Private fixture authoring</option>
                                    <option value="training-eval-exports">Training/eval exports</option>
                                    <option value="other">Other</option>
                                </select>
```

Replace the message textarea placeholder with:

```html
placeholder="What agent task world are you trying to make reproducible?"
```

Expected result: Contact CTA aligns with the environment framing and preserves the form schema.

- [ ] **Step 4: Update footer copy and links**

Replace footer brand copy with:

```html
                    <p>Datalox provides versioned agent task environments: live domain MCP environments and replay-backed API/MCP snapshot worlds for reproducible training, eval, and regression.</p>
```

Replace footer product links with:

```html
                    <div class="footer-section">
                        <h4>Product</h4>
                        <a href="#environments">Environments</a>
                        <a href="#fixtures">Fixtures</a>
                        <a href="#how-it-works">How It Works</a>
                    </div>
```

Expected result: Footer no longer uses old replay-only framing.

- [ ] **Step 5: Commit Task 3**

Run:

```bash
git diff -- index.html
git add index.html
git commit -m "Add fixture grid and developer flow"
```

Expected result: Commit contains fixture/source grid, developer flow, contact, and footer content changes.

## Task 4: Styling For World Anatomy And New Sections

**Files:**
- Modify: `styles.css`
- Test: desktop and mobile visual inspection

- [ ] **Step 1: Add color tokens for non-blue accents**

In `styles.css`, add these variables inside `:root` after `--red`:

```css
    --violet: #7c3aed;
    --teal: #0f766e;
    --lime: #4d7c0f;
```

Expected result: The page can distinguish world components without becoming one-hue blue.

- [ ] **Step 2: Add world panel and map styles**

Add this CSS after the existing `.replay-panel, .schema-panel` block:

```css
.world-panel,
.world-detail-panel,
.cli-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
}

.world-map {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 22px;
}

.world-core {
    background: var(--ink);
    border-radius: var(--radius);
    color: #ffffff;
    grid-column: 1 / -1;
    padding: 18px;
}

.world-core .step-label {
    color: #cbd5e1;
}

.world-core strong,
.world-core code {
    display: block;
}

.world-core strong {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 6px;
}

.world-core code {
    color: #dbeafe;
    font-size: 13px;
}

.world-node {
    align-items: center;
    background: var(--surface-soft);
    border: 1px solid var(--line-soft);
    border-radius: var(--radius);
    color: var(--ink-soft);
    display: flex;
    gap: 10px;
    min-height: 68px;
    padding: 14px;
}

.world-node i {
    align-items: center;
    border-radius: 6px;
    color: #ffffff;
    display: inline-flex;
    flex: 0 0 auto;
    height: 34px;
    justify-content: center;
    width: 34px;
}

.world-node.tools i { background: var(--blue); }
.world-node.observations i { background: var(--green); }
.world-node.tasks i { background: var(--amber); }
.world-node.verifiers i { background: var(--violet); }
.world-node.trust i { background: var(--teal); }
.world-node.exports i { background: var(--lime); }

.world-node span {
    font-size: 13px;
    font-weight: 800;
    line-height: 1.25;
}
```

Expected result: The hero world anatomy visual is stable, compact, and readable.

- [ ] **Step 3: Add section-specific card styles**

Add this CSS near the existing card styles:

```css
.how-card.live-env {
    border-color: rgba(37, 99, 235, 0.28);
    background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
}

.how-card.snapshot-env {
    border-color: rgba(4, 120, 87, 0.28);
    background: linear-gradient(180deg, #ffffff 0%, #f3fbf7 100%);
}

.card-icon.active-green {
    background: rgba(4, 120, 87, 0.10);
    color: var(--green);
}

.mode-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.manifest-list {
    display: grid;
    gap: 0;
    padding: 12px;
}

.manifest-list div {
    align-items: center;
    border-bottom: 1px solid var(--line-soft);
    display: grid;
    gap: 12px;
    grid-template-columns: 120px minmax(0, 1fr);
    min-height: 54px;
    padding: 12px;
}

.manifest-list div:last-child {
    border-bottom: 0;
}

.manifest-list strong {
    color: var(--ink);
    font-size: 13px;
}

.manifest-list span {
    color: var(--ink-soft);
    font-size: 13px;
}
```

Expected result: Environment types and world contents have distinct but restrained treatment.

- [ ] **Step 4: Add source grid and developer flow styles**

Add this CSS near the `.architecture` styles:

```css
.source-grid {
    border: 1px solid var(--line);
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    overflow: hidden;
}

.source-cell {
    align-items: center;
    background: var(--surface);
    border-bottom: 1px solid var(--line-soft);
    border-right: 1px solid var(--line-soft);
    color: var(--muted);
    display: grid;
    gap: 12px;
    justify-items: center;
    min-height: 128px;
    padding: 22px 14px;
    text-align: center;
}

.source-cell:nth-child(5n) {
    border-right: 0;
}

.source-cell i {
    color: #9ca3af;
    font-size: 32px;
}

.source-cell span {
    color: var(--ink-soft);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.25;
}

.source-cell.featured i {
    color: var(--ink);
}

.source-note {
    color: var(--muted);
    font-size: 13px;
    margin-top: 14px;
    text-align: center;
}

.developer-flow {
    background: var(--surface-soft);
    padding: 82px 0;
}

.flow-grid {
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cli-card {
    box-shadow: var(--shadow-sm);
    padding: 24px;
}

.cli-card h3 {
    color: var(--ink);
    font-size: 18px;
    margin-bottom: 14px;
}

.cli-card pre {
    background: #0f172a;
    border-radius: var(--radius);
    color: #e5e7eb;
    font-size: 12px;
    line-height: 1.65;
    overflow-x: auto;
    padding: 16px;
}

.authoring-path {
    align-items: center;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    color: var(--ink-soft);
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-top: 24px;
    padding: 18px;
}

.authoring-path span {
    background: var(--surface-soft);
    border: 1px solid var(--line-soft);
    border-radius: 6px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 12px;
    padding: 7px 9px;
}

.authoring-path i {
    color: var(--blue);
}
```

Expected result: Fixture/source grid and command snippets are readable and do not look like a generic logo wall.

- [ ] **Step 5: Update responsive rules**

Find the existing `@media` blocks in `styles.css` and ensure they include these rules:

```css
@media (max-width: 1024px) {
    .hero-container,
    .vision-content,
    .contact-content {
        grid-template-columns: 1fr;
    }

    .advantage-grid,
    .mode-grid,
    .flow-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .source-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .source-cell:nth-child(5n) {
        border-right: 1px solid var(--line-soft);
    }

    .source-cell:nth-child(3n) {
        border-right: 0;
    }
}

@media (max-width: 720px) {
    .hero-title {
        font-size: 42px;
    }

    .how-grid,
    .advantage-grid,
    .mode-grid,
    .flow-grid {
        grid-template-columns: 1fr;
    }

    .world-map,
    .source-grid {
        grid-template-columns: 1fr;
    }

    .source-cell,
    .source-cell:nth-child(3n),
    .source-cell:nth-child(5n) {
        border-right: 0;
    }

    .manifest-list div {
        grid-template-columns: 1fr;
    }
}
```

Expected result: New sections collapse cleanly on tablet and mobile.

- [ ] **Step 6: Commit Task 4**

Run:

```bash
git diff -- styles.css
git add styles.css
git commit -m "Style versioned environment landing sections"
```

Expected result: Commit contains only styling changes.

## Task 5: README And Package Metadata

**Files:**
- Modify: `README.md`
- Modify: `package.json`
- Test: `npm test`

- [ ] **Step 1: Update README product message**

Replace the first two paragraphs of `README.md` with:

```markdown
# Datalox Landing Page

Static landing page for Datalox versioned agent task environments.

Datalox provides live domain MCP environments and replay-backed API/MCP
snapshot worlds for reproducible agent training, eval, and regression.
```

Expected result: README matches the new homepage category.

- [ ] **Step 2: Update README product loop**

Replace the `## Product Message` section with:

````markdown
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
````

Expected result: README explains consumption first and recording second.

- [ ] **Step 3: Update package description**

In `package.json`, set:

```json
  "description": "Landing page for Datalox versioned agent task environments.",
```

Expected result: `package.json` no longer describes the product only as tool replay.

- [ ] **Step 4: Run syntax tests**

Run:

```bash
npm test
```

Expected output includes:

```text
> complexity-landing@1.0.0 test
> node --check script.js && node --check api/submit.js
```

Expected result: command exits 0.

- [ ] **Step 5: Commit Task 5**

Run:

```bash
git diff -- README.md package.json
git add README.md package.json
git commit -m "Update landing documentation framing"
```

Expected result: Commit contains README and package metadata only.

## Task 6: Browser Verification And Final Cleanup

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `script.js`
- Optional Modify: `.gitignore`

- [ ] **Step 1: Start local server**

Run:

```bash
python3 -m http.server 4173
```

Expected output includes:

```text
Serving HTTP on :: port 4173
```

Keep this server running for browser checks.

- [ ] **Step 2: Inspect desktop viewport**

Open:

```text
http://localhost:4173
```

At desktop width, verify:

- First viewport headline is `Versioned agent task environments.`
- Hero visual shows `github-pr-review@2026-05.0`.
- Navigation links scroll to `#environments`, `#fixtures`, `#how-it-works`, and `#contact`.
- No hero button or card text overflows.
- Recording appears in the developer flow, not the hero.

Expected result: all checks pass.

- [ ] **Step 3: Inspect mobile viewport**

Use browser responsive mode at approximately `390x844`.

Verify:

- Mobile menu opens and closes.
- Hero title and buttons fit without horizontal scrolling.
- World anatomy nodes stack cleanly.
- Source grid becomes one column.
- CLI snippets scroll horizontally if needed instead of widening the page.

Expected result: all checks pass.

- [ ] **Step 4: Check for stale old framing**

Run:

```bash
rg -n "messy agent traces|MCP-compatible VCR|Bring a Trace|Record first|Replay Loop|Agent Tool Replay" index.html README.md package.json
```

Expected result: no matches.

- [ ] **Step 5: Ignore local visual companion artifacts**

Run:

```bash
git status --short
```

If `.superpowers/` is untracked, add it to `.gitignore` so local brainstorming
screens are not accidentally committed:

```bash
printf '\n.superpowers/\n' >> .gitignore
git add .gitignore
git commit -m "Ignore local brainstorming artifacts"
```

Expected result: no accidental visual companion artifacts are included in the landing page commits.

- [ ] **Step 6: Final status**

Run:

```bash
git status --short
```

Expected result: only intended local changes remain. If all implementation commits were made, the status should be clean or contain only unrelated pre-existing user changes.
