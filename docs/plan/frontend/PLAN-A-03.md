# PLAN-A-03 — Tsumugi Sign-up, Login, and Recovery Pages (Revision 2)

## Plan status

**Revision:** 2 — audit-driven re-plan  
**Status:** Revision 2 implemented (see section 14); backend authentication remains out of scope  
**Scope:** Static, presentation-only `/register`, `/login`, `/forgot-password`, and `/reset-password` pages  
**Related plans:** [PLAN-A-01](PLAN-A-01.md) (shared public layout, performance) · [PLAN-A-02](PLAN-A-02.md) · [PLAN-A-04](PLAN-A-04.md) (preview-only action pattern, state previewer)  
**Constraint:** Frontend only. No sessions, tokens, cookies, local storage, API calls, password handling, or account creation. Nothing the user types is read, stored, logged, or sent.

Layout principles from the earlier Google-style references still apply (focused centered card, clear hierarchy, quiet utility footer); no Google branding, copy, colors, or assets are used.

## 1. Audit of the current pages

| # | Finding | Evidence | Fix |
|---|---|---|---|
| A1 | **Dead link.** Login links to `/forgot-password`, but no such route exists; unknown paths render the landing page. | `authRoutes`, `App.jsx` | Build static recovery pages and a Not Found route |
| A2 | **Dead primary action on Register.** `Create account` is a `type="button"` with no behavior and no feedback. | `AuthPage.jsx` | Preview-only dialog that routes to the demo workspace |
| A3 | **Login ignores the form.** `Log in` is a link to `/dashboard`; email and password fields are editable but unused, so users may type a real password into a non-functional field. | `AuthPage.jsx` | Demo-mode treatment (section 3) |
| A4 | **Draft notice is cramped.** The "Static presentation" pill sits on the same line as the eyebrow and wraps awkwardly at narrow widths. | Screenshot of `/register` | Full-width demo banner inside the card |
| A5 | **Plan is stale.** Many items are built but unchecked (fields, route switch, back link, landing links); others were never decided (progressive disclosure, "Not your computer?"). | PLAN-A-03 Rev 1 | Decisions recorded in section 2 |
| A6 | **Validation and status states do not exist** (missing, malformed, mismatch, weak password, invalid credentials, locked, unavailable, pending verification, success). | Page code | Previewable presentation states (section 5) |
| A7 | **Duplicated shell.** Header and legal footer are re-implemented per page. | `AuthPage.jsx` | Shared `PublicHeader` / `PublicFooter` (PLAN-A-01 §5) |
| A8 | **Form pieces are local.** Inputs, password toggle, and checkbox are inline JSX and cannot be reused by Settings (PLAN-A-04K). | `AuthPage.jsx` | Shared form components |
| A9 | **Heavy for a form.** Auth pages ship the whole 467 kB client bundle, including GSAP. | `vite build` | Lazy auth chunk, no GSAP (PLAN-A-04 §16) |

## 2. Decisions recorded

- **Single-step login** (email + password on one screen). Progressive disclosure is declined: it implies account-lookup logic that does not exist.
- **No "Not your computer?" or remember-me controls** until real session behavior exists; a truthful security note replaces them.
- **Demo mode is explicit.** Authentication is simulated: entering the demo workspace requires no credentials.
- **Static recovery pages are built** (`/forgot-password`, `/reset-password`) so no link is dead; both are preview-only.
- **Two layouts:** login and recovery are single-column cards; register is two columns at ≥ 900px with the thread illustration after the form on narrow screens (hidden below 480px if it pushes the form down).

## 3. Demo-mode behavior (frontend-only)

- [x] Every auth card shows a **demo banner** on its own row: icon + "Demo mode — nothing is sent or saved. You can continue without entering details."
- [x] Fields remain for layout evaluation, are optional, and carry help text "Don't enter a real password — this demo does not receive it." The form's submit handler never reads field values.
- [x] **Login:** primary `Log in` submits and navigates to `/home`; secondary `Continue as demo user` does the same without touching the form.
- [x] **Register:** primary `Create account` opens a **Preview dialog** (PLAN-A-04 §9): "Account creation isn't connected yet", with `Continue to demo workspace` and `Close`. No success message claims an account exists.
- [x] **Forgot password:** `Send reset link` opens a preview dialog explaining that no email is sent; the page's success layout is available through the state previewer.
- [x] `autocomplete` tokens stay correct (`username`/`email`, `current-password`, `new-password`) so the layout is evaluated realistically; inputs are `spellcheck="false"` and `autocapitalize="none"` where relevant.
- [x] No `localStorage`, `sessionStorage`, cookies, or query strings carry any entered value.

## 4. Routes

| Route | Purpose | Layout |
|---|---|---|
| `/login` | Returning user | Single column card |
| `/register` | New user | Two-column card ≥ 900px |
| `/forgot-password` | Request recovery link (preview) | Single column card |
| `/reset-password` | Set a new password (preview) | Single column card |
| `*` | Not Found (PLAN-A-01 §5) | Public layout |

Cross-links: login ↔ register in the action row; `Forgot password?` under the password field; every page has `Back to home` and the shared legal footer.

## 5. Form and state design

### Shared form components (`components/forms/`, reused by Settings)

`TextField`, `PasswordField` (show/hide, caps-lock hint, optional strength meter), `Checkbox`, `FormBanner` (info/success/error with icon + text), `FieldError`, `SubmitRow`, `PreviewDialog`. Labels are programmatically associated; errors use `aria-describedby`; banners use `role="status"` or `role="alert"` appropriately; the error summary receives focus after a failed submit.

### Presentation states (previewable, never real)

States are reachable through the shared preview-state hook (`?preview=<state>`), the same mechanism as the workspace state previewer, and are excluded from production builds or hidden unless demo mode is on.

| Page | States |
|---|---|
| Login | Default · Field errors (missing email, malformed email, missing password) · Invalid credentials · Locked account · Service unavailable |
| Register | Default · Field errors (missing name, malformed email, weak password, mismatch, terms not accepted, email already used) · Pending email verification · Success layout |
| Forgot password | Default · Malformed email · "If an account exists, a link was sent" confirmation · Service unavailable |
| Reset password | Default · Weak password · Mismatch · Expired link · Success layout |

Error text states the problem and the fix, is attached to its field, and uses icon + text (not color alone). The password requirements checklist and strength meter are computed locally and never stored.

## 6. Visual and responsive spec

- Quiet canvas with one dominant card (max-width 440px login/recovery, 880px register); Fredoka, solid paper surface, ink outline, no gradients.
- Brand and `Back to home` in the compact `PublicHeader`; legal links in `PublicFooter` below the card.
- Primary action in the lower action row, with route switch on the left; 48px control height; labels above inputs (never placeholder-only).
- Motion limited to a subtle card entrance via CSS; no GSAP on auth routes; disabled under `prefers-reduced-motion`.
- Breakpoints: ≥ 900px two-column register; < 900px single column with illustration after the form; < 480px illustration hidden and card padding reduced; verified at 320px.
- Keep the whole login card within one 390×720 viewport without scrolling.

## 7. Accessibility and security preparation

- [ ] Visible `:focus-visible`, logical order, 40px+ touch targets, visible labels, error association.
- [ ] Password visibility toggle exposes `aria-pressed` and a clear label; password fields never auto-reveal.
- [x] Terms checkbox links to Terms and Privacy; Cookie & Local Storage Policy linked in the footer.
- [x] Page titles via `usePageMeta`; auth routes are `noindex`.
- [ ] Defer to the backend plan: CSRF, rate limiting, session storage, email verification, password hashing, recovery tokens, lockout logic, secure cookies.
- [ ] The static pages must not log, persist, or transmit any entered value (verified by code review and network panel check).

## 8. Landing and workspace integration

- [x] Landing `Log in` → `/login`; `Create your workspace` and `Create account` → `/register` (implemented; verify consistency across header, hero, closing, footer).
- [x] Login's `Log in` / `Continue as demo user` → `/home`; workspace account menu `Back to landing page` → `/`.
- [x] Auth pages never imply a signed-in state; the workspace states "sample data, nothing is saved" in its account menu (PLAN-A-04).

## 9. Implementation phases

- [x] **Phase 1:** shared public layout, Not Found, lazy auth chunk, form components.
- [x] **Phase 2:** demo-mode treatment, dialogs, login and register refinement, demo banner placement.
- [x] **Phase 3:** forgot-password and reset-password pages.
- [x] **Phase 4:** presentation states and previewer, validation copy.
- [ ] **Phase 5:** QA (320/390/768/900/1440, keyboard, screen-reader labels, reduced motion, network panel shows no auth requests), then update `README.md`, `CODEMAP.md`, `LOG.md`.

## 10. Acceptance checklist

- [ ] No dead links or dead primary buttons on any auth route.
- [ ] Demo banner is on its own row and readable at 320px.
- [x] No page reads, stores, or sends typed values; none claims an account exists.
- [x] Every listed state is previewable and uses icon + text.
- [x] Auth route adds ≈ 15 kB gzip on the 71 kB shared runtime (total ≈ 86 kB vs 142 kB before); no GSAP loaded.
- [ ] Keyboard-only completion of every page; errors announced to assistive technology.

## 11. Exclusions

- No registration/login API calls, tokens, cookies, local-storage authentication, or protected-route behavior.
- No password transmission, hashing, reset, verification, or recovery implementation.
- No account database or authorization middleware.
- No Google logos, trademarks, copied illustrations, copied text, or exact visual identity.

## 12. Baseline already built (Revision 1)

`/login` and `/register` pages with shared auth layout, display-name/email/password/confirm fields, password visibility toggle, terms checkbox, route switch, `Forgot password?` link, thread illustration on register, legal footer, branded titles, responsive and reduced-motion styling, and landing-page links.

## 13. Approval gate

- [x] Owner authorized the Revision 1 static auth pages.
- [ ] Owner approves demo-mode behavior and the static recovery pages (sections 2–4).
- [ ] Owner approves the presentation-state list (section 5).
- [ ] Legal review confirms the agreement and policy-link language.
- [ ] Product implementation confirms future authentication behavior and data practices.

## 14. Implementation status — 2026-11-14

| Item | Result |
|---|---|
| Shared public layout and `AuthShell` | Done |
| Demo banner on its own row in every auth card | Done |
| Login: `Log in` and `Continue as demo user` both go to `/home` (was `/dashboard` before PLAN-A-04 Revision 3); submit handler never reads values | Done |
| Register: `Create account` opens a preview dialog (native `<dialog>`) with `Continue to demo workspace` | Done |
| `/forgot-password` and `/reset-password` static pages | Done; no dead links remain |
| Not Found route | Done |
| Shared form components (`TextField`, `PasswordField` with caps-lock hint and requirements list, `Checkbox`, `FormBanner`, `StatusPanel`, `PreviewDialog`) | Done in `components/forms/` |
| Presentation states via `?preview=` with a collapsible "Preview states (demo)" list | Done for login, register, forgot, reset; error banners take focus |
| Lazy auth chunk, no GSAP | Done |
| No storage or network use by auth pages | Verified in code; no `fetch`, storage, or cookie calls |

**Notes:** the password requirements checklist reads the typed value in local component state only to tick rules; it is never stored or sent. Success and pending layouts are previews, not results.

**Not done:** screen-reader pass, network-panel capture, legal review of consent wording.

## 15. Motion and visual pass — 2026-11-14

The landing-page motion language now also runs on the authentication pages (frontend only; nothing typed is read or stored).

- **Illustrated side panel** on login and register (two columns from 900px; below the form under 900px; hidden under 480px): a small workspace window with sample rows, floating status chips, and a drawn thread, with pointer parallax. Recovery pages stay single column.
- **Background:** flat pastel orbs that drift and a thread that draws behind the card.
- **Entrance:** header drops in, card rises with a springy settle, the heading reveals word by word, then banner, fields, and actions stagger in; a 4 s failsafe forces the end state.
- **Pointer only:** soft cursor ring and magnetic action buttons (fine pointers, reduced motion off).
- **Micro-interactions (CSS):** field lift and label colour on focus, error banner shake, field errors drop in, success icon and met password rules pop, preview dialog springs in. All disabled under reduced motion.
- **Shared code:** `Words` and `Depth` (components/motion), `motion.css`, and `lib/pointerFx.js` are shared with the landing page; `pages/auth/authMotion.js` owns the auth entrance.

Verified at 1366x728 and 375x800 through DOM probes: intro completes, word gaps correct, art matches the form column height, 5 field errors with the shake animation, success state and demo link still work, no overflow, no console errors. Not verified: real-device feel, Safari, reduced motion in a real browser, screen-reader pass.
