# PLAN-A-01 — Tsumugi Public Landing Page and Shared Client Foundations (Revision 2)

## Plan status

**Revision:** 2 — consolidated, audit-driven re-plan  
**Status:** Revision 2 foundations, the visual redesign (section 13), and the scroll motion pass (section 14) are implemented; owner-approved copy edits, Lighthouse measurement, and a full reduced-motion and screen-reader pass remain. The landing page's "Explore the demo" links now go to `/home`  
**Scope:** Public landing page at `/`, plus the client foundations shared with the legal, auth, and workspace plans (public layout, metadata, routing boundary, performance)  
**Related plans:** [PLAN-A-02](PLAN-A-02.md) legal · [PLAN-A-03](PLAN-A-03.md) auth · [PLAN-A-04](PLAN-A-04.md) workspace (performance budget in its section 12)  
**Source specification:** [PROJECT-SPECS.md](../../../PROJECT-SPECS.md)  
**Constraint:** Frontend only. No authentication, API, analytics, or storage behavior. Calls to action only navigate to existing static routes.

## 1. Audit of the current landing page

The page delivers the approved story-led design, but reviewing the build and code shows issues that should be fixed before the workspace work multiplies them.

| # | Finding | Evidence | Fix |
|---|---|---|---|
| L1 | **Heavy, undivided bundle.** One JS file of 467 kB (142 kB gzip) and one CSS file of 105 kB (36 kB gzip) load on every route, including legal and auth. GSAP and ScrollTrigger are in the main bundle. | `vite build` output | Route-level code splitting; landing-only motion chunk (section 6) |
| L2 | **Four font weights** (400/500/600/700) shipped to every page. | `@fontsource/fredoka` imports | Reduce to the weights used; preload the primary one |
| L3 | **Content may be hidden before JavaScript runs.** In the review browser, the hero `h1` computed opacity was `0` three seconds after load (the pane was hidden, so animation timing may be throttled — to be verified in a visible browser). | JS probe of `h1` | Visible-by-default rule: hidden initial states only after the motion system confirms it is running (section 6) |
| L4 | **Two reveal systems.** The original `IntersectionObserver` reveal remains alongside GSAP scenes "until validated". | Plan 4.10.2 | Remove the duplicate once GSAP scenes are verified |
| L5 | **Plain anchors cause full reloads** between landing, auth, legal, and workspace; unknown URLs render the landing page, so there is no 404. | `App.jsx` route selection | Router boundary + Not Found page (PLAN-A-04 §16) |
| L6 | **Each public page re-implements its header and footer.** Landing, auth, and policy pages each define their own brand header and legal-link footer. | `App.jsx`, `AuthPage.jsx`, `PolicyPage.jsx` | Shared `PublicHeader` and `PublicFooter` |
| L7 | **Plan and code disagree.** CTAs are described as "visual-only placeholders", but they now link to `/login` and `/register`; this file also carried an unrelated Kilo-skills migration section and a long decision log. | Plan vs `App.jsx` | This revision removes both |
| L8 | **Page metadata is minimal.** Title and description only; no canonical, Open Graph, theme color, or per-route titles managed in one place. | `index.html`, per-page `useEffect` | `usePageMeta` hook + static head tags |
| L9 | **Product preview is not labelled as an illustration.** The hero card shows a workflow with sample content. | Hero preview | Label "Illustration — sample project" |

## 2. Objective and positioning

Introduce Tsumugi as a production-management workspace for creative and technical projects and move visitors to **Create your workspace** or **Log in**.

> **Weaving ideas into finished work.**

Differentiator: traceability — *why work exists, what it supports, and what it becomes* — not just task tracking.

Tone: warm and creative, **but professional and trustworthy**. Claims must match what exists: the product is an early preview, so copy never promises unreleased features, metrics, customers, or testimonials.

## 3. Confirmed design rules (retained from Revision 1)

- Light theme only; Fredoka for all text (friendly medium/bold weights); Lucide icons used selectively.
- Solid fills, dark-ink structural outlines, colored accent outlines for emphasis; **no CSS/UI gradients**.
- Hybrid woven/thread background, low contrast, subtle scroll movement, interrupted by section surfaces.
- CSS/SVG compositions only; no raster imagery unless separately approved.
- Brand: Tsumugi by Moeko Works. "Moesoft" is legacy and must not appear.
- Immersive but usable: every animation has a static fallback and a reduced-motion variant.

## 4. Page structure (revised)

Order stays story-led. Hero, traceability, lifecycle, and closing remain distinct; capabilities and adaptability merge into "Possibilities" to shorten the page (currently ~4,500px tall on desktop).

| Section | Purpose | Content requirements |
|---|---|---|
| Header | Orientation and conversion | Brand, anchors (Story, Traceability, Lifecycle, Possibilities) with active state and progress meter, `Log in`, `Create your workspace`. Mobile: menu button with focus-safe panel |
| Hero | State the promise in five seconds | Eyebrow, headline, one 20–25 word supporting sentence, primary + secondary CTA, product preview (labelled illustration). Headline and CTAs visible without any script |
| Story | Name the tension | Short narrative (≤ 80 words): scattered ideas, notes, files, tasks |
| Traceability | Make the differentiator memorable | Objective → Requirement → Milestone → Task → Revision → Deliverable as a readable list first, connected thread second |
| Lifecycle | Explain the workflow | Six stages with one sentence each; vertical on mobile |
| Possibilities | Show range without implying features | Software, visual novel/creative writing, academic research, multimedia; each with one concrete workflow example. States clearly that workflows adapt to the project; no promise of a custom workflow builder |
| Closing | Convert | Restated promise, `Create your workspace`, secondary `Log in` |
| Footer | Trust and navigation | Brand, one-line description, `Log in` / `Create account`, Legal group (Privacy, Terms, Cookie & Local Storage), "A Moeko Works project" |

### Copy and content rules

- [ ] One idea per section; headings ≤ 8 words; paragraphs ≤ 3 lines at desktop width.
- [ ] No unverifiable claims (no numbers of users, no "trusted by", no performance promises).
- [x] Preview content is generic sample data and labelled as illustration.
- [ ] Section copy reviewed and approved by the owner before implementation.

## 5. Shared public layout (used by PLAN-A-02 and A-03 as well)

- [x] `PublicHeader` with variants: `landing` (full nav + CTAs) and `compact` (brand + "Back to home") for auth and legal pages.
- [x] `PublicFooter` rendering the Legal group and Moeko Works credit once; used on landing, auth, legal, and Not Found.
- [x] `usePageMeta({ title, description, robots })` sets `document.title`, description, and robots; replaces ad-hoc `useEffect` titles.
- [x] `index.html` carries default title, description, canonical placeholder, Open Graph and Twitter basics, `theme-color`, and favicon references.
- [x] Workspace, auth, and any draft legal routes emit `noindex`; the landing page is indexable.
- [x] Not Found page using the public layout with links to `/`, `/login`, and the legal pages.

## 6. Motion and performance

### Motion system

One scoped motion setup per page, owned by a single module; React owns semantic state (active section, menu, progress) and GSAP owns presentation only.

- [x] **Visible by default:** CSS renders the final layout; the motion module adds `html.motion-ready` only after GSAP initializes, and hidden initial states apply only under that class (fixes L3).
- [ ] Remove the legacy `IntersectionObserver` reveal once each GSAP scene passes validation (L4).
- [x] Use `gsap.context()` for cleanup and `gsap.matchMedia()` for responsive and reduced-motion variants; one shared defaults object for durations, easing, and scrub values.
- [x] Animate `transform`, `opacity`, and SVG presentation values only; no layout properties.
- [x] Create a ScrollTrigger per scene (not per child); call `ScrollTrigger.refresh()` only after measured layout changes.
- [ ] Load GSAP + ScrollTrigger via dynamic import from the landing chunk only.

### Scene contracts (condensed)

| Scene | Trigger | Behavior | Mobile | Reduced motion |
|---|---|---|---|---|
| Hero | Load; light scroll scrub | Copy → actions → preview → thread, staged | Shorter, no scrub | Final state immediately |
| Story + traceability | Section entry | Copy settles, chain nodes emphasized left-to-right | Simplified amplitude | Full chain visible |
| Lifecycle | Section entry | Heading, then six cards in order | Vertical reveal, no pinning | Normal layout |
| Possibilities | Section entry; hover/tap | Short stagger, subtle alternating offsets | Simple reveal | Static cards |
| Closing | Section entry | Thread settles, one CTA emphasis | Same | Stable CTA |
| Navigation | Scroll position (not animation callbacks) | Active indicator + progress meter | Menu transition focus-safe | Immediate |

Failure criteria: hidden essential content, stale transforms after fast/reverse scroll or anchor jump, duplicate triggers after resize/route change, layout shift from initial states, focus lost in the mobile menu.

### Performance budget (landing)

| Metric | Target |
|---|---|
| Landing JS (gzip) excluding shared runtime and motion chunk | ≤ 25 kB (measured 21 kB) |
| Motion chunk (gsap + ScrollTrigger, gzip) | loaded after first paint |
| CSS for landing (gzip) | < 30 kB |
| Fonts | ≤ 3 files; primary weight preloaded; `font-display: swap` |
| LCP (mobile, throttled) | < 2.5 s |
| CLS | < 0.1 |
| Lighthouse mobile | Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90 |

## 7. Accessibility and responsive

- [x] Landmarks, one `h1`, ordered headings, skip link, visible `:focus-visible`.
- [ ] Anchor targets not obscured by the floating navigation.
- [ ] Mobile menu: `aria-expanded`, focus trap while open, Escape closes, returns focus to the toggle.
- [ ] Contrast ≥ 4.5:1 over every pattern and colored surface; decorative SVG hidden from assistive technology.
- [ ] No horizontal overflow at 320, 390, 768, 1024, 1440; first CTA visible above the fold at 390×720.
- [ ] Full reduced-motion verification in a browser with the preference enabled.

## 8. Implementation phases

- [x] **Phase 1 — Foundations:** shared `PublicHeader`/`PublicFooter`, `usePageMeta`, head tags, Not Found, router boundary, route code splitting, font reduction (with PLAN-A-04 Phase 1).
- [x] **Phase 2 — Motion hardening:** visible-by-default rule, remove duplicate reveal, dynamic motion chunk, cleanup audit.
- [ ] **Phase 3 — Content pass:** owner-approved copy edits, preview illustration label, section merge, page-length reduction.
- [ ] **Phase 4 — QA:** budget measurement, Lighthouse per breakpoint, keyboard and reduced-motion pass; update `README.md`, `CODEMAP.md`, `LOG.md`.

## 9. Baseline already built (Revision 1)

Static responsive landing page; story-led sections; hybrid woven background; floating navigation with active-section tracking and progress meter; GSAP scenes with reduced-motion handling; footer Legal group linking the three policy routes; CTAs linking to `/register` and `/login`; Lucide icons; Fredoka typography; Moeko Works branding.

## 10. Exclusions and removed content

- No backend, authentication logic, analytics, cookies, or local-storage behavior.
- Legal approval is tracked in [PLAN-A-02](PLAN-A-02.md); the Kilo skills migration that previously sat in this plan is unrelated to the frontend and is no longer tracked here.

## 11. Approval gate

- [ ] Owner approves the revised section structure and copy rules (section 4).
- [ ] Owner approves the shared public layout and metadata approach (section 5).
- [ ] Owner approves the performance budget (section 6).
- [ ] Owner authorizes Phases 1–4 (this revision authorizes no code).

## 12. Implementation status — 2026-11-14

| Item | Result |
|---|---|
| Shared `PublicHeader` (landing + compact) and `PublicFooter` (full + compact) | Done; used by landing, auth, legal, Not Found |
| `usePageMeta` (title, description, robots, focus to `h1` after in-app navigation) | Done; used by every route |
| Head tags | `theme-color`, Open Graph, Twitter card, `noscript` added. **Canonical omitted** until the production domain is known |
| Not Found page and unknown-route handling | Done (`noindex`) |
| Client-side routing boundary (`app/router.js`: history API + same-origin link interception, no new dependency) | Done; verified no full reload between landing, auth, legal, and workspace |
| Route code splitting | Done; landing, auth, legal (per document), workspace, Not Found are separate chunks |
| Fonts | Latin subset, weights 400 and 700 only (500/600 resolve to nearest); 2 files instead of 4 |
| CSS split | `index.css` removed; `base`, `public`, `landing`, `auth`, `forms`, `policy`, `workspace` stylesheets load per route; 12 dead rules dropped; rules reformatted |
| Visible-by-default hero | Hero tweens use `fromTo` with a 4 s failsafe that restores opacity. A `motion-ready` class was **not** added; the failsafe covers the same risk. Earlier "opacity 0" reading was a hidden-pane artifact: verified `1` in a visible pane |
| Duplicate reveal system | None found in code (only a `.reveal` hook class); nothing to remove |
| Mobile menu | Escape closes and returns focus to the toggle; focus trap not added because the menu is an inline dropdown, not a modal |
| Product preview label | "illustration · sample project" plus `role="img"` description |
| Dead control | "See how it connects" button replaced with a real link to `#lifecycle`; traceability chain is now an ordered list |
| Motion chunk | GSAP is a separate shared chunk (70 kB, 27 kB gzip) loaded with the landing or workspace route. It is **not** deferred until after first paint |

**Not done:** owner-approved copy edits and section merge (section 4), Lighthouse and LCP/CLS measurement, workspace GSAP trimming (PLAN-A-04).

## 13. Visual redesign — 2026-11-14

A second pass on the landing page after reviewing it section by section (at 625px and 375px panes, plus DOM measurements at 320, 375, and 1440px).

**Problems found**
- The floating header broke between roughly 620 and 960px: the call to action clipped and `Log in` wrapped.
- Primary buttons rendered with an underline everywhere (`.button` lacked `text-decoration: none`).
- The story section was a lone paragraph; the traceability chain wrapped into an empty card with trailing arrows; possibility cards were large empty colour blocks; there was no product visual beyond one small card; long empty gaps separated sections.

**Changes (all flat colour, ink outlines, offset shadows; no gradients)**
- **Header:** menu toggle now takes over at 960px with a full-width panel; inline layout above that.
- **Hero:** two-column composition with a layered workspace window (rail, stats, task rows, trace chips), three floating status cards (verified requirement, due milestone, approved revision), a drawn thread behind the window, orbs, and pointer parallax on fine pointers only. Added an `Explore the demo` button (to `/dashboard`) and two honest facts: early preview, no sign-in needed to look around.
- **Ticker band:** full-bleed ink band scrolling the six-stage chain; pauses on hover; static and wrapped under reduced motion; the duplicate row is hidden from assistive technology.
- **Story:** scattered notes pulled onto one thread (decorative, with the meaning kept in the copy).
- **Traceability:** interactive explorer with six stage knots, a sample record card, and Why it exists / What it becomes lines; arrow-key support, autoplay only while visible and stopped on any interaction or under reduced motion.
- **Tour (new):** tabbed product screens (Overview, Tasks, Requirements matrix with gap cells) built from CSS, labelled as sample data; proper `tablist` keyboard behaviour.
- **Lifecycle:** vertical dashed thread with knots on small screens, horizontal six-column thread from 1100px.
- **Possibilities:** four worlds with icon, example thread chain, and what each becomes; bold offset shadows.
- **Closing:** inverted buttons on the dark band, `Explore the demo`, early-preview note.
- Sections nav gained **Inside**; footer text raised to at least 12px.

**Verification:** lint and build pass; no horizontal overflow at 320 and 375px; desktop at 1440px shows two-column hero, two-column story, six-column lifecycle and traceability, two-column worlds. Landing chunk 51 kB gzip (including GSAP, +3 kB) and 4.2 kB gzip CSS. **Not run:** Lighthouse, screen-reader pass, reduced-motion emulation, cross-browser. Copy for the new sections still needs owner approval (section 4 copy rules).

## 14. Scroll motion pass — 2026-11-14

Goal: make the page feel directed by the scroll, in the way of premium creative sites, while staying accessible and light. All motion lives in `client/src/pages/landing/landingMotion.js`, created inside one `gsap.context()` + `gsap.matchMedia()`; React keeps content and semantic state.

**Added dependency:** `lenis` (smooth scrolling, about 3 kB gzip). Landing chunk is now 59 kB gzip (was 51).

| Moment | Behaviour | Where it runs |
|---|---|---|
| Smooth scroll | Lenis eases wheel scrolling and drives ScrollTrigger; in-page links scroll through it (and to the start of a pinned section) | All sizes, pointer wheel only (touch stays native) |
| Hero intro | Headline words slide up out of masks, then lead, buttons and facts, then orbs, window (settles with a springy tilt), floating cards pop, thread draws; cards then bob. 5 s failsafe forces the end state | All |
| Hero scroll | Copy lifts and fades; window, cards, orbs, and thread drift at different speeds (separate `drift` layer, so pointer parallax is untouched) | All |
| Ticker | GSAP loop speeds up with scroll velocity, reverses with scroll direction, and skews while moving, then eases back | All |
| Headings | Every section heading reveals word by word from a mask; eyebrows and paragraphs fade up | All |
| Background | The page colour washes between flat pastel tints per section (no gradients) | All |
| Page thread | A fixed thread on the left edge draws as you scroll, with a needle dot | 1280px and wider |
| Story | **Pinned.** Scattered notes fly onto one thread as you scroll, then the "One thread" pill appears | 1024px and wider; simple reveal below |
| Traceability | **Pinned.** Scrolling steps through the six stages and fills the thread; clicking a stage overrides until scroll moves on | 1024px and wider and 760px tall or more; otherwise click, keys, and autoplay as before |
| Tour | The product window tilts up and scales into place; tab content staggers in on each switch | All |
| Lifecycle | The dashed thread fills with scroll; cards and knots pop in sequence | All |
| Possibilities | Cards enter with a stagger and tilt, drift at different speeds, and tilt toward the pointer | Drift and tilt: wide screens with a fine pointer |
| Closing | The dark band opens like a curtain (clip-path), the thread draws, the buttons pop | All |
| Pointer | Soft cursor ring that grows over links and buttons (inverts over any background); buttons pull slightly toward the pointer | Fine pointers only |

**Accessibility and safety**
- `prefers-reduced-motion: reduce`: no Lenis, no pins, no scrubs, no cursor, no page thread, and the ticker becomes a static wrapped row; content renders in its final state.
- Headline words remain real text in the DOM; the page never depends on a tween to reveal essential content (hero failsafe; scrub states are visible).
- Nothing is pinned on touch-width screens or short laptop windows, so there is no scroll trap.
- Section tracking in the header uses bounding boxes, so pinned sections still report the right active link.
- Every listener, ticker callback, ScrollTrigger and the Lenis instance are removed on unmount or breakpoint change.

**Verified (dev build, desktop at 1440x900 and 1280x720, mobile 375x800, via DOM probes):** Lenis active; hero intro completes; two pins at 1440x900 (one at 1280x720); traceability stage follows scroll and the thread fill updates; story scraps start scattered and converge; lifecycle fill, tour tilt, and closing clip progress with scroll; in-page link lands on the target; no horizontal overflow; no console errors; mobile has no pins or cursor and all content reaches full opacity. **Not verified:** feel and frame rate on real hardware, Lighthouse, reduced-motion in a real browser setting, cross-browser behaviour (Safari pin and clip-path rendering in particular), screen-reader pass.
