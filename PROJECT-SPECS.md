# TSUMUGI — Project Specifications

> **Weaving ideas into finished work.**  
> A creative and technical production management platform by Moesoft.

| Field | Specification |
|---|---|
| Project name | Tsumugi (つむぎ) |
| Working codename | Project Garden |
| Product category | Creative & Technical Production Management |
| Organization / brand | Moesoft |
| Primary purpose | Plan, organize, track, and preserve the production lifecycle of projects |
| Frontend deployment | Vercel |
| Architecture | MERN-based modular application |
| Document status | Initial project specification |

---

## 1. Project Overview

Tsumugi is a web-based production management platform designed to help individuals and teams manage projects across different disciplines. It provides a centralized environment for planning, developing, organizing, monitoring, and preserving work from its initial concept through completion.

The platform is intended to support:

- Software development projects
- Creative writing and visual novel production
- Academic research and capstone projects
- Multimedia and digital content production
- Personal, experimental, and multidisciplinary projects

Unlike a conventional task manager, Tsumugi focuses on the **production lifecycle**. It connects project objectives, requirements, milestones, tasks, assets, documentation, revisions, and deliverables so that users can understand not only what needs to be done, but also how the work progresses and how its final output was produced.

### 1.1 Product Concept

The name **Tsumugi (つむぎ)** is associated with spun silk and weaving. It serves as a metaphor for bringing separate threads together to create something complete.

In Tsumugi:

- Tasks contribute to milestones.
- Requirements guide implementation.
- Assets and documentation support production.
- Revisions record how work evolves.
- Deliverables represent completed outcomes.

The platform brings these separate parts of a project together, allowing ideas to develop into finished work.

**One-liner:** *Weaving ideas into finished work.*

### 1.2 Vision

To provide a flexible, cohesive production environment where technical, academic, and creative projects can be managed through a shared but adaptable workflow.

### 1.3 Core Objectives

1. Centralize project information, tasks, milestones, requirements, assets, and documentation.
2. Support different project types without forcing every project into one predefined workflow.
3. Provide traceability between project objectives, planned work, changes, and deliverables.
4. Make project progress understandable through dashboards, timelines, and reports.
5. Preserve project history, revisions, and supporting materials for future reference.
6. Establish a maintainable and extensible software architecture suitable for future integrations.

---

## 2. Target Users and Use Cases

### 2.1 Target Users

- Individual developers and independent creators
- Student researchers and capstone teams
- Small software development teams
- Writers and visual novel creators
- Multimedia and digital production teams
- Project coordinators and supervisors

### 2.2 Representative Use Cases

| Project type | Example workflow | Important records |
|---|---|---|
| Software development | Planning → Requirements → Design → Development → Testing → Deployment | Requirements, tasks, issues, releases, technical documents |
| Visual novel production | Concept → Worldbuilding → Script → Asset production → Integration → Testing → Release | Characters, scripts, scenes, assets, revisions |
| Academic research | Proposal → Literature review → Methodology → Data collection → Analysis → Publication | Research questions, sources, methodology, findings, deliverables |
| Multimedia production | Concept → Storyboard → Production → Editing → Review → Export | Media assets, production tasks, review notes, versions |
| Personal project | Idea → Planning → Execution → Review → Completion | Notes, milestones, tasks, files, progress |

---

## 3. Application Architecture and Navigation

Tsumugi will follow the page architecture established by the user's existing **Niwa** project:

1. Public landing page
2. Authentication pages
3. Authenticated user dashboard
4. Persistent application navigation
5. Individual management pages and project workspaces

The public-facing website and authenticated application must use separate layouts.

### 3.1 Public Environment

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing page | Introduce Tsumugi, explain its capabilities, and provide navigation to authentication |
| `/login` | Login | Authenticate an existing user |
| `/register` | Registration | Create a user account |
| `/forgot-password` | Password recovery | Start account recovery |
| `/reset-password` | Password reset | Complete password recovery |

The landing page should communicate the product's purpose, main features, and value proposition. It should include clear calls to action for registration and login.

### 3.2 Authenticated Environment

| Route | Page | Purpose |
|---|---|---|
| `/dashboard` | Overview | Summarize active projects, upcoming milestones, pending tasks, and recent activity |
| `/projects` | Project directory | Browse, create, search, filter, and organize projects |
| `/projects/:projectId` | Project workspace | View and manage an individual project's information |
| `/milestones` | Milestones | Manage project phases, deadlines, and deliverables |
| `/tasks` | Tasks | Manage assignments, priorities, statuses, and subtasks |
| `/requirements` | Requirements | Record project requirements and acceptance criteria |
| `/assets` | Asset library | Organize project files and media |
| `/revisions` | Revision history | Review changes and version history |
| `/documentation` | Documentation | Manage technical documents, notes, and project records |
| `/reports` | Reports | View progress and production analytics |
| `/settings` | Settings | Manage account and application preferences |

### 3.3 Shared Application Shell

Authenticated pages should share a common dashboard layout containing:

- Persistent navigation drawer or sidebar
- Application header / top app bar
- Current page title and contextual actions
- User account menu
- Main content area
- Responsive navigation behavior for smaller screens

The navigation shell should remain mounted while the user moves between authenticated pages where practical. Individual page content should be rendered through the application's route outlet.

### 3.4 Access Control

- Public routes must remain accessible without authentication.
- Protected routes must require a valid authenticated session.
- Unauthenticated users attempting to access protected pages should be redirected to login.
- Authenticated users visiting login or registration pages may be redirected to the dashboard.
- Backend authorization must verify access independently of frontend route guards.
- Project-level access checks must be enforced on every relevant API operation.

---

## 4. Functional Modules

### 4.1 Dashboard

The dashboard provides a high-level view of the user's production activity.

**Initial features:**

- Total and active project counts
- Project status overview
- Upcoming milestones and deadlines
- Pending and overdue tasks
- Recent project activity
- Recently accessed projects
- Quick actions for creating projects and tasks

Dashboard metrics must be derived from actual application records. Progress indicators should use a documented calculation rather than arbitrary manually entered percentages.

### 4.2 Project Management

The project directory is the central entry point for all managed work.

**Features:**

- Create, view, edit, archive, and delete projects
- Project name, description, category, status, priority, and dates
- Project cover image or icon
- Project owner and collaborators, when collaboration is implemented
- Project tags and custom metadata
- Project search, sorting, and filtering
- Project-specific workspace

**Suggested project statuses:**

- Idea
- Planning
- Active
- On Hold
- Completed
- Archived

Each project should have a configurable workflow rather than relying exclusively on a single fixed sequence of phases.

### 4.3 Milestone Management

Milestones represent significant phases or checkpoints in a project.

**Features:**

- Create, edit, complete, and archive milestones
- Start date and due date
- Milestone status and priority
- Related tasks and deliverables
- Dependencies between milestones, if needed
- Timeline or chronological view
- Overdue milestone indicators

### 4.4 Task Management

Tasks represent actionable work items.

**Features:**

- Task creation and editing
- Task descriptions and instructions
- Priority and status
- Due dates
- Subtasks
- Assignment to a user, when collaboration is implemented
- Links to projects, milestones, and requirements
- Comments or activity records, if implemented
- List and Kanban views

**Suggested task statuses:**

- Backlog
- To Do
- In Progress
- In Review
- Blocked
- Completed

### 4.5 Requirements Management

Requirements describe what a project is expected to achieve or implement.

**Features:**

- Functional and non-functional requirements
- Requirement identifiers
- Descriptions and acceptance criteria
- Priority and status
- Related milestones and tasks
- Requirement history
- Verification status

Requirements should be linkable to the work that implements them and to the deliverables that satisfy them.

### 4.6 Asset Management

The asset library stores and organizes files associated with projects.

**Supported asset examples:**

- Images and illustrations
- Documents and PDFs
- Audio and video files
- Datasets and spreadsheets
- Design references
- Project exports and deliverables
- Source-code or repository references

**Features:**

- Upload and organize assets
- Associate assets with projects and other records
- Asset metadata and descriptions
- File type and size information
- Preview where supported
- Download and access controls
- Optional tags and categories

Binary files should be stored in dedicated object storage, not directly inside MongoDB documents. MongoDB should store metadata and storage references.

### 4.7 Revision Management

Revision management records how project materials and important records evolve.

**Features:**

- Revision entries with timestamps and authors
- Change descriptions
- Links to affected records
- Previous and current version references where applicable
- Revision comparison for supported document types
- Approval status, if review workflows are introduced

Revision history should not be represented as an unrestricted array embedded in every project document. Use dedicated records where history volume and querying justify it.

### 4.8 Documentation

A centralized area for project knowledge and written records.

**Examples:**

- Project briefs
- Technical specifications
- Meeting notes
- Architecture decisions
- Research notes
- Creative drafts
- Testing documentation
- Release notes

A Markdown editor is a suitable initial implementation. Rich-text editing can be considered later if there is a clear requirement.

### 4.9 Reports and Analytics

Reports should help users understand project health and production progress.

**Potential reports:**

- Project completion overview
- Task status distribution
- Completed versus pending tasks
- Milestone completion
- Overdue work
- Requirement implementation status
- Project activity history

Avoid presenting metrics that cannot be calculated reliably from stored data. Clearly document how each metric is calculated.

---

## 5. Configurable Project Workflows

A defining feature of Tsumugi is its ability to accommodate different production processes.

Example workflows:

**Software development**

`Planning → Requirements → Design → Development → Testing → Deployment`

**Visual novel production**

`Concept → Worldbuilding → Script → Asset Production → Integration → Testing → Release`

**Academic research**

`Proposal → Literature Review → Methodology → Data Collection → Analysis → Publication`

**Multimedia production**

`Concept → Storyboard → Production → Editing → Review → Export`

Users should eventually be able to define custom phases, task categories, statuses, and milestone structures.

For the initial release, provide a small set of predefined templates. Custom workflow builders can be introduced after the core project and task model is stable.

---

## 6. Distinguishing Feature: Project Traceability

Tsumugi should go beyond task tracking by connecting the origin and completion of project work.

A representative traceability chain:

`Project Objective → Requirement → Milestone → Task → Revision → Deliverable`

This enables users to answer:

- Why does this task exist?
- Which requirement does it address?
- Which milestone does it contribute to?
- What changed during implementation?
- Which deliverable resulted from the work?
- Is the original requirement actually satisfied?

Relationships should be stored explicitly and validated by the backend. Avoid relying on loosely formatted text references.

This feature is particularly useful for software engineering, academic research, and structured creative production.

---

## 7. Technology Stack

### 7.1 Frontend

| Technology | Responsibility |
|---|---|
| React | Component-based user interface |
| TypeScript | Static typing and maintainability |
| Material UI (MUI) | Primary UI component framework |
| Emotion | MUI-compatible styling engine |
| React Router | Client-side page routing |
| TanStack Query | Server-state fetching, caching, and synchronization |
| Vite | Frontend development and build tooling |

### 7.2 Backend

| Technology | Responsibility |
|---|---|
| Node.js | JavaScript runtime |
| Express | HTTP API and backend routing |
| Mongoose | MongoDB object modeling |
| Zod or equivalent | Request and data validation |
| Authentication library | Secure authentication and session handling |

### 7.3 Database and Storage

| Technology | Responsibility |
|---|---|
| MongoDB Atlas | Managed document database |
| Object storage | Uploaded documents and multimedia files |
| Optional Redis | Caching and background-job support, if later required |

### 7.4 Deployment

| Component | Deployment target |
|---|---|
| React frontend | Vercel |
| Express API | Vercel Functions for an initial serverless deployment |
| MongoDB | MongoDB Atlas |
| Uploaded files | External S3-compatible object storage or another managed file-storage provider |

**Deployment note:** Vercel Functions are stateless serverless execution environments. The backend must not depend on a permanently running Express process, local persistent disk, or in-memory session state. Database connections should be reused safely across invocations where possible.

Long-running jobs, persistent WebSocket connections, and workloads requiring a continuously running server may need a separate backend host or managed service in a later phase. Do not assume Socket.IO or arbitrary background workers will operate as persistent processes inside ordinary Vercel Functions.

---

## 8. Frontend Design System

### 8.1 Visual Identity

Tsumugi will use the same visual theme and design language as the user's existing portfolio.

It must not introduce an unrelated visual identity. The portfolio should be treated as the primary design reference for:

- Color palette
- Typography
- Component appearance
- Border radii
- Spacing conventions
- Background treatments
- Decorative motifs
- General visual atmosphere

The exact design tokens should be extracted from the portfolio's actual implementation or confirmed design reference before finalizing the theme. Do not guess or independently redefine the palette.

### 8.2 MUI Theme Implementation

Use MUI's centralized theme configuration:

- `createTheme()`
- `ThemeProvider`
- `CssBaseline`
- Reusable component overrides
- Shared typography and spacing tokens

Avoid scattering hardcoded colors and styles throughout page components. Use theme tokens and reusable components so future visual changes remain consistent.

### 8.3 Design Principles

- Consistency with the portfolio
- Clear information hierarchy
- Responsive layouts
- Accessible controls and contrast
- Reusable components
- Minimal visual clutter
- Functional density appropriate for a management application

---

## 9. Suggested Frontend Directory Structure

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── navigation/
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── forms/
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── landing/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── milestones/
│   │   ├── tasks/
│   │   ├── requirements/
│   │   ├── assets/
│   │   ├── revisions/
│   │   ├── documentation/
│   │   ├── reports/
│   │   └── settings/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── contexts/
│   ├── theme/
│   │   └── index.ts
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
└── package.json
```

## 10. Suggested Backend Directory Structure

```text
api/
├── config/
├── middleware/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── projects/
│   ├── milestones/
│   ├── tasks/
│   ├── requirements/
│   ├── assets/
│   ├── revisions/
│   ├── documentation/
│   └── reports/
├── shared/
│   ├── errors/
│   ├── validation/
│   └── utilities/
├── app.ts
└── package.json
```

The backend should be organized by business domain. Each module can contain its own routes, controllers, services, models, and validation schemas.

For Vercel deployment, expose the Express application through a serverless-compatible entry point and configure routing appropriately. Keep application initialization separate from the platform-specific entry point.

---

## 11. Initial Data Model

The following MongoDB collections are proposed for the initial architecture.

| Collection | Purpose |
|---|---|
| `users` | Account information and user preferences |
| `projects` | Project profiles, ownership, status, and configuration |
| `milestones` | Project phases and checkpoints |
| `tasks` | Actionable work items |
| `requirements` | Functional and non-functional requirements |
| `assets` | File metadata and storage references |
| `revisions` | Historical changes and version references |
| `documents` | Documentation and written project records |
| `activities` | Chronological project activity events |

### 11.1 Data Modeling Guidelines

- Use MongoDB ObjectIds for primary references.
- Include `createdAt` and `updatedAt` where appropriate.
- Index frequently queried fields such as project ownership, project status, due dates, and referenced project IDs.
- Validate relationships and permissions in the backend.
- Avoid excessively large embedded documents.
- Store file binaries in object storage and keep their metadata in MongoDB.
- Use pagination for potentially large collections such as tasks, revisions, and activities.
- Define deletion and archival behavior before implementing cascading operations.

### 11.2 Example Relationship Structure

A task may reference:

- Its parent project
- Its milestone
- One or more requirements
- Its creator and assignee
- Related assets
- Relevant revision records

A requirement may reference its implementing tasks and associated deliverables.

These relationships should be explicit and queryable.

---

## 12. Security and Reliability Requirements

- Passwords must be securely hashed; plaintext passwords must never be stored.
- Authentication secrets and database credentials must be stored in environment variables.
- Use HTTPS in production.
- Validate and sanitize incoming data.
- Enforce authorization on the backend, not only in React.
- Restrict asset upload types and sizes.
- Validate file access permissions before generating download access.
- Protect authentication endpoints against abuse.
- Use secure cookie settings if cookie-based sessions are selected.
- Apply appropriate CORS and CSRF protections based on the authentication strategy.
- Avoid exposing stack traces, secrets, or internal errors to clients.
- Keep dependencies updated and audit them periodically.
- Back up important database records and define recovery procedures.

### 12.1 Environment Configuration

Example environment variables:

```env
NODE_ENV=development
MONGODB_URI=
AUTH_SECRET=
CLIENT_ORIGIN=
STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
```

Use separate development and production credentials. Never commit real secrets to source control.

---

## 13. Development Roadmap

The roadmap is organized around a functional, incrementally deployable application.

| Phase | Scope | Expected outcome |
|---|---|---|
| 1. Foundation | Repository setup, MUI theme, layouts, routing, authentication, database connection | Working application shell |
| 2. Project Management | Project CRUD, project directory, project workspace | Users can create and manage projects |
| 3. Production Tracking | Milestones, tasks, statuses, priorities, deadlines | Core production workflow |
| 4. Requirements | Requirement records, acceptance criteria, task relationships | Traceable project specifications |
| 5. Assets and Documentation | File storage, asset metadata, Markdown documents | Centralized project resources |
| 6. Revisions and Traceability | Revision history, relationships, deliverable tracking | Project history and traceability |
| 7. Reports and Hardening | Dashboard metrics, testing, security review, deployment | Stable initial release |

Testing should begin in Phase 1 and continue throughout development, not be postponed until the final phase.

### 13.1 MVP Scope

The first usable release should prioritize:

1. Public landing page
2. Registration and login
3. Authenticated dashboard
4. Project creation and management
5. Milestone management
6. Task management
7. Basic requirements management
8. Basic asset metadata and file storage
9. Responsive MUI interface
10. Vercel deployment and production database connection

Advanced collaboration, real-time updates, elaborate analytics, AI integrations, and complex workflow builders should be deferred until the core system is reliable.

---

## 14. Future Enhancements

Potential future features, subject to actual user needs:

- Custom workflow builder
- Team workspaces and role-based permissions
- Comments and review/approval workflows
- Calendar and timeline views
- GitHub repository integration
- Automated release and changelog records
- Advanced document version comparison
- Data import and export
- Notifications and reminders
- Background processing for reports and file operations
- Optional AI-assisted summaries and project insights

AI should remain optional. Tsumugi's core project management features must work without an AI provider.

---

## 15. Non-Goals and Scope Boundaries

Tsumugi is not initially intended to be:

- A full replacement for GitHub or GitLab
- A complete IDE or code editor
- A full visual novel engine
- A professional video or image editing suite
- A general-purpose social network
- An unrestricted file-hosting service
- An AI-dependent productivity application

It should integrate with specialized tools where useful rather than attempting to recreate their entire functionality.

---

## 16. Project Principles

The following principles should guide design and implementation:

1. **One platform, multiple production disciplines.** Support different project types through configurable workflows.
2. **Traceability over disconnected task lists.** Connect objectives, requirements, work, revisions, and deliverables.
3. **Preservation of project history.** Important changes should remain understandable and attributable.
4. **Consistency over visual reinvention.** Reuse the established portfolio theme and MUI design system.
5. **Modular engineering.** Keep frontend components and backend business domains maintainable.
6. **Deployable incrementally.** Keep the architecture compatible with Vercel's serverless deployment model.
7. **Useful without AI.** Core functionality must not depend on external language models.
8. **Build the tool to manage its own development.** Tsumugi should eventually be capable of tracking its own requirements, milestones, tasks, revisions, and releases.

---

## 17. Final Product Definition

**Tsumugi** is a MERN-based creative and technical production management platform developed under Moesoft. It provides a centralized workspace for managing software, writing, research, multimedia, and personal projects through configurable workflows, milestones, tasks, requirements, assets, documentation, revisions, and deliverables.

Its interface follows the established visual identity of the user's portfolio, uses Material UI as its primary frontend component framework, and adopts the public landing page → authentication → protected dashboard architecture established by Niwa.

The frontend and initial serverless API deployment target is Vercel, with MongoDB Atlas serving as the primary database.

> **Tsumugi — Weaving ideas into finished work.**
