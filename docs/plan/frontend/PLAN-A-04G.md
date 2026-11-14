# PLAN-A-04G — `/assets` Asset Library (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, fixture data, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: All assets plus five type sections (Images, Documents, Audio/video, Datasets, References/exports); the type sections are filters.
- Assets render as horizontal text cards with a 20px icon in a small square — no thumbnail, no visual identity per file type. A tiny `SlidersHorizontal` icon button acts as the card action and its meaning is unclear.
- "Preview", "Download", and "Linked" are shown as plain text in the meta row; preview availability and access state are not visually separated from file facts.
- Summary cards (Previewable, Linked, Downloads) count access states rather than helping the user browse.

## 2. UI goals

1. A visual library: thumbnails and type tiles first, metadata second.
2. Separate **file facts** (type, size, updated) from **access state** (preview, download, linked, restricted).
3. Make unsupported previews and access-denied states explicit and designed.
4. Keep storage truthful: the UI shows metadata only and never implies the browser holds the files.

## 3. Layout

```text
Header: Assets                                         [Add asset]
Tabs:   Library | List
Toolbar: [search]  Type: All Images Documents Audio/Video Datasets References   Project ▾   Tags ▾   Sort ▾
Summary strip: 14 assets · 38.2 MB · 3 linked · 1 restricted

Library grid (4-up ≥1280, 3-up ≥1024, 2-up ≥480)
┌─────────────┐
│  thumbnail  │   image: tinted tile with image glyph; PDF: page-shaped tile; audio: waveform glyph
│ or type tile│
├─────────────┤
│ cover-v2.png │ Project Garden
│ PNG · 2.4 MB │ [Preview ▸]  updated 2d ago
└─────────────┘
```

## 4. Views

| View | Layout | Notes |
|---|---|---|
| Library | Thumbnail grid with type tile, name, project chip, size, access badge | Selecting an asset opens the detail panel |
| List | `DataTable`: Name · Type · Project · Size · Access · Updated · Tags | Sortable columns (local sort); sticky header |

Type subsets are filter chips with counts. `Tags` popover filters by tag.

## 5. Record presentation

| Priority | Fields |
|---|---|
| Primary | Thumbnail/type tile, name, type badge |
| Secondary | Project chip, size, access badge (Preview · Download · Linked · Restricted) |
| Tertiary | Tags (max 2 + "+n"), description, updated time, related records (detail panel) |

The detail panel shows a large preview area (see below), full metadata, tags, related tasks/requirements/revisions as chips, and preview-only actions.

## 6. Preview and access states

| State | Presentation |
|---|---|
| Previewable | Large rendered preview area from a fixture image/glyph |
| Unsupported preview | Type tile + "No preview for .xlsx files" + allowed alternative (download layout) |
| Linked (external) | Link tile showing the host and a "Opens an external site" note |
| Restricted | Lock tile, "You do not have access" with a `Request access` preview action |
| Upload in progress | Row with progress bar and file name (fixture, static progress) |

## 7. Components

Shared: `PageHeader`, `ViewTabs`, `Toolbar`, `FilterChip`, `StatStrip`, `RelationChip`, `DataTable`, `DetailPanel`, `UnsupportedPreview`, `EmptyState`, `NoResults`, `Skeleton`, `PreviewActionButton`. Page-specific: `AssetTile`, `AssetThumb`, `AccessBadge`, `UploadRow`.

## 8. States

- [ ] Empty library with an `Add asset` preview dialog showing a drop-zone layout.
- [ ] No results with active filter chips.
- [ ] Upload-in-progress row (static), access-denied tile, unsupported preview panel.
- [ ] Loading skeleton tiles; error; unauthorized.

## 9. Responsive

≥1280: 4-up grid + docked detail panel. 768–1279: 3-up grid. <768: 2-up grid with compact tiles; List becomes a two-line row list; detail opens as a bottom sheet.

## 10. Fixture needs

Add `mime`, `bytes` (display size is formatted), `thumbnail` (fixture image or glyph key), `accessState`, `tagIds`, `relatedIds`, `updatedAt` ISO. Cover each type plus one restricted, one external link, and one in-progress upload.

## 11. Preview-only actions

`Add asset`, `Download`, `Rename`, `Change access`, `Request access` (all dialog layouts only; no file is read or written).

## 12. Acceptance checklist

- [ ] Every asset has a distinct visual tile by type.
- [ ] File facts and access state are separated and use icon + text.
- [ ] Unsupported-preview, restricted, external-link, and in-progress states all exist.
- [ ] No control or copy implies the browser stores the file.
- [ ] Grid and List share filters and detail panel.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 13. Carried over from Revision 1

Asset fixtures, type categories, tag filtering, access vocabulary, search, empty state.

## Implementation status — 2026-11-14

Done: Library (tile grid) and List (table) views; type chips with counts; sort; tiles with per-type visuals, size, and access badge; detail panel with a preview area or a designed fallback for unsupported, restricted, external-link, and uploading states; storage-boundary note; preview-only Download and Change access. Not done: tag filter, real thumbnails (type glyph tiles are used).
