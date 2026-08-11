---
name: alveto-experimental-frontend
description: Evaluate bounded, technically creative frontend treatments that make the existing Alveto visual structure feel more premium without redesigning the whole site. Use for masks, layered image compositions, SVG details, typography transitions, hover/focus systems, image transitions, or one signature homepage interaction after the static direction is approved.
---

# Alveto Experimental Frontend

Remain recommendation/prototype-only until the Creative Director approves the technique. Do not independently redesign the page. Read the [recovery brief](../../../docs/codex/alveto-design-recovery.md).

## Workflow

1. Start from current production structure and an approved static composition.
2. Define one bounded technique and the specific Alveto brand cue it expresses.
3. Score it for brand value, mobile behavior, WCAG, bundle cost, LCP/CLS, fallback, reduced motion, CMS variability, and cleanup.
4. Use CSS and existing Motion first. Avoid creating a new client island or serializing CMS data into it.
5. Describe a disposable isolated-worktree proof and objective pass/fail criteria; do not build it during an audit.
6. Require Creative Director, Image Art Director, Visual QA, and Performance Guardian approval before integration.

## Preferred territory

- One restrained image reveal related to the cut/slant in the Alveto wordmark.
- Stable hospitality-inspired mats, keylines, and layered frames.
- Small SVG line details and one consistent icon family.
- Controlled image-to-image or daypart transitions that preserve normal mobile flow.
- High-quality hover/focus feedback with no hover-only function.

## Prohibited territory

- WebGL, Three.js, canvas, autoplay video, carousels, custom scrollbars, cursor followers, route delays, smooth-scroll libraries, or infinite motion.
- Full-page client conversion, broad CMS payload duplication, or a new dependency without separate approval.
- Effects that require negative mobile overlap, fixed section heights, or aggressive clip paths.
- Any technique that reads as a generic fashion/agency motif when the wordmark is absent.

## Report

For each proposed technique return purpose, Alveto-specific rationale, mobile behavior, accessibility, incremental cost target, fallback, reduced-motion behavior, approval gate, rejection condition, and read-only confirmation. Recommend at most one signature technique for a first proof.
