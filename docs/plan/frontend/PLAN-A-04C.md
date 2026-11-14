# PLAN-A-04C — `/projects/:projectId` Project page (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** Project workspace with nine tabs · **Status:** Implemented (2026-11-14) · **Evidence:** RESEARCH.md D1–D3, section 11.5

## 1. Purpose

The **hub**. Everything about one piece of work lives here, in five tabs, so a person never has to know which record type to look for.

## 2. What changes from Revision 2

- Nine tabs become five: **Overview, Work, Specs, Files, History** (view in `?view=`).
- Milestones merge into **Work** (04D); Tasks live in **Work** (04E); Requirements become **Specs** (04F); Assets, Documentation, and Deliverables merge into **Files** (04G, 04I); Revisions become **History** (04H).
- Removed: owner, collaborators, avatar stack, priority badge, health badge as a status (health is a derived line), Archive and Edit as header buttons (they move to a `⋯` menu).
- The old trace chain of six counted nouns becomes a single line (below).

## 3. Layout

```text
Projects / Project Garden                                   [⋯]
Project Garden            Active · Creative · 1 Sep – 28 Feb
Story-led creative production workspace.
[Overview] [Work 9] [Specs 4] [Files 7] [History 5]

Overview
 Objective: Ship a welcoming first chapter that holds together.
 Phase  ●─●─◉─○─○  Chapter one (3 of 5)        Progress 5 of 9 tasks
 Next: Chapter one review · 13 Nov                At risk: 2 tasks overdue
 Specs: 4 requirements · 2 have no work yet  ▸
 Recent in this project …
```

## 4. Tabs

| Tab | Content |
|---|---|
| Overview | Objective, phase stepper, progress, next date, derived health line, a **Specs summary line** ("4 requirements, 2 without work"), recent changes (3) |
| Work | Tasks grouped by milestone; List, Board, Timeline toggle (04D, 04E) |
| Specs | Requirements with acceptance checklists; List or Coverage matrix (04F) |
| Files | Files and documents of the project (04G, 04I) |
| History | Changes feed and Compare (04H) |

Tabs with no content still appear with a short first-use message; counts come from selectors.

## 5. Header rules

- One breadcrumb (`Projects / Name`), the name once as H1, status badge, category, dates.
- The `⋯` menu holds Edit, Archive, and Delete as preview-only confirmation dialogs.
- Sticky compact header (name and tab bar) on scroll for mobile.

## 6. Components

Shared: `PageHeader` (breadcrumb mode), `ViewTabs` (with counts), `ProgressBar`, `PhaseStepper`, `RelationChip`, state components. The Revision 2 `TraceChain` is retired; its job is now the Specs summary line and the record "lens" (04F).

## 7. States

Missing project (links to Projects), empty tab states, loading and error. The "unauthorized project" state is removed.

## 8. Responsive

Tabs scroll with the active tab in view; the phase stepper becomes vertical below 768px; the detail panel is a sheet below 1280px.

## 9. Fixture needs

`phases[]` with the current phase, `objective`, template `kind`, and a `lastOpenedAt`; at least one project with every tab populated and one nearly empty project to exercise first-use messages.

## 10. Preview-only actions

Edit project, Archive (confirmation layout), per-tab `Add` buttons.

## 11. Acceptance checklist

- [ ] Five tabs; the project name appears once.
- [ ] No people, avatars, or priority anywhere on the page.
- [ ] The Specs summary line replaces the six-count chain and links to Specs.
- [x] Each tab has a first-use empty state.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536. (Verified at 320, 375, 768, 1024, 1280, and 1440px by an automated DOM audit (2026-11-14); 390 and 1536px not run.)

## Implementation status (Revision 3)

**Implemented 2026-11-14** as `pages/ProjectPage.jsx` with tabs Overview, Work, Specs, Files, History (view and selected record kept in the URL).

**Built:** phases row, three figures, next milestone, About, recent changes (Overview); milestone groups with a Groups/Timeline switch (Work); requirement list and panel (Specs); file tiles and panel (Files); day-grouped change feed with a comparison view (History); a "project not found" state; per-tab empty states.

**Differences (why the unticked items above stay open):** the project name appears in both the breadcrumb and the heading; Overview shows a "Requirements complete" figure rather than a Specs summary line with a link; task rows inside the project still show a High priority flag (priority is limited to High, not removed).

**Not verified:** 390 and 1536px.
