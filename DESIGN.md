<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: NextBridge IT
description: An immersive night-scene brand site where one electric signal crosses a matte-black engineered structure.
---

# Design System: NextBridge IT

## 1. Overview

**Creative North Star: "The Night Bridge"**

A suspension bridge at night. The structure is matte black and absolutely precise — you sense tons of engineering holding it up, but it never shouts. Across the span runs a single line of electric light: mint, alive, moving. Below it, a faint violet city-glow. That is the whole system: a dark, engineered scene of total confidence, crossed by one unmistakable signal. The visitor should feel what a driver feels approaching a great bridge at night — "someone who knew exactly what they were doing built this."

The system calibrates between three named poles: **Linear's** surgical dark precision (nothing loose, nothing decorative), **Lusion's** immersive scene craft (WebGL depth, scroll choreography, light as material), and **Vercel's** developer-brand clarity (you always know where you are and what they do). Spectacle and legibility are not in tension here; the spectacle *is* the precision.

What this system explicitly rejects, from PRODUCT.md: the generic dark-SaaS agency template (the old site's own look — gradient buttons, icon-card grids), cold enterprise corporate, the playful startup, and effect overload. The named anti-reference is the **template dark-SaaS landing**: if a section could be screenshotted into any 2024 SaaS site without anyone noticing, it is wrong regardless of how polished it looks.

**Key Characteristics:**
- Near-black engineered scene; depth comes from light, not from cards
- One electric mint signal carries all interaction and emphasis
- Violet exists only as atmosphere — scene lighting, glow, fog — never as UI
- Choreographed, scroll-driven motion with a hard performance budget
- Mono type only where real data lives; precision is shown, not costumed

## 2. Colors

A Committed strategy: the near-black scene carries the brand, one saturated signal speaks on it. Identity anchors come from the existing logo; exact scene values are composed in OKLCH at implementation.

### Primary
- **Signal Mint** (#2EE6A6, identity anchor from the logo; final OKLCH tuning at implementation): the one voice of the interface. CTAs, links, focus rings, live indicators, the traveling light in the hero scene. Its rarity is its power.

### Secondary
- **Bridge Violet** (#7C5CFF, identity anchor from the logo): atmosphere only. Depth glows behind the scene, WebGL fog, ambient lighting at the edges of darkness. It sets mood from a distance and never touches an interactive element.

### Neutral
- **Night ramp** `[to be resolved during implementation]`: a near-black base through two or three raised scene levels, OKLCH, tinted 0.005–0.015 chroma toward violet so the darkness belongs to this brand. No pure #000, no generic gray.
- **Ink** `[to be resolved during implementation]`: near-white text, ≥4.5:1 on every scene level it sits on — including placeholder text.

### Named Rules
**The One Signal Rule.** Mint is the only accent and covers ≤10% of any viewport. If two things glow mint at once, one of them is lying about its importance.
**The Atmosphere Rule.** Violet is weather, not furniture. It may light the scene; it may never fill a button, a link, or an icon.
**The Surgical Signature Rule.** The violet→mint gradient — the brand's signature — appears in the logo and in at most one deliberate moment per page. Never on buttons, never on text, never as card decoration.

## 3. Typography

**Display Font:** `[to be chosen at implementation]` — a hard-edged grotesque with genuine character, selected from a real catalog against the brand words *engineered, confident, alive*. The reflex defaults (Space Grotesk, Inter, and their cohort) are explicitly excluded for site typography; Space Grotesk survives only inside the existing logo lockup.
**Body Font:** `[to be chosen at implementation]` — a highly legible sans, paired on a contrast axis with the display.
**Label/Mono Font:** `[to be chosen at implementation]` — used only under The Instrument Rule below.

**Character:** The voice of a senior engineer: heavy, exact display headlines; calm, readable body; small mono readouts where the system reports real facts.

### Hierarchy
- **Display** (heavy weight, fluid clamp with max ≤ 6rem, tight but ≥ -0.04em): hero statements only.
- **Headline / Title / Body / Label**: modular scale, ratio ≥ 1.25, resolved at implementation. Body line length capped at 65–75ch; light-on-dark body gets +0.05–0.1 line-height.

### Named Rules
**The Instrument Rule.** Mono appears only where data is real — coordinates, statuses, timestamps, metrics. Decorative fake-code and mono-as-tech-costume are forbidden.

## 4. Elevation

Layered, but by light rather than shadow: depth comes from scene lighting, glow, blur, and parallax of the night scene itself — the choreographed register demands a stage with real depth. Drop shadows are structural only (a raised panel that genuinely floats); nothing gets a shadow to "look elevated". No glassmorphism as default; a blurred surface must earn its place optically (something must visibly exist behind it).

## 6. Do's and Don'ts

### Do:
- **Do** keep mint the only interactive color — every CTA, link, and focus state speaks in one voice (The One Signal Rule).
- **Do** make motion explain or awe: scroll choreography that reveals structure, light that travels with purpose. Every animation ships with a `prefers-reduced-motion` alternative and all content visible by default.
- **Do** treat performance as part of the show: a spectacular site that stutters has failed at its own game (PRODUCT.md: "spectacle with discipline").
- **Do** hit ≥4.5:1 body-text contrast on every scene level, placeholders included.
- **Do** write for two readers: technical depth a CTO respects, plain outcomes an owner understands.

### Don't:
- **Don't** reproduce the old site's look — PRODUCT.md names it directly: "the generic agency template… the old NextBridge site's dark-SaaS-with-gradient look sits dangerously close to this." No gradient buttons, no icon + heading + text card grids.
- **Don't** use gradient text, side-stripe borders, glassmorphism-as-default, or tiny uppercase tracked eyebrows above every section.
- **Don't** drift into "cold enterprise corporate" (sterile, legalistic) or "the playful startup" (candy colors, people illustrations) — both named anti-references in PRODUCT.md.
- **Don't** let spectacle eat the message — "effect overload: animation for animation's sake… irritates after ten seconds" (PRODUCT.md). If a visitor can't say what NextBridge IT does within ten seconds, the scene has failed.
- **Don't** put violet on anything clickable, and don't let the signature gradient escape the logo more than once per page.
