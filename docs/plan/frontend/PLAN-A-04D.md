# PLAN-A-04D — Work and milestones (project **Work** tab, Projects **Timeline**) (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** the `/milestones` page · **Status:** Implemented (2026-11-14) · **Evidence:** RESEARCH.md D2, D3; Trello's "ceiling" lesson (section 10)

## 1. Purpose

Show a project's plan as **tasks grouped by milestone**, and give milestones a light timeline, without a separate Milestones destination.

## 2. What changes from Revision 2

- No standalone `/milestones` page; no milestone register, "By project" view, or milestone status chip row.
- Milestones appear as **group headers** in the project's Work list and as **bars** on the Timeline (project Work toggle and Projects Timeline).
- Statuses: **To do, Doing, Done** plus a **Blocked** flag; overdue and due-soon are derived from dates (Revision 2 had five milestone statuses).
- Removed: milestone priority badge and deliverable links (deliverables are now a flag on files). Dependencies stay as a plain label: *"after Chapter one review"*.

## 3. Layout (inside the project Work tab)

```text
Work                                    (List | Board | Timeline)   [search] [Filter ▾]
◇ Chapter one review        due 13 Nov · 2 of 4 done · after: Outline locked        ▾
    ○ Review opening scene notes        Doing      today
    ○ Reconcile character names         To do      13 Nov
◇ Character bible           due 10 Nov · OVERDUE · 2 of 4 done                      ▾
    ○ Write character profiles          Doing      9 Nov  (overdue)
◇ No milestone
    ○ Outline chapter two beats         To do
```

Timeline (toggle): a months axis, one lane for this project (all projects on `/projects?view=timeline`), milestone bars with a Today marker.

## 4. Milestone presentation

| Priority | Fields |
|---|---|
| Primary | Title, date block, derived state (Upcoming, Doing, Overdue, Done) with icon and text |
| Secondary | `done/total` tasks, dependency label |
| Tertiary | Description, start date (detail panel) |

Detail panel: description, dates, tasks as chips, dependency, and a preview-only `Mark done`.

## 5. Components

Shared: `ViewTabs` (display toggle), `ProgressBar`, `DueLabel`, `StatusBadge`, `DetailPanel`, `TimelineAxis`. New: `MilestoneGroup` (collapsible header plus task rows).

## 6. States

No milestones yet (first-use message with `Add milestone`), no results with filters shown, loading and error.

## 7. Responsive

Groups collapse to header plus count on mobile; the Timeline falls back to a vertical dated list with a Today divider below 768px.

## 8. Fixture needs

`milestone.blocked`, `milestone.afterId` (optional), derived state from dates; tasks keep `milestoneId`.

## 9. Preview-only actions

`Add milestone`, `Mark done`, `Add dependency` (selector layout).

## 10. Acceptance checklist

- [x] No separate milestones page; both views are reachable from Projects and the project Work tab.
- [x] Overdue is derived from dates and shown with icon plus text.
- [x] No people, priority, or deliverable fields on milestones.
- [ ] Today marker and month grouping on the Timeline; vertical fallback on mobile.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536. (Verified at 320, 375, 768, 1024, 1280, and 1440px by an automated DOM audit (2026-11-14); 390 and 1536px not run.)

## Implementation status (Revision 3)

**Implemented 2026-11-14** inside `ProjectPage.jsx` (Work tab) and `ProjectsPage.jsx` (Timeline), sharing `components/Timeline.jsx` and `MilestoneGroup`/`MilestonePanel` in `components/records.jsx`.

**Built:** no separate milestones page; milestone state derived from dates and tasks (Upcoming, Doing, Overdue, Done) with icon and text; Today marker; vertical list fallback below 768px; tasks with no milestone grouped separately.

**Differences / not done:** the timeline shows a start and end date label rather than month grouping; no month headers.

**Not verified:** 390 and 1536px.
