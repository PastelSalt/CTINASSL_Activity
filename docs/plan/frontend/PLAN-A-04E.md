# PLAN-A-04E — `/tasks` Task Management

## Scope

Plan for actionable work, priorities, statuses, subtasks, assignments, and relationships.

## Local navigation

- [x] All tasks
- [x] List view
- [x] Kanban view
- [x] Due soon
- [x] Blocked
- [x] Completed

## Task record

- [x] Show title, description, instructions, project, milestone, priority, status, due date, subtasks, creator, and assignee placeholder.
- [x] Represent Backlog, To Do, In Progress, In Review, Blocked, and Completed.
- [x] Reserve comments and activity records.
- [x] Link tasks to requirements, assets, and revisions.

## Views and controls

- [x] Provide list and Kanban directions.
- [x] Show urgent, overdue, blocked, and completed work clearly.
- [x] Provide create/edit and status-change affordances as presentation-only controls.
- [x] Use pagination or bounded loading for large collections.

## Motion and states

- [x] Reveal controls before task content.
- [x] Do not animate every status update.
- [x] Provide loading, empty, no-results, error, and unauthorized states.
- [x] Respect reduced motion.

## Data boundary

- [x] Future source: `tasks`.
- [x] Explicit references: project, milestone, requirements, creator, assignee, assets, revisions.
- [x] Validate permissions in the backend.

## Acceptance checklist

- [x] Priority, status, due date, and relationship context are scannable.
- [x] List/Kanban directions remain usable on small screens.

