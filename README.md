# Tsumugi (CTINASSL Activity)

> **Weaving ideas into finished work.**

Tsumugi, also known as Project Garden, is a planned creative and technical production-management platform by Moeko Works. It is intended to help individuals and teams plan, organize, track, and preserve projects from concept through completion.

The platform is designed for software development, creative writing and visual novel production, academic research, multimedia production, and personal or multidisciplinary projects. Unlike a conventional task manager, Tsumugi connects objectives, requirements, milestones, tasks, assets, documentation, revisions, and deliverables into one traceable production lifecycle.

## Project status

The repository is currently an early-stage Vite + React implementation. A first static landing-page design is present, while the product direction and target architecture are documented in [PROJECT-SPECS.md](PROJECT-SPECS.md). Most application features have not been implemented yet.

## Planned capabilities

- Project directory and configurable project workflows
- Overview page with active projects, milestones, tasks, deadlines, and recent activity
- Milestone, task, requirement, asset, revision, and documentation management
- Reports for project health and production progress
- Explicit traceability from project objectives to requirements, milestones, tasks, revisions, and deliverables
- Public landing page and authentication flows
- Protected project workspaces with project-level authorization
- Responsive authenticated application shell with persistent navigation

## Planned application routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/privacy-policy` | Privacy Policy / Privacy Notice |
| `/terms-of-service` | Terms of Service / Terms and Conditions |
| `/cookie-and-local-storage-policy` | Cookie & Local Storage Policy |
| `/login` | User login |
| `/register` | Account registration |
| `/forgot-password` | Start password recovery |
| `/reset-password` | Complete password recovery |
| `/dashboard` | Production overview |
| `/projects` | Project directory |
| `/projects/:projectId` | Individual project workspace |
| `/milestones` | Milestone management |
| `/tasks` | Task management |
| `/requirements` | Requirements and acceptance criteria |
| `/assets` | Project asset library |
| `/revisions` | Revision history |
| `/documentation` | Project knowledge and records |
| `/reports` | Progress and production analytics |
| `/settings` | Account and application preferences |

## Target architecture

The specification calls for a modular MERN-based application:

- **Frontend:** React, TypeScript, Material UI, Emotion, React Router, TanStack Query, and Vite
- **Backend:** Node.js, Express, Mongoose, and Zod or an equivalent validation library
- **Data:** MongoDB Atlas for records and external object storage for binary assets
- **Deployment:** Vercel for the frontend and an initial serverless API deployment, with MongoDB Atlas and managed object storage

The backend should be organized by business domain, including authentication, users, projects, milestones, tasks, requirements, assets, revisions, documentation, and reports. The design system should use centralized MUI theme tokens and follow the existing Moeko Works portfolio's visual language rather than inventing an unrelated palette.

## Current repository structure

```text
.
├── PROJECT-SPECS.md   Product specification and target architecture
├── INSTRUCTIONS.md    Documentation and development rules
├── LOG.md             Chronological repository action log
├── CODEMAP.md         Developer and agent codebase index
├── Server/            Initial server package configuration
└── client/            React + Vite client scaffold
```

See [CODEMAP.md](CODEMAP.md) for the current implemented source map. Generated directories such as `client/node_modules` and `client/dist` are not part of the maintained source map.

## Requirements

- Node.js with npm

## Client

```powershell
cd client
npm install
npm run dev
```

Available client scripts:

- `npm run dev` starts the Vite development server.
- `npm run build` checks the legal documents for unresolved placeholders, then creates a production build in `client/dist`.
- `npm run check:legal` runs only the placeholder check (warns while the policies are drafts, fails when `LEGAL_STATUS` is `published`).
- `npm run lint` runs ESLint.
- `npm run preview` previews the production build.

The current client is a code-split React app with in-app navigation (no full page reloads), a shared public header/footer and page-metadata handling, a 404 page, and these areas:

- **Landing page** — static long-scroll page with GSAP/ScrollTrigger scenes and reduced-motion support.
- **Legal pages** — Privacy Policy, Terms of Service, and Cookie & Local Storage Policy rendered from the Markdown drafts in `docs/`, with contents list, anchors, a draft banner, and a storage inventory. They are drafts and `noindex` until reviewed.
- **Auth pages** — `/login`, `/register`, `/forgot-password`, `/reset-password` in demo mode: nothing typed is read, stored, or sent. Append `?preview=<state>` (or use the "Preview states" list) to view error and result layouts.
- **Demo workspace** — an individual workspace with five destinations: Home, Projects (with a project page: Overview, Work, Specs, Files, History), Tasks, Library, and Insights, plus Account. Tasks includes a month calendar, and `/help` renders the full guide in `docs/individual-workspace-guide.md`. Press `Q` to quick add a task and `Ctrl/Cmd+K` to search or jump. Everything is drawn from placeholder data; additions made with Quick add or a template last for the session only. Add `?dev` to the URL (or use Account) for the developer-tools bar.

Real authentication, backend integration, analytics, durable sessions, and final legal publication remain unimplemented.

## Server

The `Server/` directory currently contains only the initial CommonJS `package.json`. No Express application, API routes, database integration, authentication, or server runtime entry point is implemented yet.

## Documentation

- [PROJECT-SPECS.md](PROJECT-SPECS.md) defines the product requirements and target architecture.
- [RESEARCH.md](RESEARCH.md) analyses why the workspace UI feels overwhelming and proposes simplifications (its recommendations are implemented in PLAN-A-04 Revision 3).
- [INSTRUCTIONS.md](INSTRUCTIONS.md) defines repository maintenance rules.
- [LOG.md](LOG.md) records actions made in the codebase.
- [CODEMAP.md](CODEMAP.md) describes the current files, responsibilities, and data flow.
- Draft legal documents are stored in [docs/](docs/) and require owner/legal review before publication.
- Frontend plans are organized under [docs/plan/frontend/](docs/plan/frontend/).
- Backend plans will be organized under [docs/plan/backend/](docs/plan/backend/) when created.
- [PLAN-A-01.md](docs/plan/frontend/PLAN-A-01.md) covers the landing page.
- [PLAN-A-02.md](docs/plan/frontend/PLAN-A-02.md) covers the legal pages.
- [PLAN-A-03.md](docs/plan/frontend/PLAN-A-03.md) covers authentication pages.
- [PLAN-A-04.md](docs/plan/frontend/PLAN-A-04.md) covers the individual workspace structure and UI (Revision 3, implemented).
- [PLAN-A-04A.md](docs/plan/frontend/PLAN-A-04A.md) through [PLAN-A-04L.md](docs/plan/frontend/PLAN-A-04L.md) contain the page and cross-cutting plans (Home, Projects, Project page, Work, Tasks, Specs, Library, History, Documents, Insights, Account, and Quick add, templates, first run, palette).
