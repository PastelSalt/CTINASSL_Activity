# PLAN-A-04C — `/projects/:projectId` Project Workspace (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- The page header shows the project name as the H1 **and** an identity card repeats the name, category, status, and collaborators (audit F3).
- Local navigation is a tall left card with nine sections; each non-Overview section is a bare table (`Milestone | Due | State`, `Task | Priority | Status`) with no filters, links, or status badges.
- The traceability chain is a row of pills with arrows, not navigable and without counts.
- The phase view is five equal boxes; only the current one is emphasized. Only the demo projects resolve; others show a plain missing-project state.

## 2. UI goals

1. One project header that holds identity, health, and context; the page header becomes a breadcrumb.
2. Make the traceability chain the spine of the project: each node shows a count and opens the matching tab.
3. Reuse the same record components as the module pages so a task looks the same here and in `/tasks`.
4. Keep project context while moving between tabs.

## 3. Layout

```text
Breadcrumb: Projects / Project Garden                      [Edit project] [⋯]
┌ Project header ───────────────────────────────────────────────────────┐
│ ▣ icon  Project Garden   (Active) (High ↑)   Creative · Mika           │
│ Story-led creative production workspace.       (M)(Y)(A)  Mar–Jun      │
│ Health: On track · Phase 3/5 Chapter one review · Next: Chapter one…   │
└───────────────────────────────────────────────────────────────────────┘
Tabs: Overview | Workflow | Milestones | Tasks | Requirements | Assets | Docs | Revisions | Deliverables  (counts)
Content for the tab, using the same toolbar/summary/record patterns as the module pages (scoped to this project)
```

## 4. Tabs

| Tab | Content |
|---|---|
| Overview | `TraceChain` with counts (Objective → Requirements → Milestones → Tasks → Revisions → Deliverables); objective statement; health explanation (the fixture rule used); next milestone card; recent activity feed |
| Workflow | Horizontal phase stepper (complete ✓ / current ● / upcoming ○) with dates and the milestones/tasks in each phase; phases are data, not a fixed sequence |
| Milestones | Project-scoped `RecordRow`s with `StatusBadge`, `DueLabel`, linked task count; mini timeline above the list |
| Tasks | Board/list toggle scoped to the project, same cards as `/tasks` |
| Requirements | Rows with ID, verification badge, linked task chips |
| Assets | Thumbnail grid with type, size, access |
| Docs | Document rows with type, status, updated |
| Revisions | History feed scoped to the project |
| Deliverables | Rows with `RelationChip`s to the requirement and tasks that produce them, and a state badge |

Tab counts come from selectors so they stay correct when fixtures change. The project header stays visible on every tab (sticky on desktop; collapses to a one-line bar on scroll below 768px).

## 5. Components

Shared: `ViewTabs` (with counts), `PageHeader` (breadcrumb mode), `TraceChain`, `StatusBadge`, `PriorityBadge`, `AvatarStack`, `RelationChip`, `ProgressBar`, `DataTable`, `RecordRow`, `DetailPanel`, state components. Page-specific: `ProjectHeader`, `PhaseStepper`, `HealthSummary`.

## 6. States

- [ ] Missing project: dedicated "Project not found" state with `Back to Projects` and the fixture projects as links.
- [ ] Unauthorized project: access-denied state previewable from the state previewer.
- [ ] Empty tab: tab-specific empty state with a preview action (for example "No deliverables yet").
- [ ] Loading skeleton: header skeleton + tab content skeleton.

## 7. Responsive

≥1280: header with a right-side metadata column; detail panel docks. 768–1279: metadata wraps under the title. <768: header collapses to icon tile + name + status with metadata in a disclosure; tabs scroll with the active tab in view; phase stepper becomes a vertical list.

## 8. Fixture needs

Every project gets `phases[]` with dates, `currentPhaseId`, `objective`, explicit related-record ID arrays, and at least one record in every tab for the three demo projects (including one deliverable each). Add a fourth, sparse fixture to exercise empty tabs.

## 9. Preview-only actions

`Edit project`, `Archive` (confirmation layout in the `⋯` menu), and per-tab `Add …` actions.

## 10. Acceptance checklist

- [ ] The project name appears once as primary content; the breadcrumb carries the route context.
- [ ] Trace chain nodes show counts and select the matching tab.
- [ ] Each tab uses shared record components and shows status as icon + text.
- [ ] Tab selection survives viewport resize.
- [ ] Missing, unauthorized, and empty-tab states exist and are previewable.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 11. Carried over from Revision 1

Identity data, workflow phases, health summary, traceability concept, project-scoped record sets, missing-project state.

## Implementation status — 2026-11-14

Done: breadcrumb header; project summary card (status, priority, health, dates, phase, progress, owner, collaborators); nine tabs with selector-driven counts; clickable trace chain; phase stepper with milestones per phase; project-scoped lists linking to module records; missing-project state; preview-only Edit and Archive. Not done: sticky or collapsing header on scroll, per-tab Add actions, a dedicated unauthorized-project fixture (the state previewer covers it).
