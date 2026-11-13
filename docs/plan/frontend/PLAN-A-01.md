# PLAN-A-01 — Tsumugi Landing Page Static Design

## Plan status

**Status:** GSAP motion upgrade implemented and validated  
**Scope:** Frontend static landing page and supporting legal-document drafts  
**Execution:** Track every implementation and audit item with the checklists below; further changes require a new approved checklist item
**Source specification:** [PROJECT-SPECS.md](PROJECT-SPECS.md)

This plan describes the first visual and content direction for Tsumugi's public landing page. It intentionally excludes authentication behavior, backend integration, data loading, routing implementation, and other application pages. The static landing page and approved GSAP motion upgrade are implemented and validated.

## Checklist rules

- `[x]` Complete and verified against the current codebase.
- `[ ]` Pending implementation, review, or explicit owner decision.
- Every checked implementation item must have supporting evidence in the affected file, a validation result, or both.
- Do not mark an item complete because it is merely planned or visually implied.
- When an item changes, update its checkbox and add a dated entry to `LOG.md`.
- Keep excluded backend and authentication behavior unchecked here; only their static presentation may be checked.

## Implementation and audit checklist

### Foundation and branding

- [x] Render one responsive static landing page from the current Vite client.
- [x] Use Tsumugi as the product identity and Moeko Works as the parent brand.
- [x] Replace current-facing legacy Moesoft references in page content and footer.
- [x] Add branded document title and description metadata.
- [x] Use local assets and CSS/inline-SVG compositions only.
- [x] Keep authentication controls presentation-only; do not add registration, login, session, or API behavior.

### Narrative and content

- [x] Establish the hero promise: “Weaving ideas into finished work.”
- [x] Present the story-led order: invitation, tension, thread, making, many worlds, resolution.
- [x] Explain traceability from objective through requirement, milestone, task, revision, and deliverable.
- [x] Show the production lifecycle from concept through deliverables.
- [x] Include software, creative, research, and multimedia examples.
- [x] Include persistent `Create your workspace` presentation CTAs.
- [x] Include static `Log in` and `Create account` presentation controls.
- [x] Keep the footer identity, description, authentication presentation, and Moeko Works credit.

### Legal references

- [x] Add a clearly labeled `Legal` reference group to the landing-page footer.
- [x] Add accessible reference links for:
  - [x] Privacy Policy / Privacy Notice -> `/docs/privacy-policy.md`
  - [x] Terms of Service / Terms and Conditions -> `/docs/terms-of-service.md`
  - [x] Cookie & Local Storage Policy -> `/docs/cookie-and-local-storage-policy.md`
- [x] Preserve the static-page boundary: legal references do not imply that authentication, cookies, analytics, or account services are already implemented.
- [x] Validate link labels, keyboard focus styling, responsive wrapping, and no-overflow behavior after implementation.
- [ ] Obtain legal/owner review of the drafts before publishing them as binding production policies.

### Visual system

- [x] Apply Fredoka consistently to display, interface, and body text.
- [x] Use light paper/canvas surfaces and the approved pastel accent palette.
- [x] Use substantial dark-ink and accent outlines on components.
- [x] Avoid CSS/UI gradients.
- [x] Apply the hybrid woven/thread background across the page with section interruptions.
- [x] Keep the pattern low contrast and scroll movement subtle.
- [x] Use Lucide icons selectively with decorative icons hidden from assistive technology.

### Interaction and motion

- [x] Provide floating navigation with Story, Traceability, Lifecycle, and Possibilities anchors.
- [x] Track and display the active section.
- [x] Display page progress in the navigation.
- [x] Provide a responsive mobile navigation menu with all section links.
- [x] Add reveal, hover, floating, and scroll-linked motion.
- [x] Provide a `prefers-reduced-motion` fallback.
- [x] Audit the current motion; no further story-specific motion is required for this baseline.

### GSAP motion upgrade — implemented

- [x] Research the GSAP animation architecture and official responsive/cleanup guidance.
- [x] Confirm the GSAP dependency/version policy for the Vite React client before installation.
- [x] Add GSAP and register only the plugins justified by the approved animation inventory.
- [x] Use `gsap.context()` or an equivalent scoped cleanup strategy for every React animation setup.
- [x] Use `gsap.matchMedia()` for responsive animation variants and reduced-motion conditions.
- [x] Use `ScrollTrigger` for section scenes, scrubbed progress, and pinned sequences only where they improve the story.
- [x] Keep the existing CSS/browser motion as a fallback until GSAP behavior is verified.
- [x] Animate the hero product preview through staged objective-to-deliverable states.
- [x] Animate the thread/path composition as a connected visual cue between story sections.
- [x] Add scroll-triggered narrative scenes for story, traceability, lifecycle, possibilities, and closing sections.
- [x] Add restrained GSAP micro-interactions for buttons, cards, navigation, and progress orientation.
- [x] Define future route/page-transition hooks without implementing route behavior in this static page.
- [x] Preserve the no-gradient visual rule and Fredoka/outline/pastel identity.
- [x] Prefer minimal non-essential motion under `prefers-reduced-motion`; never hide essential content.
- [x] Ensure all GSAP timelines, ScrollTriggers, listeners, and media-query contexts are reverted on component unmount or breakpoint changes.
- [x] Audit animation performance, layout stability, mobile behavior, and cleanup before marking the GSAP pass complete.
- [x] Validate the completed GSAP pass against the detailed scene contracts below.

### Accessibility and responsive audit

- [x] Provide semantic landmarks, headings, labels, and a skip link.
- [x] Provide visible keyboard focus styling for links and buttons.
- [x] Verify no horizontal overflow at the tested mobile viewport.
- [x] Verify mobile menu visibility and section-link exposure.
- [x] Verify authentication and CTA controls are understandable as static placeholders.
- [x] Complete a fresh screenshot review at both 500x585 and 1440x900.
- [x] Verify anchor destinations are not obscured by the sticky navigation.
- [x] Verify active-section and progress-meter behavior through the full scroll journey.
- [x] Verify reduced-motion behavior in a browser with the preference enabled.
- [x] Verify contrast and readability over every patterned and colored surface.

### Validation and documentation

- [x] Run `npm run lint` in `client/`.
- [x] Run `npm run build` in `client/`.
- [x] Run `git diff --check`.
- [x] Update `README.md` for current branding and implementation status.
- [x] Update `CODEMAP.md` for the landing-page structure and responsibilities.
- [x] Record implementation and validation actions in `LOG.md`.
- [x] Recheck this checklist after the visual audit and record the result in `LOG.md`.

## Confirmed direction

The project owner has confirmed the following:

- **Reference:** Local Moeko Works portfolio at `C:\Users\Admin\Documents\MoekoWorks\moekoworks_official`, with the deployed reference at `https://moekoworks.vercel.app/`
- **Current brand:** Moeko Works. “Moesoft” is legacy branding and must not be used as the current organization name in Tsumugi content, navigation, footer, or metadata.
- **Theme:** Light theme only
- **Visual metaphor:** Subtle weaving/thread and connection cues
- **Copy tone:** Warm and creative
- **Page structure:** One long-scroll page with anchored sections
- **Design approach:** Hyper-immersive web design, while preserving usability and accessibility
- **Assets:** Existing/local assets only for the first version
- **CTA label:** `Create your workspace`
- **CTA behavior:** Visual-only placeholders until the planned routes exist
- **Hero visual:** Combined static product-interface preview and subtle thread composition
- **Navigation:** Sticky/floating anchored navigation inspired by the Kotoha fansite
- **Motion:** Immersive scroll-led motion with a complete reduced-motion fallback
- **Copy:** Polished warm/creative product copy for review
- **Portfolio navigation reference:** Local Kotoha fansite at `C:\Users\Admin\Documents\MoekoWorks\kotoha-fansite`
- **Progress orientation:** Include a small section progress meter in the sticky navigation
- **Asset policy:** Use CSS/SVG-like compositions only; do not reuse raster assets unless separately approved
- **Copy review:** Review polished copy section-by-section before implementation
- **Personality:** Playful and cheerful while remaining professional, trustworthy, and respectable
- **Default font:** Fredoka
- **Component treatment:** Use more substantial, confident outlines around cards, controls, navigation, and other visual components
- **Color rule:** Do not use gradients; use solid fills, solid accents, and layered surfaces instead
- **Motion:** Increase the amount and expressiveness of animation while preserving accessibility and reduced-motion behavior
- **Icons:** An icon library may be introduced after approval; the preferred initial candidate is Lucide because it provides consistent, outline-based icons that can support the solid-outline component language
- **Typography decision:** Use Fredoka for all page text, including display, interface, and body copy
- **Outline decision:** Use dark ink outlines for structure and colored accent outlines for emphasis
- **Motion character:** Blend bouncy micro-interactions with smooth, theatrical scroll scenes
- **Scroll intensity:** Use continuous scroll-linked movement throughout the page
- **Icon decision:** Adopt Lucide as the icon library
- **Gradient scope:** Prohibit CSS/UI gradients; gradients may appear only in separately approved external imagery
- **Narrative structure:** Permit reordering or merging sections when it improves the immersive story
- **Fredoka weights:** Emphasize friendly medium and bold weights
- **Motion implementation:** An animation library may be evaluated later if native CSS and browser APIs cannot deliver the approved motion
- **Pattern selection:** Use a hybrid of two subtle pattern treatments
- **Pattern motion:** Allow subtle scroll-linked movement
- **Pattern coverage:** Apply the pattern across the whole page, interrupted by section surfaces
- **Research applications:** Apply persistent CTA, stronger product-preview storytelling, concrete workflow examples, and tactile background
- **Kilo migration target:** User-level Copilot settings so migrated skills can be used across conversations and projects
- **Kilo migration scope:** Migrate all eligible skills after locating and reviewing the source files
- **Narrative decision:** Reorder or merge sections into a more story-led sequence based on the research
- **Kilo discovery decision:** Inspect likely local Kilo/configuration paths to locate the source skills
- **Kilo authorization:** Kilo-skill migration is authorized as a separate task; it is independent of the landing-page implementation
- **Playwright review:** The rendered page was reviewed at mobile (500x585) and desktop (1440x900) viewports during the implementation
- **Playwright findings:** No horizontal overflow or CSS gradients were detected; Fredoka is active; the page is approximately 5,200px tall; the hybrid pattern, Moeko Works footer, and story-led structure are implemented
- **Implementation result:** Added the hybrid woven pattern, story-led traceability order, concrete workflow preview, and Moeko Works footer correction; Playwright now confirms headings and preview display text also use Fredoka
- **Next motion direction:** Increase motion further, while keeping accessibility and reduced-motion behavior
- **Next research scope:** Compare immersive editorial and product-storytelling sites
- **GSAP decision:** Plan a GSAP-based motion upgrade before coding; implementation is not authorized by this update
- **GSAP scope:** Scroll-triggered scenes, connected thread motion, hero preview staging, micro-interactions, and future page-transition hooks
- **GSAP plugin policy:** Allow additional GSAP plugins when individually justified and documented; do not add plugins speculatively
- **GSAP reduced-motion policy:** Prefer minimal non-essential motion when reduced motion is requested, while keeping all essential content and navigation stable
- **GSAP performance policy:** Require scoped cleanup, responsive media-query handling, mobile validation, layout-stability checks, and animation performance review

The supplied portfolio reference establishes a light, playful pastel design system with pink, blue, lilac, rose, butter, and peach accents; rounded cards and panels; decorative display typography; tinted shadows; and coordinated motion timing. These reference tokens should guide implementation, but the Tsumugi page should remain a distinct product experience rather than a direct copy of the portfolio. The revised direction adds Fredoka typography, stronger outlines, solid color treatments, more expressive motion, and a warm pattern background. Current brand references must use Moeko Works, not Moesoft.

## 1. Objective

Create a polished, responsive, static landing page that introduces Tsumugi as a creative and technical production-management platform and guides visitors toward registration or login.

The page should communicate the central product idea:

> **Weaving ideas into finished work.**

The design should feel like a natural extension of the existing Moeko Works portfolio identity. The final palette, typography, spacing, decorative motifs, and component language must be extracted from or confirmed against that portfolio rather than invented independently.

## 2. Confirmed requirements from the specification

- The landing page is the public entry point at `/`.
- It must explain Tsumugi's purpose, capabilities, and value proposition.
- It must include clear calls to action for registration and login.
- The public landing page and authenticated application must use separate layouts.
- The visual identity must follow the existing portfolio's design language.
- The page must be responsive and accessible.
- The product supports technical, creative, academic, multimedia, and personal projects.
- Tsumugi's differentiator is production-lifecycle traceability, not only task tracking.
- The initial work is static visual design; no live authentication or API behavior is included.

## 3. Proposed page structure

### 3.1 Public header

- Tsumugi wordmark or text logo
- Short brand descriptor or tagline
- Centered floating/sticky pill navigation modeled on the Kotoha fansite's public navigation pattern
- Anchors to the landing-page sections
- Active-section indication that follows the current viewport section
- `Create your workspace` visual CTA
- Responsive mobile menu treatment
- A compact section progress meter should be included alongside the active navigation indicator

### 3.2 Hero section

Purpose: establish the product identity and value proposition immediately.

Proposed content:

- Eyebrow: `Creative & Technical Production Management`
- Main heading based on: `Weaving ideas into finished work.`
- Supporting text explaining that Tsumugi connects planning, requirements, work, assets, revisions, and deliverables.
- Primary CTA: `Create your workspace`
- Secondary CTA: `Explore the thread` or another approved in-page anchor action
- A visual motif or product preview that suggests connected production threads

For the immersive direction, the hero may use oversized Fredoka type, layered solid pastel surfaces, scroll-responsive thread lines, or a staged product-preview composition. These should support the message and remain usable without motion. Avoid gradient fills in the hero and all other sections.

### 3.3 Supported project types

Purpose: show that the platform is adaptable without making the landing page feel like a generic task manager.

Potential presentation:

- Software development
- Visual novel and creative writing
- Academic research and capstone work
- Multimedia and digital production
- Personal and multidisciplinary projects

Use a scroll-led visual sequence or connected cards with clear solid outlines rather than a conventional dashboard-style grid. The section should feel immersive while still exposing all project types to keyboard and screen-reader users.

### 3.4 Production lifecycle overview

Purpose: explain the platform's core workflow.

Proposed sequence:

`Concept → Requirements → Milestones → Tasks → Revisions → Deliverables`

Each stage should have a short explanation and visually show how records connect across the lifecycle. A pinned or staged scroll section may be used if it remains understandable on mobile and with reduced motion enabled.

### 3.5 Core capabilities

Purpose: summarize the primary modules without implying that they are already implemented.

Potential feature groups:

- Plan projects and milestones
- Organize tasks and requirements
- Store assets and documentation
- Track revisions and decisions
- Understand progress through reports
- Preserve the finished project's history

### 3.6 Traceability differentiator

Purpose: make the strongest product distinction memorable.

Suggested message:

> See not only what needs to be done, but why it exists, what it supports, and what it becomes.

Visual treatment should show the relationship as a subtle connected thread with solid nodes, outlined cards, and animated transitions:

`Objective → Requirement → Milestone → Task → Revision → Deliverable`

### 3.7 Workflow adaptability

Purpose: communicate that different disciplines can use different production processes.

Possible examples:

- Software development
- Visual novel production
- Academic research
- Multimedia production

This section should emphasize adaptable workflows while avoiding a promise of custom workflow builders before that feature is available.

### 3.8 Closing CTA

Purpose: provide a clear conversion point after the visitor understands the product.

Proposed content:

- Short restatement of the product promise
- `Create your workspace`
- Secondary in-page action such as `Back to the beginning` or `Explore the thread`

Because this first version is static, CTA elements should look and behave like intentional presentation controls without linking to unimplemented routes.

### 3.9 Footer

- Tsumugi / Moeko Works identity
- Short product description
- Authentication links
- Placeholder links only where destinations are intentionally not implemented
- Copyright or ownership notice if confirmed

## 4. Visual direction

The existing portfolio reference should guide the landing page through the following implementation choices:

- Light paper/canvas surfaces with ink-colored text
- Pastel pink as the primary accent, supported by blue, lilac, rose, butter, and peach accents
- Friendly rounded cards, panels, chips, and pill-shaped actions
- Decorative display typography for major statements, paired with readable body text
- Tinted depth and layered surfaces instead of harsh neutral shadows
- An expressive motion system with a reduced-motion alternative
- A subtle thread/connection motif to express lifecycle traceability

Do not copy the portfolio's entire application shell or introduce its authenticated navigation. Tsumugi's landing page needs its own public header, long-scroll narrative, and product-specific content.

### 4.1 Brand correction

- Replace all current-facing “Moesoft” references with “Moeko Works”.
- Treat Tsumugi as a Moeko Works product, not a Moesoft product.
- Keep the Tsumugi wordmark and product personality distinct from the Moeko Works parent brand.
- Audit page copy, footer text, metadata, accessibility labels, documentation, and future assets for legacy naming before the next implementation pass.

### 4.2 Pattern background direction

The page should not use a cold, pure-white background. Add a simple, low-contrast, brand-specific repeating pattern that provides warmth without competing with text or product visuals.

Candidate pattern directions:

1. **Woven grid:** Thin interlaced lines inspired by threads and fabric, using a very pale ink or lilac on a paper canvas.
2. **Soft dot field:** Sparse, irregularly spaced dots with occasional larger anchor points, suitable for a cheerful but restrained background.
3. **Thread-loop pattern:** Repeating curved line loops that echo the traceability motif without becoming a literal textile texture.
4. **Paper fleck:** A minimal CSS/SVG-like speckle or fiber pattern for warmth, with no photographic raster asset.

Selected direction: **hybrid**. Combine two restrained pattern ideas, preferably a woven grid with sparse paper-fleck or thread-loop accents. The combination must remain quiet enough that the page content, outlined components, and product preview remain primary.

Pattern constraints:

- Use CSS or inline SVG-like local composition only unless a separate asset is approved.
- Keep contrast low enough to preserve WCAG text readability and clear content hierarchy.
- Avoid gradients in CSS/UI styling.
- Keep pattern density and movement stable enough to avoid visual fatigue.
- Allow section surfaces and outlined cards to interrupt the pattern so the page retains rhythm.
- Provide a reduced-motion state with no animated pattern movement.
- Permit only subtle scroll-linked movement for the selected hybrid pattern; movement must not create parallax discomfort or interfere with reading.

### 4.3 Research findings and selective inspirations

The following public design references were compared for transferable patterns, not for visual copying:

| Reference | Useful pattern to borrow | What to avoid for Tsumugi |
| --- | --- | --- |
| Linear-style product pages | Strong product-specific headline, cinematic sequencing, and confident motion | Dark cinematic palette, GPU-heavy effects, and gradient-led art direction conflict with the approved light/no-gradient identity |
| Notion-style product pages | Persistent CTA placement, feature-specific product context, and concrete workflow explanation | Repetitive SaaS section templates and generic productivity language |
| Stripe-style product pages | Clear hierarchy, early explanation of value, and strong information grouping | Dense technical sections, enterprise tone, and visually heavy data presentation |
| Kotoha fansite reference | Floating pill navigation, active-section feedback, responsive menu, and progress orientation | Fan-site branding, copied decorative assets, or unrelated content patterns |
| Web texture guidance, including Clay's texture article | Subtle repeatable texture can add warmth and depth when contrast and performance are controlled | Heavy texture, noisy backgrounds, and texture competing with readable content |

Recommended principles for Tsumugi:

- Keep the direct, specific hero message and product-in-context preview.
- Use a persistent but restrained CTA and navigation orientation system.
- Explain the lifecycle through concrete visual examples rather than feature-only claims.
- Use the pattern background as a tactile canvas, not as the main attraction.
- Retain Tsumugi's Fredoka, pastel, solid-outline, thread, and Moeko Works identity.

Selected applications for the next design revision:

- Keep a persistent but restrained CTA available through the floating navigation and closing CTA.
- Make the product preview explain a concrete workflow rather than act as a decorative dashboard mockup.
- Add concrete workflow examples for the supported project types and traceability chain.
- Use the selected hybrid pattern as a tactile page canvas with section-level surface interruptions.

### 4.4 Playwright review and design implications

The current evaluation baseline was inspected with Playwright:

- **Mobile at 500x585:** The hero is readable, Fredoka is active, primary controls are usable, and no horizontal overflow was detected.
- **Desktop at 1440x900:** The floating navigation and hero product preview establish a clear visual identity and the main hierarchy is understandable.
- **Page length:** The page is approximately 5,200px tall, so mobile pacing, section density, and repeated CTA placement need deliberate review.
- **Current status:** The footer now says “A Moeko Works project” and the hybrid warm pattern background is implemented.
- **Current motion assessment:** Existing motion includes reveal, floating, hover, and scroll-linked preview/pattern movement; further motion remains an optional refinement.

The next review must test both visual appearance and interaction behavior: anchor navigation, mobile menu state, active-section updates, progress meter behavior, CTA presentation, focus visibility, reduced-motion behavior, and absence of horizontal overflow.

### 4.5 Story-led restructure

The page currently reads as a sequence of distinct content blocks. The next design should connect sections into a stronger narrative rather than simply adding more modules.

Proposed story arc:

1. **Invitation:** Introduce Tsumugi and the feeling of making something meaningful.
2. **Tension:** Show why a checklist alone cannot preserve the whole production story.
3. **Thread:** Demonstrate the traceability chain as the signature product idea.
4. **Making:** Show the lifecycle and concrete workflow examples in context.
5. **Many worlds:** Show how the same thread adapts to software, creative, research, and multimedia work.
6. **Resolution:** Close with a calm, confident invitation to create a workspace.

Sections may be merged, reordered, or visually overlapped to support this arc. Avoid a repetitive sequence of eyebrow, heading, card grid, and whitespace if it weakens continuity.

### 4.6 Pattern and product-preview requirements

- Add the selected hybrid woven/thread pattern across the page with section-level surface interruptions.
- Use subtle scroll-linked pattern movement, not a distracting parallax layer.
- Keep the pattern low contrast, lightweight, and absent or static under reduced motion.
- Make the hero preview communicate a concrete workflow: show an objective becoming a requirement, milestone, task, revision, or deliverable.
- Prefer one coherent product story over several decorative dashboard fragments.
- Use visual state changes, labels, and connections that are understandable without animation.
- Correct all legacy Moesoft references to Moeko Works before the next visual review.

### 4.7 Mobile and accessibility review requirements

- Review the full page at narrow mobile widths, including the approximately 5,200px scroll journey.
- Verify that the sticky navigation does not obscure headings or anchor destinations.
- Verify that the mobile menu opens, closes, and exposes all intended section links.
- Verify visible keyboard focus for navigation, buttons, and links.
- Verify readable contrast over the pattern background and all colored surfaces.
- Verify `prefers-reduced-motion` removes scroll-linked and decorative motion without hiding content.
- Verify no horizontal overflow at mobile and tablet widths.
- Verify progress meter and active-section state remain understandable when navigation collapses.

### 4.8 Revised personality and visual constraints

- Balance cheerful details with clear information hierarchy and restrained product language.
- Use Fredoka consistently for display, interface, and body text.
- Favor solid pastel fills, solid accent colors, and visible outlines over gradients.
- Use dark ink outlines for component structure and colored accent outlines for emphasis on active, featured, or interactive elements.
- Keep the page playful through proportion, iconography, expressive shapes, micro-interactions, and motion rather than excessive decoration.
- Avoid visual treatments that make the page resemble an autogenerated template or generic AI product landing page.

### 4.9 Immersive design constraints

- Use visual continuity between sections so the page feels like one unfolding narrative.
- Prefer scroll-led reveals, connected lines, layered compositions, and changing scale over disconnected feature cards.
- Keep headings, section landmarks, and CTA controls semantically discoverable.
- Ensure all essential content remains available without animation, hover, or pointer interaction.
- Respect `prefers-reduced-motion` and avoid motion that blocks reading or navigation.
- Maintain readable contrast and visible keyboard focus states.
- Optimize local assets and avoid adding heavy media solely for decoration.
- Use the Kotoha fansite's floating pill, active-link, responsive-menu, and progress-orientation ideas as interaction references, not as copied branding or content.

### 4.10 Motion and animation direction

The revised design should use more motion than the first pass, with animation treated as part of the storytelling system:

- Continuous scroll-linked thread movement and section progression
- Staggered entrance of lifecycle steps and project-type cards
- Playful but controlled hover/tap responses on buttons, icons, and cards
- Floating or orbiting decorative elements that remain visually secondary
- Active navigation indicator movement between anchored sections
- Stateful transitions for the mobile menu and navigation progress meter
- Subtle changes in scale, position, rotation, or outline emphasis as sections enter focus

Motion should blend bouncy micro-interactions with smooth, theatrical scroll scenes. It must have a clear purpose, avoid excessive repetition, remain performant, and provide a complete `prefers-reduced-motion` alternative. Do not use animation as a substitute for readable content.

For the next revision, increase motion further through more expressive scroll-linked scenes, connected thread movement, staged product-preview transitions, and richer section-to-section continuity. The increase must follow the story arc rather than add motion uniformly to every element.

### 4.10.1 GSAP implementation direction

GSAP is the selected animation engine for the next motion revision, but this section does not authorize implementation. The upgrade should use GSAP where timeline coordination and scroll synchronization provide a clear benefit over the current native CSS/browser motion.

Planned animation surfaces:

- **Hero preview:** Stage the objective, requirement, milestone, task/revision, and deliverable relationship as a readable sequence.
- **Thread composition:** Move or reveal connected paths and nodes as the visitor progresses through the story.
- **Story sections:** Use restrained `ScrollTrigger` scenes to transition from tension to traceability to lifecycle to supported project worlds.
- **Micro-interactions:** Add tactile but short responses to buttons, cards, active navigation, and the progress meter without delaying interaction.
- **Future page transitions:** Define reusable hooks for later route transitions, but keep the current landing page static and route-free.

Technical requirements:

- Use `gsap.context()` or an equivalent scoped context so React unmounts revert all animations and inline styles.
- Use `gsap.matchMedia()` to separate desktop/mobile behavior and include a `prefers-reduced-motion` condition.
- Register `ScrollTrigger` and any additional plugin only when used; document why each additional plugin is needed.
- Prefer transform and opacity animation, avoid layout-thrashing properties, and refresh triggers after responsive layout changes when necessary.
- Preserve the existing CSS/browser fallback until GSAP has passed interaction and accessibility validation.
- Do not pin or scrub so aggressively that headings, controls, or essential copy become inaccessible.
- Treat reduced motion as minimal non-essential motion: content remains visible, navigation remains functional, and decorative movement is removed or softened.

Research basis:

- GSAP `matchMedia()` supports responsive conditions, records animations created in its context, and reverts matched animations when conditions change: <https://gsap.com/docs/v3/GSAP/gsap.matchMedia/>
- GSAP `matchMediaRefresh()` can re-run responsive animation contexts after a media-query state change: <https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh/>
- These references support the planned cleanup, responsive, and reduced-motion requirements; they do not replace repository-specific testing.

### 4.10.2 Detailed GSAP scene plan

The GSAP pass should be implemented as a small motion system rather than a collection of unrelated effects. Each scene must have one visual purpose, one owner, one trigger contract, and one reduced-motion behavior.

#### Motion architecture

- Create one scoped animation setup for the landing page after the DOM is rendered.
- Keep React state responsible for semantic state (`activeSection`, `menuOpen`, and progress); keep GSAP responsible for presentation state only.
- Prefer class hooks or dedicated `data-motion` attributes over fragile element-order selectors.
- Use `gsap.set()` for initial visual states only when the reduced-motion branch also receives a stable visible state.
- Keep the existing `IntersectionObserver` reveal system until each equivalent GSAP scene has passed validation; remove duplicated reveal behavior only in a later cleanup step.
- Centralize animation defaults for duration, easing, and scrub values so the page retains one motion language.
- Use `ScrollTrigger.refresh()` only after measurable layout changes, not on every scroll event.

#### Scene contract: hero entrance and preview

- **Owner:** `.hero`, `.hero__copy`, `.hero__visual`, `.preview-card`, `.thread-mark`.
- **Trigger:** page load for the initial entrance; hero viewport progress for scroll-linked preview movement.
- **Sequence:** eyebrow and heading reveal first, lead and actions second, then preview card, thread paths, and decorative orbs.
- **Preview staging:** reveal the workflow in readable groups: objective context, flow labels, then linked status rows.
- **Scroll behavior:** use a low-amplitude scrubbed translation/rotation for the preview and thread; do not animate text in a way that changes its meaning or causes reflow.
- **Fallback:** all copy and workflow states remain fully visible if motion is skipped.
- **Reduced motion:** show the final hero and preview state immediately; allow only a short opacity transition if it does not interfere with reading.

#### Scene contract: story and traceability

- **Owner:** `#story`, `#traceability`, `.traceability__copy`, `.traceability__chain`, `.chain-item`.
- **Trigger:** section entry plus a bounded progress range while the traceability section is in view.
- **Sequence:** tension copy settles into place, then the chain container appears, then nodes/arrows emphasize left-to-right continuity.
- **Scroll behavior:** use staggered opacity/translation and a restrained path/node emphasis; do not repeatedly replay large rotations.
- **Navigation relation:** active navigation remains driven by the existing scroll-position logic, not by animation callbacks.
- **Reduced motion:** show the complete chain and all labels without stagger dependence.

#### Scene contract: lifecycle

- **Owner:** `#lifecycle`, `.section-heading`, `.lifecycle-card`.
- **Trigger:** lifecycle section entry.
- **Sequence:** heading first, then six lifecycle cards in an intentional stagger matching the production order.
- **Scroll behavior:** cards may use small vertical lift/scale and accent emphasis; do not pin the entire six-card track on narrow screens.
- **Responsive behavior:** desktop may use a horizontal progression; mobile should use a simple vertical or grid reveal without forced horizontal travel.
- **Reduced motion:** cards render in their normal layout with no delayed dependency between steps.

#### Scene contract: possibilities

- **Owner:** `#possibilities`, `.possibilities__grid`, `.possibility-card`.
- **Trigger:** section entry and optional hover/tap interaction.
- **Sequence:** section heading, then cards in a short stagger that supports scanning.
- **Scroll behavior:** use subtle alternating offsets to make the four project worlds feel connected without making them bounce continuously.
- **Interaction behavior:** hover/tap motion must be interruptible and must not alter card content or keyboard focus.
- **Reduced motion:** preserve the solid color variations and card hierarchy without movement.

#### Scene contract: closing resolution

- **Owner:** `.closing`, `.closing__thread`, `.closing .button`.
- **Trigger:** closing section entry.
- **Sequence:** thread settles behind the heading, then the CTA receives a single emphasis pass.
- **Scroll behavior:** avoid pinning the closing section; preserve a calm endpoint and reliable footer access.
- **Reduced motion:** render the thread and CTA at their final stable state.

#### Navigation and micro-interactions

- Animate only presentation properties for `.nav-link`, `.nav-meter span`, `.button`, `.text-link`, and `.menu-toggle`.
- Keep `aria-current`, `aria-expanded`, focus order, and button/link semantics controlled by React and the DOM.
- Use GSAP for active-indicator movement only if it can gracefully handle direct anchor jumps, keyboard navigation, resize, and reduced motion.
- Avoid competing GSAP transforms with CSS hover transforms; choose one owner per property.
- Menu open/close animation must not leave the mobile navigation visually hidden while it remains keyboard accessible.
- On route-less CTA buttons, animate feedback only; do not imply navigation or successful authentication.

#### Responsive and reduced-motion matrix

| Condition | Desktop | Mobile/tablet | Reduced motion |
| --- | --- | --- | --- |
| Hero | staged entrance, light scrub | shorter entrance, no aggressive scrub | stable final state |
| Thread | path/node continuity | simplified amplitude and fewer simultaneous effects | static paths/nodes |
| Lifecycle | staggered progression | compact stagger or immediate reveal | immediate reveal |
| Possibilities | alternating card offsets | simple reveal and tactile hover/tap | static cards |
| Navigation | active indicator tween | menu transition with focus-safe state | immediate open/close |
| Closing CTA | one emphasis pass | one emphasis pass | stable CTA |

#### Performance and failure criteria

- Animate `transform`, `opacity`, and SVG presentation values where practical; avoid animating layout-affecting dimensions, margins, or text metrics.
- Do not create a ScrollTrigger for every small child when one parent timeline can coordinate the scene.
- Verify no cumulative layout shift is introduced by initial GSAP states.
- Verify rapid scrolling, reverse scrolling, anchor jumps, resize, mobile menu toggling, and repeated route reloads do not leave stale transforms or duplicate triggers.
- Verify all triggers are removed on component unmount and recreated cleanly after responsive media-query changes.
- Verify the browser remains responsive on the 500px viewport and that the page remains usable with touch input.
- Treat any hidden essential content, inaccessible focused control, overflow, or stuck animation as a failed GSAP pass.

### 4.11 Icon-library direction

**Lucide** (`lucide-react`) is the selected icon library because its open, consistent stroke icons can be customized to match Tsumugi's stronger outlines. Before adding it, verify:

- The package fits the current Vite React client and dependency policy.
- Icon stroke width, size, and corner treatment can be standardized.
- Icons are used to reinforce meaning rather than decorate every element.
- Decorative icons are hidden from assistive technology when they do not convey information.

Lucide is already adopted in the current implementation. Continue using icons selectively to reinforce meaning rather than decorate every element.

## 5. Kilo skills migration

The user has agentic-coding skills installed in Kilo and asked whether they can be migrated into this chat/Copilot/project. Treat migration as a separate customization task, not as part of the landing-page implementation.

Potential migration targets:

- **Repository-scoped instructions:** Convert durable project rules into `.github/copilot-instructions.md` or another repository-supported instruction file.
- **Reusable workflows:** Convert task-specific Kilo skills into `.github/skills/<name>/SKILL.md` packages where the workflow maps cleanly to Copilot skills.
- **Prompts:** Convert single-purpose Kilo commands into `.github/prompts/*.prompt.md`.
- **Agents:** Convert role-based Kilo agents into `.github/agents/*.agent.md` only when context isolation or tool restrictions are needed.
- **Reference material:** Preserve supporting templates/scripts as skill assets rather than copying opaque or irrelevant files.

Selected migration direction:

- Locate the Kilo installation/source skills before copying.
- Migrate all eligible skills, not only a selected subset.
- Target user-level Copilot settings so the skills can be reused across conversations and projects.
- Do not create the migrated files during this landing-page planning pass; migration requires a separate inspection and confirmation step.

Migration safeguards:

- Inspect the Kilo skill files and licensing/ownership context before copying.
- Do not migrate secrets, credentials, personal data, or unrelated machine configuration.
- Preserve only instructions that are compatible with Copilot/VS Code customization formats.
- Avoid duplicating this repository's `INSTRUCTIONS.md` rules or creating conflicting instruction sources.
- Confirm whether migration should be repository-scoped or user-scoped before creating customization files.
- Validate migrated frontmatter, discovery descriptions, file locations, and invocation behavior.

## 6. Static implementation boundary

### Included when execution is authorized

- One landing page rendered from the current client
- Static content and responsive layout
- A footer legal-reference group linking to the reviewed policy documents
- Reusable local components where useful
- Accessible semantic structure and keyboard-friendly interactions
- Visual states for buttons and navigation presentation
- Local assets only, unless external assets are explicitly approved

### Excluded from this plan

- User registration, login, password recovery, or session handling
- Backend/API calls
- Database or object storage integration
- Protected routes and dashboard layout
- Functional project creation or management
- Analytics instrumentation
- Final production deployment
- Legal advice, jurisdiction selection, or publication of unreviewed policy drafts

## 7. Proposed implementation sequence

- [x] Confirm the portfolio/design reference and visual preferences.
- [x] Confirm landing-page content tone and CTA wording.
- [x] Confirm the single long-scroll page and section-navigation approach.
- [x] Inspect the existing client scaffold and identify reusable assets.
- [x] Establish the approved design tokens and page shell.
- [x] Build the static page sections in semantic order.
- [x] Add responsive behavior, static authentication placeholders, branded metadata, and accessible focus/hover states.
- [x] Run the client lint and production build.
- [x] Review the rendered page and revise against the approved direction.
- [x] Update `README.md`, `CODEMAP.md`, and `LOG.md` after implementation.
- [x] Complete the outstanding visual audit checklist before declaring this revision final.
- [x] Add and validate the legal-reference group; retain the supporting drafts' owner/legal review as a publication prerequisite.
- [ ] Review and finalize legal-document placeholders, effective dates, jurisdiction, contact details, and actual data practices before publication.

## 8. Research and migration questions before execution

- [x] Complete immersive editorial/product-storytelling comparisons and add only transferable findings.
- [x] Confirm that no additional landing-page implementation pass is required for this audit; future changes require new explicit authorization.
- [x] Approve the GSAP motion upgrade before changing dependencies or frontend code.

### Proposed section priority

The first implementation should prioritize the narrative and differentiator over breadth:

1. Hero and product promise
2. Traceability thread
3. Production lifecycle
4. Supported project types
5. Core capabilities
6. Workflow adaptability
7. Closing CTA and footer

If the page becomes too long, capabilities and workflow adaptability may be condensed into the lifecycle narrative. Hero, traceability, lifecycle, and closing CTA should remain distinct.

## 9. Approval gate

- [x] The project owner authorized the selected landing-page updates for evaluation.
- [x] Complete the remaining visual and interaction audit items above.
- [x] Obtain approval before adding any new design or behavior outside the checked baseline.

The current revision remains a static evaluation page rather than a production application. Kilo-skill migration remains separately authorized and is tracked outside this landing-page checklist. Future page-transition hooks remain intentionally unimplemented.

The legal documents in `docs/` are planning drafts only. They must be reviewed against the deployed product's actual data practices and by qualified legal counsel before being presented as final policies.
