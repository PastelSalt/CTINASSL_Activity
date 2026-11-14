# PLAN-A-04A — `/home` Home (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** Overview (`/dashboard`) · **Status:** Implemented (2026-11-14) · **Evidence:** [RESEARCH.md](../../../RESEARCH.md) D2, D4, section 11.3 item 6

## 1. Purpose

Answer one question: **what should I do today?** Nothing else belongs here.

## 2. What changes from Revision 2

- Renamed and moved: `/dashboard` → `/home`.
- Removed: the four-stat strip (replaced by at most three figures), the project pulse panel, the milestones panel, the activity feed, the "Needs attention" mix of tasks and milestones, and the New project header button (Quick add is global).
- Added: a **Today** list, an **Up next** list, a compact **Projects** strip, and **Recent** items.
- Removed for the individual workspace: avatars, people, and team activity.

## 3. Layout

```text
Home · Thursday 12 November
Figures (max 3):  Due today 2 · Overdue 1 · Doing 3        (each opens Tasks, filtered)

Today                                        Up next (next 7 days)
 ○ Review opening scene notes   Project Garden   ○ Reconcile character names  Fri
 ○ Choose session strategy      Tsumugi API      ◇ Milestone: Chapter one review  Fri
 ○ Write character profiles     overdue 3 d      ○ Proof chapter one dialogue  Wed
 Show all in Tasks ▸

Projects (up to 4 recent)   [Project Garden ▓▓▓▓░ 5/9] [Tsumugi API ▓░░░ 1/6] …
Recent                       Opening brief · REQ-001 · schedule-draft.xlsx
```

Mobile: figures scroll horizontally; the order is Today, Up next, Projects, Recent.

## 4. Content specification

| Region | Content | Behaviour |
|---|---|---|
| Header | Date eyebrow, H1 `Home`, one line ("2 things need you today") | No primary action; Quick add is global |
| Figures | Due today, Overdue, Doing; plain numbers with labels | Each opens `/tasks` with the matching filter |
| Today | Tasks due today, overdue, and in Doing, up to 7; milestone due today appears as a task-like row | Row opens the task panel; status control is a preview action |
| Up next | Next 7 days, grouped by day, tasks and milestones mixed with a type glyph | `View all` goes to Tasks, Upcoming |
| Projects | Up to 4 most recently opened; name, one progress figure, next date | Opens the project |
| Recent | Last opened records and files (recognition over recall) | Opens the record |

Overdue and blocked work is surfaced by **sorting and icon plus text** inside Today, not by a separate panel.

## 5. Components

Shared: `PageHeader`, `StatStrip` (max three), `TaskRow`, `ProgressBar`, `RelationChip`, `EmptyState`, `Skeleton`. New: `TodayList`, `UpNextList`, `ProjectStrip`, `RecentList`.

## 6. States

- **First run (no projects):** the first-run checklist from PLAN-A-04L replaces the page body.
- **Nothing today:** a positive empty state ("Nothing due today") with a link to Up next.
- Loading, error: shared skeletons and error state (preview selector only when Developer tools are on).

## 7. Responsive

≥1280: two columns (Today | Up next), strips below. 768–1279: single column. <768: figures snap-scroll; the first Today row is above the fold at 390px.

## 8. Fixture and selector needs

`dueToday`, `overdue`, `doing`, `upNext(7)`, `recentProjects(4)`, `recentRecords(6)`; all derived from the fixed demo date.

## 9. Preview-only actions

Status control on a row (changes nothing; dialog explains), and Quick add (see PLAN-A-04L).

## 10. Acceptance checklist

- [x] No more than three figures; no avatars or people anywhere.
- [ ] The first viewport at 1280×720 shows Today and the start of Up next; at 390px it shows the figures and the first Today row.
- [x] Every row opens its record; no duplicate "overdue" panel.
- [x] First-run, empty, and positive-empty states exist.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536 with no horizontal overflow.

## Implementation status (Revision 3)

**Implemented 2026-11-14** as `pages/HomePage.jsx` at `/home`.

**Built as planned:** three figures (Due today, Overdue, In progress); Today (overdue, due today, doing); Up next (7 days, tasks and milestones); Your projects with progress; Recent; first-run checklist (three skippable steps) and a positive empty state when nothing is due; `?preview=empty|loading|error` states.

**Differences:** the Quick add button in the header is hidden on phones because the bottom bar already has the centre add button. The first-run checklist is part of Home, not a separate component. Top-bar chips (due today, overdue) now repeat the two key numbers on every page.

**Not verified:** the exact first-viewport contents at 1280x720 and 390px (measured only that the first row sits near the fold at 375px); 390 and 1536px.
