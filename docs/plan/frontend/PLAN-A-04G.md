# PLAN-A-04G — `/library` Library and project Files (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** the Assets and Documentation pages · **Status:** Implemented (2026-11-14) · **Evidence:** RESEARCH.md D2, D3; the "makers juggle two or three tools" pattern (section 10.1)

## 1. Purpose

One place for "stuff": documents, images, audio and video, data, and links. The same component shows a project's **Files** tab and the cross-project **Library**.

## 2. What changes from Revision 2

- **Assets and documents merge into a single *File* concept** with a kind (document, image, media, data, link). Documents open in the reader (04I).
- Two destinations (Assets, Documentation) become one (`/library`) and one project tab (Files).
- Removed: access states and badges (Preview, Download, Linked, Restricted); everything is private to you. Upload progress stays as a transient state.
- The type chip row becomes a **kind** filter inside the Filter popover; the views Library and List become a **display toggle** (Grid or List).
- **Deliverable** is a flag on a file ("Final file"), shown as a marker and linked from requirements.

## 3. Layout

```text
Library                                                      [+ Add file]
[search…]  [Filter ▾ (0)]  [Sort ▾]  (Grid | List)

┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  doc   │ │ image  │ │ audio  │ │ data   │
│Opening │ │cover-v2│ │theme   │ │schema  │
│brief   │ │.png    │ │.wav    │ │.xlsx   │
│Garden  │ │ Final ★│ │        │ │        │
└────────┘ └────────┘ └────────┘ └────────┘
```

Kinds in the Filter: All, Documents, Images, Audio and video, Data, Links. `/library?view=documents` and the other `view` values preselect a kind.

## 4. Record presentation

| Priority | Fields |
|---|---|
| Primary | Kind tile or thumbnail, name |
| Secondary | Project, size, **Final file** marker |
| Tertiary | Tags, updated time, description (panel) |

Detail panel: preview area (or a designed fallback for unsupported types, external links, and uploading), metadata, tags, the **lens** (*Why it exists* and *What it becomes*), and preview-only actions. Documents show an `Open` button that goes to the reader.

## 5. Preview and fallback states

Previewable, unsupported type (explains and offers download), external link (shows host and says it opens elsewhere), uploading (static progress). There is no restricted state.

## 6. Components

Shared: `PageHeader`, `Toolbar` with `FilterPopover`, `DataTable`, `DetailPanel`, `UnsupportedPreview`, `RelationChip`. New: `FileTile`, `FileThumb`. Retired: `AccessBadge`.

## 7. States

Empty library (drop-zone layout in the Add dialog), no results with active filters, uploading row, loading, error.

## 8. Responsive

Grid 4-up ≥1280, 3-up ≥1024, 2-up below; the panel is a sheet below 1280px.

## 9. Fixture needs

Merge `assets` and `documents` into `files` with `kind`, `isFinal`, optional Markdown `body`, and project links; remove `access`.

## 10. Preview-only actions

`Add file` (drop zone, no file read), `Download`, `Rename`, `Mark as final file`.

## 11. Acceptance checklist

- [x] One Library destination and one project Files tab, sharing components.
- [x] No access or restricted states; no people.
- [x] Documents open in the reader; other kinds show a preview or a designed fallback.
- [x] No control implies the browser stores the file.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536. (Verified at 320, 375, 768, 1024, 1280, and 1440px by an automated DOM audit (2026-11-14); 390 and 1536px not run.)

## Implementation status (Revision 3)

**Implemented 2026-11-14** as `pages/LibraryPage.jsx` and the project Files tab, sharing `FileTile`, `FileThumb`, and `FilePanel`.

**Built:** merged files and documents; Grid/List switch; search over names and tags; Filter (type, project, Final files only); panel with preview or designed fallback (links, uploading, unsupported types), tags, and the lens; a note that only metadata is shown.

**Differences:** the kind is a filter, not a set of view tabs; documents open the reader through `?doc=`.

**Not verified:** 390 and 1536px.
