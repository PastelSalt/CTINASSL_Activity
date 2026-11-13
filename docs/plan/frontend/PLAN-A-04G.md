# PLAN-A-04G — `/assets` Asset Library

## Scope

Plan for organizing project files, media, references, exports, and metadata.

## Local navigation

- [ ] All assets
- [ ] Images and illustrations
- [ ] Documents and PDFs
- [ ] Audio and video
- [ ] Datasets and spreadsheets
- [ ] References and exports

## Asset record

- [ ] Show name, type, size, project, description, tags, category, preview availability, access state, and updated time.
- [ ] Support images, documents/PDFs, audio/video, datasets, design references, exports, and repository references.
- [ ] Reserve upload, organize, preview, download, and access controls.

## Storage boundary

- [ ] Keep metadata and storage references in the application database.
- [ ] Keep binary files in dedicated object storage.
- [ ] Do not imply that local browser state stores uploaded files.

## States and motion

- [ ] Provide empty library, unsupported preview, upload-progress, access-denied, loading, and error states.
- [ ] Reveal asset groups/rows while keeping metadata stable.
- [ ] Respect reduced motion and keyboard access.

## Acceptance checklist

- [ ] Users can identify asset type, project association, and access state quickly.
- [ ] Unsupported previews have a clear fallback.

