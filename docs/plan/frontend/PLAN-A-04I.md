# PLAN-A-04I — `/documentation` Project Documentation

## Scope

Plan for project briefs, technical documents, notes, decisions, research, testing, and release records.

## Local navigation

- [ ] All documents
- [ ] Project briefs
- [ ] Technical specifications
- [ ] Research notes
- [ ] Architecture decisions
- [ ] Testing and release notes

## Document record

- [ ] Show title, type, project, author, updated time, status, and revision context.
- [ ] Include project briefs, technical specifications, meeting notes, architecture decisions, research notes, creative drafts, testing documentation, and release notes.
- [ ] Link documents to requirements, tasks, milestones, revisions, and deliverables.

## Editing direction

- [ ] Use a Markdown editor as the initial implementation direction.
- [ ] Keep rich-text editing as a later decision.
- [ ] Provide document directory and preview states before editing is implemented.

## Motion and states

- [ ] Reveal document navigation before previews/editor surfaces.
- [ ] Avoid motion that disrupts reading or typing.
- [ ] Provide loading, empty, error, unauthorized, and unsaved-draft states.
- [ ] Respect reduced motion.

## Data boundary

- [ ] Future source: `documents`.
- [ ] Store explicit project and revision references.
- [ ] Preserve document history through dedicated revision records.

## Acceptance checklist

- [ ] Users can locate knowledge by project and document type.
- [ ] Markdown is clearly presented as the initial editing boundary.

