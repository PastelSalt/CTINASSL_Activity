# PLAN-A-03 — Tsumugi Sign-up and Login Pages

## Plan status

**Status:** Static authentication-page pass implemented; backend authentication and legal review pending  
**Scope:** Static sign-up and login page design, content, navigation, and implementation preparation  
**Related plans:** [PLAN-A-01.md](PLAN-A-01.md), [PLAN-A-02.md](PLAN-A-02.md)  
**Source specification:** [PROJECT-SPECS.md](PROJECT-SPECS.md)

This plan covers the future public sign-up and login pages for Tsumugi. It defines their visual and interaction direction without implementing authentication, sessions, API calls, password handling, account creation, or backend behavior.

The supplied Google sign-in and account-creation references are being used for layout principles only: restrained page chrome, a focused centered card, clear form hierarchy, progressive disclosure on login, a two-column registration composition on wide screens, and a compact utility/legal footer. Google branding, logos, colors, illustrations, copy, and proprietary assets must not be copied.

## Goals

- [x] Create a welcoming, trustworthy sign-up page for new Tsumugi users.
- [x] Create a focused, reassuring login page for returning users.
- [x] Adapt the established Tsumugi landing and policy-page visual system.
- [x] Link both pages from the landing page's navigation, hero, CTA, and footer surfaces where appropriate.
- [x] Link the legal pages from both authentication pages.
- [x] Keep all authentication controls and states explicit until real backend behavior exists.
- [x] Preserve accessibility, responsive behavior, reduced-motion support, and the static-page boundary.

## Google layout study translated for Tsumugi

- [x] Use a quiet, pale page canvas with one dominant centered authentication surface rather than an immersive landing-page composition.
- [x] Keep the authentication surface wide enough for comfortable desktop spacing but constrained enough to maintain focus.
- [x] Place Tsumugi branding at the upper-left of the card or page shell, with the product name and a small Moeko Works context line.
- [x] Use a large, plain-language heading, one short supporting sentence, and generous whitespace before the first field.
- [x] Keep primary actions visually clear and aligned to the form's lower action row.
- [x] Use compact secondary links near the action row, including the route switch and recovery link where applicable.
- [x] Keep utility/legal links in a quiet footer below the card, adapting Google's language/help/privacy/terms grouping into Tsumugi's policy links.
- [x] Do not reproduce Google's blue color system, multicolor logo, exact proportions, exact text, account illustrations, or visual identity.

### Login layout direction

- [x] Use a single-column focused card on desktop and mobile.
- [ ] Use progressive disclosure as the preferred interaction model:
  - [ ] Initial state requests email address only.
  - [ ] A future functional flow may reveal password and account actions after email continuation.
  - [ ] The static implementation may show the complete email/password presentation if progressive behavior would imply unsupported authentication logic.
- [x] Present `Forgot password?` as a compact supporting link below or beside the email/password area.
- [ ] Place `Not your computer?`-style guidance only if Tsumugi has a real guest/private-session concept; otherwise replace it with a truthful static security note.
- [x] Keep the route switch and `Log in` action in one visually stable lower action row.
- [x] Keep the legal footer outside the primary card so it remains available without distracting from sign-in.

### Sign-up layout direction

- [x] Use a two-column desktop card inspired by the supplied account-creation reference:
  - [ ] Left column: form heading, name/email/password fields, agreement language, and primary action.
  - [ ] Right column: a Tsumugi-specific static illustration or thread composition explaining the product value.
- [x] Collapse to one column on narrow screens, placing the product-value illustration after the form or hiding it when it harms focus.
- [ ] Keep the sign-up form visually denser than login while preserving generous field spacing and clear grouping.
- [x] Use a Tsumugi thread/objective-to-deliverable visual rather than a copied account-security illustration.
- [x] Keep the sign-up action row aligned with the login page's action language and route-switch pattern.

### Shared responsive behavior

- [x] Desktop target: centered card with stable maximum width, balanced outer whitespace, and no unnecessary page scrolling.
- [x] Tablet target: reduce card padding and illustration scale while preserving the two-column sign-up hierarchy where space allows.
- [x] Mobile target: full-width card within a narrow page gutter, one-column forms, wrapped footer links, and no horizontal overflow.
- [x] Keep the brand/header and legal footer readable at 320px minimum width.
- [x] Use no gradients; solid paper, pastel, and ink surfaces should carry the visual hierarchy.
- [x] Keep any motion limited to subtle card/illustration entrance and focus orientation; disable non-essential motion for reduced-motion users.

## Planned routes

| Route | Purpose |
| --- | --- |
| `/register` | Create-account / sign-up page |
| `/login` | Returning-user login page |
| `/forgot-password` | Existing planned route; remain a future recovery flow unless separately planned |
| `/reset-password` | Existing planned route; remain a future recovery flow unless separately planned |

## Shared page direction

- [x] Use the Tsumugi identity, Fredoka typography, paper background, woven pattern, solid ink outlines, and pastel accents.
- [x] Use a compact branded header with a link back to the landing page.
- [x] Use a centered, readable form card with strong outline, soft solid-color depth, and no gradients.
- [x] Provide a short product-oriented message without overpromising implemented functionality.
- [x] Keep the form area visually calm and more focused than the immersive landing page.
- [ ] Provide a secondary route switch:
  - [ ] Sign-up page links to `/login` for existing users.
  - [ ] Login page links to `/register` for new users.
- [x] Include a visible static draft/presentation notice until real authentication is implemented.
- [x] Include the legal policy links:
  - [x] `/privacy-policy`
  - [x] `/terms-of-service`
  - [x] `/cookie-and-local-storage-policy`
- [x] Ensure policy links remain available below or adjacent to the form without competing with the primary action.
- [ ] Adapt the footer grouping from the reference layout into `Privacy Policy`, `Terms of Service`, and `Cookie & Local Storage Policy`.
- [ ] Add a clear `Back to Tsumugi` or brand link that returns to `/`.

## Sign-up page

- [ ] Use a clear title such as `Start your next thread`.
- [ ] Explain that the page is for creating a Tsumugi workspace account.
- [ ] Use the Google-style compact field grouping as inspiration, while retaining Tsumugi's stronger outlines, Fredoka typography, and thread motif.
- [ ] Plan fields for:
  - [ ] Name or display name
  - [ ] Email address
  - [ ] Password
  - [ ] Password confirmation
- [ ] Add an explicit agreement control for the Terms of Service and Privacy Policy before real account creation is enabled.
- [ ] Link the Cookie & Local Storage Policy where browser-storage disclosure is relevant.
- [ ] Plan validation states for missing, malformed, mismatched, weak, or already-used values.
- [ ] Plan a clear success, pending-verification, and failure state without implementing them in this static pass.
- [ ] Keep `Create account` as the primary action label.

## Login page

- [ ] Use a clear title such as `Welcome back to the thread`.
- [ ] Use the Google-style single-step focus and quiet supporting copy as inspiration, while keeping Tsumugi-specific wording and visuals.
- [ ] Plan fields for:
  - [ ] Email address
  - [ ] Password
- [x] Add a `Forgot password?` reference to `/forgot-password` as a planned recovery route.
- [ ] Plan a remember-session option only after the cookie/session behavior is defined.
- [ ] Plan invalid-credentials, locked-account, unavailable-service, and success states.
- [ ] Keep `Log in` as the primary action label.
- [ ] Provide a visible route to `/register` for users without an account.

## Landing-page integration

- [ ] Replace presentation-only `Log in` controls with links to `/login`.
- [ ] Replace presentation-only `Create account` or `Create your workspace` controls with links to `/register`.
- [ ] Update the floating navigation, hero actions, closing CTA, and footer consistently.
- [ ] Match the authentication pages' compact action language with the landing-page CTA hierarchy.
- [ ] Preserve the current landing-page story and avoid making authentication calls before implementation is authorized.
- [ ] Keep legal links in the landing-page footer pointing to the three policy routes.
- [ ] Verify keyboard focus, link labels, responsive wrapping, and no horizontal overflow after integration.

## Accessibility and security preparation

- [ ] Use real labels associated with every form control.
- [ ] Use appropriate input types, autocomplete tokens, and password visibility guidance.
- [ ] Provide error text that is connected to its field and does not rely on color alone.
- [ ] Preserve visible `:focus-visible` states and logical keyboard order.
- [ ] Ensure the page works at mobile and desktop widths without clipping.
- [ ] Respect `prefers-reduced-motion` and never hide form controls or legal notices behind animation.
- [ ] Do not log, expose, or persist passwords in the static implementation.
- [ ] Defer CSRF, rate limiting, session storage, email verification, password hashing, and account recovery implementation to the backend/authentication plan.

## Implementation sequence

- [ ] Confirm the sign-up and login copy, fields, legal-consent wording, and owner-approved visual direction.
- [ ] Confirm the Google-inspired layout adaptation, including single-column login, two-column desktop sign-up, progressive-disclosure decision, and utility footer.
- [ ] Decide whether shared authentication form components belong under `client/src/components/` or `client/src/pages/`.
- [x] Create shared auth-page layout and route entry components.
- [x] Create `/register` and `/login` static pages.
- [x] Add landing-page route links and preserve legal-page references.
- [ ] Add static validation and status examples only if they are clearly labeled as presentation states.
- [x] Add branded metadata and responsive/reduced-motion styling.
- [x] Validate headings, labels, keyboard navigation, focus states, route links, mobile wrapping, contrast, and overflow.
- [ ] Update `README.md`, `CODEMAP.md`, and `LOG.md`.

## Exclusions

- [ ] No user registration or login API calls.
- [ ] No session, token, cookie, or local-storage authentication behavior.
- [ ] No password transmission, hashing, reset, verification, or recovery implementation.
- [ ] No account database, authorization middleware, or protected-route behavior.
- [x] No claim that an account has been created or authenticated from a static button.
- [x] No use of Google logos, trademarks, copied illustrations, copied text, or exact visual identity.

## Approval gate

- [ ] Owner approves the page structure, copy, fields, and legal-consent presentation.
- [ ] Owner approves the Google-inspired layout adaptation and Tsumugi-specific visual translation.
- [ ] Legal review confirms the agreement and policy-link language.
- [ ] Product implementation confirms the future authentication behavior and data practices.
- [x] Execution is authorized before auth-page frontend code is added.
