# PLAN-A-04 — Tsumugi Individual Workspace: Structure and UI Plan (Revision 3)

## Plan status

**Revision:** 3 — restructure for a calm, individual-first workspace. Supersedes Revision 2 (shell, shared components, and visual system from Revision 2 stay unless this plan changes them)  
**Status:** Planning only. The Revision 2 workspace is implemented and is the baseline to be changed. **Breaking changes to routes, data shapes, and page structure are authorized** (owner permission, 2026-11-14)  
**Scope:** Frontend only: information architecture, page structure, vocabulary, fixtures, shared components, and motion for the authenticated workspace  
**Evidence:** [RESEARCH.md](../../../RESEARCH.md) (diagnosis D1–D9, tool review, overall findings in its section 11)  
**Related plans:** [PLAN-A-01](PLAN-A-01.md) landing · [PLAN-A-02](PLAN-A-02.md) legal · [PLAN-A-03](PLAN-A-03.md) auth  
**Page plans:** [04A Home](PLAN-A-04A.md) · [04B Projects](PLAN-A-04B.md) · [04C Project page](PLAN-A-04C.md) · [04D Work and milestones](PLAN-A-04D.md) · [04E Tasks](PLAN-A-04E.md) · [04F Specs](PLAN-A-04F.md) · [04G Library and files](PLAN-A-04G.md) · [04H History](PLAN-A-04H.md) · [04I Documents](PLAN-A-04I.md) · [04J Insights](PLAN-A-04J.md) · [04K Account](PLAN-A-04K.md) · [04L Quick add, templates, first run, palette](PLAN-A-04L.md)

## 1. Constraint: frontend only, no operations

Unchanged from Revision 2. All data is local fixtures; nothing is saved, sent, uploaded, or exported. Actions that would write open a preview-only dialog. The one new allowance: **session-only in-memory state** (lost on reload, labelled as such) may be used where it makes the demo feel real, for example Quick add appearing in the task list (see PLAN-A-04L).

## 2. Why Revision 3

Revision 2 made the workspace polished but not understandable: ten top-level pages, about 40 view tabs, 44 status labels, six layers per page, team concepts everywhere, and demo scaffolding in the working surface. Each row below is a finding from RESEARCH.md and the decision that answers it.

| Finding (RESEARCH.md) | Decision in this plan |
|---|---|
| D9 Team concepts leak into a solo experience | Two workspace types; build **individual** only (section 3) |
| D2/D3 Navigation by record type; same information in many places | Five destinations organised by what the person is doing; the project is the hub (section 4) |
| D6 44 statuses, overlapping vocabularies | About 15 labels, one work vocabulary (section 6) |
| D4 Heavy page anatomy everywhere | Header, one control row, content (section 5) |
| D5 Demo scaffolding in the product | Moved behind a developer toggle (section 8) |
| D1 Concepts before value | Ten record types become seven; traceability is a lens on records (sections 3.3, 7) |
| D7/first run | Templates, quick add, a skippable checklist, recents (PLAN-A-04L) |

## 3. Product definition

### 3.1 Workspace types

An account has workspaces; each has a **type**.

| | **Individual** (build now) | **Team** (future; reserved, not designed here) |
|---|---|---|
| For | One person: freelancer, student, solo maker | Several people sharing work |
| People | Only you | Members, roles, invitations |
| Ownership | Everything is yours; no owner, assignee, or collaborator fields | Assignee, creator, owner |
| Review | Optional **self-check** (mark reviewed) | Review queue, approve, request changes |
| Access | Everything is private | Per-project access, restricted files |
| Notifications | Reminders to yourself | Mentions, review requests, digests |
| Activity | Your own history | Who did what |
| Reports | Your progress | Workload by person |

### 3.2 Rules that prevent scope creep

1. The individual workspace **never renders a team-only control**, not even disabled or hidden-but-present.
2. A feature that needs a second person is out of scope; it goes on a parking list.
3. No avatars, people pickers, assignee filters, owner rows, role labels, or access badges anywhere in the individual workspace.
4. Team design starts only after the individual workspace has passed its success measures (section 14).

### 3.3 The seam (what to leave for team, without building it)

- Fixtures and selectors read a `workspace` object (`{ id, type: 'individual' }`); every record carries `workspaceId`.
- Access decisions go through one function (`canAccess(record)`), which always returns true for the owner.
- Account, workspace, and member stay separate concepts in the data shape, though only one of each is used.
- No invitations, roles, sharing UI, or permission checks are built.

### 3.4 Record types (ten become seven)

| Kept | Notes |
|---|---|
| **Project** | The hub; carries a template kind (software, creative, research, multimedia, blank) |
| **Task** | The daily unit |
| **Milestone** | Groups tasks and has dates; lives inside a project |
| **Requirement** | Optional; lives in the project's Specs |
| **File** | Merges *asset* and *document* into one concept with a kind (document, image, audio and video, data, link); documents open in the reader |
| **Change** | Renamed *revision*; a recorded edit to a file, task, or requirement |
| **Account** | You, preferences |

Removed as separate record types: **deliverable** (becomes a flag on a file: "Deliverable", linked from requirements), **activity** (derived from changes), **user** (only you).

## 4. Information architecture

### 4.1 Navigation (two levels, five destinations)

```text
Home            what to do today
Projects        all projects, then one project:
                  Overview | Work | Specs | Files | History
Tasks           all my tasks: Today | Upcoming | All
Library         files and documents across projects
Insights        light progress and coverage
[Quick add]     one field, always reachable (button + shortcut)
[Account menu]  Account and preferences, developer tools, leave demo
```

- **Level 1:** the five destinations (rail on desktop, bottom bar on mobile).
- **Level 2:** view tabs inside a destination, never more than five.
- **Detail** opens in a side panel or sheet; it is not a third navigation level.
- Cross-project lists that used to be pages (all milestones, all requirements, all revisions) become views or filters, not destinations.

### 4.2 Routes (breaking changes)

| New route | Replaces | Notes |
|---|---|---|
| `/home` | `/dashboard` | Demo entry points (landing, login) update to `/home` |
| `/projects` | `/projects` | Views: List (cards or table), Timeline (cross-project milestones), plus a "Show archived" toggle |
| `/projects/:projectId?view=overview\|work\|specs\|files\|history` | `/projects/:projectId` | The hub |
| `/tasks?view=today\|upcoming\|all` | `/tasks` | |
| `/library?view=all\|documents\|images\|media\|data\|links` | `/assets`, `/documentation` | Opens a document in the reader |
| `/insights` | `/reports` | Single page, no tabs |
| `/account?view=profile\|preferences\|appearance\|privacy\|developer` | `/settings` | Reached from the account menu, not the rail |

Redirects for removed routes: `/dashboard` → `/home`; `/milestones` → `/projects?view=timeline`; `/requirements`, `/revisions` → `/projects`; `/assets`, `/documentation` → `/library`; `/reports` → `/insights`; `/settings` → `/account`. Selected-record links use `?select=` as before.

### 4.3 Where each Revision 2 page went

| Revision 2 page | Now |
|---|---|
| Overview | **Home** (04A) |
| Projects | **Projects** (04B) |
| Project workspace | **Project page** (04C) |
| Milestones | Project **Work** tab and Projects **Timeline** (04D) |
| Tasks | **Tasks** (04E) and the project Work tab |
| Requirements | Project **Specs** tab (04F) |
| Assets, Documentation | **Library** and project **Files** tab (04G, 04I) |
| Revisions | Project **History** tab (04H) |
| Reports | **Insights** (04J) |
| Settings | **Account** (04K) |

## 5. Page anatomy (version 3)

Order of regions; omit any that a page does not need.

1. **Header:** breadcrumb or eyebrow, H1, one description line. **One** primary action only (usually none, because Quick add is global).
2. **View tabs:** at most five, only where views change the layout.
3. **One control row:** search plus a single **Filter** button that shows the count of active filters; a sort control or view toggle at most. Filters open in a popover or sheet.
4. **Content.**
5. **Detail panel** (docked or sheet) for secondary information.

Rules:
- **Stat strips only on Home and Insights**, never more than three figures.
- No page may show more than **one row of controls** above its content.
- Status chips as a filter row are removed; status filtering lives inside the Filter popover.
- Empty, loading, error, and unauthorized layouts remain (from Revision 2) but "unauthorized" is removed from the individual workspace (there is nobody else to be denied by); keep it only for the missing-record case.

## 6. Vocabulary

One vocabulary for work, small sets elsewhere. Icon plus text, never colour alone.

| Domain | Labels (Revision 2 count → now) |
|---|---|
| Task and milestone | **To do, Doing, Done** (+ a **Blocked** flag). Overdue and due-soon are derived from dates (22 → 3 + flag + derived) |
| Project | **Planning, Active, On hold, Done** (Archived is a hidden state, not a label) (6 → 4) |
| Requirement | **Open, Met** plus a **Verified** check (13 across two vocabularies → 2 + check) |
| File and document | Documents: **Draft, Final**; files have no status; uploading is transient (8 → 2) |
| Change | **Recorded**, with an optional **Reviewed** check (4 → 1 + check) |
| Priority | **Normal, High** (4 → 2); "Low" and "Urgent" are dropped |
| Health | Derived display only: **On track, At risk** |
| **Total** | **about 15** labels (from 44 plus 4 priorities) |

## 7. Data and fixtures (breaking changes)

- Remove `users` except the account owner; remove `assigneeId`, `creatorId`, `ownerId`, `collaboratorIds`, `authorId`, and all avatar rendering.
- Add `workspace: { id, type: 'individual' }` and `workspaceId` on records; add `canAccess()`.
- Merge `assets` and `documents` into `files` (`kind`, `isDeliverable`, optional `body` for documents).
- Remove `deliverables`, `activities`, access states, rejected requirement status, and review states; add `blocked` (boolean), `verified` (boolean), `reviewed` (boolean).
- Add `templates` (four kinds plus blank): phases, starter milestones, starter tasks (PLAN-A-04L).
- Keep ISO dates, the fixed demo date, and computed selectors; the selectors for counts, progress, gaps, and attention are reused.

## 8. Developer scaffolding leaves the working surface

- The demo bar, the **preview-state** selector, and the project scope switcher are removed from the top of every page.
- A **Developer** section in Account (and `?dev` in the URL) turns on the preview-state selector and a "Sample data" explanation; it is off by default.
- A small, quiet **Sample workspace** label (footer or account menu) replaces the demo chip; it states that nothing is saved.
- Preview-only dialogs stay, with calmer copy and without the "Preview only" chip on repeat use within a session.
- The project scope switcher becomes a **project filter** inside Tasks and Library, where it is meaningful.

## 9. Shell and navigation components

- **Rail (desktop ≥1024px):** five items with icons and labels (labels always visible at ≥1280px; icon rail with tooltips between 1024 and 1279px), plus a Quick add button at the top and the account menu at the bottom.
- **Mobile (<1024px):** bottom bar with Home, Projects, **Quick add** (centre), Tasks, Library; Insights and Account are in the account menu.
- **Top bar:** only what is global: search/command palette trigger and (on mobile) the brand. The scope switcher, demo chip, and preview selector are gone.
- **Recents:** the command palette and Home list recent projects and records (recognition over recall).

## 10. Visual system and motion

- Keep the Revision 2 tokens, type scale (12px floor), tone palette, flat colours, ink outlines for selected elements only, and restrained motion (entrance fade, view stagger, sliding tab underline, count-up, panel spring, CSS hover and press). Remove any motion tied to deleted elements.
- Fewer statuses means fewer tone and icon pairs to maintain; recheck contrast after the vocabulary change.

## 11. Responsive and accessibility

- Verify 320, 390, 768, 1024, 1280, and 1536px.
- First meaningful record above the fold at 390px on Home, Tasks, Projects, and Library.
- The Filter popover becomes a bottom sheet on mobile; Quick add is a bottom sheet with the keyboard open.
- Keep landmarks, skip link, `aria-current`, focus management for panels and dialogs, and reduced-motion handling. The command palette is a labelled dialog with arrow-key navigation and Escape to close.

## 12. Performance

Unchanged budgets from Revision 2 (shared runtime about 71 kB gzip; each page 1.7–3.4 kB; no GSAP in the workspace). Merging pages should reduce the number of chunks; keep each page lazy and keep the command palette and templates in their own lazy chunk.

## 13. Source layout and migration

```text
client/src/pages/workspace/
  shell/        Rail, MobileBar, TopBar, AccountMenu
  pages/        HomePage, ProjectsPage, ProjectPage (tabs: Overview, Work, Specs, Files, History),
                TasksPage, LibraryPage, InsightsPage, AccountPage
  components/   shared components from Revision 2, minus Avatar/AvatarStack and access badges
  quickadd/     QuickAdd, CommandPalette, templates
  data/         fixtures (individual), selectors, status (about 15 labels), format
```

Phases (each ends with lint, build, and a check at 390px and 1280px):

- [ ] **Phase 0 — Approvals:** owner answers D6–D10 (section 15).
- [ ] **Phase 1 — Data and vocabulary:** reshape fixtures, merge files, remove team fields, new status maps, update selectors.
- [ ] **Phase 2 — Strip team and scaffolding:** remove avatars, assignee and owner UI, review queue, access badges, scope switcher, demo bar; add the Developer section.
- [ ] **Phase 3 — Shell and routes:** five-item rail and mobile bar, redirects, account menu, rename `/dashboard` to `/home` in landing and auth.
- [ ] **Phase 4 — Pages:** Home, Tasks, Projects, then the Project page and its tabs, Library, Insights, Account.
- [ ] **Phase 5 — Quick add, templates, first run, palette** (PLAN-A-04L).
- [ ] **Phase 6 — QA:** success measures (section 14), accessibility pass, update README, CODEMAP, LOG, and tick plan checklists.

Delete after migration: pages and components for removed destinations, the old status maps, and team-only fixtures.

## 14. Success measures

Test with solo participants (freelancers, students), see RESEARCH.md section 7.

- [ ] A new person creates a project and a first task in **about 60 seconds** without help.
- [ ] Five task test (find what is overdue, add a task, check whether a requirement has work behind it, find a document, see what changed last): **no more than one wrong turn per task**.
- [ ] **At most 5** top-level destinations; **at most 3** headline figures on any screen; **at most about 15** status labels.
- [ ] **Zero** team-only controls in the individual workspace.
- [ ] A participant can say in one sentence what traceability showed them.

## 15. Decisions needed from the owner

Defaults are recommendations; each can be changed before Phase 1.

| ID | Decision | Recommended default |
|---|---|---|
| D6 | Navigation set | Home, Projects, Tasks, Library, Insights; Account in a menu |
| D7 | Merge asset and document into **File**; fold deliverable into a flag | Yes |
| D8 | Status vocabulary in section 6 (drop Low and Urgent priority, Rejected, Archived as a label) | Yes |
| D9 | Quick add may add to session-only in-memory state so the demo feels real | Yes, clearly labelled |
| D10 | Rename for plain words: **Revisions → Changes**, **Deliverable → Final file**, **Milestone** kept | Yes, but confirm in testing |

Still open from RESEARCH.md section 8: one individual workspace per account or several; convert-or-add when team arrives; read-only share link and export at launch.

## 16. Exclusions

- No team workspace design, invitations, roles, assignees, review workflows, or sharing UI.
- No authentication, persistence, uploads, exports, or server behaviour.
- No new record types beyond the seven in section 3.4.
- No Gantt chart, automation, or custom fields.

## 17. Approval gate

- [ ] Owner approves the workspace-type model and rules (section 3).
- [ ] Owner approves the navigation and route changes (section 4).
- [ ] Owner answers D6–D10.
- [ ] Owner authorizes Phases 1–6 (this revision authorizes no code).

## 18. Baseline (Revision 2, implemented)

Left rail with ten modules, project scope switcher, demo bar with preview states, eleven pages with view tabs, record detail panels, shared components, fixtures with four people and ten record types, 44 status labels, restrained motion. Its page plans are superseded by 04A–04L.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
