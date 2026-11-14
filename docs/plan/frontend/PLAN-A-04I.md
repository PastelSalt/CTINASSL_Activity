# PLAN-A-04I — Documents: the reader and Markdown (inside Library and Files) (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** the Documentation page · **Status:** Planning · **Evidence:** RESEARCH.md D2, section 10 (Obsidian and Notion lessons)

## 1. Purpose

Read (and later write) project knowledge: briefs, specifications, research notes, and decisions, as Markdown, next to the other files of a project.

## 2. What changes from Revision 2

- No separate destination: documents are **files of kind "document"** in Library and project Files (04G). The library table and the type chip row are gone; the Files grid and Filter popover cover them.
- The **Reader** remains, opened from a file (`/library?doc=<id>` or the project Files tab).
- Removed: author and avatar, the four-status vocabulary. Documents are **Draft or Final**.
- The document-type labels (brief, specification, research notes, decision, release notes) become optional **tags**, not a navigation facet.

## 3. Layout (Reader)

```text
Library / Opening brief                                    [Edit ▾]
Draft · v4 · updated 2 days ago · Project Garden
(Preview | Source)

Outline            Opening brief
 Overview           Overview … (rendered Markdown, 72ch)
 Goals              …
 Open questions    Lens: Why it exists [REQ-001]   What it becomes [Chapter one script]
```

Below 1024px the outline becomes a dropdown above the document.

## 4. Behaviour

- Rendered Markdown through the shared renderer (headings, lists, quotes, code, links, no raw HTML).
- A read-only **Source** toggle shows the Markdown text.
- **Markdown is the initial editing format.** The Edit button opens a preview-only dialog that shows the editor layout ("editing arrives later"); nothing typed is kept.
- The **lens** shows which requirement the document supports and which files or changes follow from it.

## 5. Components

Shared: `PageHeader` (breadcrumb mode), `RelationChip`, `StatusBadge`, `MarkdownView`. Existing from Revision 2: outline navigation and the Source toggle.

## 6. States

No document selected, empty library, document with no links (lens explains how to link), loading, error.

## 7. Responsive

Body 16px, line length at most 72ch; Source scrolls inside its own container; the outline is sticky at ≥1024px.

## 8. Fixture needs

Documents carry `body` (Markdown), `status: draft|final`, version, and links; the same `files` collection as 04G.

## 9. Preview-only actions

Edit, Mark Final, Duplicate, Export.

## 10. Acceptance checklist

- [ ] Documents are reachable only through Library and project Files.
- [ ] Reader has outline, rendered Markdown, a Source toggle, and the lens.
- [ ] No author or avatar; two statuses only.
- [ ] Markdown is stated as the initial editing format; no control implies saving.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
