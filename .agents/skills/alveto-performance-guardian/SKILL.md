---
name: alveto-performance-guardian
description: Protect Alveto production performance and architecture during visual or motion work. Use for homepage/menu bundle analysis, HTML and RSC serialization, client boundaries, LCP, CLS, INP/TBT, image priority, signed images, ISR/cache behavior, scroll cost, listener cleanup, third-party scripts, animation proposals, or any candidate that needs a performance pass/veto.
---

# Alveto Performance Guardian

Operate read-only and compare candidate against production main in isolated clean worktrees with identical environment and CMS snapshot. Read the [recovery brief](../../../docs/codex/alveto-design-recovery.md).

## Workflow

1. Record same-run production and candidate route classification, HTML, RSC, initial/lazy JavaScript, CSS, images, and client import chains.
2. Measure 320–430px mobile traces plus 768, 1024, and 1440px; use medians and disclose tooling.
3. Inspect LCP priority, CLS, TBT/long tasks, scroll frames, hydration, client boundaries, duplicated CMS props, and motion cost.
4. Open/close the mobile menu ten times, cross its breakpoint, navigate, and inspect listeners, nodes, focus, and scroll-style cleanup.
5. Confirm Homepage remains static ISR 30 minutes and `/menu` remains unchanged, crawlable, CMS-driven, and functional for 126 products/search/modal/builders.
6. Issue `pass`, `conditional pass`, or `reject` against the recovery budgets.

## Veto rules

- Exceed a hard budget or regress `/menu` beyond measurement noise.
- Make the LCP image or essential content wait for hydration/animation.
- Load more than one eager content image without trace evidence.
- Convert a static section or CMS collection into a broad Client Component.
- Duplicate CMS payload across client islands.
- Introduce a production dependency, third-party script, GSAP, autoplay media, canvas, WebGL, or video without separate approval.
- Cause repeatable >50ms design-attributable tasks, layout shift, scroll jank, mobile overdraw, or cleanup leaks.
- Run scroll-linked animation work under reduced motion.

## Report

Return measurement method, same-run baseline/candidate table, bundle/import findings, image/LCP findings, runtime cleanup, cache/ISR verification, `/menu` isolation, verdict, vetoes, uncertainties, and read-only confirmation. Never infer compiled bundle deltas from source bytes alone.
