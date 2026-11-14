# PLAN-A-02 — Tsumugi Legal Policy Pages (Revision 2)

## Plan status

**Revision:** 2 — audit-driven re-plan  
**Status:** Revision 2 implemented (see section 12); legal and owner review of the content is still pending  
**Scope:** Three standalone policy pages: Privacy Policy, Terms of Service, Cookie & Local Storage Policy  
**Related plans:** [PLAN-A-01](PLAN-A-01.md) (shared public layout, metadata, performance) · [PLAN-A-03](PLAN-A-03.md) · [PLAN-A-04](PLAN-A-04.md)  
**Source drafts:** [privacy-policy.md](../../privacy-policy.md), [terms-of-service.md](../../terms-of-service.md), [cookie-and-local-storage-policy.md](../../cookie-and-local-storage-policy.md)  
**Constraint:** Frontend only. This plan does not finalize legal language, choose a jurisdiction, or implement consent, cookies, analytics, or storage.

## 1. Audit of the current pages

| # | Finding | Evidence | Fix |
|---|---|---|---|
| P1 | **Two sources of truth.** The Markdown drafts in `docs/` and the page text in `policyPages.js` are separate; the page text is a shortened rewrite (one paragraph per section). | `docs/*.md` vs `client/src/pages/legal/policyPages.js` | Render the page from the Markdown source (section 3) |
| P2 | **Hard to navigate.** Seven to ten numbered sections in one long column; no table of contents, no section anchors, no link to share a section. | `/privacy-policy` | Sticky contents list + heading anchors |
| P3 | **Draft status crowds the header.** The "Planning draft" pill sits against the eyebrow on the same line and wraps awkwardly on narrow screens. | Screenshot of `/privacy-policy` | Full-width draft banner above the title |
| P4 | **Placeholders can ship by accident.** `[YYYY-MM-DD]` and bracketed items are plain text; nothing blocks a production build. | `PolicyPage.jsx`, drafts | Build-time placeholder check (section 5) |
| P5 | **Duplicate footers.** The policy page defines its own footer and policy switcher separate from landing and auth footers. | `PolicyPage.jsx` | Shared `PublicFooter` (PLAN-A-01 §5) + in-document "Other policies" links |
| P6 | **Reading experience is basic.** Body text is small relative to the heading scale, there is no print style, and no "last updated" or version marker beyond the placeholder. | Screenshot, `index.css` | Document typography spec (section 4) |
| P7 | **Cookie policy accuracy risk.** The cookie/local-storage statement must match what the client actually stores; today that is nothing, and the planned workspace settings must not change that silently. | PLAN-A-04K | Storage inventory table (section 5) |

## 2. Goals

- [x] Three accessible policy pages in the Tsumugi visual language (implemented in Revision 1).
- [x] One source of truth per policy; pages cannot drift from the reviewed documents.
- [x] A reading experience suited to long documents: contents list, anchors, readable measure, print style.
- [x] A clear, honest draft state that cannot be mistaken for binding terms, and a safe path to switch to "published".
- [ ] Owner and qualified legal review before publication.

## 3. Content architecture

- [x] Import each policy's Markdown with Vite's `?raw` suffix and render it with the small shared Markdown renderer (the same one planned for the workspace document reader, PLAN-A-04I). No new runtime dependency beyond that renderer.
- [x] Policy metadata (title, label, description, effective date, version, status) lives in front matter or a small `legalMeta.js` — not in components.
- [x] A single `LEGAL_STATUS` setting (`draft` | `published`) controls the banner, the `noindex` robots directive, and the placeholder check.
- [x] Each policy page is its own lazy-loaded chunk; the Markdown is not bundled into the landing page.
- [x] Keep the existing route paths: `/privacy-policy`, `/terms-of-service`, `/cookie-and-local-storage-policy`.

## 4. Page design

```text
Compact public header: brand · Back to home
┌ Draft banner (full width, own row) ───────────────────────────────┐
│ ⚠ Planning draft — not yet approved for publication or legal advice │
└───────────────────────────────────────────────────────────────────┘
┌ Contents (sticky ≥1024px) ┐ ┌ Document (≤ 72ch) ───────────────────┐
│ 1 Who this applies to      │ │ Eyebrow · Title · Description         │
│ 2 Information we collect   │ │ Version · Effective date · Updated    │
│ …                          │ │ ## 1 Heading  (anchor link on hover)  │
│ Other policies ▸           │ │ Body 16–17px, 1.65 line height        │
└────────────────────────────┘ └───────────────────────────────────────┘
Footer: shared PublicFooter
```

- [x] Banner uses icon + text, sits on its own row, and wraps cleanly at 320px.
- [x] Contents list is generated from the document headings; the current section is marked with `aria-current`; below 1024px it becomes a collapsible "On this page" disclosure above the document.
- [x] Headings have stable slug anchors with a visible, keyboard-focusable "link to section" control.
- [x] Reading measure ≤ 72ch; body 16px minimum (17px at ≥ 1024px); tables scroll inside their own container.
- [x] `Last updated` and `Version` shown beside the effective date; unresolved dates render as `To be confirmed` in draft state rather than raw `[YYYY-MM-DD]`.
- [x] Print stylesheet: hide header, contents, and footer chrome; black on white; show URLs for links.
- [x] "Other policies" block with the two sibling documents (replaces the footer switcher inside the page).
- [x] No decorative motion; woven background stays low contrast behind the paper surface.
- [x] One `h1`, ordered headings, landmarks (`header`, `nav`, `main`, `article`), skip link, visible focus.

## 5. Publishing safeguards

- [x] **Placeholder check:** a build-time script scans policy sources for bracketed placeholders (`[` … `]`), `TBD`, and `[YYYY-MM-DD]`; it warns in draft and **fails the build when `LEGAL_STATUS = published`**.
- [x] **Storage inventory:** the Cookie & Local Storage page includes a table (Name · Purpose · Duration · Category) that must match what the client actually writes. Current inventory: none. Any later feature that stores data (for example workspace preferences) must update this table in the same change.
- [ ] Compare every statement with implemented systems (authentication, storage, hosting, analytics, support) before publication.
- [ ] Confirm operator name, contact address, privacy contact, effective date, update process, and jurisdiction; replace every bracketed placeholder.
- [x] While in draft: `noindex`, visible banner, and no claim that the documents are legal advice or binding.
- [ ] Obtain qualified legal review of liability, indemnity, dispute, arbitration, and rights language.

## 6. Policy content requirements (unchanged scope)

- **Privacy Policy / Privacy Notice:** scope, data categories, purposes, sharing, retention, security, rights, children, changes, contact.
- **Terms of Service / Terms and Conditions:** agreement, eligibility, accounts, user content, acceptable use, intellectual property, third parties, availability, limitations, termination, disputes, changes, contact.
- **Cookie & Local Storage Policy:** categories of technology described without claiming undeployed technologies are active; storage inventory table; how to manage browser storage.

## 7. Performance

- [ ] Legal routes load only the shared shell, the policy chunk, and the primary font weights — no GSAP, no landing code.
- [x] Legal route adds ≈ 9 kB gzip on the shared runtime; no GSAP, no landing code. (Layout shift on font swap not yet measured.)
- [ ] Documents render without client-side data fetching.

## 8. Implementation phases

- [x] **Phase 1:** Markdown-sourced rendering, `legalMeta`, `LEGAL_STATUS`, lazy route chunks.
- [x] **Phase 2:** Document layout (banner, contents, anchors, typography, print), shared `PublicFooter`.
- [x] **Phase 3:** Placeholder check script and storage inventory table.
- [ ] **Phase 4:** QA at 320/390/768/1024/1440, keyboard and screen-reader pass, print preview; update `README.md`, `CODEMAP.md`, `LOG.md`.

## 9. Acceptance checklist

- [x] Page text comes from the Markdown source; editing the source changes the page.
- [x] Contents list and anchors work with keyboard; headings are unique.
- [x] Draft banner is on its own row at every width; `noindex` is present in draft.
- [x] Build warns on placeholders in draft and fails on them when published.
- [ ] Cookie page's storage inventory matches the client's actual storage (currently none).
- [ ] No horizontal overflow at 320px; print preview is clean.

## 10. Baseline already built (Revision 1)

Three route-selected policy pages with shared shell, branded header, readable document column, draft notice, footer policy switcher, landing-page links to routes, metadata, and reduced-motion-safe styling.

## 11. Approval gate

- [x] Owner authorized the Revision 1 page structure and visual adaptation.
- [ ] Owner approves the Revision 2 content architecture and layout (sections 3–5).
- [ ] Qualified legal reviewer approves the final policy language.
- [ ] Product implementation confirms the described data practices.

## 12. Implementation status — 2026-11-14

| Item | Result |
|---|---|
| Markdown is the single source | Done: pages import `docs/*.md` with `?raw` and render via `lib/markdown.jsx` (no new dependency); `policyPages.js` removed. Vite dev server allows `..` for this |
| `legalMeta.js` with `LEGAL_STATUS` and per-document labels | Done; `draft` drives banner, `noindex`, and build check |
| Draft banner on its own row | Done |
| Contents list, section anchors, active-section marker | Done; sticky at ≥1024px, collapsible "On this page" below |
| Typography and print stylesheet | Done (72ch measure, 16px body; print hides chrome and shows external URLs) |
| "To be confirmed" for unresolved effective date and contact in the header block | Done; placeholders in the body are highlighted |
| Storage inventory table | Done on the Cookie page; inventory is empty ("None") and lives in `legalMeta.js` |
| Placeholder check | Done: `npm run check:legal` runs before `build`; currently warns for 14 placeholders in draft |
| Shared footer and "Other policies" links | Done |

**Not done:** legal review and publication, measuring font-swap layout shift, screen-reader pass.

## 13. Motion and visual pass — 2026-11-14

The landing and auth motion language now also runs on the legal pages, kept deliberately quiet for reading. Frontend only; document content, anchors, find-in-page, and printing are unchanged.

- **Background:** drifting pastel orbs and a drawn thread behind the document (shared `page-bg` styles in `motion.css`, now also used by the auth pages).
- **Entrance:** header drops in, banner, contents list, and document card rise, the title reveals word by word, then the description and meta; 4 s failsafe on a plain timer.
- **Reading progress:** a thin pink bar along the top edge fills as you scroll.
- **Sections:** each section eases in once as it approaches; a `beforeprint` handler restores everything, and print hides the bar, background, and cursor.
- **Small touches:** contents links nudge on hover, section anchor icons tilt, soft cursor ring on fine pointers.
- **Not added on purpose:** smooth scrolling, pinning, and parallax scrub, so anchors, find-in-page, and long reading stay native.
- Under `prefers-reduced-motion` nothing runs and the progress bar is hidden.

Verified at 1366x728 via DOM probes: word gaps correct, no overflow, no console errors, and with the animation ticker deliberately idle the failsafe still reveals the document. **Not verified live:** section reveals and the progress bar (the browser pane stopped rendering frames during testing), Safari, a real print preview, reduced motion in a real browser.
