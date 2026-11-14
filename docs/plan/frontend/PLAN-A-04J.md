# PLAN-A-04J — `/insights` Insights (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** Reports with five views · **Status:** Implemented (2026-11-14) · **Evidence:** RESEARCH.md D4; Hick's and Cowan's limits (3.4)

## 1. Purpose

A few honest numbers about progress and coverage, with their definitions. For one person the question is "am I getting there?", not "who is overloaded?".

## 2. What changes from Revision 2

- Five tabs (Overview, Progress, Workload, Coverage, Activity) become **one page with three cards** and no tabs.
- Removed: Workload by status and priority, Activity (the feed and the date range), the per-project table as its own view, and the global project scope control.
- A **project filter** (single select) stays in the control row.
- Each project also shows its own two numbers on its Overview (04C), so most people never need this page.

## 3. Layout

```text
Insights                                              [Project: All ▾]  [Export ▾ (preview)]

┌ Progress ───────────────┐ ┌ Coverage ───────────────┐ ┌ Overdue ────────────────┐
│ 56%  5 of 9 tasks       │ │ 50%  2 of 4 met+verified│ │ 3                        │
│ ▓▓▓▓▓░░░░               │ │ ▓▓▓▓░░░░░               │ │ open items past their date│
│ [Definition ⓘ]          │ │ [Definition ⓘ]          │ │ [Definition ⓘ]  [View ▸]  │
└─────────────────────────┘ └─────────────────────────┘ └──────────────────────────┘
By project (table, optional disclosure): Project · Progress · Coverage
```

## 3.1 Card spec

- Headline number plus qualifier ("5 of 9 tasks"), a bar with the same numbers as text, a **Definition** disclosure (formula, sources, scope), and a `View` link to the filtered list (Tasks overdue, Specs gaps).
- Insufficient data shows "Not enough data" with the reason, never `0%`.
- **Progress** = done tasks ÷ total tasks. **Coverage** = requirements both Met and Verified ÷ total requirements. **Overdue** = open tasks and milestones with a date before today.

## 4. Components

Shared: `PageHeader`, `ProgressBar`, `StatusBadge`, `RelationChip`, state components. Existing from Revision 2: `ReportCard` and `DefinitionPopover` (rename to `InsightCard`).

## 5. States

Empty (no data yet, explains what feeds each card), insufficient data per card, loading, error.

## 6. Responsive

Three columns ≥1024px, one column below; tables become label and value lists.

## 7. Fixture and selector needs

Reuse `projectProgress`, a new `coverageMetThenVerified`, and `overdueRecords`; no stored percentages.

## 8. Preview-only actions

Export (format dialog, nothing created).

## 9. Acceptance checklist

- [x] One page, three cards, no tabs, no more than three figures.
- [x] Every figure has a visible definition and is computed by a selector.
- [ ] "Not enough data" instead of zeros.
- [x] No people, workload, or date-range controls.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536. (Verified at 320, 375, 768, 1024, 1280, and 1440px by an automated DOM audit (2026-11-14); 390 and 1536px not run.)

## Implementation status (Revision 3)

**Implemented 2026-11-14** as `pages/InsightsPage.jsx`.

**Built:** one page with Progress, Coverage, and Overdue cards (three figures), a project selector, an overdue list, a By project table, and a "How these are counted" definition list; all numbers come from selectors.

**Not done:** a "Not enough data" message. Empty scopes currently show 0 and 0%.

**Not verified:** 390 and 1536px.
