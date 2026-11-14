# PLAN-A-04H — `/revisions` Revisions (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: All revisions, Recent changes, Pending review, Approved, Version comparison.
- *Version comparison* has **no dedicated UI** and shows the full list; the checklist marked it complete (audit F6). *Recent changes* sorts by relative-time strings (`12 min ago`, `Yesterday`) through a lookup table and mutates the shared fixture array with `Array.sort`; *Pending review*/*Approved* are state filters.
- Cards stack author, state pill, description, timestamp/record/project, previous/current refs, and linked-record text — five rows per revision.
- The `/revisions` route is still unchecked in the parent plan route list.

## 2. UI goals

1. Present history as a **chronological feed** that reads like a changelog.
2. Make review a first-class workflow view: a queue of pending items with clear before/after.
3. Provide a real **Compare** view for supported types (Markdown documents) and a clear unsupported state for others.
4. Replace text references with chips; compute order from timestamps.

## 3. Layout

```text
Header: Revisions                                      [Log revision]
Tabs:   History | Review queue | Compare
Toolbar: [search]  State: All Recorded Pending Approved Rejected   Type: All Document Task Asset   Project ▾
History feed (grouped by day, newest first; vertical thread line):
 ● 10:42  Mika edited “Opening brief”   (Pending review)    [Project Garden] [Doc: Opening brief]
 │        v3 → v4 · +12 −3 lines · linked: [REQ-004] [T-07]                           ▸ opens detail panel
 ● Yesterday …
Compare:  [Document ▾] [From v3 ▾] [To v4 ▾]
 ┌ v3 ───────────────────┬ v4 ───────────────────┐   added = green block with “+” markers
 │ …                     │ …                     │   removed = red block with “−” markers
 └───────────────────────┴───────────────────────┘
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| History | Day-grouped feed with a thread line, avatar, one-line change sentence, state badge, relation chips | Newest first; a small order toggle (Newest/Oldest) controls the convention explicitly |
| Review queue | Pending items as cards with the diff summary and approval-state badge; `Approve` / `Request changes` are preview actions | Empty state "Review queue is clear" |
| Compare | Side-by-side (≥1024px) or stacked (<1024px) text diff for fixture Markdown documents; line markers use `+`/`−` symbols as well as color | Unsupported types show `UnsupportedPreview` listing why (binary/media) and linking to the asset |

Type, state, and project are filter chips. The previous *Pending review* and *Approved* sections are now chips and the Review queue view.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Author avatar, change sentence, timestamp (relative with absolute in `title`), state badge |
| Secondary | Affected record chip, project chip, `v3 → v4` reference |
| Tertiary | Linked tasks/requirements/assets/deliverables chips, diff stats, reviewer (detail panel) |

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatusBadge`, `Avatar`, `RelationChip`, `DetailPanel`, `UnsupportedPreview`, state components, `PreviewActionButton`. Page-specific: `HistoryFeed`, `RevisionEntry`, `DiffView`, `ReviewCard`.

## 7. States

- [ ] Empty history, empty review queue, no results.
- [ ] Compare with identical versions: "No differences".
- [ ] Compare unsupported: explanation + alternative.
- [ ] Large history: "Load older revisions" row after 25 entries (visual boundary only).
- [ ] Loading skeleton feed; error; unauthorized.

## 8. Responsive

≥1280: feed + docked panel; compare side by side. 768–1279: feed single column; compare side by side if width allows, otherwise stacked. <768: entries as two-line cards with chips wrapping; compare stacked with a sticky from/to selector.

## 9. Fixture needs

ISO `at` timestamps (sorted by selectors, never by string), `fromVersion`/`toVersion`, `diff` blocks for at least two Markdown documents (added/removed/unchanged lines), `recordType`, `recordId`, reviewer, plus one rejected and one binary (unsupported compare) example.

## 10. Preview-only actions

`Log revision`, `Approve`, `Request changes`, `Compare` target changes (compare selectors work locally on fixtures).

## 11. Acceptance checklist

- [ ] History order comes from timestamps; fixtures are never mutated by sorting.
- [ ] Compare view exists with accessible `+`/`−` markers and an unsupported state.
- [ ] Pending review is reachable from a queue view and a state chip.
- [ ] Review state is shown by icon + text, not color alone.
- [ ] Day groups and newest/oldest convention are visible.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Revision fixtures, state vocabulary, linked-record data, search, empty state.

## Implementation status — 2026-11-14

Done: History (day-grouped feed, newest/oldest), Review queue (pending items with Compare, Approve, and Request changes as previews), and Compare (side-by-side Before/After with plus and minus markers, and an unsupported state for binary files); ordering computed from timestamps; state chips; detail panel. Not done: a Load older revisions boundary.
