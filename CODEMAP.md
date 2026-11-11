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
| `PLAN-A-01.md` | Preliminary static landing-page design plan |
| `PLAN-A-02.md` | Plan for standalone legal policy pages |
| `PLAN-A-03.md` | Plan for sign-up and login pages |
| `PLAN-A-04.md` | Plan for authenticated dashboard visual exploration |
| `docs/` | Draft legal and policy documents for owner/legal review |
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
| `client/src/main.jsx` | React bootstrap; mounts `App` inside `StrictMode` |
| `client/src/App.jsx` | Route selection, static Tsumugi landing page, navigation, section tracking, progress, and GSAP scenes |
| `client/src/pages/index.js` | Re-exports legal and authentication route maps |
| `client/src/pages/legal/` | Legal policy page components and route-keyed content |
| `client/src/pages/auth/` | Authentication page components and route mapping |
| `client/src/pages/dashboard/` | Placeholder authenticated dashboard shell, floating navigation, dashboard route mapping, and fixture data |
| `client/src/index.css` | Fredoka-based landing/policy tokens, solid outlined responsive layout, document styling, footer legal links, fallback motion, and reduced-motion styles |
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
  -> client/src/main.jsx
    -> client/src/App.jsx
      -> client/src/index.css
```

Vite serves the client during development and bundles the client into `client/dist` for production. The server is not connected to the client yet.

## Current gaps

- The landing page remains a static evaluation pass; CTA buttons do not connect to authentication flows.
- GSAP animation setup is scoped with `gsap.context()` and responsive conditions use `gsap.matchMedia()`.
- The page uses CSS/SVG-like inline visuals and local Fredoka/Lucide assets without final Tsumugi brand assets.
- No application pages, components, API routes, or server runtime modules are implemented.
- `Server/package.json` still uses a placeholder test command.
