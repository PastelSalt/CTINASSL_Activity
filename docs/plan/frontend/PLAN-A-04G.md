# PLAN-A-04G — `/assets` Asset Library

## Scope

Plan for organizing project files, media, references, exports, and metadata.

## Local navigation

- [x] All assets
- [x] Images and illustrations
- [x] Documents and PDFs
- [x] Audio and video
- [x] Datasets and spreadsheets
- [x] References and exports

## Asset record

- [x] Show name, type, size, project, description, tags, category, preview availability, access state, and updated time.
- [x] Support images, documents/PDFs, audio/video, datasets, design references, exports, and repository references.
- [x] Reserve upload, organize, preview, download, and access controls.

## Storage boundary

- [x] Keep metadata and storage references in the application database.
- [x] Keep binary files in dedicated object storage.
- [x] Do not imply that local browser state stores uploaded files.

## States and motion

- [x] Provide empty library, unsupported preview, upload-progress, access-denied, loading, and error states.
- [x] Reveal asset groups/rows while keeping metadata stable.
- [x] Respect reduced motion and keyboard access.

## Acceptance checklist

- [x] Users can identify asset type, project association, and access state quickly.
- [x] Unsupported previews have a clear fallback.

