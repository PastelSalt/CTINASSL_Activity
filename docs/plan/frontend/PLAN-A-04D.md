# PLAN-A-04D — `/milestones` Milestones (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: All milestones, Timeline, Upcoming, Overdue, Completed. Upcoming/Overdue/Completed are the same list with a status filter (audit F6).
- A `List view`/`Timeline view` toggle in the toolbar duplicates the Timeline tab.
- Cards: colored left bar + status pill + description + three meta rows; the project link is a small "Open project" text. Dependencies print as plain text.
- The timeline is a vertical list of dates with colored dots; no today marker, no month grouping, and no link to the tasks it depends on.

## 2. UI goals

1. Show *what is next, what is late, what is blocked* at a glance, with the date as the dominant element.
2. A real timeline with a **today marker** and month grouping.
3. Dependencies become visible chips, not text.
4. Status subsets become filter chips; tabs are different layouts.

## 3. Layout

```text
Header: Milestones                                   [New milestone]
Summary strip: Upcoming 3 · Overdue 1 · Blocked 1 · Completed 2 · Next due in 3 days
Tabs:   Register | Timeline | By project
Toolbar: [search] Status: All Upcoming Overdue Blocked Completed   Project ▾   Sort ▾
Register row:
 ┌────┬───────────────────────────────┬────────────┬─────────┬───────────┐
 │ 19 │ Auth flow map   (Blocked)      │ ▓▓▓░░ 3/5 │ Tsumugi │ depends → │
 │ Nov│ due in 5 days · High ↑         │ tasks      │ API     │ Chapter 1 │
 └────┴───────────────────────────────┴────────────┴─────────┴───────────┘
Timeline:  Oct ───── Nov ──────▼today──── Dec     (one lane per project, markers as pills)
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| Register | Rows with a left date block, title + status, task progress (`done/total`), project chip, dependency chip | Default sort: due date ascending; overdue pinned first |
| Timeline | Horizontal time axis at ≥768px (months, today marker, one lane per project); vertical dated list below 768px | Markers show a status icon; overlaps stack |
| By project | Groups of Register rows under project headers with a per-project completion bar | Collapsible groups (local state) |

Filter chips replace the old Upcoming/Overdue/Completed tabs and show counts that update with the search and project filters.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Date block, title, `StatusBadge`, `DueLabel` |
| Secondary | Task progress (`n/m`), project `RelationChip`, `PriorityBadge` |
| Tertiary | Dependency chip(s), deliverable chip, start date, description (in the detail panel) |

The detail panel lists linked tasks (as `RelationChip`s with status), requirements, dependencies, and deliverables.

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatStrip`, `StatusBadge`, `PriorityBadge`, `DueLabel`, `RelationChip`, `RecordRow`, `ProgressBar`, `DetailPanel`, state components. Page-specific: `MilestoneDateBlock`, `TimelineAxis`, `DependencyChip`.

## 7. States

- [ ] Empty: "No milestones yet" with a `New milestone` preview action.
- [ ] No results with active filter chips.
- [ ] Timeline with a single milestone still shows axis and today marker.
- [ ] Loading skeleton rows; error; unauthorized.

## 8. Responsive

≥1280: Register rows with all columns + docked detail panel. 768–1279: dependency chip wraps below. <768: date block shrinks to a 48px tile and columns stack; timeline becomes a vertical list with a today divider; filter chips scroll.

## 9. Fixture needs

ISO `start`/`due`, `taskIds`, `dependencyIds`, `deliverableIds`, `phaseId`; at least one each of upcoming, in progress, overdue, blocked, and completed milestones. Compute displayed status relative to `demoToday` rather than storing text.

## 10. Preview-only actions

`New milestone`, `Mark complete`, `Archive` (confirmation layout), `Add dependency` (selector layout).

## 11. Acceptance checklist

- [ ] No duplicate List/Timeline toggle outside the tabs.
- [ ] Overdue and blocked are visually and textually distinct from upcoming; overdue sorts first.
- [ ] Timeline shows a today marker and month grouping at ≥768px and a vertical equivalent below.
- [ ] Dependencies and project are chips that navigate or open the detail panel.
- [ ] Filter chip counts match the visible rows.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Milestone fixtures, status vocabulary, timeline concept, project links, empty state.

## Implementation status — 2026-11-14

Done: Register, Timeline, and By project views; status filter chips with counts; summary strip including next due; register rows with date block, status, due label, task progress, and dependencies; monthly timeline with a lane per project and a Today marker (vertical list with a Today divider below 768px); detail panel with tasks, dependencies, and deliverables; status computed from dates and flags. Not done: collapsible project groups.
