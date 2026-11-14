# PLAN-A-04E — `/tasks` Tasks (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning · **Reference page:** built first in Phase 4 to prove the shared system

## 1. Current state (observed)

- Sections: All tasks, List view, Kanban view, Due soon, Blocked, Completed. *All tasks* and *List view* render the same list; *Due soon/Blocked/Completed* are status filters (audit F6).
- Three "new task" controls on one screen: header `Create task`, header `New task`, toolbar `New task`; the List/Kanban toggle duplicates two section tabs.
- Large task cards (~170px) show description, milestone, and four meta items as plain text; 8 tasks already need a long scroll. Kanban uses six equal columns that overflow small screens.
- Backlog and Blocked share the same lilac tone; `Overdue` is tested in code but is not a status in the fixtures.
- Summary cards (four outlined boxes) push the list below the fold at 390px.

## 2. UI goals

1. Make triage fast: dense rows for scanning, board for flow, schedule for deadlines.
2. Status, priority, and due date are visible in one glance on every task.
3. Relationships (project, milestone, requirement, assets) are chips.
4. Replace the three create buttons with one.

## 3. Layout

```text
Header: Tasks                                           [New task]
Tabs:   List | Board | Schedule
Toolbar: [search]  Status: All Due soon Blocked Completed   Project ▾  Assignee ▾  Priority ▾  Sort ▾
Summary strip: Open 7 · Due this week 3 · Blocked 1 · Done 1                (flat, clickable)

List row (≈56px):
 ○ Review opening scene notes   (In progress)  High ↑  [Project Garden] [Chapter one review]  due Today  (M)
Board (≥768px): Backlog | To do | In progress | In review | Blocked | Completed — horizontal scroll with snap
Schedule: groups  Overdue · Today · This week · Later · No date
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| List | Compact `RecordRow`s grouped by status or flat (group-by control: None · Status · Project · Due) | Default: flat sorted by due date; blocked and overdue flagged with icon + text |
| Board | Six status columns with counts; each card shows title, priority, due, assignee, subtask progress | Read-only (no drag handles); columns collapse to a status selector at <768px |
| Schedule | Tasks grouped by due bucket with a relative-date header per group | Replaces *Due soon*; overdue bucket first |

Filter chips (with counts) replace the *Due soon*, *Blocked*, and *Completed* sections. `More filters` popover: milestone, tag, has-requirement, has-subtasks.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Checkbox-style status icon, title, `StatusBadge`, `DueLabel` |
| Secondary | `PriorityBadge`, project chip, milestone chip, assignee `Avatar` |
| Tertiary | Subtask progress (`2/5`), linked requirement/asset/revision counts, creator and description (detail panel only) |

The detail panel shows description, instructions, subtasks (read-only checklist), links (requirements, assets, revisions), and an activity/comment placeholder list.

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatStrip`, `StatusBadge`, `PriorityBadge`, `DueLabel`, `RelationChip`, `Avatar`, `RecordRow`, `DetailPanel`, state components. Page-specific: `TaskBoard`, `TaskBoardCard`, `ScheduleGroup`, `SubtaskList`.

## 7. States

- [ ] Empty project: "No tasks yet" with a `New task` preview action.
- [ ] No results: active filter chips + `Clear filters`.
- [ ] Empty board column: "Nothing here" caption (no illustration).
- [ ] Large collections: show a "Load more" row after 25 items (visual boundary for the future bounded loading strategy; does not fetch).
- [ ] Loading skeleton rows; error; unauthorized.

## 8. Responsive

≥1280: list + docked detail panel; board shows all six columns. 768–1279: board scrolls horizontally with snap. <768: List shows two-line rows (title / meta); Board becomes a status selector (segmented chips) showing one column at a time; filters open in a bottom sheet; header action becomes icon-only.

## 9. Fixture needs

ISO `due`; statuses limited to the six defined; remove the dead `Overdue` status (compute overdue from `due` and `demoToday`); add `subtasks[]`, `requirementIds`, `assetIds`, `revisionIds`, `creatorId`, `assigneeId`; at least one overdue, one blocked, one completed, one without a due date.

## 10. Preview-only actions

`New task`, `Edit`, `Change status` (menu layout; selecting an item closes the menu without changing the record), `Assign`.

## 11. Acceptance checklist

- [ ] Exactly one create control per breakpoint.
- [ ] Views are List, Board, Schedule; blocked/completed/due-soon are chips with counts.
- [ ] Every status has a unique icon + label; Backlog and Blocked are clearly different.
- [ ] A task row fits on one line at ≥1024px and two lines on mobile.
- [ ] First task row visible above the fold at 390px.
- [ ] Board works at 768px by scrolling and at <768px through the status selector.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Task fixtures with project/milestone/assignee, six-status vocabulary, search, empty state, Kanban concept.

## Implementation status — 2026-11-14

Done: List, Board, and Schedule views; a single New task action; filter chips (All, Overdue, Due soon, Blocked, Completed) with counts plus assignee, priority, and sort controls; board with a status selector below 768px; schedule buckets; detail panel with subtasks, relationships as chips, and preview-only Edit and Change status; the dead Overdue status was removed (computed from dates). Not done: Group-by control, Load more boundary, More filters popover.
