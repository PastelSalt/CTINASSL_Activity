# PLAN-A-04B — `/projects` Project Directory (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Local sections: Directory, Search and filters, Status groups, Recently accessed, Archived projects.
- *Search and filters* is a separate page that only repeats a count and a reset button; *Status groups* and *Recently accessed* show the same card list as Directory (audit F5/F6).
- Cards use a 90px colored swatch with initials, so each card is ~205px tall and only two fit per row; progress is a bare percentage; `More filters` does nothing; sorting is absent.
- The page header and the toolbar each carry a create action; the table view hides tags and collaborators.

## 2. UI goals

1. Treat search and filters as a **toolbar**, not a section.
2. Make each view a real alternative: Directory (cards/table), Board by status, Recent, Archived.
3. Make a project scannable in about a second: name, status, phase, progress, next milestone, owner.
4. Provide sorting and a working local filter set.

## 3. Layout

```text
Header: Projects                                   [New project]
        3 projects · 1 active
Tabs:   Directory | Board | Recent | Archived
Toolbar: [search…]  Status: All Active Planning On hold Completed  Category ▾  Sort ▾  [Cards|Table]
Cards (3-up ≥1280, 2-up ≥768, 1-up mobile)           Detail panel on select (≥1280)
┌──────────────────────────┐
│ ▣ Project Garden  Active │  56px icon tile, status badge
│ Story-led creative…      │
│ Phase: Chapter one review│
│ ▓▓▓▓▓▓▓░░░ 68%  Next: …  │
│ (Mika)(Y)(Ari)  High ↑   │
└──────────────────────────┘
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| Directory | Cards or table (toggle kept in local state for the session) | Default sort: last updated |
| Board | Columns Idea · Planning · Active · On hold · Completed with project cards | Read-only; no drag affordance (it would imply an operation) |
| Recent | List ordered by `lastAccessedAt` with relative time | Replaces *Recently accessed*; max 5 |
| Archived | Muted rows with archive date and a `Restore` preview action | Visually separated from active work |

Filters (toolbar chips with counts): status (the six statuses), category (Creative/Software/Research), priority, owner, and a tag popover under `More filters`. Active filters appear as removable chips. `Sort`: Updated, Name, Priority, Due date.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Icon tile, name, `StatusBadge` |
| Secondary | One-line description, current phase, progress bar with `completed/total tasks` label, next milestone `DueLabel` |
| Tertiary | `AvatarStack` (owner + collaborators), `PriorityBadge`, tags (max 2 + "+n"), updated time |

Cards are anchors to `/projects/:projectId`; table rows are full-row links with a keyboard-focusable title.

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatusBadge`, `PriorityBadge`, `DueLabel`, `AvatarStack`, `ProgressBar`, `DataTable`, `DetailPanel`, state components. Page-specific: `ProjectCard`, `ProjectBoard`.

## 7. States

- [ ] Empty directory: illustration + `New project` preview action.
- [ ] No results: active filter chips + `Clear filters`.
- [ ] Archived tab empty: "Nothing archived".
- [ ] Loading skeleton cards (same card height), error, and unauthorized through the state previewer.

## 8. Responsive

≥1280: 3-up cards + optional detail panel. 768–1279: 2-up. <768: 1-up compact card (icon tile 44px, no tags); table becomes a card list; filter chips scroll horizontally and `More filters` opens a bottom sheet.

## 9. Fixture needs

Add `phase`, `lastAccessedAt`, `archivedAt`, `collaboratorIds`, and ISO `updatedAt`; add one archived and one completed fixture project so every status view has data; keep stable `id` values for routing.

## 10. Preview-only actions

`New project`, `Restore`, `Archive` (confirmation layout). `More filters` works locally because it only filters fixtures.

## 11. Acceptance checklist

- [ ] No "Search and filters" or "Status groups" tab; those jobs live in the toolbar and Board.
- [ ] Every tab changes layout or data scope.
- [ ] Sorting and status/category filters work on fixtures with a visible result count.
- [ ] Card height ≤ 190px on desktop; first card visible above the fold at 390px.
- [ ] Status is icon + text; archived rows are distinguished by label, not only opacity.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Search by name/description/tag/owner, status/category filters, card and table modes, project links, no-results state.

## Implementation status — 2026-11-14

Done: views Directory, Board, Recent, Archived (view in the URL); toolbar search, status chips with counts, category select, sort, cards/table toggle, clear filters; cards show phase, progress, next milestone, people, priority; read-only board by status; archived rows with a preview-only Restore; fixtures cover all six statuses. Not done: priority, owner, and tag filters (More filters), and a Load more boundary.
