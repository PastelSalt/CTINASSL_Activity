# PLAN-A-04D — `/milestones` Milestone Management

## Scope

Plan for project phases, checkpoints, deadlines, deliverables, and dependencies.

## Local navigation

- [ ] All milestones
- [ ] Timeline
- [ ] Upcoming
- [ ] Overdue
- [ ] Completed

## Milestone record

- [ ] Show title, project, description, start date, due date, status, priority, tasks, dependencies, and deliverables.
- [ ] Provide create, edit, complete, archive, and dependency affordances as future controls.
- [ ] Support list and chronological/timeline visual directions.

## Status and relationships

- [ ] Distinguish upcoming, completed, overdue, blocked, and archived states with text and icon support.
- [ ] Link milestones to tasks, requirements, and deliverables.
- [ ] Surface dependencies without creating an unreadable graph.

## Motion and states

- [ ] Reveal milestone summary before list/timeline rows.
- [ ] Use restrained stagger for rows.
- [ ] Provide loading, empty, error, and unauthorized states.
- [ ] Respect reduced motion and keyboard navigation.

## Data boundary

- [ ] Future source: `milestones`.
- [ ] Store explicit project references and optional dependency references.
- [ ] Use pagination for large milestone collections.

## Acceptance checklist

- [ ] Users can understand what is next, late, complete, or blocked.
- [ ] Timeline and list directions remain compatible with responsive layouts.

