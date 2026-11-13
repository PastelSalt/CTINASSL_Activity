# PLAN-A-04C — `/projects/:projectId` Project Workspace

## Scope

Detailed plan for the individual project workspace and its nested production records.

## Project identity header

- [ ] Show project name, description, category, status, priority, dates, owner, collaborators, and cover/icon.
- [ ] Keep project identity compact and distinct from the global application header.
- [ ] Provide contextual edit/archive actions as future presentation-only controls.

## Local navigation

- [ ] Overview
- [ ] Workflow phases
- [ ] Milestones
- [ ] Tasks
- [ ] Requirements
- [ ] Assets
- [ ] Documentation
- [ ] Revisions
- [ ] Deliverables

## Nested content

- [ ] Overview: objective, health summary, next milestone, recent activity.
- [ ] Workflow phases: configurable phase sequence and current phase.
- [ ] Milestones: project-scoped milestones and deadlines.
- [ ] Tasks: project-scoped work with status and priority.
- [ ] Requirements: project acceptance criteria and verification.
- [ ] Assets: project files and references.
- [ ] Documentation: briefs, specifications, notes, and decisions.
- [ ] Revisions: attributable project history.
- [ ] Deliverables: outputs connected to requirements and work.

## Traceability

- [ ] Visualize objective → requirement → milestone → task → revision → deliverable.
- [ ] Use explicit IDs/ObjectIds in the future data model.
- [ ] Preserve project context while navigating related records.

## Motion, states, and data

- [ ] Stage project identity before related-record panels.
- [ ] Use restrained local-section transitions.
- [ ] Provide loading, empty, error, unauthorized, and missing-project states.
- [ ] Future sources: `projects`, `milestones`, `tasks`, `requirements`, `assets`, `documents`, `revisions`, `activities`.
- [ ] Enforce project access checks in the backend in a production pass.

## Acceptance checklist

- [ ] Project workspace makes the full production thread understandable.
- [ ] Every nested section has a clear destination and empty state.
- [ ] No project data is implied to persist during static exploration.

