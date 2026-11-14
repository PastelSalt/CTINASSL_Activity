# Code Map

This document is the maintained index of the current codebase. Update it when files, responsibilities, dependencies, routes, or data flows change.

## Top-level

| Path | Responsibility |
| --- | --- |
| `README.md` | Project overview, setup, scripts, and documentation links |
| `PROJECT-SPECS.md` | Product requirements and target architecture |
| `INSTRUCTIONS.md` | Repository-wide documentation and development rules |
| `LOG.md` | Chronological record of repository actions |
| `CODEMAP.md` | Current developer and agent index |
| `docs/plan/frontend/PLAN-A-01.md` | Landing page and shared client foundations plan (Revision 2: audit, shared public layout, motion hardening, performance budget) |
| `docs/plan/frontend/PLAN-A-02.md` | Legal policy pages plan (Revision 2: Markdown-sourced content, contents/anchors, publishing safeguards) |
| `docs/plan/frontend/PLAN-A-03.md` | Sign-up, login, and recovery pages plan (Revision 2: demo mode, recovery pages, presentation states) |
| `docs/plan/frontend/PLAN-A-04.md` | Authenticated workspace UI plan (Revision 2: approved D1-D5 shell, shared components, tokens, performance, phases) |
| `docs/plan/frontend/PLAN-A-04A.md` | Detailed `/dashboard` overview page plan |
| `docs/plan/frontend/PLAN-A-04B.md` | Detailed `/projects` directory page plan |
| `docs/plan/frontend/PLAN-A-04C.md` | Detailed `/projects/:projectId` workspace page plan |
| `docs/plan/frontend/PLAN-A-04D.md` | Detailed `/milestones` page plan |
| `docs/plan/frontend/PLAN-A-04E.md` | Detailed `/tasks` page plan |
| `docs/plan/frontend/PLAN-A-04F.md` | Detailed `/requirements` page plan |
| `docs/plan/frontend/PLAN-A-04G.md` | Detailed `/assets` page plan |
| `docs/plan/frontend/PLAN-A-04H.md` | Detailed `/revisions` page plan |
| `docs/plan/frontend/PLAN-A-04I.md` | Detailed `/documentation` page plan |
| `docs/plan/frontend/PLAN-A-04J.md` | Detailed `/reports` page plan |
| `docs/plan/frontend/PLAN-A-04K.md` | Detailed `/settings` page plan |
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
| `client/src/pages/workspace/` | Demo workspace (PLAN-A-04 Revision 2). `WorkspaceApp.jsx` (entry; lazy pages inside a persistent shell), `WorkspaceShell.jsx` (left rail, top bar with project scope, mobile tabs + More sheet, demo banner with preview-state selector, footer), `WorkspaceProvider.jsx` + `context.js` (scope and preview dialog), `nav.js` |
| `client/src/pages/workspace/pages/` | One lazy page per module: Overview, Projects, ProjectWorkspace, Milestones, Tasks, Requirements, Assets, Revisions, Documentation, Reports, Settings |
| `client/src/pages/workspace/components/` | Shared workspace UI: `badges.jsx` (status, priority, due, avatars, relation chips, progress, stacked bar), `layout.jsx` (page header, view tabs, toolbar, stat strip, detail panel, preview action), `states.jsx` (empty, no results, error, unauthorized, skeleton, state gate), `records.jsx` (rows, tiles, detail panels), `TraceChain.jsx` |
| `client/src/pages/workspace/data/` | `fixtures.js` (placeholder records with IDs and relationships), `selectors.js` (all derived counts, statuses, progress, gaps), `status.js` (single status/priority vocabulary), `format.js` (fixed demo date, due labels, formatting) |
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
