# Website refresh: October 12, 2026

## Source and Scope

- Deck: the internal company deck of October 12, 2026 (not linked here).
- Reviewed all 12 slides, including the now/next split, four RL environment areas, illustrative experiment loop, business model, roadmap, and team.
- Visual reference: LMArena (https://lmarena.ai/, now served at https://arena.ai/). Revised the same day after feedback: the first pass followed arenaphysica.com, which was the wrong reference. The site uses Arena's warm charcoal palette, bordered 12px cards, light serif headlines with italic emphasis, compact white calls to action, and pill tabs. Layout follows Arena's marketing pages (arena.ai/company/about, /how-it-works), not its app: a slim top bar, a centered column, mono section labels on hairline rules, and a multi-column footer. A first redesign used Arena's app sidebar; it was replaced because a sidebar reads as a dashboard on a company website. Its proprietary fonts are substituted with Newsreader, Inter, and DM Mono; no Arena assets or copy are used.
- Only this website repository changed; the desktop-app repository is untouched.
- Existing uncommitted website work was read before editing. The OT-2 data, viewer markup, and simulator boundary were retained and integrated into the new homepage.

## Content Decisions

1. Complexity AI, not the older Datalox general-purpose-world story, is the public brand.
2. Lead with infrastructure for autonomous science and real lab environments for training scientific agents.
3. Present biological data, lab software, instruments, and workflows as today's environment categories.
4. Mark instrument-control infrastructure as in development; present own-model work as longer term.
5. Preserve the distinction between the AI agent's planning/analysis and the infrastructure's instrument actions/run records.
6. No individual team profiles on the public site or in `llms.txt` (removed after review). Design partners Fleet and micro1 are shown in a strip below the hero as monochrome text wordmarks: Fleet's logo is its name set in a light serif, and micro1's is a bold "micro1." wordmark. Swap in official SVGs if the partners provide them.
7. Omit market forecasts, contract-size claims, sensitive investor framing, and logos of organizations merely in talks.
8. Do not claim universal instrument compatibility or completed compliance/safety certification.

## Visual Assets

The page uses no photography. Icons are Lucide (ISC license) inlined as an SVG sprite. The cube mark is a code-native adaptation of the deck's cube identity.

`assets/showcase/autonomous-lab-concept.jpg` (AI-generated concept image from the first pass) and `assets/showcase/ot2-protocol-replay.jpg` (an old screenshot with Datalox branding) are no longer referenced.

## Behavior

- Top navigation (menu button below 861px) supports expanded-state announcements, Escape, link selection, and closing outside the header. The section under the reading line is marked with `aria-current`; nothing is marked over the hero or contact.
- The six experiment-stage tabs support click, arrow keys, Home, and End.
- The existing recorded OT-2 run can be opened, played, paused, stepped, scrubbed, and reset. Closing the replay stops playback.
- Fixed an existing slider bug: the old handler called `stop()`, which re-rendered the previous slider value before reading the user's selected step.
- Timeline tracking now scrolls its own container rather than scrolling the whole page.
- Form validation uses native input validity plus trimmed nonempty fields.
- Sending is protected against double submission and bounded by a 15-second timeout. Success alone clears the form; failure retains the user's message and displays an email alternative.
- The existing Vercel endpoint and payload fields are preserved.

## Verification

- `npm test`: syntax checks, DOM-based content/icon/accessibility-reference checks, and 13 behavior tests pass.
- Tests cover navigation, section highlighting, all six tabs with keyboard selection and owner-list sync, 13 recorded operations with tracked-volume conservation, replay play/pause and controls/scrubbing, form success, duplicate prevention, HTTP errors, application failure, invalid JSON, network errors, timeout, and invalid fields. Content checks fail if team roles or partner labels reappear, or if any icon reference lacks a sprite symbol.
- Browser (Arena redesign, top-nav layout): checked 320x640, 390x844, 1024x768, and 1440x900. No page horizontal overflow and no content spilling out of cards. Verified the mobile menu, section highlighting, stage tabs, and replay scrubbing.
- `git diff --check` passes.
- The contact success path uses an isolated mock. No fake lead was sent to the production Google Sheet. The Vercel environment lists `GOOGLE_SHEETS_WEB_APP_URL` for production, preview, and development, but live delivery has not been exercised.

## Publication

The existing Vercel project and public domain are retained. No new hosting service or domain was created. Public deployment awaits the user's choice; the local preview is http://127.0.0.1:4173.

## Update: October 13, 2026 deck

Source: the internal company deck of October 13, 2026 (12 slides, image-only; read slide by slide).

Positioning changed from "infrastructure for autonomous science" with instrument control next, to "we train AI scientists on real lab work": RL environments graded by real experiments now, and a task engine next. The site follows:

- Hero: deck headline and subtitle; status shows "32 tasks today" (slide 11); hero card shows the bone-marrow stain test from slide 3.
- Problem (slide 3), solution with RL environments and task engine (slide 5), six-step loop as tabs (slide 6), customer quote and researcher collaborations (slide 7), OT-2 twin prototype (slides 5 and 11), 24-month roadmap (slide 11), mission in the footer (slide 2).
- The instrument-control "lab loop" (plan, mix, grow, measure) is gone; the new deck no longer has it.
- Review decisions (Oct 13): the Fleet quote is attributed by role only, not by name; the Opus 5.5 result keeps the model name; universities are not listed.
- Not published: market analysis (slide 9), competition (slide 10), contract-size claims and other investor-only figures from "why now" (slide 4), companies in talks (slide 7), and team profiles (slide 12).
- Contact focus options now match the offers: RL environments and frontier packs, analysis service, lab or data partnership, research collaboration.

Deployment: `.vercelignore` is an allowlist. Only the site files upload; the Datalox agent pack, notes, docs, and tests stay private.
