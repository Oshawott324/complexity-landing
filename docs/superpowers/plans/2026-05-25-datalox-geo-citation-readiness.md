# Datalox GEO Citation Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Datalox landing page citation-ready for AI search engines by adding direct answer copy, visible FAQs, structured metadata, and crawler files.

**Architecture:** Keep the static landing architecture intact. `index.html` owns visible copy and schema, `styles.css` owns presentation for the new direct-answer and FAQ sections, and root text/XML files provide crawler and agent-readable discovery.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Vercel static deployment, Font Awesome icons.

---

### Task 1: Metadata And Hero Answer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add canonical and discovery metadata**

Add a canonical URL for `https://www.complexity-ai.com/` and a text/plain alternate link for `/llms.txt` inside `<head>`.

- [ ] **Step 2: Add JSON-LD**

Add one `<script type="application/ld+json">` block containing `Organization`, `SoftwareApplication`, and `FAQPage` graph entries. FAQ answers must match visible page text.

- [ ] **Step 3: Replace hero description**

Replace the hero paragraph with:

```text
Datalox provides versioned agent task environments for training, evaluating, and replaying AI agent work. Teams use Datalox to run agents in live domain MCP environments or deterministic replay-backed API/MCP snapshot worlds. Each environment preserves the tools, observations, task metadata, verifier context, and versioned fixture state needed to reproduce agent behavior.
```

### Task 2: Direct Answer And FAQ Sections

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: Add direct-answer section after hero**

Create `<section id="answer" class="direct-answer">` with four answer cells: What Datalox is, what a versioned environment is, what a replay world contains, and who uses it.

- [ ] **Step 2: Add FAQ section before contact**

Create `<section id="faq" class="faq">` with five visible FAQ items:

```text
What is a versioned agent task environment?
How is Datalox different from agent logging or observability?
What is a replay-backed API/MCP snapshot?
When should a team use a live domain MCP environment?
Can a team create a private fixture?
```

- [ ] **Step 3: Add CSS**

Add responsive styles for `.direct-answer`, `.answer-grid`, `.answer-card`, `.faq`, `.faq-list`, and `.faq-item`. Reuse the existing surface, border, grid, and typography tokens.

### Task 3: Tighten Existing Copy

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update Environment Types copy**

Make live environments and replay snapshots explicitly different: live domain MCP environments are real Datalox-owned workspaces, replay snapshots are deterministic fixture worlds from frozen observations.

- [ ] **Step 2: Update Inside A World copy**

Ensure visible copy names tool catalog, exact tool requests, exact observations, task specs, verifier metadata, checksums, provenance, train/dev/test splits, and explicit replay misses.

- [ ] **Step 3: Update How It Works copy**

Add the approved sentence:

```text
Recording is an authoring path, not the product surface: users consume versioned worlds, run live domain environments, or create private fixtures from approved rollouts.
```

### Task 4: Crawler And Agent Files

**Files:**
- Create: `llms.txt`
- Create: `robots.txt`
- Create: `sitemap.xml`

- [ ] **Step 1: Add `llms.txt`**

Include the product definition, correct terminology, user modes A/B/C, repo mapping, terms to avoid, and contact path.

- [ ] **Step 2: Add `robots.txt`**

Allow all crawlers and point to `https://www.complexity-ai.com/sitemap.xml`.

- [ ] **Step 3: Add `sitemap.xml`**

Include only `https://www.complexity-ai.com/` with `lastmod` set to `2026-05-25`.

### Task 5: Verification And Deploy

**Files:**
- Inspect all changed files

- [ ] **Step 1: Run syntax tests**

Run: `npm test`

Expected: `node --check script.js && node --check api/submit.js` exits 0.

- [ ] **Step 2: Run whitespace check**

Run: `git diff --check`

Expected: exits 0.

- [ ] **Step 3: Verify source**

Run `rg` for `application/ld+json`, `What is a versioned agent task environment?`, `llms.txt`, and `https://www.complexity-ai.com/`.

- [ ] **Step 4: Browser QA**

Open local site at `http://localhost:4173/` and verify desktop/mobile layout, no horizontal overflow, working anchors, and readable new sections.

- [ ] **Step 5: Deploy**

Run: `vercel --prod --yes`

Expected: production deploy succeeds and `https://www.complexity-ai.com` returns HTTP 200 with the new hero, FAQ, and crawler files.
