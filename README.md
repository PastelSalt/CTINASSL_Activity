# Tsumugi (CTINASSL Activity)

> **Weaving ideas into finished work.**

Tsumugi, also known as Project Garden, is a planned creative and technical production-management platform by Moeko Works. It is intended to help individuals and teams plan, organize, track, and preserve projects from concept through completion.

The platform is designed for software development, creative writing and visual novel production, academic research, multimedia production, and personal or multidisciplinary projects. Unlike a conventional task manager, Tsumugi connects objectives, requirements, milestones, tasks, assets, documentation, revisions, and deliverables into one traceable production lifecycle.

## Project status

The repository is currently an early-stage Vite + React implementation. A first static landing-page design is present, while the product direction and target architecture are documented in [PROJECT-SPECS.md](PROJECT-SPECS.md). Most application features have not been implemented yet.

## Planned capabilities

- Project directory and configurable project workflows
- Dashboard with active projects, milestones, tasks, deadlines, and recent activity
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
- `npm run build` creates a production build in `client/dist`.
- `npm run lint` runs ESLint.
- `npm run preview` previews the production build.

The current client contains a static long-scroll landing page, three route-selected policy pages, static authentication pages, and a placeholder authenticated dashboard exploration with responsive navigation, a page progress meter, traceability/lifecycle sections, local Fredoka typography, Lucide icons, solid outlined components, a warm woven pattern canvas, CSS/SVG-like visuals, GSAP/ScrollTrigger landing-page scenes, and reduced-motion-compatible behavior. Real authentication, backend integration, analytics, durable sessions, and final legal publication remain unimplemented.

## Server

The `Server/` directory currently contains only the initial CommonJS `package.json`. No Express application, API routes, database integration, authentication, or server runtime entry point is implemented yet.

## Documentation

- [PROJECT-SPECS.md](PROJECT-SPECS.md) defines the product requirements and target architecture.
- [INSTRUCTIONS.md](INSTRUCTIONS.md) defines repository maintenance rules.
- [LOG.md](LOG.md) records actions made in the codebase.
- [CODEMAP.md](CODEMAP.md) describes the current files, responsibilities, and data flow.
- Draft legal documents are stored in [docs/](docs/) and require owner/legal review before publication.
- [PLAN-A-02.md](PLAN-A-02.md) plans the future standalone legal policy pages.
- [PLAN-A-03.md](PLAN-A-03.md) plans the future sign-up and login pages.
- [PLAN-A-04.md](PLAN-A-04.md) plans the placeholder authenticated dashboard and reference-inspired navigation.
