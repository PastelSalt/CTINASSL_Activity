# Development Log

This file records actions made in the repository. Entries are chronological; each entry includes the date, affected paths, action, and result.

## 2026-11-11

- **Created** `INSTRUCTIONS.md` with repository rules for maintaining the development log, code map, and project documentation.
- **Created** `LOG.md` to record repository actions going forward.
- **Updated** `README.md` to describe the repository's current Vite React client and server package accurately.
- **Created** `CODEMAP.md` as the current developer and agent index.
- **Validation:** Documentation-only changes; no build or test command was required.
- **Analyzed** `PROJECT-SPECS.md` and updated `README.md` with the Tsumugi product vision, planned capabilities, routes, target architecture, and current implementation status.
- **Validation:** Documentation-only change; no build or test command was required.
- **Implemented** the approved GSAP motion upgrade in `client/src/App.jsx` and `client/src/index.css`, including GSAP/ScrollTrigger, scoped cleanup, responsive matchMedia conditions, hero staging, preview/thread motion, narrative section scenes, and reduced-motion behavior.
- **Installed** `gsap` in `client/package.json` and updated `client/package-lock.json`.
- **Updated** `PLAN-A-01.md`, `README.md`, and `CODEMAP.md` to reflect the completed motion system.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed. Playwright confirmed the page title, mobile structure, no-overflow behavior, visible fallback content, and reduced-motion stability.
- **Added** a legal-reference requirement to `PLAN-A-01.md` for Privacy Policy, Terms of Service, and Cookie & Local Storage Policy links in the landing-page footer. The UI work remains pending approval and implementation.
- **Created** draft legal documents in `docs/`: `privacy-policy.md`, `terms-of-service.md`, and `cookie-and-local-storage-policy.md`.
- **Updated** `README.md` and `CODEMAP.md` to index the new draft-document folder.
- **Validation:** Documentation-only change; legal drafts are explicitly marked for owner and qualified legal review before publication.
- **Implemented** the landing-page legal reference group in `client/src/App.jsx` and `client/src/index.css`, linking to the Privacy Policy, Terms of Service, and Cookie & Local Storage draft documents.
- **Updated** `PLAN-A-01.md` to mark the legal-reference implementation and validation items complete while retaining legal review as a publication prerequisite.
- **Created** `PLAN-A-02.md` with the implementation plan for three standalone, design-adapted legal policy pages.
- **Updated** `README.md` and `CODEMAP.md` to index the new plan and landing-page legal references.
- **Validation:** Client lint, production build, link-label inspection, and `git diff --check` passed. Policy-page implementation remains pending approval under PLAN-A-02.
- **Executed** `PLAN-A-02.md` by adding route-selected static policy pages for `/privacy-policy`, `/terms-of-service`, and `/cookie-and-local-storage-policy` in `client/src/App.jsx`.
- **Added** a shared policy-page shell, responsive document layout, draft status, return-to-home navigation, and footer policy switcher in `client/src/index.css` and `client/src/App.jsx`.
- **Updated** the landing-page footer links to reference the website routes instead of Markdown files.
- **Updated** `PLAN-A-02.md`, `README.md`, and `CODEMAP.md` to reflect the implemented pages and remaining legal-review requirements.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed. Direct route, cross-link, responsive, focus, and no-overflow browser checks completed.
- **Refined** policy-page document titles so each route exposes its specific policy name in the browser title.
- **Validation:** Browser checks confirmed all four routes render with distinct titles, expected headings, working policy links, and no horizontal overflow at the mobile viewport.
- **Refactored** the three legal pages out of `client/src/App.jsx` into `client/src/pages/PolicyPage.jsx`, keeping route data, shared rendering, document titles, and policy navigation together in a maintainable page module.
- **Updated** `CODEMAP.md` and `PLAN-A-02.md` to document the page-module structure.
- **Separated** route-keyed policy content into `client/src/pages/policyPages.js` after lint identified the React Fast Refresh export constraint.
- **Added** individual page entry components for Privacy Policy, Terms of Service, and Cookie & Local Storage Policy, plus `client/src/pages/index.js` for route mapping.
- **Created** `PLAN-A-03.md` as a planning-only document for the future sign-up and login pages, including landing-page integration and links to all three legal policy routes.
- **Updated** `README.md` and `CODEMAP.md` to index the new authentication-page plan.
- **Validation:** Documentation-only change; no frontend code or authentication behavior was added.
- **Created** `PLAN-A-04.md` after rereading PROJECT-SPECS sections 3.2, 3.3, 4.1, and 8. The plan covers a Figma-style authenticated dashboard exploration, credential-free placeholder login, dashboard fixture data, the shared application shell, and a Tsumugi translation of the supplied floating navigation reference.
- **Updated** `README.md` and `CODEMAP.md` to index the dashboard exploration plan.
- **Validation:** Documentation-only change; no dashboard, route, authentication, or data behavior was added.
- **Executed** `PLAN-A-04.md` with a placeholder authenticated dashboard exploration under `client/src/pages/dashboard/`.
- **Added** dashboard fixture data, a responsive dashboard shell, metric/project/milestone/task/activity panels, placeholder destination routes, a floating Lucide navigation dock inspired by the supplied reference, legal links, and credential-free `/login` to `/dashboard` navigation.
- **Updated** `PLAN-A-04.md`, `README.md`, and `CODEMAP.md` to reflect the dashboard exploration.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser checks for dashboard/auth/legal routes and mobile overflow passed.
- **Analyzed** the authenticated routes and functional modules in `PROJECT-SPECS.md` and expanded `PLAN-A-04.md` with page-by-page requirements for dashboard, projects, project workspace, milestones, tasks, requirements, assets, revisions, documentation, reports, and settings.
- **Added** cross-page requirements for traceability, explicit record relationships, calculation-backed metrics, shared shell consistency, loading/empty/error/unauthorized states, object-storage boundaries, Markdown documentation, revision history, configurable workflows, and future MUI/router architecture.
- **Validation:** Documentation-only change; no frontend implementation behavior was changed.
- **Executed** the expanded page-by-page portion of `PLAN-A-04.md`.
- **Added** fixture-driven placeholder views for projects, milestones, tasks, requirements, assets, revisions, documentation, reports, and settings, plus a revisions route in the authenticated navigation map.
- **Added** page-specific table schemas, future data-source notes, dashboard metric definitions, traceability vocabulary, object-storage boundaries, and responsive module styling.
- **Validation:** Client lint, production build, diff whitespace, authenticated route rendering, login-to-dashboard navigation, and mobile no-overflow checks passed.
- **Refined** the compact navigation dock so the active route remains visible even when it is outside the first five dock items.
- **Validation:** Route checks confirmed `aria-current="page"` for every authenticated module route after the navigation refinement.
- **Fixed** desktop dashboard navigation hiding routes after Requirements by rendering the full route set on desktop and applying compact hiding only below the mobile breakpoint; the active mobile route remains visible.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser checks passed. Desktop displays all 10 navigation links; mobile keeps a compact five-link dock while preserving the active route, with no horizontal overflow.
- **Updated** `PLAN-A-04.md` with the approved floating left-side section-navigation concept for every authenticated dashboard page. The plan now defines the two-region layout, route-specific subsection maps, responsive behavior, accessibility requirements, and separation from the existing bottom top-level module navigation.
- **Validation:** Documentation-only change; no frontend code was changed.
- **Created** page-specific PLAN-A-04 child plans:
  - `PLAN-A-04A.md` for `/dashboard`
  - `PLAN-A-04B.md` for `/projects`
  - `PLAN-A-04C.md` for `/projects/:projectId`
  - `PLAN-A-04D.md` for `/milestones`
  - `PLAN-A-04E.md` for `/tasks`
  - `PLAN-A-04F.md` for `/requirements`
  - `PLAN-A-04G.md` for `/assets`
  - `PLAN-A-04H.md` for `/revisions`
  - `PLAN-A-04I.md` for `/documentation`
  - `PLAN-A-04J.md` for `/reports`
  - `PLAN-A-04K.md` for `/settings`
- **Updated** `CODEMAP.md` to index the child plans.
- **Validation:** Documentation-only change; no application code was changed.
- **Reorganized** all frontend plan documents from the repository root into `docs/plan/frontend/`, preserving the PLAN-A numbering:
  - `PLAN-A-01.md` landing page
  - `PLAN-A-02.md` legal pages
  - `PLAN-A-03.md` authentication pages
  - `PLAN-A-04.md` authenticated dashboard/user pages
  - `PLAN-A-04A.md` through `PLAN-A-04K.md` page-specific dashboard plans
- **Created** `docs/plan/backend/` as the reserved location for future PLAN-B backend documents.
- **Updated** `README.md` and `CODEMAP.md` with the new plan organization and links.
- **Validation:** Documentation move and reference updates completed; no application code changed.
- **Executed** the authenticated workspace naming revision from `PLAN-A-04.md`:
  - Renamed `client/src/pages/dashboard/` to `client/src/pages/workspace/`.
  - Renamed the shared route component and fixture module to `WorkspacePage.jsx` and `workspaceData.js`.
  - Renamed workspace CSS selectors and route exports from dashboard-oriented names.
  - Changed the `/dashboard` navigation label to `Overview` while preserving the `/dashboard` URL.
  - Updated README and CODEMAP terminology to distinguish the Overview page from other protected user pages.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser smoke checks for `/projects`, search filtering, and archived-project rendering passed.
- **Executed** `PLAN-A-04C.md` for the `/projects/:projectId` project workspace:
  - Added dynamic project-detail route handling for known demo project IDs and a missing-project state.
  - Added compact project identity, collaborator/status context, presentation-only edit/archive actions, and project-scoped nested sections.
  - Added project overview, workflow phases, milestones, tasks, requirements, assets, documentation, revisions, deliverables, and objective-to-deliverable traceability presentation.
  - Added project workspace fixture records and responsive styling.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser smoke checks for a known project workspace, workflow-section switching, and missing-project handling passed.
- **Executed** `PLAN-A-04D.md` for the `/milestones` protected user page:
  - Added milestone fixtures with project references, dates, status, priority, linked tasks, dependencies, and deliverables.
  - Added dedicated all-milestones, timeline, upcoming, overdue/blocked, and completed section views.
  - Added milestone summary counts, responsive list/timeline presentation, project links, and placeholder-state messaging.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser smoke checks for the milestone register, timeline links, and overdue/blocked filtering passed.
- **Created** [`CONTEXT.md`](CONTEXT.md) as a portable continuation handoff containing the conversation decisions, plan organization, authenticated workspace architecture, completed PLAN-A-04B/04C/04D work, validation history, current file boundaries, and exact next steps for PLAN-A-04E.
- **Validation:** `git diff --check` passed; documentation-only handoff file added and no application behavior changed by this entry.
- **Executed** `PLAN-A-04B.md` for the `/projects` protected user page:
  - Added project-directory fixtures with descriptions, ownership, priority, tags, timestamps, archive state, and detail IDs.
  - Added card/table view switching, project search, status/category filters, reset behavior, status-group/recent/archive section states, and no-results guidance.
  - Added presentation-only links to `/projects/:projectId` and a create-project entry point through the shared page action.
  - Added responsive project-directory styling while retaining the authenticated workspace shell and reduced-motion behavior.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser smoke checks for `/projects`, search filtering, and archived-project rendering passed.
- **Executed** the approved compact-header and GSAP motion updates from `PLAN-A-04.md`.
- **Refined** authenticated page spacing and title scale, retained compact contextual actions, and moved page-local content closer to the header.
- **Added** scoped GSAP entry and section-change motion with `gsap.context()`, reduced-motion handling via `gsap.matchMedia()`, immediate-render safeguards, and visible fallback content.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, desktop/mobile layout checks, section-navigation checks, and reduced-motion rendering checks passed.
- **Executed** the approved floating page-local section navigation from `PLAN-A-04.md`.
- **Added** reusable left-side section navigation with route-specific section definitions for every authenticated page, right-side section content switching, and a compact horizontal mobile treatment.
- **Kept** the existing bottom dock as top-level module navigation and preserved the static/demo-only boundary.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, desktop section-navigation rendering, section switching, active-state checks, and mobile no-overflow validation passed.
- **Updated** `PLAN-A-04.md` with a planning-only visual refinement pass for compact authenticated page headers and GSAP motion across dashboard pages.
- **Added** compact-header requirements, responsive spacing rules, page-by-page motion direction, GSAP cleanup/matchMedia safeguards, reduced-motion requirements, and a visual approval gate.
- **Validation:** Documentation-only change; no frontend code was changed.
- **Executed** `PLAN-A-03.md` by adding static `/login` and `/register` page routes with a Google-inspired layout translation, Tsumugi branding, static form presentation, route switching, legal links, and a custom thread illustration.
- **Updated** the landing page authentication controls to link to `/login` and `/register`.
- **Updated** `PLAN-A-03.md`, `README.md`, and `CODEMAP.md` to reflect the implemented static authentication pages and shared page modules.
- **Validation:** `npm run lint`, `npm run build`, `git diff --check`, and browser route/responsive/overflow checks passed. Authentication behavior remains intentionally unimplemented.
- **Refined** authentication page titles to identify `Create account | Tsumugi` and `Log in | Tsumugi`.
- **Validation:** Browser checks confirmed landing-page auth links, auth-page legal links, form presence, distinct headings/titles, and no mobile overflow.
- **Reorganized** `client/src/pages/` into `legal/` and `auth/` subfolders. Added dedicated route indexes and updated the root page index to re-export both route maps.
- **Updated** `CODEMAP.md` to document the new page organization.
- **Created** `PLAN-A-01.md` with a preliminary static landing-page design plan based on `PROJECT-SPECS.md`, including scope, proposed sections, visual decisions, implementation boundaries, and an approval gate.
- **Validation:** Documentation-only change; no build or test command was required.
- **Refined** `PLAN-A-01.md` after confirming the Moesoft portfolio reference, light-only theme, warm tone, subtle weaving motif, long-scroll immersive structure, local-assets-only policy, `Create your workspace` CTA, and visual-only CTA behavior.
- **Inspected** the portfolio reference's design tokens and base styles to align the plan with its pastel palette, rounded surfaces, display typography, tinted depth, and motion approach.
- **Updated** `CODEMAP.md` to index `PROJECT-SPECS.md` and `PLAN-A-01.md`.
- **Validation:** Documentation-only change; no build or test command was required.
- **Refined** `PLAN-A-01.md` with the approved combined hero visual, sticky Kotoha-inspired navigation, immersive scroll motion, polished copy direction, local Kotoha fansite reference, and proposed section priorities.
- **Inspected** the Kotoha fansite navigation structure and styles, including its centered floating pill, active-section indicator, responsive menu, and progress-orientation patterns.
- **Validation:** Documentation-only change; no build or test command was required.
- **Finalized** the preliminary planning decisions in `PLAN-A-01.md`: include a navigation progress meter, review copy before implementation, and use Tsumugi-specific CSS/SVG-like compositions instead of reusing raster branding assets.
- **Validation:** Documentation-only change; no build or test command was required.
- **Recorded** the project owner's approval to continue refining `PLAN-A-01.md` while keeping frontend implementation paused.
- **Validation:** Documentation-only change; no build or test command was required.
- **Implemented** the first static Tsumugi landing page pass in `client/src/App.jsx` and `client/src/index.css`, including a long-scroll narrative, floating anchored navigation, active-section tracking, page progress meter, lifecycle and traceability sections, responsive layout, local CSS/SVG-like visuals, and reduced-motion support.
- **Updated** `README.md`, `CODEMAP.md`, and `PLAN-A-01.md` to reflect the implemented first pass and its remaining refinement status.
- **Validation:** `npm run lint` passed and `npm run build` passed in `client/`.
- **Paused** further frontend execution at the project owner's request and refined `PLAN-A-01.md` with the requested cheerful/professional personality, Fredoka default font, stronger outlines, no-gradient rule, increased motion direction, and icon-library evaluation.
- **Added** Lucide as the preferred icon-library candidate for review without changing dependencies or frontend code.
- **Validation:** Documentation-only change; no build or test command was required.
- **Refined** `PLAN-A-01.md` with the confirmed Fredoka-all typography, mixed outline system, blended motion character, continuous scroll-linked motion, Lucide adoption, and UI-only gradient prohibition.
- **Validation:** Documentation-only change; no build or test command was required.
- **Refined** `PLAN-A-01.md` with permission to reorder or merge sections for the immersive narrative, medium/bold Fredoka emphasis, and permission to evaluate an animation library later.
- **Validation:** Documentation-only change; no build or test command was required.
- **Implemented** the approved PLAN-A-01 additions: local Fredoka font weights, Lucide icons, stronger mixed ink/accent outlines, removal of CSS gradients, continuous scroll-linked motion, bouncy interactions, and theatrical reveal/floating animations with reduced-motion support.
- **Updated** `README.md`, `CODEMAP.md`, and `PLAN-A-01.md` to reflect the evaluation implementation pass.
- **Installed** `@fontsource/fredoka` and `lucide-react` in `client/`.
- **Validation:** `npm run lint` passed, `npm run build` passed, and no `gradient` declarations remain in `client/src`.
- **Dependency audit note:** npm reported 4 moderate vulnerabilities after installation; no automatic fix was applied.
- **Researched** public landing-page patterns and texture guidance, comparing product-specific storytelling, persistent orientation, tactile backgrounds, and motion approaches against Tsumugi's approved branding constraints.
- **Updated** `PLAN-A-01.md` only with the Moeko Works brand correction, warm pattern-background candidates, research findings, selective inspirations, and a scoped Kilo-skills migration plan.
- **Paused** frontend execution as requested; no implementation or dependency changes were made in this planning pass.
- **Validation:** Documentation-only change; no build or test command was required.
- **Recorded** the selected hybrid whole-page pattern with subtle scroll motion, all four research applications, and the request to migrate all eligible Kilo skills to user-level Copilot settings after source discovery.
- **Kept** frontend and customization-file execution paused pending explicit authorization.
- **Validation:** Documentation-only change; no build or test command was required.
- **Recorded** the story-led section ordering decision, likely-path Kilo discovery approach, separate Kilo migration authorization, and continued pause on landing-page coding.
- **Validation:** Documentation-only change; no build or test command was required.
- **Reviewed** the current landing page with Playwright at 500x585 and 1440x900 viewports. Confirmed Fredoka, no horizontal overflow, no CSS gradients, usable primary controls, approximately 5,200px page height, and the stale “A Moesoft project” footer label.
- **Updated** `PLAN-A-01.md` after approval with Playwright findings, Moeko Works brand-audit requirements, hybrid pattern requirements, story-led restructuring, concrete product-preview guidance, mobile/accessibility checks, increased motion direction, and immersive editorial/product research scope.
- **Validation:** Documentation-only change; no frontend implementation was performed.
- **Implemented** the approved plan updates in the landing page: reordered the navigation and sections for a story-led traceability flow, added a low-contrast hybrid woven pattern with subtle scroll movement, expanded the product preview into a concrete objective-to-deliverable workflow, and corrected the footer to Moeko Works.
- **Updated** `README.md` to replace legacy Moesoft branding and describe the new pattern canvas.
- **Validation:** `npm run lint` passed and `npm run build` passed in `client/`; Playwright confirmed the warm SVG pattern, story-led navigation order, Moeko Works footer, Fredoka body font, no horizontal overflow, and no stale Moesoft text.
- **Follow-up correction:** Replaced remaining Georgia display overrides with Fredoka so the implementation matches the approved Fredoka-all typography direction.
- **Validation:** Playwright confirmed heading and preview typography use Fredoka, the pattern is present, the footer contains Moeko Works, no legacy Moesoft text remains, and no horizontal overflow is present.
- **Plan completion pass:** Added static Log in/Create account presentation controls, branded page title and description metadata, and visible keyboard focus states. These remain presentation-only in accordance with the static implementation boundary.
- **Updated** `PLAN-A-01.md` into a visual-audit checklist with explicit completed/pending states, evidence rules, implementation categories, accessibility checks, validation checks, and approval gates.
- **Validation:** Documentation-only change; checklist status was reconciled against the current client implementation and prior lint, build, and Playwright results.
- **Audited** the landing page at 500x585 and 1440x900 with Playwright. Confirmed no overflow, no gradients, pattern presence, readable screenshots, mobile navigation exposure, anchor destinations below the sticky header, full-scroll active-section/progress updates, and reduced-motion behavior.
- **Fixed** active-section tracking so it derives from scroll position consistently during full-page scrolling.
- **Adjusted** the pink accent token from `#e95399` to `#c73579` after contrast testing found the original pink-on-paper ratio was 3.36:1; the replacement is 4.92:1.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed. The visual-audit checklist in `PLAN-A-01.md` is now complete.
- **Closed** the final approval-gate checkbox: no additional landing-page implementation pass is required for this audit; future changes require explicit authorization.
- **Finalized** `PLAN-A-01.md` as complete for this revision after all checklist items were executed or explicitly resolved.
- **Debugged** the missing pattern background. The inline SVG pattern was hidden behind the body canvas by `body::before { z-index: -1; }`; moved it to the visible layer and placed `main` above it.
- **Updated** `PLAN-A-01.md` with a GSAP motion-upgrade plan after confirmation. The plan now covers ScrollTrigger scenes, thread/path motion, hero preview staging, micro-interactions, future transition hooks, responsive `matchMedia`, scoped cleanup, minimal reduced-motion behavior, performance checks, and an explicit no-coding approval gate.
- **Researched** official GSAP `matchMedia()` and `matchMediaRefresh()` guidance and recorded the references in `PLAN-A-01.md`.
- **Validation:** Documentation-only change; no dependency or frontend code changes were made.
- **Expanded** the GSAP planning depth in `PLAN-A-01.md` against the current `client/src/App.jsx` structure. Added motion architecture rules, hero/preview, story/traceability, lifecycle, possibilities, closing, navigation, responsive/reduced-motion scene contracts, and performance/failure criteria.
- **Validation:** Documentation-only change; no GSAP dependency, frontend code, or runtime behavior was changed.
- **Copied** all 36 Kilo skill directories from `C:\Users\Admin\.kilo\skills` to the personal Copilot skills directory `C:\Users\Admin\.copilot\skills` without modifying their contents.
- **Validation:** Destination contains 36 skill folders, 36 `SKILL.md` files, and 252 files total; source and destination inventories match with zero SHA-256 hash mismatches.
- **Verified** the migrated Copilot skills: all 36 folders contain `SKILL.md`, every frontmatter `name` matches its folder, and all 252 destination files match the Kilo source hashes.
- **Limitation:** The current chat session still exposes only its originally loaded skill set; dynamic availability of all 36 migrated skills requires Copilot/VS Code skill discovery after reload or restart.

## 2026-11-13

- **Executed** `PLAN-A-04E.md` for the `/tasks` protected user page:
  - Added `workspaceTaskRecords` fixtures in `client/src/pages/workspace/workspaceData.js` with title, description, instructions, project, milestone, priority, status, due date, subtasks, creator, assignee, and requirement/asset/revision references across the six statuses (Backlog, To Do, In Progress, In Review, Blocked, Completed) and three demo projects.
  - Replaced the generic `/tasks` module fixture with a dedicated `TasksPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented All tasks / List view / Kanban view / Due soon / Blocked / Completed section views with list and Kanban layouts, task search, visible/completed/in-progress/blocked summary counts, clear empty/no-results states, and presentation-only create-task controls.
  - Added task card and Kanban column styling plus green tone tokens in `client/src/index.css`.
- **Updated** `PLAN-A-04E.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks pending for `/tasks`, list/Kanban switching, and task filtering.

## 2026-11-13

- **Executed** `PLAN-A-04F.md` for the `/requirements` protected user page:
  - Added `workspaceRequirementRecords` fixtures in `client/src/pages/workspace/workspaceData.js` with identifier, type, description, acceptance criteria, priority, status, verification state, project, milestone, linked tasks, and linked deliverable across six requirements and the specified/in progress/verified/unverified/blocked/rejected states.
  - Replaced the generic `/requirements` module fixture with a dedicated `RequirementsPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented All requirements / Functional / Non-functional / Verification status / Traceability section views with requirement cards, verification state, acceptance criteria, linked work, search, summary counts, clear empty/no-results states, and presentation-only Add requirement controls.
  - Added requirement card and traceability table styling in `client/src/index.css`, with verification state communicated via text (not color alone).
- **Updated** `PLAN-A-04F.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/requirements`, Functional/Traceability section switching, and requirement filtering.

- **Executed** `PLAN-A-04G.md` for the `/assets` protected user page:
  - Added `workspaceAssetRecords` fixtures in `client/src/pages/workspace/workspaceData.js` with name, type, size, project, description, tags, category, preview availability, access state, and updated time across nine assets covering images, documents, repository references, datasets, audio, and exports.
  - Replaced the generic `/assets` module fixture with a dedicated `AssetsPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented All assets / Images and illustrations / Documents and PDFs / Audio and video / Datasets and spreadsheets / References and exports section views with asset cards, asset-type icons, tags, metadata, search, summary counts, clear empty/no-results states, and presentation-only Add asset controls.
  - Added asset card styling with category-specific icon backgrounds in `client/src/index.css`, with storage boundary notes (metadata in app database, binaries in object storage).
- **Updated** `PLAN-A-04G.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/assets`, Images and illustrations section switching, and asset filtering.

- **Executed** `PLAN-A-04H.md` for the `/revisions` protected user page:
  - Added `workspaceRevisionRecords` fixtures in `client/src/pages/workspace/workspaceData.js` with timestamp, author, change description, affected record, project, previous/current references, approval state, and linked task/requirement/asset/deliverable across six revisions and the approved/pending review/recorded states.
  - Replaced the generic `/revisions` module fixture with a dedicated `RevisionsPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented All revisions / Recent changes / Pending review / Approved section views with revision cards, change descriptions, previous/current references, linked work references, search, summary counts, clear empty/no-results states, and presentation-only Log revision controls.
  - Added revision card styling with state-specific colors in `client/src/index.css`, with review state communicated via text (not color alone).
- **Updated** `PLAN-A-04H.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/revisions`, Pending review section switching, and revision filtering.

- **Executed** `PLAN-A-04I.md` for the `/documentation` protected user page:
  - Added `workspaceDocumentRecords` fixtures in `client/src/pages/workspace/workspaceData.js` with title, type, project, author, updated time, status, revision context, format, and linked task/requirement/milestone/revision/deliverable across eight documents covering project briefs, technical specifications, research notes, architecture decisions, creative drafts, and release notes.
  - Replaced the generic `/documentation` module fixture with a dedicated `DocumentationPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented All documents / Project briefs / Technical specifications / Research notes / Architecture decisions / Testing and release notes section views with document cards, Markdown format indicator, linked work references, search, summary counts, clear empty/no-results states, and presentation-only New document controls.
  - Added document card styling with type-specific badges in `client/src/index.css`, with Markdown clearly presented as the format boundary.
- **Updated** `PLAN-A-04I.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/documentation`, Project briefs section switching, and document filtering.

- **Executed** `PLAN-A-04J.md` for the `/reports` protected user page:
  - Added `workspaceReportDefinitions` fixtures in `client/src/pages/workspace/workspaceData.js` with explicit formulas, source records, and computed values for Project completion, Task distribution, Milestone progress, Requirement coverage, Activity history, plus overdue work records.
  - Replaced the generic `/reports` module fixture with a dedicated `ReportsPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented Overview / Project completion / Task distribution / Milestone progress / Requirement coverage / Activity history section views with report panels, formula definitions, source record references, project scope control, search, reset behavior, overdue work section, clear empty/no-results states, and presentation-only Export report controls.
  - Added report panel and record styling in `client/src/index.css`, with placeholder-only calculation notes on every panel.
- **Updated** `PLAN-A-04J.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/reports`, Task distribution section switching, and project scope control.

- **Executed** `PLAN-A-04K.md` for the `/settings` protected user page:
  - Replaced the generic `/settings` module fixture with a dedicated `SettingsPage` component in `client/src/pages/workspace/WorkspacePage.jsx`, retaining the shared workspace shell, page-local section navigation, and reduced-motion GSAP behavior.
  - Implemented Account and profile / Workspace preferences / Notifications / Appearance and density / Legal and privacy section views with setting cards, search, save settings control, security-sensitive actions visually distinct via wording, and presentation-only save behavior.
  - Added legal links to Privacy Policy, Terms of Service, and Cookie & Local Storage Policy in the Legal and privacy group.
  - Added settings card and group styling in `client/src/index.css`, with notes that no setting is persisted until a settings API exists.
- **Updated** `PLAN-A-04K.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/settings`, section switching to Legal and privacy.

- **Executed** `PLAN-A-04A.md` for the `/dashboard` Overview protected user page:
  - The `OverviewPage` component already existed in `client/src/pages/workspace/WorkspacePage.jsx` with metric cards (Total projects, Active projects, Open tasks, Overdue), project pulse, milestones, tasks, and recent activity panels, using GSAP page-entry motion and reduced-motion handling.
  - Added the missing Quick actions section with presentation-only `Create project` and `Create task` buttons plus a prototype-only note, completing all PLAN-A-04A sections (Overview, Project pulse, Upcoming milestones, Tasks needing attention, Recent activity, Quick actions).
  - Added `Plus` icon import from lucide-react and `button--secondary` CSS variant.
  - Added `workspace-panel--actions` and `workspace-panel-actions` CSS styling for the Quick actions panel.
- **Updated** `PLAN-A-04A.md` to mark all implementation and acceptance items complete.
- **Validation:** `npm run lint`, `npm run build`, and `git diff --check` passed in `client/`; browser smoke checks passed for `/dashboard`, section switching to Quick actions.

- **Audited** the implemented static workspace (`client/src/pages/workspace/WorkspacePage.jsx`, `workspaceData.js`, `client/src/index.css`) and the running UI at desktop and 375px widths (served temporarily with `vite --port 5199`; no source files changed).
- **Rewrote** `docs/plan/frontend/PLAN-A-04.md` as Revision 2: audit findings F1-F15, design principles, owner decisions D1-D5 (left rail, view tabs, no Overview tabs, title voice, interactive settings), target shell and page anatomy, shared component inventory, visual tokens and status vocabulary, preview-only action pattern, state coverage, responsive and accessibility rules, revised module map, source layout, and implementation phases. Frontend-only; no operations.
- **Rewrote** `docs/plan/frontend/PLAN-A-04A.md` through `PLAN-A-04K.md` with per-page UI plans (current state, goals, wireframe, views, record presentation, components, states, responsive rules, fixture needs, preview-only actions, acceptance checklist). Acceptance items reset to unchecked because the plans now describe unimplemented work.
- **Validation:** documentation-only change; no code, lint, or build commands were required. No application code was modified.

- **Approved** owner decisions D1-D5 for the workspace UI re-plan (left rail, view tabs, no Overview tabs, module-name titles, interactive settings without Save).
- **Reviewed** the landing, `/register`, and `/privacy-policy` pages in the browser pane and measured `vite build` output (JS 467 kB / 142 kB gzip, CSS 105 kB / 36 kB gzip, single bundle for all routes). The hero `h1` computed opacity of `0` was observed while the pane was hidden; recorded as "to verify in a visible browser", not as a confirmed defect. Confirmed from code that `/forgot-password` and unknown URLs render the landing page.
- **Edited** `docs/plan/frontend/PLAN-A-04.md`: recorded D1-D5 approval, added section 16 (performance and efficiency: routing, code splitting, CSS split, fonts, budgets), renumbered later sections, linked plans 01-03.
- **Rewrote** `docs/plan/frontend/PLAN-A-01.md` (landing + shared client foundations), `PLAN-A-02.md` (legal pages), and `PLAN-A-03.md` (auth + recovery) as Revision 2 plans with audits, decisions, state/performance requirements, phases, and acceptance checklists. Removed the unrelated Kilo-skills migration section from PLAN-A-01.
- **Updated** `CODEMAP.md` plan descriptions for PLAN-A-01 to PLAN-A-04.
- **Validation:** documentation-only change; no application code modified. Temporary Vite servers on port 5199 were stopped.

- **Implemented** PLAN-A-01 to PLAN-A-03 Revision 2 in `client/`:
  - Added `src/app/router.js` (history-API routing with same-origin link interception, focus-to-heading after navigation), `src/hooks/` (`usePageMeta`, `usePreviewState`, `useMediaQuery`), and a rewritten `src/App.jsx` with lazy route chunks and a Not Found route (`src/pages/NotFoundPage.jsx`).
  - Added shared `components/public/` (`PublicHeader`, `PublicFooter`, `legalLinks`) and `components/forms/` (`forms.jsx`, `PreviewDialog.jsx`).
  - Moved the landing page to `src/pages/landing/LandingPage.jsx`; added hero failsafe, illustration label, real link in place of a dead button, ordered-list traceability chain, `Escape` handling in the mobile menu, rAF-throttled scroll tracking.
  - Legal pages now render `docs/*.md` via `?raw` and `src/lib/markdown.jsx`; added `legalMeta.js` (`LEGAL_STATUS`, labels, storage inventory), draft banner, contents list with active marker, anchors, print styles, storage-inventory table. Added `scripts/check-legal.mjs` and wired it into `npm run build`; `vite.config.js` allows `..` for dev serving of `docs/`.
  - Auth: rewrote `AuthPage.jsx` (demo mode, preview dialog, error/result states), added `AuthShell.jsx`, `RecoveryPage.jsx`, `ForgotPasswordPage.jsx`, `ResetPasswordPage.jsx`.
  - Split `src/index.css` (removed via `git rm`) into `src/styles/{base,public,landing,auth,forms,policy,workspace}.css` using a one-off postcss script (kept outside the repo); dropped 12 dead rules; rewrote `auth.css` and `policy.css`; added `public.css` and `forms.css`.
  - Fonts reduced to Fredoka latin 400 and 700; `index.html` gained `theme-color`, Open Graph/Twitter tags, and `noscript`. Workspace page now sets its title via `usePageMeta` and loads `workspace.css`.
  - Removed `src/pages/index.js`, `pages/auth/index.js`, `pages/legal/index.js`, `pages/workspace/index.js`, `pages/legal/policyPages.js`.
- **Validation:** `npm run lint` passed; `npm run build` passed (legal check warns about 14 placeholders in draft). Bundle: shared runtime 225 kB (71 kB gzip), landing chunk 55 kB (21 kB gzip) + gsap 70 kB (27 kB gzip), auth chunks about 15 kB gzip, legal about 9 kB gzip, workspace 102 kB (20 kB gzip) + 49 kB CSS; previously one 467 kB (142 kB gzip) bundle for every route. Browser checks (dev server, now stopped): in-app navigation kept one document across landing/auth/legal/workspace; register dialog opens and closes; preview error states render with focus on the alert; 404 renders with `noindex`; no horizontal overflow at 320px on nine routes; landing hero opacity 1 in a visible pane. **Not run:** Lighthouse, screen-reader pass, reduced-motion emulation, cross-browser checks.
- **Updated** PLAN-A-01, 02, 03 (implementation status sections, measured budgets), PLAN-A-04 (budget row), `README.md`, and `CODEMAP.md`.

- **Implemented** PLAN-A-04 Revision 2 (workspace UI rebuild) in `client/`:
  - Replaced `pages/workspace/WorkspacePage.jsx` and `workspaceData.js` (removed with `git rm`) with `WorkspaceApp.jsx`, `WorkspaceShell.jsx`, `WorkspaceProvider.jsx`, `context.js`, `nav.js`; `App.jsx` now routes every workspace path to one lazy `WorkspaceApp` so the shell stays mounted.
  - Added `data/` (`fixtures.js`, `selectors.js`, `status.js`, `format.js`): ISO-dated fixtures with explicit relationships, a fixed demo date, derived-only counts/progress/status, one status vocabulary.
  - Added shared components (`components/badges.jsx`, `layout.jsx`, `states.jsx`, `records.jsx`, `TraceChain.jsx`) and eleven lazy pages under `pages/` (Overview, Projects, ProjectWorkspace, Milestones, Tasks, Requirements, Assets, Revisions, Documentation, Reports, Settings).
  - Router: `navigate()` gained `scroll` and `focus` options; added `hooks/useQueryParam.js` so view, filter, and selected record live in the URL.
  - Styles: rewrote `styles/workspace.css` (tokens, shell, shared components; no gradients; 12px text floor) and added `styles/workspace-pages.css`; removed the old minified workspace rules.
  - Reused `lib/markdown.jsx` for the document reader and `components/forms` for Settings.
- **Updated** PLAN-A-04 (section 21) and PLAN-A-04A to 04K with implementation status, deviations, and remaining items; `CODEMAP.md` and `README.md`.
- **Validation:** `npm run lint` and `npm run build` pass. Bundle (gzip): shared runtime 71 kB, `WorkspaceApp` 12 kB + 6.7 kB CSS, pages 1.7–3.4 kB each, landing chunk 48 kB (GSAP now only here). Browser checks (dev server, now stopped): all 25 route/view combinations rendered with no error state; no horizontal overflow at 320, 390, and 1440px; first record above the fold at 390px on seven list pages; detail panel focus, Escape, and URL selection; scope switch filters tasks; preview dialog; demo state previewer (loading, error); compare diff and unsupported state; reader outline; settings "Edited" chip with no Save button. A text-size scan found two sub-12px elements (avatar initials), fixed afterwards. **Not run:** Lighthouse, screen-reader pass, reduced-motion emulation, 768/1024/1280/1536px sweeps, cross-browser checks. Screenshot detail was limited by the browser pane size, so layout was judged through DOM checks plus low-resolution captures.

- **Redesigned** the landing page visuals (PLAN-A-01 section 13): rewrote `client/src/pages/landing/LandingPage.jsx` and `client/src/styles/landing.css` (hero workspace scene with floating cards, thread, pointer parallax; ink ticker band; story scraps visual; interactive traceability explorer; tabbed product tour; vertical/horizontal lifecycle thread; world cards; inverted closing buttons; 960px header breakpoint). Added `text-decoration: none` to `.button` in `client/src/styles/base.css` (primary buttons were underlined).
- **Validation:** `npm run lint` and `npm run build` pass (landing chunk 51 kB gzip, CSS 4.2 kB gzip). Browser checks at 625px (section-by-section captures) and DOM measurements at 320, 375, and 1440px: no horizontal overflow; expected column counts at desktop. Fixed during review: hero thread rendering over the window, thread over the story scraps, invisible primary button on the dark closing band. Not run: Lighthouse, screen-reader pass, reduced-motion emulation. Emulated mobile screenshots were too small to judge, so mobile was verified by measurements only.

- **Added** premium scroll motion to the landing page (PLAN-A-01 section 14): installed `lenis` (`client/package.json`, lockfile); new `client/src/pages/landing/landingMotion.js` (Lenis smooth scroll, hero intro and scroll parallax, velocity-reactive ticker, word-mask heading reveals, section colour wash, page-long thread, pinned story and traceability sections, tour tilt, lifecycle thread fill, world-card entrance/drift/tilt, closing curtain, cursor ring, magnetic buttons); `LandingPage.jsx` now uses `Words` splitting, `Depth`/`drift` layers, a scroll-controlled `TraceExplorer`, and a tab-change animation in the tour; `landing.css` gained the motion layer (word masks, cursor, page thread, thread fills, Lenis rules) and lost the CSS ticker animation.
- **Validation:** `npm run lint` and `npm run build` pass (landing chunk 59 kB gzip). Dev-server DOM checks at 1440x900, 1280x720, and 375x800: Lenis class present, hero intro finished, pin counts 2 / 1 / 0, traceability stage and `--p` follow scroll, story scraps converge, lifecycle `--fill`, tour tilt and closing clip-path progress, in-page anchor lands on target, no overflow, no console errors. Fixed during testing: lifecycle thread and tour tilt flashed their end state before scrolling (removed `immediateRender: false`), story scraps converged too early (longer durations). Not run: real-device performance, Lighthouse, reduced-motion in a real browser, Safari. Screenshots of motion are not meaningful in the hidden browser pane, so behaviour was checked through computed styles at set scroll positions.

- **Fixed** landing visual issues from user screenshots: word-split headings lost their spaces (the space sat inside the clipped word mask; now a sibling text node, measured 7px gaps); header pill was translucent so page text showed through (now solid paper, blur removed); hero facts crowded the buttons (36px gap); floating hero cards could be left small and flat (explicit fromTo to final scale, rotation, opacity); added main overflow-x clip against stray horizontal scrollbars. Verified at 1366x728: gaps, card transforms, header colour, no horizontal overflow; lint and build pass.

- **Fixed** second round of landing issues from user screenshots: the page-thread needle now reads its position from the drawn path (distance to path measured 0px at three scroll positions) instead of sliding straight down; tour tabs sit above the window with 32px spacing and the window is isolated so its rounded corners and the tab shadow are not clipped during the tilt (tilt reduced); header progress meter hidden at 1280px and wider where the page thread already shows progress; closing actions share one size (54px). Lint and build pass. The header report was interpreted as the duplicate progress cue; if another duplicate was meant, it still needs a look.

- **Applied** the landing motion and visual language to the auth pages (PLAN-A-03 section 15): new `components/motion/Motion.jsx` (shared Words, Depth), `styles/motion.css`, `lib/pointerFx.js`, `pages/auth/authMotion.js`, `pages/auth/AuthArt.jsx`; rewrote `AuthShell.jsx` (background, art, motion hook, cursor); `AuthPage.jsx` now passes `art` for login and register; shared rules moved out of `landing.css`; `auth.css` and `forms.css` gained the art panel, background, and micro-interactions. Validation: lint and build pass; browser probes at 1366x728 and 375x800 as listed in the plan. Landing behaviour unchanged by the refactor.

- **Applied** the motion and visual language to the legal pages (PLAN-A-02 section 13): new `pages/legal/legalMotion.js`; `PolicyPage.jsx` gained the background, progress bar, cursor, word-reveal title, and motion hook; `policy.css` gained layering, progress bar, hover touches, print hiding; shared `.page-bg` moved into `motion.css` and the auth shell/motion/CSS now use it instead of `.auth-bg`. Replaced the GSAP `delayedCall` failsafes (landing, auth, legal) with plain `setTimeout` so a paused animation ticker in a background tab cannot leave content hidden. Validation: lint and build pass; DOM probes at 1366x728 (title spacing, no overflow, no console errors, failsafe reveal). The browser pane stopped rendering animation frames mid-test, so live section reveals and the progress bar were not observed.

- **Applied** restrained motion to the workspace (PLAN-A-04 section 22): new `pages/workspace/useWorkspaceMotion.js` (page entrance, view-change stagger, sliding tab ink, count-up stats, panel spring); `components/layout.jsx` wires them into `PageHeader`, `ViewTabs`, `StatStrip`, `DetailPanel`; `WorkspaceShell.jsx` adds a scroll shadow on the top bar; `workspace.css` replaced the old fade with hover/press, progress-grow, and reduced-motion rules; `WorkspaceApp.jsx` now imports `forms.css` (fixes unstyled preview dialogs outside Settings). Found and fixed a StrictMode bug in the count-up (text stuck at 0 after the effect re-ran; cleanup now restores the original text). Validation: lint and build pass; DOM probes at 1440x900 show stats 12,6,3,1 after the entrance, tasks filtering still updates, panel and dialog render, no overflow or console errors.

- **Created** `RESEARCH.md` at the repository root: diagnosis of why the workspace UI feels overwhelming (measured counts from the code on 2026-11-14), published guidance (Nielsen Norman Group on progressive disclosure, cognitive load, and recognition vs recall, fetched directly; practitioner and vendor material on navigation size, onboarding, traceability, and Linear's method, from search results), proposed design principles, restructuring options (navigation from 10 items to about 5, project-centred pages, smaller status vocabulary, quieter chrome, scaffolding separated from product, traceability as a lens), a suggested order of work, a low-cost validation plan, open questions for the owner, and stated limitations (no user testing; Linear method retrieved at heading level only). No application code was changed.

- **Updated** `RESEARCH.md` for the owner's direction to split accounts into an individual workspace (built first, for one person) and a team workspace (future): added diagnosis D9 (team concepts leaking into the solo UI, with counts from the code), research section 3.8 (personal vs team workspaces, single-player-first sequencing, the "halfway state" warning), principle 9, section 5.0 (workspace-type model, individual vs team concept table, scope-creep rules, the seam to leave in the data model, freelancer-specific boundary needs, upgrade-path options), a new step 0 in the order of work, solo-user recruiting for validation, revised and new open questions, extra limitations and sources. No application code changed.

- **Extended** `RESEARCH.md` with a similar-tools review (new section 10: Notion, ClickUp, Trello, Todoist, Things 3, TickTick, Linear, Asana, Basecamp, Milanote/Obsidian/Airtable, and Jira/Jama for traceability, with goods, gaps, and lessons, plus cross-tool patterns) and overall findings (new section 11: positioning, what to keep, a 13-item prioritised change list, a disposition for each of the ten modules, a proposed individual-workspace shape, success measures, and risks). Renumbered Sources and Related documents to 12 and 13, fixed the sources cross-reference, added limitations and sources for the review, a summary pointer, and a new step 7 in the order of work. Based on one search per tool or group (reviews and vendor comparisons), so conclusions are marked as anecdotal. No application code changed.

- **Rewrote** the workspace plans as Revision 3 from `RESEARCH.md` (owner authorized total overwrite and breaking changes; planning only, no code): `docs/plan/frontend/PLAN-A-04.md` (workspace types with an individual-first model and a reserved team seam, five-destination navigation, new routes with redirects, page anatomy v3, a vocabulary cut from 44 labels to about 15, record types from ten to seven, scaffolding moved to a Developer section, migration phases, success measures, decisions D6-D10) and page plans `PLAN-A-04A` Home, `04B` Projects, `04C` Project page, `04D` Work and milestones, `04E` Tasks, `04F` Specs, `04G` Library and Files, `04H` History, `04I` Documents, `04J` Insights, `04K` Account; added `PLAN-A-04L` (quick add, templates, first run, command palette). Repaired invalid UTF-8 in `PLAN-A-02.md`, `PLAN-A-03.md`, and the old `PLAN-A-04.md` caused by earlier PowerShell `Add-Content` appends (the appended sections were re-encoded as UTF-8). Updated `CODEMAP.md`, `README.md`, and the plan link in `RESEARCH.md`. The implemented workspace is still Revision 2 and is the baseline to change.

- **Implemented** PLAN-A-04 Revision 3 (owner approved D6-D10 and said "approved all and execute the plans"): the workspace is now an individual workspace with five destinations. New data layer (`data/fixtures.js` with one person and no users or access states, `store.js` for session-only additions, `templates.js`, rewritten `selectors.js`, `status.js` with about 15 labels, `kinds.js`); shell with Quick add, command palette trigger, developer-tools toggle (`?dev` or Account), mobile bar with a centre add button; pages `HomePage`, `TasksPage` (Today / Upcoming / All with inline add and List/Board), `ProjectsPage` (cards and cross-project timeline, one Filter popover), `ProjectPage` (Overview / Work / Specs / Files / History with phases, milestone groups, timeline, requirement coverage gaps, before-and-after compare), `LibraryPage` (merged files and documents, grid or list, reader via `?doc=`), `InsightsPage` (three numbers with definitions), `AccountPage` (preview-only, Edited chip, Developer section); `quickadd/` (QuickAdd with #project, day words and ! parsing, CommandPalette with arrow keys, NewProjectDialog with five templates, all lazy and session-only); first-run checklist on Home. Removed ten old pages and `TraceChain.jsx`; legacy paths (`/dashboard`, `/milestones`, `/requirements`, `/revisions`, `/assets`, `/documentation`, `/reports`, `/settings`) redirect to their new homes; landing and auth now link to `/home`. CSS rewritten (`workspace.css`, `workspace-pages.css`).
- **Validation:** `npm run lint` and `npm run build` pass (`WorkspaceApp` 33 kB, pages 3-8 kB each, shared runtime unchanged). Dev-server checks: all 25 routes and states render with no console errors and no horizontal overflow at 375px and 1280px; `q` opens Quick add, the parsed chips and session-only task appear in Tasks, Ctrl+K opens the palette and Enter navigates; redirects verified. Not checked: screen-reader pass, 320 and 1440px visual review, reduced-motion visual review.

- **Ran** an automated visual audit (a DOM script in the browser pane) over 36 routes and states (workspace, landing, auth, legal, 404) at 320, 768, 1024, 1280 and 1440px, checking page and element overflow, text under 12px, WCAG contrast, clipped text, controls without names, targets under 24px, and heading count. **Fixed:** small buttons dropped to 11px on narrow screens (`base.css`); `.eyebrow` was 11px; `<small>` rendered at 11.7px in the workspace; `--muted` darkened (#716b7c to #655f70) because tinted backgrounds measured 4.4:1; legal placeholder chips raised above 4.5:1; standalone links, footer links, heading anchors and the demo state previewer now meet 24px targets; timeline bars now have a minimum width and the cross-project timeline names each milestone's project. Remaining reports were intentional (visually hidden labels, the icon-only rail, decorative landing ticker, inline paragraph links) or entrance-animation frames. Lint and build pass. Not covered: pixel-level screenshot comparison and screen readers.

- **Fixed** unstyled Quick add, palette and New project dialogs (user screenshots): the dialogs render outside the `.ws` wrapper, so the spacing, radius and `--line-strong` tokens were undefined and padding, gaps and chip borders collapsed. The tokens in `workspace.css` now apply to `.ws-modal` as well. The earlier audit skipped closed dialogs, which is why it missed this; open-dialog checks should be part of the next audit.

- **Fixed** (user screenshots) the Filter popover clipping off the right edge (now anchored to the button's right edge; verified inside the viewport on Projects, Tasks and Library) and the cramped dialogs: larger padding and gaps, title plus lede hierarchy, uppercase section label, sticky action row, palette keeps its own padding.

- **Reworked** the workspace shell (user feedback): the account menu moved to the bottom of the left rail, like the Claude sidebar (avatar, name and a menu that opens upward; icon-only at 1024-1279px; it stays in the top bar below 1024px). The top bar now carries a wider search plus a status group: today's date, a due-today chip and an overdue chip that link to Tasks. The page footer is gone; the legal links, Developer tools, Back to landing and Leave demo live in the account menu. Insights is no longer in the menu on desktop (it is in the nav) and appears there only on mobile, where the bottom bar has no Insights tab. Verified at 1280 and 375px: menu fits the viewport, no overflow.

- **Added** (user request): (1) fixed the rail account menu layering (`.ws-rail` z-index 35, verified the panel is the top element at its centre); (2) `docs/individual-workspace-guide.md`, a full operations guide for the individual user (18 sections: concepts, navigation, Quick add syntax, Tasks, Calendar, Projects, project tabs, Library, Insights, account, workflows, mobile, accessibility, FAQ, glossary, roadmap); (3) `pages/HelpPage.jsx` at `/help`, which imports the guide with `?raw` and renders it through `lib/markdown.jsx` with a section outline and search (single source, no copy), plus a Help item in the account menu and palette; (4) a Calendar view in Tasks (`components/CalendarView.jsx`, `?view=calendar&month=YYYY-MM&day=`): Monday-first month grid with task pills, milestone flags, done, overdue and high-priority treatment, count dots on phones, a day agenda that opens the task panel, project filter and search; also in the palette. Verified at 1280 and 375px with no overflow or low-contrast text on the new pages. Calendar was added as a Tasks view rather than a sixth destination to keep the five-destination navigation.

- **Updated** all stale documentation (owner request): `README.md` (status, capabilities, routes with implemented/redirect rows, structure, docs list), `CODEMAP.md` (plan rows, new files and dependencies, account menu, gaps), `CONTEXT.md` (rewritten: it still described the deleted `WorkspacePage.jsx` and ten-module workspace), `client/README.md` (replaced the Vite template text), `RESEARCH.md` and `PROJECT-SPECS.md` (status and implementation-divergence notes), `PLAN-A-01` to `PLAN-A-03` (status lines, checklists reconciled with their implementation tables, `/dashboard` references changed to `/home`), `PLAN-A-04` (status, navigation, routes, shell, source layout, phases ticked, decisions approved, new section 19 listing later changes) and `PLAN-A-04A` to `04L` (specific implementation-status sections; acceptance items ticked only where built, with unbuilt or unmeasured items left open and explained). Checked that every Markdown file is valid UTF-8. `LOG.md` itself is history and was not rewritten.
