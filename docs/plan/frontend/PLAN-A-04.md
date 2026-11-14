# PLAN-A-04 — Tsumugi Authenticated Workspace: UI Plan (Revision 2)

## Plan status

**Revision:** 2 — UI re-plan based on an audit of the implemented static workspace  
**Status:** Decisions D1–D5 approved and Revision 2 implemented (see section 21); polish, Lighthouse, and assistive-technology QA remain  
**Scope:** Frontend UI only — layout, components, visual system, states, responsive behavior, and static fixtures  
**Related plans:** [PLAN-A-01.md](PLAN-A-01.md) (landing + shared client foundations), [PLAN-A-02.md](PLAN-A-02.md) (legal), [PLAN-A-03.md](PLAN-A-03.md) (auth). Routing, bundle, font, and token work in section 16 is shared with those plans.  
**Page plans:** [04A Overview](PLAN-A-04A.md) · [04B Projects](PLAN-A-04B.md) · [04C Project workspace](PLAN-A-04C.md) · [04D Milestones](PLAN-A-04D.md) · [04E Tasks](PLAN-A-04E.md) · [04F Requirements](PLAN-A-04F.md) · [04G Assets](PLAN-A-04G.md) · [04H Revisions](PLAN-A-04H.md) · [04I Documentation](PLAN-A-04I.md) · [04J Reports](PLAN-A-04J.md) · [04K Settings](PLAN-A-04K.md)  
**Source specification:** [PROJECT-SPECS.md](../../../PROJECT-SPECS.md), sections 3.2, 3.3, 4.1–4.9, 8

## 1. Constraint: frontend only, no operations

This plan covers what users **see and can try on screen**. It does not cover what the system **does**.

- No authentication, authorization, API calls, database access, persistence, uploads, exports, or real session state.
- All data comes from local fixtures in `client/src/pages/workspace/`. Interactions that are purely local (switching a view, filtering a list, opening a panel, toggling a control) are in scope. Interactions that would write, save, send, or delete are not.
- Every control that implies an operation follows the **preview-only action pattern** (section 9). No control may show a fake success message, a fake saved state, or a "Save" button that does nothing.
- Fixtures must be shaped like the future records (explicit IDs, explicit relationships) so the UI does not need to change when real data arrives.

## 2. Audit of the current frontend

The Revision 1 workspace was built page by page from the checklists in this plan. It works, but reviewing it live (desktop pane and 375px mobile) and reading `WorkspacePage.jsx`, `workspaceData.js`, and `index.css` shows problems that come from the structure, not from polish.

| # | Finding | Evidence | Effect |
|---|---|---|---|
| F1 | **Three navigation layers compete for space.** Brand header, left "This page" card, and a floating bottom dock. | Dock is fixed over the lower edge on every page; on 375px it clips ("More", "Overview" dot, label truncation) and covers content. | Lost viewport height, content hidden behind the dock, hard-to-scan navigation. |
| F2 | **Header actions are generic and duplicated.** Every module shows a hard-coded secondary `New task`; Reports shows `Set report scope` + `New task`; Settings shows `Review preferences` + `New task`. Tasks shows `Create task`, header `New task`, and toolbar `New task`. | `WorkspacePage.jsx` heading block and per-page toolbars. | Actions do not match the page; three buttons for one action. |
| F3 | **Redundant titles.** Page H1 `Tasks` is followed by H2 `Task register`; the project page shows `Project Garden` as H1 and again in the identity card; Overview uses a marketing slogan ("A clear view of the work.") as the H1. | Screenshots of `/tasks`, `/projects/project-garden`, `/dashboard`. | Header consumes ~250–280px on mobile before any content. |
| F4 | **Box-in-box-in-box.** Outer 2px-ink page card → controls card → summary cards → record cards, all outlined. | Every module page. | Flat hierarchy; nothing reads as primary; wasted padding. |
| F5 | **Overview local navigation is mostly empty.** Five of six Overview sections render a "staged for visual exploration" stub, although the same content already lives on the Overview section. | `OverviewPage` early return for non-Overview sections. | A navigation control that leads to dead ends. |
| F6 | **Several planned sections have no dedicated UI** but are ticked complete: Requirements → *Acceptance criteria*; Revisions → *Version comparison*; Tasks → *All tasks* duplicates *List view*; Projects → *Status groups* and *Recently accessed* show the same list as *Directory*. | Section handling in each page component. | Plan accuracy and user trust; section nav suggests views that do not exist. |
| F7 | **Text is too small.** 59 declarations at 9–11px; most metadata, statuses, and summary captions are below 12px. | `index.css`. | Fails comfortable reading and accessibility expectations; dense but not scannable. |
| F8 | **Status styling is duplicated and inconsistent.** Each page defines its own tone map; Tasks maps Backlog and Blocked to the same lilac; status relies on a pill plus a color bar. | `statusTone` functions in Tasks, Requirements, Revisions, Documentation. | Same status looks different across pages; some statuses indistinguishable. |
| F9 | **Settings are not controls.** Values render as static text, with a `Save settings` button. | `SettingsPage`. | Cannot evaluate the real settings UI; the button implies persistence. |
| F10 | **Reports are text panels.** Formulas and percentages in lists; no visual representation. | `/reports` screenshot. | The page whose job is to be glanceable is a wall of text. |
| F11 | **Relationships are plain strings.** Task → project, milestone; requirement → tasks; revision → refs are text, not links or chips. | Record cards. | The traceability story (objective → requirement → milestone → task → revision → deliverable) is not navigable. |
| F12 | **Same placeholder note repeated** at the foot of every page and every panel. | `.workspace-module__note` on all pages. | Noise; the demo banner should say it once. |
| F13 | **Hard-coded context.** `Tuesday, 11 November`, avatar `PS`, fixed relative times (`12 min ago`) used for sorting. | `WorkspacePage.jsx`, `RevisionsPage`. | Looks stale; sorting by string is brittle. |
| F14 | **Code structure blocks iteration.** `WorkspacePage.jsx` is a ~920-line single file with eight copies of the toolbar/search/summary/empty pattern; `index.css` holds ~290 workspace rules as minified one-liners; `RevisionsPage` calls `Array.sort` on the shared fixture array (mutates fixtures). | File inspection. | Every visual change must be repeated eight times; hard to review. |
| F15 | **Mobile order is wrong.** Heading + two buttons + section strip appear before the first record; summary cards overflow horizontally; entry animation can leave the heading faded. | 375px `/tasks`. | First useful content sits below the fold. |

## 3. Design principles for Revision 2

1. **One job per layer.** Global navigation moves between modules. Page tabs move between *views* of one module. Filters narrow records inside a view. These three never share a control.
2. **Sections are views; statuses are filters.** A section must change the *layout or content model* (list → board → timeline). Status/type subsets (Blocked, Completed, Functional) become filter chips with counts. This removes the dead and duplicate sections in F5/F6.
3. **Title once.** The page header states the module name; the content area never repeats it. The project name appears once, in the project header.
4. **One primary action per page, and it is the right one** (`New project`, `New task`, `Add requirement`…). Secondary actions live in the toolbar or the record.
5. **Flat first, boxed second.** Content sits on the canvas. Only records (cards, rows, panels that need separation) get borders. Reserve the heavy ink outline for the active/selected element and primary action.
6. **Say "demo" once.** One persistent demo banner/chip replaces per-page and per-panel notes.
7. **Every state is designed.** Loading, empty, no results, error, unauthorized, and unsupported-preview each exist as real components that can be previewed.
8. **Relationships are links.** Project, milestone, task, requirement, asset, and revision references render as chips that navigate (or show a preview) rather than as text.
9. **Readable by default.** Minimum 12px for any text, 14px for body, with a defined scale; status is always icon + text, never color alone.

## 4. Decisions needed from the owner

Revision 1 used a floating bottom dock plus a left section card. The owner approved replacing it. **All five recommendations below are approved and supersede the earlier approved navigation direction.**

| ID | Decision | Approved outcome |
|---|---|---|
| D1 | Global navigation placement | **Left app rail** on ≥1024px (icons + labels, collapsible to icons); **bottom tab bar with 4 items + More** on mobile. Frees vertical space and scales to 10 modules. |
| D2 | Local section navigation | **Horizontal view tabs under the page header** (scrollable on mobile). Removes the second left column and gives content full width. Settings keeps a vertical variant of the same component. |
| D3 | Overview local navigation | **Removed.** Overview is one composed screen. |
| D4 | Page title voice | Module name as H1 (`Tasks`) with one descriptive line; slogan-style titles stay on the public pages. |
| D5 | Interactive settings | Real local controls with a "Preview only — not saved" notice and **no Save button**. |

## 5. Target shell

```text
Desktop ≥1024px
┌────────┬──────────────────────────────────────────────────────────┐
│ Rail   │ Top bar: [Project scope ▾]   [search ⌘K]   Demo • PS ▾   │
│ 224px  ├──────────────────────────────────────────────────────────┤
│ logo   │ Breadcrumb / eyebrow                                     │
│ ─────  │ H1 Module name                       [Primary action]    │
│ Overview│ one-line description                                    │
│ Projects├─ Tab: View A | View B | View C ─────────────────────────┤
│ Milestones│ Toolbar: search · filter chips · view toggle          │
│ Tasks  │ Summary strip (3–4 stats, flat)                          │
│ …      │ Content (list / board / table / chart)  │ Detail panel   │
│ ─────  │                                         │ (≥1280px)      │
│ Settings│                                                         │
│ Legal  │ Footer: legal links                                      │
└────────┴──────────────────────────────────────────────────────────┘

Mobile <768px
┌──────────────────────────────┐
│ ☰ logo        Demo • PS ▾    │  top bar 56px
│ Tasks               [+ New]  │  title + icon-only primary action
│ [List][Board][Schedule] →    │  scrollable tabs
│ search  [Filters ▾]          │
│ records…                     │
├──────────────────────────────┤
│ Overview Projects Tasks Docs ⋯│ bottom tabs 56px (4 + More sheet)
└──────────────────────────────┘
```

### Shell requirements

- [ ] Left rail: logo, 9 module links with Lucide icons, Settings pinned at the bottom, collapsed (icon-only, 72px) between 1024–1279px and expanded at ≥1280px.
- [ ] Top bar (56px): project scope switcher, global search field (non-functional, opens a "Search preview" panel), demo-session chip, account menu with presentation-only items and `Back to landing page`.
- [ ] Project scope switcher: `All projects` or one of the fixture projects; it **filters the local fixtures** on every page and is reflected in the breadcrumb. This is frontend-only and makes the project context real across pages.
- [ ] Mobile: bottom tab bar with Overview, Projects, Tasks, Docs and a `More` bottom sheet containing the remaining modules; the sheet is a labelled dialog with focus trap and Escape to close.
- [ ] Main region scrolls; rail and top bar stay fixed. No fixed element overlaps content (reserve padding, not overlay).
- [ ] Skip link, landmark roles (`nav`, `main`, `aside`, `footer`), and `aria-current="page"` on rail and tabs.
- [ ] Footer holds Privacy, Terms, Cookie & Local Storage Policy, and `Back to landing page` once, at the end of the scroll area (rail on desktop may also link them).
- [ ] Shell stays mounted when pages change; only the outlet re-renders.

## 6. Page anatomy (shared by every module)

Order of regions, top to bottom. A region is omitted only when the page plan says so.

1. **Page header** — eyebrow/breadcrumb, H1, one-line description (max ~100 characters), primary action (right on desktop, icon + label; icon-only below 480px).
2. **View tabs** — 2–4 *views* of the module (section = view, principle 2). Selected tab: ink fill + icon + `aria-current`. Scrollable on mobile; the selection is preserved on viewport change.
3. **Toolbar** — search field, filter chips with counts, optional `More filters` popover, view-density toggle where relevant. Reset link appears only when a filter is active.
4. **Summary strip** — 3–4 flat stats in one row (no individual cards): value, label, optional delta/qualifier. Each stat is clickable to apply the matching filter.
5. **Content** — the view itself. Records use the shared record patterns (card, row, table row, board card).
6. **Detail panel** — selecting a record opens a right-hand panel (≥1280px) or a bottom sheet (<1280px) with the full record, relationships, and preview-only actions. Replaces nested expansion and long cards.
7. **State layer** — loading skeleton, empty, no results, error, unauthorized rendered in place of region 5.

## 7. Shared component inventory

Build once under `client/src/pages/workspace/components/`; no page may define its own copy.

| Component | Purpose | Replaces |
|---|---|---|
| `WorkspaceShell` | Rail, top bar, outlet, footer, mobile tab bar | `NavigationDock`, header/footer blocks |
| `PageHeader` | Eyebrow/breadcrumb, H1, description, primary action | `.workspace-heading` |
| `ViewTabs` | Local views with icon, count, `aria-current` | `SectionNavigation` |
| `Toolbar` | Search, `FilterChip` group, view toggle, reset | 8 copied toolbars |
| `FilterChip` | Toggle filter with count | Section entries like *Blocked*, *Completed* |
| `StatStrip` / `Stat` | Flat summary row, clickable | `summary article` cards |
| `StatusBadge` | Icon + text + tone from a single status map | per-page `statusTone` |
| `PriorityBadge` | Icon + text (Low/Medium/High/Urgent) | inline text |
| `DueLabel` | Relative due text with overdue/today treatment and absolute date in `title` | raw strings |
| `RecordCard`, `RecordRow`, `DataTable` | Three record densities sharing the same field order | page-specific cards |
| `RelationChip` | Link or preview to project/milestone/task/requirement/asset/revision | text references |
| `TraceChain` | Objective → requirement → milestone → task → revision → deliverable | `.workspace-traceability` |
| `DetailPanel` | Side panel / bottom sheet for one record | long cards |
| `ProgressBar` / `MiniChart` | Bar, stacked bar, ring derived from fixtures | decorative percentages |
| `EmptyState`, `NoResults`, `ErrorState`, `UnauthorizedState`, `UnsupportedPreview`, `Skeleton` | All non-content states | repeated `.workspace-placeholder` |
| `PreviewActionButton` | Preview-only action pattern (section 9) | dead buttons |
| `DemoBanner` | Single demo/sample-data notice with state previewer | per-page notes |
| `Avatar`, `AvatarStack` | Owner/assignee/collaborators | `PS` text |

## 8. Visual system

Keep Tsumugi's identity: warm paper, Fredoka, ink outlines, pastel accents, thread motifs. Change how much of it is applied.

### Typography scale (Fredoka)

| Token | Size / weight | Use |
|---|---|---|
| `--text-display` | 28–32px / 600 | Page H1 (module name) |
| `--text-title` | 20px / 600 | Panel and record-group titles |
| `--text-body` | 14px / 400 | Descriptions, record titles at 15–16px/500 |
| `--text-meta` | 12px / 500 | Metadata, badges, captions (**floor: 12px**) |
| `--text-eyebrow` | 12px / 600, uppercase, +0.06em | Breadcrumb/eyebrow |

### Surfaces and borders

- Canvas: `--canvas`; records: `--paper` with `1px --line` border and `--radius-md` (14px).
- 2px ink outline reserved for: primary button, selected tab, selected record, focused control.
- Radii: `--radius-sm 8`, `--radius-md 14`, `--radius-lg 20` only (replaces 22/18/16/15/12/10/9 mix).
- Elevation: one flat offset shadow (`--shadow-card`) for raised records on hover/selection; no stacked pastel shadows on containers.
- Spacing: 4px grid with tokens `--space-1…8`; a single `--space-page` gutter (16px mobile, 24px tablet, 32px desktop). The compact-header spacing token deferred in Revision 1 is part of this.

### Semantic status system (single source of truth)

Each status has a tone, an icon, and a label. Color is never the only signal; every badge shows icon + text and meets 4.5:1 text contrast on its fill.

| Domain | Statuses (icon) |
|---|---|
| Project | Idea (lightbulb) · Planning (compass) · Active (play) · On hold (pause) · Completed (check) · Archived (archive) |
| Milestone | Upcoming (calendar) · In progress (loader) · Overdue (alert) · Blocked (octagon) · Completed (check) |
| Task | Backlog (inbox) · To do (circle) · In progress (loader) · In review (eye) · Blocked (octagon) · Completed (check-circle) |
| Requirement | Specified (file) · In progress (loader) · Verified (shield-check) · Unverified (shield-alert) · Blocked · Rejected (x-circle) |
| Revision | Recorded (clock) · Pending review (hourglass) · Approved (check) · Rejected (x) |
| Document | Draft (pencil) · In review (eye) · Completed (check) |
| Priority | Low (arrow-down) · Medium (minus) · High (arrow-up) · Urgent (chevrons-up) |

Tone pairs map to a small palette (neutral, info, progress, warning, danger, success) defined once in tokens; each domain picks tones from it. No two *statuses in the same domain* may share a tone and icon.

## 9. Preview-only action pattern

For actions that would create, edit, save, delete, upload, export, or send:

- The control renders normally (so the layout can be judged) and is marked `aria-haspopup="dialog"`.
- Activating it opens a small **Preview dialog** showing the intended form or confirmation layout filled with fixture values, a chip `Preview only — nothing is saved`, and a single `Close` button. Forms inside are non-submitting.
- No toast says "saved", "created", "sent", or "uploaded". Local-only state (filters, view, selected record, setting toggles) is allowed, labelled where it could be mistaken for persistence.
- Destructive actions (Archive, Delete) preview as a confirmation dialog layout, never an actual removal.

## 10. State coverage

- [ ] The `DemoBanner` includes a **Preview state** control (Normal · Loading · Empty · Error · Unauthorized) that forces the current page into that state so all designs can be reviewed without backend behavior. It is a demo-only affordance and is removed when real data loads.
- [ ] Loading uses skeletons that match the real layout (rows, cards, stat strip), not spinners.
- [ ] Empty states explain what belongs here and show the page's primary action as a preview action.
- [ ] No-results shows the active filters as chips and a `Clear filters` button.
- [ ] Error shows a plain message, a `Try again` control (no-op in the demo), and the reference format a support message would use.
- [ ] Unauthorized explains the missing access and offers `Back to Projects`.
- [ ] Unsupported preview (assets/documents/revisions compare) shows file type, why no preview exists, and the allowed alternative.

## 11. Responsive behavior

| Width | Shell | Page |
|---|---|---|
| ≥1280 | Expanded rail (224px) + top bar | Content + right detail panel; tables with all columns |
| 1024–1279 | Icon rail (72px) | Detail panel becomes a sheet; fewer table columns |
| 768–1023 | No rail; top bar with menu button opening a drawer | Single column; toolbar wraps once |
| 481–767 | Bottom tabs (4 + More) | Records as cards; tables become card lists |
| ≤480 (target 320) | Bottom tabs | Icon-only primary action; filters in a sheet; stat strip scrolls horizontally with snap |

- [ ] Header + tabs + toolbar must fit within ~220px at 390px so the first record is above the fold.
- [ ] No horizontal page scroll at 320px; wide data (tables, board) scrolls inside its own container with a visible edge hint.
- [ ] Verify 320, 390, 768, 1024, 1280, 1536.

## 12. Motion (GSAP — keep, trim)

- [ ] Keep `gsap.context()` + `gsap.matchMedia()` with reduced-motion bypass.
- [ ] Page entry: one 250ms fade/translate of the content region; **no staggered header animation** (this caused the faded heading on mobile).
- [ ] View-tab change: 150–200ms crossfade of content only.
- [ ] Detail panel and bottom sheet: 200ms slide; focus moves into the panel and returns to the trigger on close.
- [ ] Skeleton shimmer disabled under reduced motion.
- [ ] Never animate data values or filter results record by record.

## 13. Accessibility

- [ ] Text floor 12px; body 14px; contrast ≥ 4.5:1 for text and ≥ 3:1 for UI boundaries (verify `--muted` on `--canvas`, and status tones on their fills).
- [ ] Status, priority, and active view communicated by icon + text + shape, not color alone.
- [ ] Tabs use `role="tablist"` semantics (or links with `aria-current`) with arrow-key navigation.
- [ ] Detail panel: labelled region, focus management, Escape closes, does not trap focus when docked (≥1280px).
- [ ] Tables use real `<table>` markup with scoped headers; board columns are lists with headings.
- [ ] Charts have text equivalents (the same numbers in a table or caption).
- [ ] Touch targets ≥ 40px on mobile.

## 14. Module map (revised)

Section = view. Status/type subsets move into filter chips.

| Route | Primary action | Views (tabs) | Signature UI |
|---|---|---|---|
| `/dashboard` | New project | none (single composed screen) | Today strip, attention list, project pulse rail |
| `/projects` | New project | Directory · Board · Recent · Archived | Card/table toggle, status board |
| `/projects/:projectId` | Edit project | Overview · Workflow · Milestones · Tasks · Requirements · Assets · Docs · Revisions · Deliverables | Project header + trace chain + phase stepper |
| `/milestones` | New milestone | Register · Timeline · By project | Dated timeline with today marker |
| `/tasks` | New task | List · Board · Schedule | Kanban + due-date grouping |
| `/requirements` | Add requirement | Register · Traceability · Coverage | Traceability matrix with gap flags |
| `/assets` | Add asset | Library · List | Thumbnail grid with type filters |
| `/revisions` | Log revision | History · Review queue · Compare | Change feed, side-by-side compare |
| `/documentation` | New document | Library · Reader | Markdown reader with outline |
| `/reports` | Export report (preview) | Overview · Progress · Workload · Coverage · Activity | Derived bars/rings with formula popovers |
| `/settings` | none | Account · Workspace · Notifications · Appearance · Privacy & legal · Security | Real local controls, no Save |

The per-page plans define each view in detail. Where a Revision 1 section disappears (for example Tasks → *Blocked*), it becomes a filter chip so no capability is lost.

## 15. Source layout for the UI rebuild

```text
client/src/pages/workspace/
  WorkspaceRoute.jsx            route → page mapping (replaceable by React Router)
  shell/                        WorkspaceShell, Rail, TopBar, MobileTabs, MoreSheet, DemoBanner
  components/                   shared inventory from section 7
  pages/                        OverviewPage, ProjectsPage, ProjectWorkspacePage, MilestonesPage,
                                TasksPage, RequirementsPage, AssetsPage, RevisionsPage,
                                DocumentationPage, ReportsPage, SettingsPage
  data/                         fixtures split per domain + selectors (counts, filters, sorts)
  hooks/                        useScopedProject, usePreviewState, useViewTabs
  styles/                       tokens.css, shell.css, components.css, pages/*.css (readable, not minified)
```

- [ ] Split the single `WorkspacePage.jsx` and the workspace rules in `index.css` into the structure above.
- [ ] Fixtures get ISO dates + a fixed "demo today" so relative labels and sorting are computed, not hard-coded; selectors never mutate fixture arrays.
- [ ] Derived numbers (counts, percentages) come from selectors shared by Overview and Reports so definitions cannot diverge.
- [ ] Keep route handling behind a thin boundary so React Router can replace it without touching pages.
- [ ] Keep the MUI migration boundary (PROJECT-SPECS section 8): components are token-driven and style-scoped.

## 16. Performance and efficiency (whole client)

Measured on the current build (`vite build`): one JS bundle of **467 kB (142 kB gzip)** and one CSS file of **105 kB (36 kB gzip)** are sent for every route, including legal and auth pages; GSAP + ScrollTrigger are in that bundle; four Fredoka weights ship (400/500/600/700); all links are plain anchors, so every navigation is a full document reload. The workspace will add ten pages to this, so the structure must change before it grows.

| Area | Plan | Target |
|---|---|---|
| Routing | Introduce client-side navigation behind the existing route boundary (React Router or an equivalent thin router). Links become in-app navigations; the workspace shell stays mounted. Add a real **404 page** — unknown URLs currently render the landing page, and `/forgot-password` (linked from Login) does too. | No full reload between workspace pages; unknown routes show Not Found |
| Code splitting | `React.lazy` per route group: landing, auth, legal, workspace; each workspace page lazy-loaded. Landing-only GSAP/ScrollTrigger imported dynamically from the landing chunk; workspace imports only `gsap` core if it needs motion. | Shared runtime (React + router + icons) is 71 kB gzip; each public route adds ≤ 25 kB gzip (landing adds GSAP separately, 27 kB). Measured 2026-11-14 |
| CSS | Split `index.css` into `tokens.css`, `base.css`, and per-area files (`landing`, `auth`, `legal`, `workspace/*`) imported by their route chunk. Rewrite minified one-line rules as readable CSS. Remove dead rules found after the rebuild. | Initial CSS per route < 30 kB gzip |
| Fonts | Keep Fredoka via `@fontsource`; limit to weights actually used (target 400, 500, 600; drop 700 if headings use 600), subset to latin, `font-display: swap`, preload the primary weight in `index.html`. | ≤ 3 font files per route, no layout shift on swap |
| Rendering | Memoize derived selectors, virtualize/paginate any list over 50 rows, avoid re-running animations on filter changes, no layout-thrashing measurements in render. | Filter/typing interactions < 100 ms on fixtures |
| Motion | Honor `prefers-reduced-motion`, avoid animating layout properties (use transform/opacity), kill ScrollTriggers on route change. | No long tasks > 50 ms from animation setup |
| Assets | Inline SVG only for small glyphs; no raster hero images; `public/` icons optimized. | No image requests on first paint |
| Budget check | Add `npm run build` size report to each phase; record numbers in `LOG.md`. Lighthouse (mobile) per route: Performance ≥ 90, Accessibility ≥ 95. | Recorded per phase |

## 17. Implementation phases

Each phase ends with `npm run lint`, `npm run build` (with bundle sizes noted), and visual checks at 390 and ≥1280.

- [x] **Phase 0 — Approvals:** owner approved D1–D5. Type scale and status vocabulary are confirmed with the section 20 gate.
- [ ] **Phase 1 — Foundations:** tokens, type scale, status/priority maps, split CSS, router + code splitting + 404 (section 16), fixture selectors, fix fixture mutation.
- [ ] **Phase 2 — Shell:** rail, top bar, mobile tabs + More sheet, project scope switcher, demo banner with state previewer.
- [ ] **Phase 3 — Shared components:** PageHeader, ViewTabs, Toolbar, StatStrip, badges, record patterns, DetailPanel, state components, PreviewActionButton.
- [ ] **Phase 4 — Reference pages:** rebuild Tasks (list/board/schedule) and Overview to prove the system.
- [ ] **Phase 5 — Remaining pages:** Projects, Project workspace, Milestones, Requirements, Assets, Revisions, Documentation, Reports, Settings.
- [ ] **Phase 6 — Polish and QA:** motion trim, reduced motion, keyboard pass, contrast pass, 320/390/768/1024/1280/1536 sweep, update README, CODEMAP, LOG, and tick the page plans.

## 18. Baseline already built (Revision 1, retained until replaced)

- Credential-free `Log in` entry to `/dashboard`, placeholder session label, and `Back to landing page`.
- Routes: `/dashboard`, `/projects`, `/projects/:projectId` (known demo projects), `/milestones`, `/tasks`, `/requirements`, `/assets`, `/revisions`, `/documentation`, `/reports`, `/settings`.
- Fixture boundary in `workspaceData.js` with projects, milestones, tasks, requirements, assets, revisions, documents, activity, and report definitions.
- GSAP entry/section motion with reduced-motion handling, legal links in the footer, and skip link.
- All displayed data is explicitly placeholder; no backend behavior.

## 19. Exclusions

- No real authentication, authorization, credential handling, tokens, or durable session.
- No server, API, database, object storage, upload, download, or export behavior.
- No persistence of any control (including settings and filters across reloads).
- No final MUI migration decision.
- No new product features beyond the modules in PROJECT-SPECS.

## 20. Approval gate

- [x] Owner approved D1–D5 (section 4).
- [ ] Owner approves the page anatomy (section 6) and the revised module map (section 14).
- [ ] Owner approves the type scale, 12px floor, and status vocabulary (section 8).
- [ ] Owner approves the preview-only action pattern and the demo state previewer (sections 9–10).
- [ ] Owner authorizes implementation phases 1–6 (this revision does not authorize new code).

## 21. Implementation status — 2026-11-14

Revision 2 replaced the Revision 1 workspace (`WorkspacePage.jsx`, `workspaceData.js`, ~290 workspace rules in `index.css`). Frontend only; all data is fixtures and nothing is saved.

| Phase / item | Result |
|---|---|
| Phase 1 — foundations | Done: router, lazy routes, 404 (from PLAN-A-01); `data/fixtures.js` with ISO dates, a fixed `DEMO_TODAY`, and explicit relationships; `data/selectors.js` (counts, progress, statuses, gaps, attention items — no stored percentages, no fixture mutation); `data/status.js` single status/priority vocabulary; readable `workspace.css` and `workspace-pages.css` |
| Phase 2 — shell | Done: left rail (icons at 1024–1279px, labelled at ≥1280px), top bar with project scope switcher (filters every page), search preview, demo chip, account menu; bottom tabs (4 + More sheet) below 1024px; `DemoBanner` with the **Preview state** selector (Normal, Loading, Empty, Error, Unauthorized); the shell stays mounted between pages |
| Phase 3 — shared components | Done: `PageHeader`, `ViewTabs`, `Toolbar` + `FilterChips`, `StatStrip`, `StatusBadge`/`PriorityBadge`/`DueLabel`, `RelationChip`, `Avatar`/`AvatarStack`, `ProgressBar`/`StackedBar`, `TraceChain`, `DetailPanel` (docked ≥1280px, sheet below), state components, `PreviewAction` with a shared preview dialog, record rows and detail panels |
| Phases 4–5 — all pages | Done: Overview, Projects, Project workspace, Milestones, Tasks, Requirements, Assets, Revisions, Documentation, Reports, Settings (see each page plan) |
| Phase 6 — QA | Partly done: `npm run lint` and `npm run build` pass; every route renders with no horizontal overflow at 320, 390 and 1440px; the first record is above the fold at 390px on all list pages; detail panel focus and Escape, scope switching, preview dialog, state previewer, compare diff, and settings "Edited" state were verified in a browser. **Not run:** Lighthouse, screen-reader pass, reduced-motion emulation, 768/1024/1280/1536 visual sweep, cross-browser |

Measured (gzip): shared runtime 71 kB; `WorkspaceApp` 12 kB + 6.7 kB CSS; each page 1.7–3.4 kB. The workspace no longer loads GSAP.

**Deviations from this plan**
- Between 768 and 1023px the workspace uses the bottom tab bar, not a drawer.
- Motion is one 220 ms CSS fade of page content (disabled for reduced motion); GSAP is not used in the workspace.
- The rail collapses by breakpoint only; there is no manual collapse control.
- View, filter, selected record, and preview state live in the URL (`?view=`, `?filter=`, `?select=`, `?preview=`) so they are linkable. Search text, sort, and layout toggles are local state.
- Detail panels are used on Tasks, Milestones, Requirements, Assets, and Revisions. Projects link to the project page instead.
- "Load more" boundaries for large collections, global search, and a Group-by control on Tasks were not built.
