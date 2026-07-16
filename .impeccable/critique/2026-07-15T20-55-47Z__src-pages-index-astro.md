---
target: homepage (src/pages/index.astro)
total_score: 29
p0_count: 1
p1_count: 2
timestamp: 2026-07-15T20-55-47Z
slug: src-pages-index-astro
---
# Design Critique — NextBridge IT (homepage)

Method: dual-agent (A: design-review · B: detector/browser-evidence)

## Design Health Score — 29/40 (Good)

| # | Heuristic | Score | Key Issue |
|---|-----------|:---:|-----------|
| 1 | Visibility of System Status | 3 | Good micro-feedback (scrolled nav, "Sending…", focus states); no active-section indicator in nav |
| 2 | Match System / Real World | 3 | Humane labels ("What are you building?"); bridge jargon ("stations", "crossing") costs the business buyer a beat |
| 3 | User Control and Freedom | 2 | Lenis smoothing imposed; quote type-erase loop infinite and un-pausable; scroll-up erases already-read content |
| 4 | Consistency and Standards | 3 | Mint/mono grammar rigorous; Services H2 scale deviates from sibling H2s |
| 5 | Error Prevention | 2 | Layout shift swallows first Send click (P1); mailto path never disables button; no maxlength anywhere |
| 6 | Recognition Rather Than Recall | 3 | One page, all disclosure open; no "you are here" cue |
| 7 | Flexibility and Efficiency | 3 | Skip link, complete keyboard path, direct email; no-JS form GET-submits to itself (no action fallback) |
| 8 | Aesthetic and Minimalist Design | 4 | Genuinely excellent restraint; depth by light, not cards |
| 9 | Error Recovery | 3 | Humane inline errors, focus moves to first invalid field |
| 10 | Help and Documentation | 3 | Response-time promise, "Fits best" guidance, direct email |
| **Total** | | **29/40** | Strong for a landing page; dragged down by control & error prevention |

## Anti-Patterns Verdict

**LLM assessment: NOT AI-slop — reads authored.** No icon-card grids, no gradient text (signature gradient appears exactly once outside the logo, per its own rule), mono used as instrument not costume, numbered steps semantically earned on a real ordered process. Second-order risk: near-black + neon + mono IS the saturated dev-brand lane; concept coherence (arch → beams → crossing → routes → circuit) is what saves it.

**Deterministic scan:** CLI scan of src/ clean (0 findings). Runtime in-page detector found 4: `transition: padding` on nav (Nav.astro:59 — genuine, animates a layout property), 2× all-caps-body on .mono elements (About HQ line, footer motto — judged intentional brand instrument style, keep), and `transition: padding` on `<body>` — mechanically verified FALSE POSITIVE (browser default `all 0s`, no author rule).

**Visual overlays:** skipped — headless-only automation, no user-visible browser window; detector was run in-page and read via console instead.

## Overall Impression

The site keeps its promise ("if their website is like this, imagine their code"): one metaphor executed five ways, color discipline that is actually obeyed, keyboard path with zero gaps. The biggest opportunity is functional, not visual: the emotional arc ends on its weakest beat — the form, the only part of the page that "does engineering," is currently a mailto stub. Peak-end rule: the experience is remembered by its end, and the end is currently the worst moment.

## What's Working

1. **One metaphor, five executions.** The Night Bridge is the IA itself (arch/beams/crossing/routes/circuit) — and the moat against dark-SaaS sameness.
2. **Color rules verifiably obeyed.** Violet never on interactive elements, mint under 10% per viewport, every focus/hover speaks mint — across all screenshots.
3. **Services ledger writes for two readers.** Owner-level outcome directly above CTO-level bullets, in all six rows.

## Priority Issues

- **[P0] Primary CTA is a stub.** `FORM_ENDPOINT = ''` in Contact.astro — every submit falls back to mailto; the crafted success panel is dead code. Also domain mismatch: site uses contact@nextbridgeit.net, PRODUCT.md says .com. Fix: wire endpoint (service decision pending with user), reconcile domain. → /impeccable harden
- **[P1] Send button dodges the first click.** Invalid email + click Send → error line inserts, button shifts ~28px mid-click, click lands on background with zero feedback. Fix: reserve space for .field-error so the CTA never moves. → /impeccable harden
- **[P1] Hero arch collides with copy at laptop heights.** At 1366×768 / 1440×700 the violet limb strikes through lead + CTA row; pulse passes behind text. Fix: below ~800px viewport height reduce .hero-scene height or add content bottom padding. → /impeccable adapt
- **[P2] Read content vanishes on scroll-back.** Reverse toggleActions (user-requested feature) make return trips replay entrances; fast scroll-up reads as a glitch. User decision: keep vs. opacity-only reverse vs. none.
- **[P2] Brand promise erases itself forever.** Infinite type-erase loop (user-requested) backspaces "We build relationships first —" endlessly; reads accidentally ironic. Critique recommends: type once per viewport entry, hold; erase only off-screen.

## Persona Red Flags

**Jordan (first-timer):** passes the 10-second test; but with webmail (no OS mail handler) clicking Send produces nothing visible except a small mono note below the eye-line — will believe the form is broken.

**Riley (stress tester):** found the swallowed click on first pass; mailto path never disables the button — repeat clicks open multiple compose windows. Keyboard-only run is clean end-to-end.

**Casey (distracted mobile):** no persistent contact affordance — nav CTA is display:none ≤860px, so contact is two taps + full scroll away after the hero. Top half of the fullscreen menu is dead space.

## Minor Observations

- "put weight on" (hero) vs "carry weight" (services) — metaphor repeats at its two loudest moments
- Approach desktop: empty band between stations 03–04 (~40% of the section is empty night)
- aria-label on <p> (quote) unreliably announced; visually-hidden text + aria-hidden spans is safer
- No-JS: form GET-submits to itself; add action fallback
- Footer: Serbian enterprise buyers may look for legal identity (PIB/MB)
- transition: padding on nav (detector) — trivial swap
- Head hygiene genuinely good (canonical, OG+alt, JSON-LD, theme-color); reduced-motion path verified working

## Questions to Consider

1. If a competitor lifted the palette, type, and grain tomorrow, what still says "NextBridge" — the system or one SVG arch? Does the identity survive a second page without the bridge literalism becoming a cage?
2. Positioning is "the site is the proof of engineering" — yet the only part that does engineering points at a mailto stub. Which will a technical evaluator weigh: the choreography they see, or the network tab they open?
3. The whole emotional budget is spent in the first three seconds. A referral prospect visits twice. What does the scene offer the returning visitor except the same entrance replayed?
