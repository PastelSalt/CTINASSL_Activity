# PLAN-A-04J — `/reports` Reports and Analytics

## Scope

Plan for reliable project health, production progress, and traceability reports.

## Local navigation

- [x] Overview
- [x] Project completion
- [x] Task distribution
- [x] Milestone progress
- [x] Requirement coverage
- [x] Activity history

## Report definitions

- [x] Project completion: completed tasks divided by total tasks, with scope documented.
- [x] Task distribution: counts by status and priority.
- [x] Milestone progress: completed milestones divided by total milestones.
- [x] Requirement coverage: verified requirements divided by total requirements.
- [x] Activity history: bounded chronological activity query.
- [x] Overdue work: open records past their due date.

## Controls and presentation

- [x] Provide project and date-range scope controls.
- [x] Show source records and formula definitions beside metrics.
- [x] Reserve export/share behavior for future implementation.
- [x] Avoid charts or percentages that cannot be calculated reliably.

## Motion and states

- [x] Reveal scope controls before report panels.
- [x] Use subtle chart/panel entry without animating data values misleadingly.
- [x] Provide loading, empty, error, unauthorized, and insufficient-data states.
- [x] Respect reduced motion.

## Data boundary

- [x] Aggregate `projects`, `milestones`, `tasks`, `requirements`, and `activities`.
- [x] Keep report queries bounded and paginated where needed.
- [x] Reuse dashboard calculation definitions.

## Acceptance checklist

- [x] Every report displays its source and calculation definition.
- [x] Reports do not imply precision beyond available records.

