# PLAN-A-04F — Specs (project **Specs** tab) (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** the `/requirements` page · **Status:** Planning · **Evidence:** RESEARCH.md D1, 3.6, section 11.3 item 9

## 1. Purpose

What this project must achieve, and whether the work behind it is there. This is Tsumugi's differentiator, so it must be **available but never required**: a person can use Projects and Tasks for weeks without opening Specs.

## 2. What changes from Revision 2

- No standalone requirements page; Specs is a tab of one project.
- Views reduce from three (Register, Traceability, Coverage) to **List** and **Coverage** (the matrix, opt-in).
- Two overlapping statuses (lifecycle plus verification, 8 labels) become **Open, Met** plus a **Verified** check.
- Removed: type filter (Functional or Non-functional becomes an optional label), priority, the Rejected status, project column.
- The six-stage chain becomes a **lens** on each requirement: *Why it exists* (objective) and *What it becomes* (tasks, files).

## 3. Layout

```text
Specs     4 requirements · 2 without work yet                 (List | Coverage)   [+ Add requirement]
 REQ-001  Opening scene sets the tone        Open     ☐ Verified    2 of 3 criteria    2 tasks · 1 file
 REQ-002  Characters keep consistent names   Open     ☐ Verified    0 of 2 criteria    ⚠ No work yet
 REQ-004  Style guide approved               Met      ☑ Verified    2 of 2             1 task · 1 file
```

Coverage (opt-in): one row per requirement against **Task | File** columns; empty cells are dashed with a "No work yet" label (icon plus text). Scrolls horizontally inside its own container.

## 4. Requirement detail (panel)

- Title, description, optional type label, **Open or Met**, **Verified** check.
- **Acceptance criteria** checklist with progress.
- **Lens:** *Why it exists* (the project objective) and *What it becomes* (task chips, file chips, milestone).
- Gaps called out in words ("No task yet", "No final file yet").

## 5. Components

Shared: `ViewTabs` (display toggle), `RequirementRow`, `RelationChip`, `ProgressBar`, `DetailPanel`. New: `CoverageMatrix`, `CriteriaChecklist`, `LensBlock` (reused on tasks and files).

## 6. States

First use ("Requirements describe what the project must achieve", with `Add requirement`), requirement without criteria (warning row), no gaps (positive message), loading, error.

## 7. Responsive

The matrix scrolls horizontally with a sticky first column; below 768px it becomes a per-requirement card with the same two lines.

## 8. Fixture needs

`status: open|met`, `verified`, `type` (optional), acceptance criteria, links to tasks and files, and at least one fully linked, one without tasks, and one without files.

## 9. Preview-only actions

`Add requirement`, `Mark met`, `Mark verified`, `Link work`.

## 10. Acceptance checklist

- [ ] No separate Requirements destination; Specs is reachable only inside a project.
- [ ] Two statuses and one check; no priority or rejected state.
- [ ] Gaps are shown with icon plus text.
- [ ] The lens lines appear on requirements, and the same block is reusable on tasks and files.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
