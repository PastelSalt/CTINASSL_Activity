# PLAN-A-04H — History (project **History** tab) (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** the `/revisions` page · **Status:** Implemented (2026-11-14) · **Evidence:** RESEARCH.md D9 (review workflow is team-only), D3

## 1. Purpose

"What changed, and why?" as a calm, chronological record, with a way to compare two versions of a document. For one person it is a safety net and a story of the work, not an approval process.

## 2. What changes from Revision 2

- No standalone page; History is a tab of one project.
- **Removed (team concepts):** the Review queue, Approve, Request changes, author avatars, and the Pending, Approved, and Rejected states.
- Revision states (four) become one: **Recorded**, with an optional **Reviewed** self-check.
- Renamed in the UI: **Changes** (recommended in D10; confirm in testing).
- Views reduce from three to two: **Timeline** (feed) and **Compare**.
- The state chip row and record-type select are replaced by the shared Filter popover (record kind).

## 3. Layout

```text
History                                                     (Timeline | Compare)   [Filter ▾]
Today
 ● 10:42  Edited “Opening brief”   v3 → v4       [Opening brief] [REQ-001]        ☐ Reviewed
Yesterday
 ● 16:30  Replaced “opening-scene-notes.md”                                        ☑ Reviewed
```

Compare: choose a document and two versions; a Before and After view with `+` and `−` markers; binary files show an unsupported explanation.

## 4. Record presentation

| Priority | Fields |
|---|---|
| Primary | Time, sentence describing the change |
| Secondary | Affected record chip, version reference |
| Tertiary | Linked requirement or task chips, diff size |

Detail panel: full sentence, linked records, and a preview-only `Mark reviewed` toggle. A "Newest first or Oldest first" control stays inside the Filter popover.

## 5. Components

Shared: `ViewTabs`, `Toolbar` with `FilterPopover`, `RelationChip`, `DetailPanel`, `UnsupportedPreview`. Existing from Revision 2: `DiffView` (side by side with markers).

## 6. States

No changes yet (explains that edits to files, tasks, and requirements appear here), identical versions ("No differences"), unsupported compare, loading, error.

## 7. Responsive

The feed is a single column; Compare is side by side at ≥1024px and stacked below with a sticky version selector.

## 8. Fixture needs

`change` records with ISO `at`, a sentence, `recordRef`, version references, `reviewed` (boolean), and diff blocks for at least two documents plus one binary example. Remove `authorId` and all state values.

## 9. Preview-only actions

`Mark reviewed` and `Log change` (dialog layout).

## 10. Acceptance checklist

- [x] No queue, approval, request-changes, author, or state-chip UI.
- [x] Order comes from timestamps; fixtures are never mutated by sorting.
- [ ] Compare shows markers (not colour alone) and an unsupported state.
- [x] The tab is reachable only inside a project.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536. (Verified at 320, 375, 768, 1024, 1280, and 1440px by an automated DOM audit (2026-11-14); 390 and 1536px not run.)

## Implementation status (Revision 3)

**Implemented 2026-11-14** as the History tab in `ProjectPage.jsx` (feed grouped by day, `ChangeEntry`, `ChangePanel`).

**Built:** newest-first feed, a panel with linked records, a Reviewed flag, and a comparison view (`?mode=compare&rev=`) showing removed and added lines with minus and plus markers.

**Differences / not built:** the comparison is one diff pane, not two columns, and has no "unsupported" state for changes without a diff (the link only appears when a diff exists).

**Not verified:** 390 and 1536px.
