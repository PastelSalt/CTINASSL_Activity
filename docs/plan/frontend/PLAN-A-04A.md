# PLAN-A-04A — `/dashboard` Overview (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Four metric cards, then a two-column grid: project pulse, milestones, tasks, activity, quick actions.
- Header uses a slogan ("A clear view of the work.") and a hard-coded date; two header buttons (`New project`, `New task`) duplicate the Quick actions panel.
- The local navigation lists six sections, but five render a "staged for visual exploration" stub even though the same content is on the Overview section (audit F5).
- Metric values are typed as literals (`03`, `12`) instead of being computed from fixtures; the cards are large, so the first viewport shows metrics but little actionable work.
- Panels show raw strings (`Tomorrow`, `19 Nov`) with no overdue/today treatment and no links to the underlying records.

## 2. UI goals

1. Answer in one screen: *What needs me today? What is slipping? What changed?*
2. Lead with **action**, not counts: an attention list above project pulse.
3. Make every number computed from fixtures and clickable into the filtered module.
4. Remove the dead local navigation and duplicate buttons.

## 3. Layout

```text
Header:  Overview · <demo date>                         [New project]
         2 items need attention across 3 projects
Today strip (4 flat stats, clickable):
  Open tasks 12 → /tasks   Due this week 5 → /tasks   Overdue 2 → /tasks   Active projects 1 → /projects
┌──────────────────────────────────────────┬───────────────────────────┐
│ Needs attention (tasks + milestones,     │ Project pulse             │
│ sorted: overdue, today, blocked, soon)   │ one compact row/project:  │
│  ▣ Review opening scene notes  Today  ▸  │ name · status · phase ·   │
│  ▣ Auth flow map  Blocked      ▸         │ progress bar · next step  │
├──────────────────────────────────────────┼───────────────────────────┤
│ Upcoming milestones (next 3, dated)      │ Recent activity (feed,    │
│                                          │ grouped Today/Yesterday)  │
└──────────────────────────────────────────┴───────────────────────────┘
```

Mobile: Today strip scrolls horizontally with snap; panels stack in the order Needs attention → Project pulse → Milestones → Activity.

## 4. Content specification

| Region | Content | Behavior |
|---|---|---|
| Header | Eyebrow with the demo date from a fixed "demo today" constant; H1 `Overview`; one-line context computed from fixtures | Primary action `New project` is a preview action |
| Today strip | Open tasks, due this week, overdue, active projects (value + label + qualifier) | Each stat links to the filtered module route |
| Needs attention | Merged list of overdue/blocked/due-today tasks and at-risk milestones; row = `StatusBadge`, title, `RelationChip` (project), `DueLabel` | Row opens the `DetailPanel` preview; `View all tasks` link |
| Project pulse | One row per project: icon tile, name, `StatusBadge`, phase, progress bar, next milestone | Row links to `/projects/:projectId`; progress tooltip shows the formula (completed tasks ÷ total tasks) |
| Upcoming milestones | Next 3 by due date with `DueLabel`, project chip, linked task count | `View timeline` link |
| Recent activity | Feed grouped by day: actor avatar, action sentence, record chip, time | `View all` links to Revisions |

Quick actions are removed as a panel; `New project` stays in the header, and `New task` appears as a preview action in the empty state of Needs attention.

## 5. Components

Shared: `PageHeader`, `StatStrip`, `StatusBadge`, `DueLabel`, `RelationChip`, `ProgressBar`, `DetailPanel`, `EmptyState`, `Skeleton`, `PreviewActionButton`. Page-specific: `AttentionList`, `ProjectPulseRow`, `ActivityFeed`.

## 6. States

- [ ] Loading: skeleton strip + three skeleton lists.
- [ ] Empty (no projects): welcome state with `New project` preview action and three steps (create project → add milestones → add tasks).
- [ ] Nothing needs attention: positive empty state "All caught up".
- [ ] Error and unauthorized through the shared components; previewable from the demo state previewer.

## 7. Responsive

Desktop ≥1280: two columns (8/4). 768–1279: single column, project pulse moves under Needs attention. <768: stat strip snap-scroll; list rows stack title above meta; the first attention item is visible above the fold at 390px.

## 8. Fixture and selector needs

- `demoToday` constant and ISO dates on tasks, milestones, and activity.
- Selectors: `openTasks`, `dueThisWeek`, `overdueRecords`, `attentionItems`, `projectProgress` (completed ÷ total tasks), reused by Reports (04J).
- Activity entries get `actorId`, `recordType`, `recordId`, `projectId`, `at`.

## 9. Preview-only actions

`New project` (preview dialog with the create-form layout). Rows do **not** offer `Mark done` (it would imply an operation); they open details only.

## 10. Acceptance checklist

- [ ] No local navigation tabs; no dead sections.
- [ ] Every number is computed by a selector and links to a filtered view.
- [ ] At 1280×720 the first viewport shows the strip and the top of Needs attention; at 390px it shows header, strip, and the first attention row.
- [ ] Overdue, today, and blocked are distinguishable by icon + text.
- [ ] Demo notice appears once (banner), not per panel.
- [ ] Keyboard: strip stats, rows, and panel links are reachable in reading order with visible focus.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536 with no horizontal scroll.

## 11. Carried over from Revision 1

Project pulse, milestones, tasks, and activity content; metric formulas and source documentation; credential-free entry and demo labelling.

## Implementation status — 2026-11-14

Done: a single composed screen (no local tabs); a today strip with clickable, selector-computed stats linking to filtered views; Needs attention list (overdue, blocked, due today or tomorrow tasks and milestones); project pulse with progress from tasks done / total; upcoming milestones; recent activity grouped by day with relation chips; preview-only New project; empty, loading, error, and unauthorized states through the state previewer. Not done: a New task action in the all-caught-up state.
