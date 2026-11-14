# Tsumugi Continuation Context

> Portable handoff for continuing work on another device or with another agent.
>
> **Last updated:** 2026-11-14

## How to resume

The frontend is a complete static demo: landing, legal, auth, and an **individual workspace** (PLAN-A-04 Revision 3). Read this file, then [`CODEMAP.md`](CODEMAP.md) for the file index and the newest entries of [`LOG.md`](LOG.md) for what changed last. Nothing is committed unless the owner asks.

Rules that apply to all work:

- Frontend only for now: no authentication, API, database, persistence, uploads, or analytics. Write actions open a **Preview only** dialog. Quick add and templates may use **session-only** in-memory state (`data/store.js`), always labelled and lost on reload.
- The individual workspace never shows team concepts (people, assignees, roles, access). A team workspace is a future, separate type.
- Keep `LOG.md`, `CODEMAP.md`, and `README.md` current with every change ([`INSTRUCTIONS.md`](INSTRUCTIONS.md)).
- Visual language: Fredoka, warm paper canvas, flat colour (no gradients), ink outlines for selected elements, pastel accents, Lucide icons, 12px minimum text, targets of at least 24px, restrained motion that respects `prefers-reduced-motion`.
- Run `npm run lint` and `npm run build` from `client/` after code changes; check the changed pages in a browser at phone and desktop widths.

## Product and repository

- Product: **Tsumugi**, a creative and technical production-management platform by Moeko Works. Repository: `PastelSalt/CTINASSL_Activity`.
- Stack: Vite, React 19, JavaScript/JSX, GSAP (landing, auth, legal, restrained workspace motion), Lenis (landing only), Lucide, Fredoka.
- Routing is a small history-API router in `client/src/app/router.js` and a route table in `client/src/App.jsx` (not React Router).
- Client commands run from `client/`: `npm run dev`, `npm run lint`, `npm run build`, `npm run preview`, `npm run check:legal`.

## Routes

| Route | Page |
|---|---|
| `/` | Landing |
| `/login`, `/register`, `/forgot-password`, `/reset-password` | Demo-mode auth |
| `/privacy-policy`, `/terms-of-service`, `/cookie-and-local-storage-policy` | Draft legal pages from `docs/*.md` |
| `/home` | Workspace Home |
| `/projects`, `/projects/:projectId` | Projects (cards, Timeline) and the project page (Overview, Work, Specs, Files, History) |
| `/tasks` | Tasks (Today, Upcoming, Calendar, All) |
| `/library` | Library and document reader (`?doc=`) |
| `/insights` | Insights |
| `/account` | Account and preferences |
| `/help` | Help, rendered from `docs/individual-workspace-guide.md` |

Old workspace paths redirect: `/dashboard` to `/home`, `/milestones` to `/projects?view=timeline`, `/requirements` and `/revisions` to `/projects`, `/assets` and `/documentation` to `/library`, `/reports` to `/insights`, `/settings` to `/account`. Demo project IDs: `project-garden`, `tsumugi-api`, `color-and-memory`, `atlas-zine`, `sketchbook-sprint`, `field-notes-2025` (archived). Unknown project IDs show a "project not found" state.

## Where things are

- Workspace code: `client/src/pages/workspace/` (shell, provider, pages, components, `quickadd/`, `data/`). Sample data is `data/fixtures.js`; every derived number lives in `data/selectors.js`; the demo date is fixed at 2026-11-12 in `data/format.js`.
- Plans: `docs/plan/frontend/PLAN-A-01` to `PLAN-A-04L`, each with an implementation-status section.
- Research behind the workspace restructure: [`RESEARCH.md`](RESEARCH.md).
- User-facing guide (single source for the Help page): [`docs/individual-workspace-guide.md`](docs/individual-workspace-guide.md).

## Decisions on record

- The workspace is organised by what the person is doing: five destinations (Home, Projects, Tasks, Library, Insights), Account in the rail footer menu, Quick add and the command palette (`Q`, `Ctrl/Cmd+K`) always reachable. There is no page footer; legal links are in the account menu.
- Ten record types became seven: assets and documents merged into **File**, revisions became **Changes**, deliverables became a **Final file** flag.
- About 15 status labels in one small vocabulary (`data/status.js`).
- Developer scaffolding (preview states, reset sample data) is hidden behind `?dev`, the account menu, or Account.
- Calendar is a Tasks view, not a sixth destination.

## Known gaps and next steps

- Not built from the plans: the requirement Coverage matrix (04F), compare "unsupported" state (04H), "Not enough data" messaging on Insights (04J), Account view tabs (04K), `workspaceId` and `canAccess()` in the fixtures.
- Not yet done: user testing against the success measures in PLAN-A-04 section 14, a screen-reader pass, reduced-motion review, and checks at 390 and 1536px.
- Legal pages are drafts (`LEGAL_STATUS = 'draft'`, `noindex`); `npm run check:legal` warns about unresolved placeholders.
- Backend (`Server/`) is only a placeholder `package.json`. Backend plans go in `docs/plan/backend/` as PLAN-B documents.
- Open product questions are in RESEARCH.md section 8 (one individual workspace per account or several, converting to a team later, read-only sharing and export).
