# PLAN-A-04E — `/tasks` Tasks (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Status:** Planning · **Reference page:** build first in Phase 4 to prove the new anatomy · **Evidence:** RESEARCH.md D4, D6, D9; Todoist, Things, and Linear speed lessons (section 10)

## 1. Purpose

The daily loop: see what is on my plate, add something in seconds, finish it. Tasks is "my work" across projects; the same task rows appear inside a project's Work tab.

## 2. What changes from Revision 2

- Views become **Today, Upcoming, All** (task horizon) instead of List, Board, Schedule. Board and a flat list become display options of **All**.
- The filter chip row (Overdue, Due soon, Blocked, Completed) is removed. Overdue and blocked are **sorted to the top and marked** in Today; the rest live in one **Filter** popover.
- Removed: assignee select, assignee avatars, creator, priority select, the four-card stat strip, and the "Group-by" idea.
- Statuses: **To do, Doing, Done** plus a **Blocked** flag; priority is **Normal or High** and appears only when High (Revision 2: six statuses, four priorities).
- The project scope switcher is replaced by a **Project** filter inside the popover.
- Quick add sits at the top of the list (PLAN-A-04L).

## 3. Layout

```text
Tasks
[Today] [Upcoming] [All]
[ + Add a task… ]                       [search…] [Filter ▾ (0)]   (List | Board)  (All only)

Overdue
 ◔ Write character profiles      Project Garden      overdue 3 days
Today
 ◔ Review opening scene notes    Project Garden      today          ↑ High
 ○ Choose session strategy       Tsumugi API         today
Done today (collapsed)
```

## 4. Views

| View | Content |
|---|---|
| Today | Overdue first, then due today, then Doing without a date; done today collapsed |
| Upcoming | Next 14 days grouped by day; milestone due dates appear as markers |
| All | Everything, grouped by project or flat; List or Board (To do, Doing, Done) |

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Status control (circle: To do, Doing, Done), title |
| Secondary | Project label (when not inside a project), due label with overdue treatment, **Blocked** flag, High priority marker |
| Tertiary | Subtask progress, milestone, notes (panel only) |

Detail panel: notes, subtasks (checklist), due date, project, milestone, and a **Links** lens: *Why it exists* (the requirement it serves) and *What it produces* (files and changes). Preview-only actions: Edit, Change status, Block or unblock.

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar` with `FilterPopover`, `TaskRow`, `DueLabel`, `StatusBadge`, `RelationChip`, `DetailPanel`. New: `QuickAddField` (inline), `StatusControl`.

## 7. States

Empty today ("Nothing due today", link to Upcoming), no tasks yet (first-use with Quick add), no results with active filters, loading and error. No "unauthorized".

## 8. Responsive

Single column below 1280px; the detail panel is a sheet; Board shows one column at a time below 768px with a status selector; the Quick add field stays pinned at the top.

## 9. Fixture needs

Three statuses, `blocked`, `priority: normal|high`; remove assignee and creator; keep `due`, `milestoneId`, `subtasks`, and requirement and file links.

## 10. Preview-only actions

Status control, Edit, Block, Quick add (session-only add allowed, per PLAN-A-04L).

## 11. Acceptance checklist

- [ ] Three views; no chip row; one control row.
- [ ] No people or avatars; priority only when High.
- [ ] Overdue and blocked are visible by sort order and icon plus text.
- [ ] A task row fits on one line at ≥1024px and two lines on mobile.
- [ ] Quick add works from the field and the global shortcut.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
