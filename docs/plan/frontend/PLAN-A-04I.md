# PLAN-A-04I — `/documentation` Documentation (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: All documents plus five type sections (Project briefs, Technical specifications, Research notes, Architecture decisions, Testing and release notes); the type sections are filters.
- Documents are cards showing title, status, project, type, a combined "Markdown source · author · updated" sentence, and linked-record text. There is **no document preview or reader**, although the plan lists "document preview" and Markdown as the editing direction.
- Summary cards count drafts/completed/Markdown; none help locate a document.
- Status tones map only four statuses (Draft/In Progress/Completed/Review) and overlap with other modules' vocabularies.

## 2. UI goals

1. Help users **find knowledge by project and type** quickly (library).
2. Provide a **reader** that shows what a Markdown document will look like, with an outline and metadata — without implying editing or saving.
3. Show document status and revision context as clear badges, and link to related records as chips.
4. Make Markdown the explicit initial format: a read-only source/preview toggle.

## 3. Layout

```text
Header: Documentation                                   [New document]
Tabs:   Library | Reader
Toolbar: [search]  Type: All Briefs Specs Research Decisions Release notes   Project ▾   Status ▾   Sort ▾

Library: table/list    Title · Type · Project · Status · Author · Updated
Reader (two panes ≥1024px):
┌ Outline ───────┬ Document ─────────────────────────────────────────────┐
│ Overview       │ Opening brief            (Draft) · Project Garden      │
│ Goals          │ v4 · updated 2d ago · Mika            [Preview|Source] │
│ Scope          │ rendered Markdown …                                    │
│ Decisions      │ Related: [REQ-004] [T-07] [Chapter one] [Revision v4]  │
└────────────────┴────────────────────────────────────────────────────────┘
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| Library | `DataTable` on desktop (title, type icon, project, status, author, updated); cards on mobile | Selecting a row opens it in the Reader; `Recently updated` groups at the top |
| Reader | Outline (from headings) + rendered Markdown + metadata/relations column; `Preview`/`Source` toggle shows raw Markdown read-only | Fixture Markdown only; rendering uses a small local renderer for headings, lists, code, tables, and links |

Type subsets are filter chips. A `New document` preview dialog shows the title/type/project form and an empty Markdown editor layout labelled "Editor arrives with the editing feature" — no typing persists.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Type icon, title, `StatusBadge` |
| Secondary | Project chip, author avatar, updated time |
| Tertiary | Revision context (`v4 · 2 pending`), linked requirement/task/milestone/deliverable chips, word count |

## 6. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatusBadge`, `Avatar`, `RelationChip`, `DataTable`, `DetailPanel`, state components, `PreviewActionButton`. Page-specific: `DocumentReader`, `MarkdownView`, `OutlineNav`, `SourceToggle`.

## 7. States

- [ ] Empty knowledge base: "No documents yet" + `New document` preview action.
- [ ] No results with active filter chips.
- [ ] Reader with no selection: prompt to choose from the library.
- [ ] Unsaved-draft banner layout (preview): shows what an unsaved change indicator looks like; it is never triggered by typing.
- [ ] Loading skeleton reader; error; unauthorized.

## 8. Responsive

≥1280: library or reader with docked relation panel. 1024–1279: outline collapses to a dropdown above the document. <1024: Reader is single column with a sticky outline selector; Library rows become cards; Source view scrolls inside its own container.

## 9. Fixture needs

Add `body` (Markdown) for at least four documents covering brief, spec, decision record, and release notes; `format`, `version`, `wordCount`, `authorId`, `updatedAt` ISO, `status` from a single vocabulary (Draft · In review · Completed), and explicit relation ID arrays. Include one document with no related records.

## 10. Preview-only actions

`New document`, `Edit` (opens the preview dialog), `Export`, `Duplicate`.

## 11. Acceptance checklist

- [ ] The Reader exists with outline, rendered Markdown, and a read-only Source toggle.
- [ ] Library supports type, project, and status filters and local sort.
- [ ] Markdown is explicitly labelled as the initial editing format; no control implies saving.
- [ ] Related records are chips; revision context is visible.
- [ ] Reader is readable (body 16px, line length ≤ 75ch) at all widths.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Document fixtures, type categories, status and relation data, search, empty state.

## Implementation status — 2026-11-14

Done: Library (table with type chips, status filter, sort) and Reader (outline, Markdown rendered through lib/markdown.jsx, read-only Source toggle, version and pending-review context, relationship chips); preview-only New document. Not done: unsaved-draft banner layout.
