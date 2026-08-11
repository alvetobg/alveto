# Alveto design recovery brief

## Audit basis and decision

This brief records the recovery audit performed against:

- production `main`: `23fbc62e882adf7582d2276858b39062c23c5be7`;
- rejected prototype 1: `9e7cc903c090406f00b693030165bc3980cb754e`;
- rejected prototype 2: `e3ef21258cbceacfbb7820088dd6f163515992b9`;
- live production at `https://alveto-bg.com`;
- the four supplied real-device screenshots.

Both prototypes remain rejected. The approved recovery direction is **Alveto Warm Modernism**: current production architecture and atmosphere, elevated by art-directed photography, controlled typography, tighter rhythm, subtle material depth, premium interactions, and restrained motion.

The production website—not either prototype—is the visual and architectural source of truth.

## What production gets right

- The opening viewport is immediately recognizable: real warm interior photography, coral wordmark, hospitality categories, a clear headline, and practical Menu/Reserve actions.
- The Hero remains image-first on mobile. Live QA measured a restrained 36px mobile H1 inside an approximately 743px image-led composition.
- Coral, ivory, and ink form an ownable, warm palette. Coral identifies Alveto; ivory keeps it inviting; ink provides legibility and one closing anchor.
- The section journey is familiar and useful: navigation → Hero → Morning/Afternoon/Evening → Signature when available → interior story → Gallery when available → reservation → footer.
- Morning/Afternoon/Evening is a genuinely Alveto-specific story spanning coffee, brunch, desserts, and cocktails.
- The production mobile drawer is structurally sound: ivory panel, wordmark, concise links, reservation CTA, and address. Its issue is unintentional emptiness, not its visual foundation.
- CMS, SEO, structured data, image signing, cache tags, accessibility primitives, and `/menu` architecture already provide the right engineering foundation.

## What production should improve

- Reduce desktop type ceilings: the live desktop H1 reaches roughly 120px and section H2s roughly 72px.
- Tighten mobile section length and duplicated copy. Experience, About, Reservation, and Footer can feel longer than their content earns.
- Replace repeated generic reveal wrappers and glass-like card treatments with fewer deliberate motions and quieter surfaces.
- Hide the empty Signature block; live mobile currently spends roughly 456px announcing “coming soon.”
- Continue hiding Gallery when empty; never expose operational placeholder copy.
- Stop reusing `hero.jpg` in Reservation. The live homepage currently shows the Hero image twice.
- Compact the long center-aligned mobile footer and avoid repeating the same reservation proposition.
- Give 768px a deliberate tablet composition rather than interpolating between phone and desktop.
- Improve mobile-menu rhythm with one compact utility cluster instead of either a blank void or excessive content.

## Rejected-prototype diagnosis

### Prototype 1 — `9e7cc903…`

- Replaced the warm image-led Hero with a dark split editorial composition.
- Introduced large black blocks, oversized wordmarks/headlines, giant numerals, repeated rules, and 5–8rem ornamental corners.
- Exposed empty Signature/Gallery states. In the supplied Gallery screenshot, system copy and almost a full blank section precede an oversized reservation block.
- Produced fixed-header and anchor collisions; live QA measured the Gallery anchor roughly 90px behind an 80px header.
- The supplied reservation/footer screenshot shows an orphaned “waiting.” line, excess coral space, and an abrupt coral-to-black collision.
- Its current preview has eight visible broken images, including wordmarks, dayparts, and interiors; no candidate with broken media can pass visual QA.

### Prototype 2 — `e3ef2125…`

- Converted the mobile Hero to a copy-first editorial cover; the image arrives after headline, copy, CTAs, and taxonomy.
- Mobile H1 measured 53.6–64.5px and the Hero reached approximately 1,170px; typography became the concept.
- Converted the mobile menu into an approximately 804px-tall black manifesto with giant labels, numbering, paragraph, business data, CTA, and socials. At 320×568, primary actions fall below the fold.
- Used literal `↗` characters that iOS rendered as conspicuous blue emoji in the supplied screenshots.
- Repeated black Menu, Signature, and Footer surfaces, shifting the identity toward fashion/agency editorial.
- At 768px, the H1 reached roughly 84.5px and Experience roughly 3,141px, exposing the absence of tablet art direction.
- Correctly hid empty Signature and Gallery and improved menu lifecycle/anchor offsets; those operational improvements are salvageable.

## Elements worth salvaging

- Conditional suppression of empty Signature and Gallery sections.
- Safe-area padding, 44px targets, focus trap, Escape, root/body scroll lock, breakpoint close, and post-exit focus restoration.
- Correct `scroll-margin` for every anchored homepage section.
- Server-rendered Hero/content with narrow motion islands rather than a Client homepage.
- One premium easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Small 8–16px reveal offsets, limited image scale, stable aspect-ratio frames, and full reduced-motion fallbacks.
- Normal-flow mobile Gallery captions and a restrained populated Gallery contact sheet.
- Mild desktop alternation for the dayparts and About imagery, with mobile returning to a simple stack.
- Compact grouping of real Visit/Hours/Contact information.

## Changes to revert completely

- Text-first or split-screen Hero architecture.
- Full-page black mobile menu and manifesto copy.
- Emoji/Unicode arrows as icons.
- Recurring black editorial sections.
- Oversized mobile/desktop type as visual identity.
- Giant numerals, systematic numbering, excessive hairlines, sculptural corners, and decorative vertical artifacts.
- Negative mobile overlaps and desktop stagger copied directly onto phones.
- Public empty-state/“coming soon” sections.
- Flat oversized Reservation fields and oversized black editorial Footer treatment.

# 1. Brand continuity

## Preserve

- The real coral Alveto wordmark.
- Image-led opening with the real interior.
- Ivory-led warm hospitality tone.
- Coral primary action and markers.
- Ink typography and one grounded footer.
- Manrope for UI, body, and display until a separately approved type study exists.
- The familiar homepage order and CMS-driven content.
- Rounded, approachable controls and photography, but at disciplined radii.

## Allow to evolve

- Crop and focal-point treatment.
- Type scale, line breaks, tracking, and measure.
- Daypart card composition.
- Section spacing and dividers.
- Button and SVG icon details.
- Navigation surface transition.
- About image pairing.
- Conditional Signature/Gallery layouts when real content exists.
- Footer information density.

## Do not change

- Brand colors, wordmark design, CMS contracts, SEO/JSON-LD, public RPCs, revalidation, signed-image behavior, `/menu`, business facts, or homepage content source.
- Production's overall journey merely to look more creative.

## Color use

- **Ivory `#F7F4EF`:** target roughly 70–80% of the page canvas; primary section background and mobile-menu surface.
- **Coral `#C76D6D`:** wordmark, primary CTA, small daypart markers, selected rules, active states, and deliberate section accents. Do not make every surface coral.
- **Ink `#222222`:** primary text, outlines, image overlays, and one controlled Footer anchor. Do not use consecutive full-width ink sections.
- Supporting neutrals must be tonal mixes of ivory/ink or an existing warm neutral, not unrelated hues. Borders should generally use low-alpha ink/coral.

## Logo treatment

- Use `public/logos/alveto-wordmark.png` at its natural proportions.
- Never distort, outline, rotate, crop, fragment, or invent a monogram.
- Keep one clear Hero wordmark moment and a smaller navigation identity without competing scales.
- Use coral on ivory or over an image zone with verified contrast; use ivory/coral in the Footer only when contrast passes.

## Typography principles

- Premium through proportion, measure, line break, and whitespace—not extreme scale.
- Mobile H1: 36–44px, preferably two or three lines.
- Mobile H2: 32–40px; H3: 26–32px.
- Desktop H1: 72–88px; H2: 48–64px.
- Body: 16–18px with 1.55–1.75 line-height.
- Eyebrow: 11–12px; tracking generally 0.14–0.18em maximum.
- Keep mobile body measure near 28–36 characters and desktop explanatory copy near 45–65 characters.
- Avoid line-height below 1.0 for editorial effect and avoid four-line mobile headlines.

## Surface and radius principles

- Hero may remain full-bleed without a decorative card.
- Image/card radius: 16–24px mobile, 20–28px desktop.
- Controls may remain pill-shaped where production already uses pills.
- Do not use asymmetric 5–8rem corners as a recurring motif.
- Prefer flat warm surfaces, one-pixel warm hairlines, and at most one soft elevation such as `0 18px 50px rgba(34,34,34,0.08)`.
- Avoid glass panels, glow, strong blur, or shadows on every component.

# 2. Homepage structure

| Production section | Decision | Desktop composition | Mobile composition | CMS dependency | Empty behavior |
| --- | --- | --- | --- | --- | --- |
| Navigation | Keep / refine | Transparent/minimal over Hero; transition to ivory utility bar after Hero; preserve Experience, Menu, Reserve | Compact header and ivory side sheet | Site + reservation settings | Always render core navigation; omit unavailable secondary details |
| Hero | Keep / refine | Full-bleed real interior, controlled overlay, wordmark, category line, title/copy, paired CTAs | Image-first 72–100svh minimum with normal-flow copy overlay and auto-growth on short screens | Homepage + site + reservation | Use the existing safe branded image/copy fallback without an empty marketing shell |
| Experience | Keep / refine | Three connected daypart chapters; mild alternation allowed; calmer captions | Three independent stacked chapters with stable gutters and crops | Existing production content/presentation | Keep all three known chapters; do not invent new copy |
| Signature | Conditional / refine | One image-led lead product plus restrained supporting entries; type-led entry when a product lacks image | Simple 4:5 lead and stacked factual rows | CMS featured products | Hide entire section when zero published products |
| About / interior | Keep / simplify | One strong 3:2/4:3 image and restrained 4:5 secondary crop; concise text | One dominant 4:5 image; secondary image in normal flow only if it improves rhythm | Site settings + existing real imagery | Keep concise real fallback copy; never invent claims |
| Gallery | Conditional / refine | Aspect-aware 3:2/4:5 contact sheet with preserved CMS order | Single column or restrained two-column; captions in normal flow | Published CMS Gallery | Hide entire section when no published items |
| Reservation | Keep / refine | Compact atmospheric finale with one primary action and supporting contact/location | Strong but concise close; CTA never hidden; distinct transition into Footer | Reservation + site settings | Hide unavailable actions; do not invent availability |
| Footer | Keep / simplify | Ink as the sole strong dark anchor; compact four-part information | Concise wordmark, Menu/Reserve, Visit/Hours/Contact, small social row | Footer + contact + site settings | Omit absent fields without blank columns |

Keep this order. Do not introduce unfamiliar architecture unless a small adjustment has a measurable usability reason and receives Creative Director approval.

# 3. Hero recovery

## Composition

- Retain the production relationship: real interior background, Alveto wordmark, category line, CMS H1/subtitle, Explore Menu, Reserve.
- Keep the primary photograph visible throughout the first mobile viewport.
- Desktop may place copy off center within a safe quiet image zone, but it must remain one photographic composition—not a text/image split card.
- Use overlay gradients only to protect contrast; no unrelated gradient decoration.
- Avoid duplicate large wordmark moments competing between header and Hero.

## Scale and hierarchy

- H1 36–44px mobile, 72–88px desktop; no more than three lines mobile.
- Wordmark supports the photograph; it does not become a cropped oversized graphic.
- Category line is secondary and may wrap intentionally at 320px without extreme tracking.
- Primary action is Explore Menu or the approved CMS CTA; Reserve remains equally discoverable but visually secondary if both appear.

## Mobile geometry

- Use `min-height` based on `svh`, never a fixed viewport height that clips content.
- Allow the Hero to auto-grow on 320×568 when content needs more room.
- Account for `env(safe-area-inset-top)` and the 72–80px header.
- Use normal-flow content inside the overlay layer. Do not use negative panel margins or absolute copy that can collide with the next section.
- Keep primary CTA visible within the initial composition where device height permits.

## Image and crop

- `public/images/hero.jpg`, 1600×1066 (3:2).
- Desktop target: 16:9, focal approximately 52% 48%, retaining tree/table/coral niche.
- Mobile target: 4:5 or 3:4, focal approximately 55% 52%.
- Do not force the landscape source into an extreme 9:16 crop; commission a dedicated mobile Hero in the future.

## Motion and LCP

- One prioritized/preloaded `next/image`, correct responsive `sizes`, stable fill geometry.
- Do not animate the image from hidden opacity or require hydration for full visibility.
- Optional settle: scale no more than `1.008` mobile / `1.015` desktop, total 650/850ms maximum.
- Wordmark/headline/actions resolve in a concise sequence; CTAs remain interactive immediately.
- Reduced motion renders the complete final composition immediately.

# 4. Navigation and mobile menu

## Desktop

- Keep the production wordmark and Experience/Menu/Reserve model.
- Transparent or minimally framed over Hero where contrast permits.
- Switch after a Hero sentinel to an ivory utility surface with a 200–240ms color/border transition.
- Do not change header height during the transition and avoid animated backdrop blur.

## Mobile panel

- Warm ivory side panel, approximately 88–92vw with a 380px maximum.
- Coral wordmark around 120–136px; close target at least 44–48px.
- Navigation labels 24–28px; hard maximum 32px.
- Concise links: Home only when useful, Experience, Menu.
- One visible full-width Reserve CTA.
- One compact utility group: address and optionally hours or one inline social row. No brand manifesto.
- Reservation CTA should be visible without scrolling at 320×568 where possible; otherwise use a stable panel footer, not a giant document.
- Use consistent inline SVG arrows/chevrons only when meaningfully needed. No emoji or Unicode arrows.
- Respect top/bottom safe areas and permit internal scrolling on short screens.
- Lock root and body; keep lock through exit; trap focus; close on Escape, navigation, and desktop breakpoint; restore focus after exit completes.
- Use `inert`/appropriate background isolation where supported.

# 5. Motion map

## Signature animations (maximum three)

| Animation | Purpose and trigger | Timing/easing | Mobile | Reduced motion | Cost |
| --- | --- | --- | --- | --- | --- |
| Photographic welcome | Let the visible Hero photograph settle while wordmark, message, and actions resolve once after hydration | Image 750–850ms; text 420–480ms; CTA ≤120ms later; premium easing | Scale ≤1.008; total ≤650ms; no word-by-word motion | Immediate final state | One narrow existing island; low |
| Daypart chapters | Focus attention on Morning/Afternoon/Evening images and coral marker as each becomes 20–25% visible | Image 620–700ms; copy 440–500ms; internal delay ≤60ms | 440–520ms, no lateral motion, preferably no scale | Immediate final state | Up to three once-only observers; low/medium |
| Curated Gallery cadence | Reveal published images in DOM order with ≤8px settle; reuse for About if Gallery absent | 520–580ms; 40–50ms stagger capped at 150ms | Reveal visible item/group only | Immediate final state | Bounded visible group; medium |

Optional experimental signature: **The Alveto Cut**, one bounded diagonal reveal derived from the wordmark slant. It is not automatically approved. Keep only when the Creative Director recognizes the connection without explanation, the Hero image remains immediately paintable, mobile layers stay in bounds, incremental code remains below 1KB gzip, and Visual QA says it does not read as a generic fashionable wipe.

## Micro-interactions (five)

1. Navigation surface/foreground transition after the Hero sentinel, 200–240ms.
2. Mobile-menu backdrop 140–160ms and panel 260–290ms, with immediate reduced-motion mode.
3. CTA color/border 160–180ms, optional 1px fine-pointer lift, SVG arrow shift 2px, immediate focus ring.
4. Link underline/color 160–180ms with a clear touch active state.
5. Fine-pointer image hover scale ≤1.012 over 480–560ms; disabled for touch and reduced motion.

No GSAP is approved for the recovery implementation. Revisit only after the static recovery passes and a measured daypart proof shows value Motion cannot provide.

# 6. Photography map

Production contains 39 runtime raster images plus one wordmark. The source archive has 53 files but only 34 unique hashes; 19 are exact aliases. No unused reserve campaign exists in the archive. Neither rejected prototype introduced new photography.

| Section | Real source | Desktop crop | Mobile crop | Suitability and restriction |
| --- | --- | --- | --- | --- |
| Hero | `public/images/hero.jpg` — 1600×1066 | 16:9; focal 52% 48% | 4:5/3:4; focal 55% 52% | Best authentic atmosphere; only adequate for high-DPR 1440; Hero only |
| Morning | `public/images/experience/morning.webp` — 2400×1602 | 4:3/3:2; focal 50% 52% | 4:5; complete plate | Crisp but catalogue-led; exact duplicate of Benedict/Waffle Benedict; Morning only |
| Afternoon | `public/images/experience/afternoon.webp` — 2400×1602 | 4:3 centered | 4:5 centered | Attractive but catalogue-led; duplicate of archived Raffaello; Afternoon only |
| Evening | `public/images/experience/evening.webp` — 2400×1602 | 3:2/16:10; retain brand composition | 4:5; focal 42% 50% | Strongest Alveto-specific daypart; preserve wordmark/glass; Evening only |
| About main | `public/images/about/interior-1.webp` — 1600×1066 | 3:2/4:3; focal 50% 52% | 4:5; focal 56% 52% | Authentic warm room; About only |
| About secondary | `public/images/about/interior-2.webp` — 1600×1066 | Restrained 4:5 inset/3:2 | Normal-flow full-width or omit | Strong bar/coral arch; never overlap mobile; About only |
| Signature | CMS featured-product primary images | Lead 4:3; support 1:1/4:5 | 4:5 | Hide when empty; image-less products become confident type entries; no invented placeholder |
| Gallery | Published CMS Gallery | Aspect-aware 3:2/4:5 | Normal-flow 4:5/3:2 | Preserve order/alt; hide when empty; no catalogue substitution |
| Reservation | New dedicated future image | 16:9/3:2 hospitality action | 4:5/9:16 | Stop reusing Hero; until available, use a compact brand surface rather than a fake/repeated photo |

## Reuse and quality restrictions

- Never reuse one homepage photograph in another homepage section.
- Do not promote `menu-hero.webp` to the Homepage Hero; it is busy and menu-specific.
- Treat category assets as a mixed thumbnail set, not a coherent homepage campaign, unless separately approved.
- Recognize duplicates: Morning = Benedict = Waffle Benedict; Afternoon = archived Raffaello; Signature Dubai = menu Dubai; Signature Espresso Martini = category Coffee.
- Hide absent Gallery/Signature content. Do not invent Gallery imagery or use stock/AI imagery.

## Focused future photoshoot

- One photographer, one lighting plan, one warm grade, RAW masters, and center-safe framing for mobile derivatives.
- Hero/interior: 16:9 at ≥2880×1620, 3:2 at ≥3600×2400, matching 9:16 at ≥1440×2560; real interior with subtle activity and coral/ivory cues.
- Dayparts: three distinct real moments in both 3:2 and 4:5—espresso/service and steam; pancakes/waffles or dessert sharing; cocktail finishing/serving.
- Signature: six current CMS-selected products, each 4:5 and 1:1, consistent warm ceramics/table and one lighting direction.
- Hospitality: 3:2 barista action, 3:2 server presenting a dish, 4:5 hands/sharing/serving, 16:9 occupied interior.
- Details/Gallery: 1:1 and 4:5 crema, sauce, ceramics, timber, coral wall, menu-in-hand, light; several 9:16 atmospheric mobile frames.
- Use real people only with appropriate releases. Avoid empty-showroom imagery and generic latte-art without Alveto context.

# 7. Premium-detail system

- **Spacing:** use a 4/8px base. Mobile section padding generally 72–96px; desktop 96–128px. Internal rhythm 12/16/24/32/48px. Exceed only when a strong photograph earns the space.
- **Dividers:** one-pixel warm ink at low alpha or a restrained coral hairline; do not number every section.
- **Buttons:** minimum 44px, primary coral/ink or coral/ivory with clear contrast, secondary transparent with visible border. Named transitions only; no gradient/glow.
- **Links:** descriptive text and a consistent SVG arrow when needed; underline/focus remains visible without hover.
- **Icons:** one inline SVG family with consistent 1.5–2px stroke, round caps/joins, `currentColor`, and accessible labeling. No emoji.
- **Images:** stable ratios, deliberate focal points, 16–28px radius, no aggressive repeated zoom, no decorative duplication.
- **Depth:** one soft shadow tier and warm borders. Avoid glassmorphism and heavy backdrop blur.
- **Focus:** immediate high-contrast ring with sufficient contrast against coral, ivory, imagery, and ink.
- **Transitions:** premium easing, restrained amplitude, no layout shift, and no content-delay choreography.

# 8. Mobile acceptance specification

## 320–430px

- `scrollWidth === clientWidth`; do not solve with global clipping.
- Horizontal gutters: 20px at 320, 24px from 375 upward, unless an approved photograph is full bleed.
- Header: approximately 72–80px plus safe-area inset; no geometry change during scroll state.
- Every anchor lands 12–16px below the sticky header; use consistent `scroll-margin-top`.
- Hero uses `min-height`, auto-grows on short screens, and keeps H1 36–44px / ≤3 lines.
- Primary Hero action is visible in the opening composition where height permits; CTAs stack when two-up would constrain text.
- Body line length stays readable; email/URLs wrap safely.
- Section vertical padding generally 72–96px. No public empty section or consecutive blank viewport.
- Images use deliberate 4:5/3:4/3:2 mobile crops and retain subjects; Gallery captions stay in normal flow.
- Avoid negative margins, absolute secondary photos, fractional off-screen stagger, and decorations that establish height.
- Reservation remains concise and distinct from Footer; no abrupt giant coral-to-black collision.
- Footer compacts information without oversized branding or duplicated manifesto copy.

## 768px

- Provide a deliberate tablet composition; do not scale mobile type and spacing linearly.
- Introduce selected two-column layouts only where copy and crops remain balanced.
- Keep H1 and daypart height materially below the rejected tablet measurements.

## Mobile menu

- Ivory 88–92vw sheet, max 380px; 24–28px labels; CTA visible at 320×568 or in a stable panel footer.
- Test open, close, Escape, outside/backdrop action, route change, resize to desktop, repeated ten-cycle open/close, safe areas, internal short-height scroll, root/body lock, focus trap, and post-exit restoration.
- No hidden controls under browser chrome, no accidental void, no manifesto content, no emoji icon.

# 9. Performance budget

Measure production main and candidate in isolated clean worktrees with identical Node, lockfile, environment, and CMS snapshot. Do not infer compiled bundle change from source bytes.

| Metric | Target | Hard veto |
| --- | ---: | ---: |
| Homepage HTML gzip | ≤10.5KB | >12KB or >20% over same-run main |
| Homepage HTML raw | ≤70KB | >75KB without added CMS content |
| Homepage RSC gzip | ≤6.5KB | >7KB or >15% over same-run main |
| Homepage RSC raw | ≤30KB | >32KB |
| Initial Homepage JS gzip | ≤79KB | >85KB or >5KB over same-run main |
| New design-specific eager JS | ≤4KB gzip | >6KB gzip |
| CLS | 0.000 target | >0.02 at any lab viewport |
| Mobile LCP | ≤2.2s target | >2.5s or >10% slower than main |
| Field INP | ≤200ms | >200ms p75 |
| Lab TBT | ≤150ms target | >200ms |
| Design-attributable long task | none | any repeatable >50ms task |
| Third-party scripts | 0 | any new script |
| New production dependencies | 0 | any without separate approval |
| Priority content images | exactly 1 | more than 1 without trace evidence |

## Architecture limits

- Keep homepage sections as Server Components.
- Allow one navigation/mobile-menu island, one narrow shared motion primitive used no more than six times, and at most one lazy optional interaction.
- Do not pass whole product/gallery/settings datasets into multiple client islands.
- Keep below-fold images lazy and stable; no duplicate signed URLs in client props.
- Preserve Homepage ISR at 1800 seconds, current tags, menu/home signed-image lifetime 24h with 12h refresh, and Gallery 1h with 30m refresh.
- `/menu` HTML, RSC, and initial chunks must remain within 1% measurement noise and retain 126 crawlable products, deferred ProductModal, search, and both builders.
- No GSAP, third party, autoplay, canvas, WebGL, or video during recovery.

## Performance verification

1. Record Next route classification and client import chains.
2. Measure raw/gzip HTML, RSC, initial/lazy JS, CSS, and image transfer separately.
3. Run at least three Slow-4G/4×CPU mobile traces and compare medians.
4. Trace a full 390px and 430px page scroll for long tasks/dropped frames.
5. Verify exactly one high-priority content image.
6. Cycle Mobile Menu ten times and inspect listeners, retained nodes, focus, and scroll styles.
7. Verify cache behavior before/after approved revalidation.
8. Repeat with reduced motion.

# 10. Final visual acceptance checklist

A future preview is not ready until every item passes.

## Brand and direction

- [ ] Creative Director says it is recognizably production Alveto within the first mobile viewport.
- [ ] Photography and hospitality dominate typography and decoration.
- [ ] Ivory remains dominant; coral is deliberate; ink is controlled.
- [ ] No generic fashion/agency/cafe-template treatment, giant dead space, emoji, or trend clutter.
- [ ] One memorable moment is specifically Alveto and remains tasteful.

## Structure and CMS

- [ ] Production homepage journey is preserved.
- [ ] Signature and Gallery disappear cleanly when unpublished.
- [ ] Real CMS content and links remain factual and server rendered.
- [ ] `/menu`, CMS, SEO, JSON-LD, API, Supabase, and revalidation contracts are unchanged.

## Hero, images, and crops

- [ ] Hero remains image-led; primary photograph is visible in the first phone viewport.
- [ ] Exactly one eager/prioritized content image and zero broken images.
- [ ] Image Art Director approves every desktop/mobile crop and reuse rule.
- [ ] No homepage photograph is reused in another homepage section.
- [ ] Populated/empty Gallery and Signature states are screenshot-reviewed.

## Mobile and tablet

- [ ] Screenshots pass at 320, 375, 390/393, 430, 768, 1024, and 1440px.
- [ ] 320×568 and iPhone safe-area menu screenshots pass.
- [ ] No overflow, clipped copy, header/anchor collision, accidental overlap, dead section, or hidden CTA.
- [ ] 768px has a deliberate composition, not a magnified phone layout.
- [ ] Mobile menu is warm, concise, balanced, keyboard-safe, and visibly premium.

## Motion and accessibility

- [ ] Motion Director approves no more than three signature animations and six micro-interactions.
- [ ] Essential content/CTA never waits for hydration or motion.
- [ ] Reduced motion shows complete final content immediately.
- [ ] Keyboard, focus, Escape, scroll lock, breakpoint cleanup, and focus restoration pass in a real browser.
- [ ] Contrast, landmarks, one H1, one main, heading order, link text, and alt behavior pass WCAG 2.2 AA review.

## Performance and engineering

- [ ] Performance Guardian signs off on same-run production/candidate measurements.
- [ ] Homepage stays static 30-minute ISR with CLS 0 target.
- [ ] Initial JS/RSC/HTML stay within budgets; no design-attributable long task.
- [ ] No new dependency, third-party script, or broad Client Component.
- [ ] `/menu` performance and full SSR catalogue remain unchanged.
- [ ] Lint, TypeScript, production build, dependency audits, and `git diff --check` pass.
- [ ] No console error, hydration warning, broken required request, or stale signed image appears.

## Delivery decision

- [ ] Visual QA provides screenshots, exact findings, and an explicit pass.
- [ ] Creative Director, Image Art Director, Motion Director, and Performance Guardian each approve independently.
- [ ] Known limitations are documented.
- [ ] The producer confirms that a passing build was not used as a substitute for visual approval.
