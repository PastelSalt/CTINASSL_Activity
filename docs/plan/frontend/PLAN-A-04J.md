# PLAN-A-04J — `/reports` Reports and Analytics

## Scope

Plan for reliable project health, production progress, and traceability reports.

## Local navigation

- [ ] Overview
- [ ] Project completion
- [ ] Task distribution
- [ ] Milestone progress
- [ ] Requirement coverage
- [ ] Activity history

## Report definitions

- [ ] Project completion: completed tasks divided by total tasks, with scope documented.
- [ ] Task distribution: counts by status and priority.
- [ ] Milestone progress: completed milestones divided by total milestones.
- [ ] Requirement coverage: verified requirements divided by total requirements.
- [ ] Activity history: bounded chronological activity query.
- [ ] Overdue work: open records past their due date.

## Controls and presentation

- [ ] Provide project and date-range scope controls.
- [ ] Show source records and formula definitions beside metrics.
- [ ] Reserve export/share behavior for future implementation.
- [ ] Avoid charts or percentages that cannot be calculated reliably.

## Motion and states

- [ ] Reveal scope controls before report panels.
- [ ] Use subtle chart/panel entry without animating data values misleadingly.
- [ ] Provide loading, empty, error, unauthorized, and insufficient-data states.
- [ ] Respect reduced motion.

## Data boundary

- [ ] Aggregate `projects`, `milestones`, `tasks`, `requirements`, and `activities`.
- [ ] Keep report queries bounded and paginated where needed.
- [ ] Reuse dashboard calculation definitions.

## Acceptance checklist

- [ ] Every report displays its source and calculation definition.
- [ ] Reports do not imply precision beyond available records.

