# Code Map

This document is the maintained index of the current codebase. Update it when files, responsibilities, dependencies, routes, or data flows change.

## Top-level

| Path | Responsibility |
| --- | --- |
| `README.md` | Project overview, setup, scripts, and documentation links |
| `PROJECT-SPECS.md` | Product requirements and target architecture |
| `RESEARCH.md` | UX research and recommendations for simplifying the workspace UI (proposals only) |
| `INSTRUCTIONS.md` | Repository-wide documentation and development rules |
| `LOG.md` | Chronological record of repository actions |
| `CODEMAP.md` | Current developer and agent index |
| `docs/plan/frontend/PLAN-A-01.md` | Landing page and shared client foundations plan (Revision 2: audit, shared public layout, motion hardening, performance budget) |
| `docs/plan/frontend/PLAN-A-02.md` | Legal policy pages plan (Revision 2: Markdown-sourced content, contents/anchors, publishing safeguards) |
| `docs/plan/frontend/PLAN-A-03.md` | Sign-up, login, and recovery pages plan (Revision 2: demo mode, recovery pages, presentation states) |
| `docs/plan/frontend/PLAN-A-04.md` | Individual workspace structure and UI plan (Revision 3: workspace types, five-destination navigation, project hub, small vocabulary, scaffolding separated) |
| `docs/plan/frontend/PLAN-A-04A.md` | Home (`/home`): what to do today |
| `docs/plan/frontend/PLAN-A-04B.md` | Projects (`/projects`): list and timeline, template picker |
| `docs/plan/frontend/PLAN-A-04C.md` | Project page (`/projects/:projectId`): Overview, Work, Specs, Files, History |
| `docs/plan/frontend/PLAN-A-04D.md` | Work and milestones: tasks grouped by milestone, timeline |
| `docs/plan/frontend/PLAN-A-04E.md` | Tasks (`/tasks`): Today, Upcoming, All |
| `docs/plan/frontend/PLAN-A-04F.md` | Specs: requirements and the coverage matrix (project tab) |
| `docs/plan/frontend/PLAN-A-04G.md` | Library (`/library`) and project Files: merged files and documents |
| `docs/plan/frontend/PLAN-A-04H.md` | History: changes feed and compare (project tab) |
| `docs/plan/frontend/PLAN-A-04I.md` | Documents: Markdown reader inside Library and Files |
| `docs/plan/frontend/PLAN-A-04J.md` | Insights (`/insights`): three honest numbers |
| `docs/plan/frontend/PLAN-A-04K.md` | Account (`/account`): profile, preferences, appearance, privacy, developer tools |
| `docs/plan/frontend/PLAN-A-04L.md` | Quick add, project templates, first run, and command palette |
| `docs/plan/backend/` | Reserved location for future plan-B backend plans |
| `docs/` | Draft legal and policy documents for owner/legal review |
| `docs/plan/frontend/` | Frontend plan-A documents for landing, legal, auth, authenticated workspace, and protected user pages |
| `docs/plan/backend/` | Reserved location for future backend plan-B documents |
| `Server/` | Initial server package configuration |
| `client/` | React + Vite application |

## Server

| Path | Responsibility |
| --- | --- |
| `Server/package.json` | CommonJS package metadata and placeholder test script |

No server runtime entry point, routes, or application modules are currently present.

## Client

| Path | Responsibility |
| --- | --- |
| `client/package.json` | React, Vite, ESLint, Lucide, Fredoka font dependencies and npm scripts |
| `client/index.html` | Browser document shell and Vite entry reference |
| `client/vite.config.js` | Vite configuration with the React plugin |
| `client/eslint.config.js` | ESLint flat configuration for JavaScript and JSX |
| `client/scripts/check-legal.mjs` | Pre-build check for unresolved placeholders in the legal Markdown (`npm run check:legal`); fails only when `LEGAL_STATUS` is `published` |
| `client/src/main.jsx` | React bootstrap; loads Fredoka (latin 400/700) and base/public styles; mounts `App` |
| `client/src/App.jsx` | Route table with lazy-loaded route chunks, Suspense fallback, link interception, unknown-route handling |
| `client/src/app/router.js` | Minimal history-API router: `useLocation`, `navigate`, same-origin link interception, focus-after-navigation flag |
| `client/src/hooks/` | `usePageMeta` (title/description/robots + heading focus), `usePreviewState` (`?preview=` demo states), `useMediaQuery` |
| `client/src/lib/markdown.jsx` | Small Markdown parser/renderer (no raw HTML) used by the legal pages |
| `client/src/components/public/` | `PublicHeader` (landing and compact), `PublicFooter` (full and compact), shared legal link list |
| `client/src/components/forms/` | Presentation-only form pieces (`TextField`, `PasswordField`, `Checkbox`, `FormBanner`, `StatusPanel`) and `PreviewDialog` |
| `client/src/pages/landing/` | Landing page with GSAP scenes, section tracking, and progress meter |
| `client/src/pages/NotFoundPage.jsx` | 404 page for unknown routes |
| `client/src/pages/legal/` | Policy pages rendered from `docs/*.md` (`?raw`), `legalMeta.js` (`LEGAL_STATUS`, document labels, storage inventory) |
| `client/src/pages/auth/` | `AuthShell`, login/register (`AuthPage`), forgot/reset (`RecoveryPage`) and route wrappers; demo mode and previewable states |
| `client/src/pages/workspace/` | Individual demo workspace (PLAN-A-04 Revision 3). `WorkspaceApp.jsx` (entry; lazy pages in a persistent shell), `WorkspaceShell.jsx` (rail with Quick add and five destinations, top bar with palette trigger and account menu, mobile bar with centre add button, developer-tools bar), `WorkspaceProvider.jsx` (preview dialog, Quick add / palette / new-project state, `q` and Ctrl/Cmd+K shortcuts), `context.js`, `nav.js`, `useWorkspaceMotion.js` |
| `client/src/pages/workspace/pages/` | Home, Tasks (Today / Upcoming / Calendar / All), Projects, Project (Overview / Work / Specs / Files / History), Library (with document reader), Insights, Account, Help (renders `docs/individual-workspace-guide.md`) |
| `client/src/pages/workspace/quickadd/` | `QuickAdd.jsx`, `parse.js` (#project, day words, !), `CommandPalette.jsx`, `NewProjectDialog.jsx` (templates), `Modal.jsx` (native dialog shell); all lazy and session-only |
| `client/src/pages/workspace/components/` | Shared UI: `badges.jsx` (status, flags, due, relation chips, progress), `layout.jsx` (page header, view tabs, Filter popover, toolbar, stat strip, split layout, detail panel), `records.jsx` (task, milestone group, requirement, file, change rows and panels, lens block), `Timeline.jsx`, `CalendarView.jsx`, `DocReader.jsx`, `states.jsx` |
| `client/src/pages/workspace/data/` | `fixtures.js` (one-person sample records with IDs and relationships), `store.js` (session-only additions), `templates.js`, `selectors.js` (all derived numbers), `status.js` (one small status vocabulary), `kinds.js`, `format.js` (fixed demo date) |
| `client/src/styles/` | `base.css` (tokens, buttons, shared), `public.css` (compact header/footer, 404), `landing.css`, `auth.css`, `forms.css`, `policy.css`, `workspace.css` (workspace tokens, shell, shared components), `workspace-pages.css` (page layouts); route stylesheets load with their route chunk |
| `client/src/assets/` | Bundled static assets used by the client |
| `client/public/` | Static files served from the site root |

## Draft legal documents

| Path | Responsibility |
| --- | --- |
| `docs/privacy-policy.md` | Draft Privacy Policy / Privacy Notice |
| `docs/terms-of-service.md` | Draft Terms of Service / Terms and Conditions |
| `docs/cookie-and-local-storage-policy.md` | Draft Cookie & Local Storage Policy |

## Runtime flow

```text
client/index.html
  -> client/src/main.jsx (fonts, base.css, public.css)
    -> client/src/App.jsx (useLocation + lazy route chunks)
      -> pages/landing | pages/auth | pages/legal | pages/workspace | pages/NotFoundPage
         (each imports its own stylesheet from src/styles/)
```

Vite serves the client during development and bundles the client into `client/dist` for production. In-app links navigate without reloading the document. The server is not connected to the client yet.

## Current gaps

- Authentication is simulated: login and register are demo-mode pages that never read or send input; real authentication is backend work.
- Legal pages remain drafts (`LEGAL_STATUS = 'draft'`, `noindex`) pending owner and legal review.
- GSAP animation setup is scoped with `gsap.context()` and responsive conditions use `gsap.matchMedia()`.
- The page uses CSS/SVG-like inline visuals and local Fredoka/Lucide assets without final Tsumugi brand assets.
- No application pages, components, API routes, or server runtime modules are implemented.
- `Server/package.json` still uses a placeholder test command.
