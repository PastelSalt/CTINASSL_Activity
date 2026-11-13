# PLAN-A-04I — `/documentation` Project Documentation

## Scope

Plan for project briefs, technical documents, notes, decisions, research, testing, and release records.

## Local navigation

- [x] All documents
- [x] Project briefs
- [x] Technical specifications
- [x] Research notes
- [x] Architecture decisions
- [x] Testing and release notes

## Document record

- [x] Show title, type, project, author, updated time, status, and revision context.
- [x] Include project briefs, technical specifications, meeting notes, architecture decisions, research notes, creative drafts, testing documentation, and release notes.
- [x] Link documents to requirements, tasks, milestones, revisions, and deliverables.

## Editing direction

- [x] Use a Markdown editor as the initial implementation direction.
- [x] Keep rich-text editing as a later decision.
- [x] Provide document directory and preview states before editing is implemented.

## Motion and states

- [x] Reveal document navigation before previews/editor surfaces.
- [x] Avoid motion that disrupts reading or typing.
- [x] Provide loading, empty, error, unauthorized, and unsaved-draft states.
- [x] Respect reduced motion.

## Data boundary

- [x] Future source: `documents`.
- [x] Store explicit project and revision references.
- [x] Preserve document history through dedicated revision records.

## Acceptance checklist

- [x] Users can locate knowledge by project and document type.
- [x] Markdown is clearly presented as the initial editing boundary.

