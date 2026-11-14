# Tsumugi client

React 19 + Vite frontend for Tsumugi. See the [repository README](../README.md) for the product overview and [CODEMAP.md](../CODEMAP.md) for the file index.

## Commands

Run from this `client/` directory.

```powershell
npm install
npm run dev          # Vite dev server
npm run lint         # ESLint
npm run build        # runs the legal placeholder check, then builds to dist/
npm run check:legal  # placeholder check only
npm run preview      # preview the production build
```

## What is here

- Landing, demo-mode auth, draft legal pages, and an individual demo workspace (Home, Projects, Tasks, Library, Insights, Account, Help).
- Everything runs on placeholder data in the browser. Nothing is saved, and there is no backend connection.
- Routes are handled by a small history-API router (`src/app/router.js`) and a route table in `src/App.jsx`; each route group is its own lazy chunk.

## Conventions

- Plain JavaScript and JSX, flat colour, Fredoka, Lucide icons, 12px minimum text.
- Motion uses GSAP (and Lenis on the landing page only) and respects `prefers-reduced-motion`.
- The Help page and the legal pages render Markdown from `../docs/` using `?raw` imports and `src/lib/markdown.jsx`.
- Plans live in `../docs/plan/frontend/`.
