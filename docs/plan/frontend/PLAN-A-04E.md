# PLAN-A-04E — `/tasks` Task Management

## Scope

Plan for actionable work, priorities, statuses, subtasks, assignments, and relationships.

## Local navigation

- [ ] All tasks
- [ ] List view
- [ ] Kanban view
- [ ] Due soon
- [ ] Blocked
- [ ] Completed

## Task record

- [ ] Show title, description, instructions, project, milestone, priority, status, due date, subtasks, creator, and assignee placeholder.
- [ ] Represent Backlog, To Do, In Progress, In Review, Blocked, and Completed.
- [ ] Reserve comments and activity records.
- [ ] Link tasks to requirements, assets, and revisions.

## Views and controls

- [ ] Provide list and Kanban directions.
- [ ] Show urgent, overdue, blocked, and completed work clearly.
- [ ] Provide create/edit and status-change affordances as presentation-only controls.
- [ ] Use pagination or bounded loading for large collections.

## Motion and states

- [ ] Reveal controls before task content.
- [ ] Do not animate every status update.
- [ ] Provide loading, empty, no-results, error, and unauthorized states.
- [ ] Respect reduced motion.

## Data boundary

- [ ] Future source: `tasks`.
- [ ] Explicit references: project, milestone, requirements, creator, assignee, assets, revisions.
- [ ] Validate permissions in the backend.

## Acceptance checklist

- [ ] Priority, status, due date, and relationship context are scannable.
- [ ] List/Kanban directions remain usable on small screens.

