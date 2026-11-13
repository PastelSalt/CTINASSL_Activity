# PLAN-A-04B — `/projects` Project Directory

## Scope

Detailed plan for browsing, searching, filtering, sorting, organizing, and entering projects.

**Implementation status:** Static project-directory exploration implemented. Search, status/category filtering, card/table views, archived/recent section views, and project-detail links use placeholder data only. Persistence, CRUD, authorization, and server-backed states remain future work.

## Shared shell and local navigation

- [x] Use the authenticated shell and compact header.
- [ ] Local sections:
  - [x] Directory
  - [x] Search and filters
  - [x] Status groups
  - [x] Recently accessed
  - [x] Archived projects

## Directory content

- [x] Show project name, description, category, status, priority, dates, owner, tags, and icon/cover.
- [x] Support card and compact table visual directions.
- [x] Link project records to `/projects/:projectId`.
- [x] Provide create-project entry point.

## Search and filters

- [x] Search by project name, description, tag, or owner.
- [x] Filter by category and status; priority, date range, and archive state remain reserved for the production filter panel.
- [x] Provide clear reset behavior and visible matching-result state.

## Status groups

- [x] Represent Idea, Planning, Active, On Hold, Completed, and Archived in the filter vocabulary and fixtures.
- [x] Avoid assuming a universal workflow sequence.
- [x] Show configurable workflow metadata where available through status, priority, owner, tags, and next-thread fields.

## Recently accessed and archived

- [x] Show recently opened projects with last-accessed time in the fixture boundary and recently accessed section.
- [x] Keep archived projects visually separated from active work.
- [x] Reserve restore/archive actions for future persistence.

## Motion and states

- [x] Reveal local navigation before the directory.
- [x] Stagger project rows/cards without animating every filter update.
- [x] Provide a no-results state; loading, error, and unauthorized states remain production boundaries.
- [x] Respect reduced motion and keyboard focus.

## Data boundary

- [x] Future source: `projects`.
- [x] Include ownership, workflow configuration, metadata, `createdAt`, and `updatedAt` concepts in the fixture boundary.
- [x] Future CRUD and query logic belongs in a project module.

## Acceptance checklist

- [x] Search, filter, create, archive, and project-entry affordances are visually represented; sorting remains a future control.
- [x] Project cards and table rows preserve enough metadata for scanning.
- [x] Project detail links are ready without requiring real persistence.
