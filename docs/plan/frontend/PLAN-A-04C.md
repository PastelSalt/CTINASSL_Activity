# PLAN-A-04C — `/projects/:projectId` Project Workspace

## Scope

Detailed plan for the individual project workspace and its nested production records.

**Implementation status:** Static project workspace exploration implemented for the known demo projects. The nested sections, project identity, traceability chain, related-record tables, missing-project state, and presentation-only actions are available without persistence or authorization.

## Project identity header

- [x] Show project name, description, category, status, priority, owner, collaborators, and cover/icon; dates remain represented by related milestone fixtures.
- [x] Keep project identity compact and distinct from the global application header.
- [x] Provide contextual edit/archive actions as presentation-only controls.

## Local navigation

- [x] Overview
- [x] Workflow phases
- [x] Milestones
- [x] Tasks
- [x] Requirements
- [x] Assets
- [x] Documentation
- [x] Revisions
- [x] Deliverables

## Nested content

- [x] Overview: objective, health summary, next milestone, recent activity.
- [x] Workflow phases: configurable phase sequence and current phase.
- [x] Milestones: project-scoped milestones and deadlines.
- [x] Tasks: project-scoped work with status and priority.
- [x] Requirements: project acceptance criteria and verification.
- [x] Assets: project files and references.
- [x] Documentation: briefs, specifications, notes, and decisions.
- [x] Revisions: attributable project history.
- [x] Deliverables: outputs connected to requirements and work.

## Traceability

- [x] Visualize objective → requirement → milestone → task → revision → deliverable.
- [x] Use explicit fixture IDs/project IDs as the boundary for the future ObjectId data model.
- [x] Preserve project context while navigating related records.

## Motion, states, and data

- [x] Stage project identity before related-record panels.
- [x] Use restrained local-section transitions from the shared workspace motion system.
- [x] Provide a missing-project state; loading, empty, error, and unauthorized states remain production boundaries.
- [x] Future sources: `projects`, `milestones`, `tasks`, `requirements`, `assets`, `documents`, `revisions`, `activities`.
- [x] Enforce project access checks in the backend in a production pass.

## Acceptance checklist

- [x] Project workspace makes the full production thread understandable.
- [x] Every nested section has a clear destination; section-specific empty states remain a production refinement.
- [x] No project data is implied to persist during static exploration.
