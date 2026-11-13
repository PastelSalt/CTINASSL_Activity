# PLAN-A-04B — `/projects` Project Directory

## Scope

Detailed plan for browsing, searching, filtering, sorting, organizing, and entering projects.

## Shared shell and local navigation

- [ ] Use the authenticated shell and compact header.
- [ ] Local sections:
  - [ ] Directory
  - [ ] Search and filters
  - [ ] Status groups
  - [ ] Recently accessed
  - [ ] Archived projects

## Directory content

- [ ] Show project name, description, category, status, priority, dates, owner, tags, and icon/cover.
- [ ] Support card and compact table visual directions.
- [ ] Link project records to `/projects/:projectId`.
- [ ] Provide create-project entry point.

## Search and filters

- [ ] Search by project name, description, tag, or owner.
- [ ] Filter by category, status, priority, date range, and archive state.
- [ ] Provide clear reset behavior and visible active-filter state.

## Status groups

- [ ] Represent Idea, Planning, Active, On Hold, Completed, and Archived.
- [ ] Avoid assuming a universal workflow sequence.
- [ ] Show configurable workflow metadata where available.

## Recently accessed and archived

- [ ] Show recently opened projects with last-accessed time.
- [ ] Keep archived projects visually separated from active work.
- [ ] Reserve restore/archive actions for future persistence.

## Motion and states

- [ ] Reveal local navigation before the directory.
- [ ] Stagger project rows/cards without animating every filter update.
- [ ] Provide loading, empty, no-results, error, and unauthorized states.
- [ ] Respect reduced motion and keyboard focus.

## Data boundary

- [ ] Future source: `projects`.
- [ ] Include ownership, workflow configuration, metadata, `createdAt`, and `updatedAt`.
- [ ] Future CRUD and query logic belongs in a project module.

## Acceptance checklist

- [ ] Search, sort, filter, create, archive, and project-entry affordances are visually represented.
- [ ] Project rows preserve enough metadata for scanning.
- [ ] Project detail links are ready without requiring real persistence.

