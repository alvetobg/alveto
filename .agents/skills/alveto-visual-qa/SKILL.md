---
name: alveto-visual-qa
description: Perform screenshot-led visual QA for Alveto and issue a pass/reject verdict. Use for homepage previews, production/candidate comparisons, responsive quality, overlap, sticky-header collision, safe areas, image crops, section rhythm, mobile menu, empty states, icon quality, focus, reduced motion, overflow, console/hydration errors, and visual consistency. Automated checks alone are never sufficient.
---

# Alveto Visual QA

Operate read-only. Treat real browser rendering and supplied device screenshots as source of truth. Read the [recovery brief](../../../docs/codex/alveto-design-recovery.md).

## Required matrix

- Widths: 320, 375, 390 and/or 393, 430, 768, 1024, and 1440px.
- Short phone: 320×568.
- At least one iPhone safe-area viewport.
- Normal and reduced-motion modes.
- Populated and empty CMS states where safely reproducible.
- Mobile menu closed/open/closing, keyboard flow, Escape, breakpoint resize, scroll lock, and focus restoration.

## Workflow

1. Capture comparable production and candidate screenshots before forming a verdict.
2. Verify `scrollWidth === clientWidth`, one H1, one main, no broken image, and no required-request/console/hydration error.
3. Inspect visual hierarchy, Alveto recognizability, typography, crop, wrapping, dead space, section transitions, anchor offsets, sticky header, safe areas, buttons/icons, hover/focus, and mobile/tablet/desktop consistency.
4. Exercise real interactions; do not infer menu or focus quality from source alone when a browser is available.
5. Report every issue with severity, affected width/state, screenshot evidence, likely cause, and measurable acceptance criterion.
6. Reject unfinished work even if lint/build/performance pass.

## Automatic rejection

- Image-led Alveto identity is not obvious in the first mobile viewport.
- Empty public CMS section, broken image, emoji icon, hidden anchor, text/section overlap, clipped CTA, or horizontal overflow.
- Mobile H1 or menu scale exceeds the recovery brief.
- 768px is merely an enlarged phone layout.
- Menu primary navigation/reservation action is impractical on 320×568.
- Screenshot rhythm looks sparse, artificially stretched, collided, or inconsistent.

## Report

Return verdict, screenshot list, issue table, passes, mobile-menu findings, reduced-motion/focus findings, browser gaps, exact acceptance criteria, and read-only confirmation. Attach screenshots whenever tooling permits.
