# Tsumugi (CTINASSL Activity)

> **Weaving ideas into finished work.**

Tsumugi, also known as Project Garden, is a planned creative and technical production-management platform by Moeko Works. It is intended to help individuals and teams plan, organize, track, and preserve projects from concept through completion.

The platform is designed for software development, creative writing and visual novel production, academic research, multimedia production, and personal or multidisciplinary projects. Unlike a conventional task manager, Tsumugi connects objectives, requirements, milestones, tasks, assets, documentation, revisions, and deliverables into one traceable production lifecycle.

## Project status

The repository is a **frontend-only demo** built with Vite and React. The public landing page, demo-mode authentication pages, draft legal pages, and an **individual workspace** (one person, no team features) are implemented on placeholder data. Nothing is saved or sent anywhere; actions that would write open a "Preview only" dialog. There is no backend yet. The product direction and target architecture are in [PROJECT-SPECS.md](PROJECT-SPECS.md).

## Capabilities

Implemented in the demo:

- Landing page, auth pages (demo mode), and three draft legal pages.
- Individual workspace with five destinations: **Home**, **Projects** (list, timeline, and a project page with Overview, Work, Specs, Files, and History), **Tasks** (Today, Upcoming, Calendar, All), **Library** (files, documents, and a reader), and **Insights**, plus **Account** and **Help**.
- Quick add (`Q`), a command palette (`Ctrl/Cmd+K`), project templates, a first-run checklist, and session-only additions.
- Explicit links between objectives, requirements, tasks, files, and changes, shown as "Why it exists / What it becomes" on every record.

Planned (not implemented): real authentication, persistence, file storage, a backend API, a **team workspace** (people, roles, sharing), notifications, and recurring tasks.

## Application routes

| Route | Status | Purpose |
| --- | --- | --- |
| `/` | Implemented | Public landing page |
| `/privacy-policy`, `/terms-of-service`, `/cookie-and-local-storage-policy` | Implemented (drafts) | Legal pages rendered from `docs/*.md` |
| `/login`, `/register`, `/forgot-password`, `/reset-password` | Implemented (demo mode) | Authentication layouts; nothing typed is read or sent |
| `/home` | Implemented | What needs attention today |
| `/projects`, `/projects/:projectId` | Implemented | Project list and timeline; the project page (`?view=overview\|work\|specs\|files\|history`) |
| `/tasks` | Implemented | Tasks (`?view=today\|upcoming\|calendar\|all`) |
| `/library` | Implemented | Files and documents; `?doc=` opens the reader |
| `/insights` | Implemented | Progress, coverage, overdue |
| `/account` | Implemented (preview only) | Profile and preferences |
| `/help` | Implemented | The individual workspace guide |
| `/dashboard`, `/milestones`, `/requirements`, `/revisions`, `/assets`, `/documentation`, `/reports`, `/settings` | Redirects | Old workspace paths forward to the routes above |

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
├── RESEARCH.md        UX research behind the workspace restructure
├── INSTRUCTIONS.md    Documentation and development rules
├── LOG.md             Chronological repository action log
├── CODEMAP.md         Developer and agent codebase index
├── CONTEXT.md         Portable handoff for continuing the work
├── docs/              Legal drafts, the individual workspace guide, and plans
├── Server/            Initial server package configuration
└── client/            React + Vite client
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

- **Landing page** — long-scroll page with GSAP/ScrollTrigger scenes, Lenis smooth scrolling, pointer effects, and reduced-motion support.
- **Legal pages** — Privacy Policy, Terms of Service, and Cookie & Local Storage Policy rendered from the Markdown drafts in `docs/`, with contents list, anchors, a draft banner, and a storage inventory. They are drafts and `noindex` until reviewed.
- **Auth pages** — `/login`, `/register`, `/forgot-password`, `/reset-password` in demo mode: nothing typed is read, stored, or sent. Append `?preview=<state>` (or use the "Preview states" list) to view error and result layouts.
- **Demo workspace** — an individual workspace with five destinations: Home, Projects (with a project page: Overview, Work, Specs, Files, History), Tasks, Library, and Insights, with Account and Help in the account menu at the bottom of the left rail. Tasks includes a month calendar, and `/help` renders the full guide in `docs/individual-workspace-guide.md`. Press `Q` to quick add a task and `Ctrl/Cmd+K` to search or jump. Everything is drawn from placeholder data; additions made with Quick add or a template last for the session only. Add `?dev` to the URL (or use Account) for the developer-tools bar.

Real authentication, backend integration, analytics, durable sessions, saving, and final legal publication remain unimplemented.

## Server

The `Server/` directory currently contains only the initial CommonJS `package.json`. No Express application, API routes, database integration, authentication, or server runtime entry point is implemented yet.

## Documentation

- [PROJECT-SPECS.md](PROJECT-SPECS.md) defines the product requirements and target architecture.
- [RESEARCH.md](RESEARCH.md) analyses why the earlier workspace UI felt overwhelming and proposes simplifications (implemented in PLAN-A-04 Revision 3).
- [CONTEXT.md](CONTEXT.md) is the portable handoff: routes, decisions, known gaps.
- [docs/individual-workspace-guide.md](docs/individual-workspace-guide.md) is the full user guide for the individual workspace; it is also rendered at `/help`.
- [INSTRUCTIONS.md](INSTRUCTIONS.md) defines repository maintenance rules.
- [LOG.md](LOG.md) records actions made in the codebase.
- [CODEMAP.md](CODEMAP.md) describes the current files, responsibilities, and data flow.
- Draft legal documents are stored in [docs/](docs/) and require owner/legal review before publication.
- [client/README.md](client/README.md) covers the client commands and conventions.
- Frontend plans are organized under [docs/plan/frontend/](docs/plan/frontend/).
- Backend plans will be organized under [docs/plan/backend/](docs/plan/backend/) when created.
- [PLAN-A-01.md](docs/plan/frontend/PLAN-A-01.md) covers the landing page.
- [PLAN-A-02.md](docs/plan/frontend/PLAN-A-02.md) covers the legal pages.
- [PLAN-A-03.md](docs/plan/frontend/PLAN-A-03.md) covers authentication pages.
- [PLAN-A-04.md](docs/plan/frontend/PLAN-A-04.md) covers the individual workspace structure and UI (Revision 3, implemented; later changes are in its section 19).
- [PLAN-A-04A.md](docs/plan/frontend/PLAN-A-04A.md) through [PLAN-A-04L.md](docs/plan/frontend/PLAN-A-04L.md) contain the page and cross-cutting plans (Home, Projects, Project page, Work, Tasks, Specs, Library, History, Documents, Insights, Account, and Quick add, templates, first run, palette). Each carries an implementation-status section listing what was built and what was not.
