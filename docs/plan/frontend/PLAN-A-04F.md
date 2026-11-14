# PLAN-A-04F — `/requirements` Requirements (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: All requirements, Functional, Non-functional, Acceptance criteria, Verification status, Traceability.
- *Functional* and *Non-functional* are type filters. *Acceptance criteria* has **no dedicated UI** and shows the full list; *Verification status* only hides verified items (audit F6).
- Each requirement is a tall card: ID, type, status pill, verification line, description, acceptance criteria run together with `·`, and meta text.
- Traceability is a six-column grid of plain text with `Gap`/`No gap`; it does not show the chain or navigate. The `hasObjective` field is always `true`.
- Status and verification are two overlapping vocabularies (Specified/In Progress/Verified/Unverified/Blocked/Rejected) shown together.

## 2. UI goals

1. Answer three questions for any requirement: *what is it, how is it implemented, is it satisfied?*
2. Separate **lifecycle status** (Specified → In progress → Done) from **verification** (Unverified / Verified / Failed) so they stop overlapping.
3. Make traceability a visual matrix with gaps called out, not text columns.
4. Show acceptance criteria as a checklist, not a run-on sentence.

## 3. Layout

```text
Header: Requirements                                  [Add requirement]
Tabs:   Register | Traceability | Coverage
Toolbar: [search]  Type: All Functional Non-functional   Verification: All Verified Unverified Failed   Project ▾
Summary strip: Total 8 · Verified 3 · Unverified 4 · With gaps 2

Register row:
 REQ-012  Users can reorder chapters   (Functional) (In progress)  ◎ Unverified   P High ↑
          Acceptance 2/3 · Milestone: Chapter one · Tasks: [T-04][T-07]  ▸ opens detail panel
Traceability matrix (rows = requirements, columns = Objective → Milestone → Task → Revision → Deliverable)
   ✓ linked (count)   ⚠ gap (dashed cell "No linked task")
Coverage: stacked bar of verification states per project + table of gaps
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| Register | Rows (`RecordRow`) with ID, title, type, lifecycle `StatusBadge`, verification badge, priority, links summary | Acceptance criteria appear as a checklist in the detail panel and as `2/3` progress in the row |
| Traceability | Matrix: one row per requirement, one column per chain stage; each cell shows linked-record chips or a **Gap** cell with a dashed border and warning icon | Column headers match `TraceChain`; horizontally scrollable with sticky ID column |
| Coverage | Stacked bar (Verified / Unverified / Failed) per project + list of requirements without implementing work or deliverable | Derived from selectors shared with Reports (04J) |

Type, verification, project, and priority are filter chips. The old *Acceptance criteria* and *Verification status* sections are replaced by the detail panel checklist and the verification filter.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | ID (monospace), title, lifecycle `StatusBadge`, verification badge (icon + text) |
| Secondary | Type chip, `PriorityBadge`, acceptance progress, project/milestone chips |
| Tertiary | Linked task/asset/revision chips, description, history placeholder (detail panel) |

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatStrip`, `StatusBadge`, `PriorityBadge`, `RelationChip`, `RecordRow`, `TraceChain`, `ProgressBar`, `MiniChart`, `DetailPanel`, state components. Page-specific: `TraceabilityMatrix`, `CriteriaChecklist`, `VerificationBadge`.

## 7. States

- [ ] Empty register: "No requirements yet" with an `Add requirement` preview action.
- [ ] No results with active filter chips.
- [ ] Traceability with no gaps: positive "Every requirement is traced" message.
- [ ] Requirement with no acceptance criteria: warning row "No acceptance criteria defined".
- [ ] Loading skeleton matrix; error; unauthorized.

## 8. Responsive

≥1280: register + docked panel; matrix shows all stages. 768–1279: matrix scrolls horizontally with sticky ID column. <768: matrix becomes per-requirement cards with the chain as a vertical list (stage → chips or Gap); filters in a sheet.

## 9. Fixture needs

Split `status` into `lifecycle` and `verification`; give each requirement `acceptanceCriteria[] {text, met}`, `milestoneId`, `taskIds`, `revisionIds`, `deliverableIds`, `objectiveId`. Include at least one fully traced, one gap-in-task, one gap-in-deliverable, one failed verification, and one blocked requirement.

## 10. Preview-only actions

`Add requirement`, `Mark verified` (dialog layout only), `Link work` (selector layout).

## 11. Acceptance checklist

- [ ] Lifecycle and verification are separate badges with distinct icons and labels.
- [ ] Acceptance criteria appear as a checklist with progress; no dedicated empty section.
- [ ] Traceability matrix shows gaps by icon + text + dashed cell, not color alone.
- [ ] Cells and chips open the related record preview.
- [ ] Coverage numbers come from the same selectors as Reports.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Requirement fixtures, type and verification vocabulary, gap detection concept, search, empty state.

## Implementation status — 2026-11-14

Done: Register, Traceability, and Coverage views; lifecycle and verification as separate badges; acceptance criteria as a checklist with progress in the row and panel; traceability matrix with dashed gap cells (milestone, task, deliverable) using icon and text; coverage stacked bars per project plus a gaps list; detail panel with trace chips and preview-only actions. Not done: requirement history; a card form of the matrix on mobile (it scrolls horizontally inside its own container).
