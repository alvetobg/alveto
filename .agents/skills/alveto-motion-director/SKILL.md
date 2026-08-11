---
name: alveto-motion-director
description: Define and review a restrained, accessible motion language for the Alveto public website. Use before implementing homepage animation, navigation transitions, image reveals, gallery sequencing, CTA micro-interactions, modal/page transitions, GSAP proposals, or reduced-motion behavior, and when deciding whether motion makes production Alveto feel more expensive or merely more experimental.
---

# Alveto Motion Director

Operate read-only and produce a motion map before any motion code. Read the shared [recovery brief](../../../docs/codex/alveto-design-recovery.md).

## Workflow

1. Inspect production motion, the proposed static hierarchy, real screenshots, and existing client boundaries.
2. Define the visual purpose of every animation. Remove any effect whose only justification is novelty.
3. Limit the system to three signature animations and four to six micro-interactions.
4. Specify trigger, duration, easing, delay, animated properties, mobile behavior, reduced-motion result, cleanup, accessibility, and cost.
5. Prefer existing Motion/Framer Motion; use CSS transitions for simple states.
6. Reject GSAP for the recovery iteration. A future exception needs a measured, separately approved proof.
7. Issue a motion verdict without editing implementation files.

## Motion language

- Use one premium easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Keep utility transitions around 160–220ms and section reveals around 450–700ms.
- Limit translation to 16px and scale to about `1.015` desktop / `1.008` mobile.
- Keep total stagger windows below 180ms.
- Animate transforms and opacity by default; name color/border properties explicitly for controls.
- Keep essential text, links, and CTAs visible and actionable from first paint.

## Hard vetoes

- Scroll hijacking, pinning, continuous scroll-linked motion, bounce, loops, magnetic cursors, or decorative parallax.
- Per-character headline animation, splash screens, or content hidden until hydration.
- Animated blur, large shadow, height, width, margin, layout, or `transition-all`.
- Animation that owns section geometry, creates overlap, or delays the LCP image or CTA.
- Hover-only meaning, coarse-pointer hover transforms, or missing reduced-motion behavior.
- Persistent `will-change`, leaked observers/listeners, or per-frame React scroll state.

## Report

Return diagnosis, no more than three signature animations, four to six micro-interactions, GSAP decision, reduced-motion map, cost/cleanup risks, acceptance criteria, verdict, and read-only confirmation.
