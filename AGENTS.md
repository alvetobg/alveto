# Alveto public website instructions

## Repository boundary

- These instructions apply to the public Alveto website repository only.
- Treat the sibling `alveto-admin` repository as an external read-only boundary unless the user explicitly opens an Admin task.
- Do not change production, CMS business data, Supabase contracts, revalidation contracts, SEO contracts, or `/menu` behavior as an incidental part of visual work.
- Never use rejected prototype branches as an implementation base. Start visual work from the current production `main` branch unless the user explicitly selects another approved base.

## Visual mission

Premium evolution, not radical reinvention.

Evolve the recognizable production Alveto website; do not replace it with a new brand.

The governing formula is:

> Current Alveto + better photography + precise typography + better spacing + subtle depth + premium interaction + controlled motion = Alveto Premium V2

Preserve the image-led hospitality character, coral wordmark, warm ivory canvas, ink typography, real food/interior photography, and familiar homepage journey. Premium quality must come from art direction, crop, rhythm, hierarchy, material detail, and restraint.

Reject work that depends on oversized typography, recurring black editorial blocks, giant dead space, emoji icons, generic agency/fashion styling, ornamental trends, or motion that competes with hospitality.

Read [the approved recovery brief](docs/codex/alveto-design-recovery.md) before proposing or implementing homepage visual changes.

## Native visual roles

The repository-scoped skills under `.agents/skills` are the durable role definitions:

| Role | Default authority | Required output |
| --- | --- | --- |
| `$alveto-creative-director` | Read-only; final visual veto | Brand-continuity and premium-quality verdict |
| `$alveto-motion-director` | Read-only; motion map before code | Motion purpose, timing, reduced-motion, and cost |
| `$alveto-experimental-frontend` | Recommendation/prototype only until approved | Technique scorecard and approval gate |
| `$alveto-image-art-director` | Read-only | Image inventory, crop map, reuse rules, and shoot gaps |
| `$alveto-visual-qa` | Read-only; screenshot veto | Viewport evidence, severity, cause, and acceptance criteria |
| `$alveto-performance-guardian` | Read-only; budget veto | Same-run baseline comparison and performance verdict |

Invoke a role explicitly with its `$skill-name`. Codex may also select it implicitly when the task matches its description. For any substantial visual redesign, use all six roles; do not substitute a single general review.

## Orchestration

- The primary Codex task is the producer and synthesizer.
- Run discovery roles independently and in parallel when possible. Give each role production, candidate, and screenshot evidence; do not leak another role's verdict into its first pass.
- Prefer separate Codex tasks or read-only subagents for audits. Use isolated Git worktrees for independent implementation experiments.
- Never let multiple roles edit the same source files concurrently. Assign one implementation owner per file set; all other roles review read-only.
- The Creative Director must approve the static visual direction before experimental technique or motion implementation.
- Do not average conflicting recommendations. Resolve them in this order: user decision, brand recognizability, mobile visual quality, premium perception, usability/accessibility, performance, experimental novelty.
- Follow [the visual-agent orchestration workflow](docs/codex/visual-agents/orchestration.md).

## Non-negotiable visual rules

- Preserve the production homepage order unless a small structural change has an explicit, evidence-backed reason.
- Keep the Hero photography-first on mobile and desktop. Do not make typography the opening asset.
- Keep mobile H1 text within the approved recovery scale and three lines where practical.
- Keep ivory dominant. Use coral deliberately for wordmark, primary action, markers, and focus; use ink primarily for text and one controlled footer anchor.
- Use the real Alveto wordmark without distortion, invented monograms, or decorative cropping.
- Use only consistent SVG icons. Never use emoji or platform-dependent Unicode glyphs as interface icons.
- Hide unpublished Signature and Gallery sections. Do not expose CMS/system placeholder copy on the public homepage.
- Do not reuse one homepage photograph in multiple homepage sections.
- Avoid negative mobile overlaps, fixed heights that clip copy, and absolute decorations that own section geometry.
- Mobile is a separate composition, not a reduced desktop layout.

## Motion and interaction rules

- Use the existing Motion/Framer Motion runtime for purposeful motion and CSS transitions for simple states.
- Do not add GSAP during the recovery iteration. A future exception requires separate Creative Director and Performance Guardian approval.
- Allow no more than three signature homepage animations and six micro-interactions.
- Animate transforms and opacity by default; do not animate layout, blur, large shadows, or section height.
- Essential content and CTAs must remain server-rendered, visible, and actionable before hydration.
- Respect `prefers-reduced-motion`; final content must appear immediately with no loss of information.
- Never use scroll hijacking, pinning, continuous decorative motion, bounce, magnetic cursors, or page-wide color scrubbing.

## Mobile and accessibility gates

- Test 320, 375, 390/393, 430, 768, 1024, and 1440px, including a 320×568 short viewport and an iPhone safe-area viewport.
- Require `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- Verify sticky-header and anchor offsets, safe areas, text wrapping, image crops, section rhythm, empty states, and menu open/close cleanup.
- Keep interactive targets at least 44px where practical.
- Preserve keyboard navigation, visible focus, dialog focus trap, Escape, scroll lock, breakpoint close, and post-exit focus restoration.
- Real screenshots are required. Lint, build, and automated accessibility checks do not establish visual approval.

## Performance and architecture gates

- Server Components remain the default. Do not convert the homepage or CMS collections into a broad Client Component.
- Preserve static homepage ISR at 30 minutes, cache tags, signed-image lifetimes, and one prioritized Hero image.
- Keep all below-the-fold images lazy and use stable aspect-ratio geometry.
- Preserve `/menu` as the crawlable CMS-driven 126-product catalogue with its existing search, modal, and Sweet/Savory builders.
- Add no dependency, third-party script, autoplay media, canvas, WebGL, or video without explicit user approval.
- Meet the budgets in the recovery brief and obtain a Performance Guardian verdict before presenting a preview.

## Delivery gate

Do not present a future visual preview merely because it builds. Before handoff, require:

1. Creative Director approval.
2. Image Art Director crop/content approval.
3. Motion Director approval.
4. Visual QA screenshot approval at every required viewport.
5. Mobile premium-quality and brand-continuity review.
6. Accessibility and reduced-motion verification.
7. Performance Guardian approval against an isolated production-main baseline.

Document unresolved limitations plainly. A failed visual gate blocks preview approval even when engineering validation passes.
