# PLAN-A-04B — `/projects` Projects (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** Projects directory and the cross-project Milestones page · **Status:** Planning · **Evidence:** RESEARCH.md D2, D3, D9

## 1. Purpose

Find a project, see its state at a glance, and start a new one from a template.

## 2. What changes from Revision 2

- Views reduced from four (Directory, Board, Recent, Archived) to two: **List** and **Timeline**. Board by status and Recent are removed (recents live on Home and in the palette). Archived becomes a toggle.
- **Timeline** is the old cross-project Milestones page, now a view here (`/milestones` redirects to `/projects?view=timeline`).
- Status chips as a filter row are removed; status and category move into one **Filter** popover.
- Removed: owner, collaborators, avatars, priority badge on cards.
- `New project` opens the **template picker** (PLAN-A-04L).

## 3. Layout

```text
Projects                                              [New project]
[List] [Timeline]
[search…]  [Filter ▾ (0)]  [Sort ▾]  (Cards | Table)  [ ] Show archived

┌ Project Garden ───────────┐  ┌ Tsumugi API ──────────────┐
│ Creative · Active          │  │ Software · Planning        │
│ Chapter one · next 13 Nov  │  │ Design · next 19 Nov       │
│ ▓▓▓▓▓░░░ 5/9 tasks         │  │ ▓░░░░░░░ 1/6 tasks         │
└────────────────────────────┘  └────────────────────────────┘
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| List | Cards (default) or table | Sort: last opened, name, next date |
| Timeline | Months axis, one lane per project, milestones as bars, a Today marker; vertical dated list below 768px | Read-only; selecting a milestone opens its panel (04D) |

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Icon tile, name, status badge (Planning, Active, On hold, Done) |
| Secondary | Category, current phase, next date, one progress figure (`done/total tasks`) |
| Tertiary | Tags (max 2) |

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar` with a new **FilterPopover**, `StatusBadge`, `ProgressBar`, `DataTable`, `DetailPanel`, state components. New: `ProjectCard`, `TimelineAxis` (reused from Revision 2 milestones).

## 7. States

Empty (no projects) shows the template picker inline; no results lists active filters with a clear button; loading and error from shared states.

## 8. Responsive

Cards 3-up ≥1280, 2-up ≥768, 1-up below. The Filter popover is a bottom sheet on mobile. Timeline falls back to a vertical dated list.

## 9. Fixture needs

Four statuses; one archived project; `lastOpenedAt`; a template `kind` per project. Remove people fields.

## 10. Preview-only actions

`New project` (template picker then name), `Archive` and `Restore` (confirmation layouts).

## 11. Acceptance checklist

- [ ] Two views only; no board, no recents tab.
- [ ] One control row; filters live in one popover with an active count.
- [ ] No people, avatars, or priority on cards.
- [ ] `/milestones` redirect lands on the Timeline view.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
