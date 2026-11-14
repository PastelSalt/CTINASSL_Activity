# PLAN-A-04J — `/reports` Reports (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: Overview, Project completion, Task distribution, Milestone progress, Requirement coverage, Activity history.
- Each report is a text panel: title, formula chip, definition sentence, source line, and a list of rows with a percentage on the right. There are no bars, rings, or charts, so the page reads as a document, not a report (audit F10).
- The header actions are `Set report scope` and `New task` (neither fits the page); the toolbar also has `Export report`, a project select, search, and `Reset scope`. There is no date-range control although the plan calls for one.
- The same "calculation based on placeholder fixture data" note repeats under every panel.
- Percentages are stored values in fixtures rather than derived from selectors shared with Overview.

## 2. UI goals

1. **Glanceable first, defensible second:** every report leads with a simple visual (bar, stacked bar, ring) and exposes its formula and sources one click away.
2. Only visualize what can be derived exactly from fixtures (counts, ratios); no decorative trends.
3. Scope controls (project, date range) sit above the content and affect every view.
4. One consistent report card pattern: headline number → visual → table → definition.

## 3. Layout

```text
Header: Reports                                          [Export report ▾ (preview)]
Tabs:   Overview | Progress | Workload | Coverage | Activity
Scope bar: Project ▾  Date range [Last 30 days ▾]   Showing 3 projects · demo data   [Reset]
Overview (2×2 report cards)
┌ Project completion ───────┐ ┌ Milestone progress ───────┐
│ 33%  1 of 3 tasks          │ │ 50%  2 of 4 milestones    │
│ ▓▓▓░░░░░░░                 │ │ ▓▓▓▓▓░░░░░                │
│ [Definition ⓘ] [View ▸]    │ │ [Definition ⓘ] [View ▸]   │
└────────────────────────────┘ └───────────────────────────┘
┌ Requirement coverage ─────┐ ┌ Overdue work ─────────────┐
Detail views: chart (left) + data table (right) + formula/sources panel (below)
```

## 4. Views

| View | Visual | Table | Formula and source |
|---|---|---|---|
| Overview | Four report cards with a headline number and a mini bar/ring | — | Each card opens its detail view |
| Progress | Horizontal bars per project (completed ÷ total tasks) and a milestone completion bar | Project · Done · Total · % | `completed tasks ÷ total tasks`; `completed milestones ÷ total milestones` |
| Workload | Stacked bar of tasks by status and by priority per project | Status × priority counts | counts by status/priority |
| Coverage | Stacked bar Verified / Unverified / Failed requirements; list of requirements without implementing work | Requirement · Verification · Linked work | `verified requirements ÷ total requirements` |
| Activity | Day-grouped bounded list ("last 20 events") with a small per-day count strip | Time · Actor · Action · Record | bounded chronological query |

The **Overdue work** list appears on Overview and Workload.

## 5. Report card spec

- Headline: value (28px) + qualifier ("1 of 3 tasks").
- Visual: 8px bar or 56px ring using tokens; always paired with the numbers as text.
- `Definition` popover: formula in words, source records (`tasks`, `milestones`…), scope (project/date range), and "Calculated from demo data".
- `View ▸` link opens the detail view; the whole card is not a link (avoid nested interactive targets).
- A report with insufficient data shows "Not enough data" with the missing source, never `0%`.

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar` (scope bar variant), `StatStrip`, `ProgressBar`, `MiniChart` (bar, stacked bar, ring), `DataTable`, `RelationChip`, `DetailPanel`, state components, `PreviewActionButton`. Page-specific: `ReportCard`, `DefinitionPopover`, `ScopeBar`.

## 7. States

- [ ] Insufficient data per report (explicit missing source).
- [ ] No records in scope: empty state with `Reset scope`.
- [ ] Loading skeleton cards and chart placeholders; error; unauthorized.
- [ ] Export: preview dialog showing format options (CSV/PDF) and "Export is not available in the demo"; no file is created.

## 8. Responsive

≥1280: 2×2 cards; detail view chart + table side by side. 768–1279: cards in 2 columns, table below chart. <768: single column cards, bars full width, tables become label/value lists; scope bar collapses to a `Scope` button opening a sheet.

## 9. Fixture and selector needs

Remove stored percentages; compute from tasks, milestones, requirements, and activities through selectors shared with Overview (04A) and Requirements (04F). Add date-range filtering on `at`/`due`. Provide a fixture state with insufficient data (a project with zero tasks).

## 10. Preview-only actions

`Export report` (dialog layout), `Share` (dialog layout). Scope controls work locally on fixtures.

## 11. Acceptance checklist

- [ ] Every report shows a visual **and** the same numbers as text.
- [ ] Every report exposes formula, sources, and scope via `Definition`.
- [ ] Project and date-range scope change every view; reset restores defaults.
- [ ] No percentage is stored in fixtures; changing a fixture record changes the report.
- [ ] Insufficient-data and empty states exist.
- [ ] Charts have text equivalents and meet contrast requirements without relying on color alone (patterns or labels).
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Report definitions, formulas and source documentation, project scope concept, overdue list, no-results behavior.

## Implementation status — 2026-11-14

Done: Overview, Progress, Workload, Coverage, and Activity views; every figure computed from selectors with a Definition disclosure (formula, sources, scope); progress bars and stacked bars with text legends; Not enough data for empty scopes; project scope from the shared switcher; a date range that applies to Activity only (stated on the page); preview-only Export. Not done: ring charts, date-range filtering for the other reports.
