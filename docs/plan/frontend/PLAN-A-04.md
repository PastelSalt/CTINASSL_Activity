# PLAN-A-04 — Tsumugi Authenticated Workspace and User Pages Exploration

## Plan status

**Status:** Page-specific placeholder exploration implemented for authenticated routes; production data behavior remains excluded  
**Scope:** Frontend visual exploration for the placeholder authenticated workspace, protected user pages, and shared application shell  
**Related plans:** [PLAN-A-01.md](PLAN-A-01.md), [PLAN-A-02.md](PLAN-A-02.md), [PLAN-A-03.md](PLAN-A-03.md)  
**Source specification:** [PROJECT-SPECS.md](PROJECT-SPECS.md), especially sections 3.2, 3.3, 4.1, and 8

This plan treats the authenticated environment as a Figma-like exploration space. The first implementation pass may use local placeholder data and presentation-only navigation so the protected user pages can be evaluated visually before real credentials, API calls, database records, or access-control behavior exist.

## Naming and page division

The authenticated experience is a **workspace**, not a collection of dashboards. The `/dashboard` route is one page within that workspace: the high-level **Overview** page. All other protected routes are named and planned according to their primary user responsibility.

### Shared authenticated workspace

The workspace is the common application context shared by every protected page:

- Persistent top-level navigation between protected modules.
- Compact application header with page identity, contextual actions, account controls, and demo-session state.
- Page-local section navigation for nested content within the active module.
- Shared responsive, accessibility, legal-link, reduced-motion, and visual-token rules.
- A route outlet that changes the active user page without changing the public landing/auth/legal shells.

### Protected page groups

| Group | Routes | Primary responsibility |
|---|---|---|
| **Overview** | `/dashboard` | Summarize current production activity and direct the user to priority work. |
| **Project management** | `/projects`, `/projects/:projectId` | Browse projects and work inside one project workspace. |
| **Production planning** | `/milestones`, `/tasks` | Organize phases, deadlines, assignments, and actionable work. |
| **Traceability and records** | `/requirements`, `/assets`, `/revisions`, `/documentation` | Maintain requirements, files, change history, and project knowledge. |
| **Insights** | `/reports` | Review production progress, health, and calculated reporting views. |
| **Account and preferences** | `/settings` | Manage account, application preferences, appearance, density, and legal/privacy links. |

The child plans under `PLAN-A-04` follow this division. `PLAN-A-04A` is the Overview page plan; the remaining `PLAN-A-04B` through `PLAN-A-04K` plans describe individual protected user pages and project-workspace surfaces rather than separate dashboards.

**Execution note:** The workspace/page naming revision has been authorized and applied to the current static exploration. It does not add backend authentication, persistence, or production authorization.

## Visual refinement direction — compact headers and GSAP motion

The current authenticated page header consumes too much vertical space before the user reaches the page-local navigation and content. The next visual pass should compress the shared workspace header while retaining enough context for orientation, then add a restrained GSAP motion system consistent with the landing page.

The compact-header and motion pass is now implemented for the current static authenticated routes. Production data behavior and future project-detail routing remain excluded.

### Compact authenticated page header

- [x] Reduce the vertical gap between the global brand row, page title, page description, actions, and first content region.
- [x] Keep the global brand/account row compact and visually separate from the page content without creating a second oversized hero.
- [x] Use a smaller page eyebrow or context label with tighter spacing.
- [x] Reduce authenticated page-title scale from landing-page hero proportions to an application heading scale.
- [x] Keep the page description to one or two readable lines without increasing header height.
- [x] Keep contextual actions aligned beside the title on desktop and move them into a compact action row on smaller screens.
- [x] Preserve the primary page action and one secondary action without allowing controls to push the content below the fold.
- [x] Place the page-local section navigation and first content panel closer to the compact header.
- [x] Ensure the compact header still exposes:
  - [x] Current page/module identity
  - [x] Current section context where applicable
  - [x] Demo workspace/session state
  - [x] Account menu trigger
  - [x] Primary contextual action
- [x] Avoid duplicating the same title, description, or context in the global row, page header, and local section panel.
- [ ] Establish a compact-header spacing token rather than adding page-specific spacing overrides.

### Compact-header responsive rules

- [x] Desktop: use a short two-row composition with global identity/account controls above a compact title/action row.
- [x] Tablet: allow the title and actions to wrap once without creating a large empty region.
- [x] Mobile: stack title and actions tightly, keep the section navigation near the header, and preserve the first useful content state within the initial viewport where practical.
- [x] Keep the floating bottom module navigation from obscuring the compact header or first content panel.
- [x] Verify the compact header at 390px and desktop widths; 320px and 768px remain follow-up checks.

### GSAP motion system for authenticated pages

- [x] Reuse the existing GSAP/ScrollTrigger dependency and motion conventions from the landing page.
- [x] Scope authenticated workspace animations with `gsap.context()` and clean them up on unmount or route changes.
- [x] Use `gsap.matchMedia()` for reduced-motion handling.
- [x] Animate only presentation layers; data state, focus state, and route semantics remain static.
- [x] Use a short page-entry sequence for the compact header, page-local navigation, and first content panel.
- [x] Use restrained staggered reveals for Overview metric cards and protected-page content panels.
- [x] Animate section-content changes when the user changes page-local sections.
- [x] Avoid parallax or continuous floating motion in dense application views.
- [x] Keep animation durations short enough for production work contexts.
- [x] Use `fromTo(..., { immediateRender: false })` safeguards so hidden initial states do not blank content before triggers run.
- [x] Preserve visible-by-default fallback content if JavaScript or animation initialization fails.

### Motion by authenticated surface

- [x] `/dashboard`: reveal compact header, metrics, and priority panels in reading order.
- [x] `/projects`: reveal the section navigation first, then the project directory/table.
- [ ] `/projects/:projectId`: stage project identity first, then workflow and related-record regions.
- [x] `/milestones`: reveal milestone summary and list rows with a restrained stagger.
- [x] `/tasks`: reveal task controls and list content without animating every status change.
- [x] `/requirements`: reveal requirement identifiers and traceability content in a readable sequence.
- [x] `/assets`: reveal asset rows while keeping file metadata stable and scannable.
- [x] `/revisions`: reveal the chronological history in the fixture order.
- [x] `/documentation`: reveal document navigation before the table content.
- [x] `/reports`: reveal report scope controls before report content.
- [x] `/settings`: use minimal motion and prioritize stable preference controls.

### Accessibility and reduced-motion requirements

- [x] Respect `prefers-reduced-motion: reduce` by disabling non-essential entrance and section-change animations.
- [x] Keep focus indicators visible during and after animations.
- [x] Never move a focused control away from the user's pointer or keyboard position.
- [x] Do not use opacity-only states that make content unavailable to assistive technology.
- [x] Ensure animated section changes preserve `aria-current`, heading order, and keyboard navigation.
- [x] Avoid flashing, rapid scaling, or motion that could create discomfort.
- [x] Validate that reduced-motion users see the same content and controls without waiting for animation completion.

### Visual approval gate before implementation

- [ ] Owner approves the compact header height and title scale.
- [ ] Owner approves the balance between header context, page-local navigation, and first content panel.
- [ ] Owner approves the GSAP motion intensity as restrained application motion rather than landing-page spectacle.
- [ ] Owner approves reduced-motion behavior and fallback visibility.

## Newly approved navigation direction — floating section navigation

The authenticated workspace should avoid forcing users to overscroll through long module pages. Every protected user page will use a two-region composition:

- A floating section-navigation panel on the left side of the content area.
- A section content area on the right side that changes according to the selected subsection.

This is a planning-only direction. No implementation is authorized in this update.

### Shared section-navigation behavior

- [ ] Keep the existing bottom navigation dock for switching between top-level modules.
- [x] Add a second, page-local floating navigation surface on the left side of the active protected page.
- [x] Keep the section navigation visually anchored while the right content region changes.
- [x] Use concise section labels and Lucide-inspired section markers.
- [x] Highlight the selected section with Tsumugi's dark ink active treatment and a clear text/icon state.
- [x] Keep the section navigation keyboard accessible with visible focus and `aria-current`.
- [ ] Avoid making the left navigation taller than the viewport; use a compact layout or bounded internal scrolling when necessary.
- [ ] Preserve the shared app header, account menu, bottom module navigation, legal links, and demo-session notice.
- [x] On smaller screens, transform the left section navigation into a compact horizontal scroll control rather than retaining a narrow two-column layout.
- [ ] Do not duplicate the complete top-level module navigation inside the page-local section navigation.

### Two-region layout prototype

- [x] Replace the current single generic module-view concept with a `module layout` containing:
  - [x] Left: floating section-navigation card.
  - [x] Right: section content panel.
  - [x] Shared page title and contextual actions above both regions.
- [x] Use the current module table as the first right-side content state so the concept can be evaluated without implementing full CRUD.
- [x] Add a small section description or context label above the right-side content.
- [ ] Keep the right-side content independently scrollable only when necessary; prefer a page layout that minimizes nested scrolling.
- [ ] Define a clear empty, loading, error, and unauthorized state for the selected section.
- [x] Keep section changes presentation-only during the static exploration phase.

### Page-local section maps

#### `/dashboard` — Overview

- [ ] Overview
- [ ] Project pulse
- [ ] Upcoming milestones
- [ ] Tasks needing attention
- [ ] Recent activity
- [ ] Quick actions

#### `/projects`

- [ ] Directory
- [ ] Search and filters
- [ ] Status groups
- [ ] Recently accessed
- [ ] Archived projects

#### `/projects/:projectId`

- [ ] Project overview
- [ ] Workflow phases
- [ ] Milestones
- [ ] Tasks
- [ ] Requirements
- [ ] Assets
- [ ] Documentation
- [ ] Revisions
- [ ] Deliverables

#### `/milestones`

- [ ] All milestones
- [ ] Timeline
- [ ] Upcoming
- [ ] Overdue
- [ ] Completed

#### `/tasks`

- [ ] All tasks
- [ ] List view
- [ ] Kanban view
- [ ] Due soon
- [ ] Blocked
- [ ] Completed

#### `/requirements`

- [ ] All requirements
- [ ] Functional
- [ ] Non-functional
- [ ] Acceptance criteria
- [ ] Verification status
- [ ] Traceability

#### `/assets`

- [ ] All assets
- [ ] Images and illustrations
- [ ] Documents and PDFs
- [ ] Audio and video
- [ ] Datasets and spreadsheets
- [ ] References and exports

#### `/revisions`

- [ ] All revisions
- [ ] Recent changes
- [ ] Pending review
- [ ] Approved
- [ ] Version comparison

#### `/documentation`

- [ ] All documents
- [ ] Project briefs
- [ ] Technical specifications
- [ ] Research notes
- [ ] Architecture decisions
- [ ] Testing and release notes

#### `/reports`

- [ ] Overview
- [ ] Project completion
- [ ] Task distribution
- [ ] Milestone progress
- [ ] Requirement coverage
- [ ] Activity history

#### `/settings`

- [ ] Account and profile
- [ ] Workspace preferences
- [ ] Notifications
- [ ] Appearance and density
- [ ] Legal and privacy

### Section-navigation visual direction

- [ ] Use a compact paper card with strong dark outline, rounded corners, and restrained pastel depth.
- [ ] Keep the left card visually quieter than the right content panel.
- [ ] Use an optional small thread marker or vertical rule to reinforce the weaving metaphor without adding clutter.
- [ ] Make the selected section legible through fill, icon, text, and position—not color alone.
- [ ] Keep section labels readable at desktop widths without forcing the content panel too narrow.
- [ ] Use the same section-navigation component pattern across all authenticated pages.

### Section-navigation responsive rules

- [x] Desktop: left floating section navigation remains visible beside the right content.
- [ ] Tablet: left navigation may narrow or become a compact stacked control.
- [x] Mobile: replace the side card with a horizontal scroll, disclosure button, or top-local selector.
- [ ] Preserve the active section when the viewport changes.
- [ ] Ensure section navigation does not cover focused controls, tables, forms, or primary actions.
- [ ] Test the planned layout at 320px, 390px, 768px, and desktop widths.

## Core exploration rule

- [x] Clicking `Log in` from the landing page or login page enters `/dashboard` without requiring credential input.
- [x] The Overview page visibly identifies the session as a placeholder/demo session.
- [x] All displayed projects, metrics, milestones, tasks, deadlines, and activity are explicitly placeholder data.
- [x] No credential, token, cookie, local-storage session, or backend authentication behavior is implied by the prototype.
- [ ] A later authentication implementation must replace the placeholder entry behavior behind a clear boundary.

## Specification-derived requirements

### Authenticated environment from PROJECT-SPECS 3.2

- [x] Define the first Overview route at `/dashboard`.
- [x] Reserve route structure for:
  - [x] `/projects`
  - [ ] `/projects/:projectId`
  - [x] `/milestones`
  - [x] `/tasks`
  - [x] `/requirements`
  - [x] `/assets`
  - [ ] `/revisions`
  - [x] `/documentation`
  - [x] `/reports`
  - [x] `/settings`
- [x] Keep the application layout separate from the public landing-page layout.

### Shared shell from PROJECT-SPECS 3.3

- [x] Build the authenticated workspace around a persistent floating navigation shell.
- [x] Include an application header/top bar.
- [x] Show the current page title and contextual actions.
- [x] Include a placeholder user account menu.
- [x] Reserve the main content outlet for future route pages.
- [x] Provide responsive navigation behavior for smaller screens.
- [ ] Keep the shell mounted while authenticated pages change where practical.

### Overview scope from PROJECT-SPECS 4.1

- [x] Show total and active project counts.
- [x] Show project status overview.
- [x] Show upcoming milestones and deadlines.
- [x] Show pending and overdue tasks.
- [x] Show recent project activity.
- [x] Show recently accessed projects through project pulse fixtures.
- [x] Show quick actions for creating projects and tasks.
- [x] Document each placeholder metric's future calculation source rather than inventing arbitrary percentages.

## Navigation reference study

The supplied Aqua Iro Archive image is a visual reference for navigation composition only. It shows a persistent floating navigation bar near the bottom of the viewport, compact icon-plus-label items, a rounded light surface, and a strongly distinguished active item.

### Tsumugi translation

- [x] Use a floating, rounded navigation dock rather than copying the reference site's exact artwork or branding.
- [x] Place the dock near the bottom on desktop without obstructing the active protected page content.
- [x] Use Tsumugi's paper surface, dark ink outline, pastel shadow, and solid accent fills.
- [x] Use Lucide icons with short labels for orientation.
- [x] Give the active route a dark ink filled capsule with light text and a clear icon.
- [x] Use a secondary pink/lilac treatment for hover and active orientation.
- [x] Keep the dock visually lighter than the content cards.
- [x] Avoid copying the reference's text, imagery, icon drawings, exact spacing, or proprietary visual assets.
- [x] Keep the navigation usable with keyboard focus and screen readers.

### Proposed authenticated workspace navigation

- [x] Overview — current production pulse (`/dashboard`)
- [x] Projects — project directory
- [x] Milestones — phases and checkpoints
- [x] Tasks — actionable work
- [x] Requirements — acceptance criteria and traceability
- [x] Assets — project files and media
- [x] Documentation — project knowledge
- [x] Reports — progress and health
- [x] Settings — account and application preferences
- [x] Use a responsive overflow/menu treatment for routes that cannot fit in the dock; show the complete navigation on desktop and compact it only on mobile.

## Page-by-page specification detail

The following checklist translates `PROJECT-SPECS.md` sections 3.2, 3.3, 4.1-4.9, 5, 6, 8, 11, and 13 into visual exploration requirements. These are page contracts for the future authenticated application; the current prototype may render marked placeholder states instead of implementing persistence or CRUD behavior.

### `/dashboard` — Overview page

- [x] Present total projects, active projects, open/pending tasks, and overdue work as the primary scan layer.
- [x] Show project status overview, upcoming milestones/deadlines, pending tasks, recent activity, and project pulse.
- [x] Derive every metric from named fixture records and document the future calculation source beside the fixture definition.
- [ ] Reserve quick actions for `Create project` and `Create task` without implying that records were saved.
- [x] Keep the demo/session state visible and distinguish placeholder values from production metrics.
- [ ] Future data surfaces: `projects`, `milestones`, `tasks`, and `activities`.
- [ ] Future reports must reuse the Overview calculations instead of introducing conflicting definitions.

### `/projects` — Project directory

- [x] Provide a directory view with project name, category, status, and next thread; remaining metadata is reserved for the production view.
- [ ] Provide visible search, sorting, filtering, and organization controls.
- [ ] Represent the suggested statuses: Idea, Planning, Active, On Hold, Completed, and Archived.
- [ ] Include a clear create-project entry point and presentation-only empty/loading/error states in the prototype.
- [ ] Make project cards or rows link to `/projects/:projectId`.
- [ ] Future data surface: `projects`, with ownership, workflow configuration, metadata, `createdAt`, and `updatedAt`.
- [ ] Future architecture boundary: project CRUD and query state belong in a project module, not inside the Overview page.

### `/projects/:projectId` — Project workspace

- [ ] Define a project header containing name, category, status, priority, date range, owner, collaborators, and project icon/cover.
- [ ] Provide workspace sections for overview, workflow phases, milestones, tasks, requirements, assets, documentation, revisions, and deliverables.
- [ ] Show the configurable workflow rather than assuming one universal phase sequence.
- [ ] Surface the traceability chain: objective → requirement → milestone → task → revision → deliverable.
- [ ] Provide project-level search/filter context without losing the parent project identity.
- [ ] Future access checks must be enforced for every project operation, not only by frontend route guards.
- [ ] Future data surfaces: `projects` plus related `milestones`, `tasks`, `requirements`, `assets`, `documents`, `revisions`, and `activities`.

### `/milestones` — Phases and checkpoints

- [x] Provide a list-oriented placeholder view for milestones; timeline remains a future view.
- [ ] Show milestone name, project, start date, due date, status, priority, related tasks, and deliverables.
- [x] Visually distinguish milestone state with text labels and fixture status, not color alone.
- [ ] Reserve create, edit, complete, archive, and dependency actions.
- [ ] Show milestone relationships to tasks and requirements where traceability is available.
- [ ] Future data surface: `milestones`, with explicit project references and optional dependency references.
- [ ] Prototype fixture categories should cover at least one active, completed, and overdue milestone.

### `/tasks` — Actionable work

- [x] Provide a list-oriented placeholder view; Kanban remains a future view.
- [ ] Show task title, description/instructions, project, milestone, priority, status, due date, subtasks, and assignee placeholder.
- [ ] Represent the suggested statuses: Backlog, To Do, In Progress, In Review, Blocked, and Completed.
- [ ] Provide clear priority and due-date treatment for pending, urgent, overdue, and completed work.
- [ ] Reserve links to requirements, assets, revisions, and activity records.
- [ ] Future data surface: `tasks`, with explicit project, milestone, requirement, creator, assignee, asset, and revision references.
- [ ] Large task collections must use pagination or an equivalent bounded loading strategy.

### `/requirements` — Specifications and acceptance criteria

- [x] Provide requirement identifiers, type, and verification status in the placeholder view; descriptions and acceptance criteria remain future record fields.
- [ ] Show links to implementing milestones, tasks, and satisfying deliverables.
- [ ] Make the traceability relationship understandable without relying on loosely formatted text references.
- [ ] Reserve requirement history and verification actions.
- [ ] Include a visual distinction between specified, in-progress, verified, and unverified requirements.
- [ ] Future data surface: `requirements`, with explicit queryable relationships to work records.
- [ ] Overview and reports should be able to calculate implementation status from these records.

### `/assets` — Asset library

- [x] Represent documents, images, and repository references in the placeholder asset view.
- [ ] Show asset name, type, size, project association, description, tags/categories, preview availability, and access state.
- [ ] Reserve upload, organize, preview, download, and access-control actions.
- [ ] Clearly separate metadata presentation from binary storage behavior.
- [ ] Future data surface: `assets` metadata and storage references; binary files belong in object storage, not MongoDB documents.
- [ ] Prototype states should include empty library, unsupported preview, upload-in-progress, and access-denied treatments.

### `/revisions` — Change and version history

- [x] Provide placeholder revision entries with author, change description, affected record, and review state.
- [ ] Link revisions to previous/current version references and related deliverables.
- [ ] Reserve comparison UI for supported document types without promising universal diff support.
- [ ] Make project history attributable and understandable rather than presenting an unrestricted embedded history array.
- [ ] Future data surface: dedicated `revisions` records with pagination for large histories.
- [ ] Prototype fixture categories should include a recent change, an approved change, and a pending-review change.

### `/documentation` — Project knowledge

- [x] Represent project briefs, technical specifications, and research notes in the placeholder documentation view.
- [ ] Show document title, type, project, author, updated time, status, and revision context.
- [ ] Reserve a Markdown editor as the initial editing direction.
- [ ] Keep rich-text editing as a later enhancement unless a concrete requirement is added.
- [ ] Link documents to projects and traceability records where useful.
- [ ] Future data surface: `documents`, with explicit project references and revision metadata.
- [ ] Prototype states should include document directory, document preview, and empty knowledge base.

### `/reports` — Progress and production analytics

- [x] Provide report definitions for project completion, milestone completion, and requirement coverage; additional report types remain future views.
- [ ] Label each metric with its source and calculation definition.
- [ ] Avoid decorative percentages or charts that cannot be derived reliably from stored records.
- [ ] Provide project and date-range context for report views.
- [ ] Reserve export/share behavior without implementing it in the static exploration.
- [ ] Future data surfaces: aggregated `projects`, `milestones`, `tasks`, `requirements`, and `activities`; report queries must remain bounded and paginated where appropriate.

### `/settings` — Account and application preferences

- [x] Define account, workspace, appearance, and legal preference groupings in the placeholder view.
- [ ] Keep authentication/security controls visually distinct from ordinary display preferences.
- [ ] Reserve account-management, session-management, and preference-save states without processing credentials in this prototype.
- [ ] Preserve the shared legal references and access to Privacy Policy, Terms of Service, and Cookie & Local Storage Policy.
- [ ] Future data surface: `users` and user preferences, with secure authentication handled outside the visual page.
- [ ] Do not imply that changing a control persists until a real settings API exists.

### Cross-page relationship requirements

- [x] Every page should retain the shared shell: navigation, app header, current title, contextual action area, account menu, and route outlet.
- [ ] Every record relationship should be represented explicitly in the future data model using IDs/ObjectIds rather than free-text references.
- [ ] Every page should expose a clear loading, empty, error, and unauthorized state before production integration.
- [ ] Project, task, milestone, requirement, asset, document, revision, and activity pages should preserve the project context when navigating between related records.
- [ ] Use the same theme tokens, reusable components, responsive rules, and accessibility conventions across all authenticated pages.
- [x] Use one reusable page-local section-navigation pattern across all authenticated pages, with route-specific section definitions.
- [ ] Keep top-level module navigation and page-local section navigation separate in purpose and visual hierarchy.
- [ ] Keep the current manual route map replaceable by React Router without rewriting page-level visual components.

## Overview page visual composition

- [x] Establish a calm application canvas distinct from the expressive landing page while retaining the same tokens.
- [x] Use a compact page header with:
  - [x] Greeting or workspace context
  - [x] Current page title
  - [x] Placeholder session badge
  - [x] User/account menu trigger
- [x] Use an Overview grid with clear density tiers:
  - [x] Metric cards for high-level counts
  - [x] Status overview panel
  - [x] Upcoming deadlines/milestones panel
  - [x] Pending/overdue task panel
  - [x] Recent activity panel
  - [x] Recently accessed project cards
  - [x] Quick-action panel
- [x] Use solid surfaces, strong outlines, restrained shadows, and no gradients.
- [x] Retain Fredoka for display/interface text and readable supporting text.
- [x] Use thread motifs as small orientation details rather than decorative noise.
- [x] Keep important information scannable before expressive decoration.
- [x] Make placeholder and future-error states visually intentional.

## Placeholder data model

- [x] Create a local fixture boundary separate from UI components.
- [x] Include at least:
  - [x] Three sample projects across software, creative, and research work
  - [x] Project statuses such as Active, Planning, and On Hold
  - [x] Upcoming milestone dates
  - [x] Pending and overdue task examples
  - [x] Recent activity entries with timestamps and record types
  - [x] Recently accessed project entries
- [x] Add labels such as `Demo workspace`, `Sample data`, or `Placeholder session`.
- [x] Keep fixture content separate from future persistence behavior.
- [x] Do not use fake success messages that imply persistence.

## Interaction exploration

- [x] Make the navigation active state respond to the current placeholder route, including routes outside the compact dock subset.
- [x] Allow navigation links to render placeholder destination views or clearly marked coming-soon states.
- [ ] Let quick-action controls open presentation-only panels, cards, or marked non-functional states only if useful for visual evaluation.
- [x] Keep account-menu actions presentation-only.
- [x] Provide a clear `Back to landing page` route.
- [x] Make `Log in` from landing and auth pages route to `/dashboard` without credentials for this exploration pass.
- [x] Keep `Create account` linked to `/register`; do not imply account persistence.
- [x] Preserve the legal links in the application footer:
  - [x] Privacy Policy
  - [x] Terms of Service
  - [x] Cookie & Local Storage Policy

## Responsive and accessibility requirements

- [x] Desktop: floating navigation dock remains visible without covering key content.
- [x] Tablet: dock compresses, wraps, or becomes an accessible expanded navigation region.
- [x] Mobile: use a compact bottom navigation subset plus an accessible overflow/menu for remaining modules.
- [x] Ensure the dock does not cover focused controls or important protected-page content through reserved page padding.
- [x] Provide visible focus states for every navigation item and action.
- [x] Use semantic navigation landmarks and `aria-current` for the active route.
- [ ] Ensure color is not the only signal for status, urgency, or active navigation.
- [ ] Support reduced motion by disabling non-essential dock movement, card reveals, and decorative thread animation.
- [x] Test at 390px and desktop widths with no horizontal overflow; 320px and 768px remain follow-up checks.

## Architecture preparation

- [x] Keep the authenticated workspace shell separate from the public landing/auth/legal page shells.
- [ ] Use a protected-page/workspace module naming scheme rather than treating every user page as a dashboard.
- [x] Organize the implementation under `client/src/pages/workspace/`, distinguishing the workspace shell, Overview page, and protected user-page modules.
- [x] Keep reusable workspace UI and placeholder fixtures separate from individual protected-page content where practical.
- [x] Use the existing manual route map as a boundary that can later be replaced with React Router without rewriting visual components.
- [x] Preserve the future MUI migration boundary from PROJECT-SPECS section 8; workspace and protected-page styles remain scoped and token-based.
- [x] Do not implement backend authorization, database queries, real sessions, or protected-route enforcement in this exploration pass.

## Implementation sequence after approval

- [x] Confirm the navigation dock placement, icon labels, active-state treatment, and mobile behavior.
- [x] Confirm the left floating section-navigation placement and right-side content relationship before implementation.
- [x] Confirm each page-local section map before implementation.
- [x] Confirm the Overview grid priority and placeholder data vocabulary.
- [x] Create the authenticated workspace shell and Overview route entry.
- [x] Create the floating navigation dock and responsive overflow treatment.
- [x] Add placeholder fixtures and metric derivations.
- [x] Build Overview cards and panels in priority order.
- [x] Connect landing/login `Log in` actions to the placeholder `/dashboard` Overview route.
- [x] Add placeholder destination views for the remaining navigation routes.
- [x] Add legal references and landing-page return links.
- [x] Validate keyboard navigation, responsive behavior, route transitions, visual hierarchy, and overflow.
- [x] Update `README.md`, `CODEMAP.md`, and `LOG.md`.
- [x] Rename the former dashboard implementation boundary to `client/src/pages/workspace/` and rename shared exports/classes to workspace terminology while retaining `/dashboard` as the Overview URL.

## Exclusions

- [x] No real authentication or authorization.
- [x] No credential validation or password processing.
- [x] No server/API/database integration.
- [x] No durable session state.
- [x] No claim that placeholder records are real user data.
- [x] No final MUI migration or production authenticated-workspace architecture decision without a separate implementation review.

## Approval gate

- [ ] Owner approves the authenticated-workspace visual direction and navigation reference translation.
- [ ] Owner approves credential-free placeholder login behavior.
- [ ] Owner approves placeholder data categories and Overview density.
- [x] Earlier execution was authorized before the authenticated workspace frontend code was added; this naming/division revision does not authorize new coding.
