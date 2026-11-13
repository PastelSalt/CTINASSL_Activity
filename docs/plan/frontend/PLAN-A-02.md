# PLAN-A-02 — Tsumugi Legal Policy Pages

## Plan status

**Status:** Implemented static policy-page pass — legal/content review pending  
**Scope:** Three responsive static policy pages adapted from the Tsumugi landing-page design  
**Source drafts:** [docs/](docs/)  
**Related plan:** [PLAN-A-01.md](PLAN-A-01.md)

This plan covers the future creation of standalone pages for the Privacy Policy, Terms of Service, and Cookie & Local Storage Policy. It does not finalize legal language, select jurisdiction, create consent tooling, or implement authentication, analytics, cookies, or local-storage behavior.

## Goals

- [x] Create three readable, accessible policy pages using the Tsumugi visual language.
- [x] Preserve the landing page's Fredoka typography, paper background, woven pattern, solid outlines, pastel accents, and Moeko Works branding.
- [x] Make each policy page usable independently from the landing page and easy to return from.
- [ ] Keep legal content accurate to the deployed product rather than the planning drafts.
- [ ] Obtain owner and qualified legal review before publication.

## Planned pages

### Privacy Policy

- [x] Use `Privacy Policy` as the primary title and retain `Privacy Notice` in the page label.
- [x] Adapt the draft at [docs/privacy-policy.md](docs/privacy-policy.md).
- [x] Include scope, data categories, purposes, sharing, retention, security, rights, children, changes, and contact guidance.
- [ ] Replace all bracketed placeholders after confirming actual data practices and jurisdictions.

### Terms of Service

- [x] Use `Terms of Service` as the primary title and retain `Terms and Conditions` in the page label.
- [x] Adapt the draft at [docs/terms-of-service.md](docs/terms-of-service.md).
- [x] Include agreement, eligibility, accounts, user content, acceptable use, intellectual property, third parties, availability, limitations, termination, disputes, changes, and contact guidance.
- [ ] Obtain jurisdiction-specific legal review before publishing liability, indemnity, dispute, or arbitration language.

### Cookie & Local Storage Policy

- [x] Use `Cookie & Local Storage Policy` as the primary title.
- [x] Adapt the draft at [docs/cookie-and-local-storage-policy.md](docs/cookie-and-local-storage-policy.md).
- [x] Describe the planned technology categories without claiming undeployed technologies are active.
- [x] Keep the current static landing-page statement accurate until cookies, analytics, authentication, or browser storage are implemented.

## Shared page design

- [x] Add a compact branded header with Tsumugi identity, Moeko Works context, and a return-to-home link.
- [x] Use a centered, readable document column with strong ink outline and paper surface.
- [x] Keep the woven background subtle and behind content without reducing text contrast.
- [x] Add a visible document label, title, and proposed effective-date metadata.
- [x] Use semantic `main`, `article`, `header`, `nav`, and heading structure.
- [x] Keep links and headings keyboard accessible with the existing visible focus treatment.
- [x] Add a footer policy switcher linking all three documents and the landing page.
- [x] Provide responsive wrapping and comfortable reading widths on mobile and desktop.
- [x] Preserve reduced-motion stability; no decorative policy-page animation was added.
- [x] Do not use gradients, aggressive parallax, or decorative motion that competes with legal reading.

## Content and publishing safeguards

- [ ] Remove or resolve every bracketed placeholder before publication.
- [ ] Confirm the operator name, contact address, privacy contact, effective date, update process, and jurisdiction.
- [ ] Compare every statement with the implemented authentication, storage, hosting, analytics, cookie, local-storage, and support systems.
- [x] Add a clear draft/review state while documents are not approved.
- [x] Confirm that policy links from the landing page resolve to the page routes.
- [ ] Do not present drafts as legal advice or binding terms.

## Implementation sequence

- [x] Confirm the page-routing approach for the current Vite static client.
- [x] Represent the reviewed-draft page content as route-selected page data/components while retaining Markdown source drafts.
- [x] Build the shared policy-page shell and policy navigation.
- [x] Create the three policy pages from the planning content.
- [x] Add responsive styles, metadata, focus states, and reduced-motion-compatible behavior.
- [x] Replace the landing-page draft-file references with website routes.
- [x] Validate navigation, headings, link targets, mobile wrapping, contrast, overflow, and browser rendering.
- [x] Update `README.md`, `CODEMAP.md`, and `LOG.md`.
- [x] Keep policy route data and shared page rendering outside `App.jsx` under `client/src/pages/` for maintainability.
- [x] Give each policy route its own page entry component while sharing the common policy shell.

## Approval gate

- [x] Owner authorizes the page structure and visual adaptation for this implementation pass.
- [ ] Qualified legal reviewer approves the final policy language.
- [ ] Product implementation confirms the described data practices.
- [x] Execution is authorized before policy-page frontend code is added.
