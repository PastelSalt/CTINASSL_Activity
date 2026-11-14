# Tsumugi Continuation Context

> Portable handoff for continuing work on another device or with another agent.
>
> **Last updated:** 2026-11-13 08:52 (+08:00)

## How to resume

All frontend plans PLAN-A-01 through PLAN-A-04K are complete. Read this file first, then inspect the current worktree state below if you need to continue beyond `/settings`. No protected user-page plans remain pending.

Important execution rules:

- The project is currently doing frontend visual exploration only.
- Protected pages use placeholder/demo data.
- Do not add backend authentication, persistence, database/API behavior, or production authorization unless explicitly requested.
- Preserve the existing Tsumugi visual language: Fredoka, warm paper canvas, strong dark outlines, pastel accents, no UI gradients, Lucide icons, compact headers, floating navigation, and restrained GSAP motion.
- Update the relevant plan file and `LOG.md` whenever a plan is executed.
- Run client lint, build, and `git diff --check` after implementation.
- Use browser smoke checks for the route and important interactions when possible.
- Do not revert unrelated dirty worktree changes.

## Product and repository

- Product: **Tsumugi**, a creative/technical production-management platform.
- Repository: `PastelSalt/CTINASSL_Activity`
- Local root: `C:\Users\Admin\Documents\MoekoWorks\CTINASSL_Activity`
- Client root: `C:\Users\Admin\Documents\MoekoWorks\CTINASSL_Activity\client`
- Stack: Vite, React 19, JavaScript/JSX, GSAP, Lucide, Fredoka.
- Routing is currently manual pathname dispatch in [`client/src/App.jsx`](client/src/App.jsx), not React Router.
- Client commands must run from `client\`:
  - `npm run dev`
  - `npm run lint`
  - `npm run build`
  - `npm run preview`

## Conversation history and decisions

### Repository documentation

The project owner originally requested:

1. `INSTRUCTIONS.md`
2. `LOG.md`
3. `README.md`
4. `CODEMAP.md`

Rules established:

- `LOG.md` records actions made in the codebase.
- `CODEMAP.md` acts as a maintained developer/agent index.
- `README.md` documents the product, routes, architecture, and current status.

### Project specification analysis

[`PROJECT-SPECS.md`](PROJECT-SPECS.md) is the primary requirements source. It defines:

- Tsumugi’s production-management purpose.
- Public landing page, auth pages, legal pages, and protected workspace.
- Protected routes:
  - `/dashboard` — Overview
  - `/projects` — Project directory
  - `/projects/:projectId` — Project workspace
  - `/milestones` — Milestones
  - `/tasks` — Tasks
  - `/requirements` — Requirements
  - `/assets` — Asset library
  - `/revisions` — Revision history
  - `/documentation` — Documentation
  - `/reports` — Reports
  - `/settings` — Settings
- Common authenticated shell, page-local navigation, project relationships, traceability, reports, and future backend boundaries.

### Planning document organization

All frontend plans are under [`docs/plan/frontend/`](docs/plan/frontend/).

- [`PLAN-A-01.md`](docs/plan/frontend/PLAN-A-01.md) — landing page
- [`PLAN-A-02.md`](docs/plan/frontend/PLAN-A-02.md) — legal pages
- [`PLAN-A-03.md`](docs/plan/frontend/PLAN-A-03.md) — login and registration pages
- [`PLAN-A-04.md`](docs/plan/frontend/PLAN-A-04.md) — authenticated workspace and protected user-page architecture
- [`PLAN-A-04A.md`](docs/plan/frontend/PLAN-A-04A.md) — `/dashboard` Overview
- [`PLAN-A-04B.md`](docs/plan/frontend/PLAN-A-04B.md) — `/projects` directory
- [`PLAN-A-04C.md`](docs/plan/frontend/PLAN-A-04C.md) — `/projects/:projectId` project workspace
- [`PLAN-A-04D.md`](docs/plan/frontend/PLAN-A-04D.md) — `/milestones`
- [`PLAN-A-04E.md`](docs/plan/frontend/PLAN-A-04E.md) — `/tasks`
- [`PLAN-A-04F.md`](docs/plan/frontend/PLAN-A-04F.md) — `/requirements`
- [`PLAN-A-04G.md`](docs/plan/frontend/PLAN-A-04G.md) — `/assets`
- [`PLAN-A-04H.md`](docs/plan/frontend/PLAN-A-04H.md) — `/revisions`
- [`PLAN-A-04I.md`](docs/plan/frontend/PLAN-A-04I.md) — `/documentation`
- [`PLAN-A-04J.md`](docs/plan/frontend/PLAN-A-04J.md) — `/reports`
- [`PLAN-A-04K.md`](docs/plan/frontend/PLAN-A-04K.md) — `/settings`

[`docs/plan/backend/`](docs/plan/backend/) is reserved for future PLAN-B documents and currently contains only `.gitkeep`.

## Important naming decision

The owner requested that the protected experience not be called “dashboard” because most protected pages are not dashboards.

Current terminology:

- **Authenticated workspace** — the shared protected application shell.
- **Overview** — the `/dashboard` page only.
- **Protected user pages** — Projects, project workspace, milestones, tasks, requirements, assets, revisions, documentation, reports, and settings.

The implementation was renamed from `client/src/pages/dashboard/` to [`client/src/pages/workspace/`](client/src/pages/workspace/):

- [`WorkspacePage.jsx`](client/src/pages/workspace/WorkspacePage.jsx)
- [`workspaceData.js`](client/src/pages/workspace/workspaceData.js)
- [`index.js`](client/src/pages/workspace/index.js)

The `/dashboard` URL remains intentionally unchanged for the Overview route. Its navigation label is now **Overview**.

## Existing implementation

### Shared workspace shell

[`WorkspacePage.jsx`](client/src/pages/workspace/WorkspacePage.jsx) currently provides:

- Shared workspace header and demo-session badge.
- Account-menu placeholder.
- Compact page header and contextual actions.
- Floating bottom top-level navigation dock.
- Left page-local section navigation on desktop.
- Horizontal/local navigation behavior on smaller screens.
- Legal footer links.
- GSAP page-entry and section-change motion.
- `prefers-reduced-motion` handling.
- `/dashboard` Overview rendering.
- `/projects` directory rendering.
- `/projects/:projectId` project workspace rendering.
- `/milestones` milestone rendering.
- `/tasks` task-management rendering (list/Kanban views).
- `/requirements` requirement-register rendering (traceability view).
- `/assets` asset-library rendering (category-filtered views).
- `/revisions` revision-history rendering (pending review/approved views).
- `/documentation` document-library rendering (type-filtered views).
- `/reports` report-dashboard rendering (scope-controlled panels).
- `/settings` account-and-preferences rendering (type-filtered views).

### Workspace fixtures

[`workspaceData.js`](client/src/pages/workspace/workspaceData.js) contains:

- `workspaceProjects`
- `workspaceMilestones`
- `workspaceTasks`
- `workspaceTaskRecords`
- `workspaceRequirementRecords`
- `workspaceAssetRecords`
- `workspaceRevisionRecords`
- `workspaceDocumentRecords`
- `workspaceReportDefinitions`
- `workspaceReportOverdue`
- `workspaceActivity`
- `workspaceSections`
- `moduleFixtures`
- `projectWorkspaceSections`
- `projectWorkspaceRecords`
- `milestoneRecords`

All data is explicitly demo/placeholder data. No records are saved.

### Route behavior

[`App.jsx`](client/src/App.jsx) handles:

- Policy routes.
- Auth routes.
- Dynamic `/projects/:projectId` matching.
- Static protected workspace routes through `workspaceRoutes`.

Known demo project IDs:

- `project-garden`
- `tsumugi-api`
- `color-and-memory` (directory fixture; project detail data is not yet defined)
- `archive-study` (archived directory fixture; project detail data is not yet defined)

Unknown project IDs show a missing-project state.

## Completed plan implementations

### PLAN-A-04B — `/projects`

Implemented in the workspace module:

- Project directory cards and compact table view.
- Search by project name, description, tags, and owner.
- Status filter.
- Category filter.
- Reset/no-results behavior.
- Sections:
  - Directory
  - Search and filters
  - Status groups
  - Recently accessed
  - Archived projects
- Project metadata:
  - Description
  - Category
  - Status
  - Priority
  - Owner
  - Tags in fixture data
  - Updated/last accessed timestamps
  - Progress and next thread
- Presentation-only detail links to `/projects/:projectId`.
- Archived project fixture.

Plan status is recorded in [`PLAN-A-04B.md`](docs/plan/frontend/PLAN-A-04B.md).

### PLAN-A-04C — `/projects/:projectId`

Implemented:

- Dynamic project-detail route branch.
- Compact project identity header.
- Project cover initials.
- Category, owner, status, priority, collaborators.
- Presentation-only Edit project and Archive actions.
- Nested sections:
  - Overview
  - Workflow phases
  - Milestones
  - Tasks
  - Requirements
  - Assets
  - Documentation
  - Revisions
  - Deliverables
- Project objective and health summary.
- Current phase and next milestone.
- Recent activity.
- Objective → requirement → milestone → task → deliverable traceability strip.
- Related-record tables.
- Missing-project state.

Plan status is recorded in [`PLAN-A-04C.md`](docs/plan/frontend/PLAN-A-04C.md).

### PLAN-A-04A — `/dashboard` Overview

Implemented:
- Dedicated Overview page with metric cards (Total projects, Active projects, Open tasks, Overdue).
- Project pulse section with project list showing category, status, next thread, progress.
- Milestones section with project links and due dates.
- Tasks section with project links and due dates.
- Recent activity section with actor, action, project, timestamp.
- Quick actions section with presentation-only Create project and Create task controls.
- GSAP page-entry motion and reduced-motion handling.

Plan status is recorded in [`PLAN-A-04A.md`](docs/plan/frontend/PLAN-A-04A.md).

### PLAN-A-04D — `/milestones`

Implemented:

- Dedicated milestone page instead of generic module table.
- Milestone fixtures with:
  - ID
  - Title
  - Project/project ID
  - Description
  - Start date
  - Due date
  - Status
  - Priority
  - Linked task count
  - Dependency label
  - Deliverable label
- Sections:
  - All milestones
  - Timeline
  - Upcoming
  - Overdue
  - Completed
- Overdue section includes both overdue and blocked records.
- Summary counts for visible, needs attention, and completed milestones.
- List cards with project links.
- Chronological timeline with project links.
- Responsive styling.
- Empty-state messaging.

Plan status is recorded in [`PLAN-A-04D.md`](docs/plan/frontend/PLAN-A-04D.md).

### PLAN-A-04E — `/tasks`

Implemented:
- Dedicated task-management page replacing the generic module fixture.
- Task fixtures (`workspaceTaskRecords`) with:
  - ID
  - Title
  - Description
  - Instructions
  - Project/project ID
  - Milestone/milestone ID
  - Priority
  - Status
  - Due date
  - Subtasks count/completed
  - Creator
  - Assignee
  - Requirement/asset/revision references
- Sections:
  - All tasks
  - List view
  - Kanban view
  - Due soon
  - Blocked
  - Completed
- Task cards with status-toned markers and summary counts.
- Task search, empty-state, and presentation-only New task control.
- Kanban columns for all six statuses (Backlog, To Do, In Progress, In Review, Blocked, Completed).
- Responsive styling and project links.

Plan status is recorded in [`PLAN-A-04E.md`](docs/plan/frontend/PLAN-A-04E.md).

### PLAN-A-04F — `/requirements`

Implemented:
- Dedicated requirement-register page replacing the generic module fixture.
- Requirement fixtures (`workspaceRequirementRecords`) with:
  - Identifier
  - Type
  - Description
  - Acceptance criteria
  - Priority
  - Status
  - Verification state
  - Project/milestone
  - Linked tasks
  - Linked deliverable
- Sections:
  - All requirements
  - Functional
  - Non-functional
  - Verification status
  - Traceability
- Requirement cards with status/verification state communicated via text (not color alone).
- Queryable traceability table with gap detection for requirements lacking implementing work.
- Search, summary counts, empty-state, and presentation-only Add requirement control.
- Responsive styling.

Plan status is recorded in [`PLAN-A-04F.md`](docs/plan/frontend/PLAN-A-04F.md).

### PLAN-A-04G — `/assets`

Implemented:
- Dedicated asset library page replacing the generic module fixture.
- Asset fixtures (`workspaceAssetRecords`) with:
  - Name, type, size, project, description, tags, category
  - Preview availability, access state, updated time
  - Asset-type icon
- Sections:
  - All assets
  - Images and illustrations
  - Documents and PDFs
  - Audio and video
  - Datasets and spreadsheets
  - References and exports
- Asset cards with category-specific icon backgrounds, tags, metadata.
- Search, summary counts (previewable/linked/downloads), empty-state, presentation-only Add asset control.
- Storage boundary notes (metadata in app database, binaries in object storage).
- Responsive styling.

Plan status is recorded in [`PLAN-A-04G.md`](docs/plan/frontend/PLAN-A-04G.md).

### PLAN-A-04H — `/revisions`

Implemented:
- Dedicated revision history page replacing the generic module fixture.
- Revision fixtures (`workspaceRevisionRecords`) with:
  - Timestamp, author, change description
  - Affected record, project
  - Previous/current references
  - Approval state (Approved/Pending review/Recorded/Rejected)
  - Linked task/requirement/asset/deliverable
- Sections:
  - All revisions
  - Recent changes
  - Pending review
  - Approved
  - Version comparison
- Revision cards with state-toned markers, previous/current references, linked work references.
- Search, summary counts, empty-state, presentation-only Log revision control.
- Responsive styling, review state via text not color alone.

Plan status is recorded in [`PLAN-A-04H.md`](docs/plan/frontend/PLAN-A-04H.md).

### PLAN-A-04I — `/documentation`

Implemented:
- Dedicated document library page replacing the generic module fixture.
- Document fixtures (`workspaceDocumentRecords`) with:
  - Title, type, project, author, updated time, status, revision context
  - Format (Markdown/PDF)
  - Linked task/requirement/milestone/revision/deliverable
- Sections:
  - All documents
  - Project briefs
  - Technical specifications
  - Research notes
  - Architecture decisions
  - Testing and release notes
- Document cards with format badges (Markdown clearly presented), linked work references.
- Search, summary counts, empty-state, presentation-only New document control.
- Markdown as the initial editing boundary.

Plan status is recorded in [`PLAN-A-04I.md`](docs/plan/frontend/PLAN-A-04I.md).

### PLAN-A-04J — `/reports`

Implemented:
- Dedicated reports page replacing the generic module fixture.
- Report definitions (`workspaceReportDefinitions`) with explicit formulas and source records:
  - Project completion: completed tasks / total tasks
  - Task distribution: counts by status
  - Milestone progress: completed milestones / total milestones
  - Requirement coverage: verified requirements / total requirements
  - Activity history: bounded chronological query
- Overdue work fixtures (`workspaceReportOverdue`).
- Sections:
  - Overview
  - Project completion
  - Task distribution
  - Milestone progress
  - Requirement coverage
  - Activity history
- Report panels with formula definitions, source record references, computed values.
- Project scope control, search, reset behavior, overdue work section.
- Placeholder-only calculation notes, presentation-only Export report control.
- Responsive styling.

Plan status is recorded in [`PLAN-A-04J.md`](docs/plan/frontend/PLAN-A-04J.md).

### PLAN-A-04K — `/settings`

Implemented:
- Dedicated settings page replacing the generic module fixture.
- Sections:
  - Account and profile
  - Workspace preferences
  - Notifications
  - Appearance and density
  - Legal and privacy
- Setting cards with values and notes per group.
- Search, Save settings control, legal policy links.
- Presentation-only save behavior (no persistence until settings API exists).
- Legal links to Privacy Policy, Terms of Service, Cookie & Local Storage Policy.
- Prototype storage behavior explained without claiming durable account settings.
- Responsive styling.

Plan status is recorded in [`PLAN-A-04K.md`](docs/plan/frontend/PLAN-A-04K.md).

## Validation already completed

For the current implementation:

- `npm run lint` passed from `client\`.
- `npm run build` passed from `client\`.
- `git diff --check` passed.
- Browser smoke checks passed for:
  - `/dashboard`
  - Section switching (Quick actions).
  - `/projects`
  - Project search filtering.
  - Archived projects section.
  - `/projects/project-garden`
  - Project workspace workflow-section switching.
  - Missing project handling.
  - `/milestones`
  - Milestone timeline.
  - Timeline project links.
  - Overdue and blocked filtering.
  - `/tasks`
  - List/Kanban switching.
  - Task filtering (Due soon).
  - `/requirements`
  - Section switching (Functional/Traceability).
  - Requirement filtering.
  - `/assets`
  - Section switching (Images and illustrations).
  - Asset filtering.
  - `/revisions`
  - Section switching (Pending review).
  - Revision filtering.
  - `/documentation`
  - Section switching (Project briefs).
  - Document filtering.
  - `/reports`
  - Section switching (Task distribution).
  - Project scope control.
  - `/settings`
  - Section switching (Legal and privacy).

Temporary Vite dev servers used for smoke checks were stopped.

## Current worktree state

All frontend plans PLAN-A-01 through PLAN-A-04K are complete. The worktree contains modifications across:

- [`LOG.md`](LOG.md)
- [`client/src/App.jsx`](client/src/App.jsx)
- [`client/src/index.css`](client/src/index.css)
- [`client/src/pages/index.js`](client/src/pages/index.js)
- [`client/src/pages/workspace/WorkspacePage.jsx`](client/src/pages/workspace/WorkspacePage.jsx)
- [`client/src/pages/workspace/index.js`](client/src/pages/workspace/index.js)
- [`client/src/pages/workspace/workspaceData.js`](client/src/pages/workspace/workspaceData.js)
- [`docs/plan/frontend/PLAN-A-04B.md`](docs/plan/frontend/PLAN-A-04B.md)
- [`docs/plan/frontend/PLAN-A-04C.md`](docs/plan/frontend/PLAN-A-04C.md)
- [`docs/plan/frontend/PLAN-A-04D.md`](docs/plan/frontend/PLAN-A-04D.md)
- [`docs/plan/frontend/PLAN-A-04E.md`](docs/plan/frontend/PLAN-A-04E.md)
- [`docs/plan/frontend/PLAN-A-04F.md`](docs/plan/frontend/PLAN-A-04F.md)
- [`docs/plan/frontend/PLAN-A-04G.md`](docs/plan/frontend/PLAN-A-04G.md)
- [`docs/plan/frontend/PLAN-A-04H.md`](docs/plan/frontend/PLAN-A-04H.md)
- [`docs/plan/frontend/PLAN-A-04I.md`](docs/plan/frontend/PLAN-A-04I.md)
- [`docs/plan/frontend/PLAN-A-04J.md`](docs/plan/frontend/PLAN-A-04J.md)
- [`docs/plan/frontend/PLAN-A-04K.md`](docs/plan/frontend/PLAN-A-04K.md)

There are also earlier documentation moves/changes in the worktree from the plan-folder reorganization. Do not reset or discard unrelated changes.

## Exact next step

All frontend plans are complete. No further protected user-page implementations remain pending. If new work is requested, read `LOG.md` for the execution history and inspect the current worktree state before proceeding.

## Explicit non-goals unless requested

- No real login or registration.
- No credential validation.
- No backend/API/database integration.
- No persistence or durable sessions.
- No production authorization or protected-route enforcement.
- No React Router migration yet.
- No MUI migration yet.
- No final legal publication.
- No claim that placeholder progress percentages are production calculations.
