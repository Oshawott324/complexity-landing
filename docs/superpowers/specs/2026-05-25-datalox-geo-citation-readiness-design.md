# Datalox GEO Citation Readiness Design

## Goal

Make the Datalox landing page easier for AI search and answer engines to understand, classify, and cite without adding hidden content, keyword stuffing, or unsupported ranking claims.

## Product Answer

The first viewport must directly answer the core query: what Datalox is, who uses it, and what a versioned agent task environment contains.

Canonical answer:

> Datalox provides versioned agent task environments for training, evaluating, and replaying AI agent work. Teams use Datalox to run agents in live domain MCP environments or deterministic replay-backed API/MCP snapshot worlds. Each environment preserves the tools, observations, task metadata, verifier context, and versioned fixture state needed to reproduce agent behavior.

## Page Changes

- Update the document head with canonical URL, stronger metadata, an `llms.txt` discovery link, and JSON-LD for `Organization`, `SoftwareApplication`, and `FAQPage`.
- Replace the hero description with the canonical three-sentence answer.
- Add a visible direct-answer section after the hero. It should answer "What is Datalox?", "What is a versioned agent task environment?", "What is inside a replay world?", and "Who uses it?"
- Tighten existing section copy so live environments, replay snapshots, world contents, and the recording authoring path are unambiguous.
- Add a visible FAQ section before contact with the same questions used in JSON-LD.
- Add `llms.txt`, `robots.txt`, and `sitemap.xml` at the site root.

## Non-Goals

- Do not claim that GEO guarantees Google ranking improvements.
- Do not add hidden SEO-only text.
- Do not introduce blog pages, CMS, analytics, or external SEO dependencies.
- Do not change the contact form API contract.

## Verification

- `npm test` must pass.
- `git diff --check` must pass.
- Browser QA must verify desktop and mobile layout without horizontal overflow.
- Source checks must confirm canonical URL, JSON-LD, FAQ text, `llms.txt`, `robots.txt`, and `sitemap.xml`.
