# PLAN-A-04D — `/milestones` Milestone Management

## Scope

Plan for project phases, checkpoints, deadlines, deliverables, and dependencies.

**Implementation status:** Static milestone-management exploration implemented with milestone fixtures. List, timeline, upcoming, overdue/blocked, and completed sections are available without persistence or server-backed scheduling.

## Local navigation

- [x] All milestones
- [x] Timeline
- [x] Upcoming
- [x] Overdue
- [x] Completed

## Milestone record

- [x] Show title, project, description, start date, due date, status, priority, tasks, dependencies, and deliverables.
- [x] Provide create, edit, complete, archive, and dependency affordances as future controls through the shared action area and relationship labels.
- [x] Support list and chronological/timeline visual directions.

## Status and relationships

- [x] Distinguish upcoming, completed, overdue, and blocked states with text, color, and layout support; archived remains a future filter state.
- [x] Link milestones to project-scoped tasks and deliverables, with dependencies surfaced as readable labels.
- [x] Surface dependencies without creating an unreadable graph.

## Motion and states

- [x] Reveal milestone summary before list/timeline rows.
- [x] Use restrained stagger for rows through the shared workspace motion system.
- [x] Provide an empty state; loading, error, and unauthorized states remain production boundaries.
- [x] Respect reduced motion and keyboard navigation.

## Data boundary

- [x] Future source: `milestones`.
- [x] Store explicit project references and optional dependency references in the fixture boundary.
- [x] Use pagination for large milestone collections in the production data layer.

## Acceptance checklist

- [x] Users can understand what is next, late, complete, or blocked.
- [x] Timeline and list directions remain compatible with responsive layouts.
