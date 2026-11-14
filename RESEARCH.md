# Research: Making the Tsumugi workspace understandable

**Status:** Research document. Its recommendations were approved and **implemented on 2026-11-14** as PLAN-A-04 Revision 3 (see [the plan](docs/plan/frontend/PLAN-A-04.md)). The diagnosis (sections 1-2) describes the *earlier* ten-module workspace, not the current one. Success measures in section 7 have not been run with people yet  
**Date:** 2026-11-14  
**Question:** The workspace feels overwhelming and confusing, even to its developer. How should a project and production tool like this be designed so a person can use it without holding a lot of information in their head?  
**Scope:** The authenticated workspace UI as it was when this research was written (`/dashboard` and the ten modules; now `/home` and five destinations). The public pages are out of scope.  
**Owner direction (added 2026-11-14):** Accounts will have two kinds of workspace, **individual** and **team**. Individual comes first and is designed for one person (a freelancer, a student, anyone working solo). Team is a future addition and must not shape the individual experience. This document is read through that lens; see section 5.0.

## 1. Summary

1. **The problem is structural, not cosmetic.** The workspace was built from the specification noun by noun: ten modules, each with its own views, filters, statuses, and detail panel. Visual polish was added on top. A user must learn the whole data model before doing anything useful.
2. **The research is consistent on the remedy:** show the few things people need most, hide the rest one level down, keep one obvious place for each thing, and make the next action visible (sources in section 3).
3. **The biggest levers, in order of expected effect:**
   1. Organise navigation around *what the person is doing* (see my work, plan a project, find a file), not around *record types*. Cut the 10 top-level items to about 5.
   2. Make the **project** the centre of the app and move milestones, requirements, revisions, assets, and docs inside it as tabs.
   3. Shrink the vocabulary: 44 distinct statuses across 10 vocabularies is too much to learn.
   4. Take prototype scaffolding (demo bar, state previewer, "preview only" dialogs) out of the everyday surface.
   5. Treat traceability as a *lens* on a record ("why it exists / what it becomes"), not as six separate nouns the user must connect.
4. **Splitting the product into an individual workspace now and a team workspace later is itself the strongest simplifier.** A large share of today's interface exists only to support several people: owners, assignees, collaborators, avatars, review queues, approvals, and restricted access (section 2.1, D9). For one person all of that is noise. Remove it from the individual workspace, reserve a clean seam for it, and the app gets smaller before any redesign starts.
5. **Similar tools split into two camps:** simple but capped (Trello, Basecamp, Things) and powerful but overwhelming (ClickUp, Notion, TickTick, Asana). Solo users notice team-shaped weight immediately, and nothing found offers idea-to-deliverable traceability in a calm, solo-sized form. The review is in section 10, and the overall findings and a prioritised improvement list are in section 11.
6. **What I could not do:** there is no user testing behind this. The diagnosis in section 2 is my analysis of the code and screens plus published guidance. Section 7 describes a cheap way to test it before redesigning.

## 2. Diagnosis: what the current UI asks you to hold in your head

Measured from the code on 2026-11-14 (counts are exact unless marked approximate).

| Thing a user must understand | Count today |
|---|---|
| Top-level navigation items | 10 (Overview, Projects, Milestones, Tasks, Requirements, Assets, Revisions, Documentation, Reports, Settings) |
| Record types | 10 (project, milestone, task, requirement, deliverable, asset, document, revision, activity, user) |
| Links in the "thread" a user is meant to follow | 6 stages: objective, requirement, milestone, task, revision, deliverable |
| View tabs across all pages | about 40 (Project workspace 9, Reports 5, Settings 6, Projects 4, and 2–3 on most others) |
| Status vocabularies | 10 (project, milestone, task, requirement lifecycle, verification, revision, document, asset access, deliverable, health) |
| Distinct status labels | 44, plus 4 priorities |
| Dropdown selects in page code | 15, plus 7 toolbars with filter chips |
| Layers on a typical page | 6: page header, view tabs, toolbar, stat strip, content, detail panel |
| Global controls outside the page | project scope switcher, search, demo chip, account menu, demo bar with a preview-state selector |
| "Preview only" actions | 36 call sites |

### 2.1 Findings

These are hypotheses grounded in the code; they should be checked with real people (section 7).

- **D1. Concepts before value.** The product's key idea (traceability) needs six nouns to be understood. A new user meets "requirement", "milestone", "revision", and "deliverable" before they have created a single task.
- **D2. Navigation is organised by data type.** "Where is the thing I want?" requires knowing which record type it is. A person who wants to know *what is due this week* has to choose between Overview, Tasks, Milestones, and Reports, and all four answer a version of the question.
- **D3. The same information lives in several places.** Overdue work appears on Overview, Tasks, Milestones, Reports, and inside each project. NN/g specifically warns against several ways to reach the same secondary options because it adds complexity (section 3.1).
- **D4. Every page carries the same heavy anatomy** whether it needs it or not. A settings page does not need a stat strip; a document reader does not need a filter row. Most of the "overwhelming" feeling on a page is chrome, not content.
- **D5. Prototype scaffolding is mixed into the product.** The demo bar, the preview-state selector, the project scope switcher, "Sample data" notes, and the preview dialogs are all things a real user would never see, but today they are always on screen. For the developer using the app, they compete with the thing being evaluated.
- **D6. Vocabulary is large and overlapping.** Requirements carry both a lifecycle status *and* a verification status. Tasks, milestones, and deliverables each have their own near-synonym sets (In progress appears in four vocabularies).
- **D7. No guided path.** Nothing says "start here", "do this next", or "you are done with this step". A tool made of ten parallel modules gives no sense of sequence.
- **D9. Team concepts leak into a solo experience.** The app assumes several people throughout. In the workspace code, `assigneeId`, `ownerId`, `collaboratorIds`, and `creatorId` appear about 54 times, avatars about 21, and review and approval controls (`Review queue`, `Approve`, `Request changes`) and `Restricted` access states appear in the Revisions, Assets, and record panels. The fixtures contain four people. A freelancer or student sees filters for "Assignee", an owner and collaborator row on every project, and a review queue for changes nobody else will review. Those are extra things to read, learn, and ignore.
- **D8. The data is fake, so there is no real task to anchor on.** When a developer opens the app, the sample records give no personal reason to look at anything. This amplifies the feeling that everything is equally important.

### 2.2 A quick map of where things live today

Use this while the structure is unchanged.

| If you want to… | Go to | Notes |
|---|---|---|
| See what needs attention | Overview, "Needs attention" | Merges overdue, blocked, and due-today tasks and milestones |
| Do or track work | Tasks (List, Board, Schedule) | Click a row for the detail panel |
| See checkpoints and dates | Milestones (Register, Timeline, By project) | Status is computed from dates |
| See what the project must achieve | Requirements | Traceability tab shows gaps |
| Find a file or link | Assets | Metadata only |
| Read or write knowledge | Documentation | Library, then Reader |
| See who changed what | Revisions | History, Review queue, Compare |
| See progress numbers | Reports | Every number has a Definition |
| Look at one project end to end | Projects, then a project, then its tabs | The closest thing to a "home" per project |

## 3. What the research says

Sources are listed in section 12. Most are practitioner guidance rather than controlled studies; the strength of each claim is noted.

### 3.1 Progressive disclosure (strong: Nielsen Norman Group)

- Show the options people need most first; move advanced or rarely used ones to a secondary place. It improves learnability, efficiency, and error rate.
- **Split by evidence, not taste:** frequent items on the first level, rare items on the second, decided from task analysis and usage data, then validated by testing.
- **Make the way to the second level obvious**, with a label that tells people what they will find there.
- **Two levels are usually best.** More than two tends to confuse people. If three are needed, simplify first.
- **Avoid several routes to the same secondary option.** If unavoidable, label each clearly.
- **Staged flows (wizards) only work when steps are independent.**

*Implication:* Tsumugi has at least three levels (module, view tab, detail panel) plus a filter layer on most pages, and several routes to the same records.

### 3.2 Cognitive load (strong: Nielsen Norman Group)

- Load is **intrinsic** (the real complexity of the task) or **extraneous** (effort spent on the interface itself). Design should reduce the extraneous part.
- Ways to reduce it: remove redundant elements, use familiar patterns, **offload work from the user** (fewer things to read, remember, or decide; smart defaults; re-display what was already entered), chunk content, keep responses fast.

*Implication:* Learning ten modules and 44 statuses is extraneous load. The intrinsic task (planning and finishing a piece of work) is much smaller.

### 3.3 Recognition over recall (strong: Nielsen Norman Group)

- Visible, labelled options beat memory. Icons alone force people to recall meaning. Recently used items and contextual tips let people resume by recognising rather than remembering.

*Implication:* The collapsed rail shows icons only between 1024 and 1279px. There is no "recent" list in navigation. A "Recent" tab exists only inside Projects.

### 3.4 How many choices? (weak to moderate: practitioner blogs)

- **Hick's law:** decision time grows with the number of choices. **Miller's "7 plus or minus 2"** is widely quoted, but it is often misapplied; later work by Cowan (2001) suggests working memory is closer to **about four chunks**. One dashboard guide suggests about four key metrics visible without scrolling.
- Navigation rules of thumb vary: several sources say 5–7 top-level items; one argues a sidebar can carry 10–30 destinations if grouped into 3–5 groups. These are heuristics, not research results.

*Implication:* Treat "about 5 top-level destinations and about 4 headline numbers per screen" as a starting hypothesis to test, not a law. The current 10 ungrouped items and 4–5 stats per page are at or beyond the upper end of every rule above.

### 3.5 Onboarding and empty states (moderate: vendor guidance)

- The first empty screen is the onboarding. Show what will live here, why it matters, and **one** obvious first action.
- Measure success by **time to the first meaningful action** (for a project tool, creating a project).
- Label sample data clearly so it is never confused with real data. Keep checklists to roughly 5–7 items and skippable.

*Implication:* The demo already labels sample data. What is missing is a single guided first path.

### 3.6 Traceability in existing tools (moderate: vendor material)

- Jira handles requirement-to-work links with **issue links**, and relies on add-ons for a **matrix view** when needed. Dedicated tools such as Jama target regulated product development.
- The common pattern is that links are created and viewed **on the record**, and a traceability matrix is an **opt-in report**, not the home screen.
- One review gives a useful test for any tool: can different roles find and update the *same* requirement without creating duplicates?

*Implication:* Tsumugi puts the matrix and the chain at the same level as everyday work. Industry tools treat it as an advanced view.

### 3.7 Opinionated, small tools (limited: the primary page could not be fully retrieved)

- Linear's published method is organised around a small number of ideas: set direction, scope projects down, write issues rather than user stories, keep momentum. One of its stated principles is that if something is not a task it does not belong in the issue tracker. I could only retrieve the table of contents of its Method page, so I cannot quote its reasoning in detail.
- The relevant lesson is a stance, not a feature: **decide what the tool is for and leave everything else out.**

### 3.8 Personal and team workspaces in other products (moderate: vendor docs and practitioner posts)

- **Separate containers under one login is the common pattern.** Granola describes personal (only you) and team (multiple members) workspaces; Replit makes you the sole admin and shares only specific projects through invitation.
- **The invite capability is the gate.** Shelf locks invitations on personal workspaces and calls that by design.
- **Todoist is a useful bridge:** a team plan keeps each person's personal space private alongside the team space, so a person never loses their own area.
- **Upgrade can be in place or additive.** Some products let you rename or convert a personal workspace into a team one; others add a team workspace next to the personal one. Both exist; the choice affects data ownership and is an open question here (section 8).
- **Single-player first is a recognised sequencing.** Sources argue a product should deliver its core value to one person and add collaboration once it solves a real problem alone; Figma and Granola are the usual anecdotes. Several warn about the **halfway state**: collaboration bolted onto a product that does not yet work well solo adds complexity without earning the benefit. One heuristic: if the core value rises materially with more users, collaboration should be central; if not, it can wait.
- **Separate onboarding for individuals and teams** is recommended when a product serves both.

*Implication:* Tsumugi's core value (a traceable thread from idea to finished work) does not depend on other people. That supports individual-first. It also means team features should be added as a clean layer later, not carried now.

## 4. Design principles for Tsumugi (proposed)

1. **One primary loop.** Capture work, plan it, do it, see progress. Everything else is a lens on that loop.
2. **Two levels, then stop.** Level 1: where am I (a small navigation). Level 2: what am I looking at inside it. Anything deeper is a side panel or a link.
3. **One home per thing.** Each kind of information has exactly one primary place; other places link to it rather than repeat it.
4. **Few numbers, few words.** At most about four headline figures on a screen and a vocabulary a person can learn in a minute.
5. **Defaults over controls.** Open every page in the view most people want, with filters tucked behind one button.
6. **Real product and prototype scaffolding are separate.** The demo and preview tools live in a developer menu, not in the working surface.
7. **Traceability is a lens.** Show "why it exists / what it becomes" on a record, and keep the matrix as an opt-in report.
8. **Name things the way people say them,** and keep labels visible (recognition over recall).
9. **The workspace type decides what exists.** An individual workspace contains no concept that needs a second person. Team concepts appear only in a team workspace, never as greyed-out or hidden-but-present clutter.

## 5. Options for restructuring

These are proposals for discussion, not decisions. Effort is relative.

### 5.0 Workspace types: individual now, team later (decide first)

**Individual workspace (build now).** One person owns everything. There is nothing to assign, share, approve, or restrict.

| Concept | Individual workspace | Team workspace (future) |
|---|---|---|
| People | You only; no avatars, no owner or collaborator rows | Members, roles, invitations |
| Task ownership | Not shown (every task is yours) | Assignee, creator |
| Review | **Self-check**: mark a change as reviewed or done, optional | Review queue, approve, request changes |
| Access | Everything is private to you | Per-project access, restricted files |
| Notifications | Reminders to yourself | Mentions, review requests, digests |
| Activity | Your own history | Who did what |
| Reports | Your progress | Workload by person |
| Navigation | About 5 items (section 5.1) | Adds People and a team Home |
| Settings | Profile, preferences, privacy | Adds members, roles, billing |
| Onboarding | "Plan your first project" | "Invite your team" |

**Rules to prevent scope creep:**
1. The individual UI must never render a team-only control, even disabled. If a feature needs a second person, it is not in the individual workspace.
2. Team ideas go on a parking list instead of into the individual build.
3. A single ownership field on every record (`ownerId`, always the account owner) is enough for now; do not model assignees, roles, or permissions yet.

**Leave a seam, not a feature.** Cheap decisions now that avoid a rewrite later: store a `workspaceType` on the workspace (`individual` first), keep every record scoped to a workspace ID, route all access checks through one function (always true for the owner today), and keep the account, workspace, and member concepts separate in the data model even though only one of each is used. Do not build invitations, roles, or sharing UI.

**What freelancers and students need that is not "a team".** Two likely individual needs sit near the boundary and should be decided explicitly, not smuggled in: a **read-only share link** (for example to show a client a deliverable or a lecturer a report) and **export**. Both work without a team model. See section 8.

**Upgrade path (future).** Two options seen elsewhere: convert the individual workspace into a team workspace in place, or add a team workspace beside the personal one while keeping the personal one private (Todoist-style). Keeping personal data private and separate is the safer default; this should be decided before any team work starts.

### 5.1 Navigation (largest effect, medium effort)

| Today (10 items) | Proposed (about 5) | Why |
|---|---|---|
| Overview | **Home** | Today's attention list and recent work; nothing else |
| Tasks | **Tasks** (called "My work" only if a team workspace is added later) | Cross-project tasks, due soon first |
| Projects, Milestones, Requirements, Revisions | **Projects** (milestones, requirements, and revisions become tabs inside a project) | The project is the unit people think in; these records only make sense within one |
| Assets, Documentation | **Library** (files and documents together) | One place to find "stuff"; split by type with a filter |
| Reports | **Insights** | Unchanged in purpose; reachable from a project too |
| Settings | Account menu | Not a daily destination |

Cross-project lists (all milestones, all requirements) become filters or Insights views, not top-level pages.

### 5.2 Project page (large effect, medium effort)

Reduce the nine tabs to about five, in the order people work:

1. **Overview**: objective, health, next step, recent activity.
2. **Work**: tasks (list or board) with milestones as grouping or a timeline toggle.
3. **Specs**: requirements; the traceability matrix is one opt-in view here.
4. **Files**: documents and assets together.
5. **History**: revisions and review.

### 5.3 Vocabulary (medium effect, low effort)

| Today | Proposed starting point |
|---|---|
| 10 vocabularies, 44 statuses | One work vocabulary for tasks and milestones: **To do, Doing, In review, Done**, with **Blocked** as a flag |
| Requirements: lifecycle plus verification | One status plus a simple **Verified** check |
| Health, access, deliverable, document, revision, project | Keep only where the user must act on the value; derive the rest (for example health from dates) |

Fewer statuses also means fewer colours, icons, and filter chips to learn. In the individual workspace, drop the assignee, owner, and review-state vocabulary entirely (section 5.0).

### 5.4 Page anatomy (medium effect, low effort)

- Default to **header + one control row + content**.
- Show stat strips only on Home and Insights.
- Collapse filters behind one **Filter** button that shows how many are active.
- Keep the detail panel; it already carries the secondary information well.

### 5.5 Separate scaffolding from product (low effort, clear effect)

- Move the demo bar and preview-state selector behind a developer menu (for example a `?dev` switch or a small toggle in the account menu).
- Keep "Preview only" dialogs, since they stop actions from pretending to work, but make them quieter.
- Replace the always-visible project scope switcher with a project picker that appears where it is meaningful.

### 5.6 Traceability as a lens (medium effort)

- On any record, show two lines: **Why it exists** (the requirement or objective above it) and **What it becomes** (the work or deliverable below it). This is the same content the landing page's explorer uses.
- Keep the matrix, but under Specs and clearly labelled as a report.

### 5.7 First run and guidance (medium effort)

- A new project opens to a short checklist (add an objective, add a first milestone, add a first task), skippable, with a visible "next" action.
- Recent items in navigation, so people resume by recognising.

### 5.8 Not recommended

- **A wizard for everything.** Staged flows only suit independent steps (section 3.1).
- **More tooltips and tours.** Guidance that is rarely rehearsed is not remembered; fix the structure first.
- **Hiding essential actions** in menus to look clean; the guidance warns against hiding what primary tasks need.

## 6. Suggested order of work

| Step | What | Why first |
|---|---|---|
| 0 | Decide the workspace-type model (5.0) and strip team-only concepts from the individual UI (assignee, owner, collaborators, avatars, review queue, restricted access) | Removes a whole class of clutter with no new design; sets the boundary for everything after |
| 1 | Test the diagnosis (section 7), starting with a navigation card sort and a five-task test with solo users | Cheap, and it tells you which of D1–D9 actually hurt |
| 2 | Move demo scaffolding out of the working surface (5.5) | Immediate relief, almost no risk |
| 3 | Reduce page anatomy (5.4) | Low effort; shrinks every page at once |
| 4 | Collapse vocabulary (5.3) | Touches fixtures, badges, and filters; contained |
| 5 | Restructure navigation and the project page (5.1, 5.2) | Largest change; do it once the evidence is in |
| 6 | Traceability as a lens, then first-run guidance (5.6, 5.7) | Depends on the new structure |
| 7 | Quick add and project templates (11.3, items 7 and 8) | Biggest everyday and first-run gains once the structure is calm |

## 7. How to validate (a solo developer's version)

Recruit 5–8 people who match the **individual** workspace: freelancers, students, or anyone who plans work alone, ideally including 2–3 who have not seen the project. None of this needs analytics or a backend.

1. **Card sort** (open): write the ten modules and about 20 common questions ("what is due this week?", "where is the style guide?") on cards; ask people to group them and name the groups. Compare with the proposed navigation.
2. **Tree test:** show only the proposed navigation as text and ask people where they would go for five tasks. A task that more than a couple of people miss shows a labelling or grouping problem.
3. **Five-second test on Home:** show it for five seconds and ask what they remember and what they would do next.
4. **Task test with the current app** (think aloud). Suggested tasks: find what is overdue, add a task to a project, find out whether a requirement has any work behind it, find a document, find who changed it last. Record time, wrong turns, and spoken confusion.
5. **Measures to track across versions:** time to first correct action, number of wrong clicks, number of distinct concepts someone had to ask about.
6. **Developer self-check:** after any redesign, a person who has not seen the app should complete the five tasks in under about two minutes each without help.

## 8. Open questions for the owner

1. **Answered:** individual first, team later. Still open: which individual users matter most at launch (freelancers, students, hobbyist makers)? Their first project and vocabulary differ.
2. Is **traceability the headline** feature or a power feature? The answer decides whether it earns top-level space.
3. Should the app **encourage a workflow** (for example plan, then do, then review) or stay flexible? Opinionated tools are easier to learn but narrower.
4. Which of the ten modules would you **cut or postpone** if you had to ship with six?
5. Is the **demo workspace** a product feature (a public sandbox) or only a development aid? That decides where the demo bar belongs.
6. Does an account have exactly **one individual workspace**, or can a person keep several (for example one per client)?
7. When team arrives, should it **convert** the individual workspace or **sit beside** it with the personal one kept private?
8. Do individuals need a **read-only share link** or **export** at launch (a freelancer showing a client)? Both avoid a team model.
9. How much **terminology freedom** do you have? "Revisions", "Requirements", and "Deliverables" are precise but formal.

## 9. Limitations of this research

- **No user testing.** Section 2 is my analysis of the code and the screens, plus published guidance.
- **Source quality varies.** The progressive disclosure, cognitive load, and recognition articles are from the Nielsen Norman Group and fetched directly. The Hick's/Miller's, navigation-count, onboarding, and traceability material comes from practitioner and vendor sites in search results; the numbers are rules of thumb. The Cowan figure is as reported by a secondary source, not read from the original paper.
- **Linear's method** could only be read at heading level.
- **The tool review (section 10)** is based on one search per product or group, mostly review sites, vendor comparisons, and user reviews. Prices, limits, and plans conflict between sources and change often. I did not use the products. The conclusion that no calm solo-sized traceability tool exists is an inference from a limited search.
- **Workspace-type guidance (3.8)** comes from vendor help pages and practitioner posts in search results; the Figma and Granola examples are anecdotal and I did not verify them.
- **Counts in section 2** were taken from the code on 2026-11-14 (the view-tab total is approximate) and will change as the code changes.
- The recommendations are options for discussion; none has been tried on the actual product.

## 10. Similar tools: what they do well and what is missing

A quick review of the tools people use for solo and creative work today, from search results (practitioner reviews, vendor comparisons, and user reviews on review sites). Read it as a map of patterns, not a verdict on any product. Claims are anecdotal and prices and limits change, so none of this should be quoted as fact about a current plan.

| Tool | What it does well | What is missing or hurts | Lesson for Tsumugi (individual workspace) |
|---|---|---|---|
| **Notion** | Highly customisable; many templates, which soften the blank page; documents and light project tracking in one place | Steep learning curve and setup time; offline use is limited; projects are a small part of the product | Templates and a pre-built starting structure beat a blank canvas |
| **ClickUp** | Very powerful; generous free plan | The most repeated complaint is feature overload: many sub-menus, features hard to discover, "more time setting up than doing tasks". One reviewer says freelancers, students, and small teams would benefit if features were more accessible; another notes tutorials are aimed at teams | The cautionary tale: breadth plus configuration is exactly what this research is trying to avoid |
| **Trello** | Drag-and-drop boards that are intuitive immediately; good for simple projects | No native dependencies; reporting needs an add-on; one review calls the simplicity "a ceiling" once projects get complex | Simplicity is the right default; plan the ceiling (a light milestone view) rather than ignoring it |
| **Todoist** | Cross-platform; fast natural-language entry (some of it paid); a private personal space even on team plans | Calendar view described as clunky | Quick capture is a core solo habit; a private personal space can coexist with a team layer |
| **Things 3** | Strong project structure (areas and projects) for personal planning; polished and calm | Apple-only; no collaboration (a plus for solo focus); no natural-language entry | Proof that an unapologetically personal tool can be loved; depth through "areas", not through more modules |
| **TickTick** | Feature-rich (timer, habits, calendar, Gantt) | Can feel overwhelming; interface polish below the calmer apps | Feature count is not the goal; avoid becoming the "everything" app |
| **Linear** | Speed, keyboard-first use, tight developer integrations, a usable free tier | Described as overkill for solo work and built for product teams; limited flexibility; basic reporting | An opinionated, fast tool is a strength, but its team vocabulary (cycles, triage, assignees) is wrong for individuals |
| **Asana (free personal plan)** | Lists, boards, and a calendar for solo use at no cost | Heavy for individuals and overwhelming for simple lists; timeline, reporting, and custom fields are paid; reported minimums on paid seats | Solo users notice team-shaped weight immediately |
| **Basecamp** | Easy to start; communication-centred; flat pricing; some clients use it directly | No Gantt; thin views and reporting; limited task features; no free tier | Client communication is a real freelancer need (see the share-link question in section 8) |
| **Milanote / Obsidian / Airtable** | Milanote: visual boards for non-linear creative thinking. Obsidian: local, linked notes for writers and researchers. Airtable: structured data | Milanote is weaker for structured writing; Obsidian and Airtable have no production workflow; comparison sites suggest people try two of them | Makers already juggle two or three tools. A single light place for plan, files, and notes is the opening, if each part stays light |
| **Jira and Jama (traceability)** | Links between requirements and work; matrix views through add-ons; Jama for regulated products | Native Jira needs manual linking and query language; these tools are built for teams and regulated industries, not individuals | Traceability exists only in heavyweight tools; nobody was found offering it in a calm, solo-sized form |

### 10.1 Patterns across the tools

1. **Two camps, each with a flaw.** *Simple but capped* (Trello, Basecamp, Things) are easy to start and run out of room. *Powerful but overwhelming* (ClickUp, Notion, TickTick, Asana) fix the ceiling and create the learning-curve problem this project has now.
2. **Solo users feel team weight at once.** Asana is called heavy for individuals, Linear overkill for solo work, ClickUp tutorials are team-oriented. This reinforces the individual-first split (section 5.0).
3. **Defaults and templates matter more than options.** Notion's templates are repeatedly cited as the way past the blank page.
4. **Speed is a feature.** Linear and Todoist are praised for keyboard and fast-entry workflows; the daily loop (add, find, finish) must take seconds.
5. **A real gap, with caveats.** Idea-to-deliverable traceability appears only in team and regulated tools. That is Tsumugi's differentiator, but the search was limited and I may have missed tools; it should be confirmed before being used in marketing.
6. **Calm is a differentiator.** Things 3 and Todoist are praised for restraint; the heavy tools are criticised for configuration burden.

## 11. Overall findings and how to improve the workspace

### 11.1 Positioning that the research supports

> **The calm production thread for one person:** as easy to use every day as a simple task app, with the one thing the big tools lack for solo makers, a visible line from *why this exists* to *what it became*.

That means the everyday surface (tasks, projects, files, notes) should feel like Things or Todoist or Trello, and traceability should appear as a lens on that surface, not as a second product the user must learn first.

### 11.2 What to keep

These already match the guidance and should survive any redesign.

- **Honesty about demo data** and preview-only actions (nothing pretends to save).
- **Dates and statuses computed** from records rather than stored text, so numbers never contradict each other.
- **Icon plus text status**, never colour alone.
- **Shareable state in the URL** (view, filter, selected record).
- **The detail panel** for secondary information (a good second level).
- **Report definitions** next to every number.
- **Restrained motion** and reduced-motion support.
- **The landing page's traceability explorer**, which explains the idea well.

### 11.3 What to change (priority order)

| # | Change | Why (evidence) | Effort | Effect |
|---|---|---|---|---|
| 1 | Remove every team-only concept from the individual workspace (assignee, owner, collaborators, avatars, review queue, restricted access) | D9; solo users feel team weight at once (10.1) | Low | High |
| 2 | Move the demo bar, preview-state selector, and scope switcher out of the everyday surface | D5; scaffolding competes with the product | Low | High |
| 3 | Cut page anatomy: header, one control row, content; stats only on Home | D4; progressive disclosure; extraneous load | Low | High |
| 4 | Collapse the vocabulary to about 15 labels | D6; 44 statuses | Medium | High |
| 5 | Reduce navigation from 10 to about 5 and make the project the hub | D2, D3; two-camp pattern; NN/g two levels | Medium | Very high |
| 6 | Home answers one question: "what should I do today?" with at most 3 numbers | Cognitive load; Hick's and Cowan's limits | Low | High |
| 7 | **Quick add** everywhere (keyboard shortcut, one field, sensible defaults) | Todoist and Linear speed lesson | Medium | High |
| 8 | **Project templates by kind** (software, creative, research, multimedia) that pre-create phases and a first few records | Notion templates lesson; time to first value; matches the landing page's "worlds" | Medium | High |
| 9 | Traceability as a lens: "Why it exists / What it becomes" on every record; the matrix as an opt-in report under Specs | Industry pattern (3.6); D1 | Medium | Medium to high |
| 10 | First-run guidance: a skippable 3-step checklist and recent items in navigation | 3.3, 3.5 | Medium | Medium |
| 11 | A light milestone view (dates and a simple dependency label), not a Gantt | Trello's ceiling; avoid the TickTick trap | Low to medium | Medium |
| 12 | Read-only share link and export for client or lecturer review (decide in section 8) | Basecamp lesson; common freelancer need | Medium | Medium |
| 13 | Command palette and keyboard shortcuts for navigation and quick add | Linear's speed | Medium | Medium (power users) |

### 11.4 What to do with each current module (individual workspace v1)

| Today | Proposal | Notes |
|---|---|---|
| Overview | **Home** (keep, simplify) | Today list and up to three numbers |
| Tasks | **Tasks** (keep, core) | Default view: Today and upcoming; board stays as an option |
| Projects, Project workspace | **Projects** (keep, the hub) | Tabs: Overview, Work, Specs, Files, History |
| Milestones | **Merge** into the project's Work tab | Timeline as a toggle, not a page |
| Requirements | **Move** into the project's Specs tab | Optional; matrix as an opt-in view |
| Assets, Documentation | **Merge** into **Library** and the project's Files tab | One place for "stuff"; keep the Markdown reader |
| Revisions | **Demote** to a project History tab | Remove the review queue; keep compare for documents |
| Reports | **Trim** to a few project-level numbers; a light Insights page later | Keep definitions |
| Settings | **Shrink** to profile, preferences, privacy; move to the account menu | Drop the Security panel until real accounts exist |

### 11.5 Proposed shape of the individual workspace

```text
Home            what to do today, 3 numbers, recent
Projects        all projects, then one project:
                  Overview | Work (tasks, milestones) | Specs | Files | History
Tasks           all my tasks: Today, Upcoming, Anytime
Library         files and documents across projects
Insights        light progress view (later)
[account menu]  preferences, privacy, leave demo
[quick add]     one field, always available
```

Two levels everywhere (destination, then view inside it); detail opens in a side panel.

### 11.6 How to know it worked

Targets to test against (section 7), using solo participants:

- A new person creates a project and a first task in **under about 60 seconds** without help.
- The five-task test is completed with **no more than one wrong turn per task**.
- **At most 5** top-level navigation items and **at most 3** headline numbers on any screen.
- **At most about 15** status labels across the product.
- **Zero** team-only controls anywhere in the individual workspace.
- A person can explain, in one sentence, what traceability showed them.

### 11.7 Risks and trade-offs

- **Cutting top-level pages departs from the original specification.** The records still exist; they move inside the project. PROJECT-SPECS.md would need to be updated to match.
- **Traceability could become invisible** if it is only a lens. Keep it present on records and in the landing story, and test whether people notice it.
- **Quick add and templates are new features,** so they add scope; they are in the list because the research shows they remove more effort than they add.
- **The competitor review is thin.** It rests on search-result reviews; before positioning claims are made publicly, try two or three of these tools yourself with the same five tasks.

## 12. Sources

- Nielsen Norman Group, [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) (read in full).
- Nielsen Norman Group, [Minimize Cognitive Load to Maximize Usability](https://www.nngroup.com/articles/minimize-cognitive-load/) (read in full).
- Nielsen Norman Group, [Memory Recognition and Recall in User Interfaces](https://www.nngroup.com/articles/recognition-and-recall/) (read in full).
- Linear, [The Linear Method](https://linear.app/method) (table of contents only) and [Write issues, not user stories](https://linear.app/method/write-issues-not-user-stories) (seen in search results).
- Tool reviews (section 10; search-result summaries, not independently verified):
  - Notion: [The Digital Project Manager review](https://thedigitalprojectmanager.com/tools/notion-review), [Project-Management.com pros and cons](https://project-management.com/pros-and-cons-of-using-notion-software/).
  - ClickUp: [AppSumo review](https://blog.appsumo.com/?p=7730), [Connecteam review](https://connecteam.com/reviews/clickup/), [G2 reviews](https://www.g2.com/products/clickup/reviews?page=9).
  - Trello: [Kanban Zone on Trello limitations](https://kanbanzone.com/2023/trello-limitations-what-to-consider-before-using-trello/), [The Digital Project Manager review](https://thedigitalprojectmanager.com/tools/trello-review/).
  - Todoist, Things 3, TickTick: [DEV Community comparison](https://dev.to/pickuma/todoist-vs-ticktick-vs-things-3-task-managers-developers-actually-stick-with-3gol), [TechRepublic on Things 3](https://www.techrepublic.com/article/things-3-review/).
  - Linear: [DEV Community 18-month review](https://dev.to/onsen/linear-review-2026-honest-opinion-after-18-months-50k0), [The Digital Project Manager review](https://thedigitalprojectmanager.com/tools/linear-review/).
  - Asana: [Fastlancer review](https://www.fastlancer.org/en/fastlancer-blog/asana-review/), [Cloudwards review](https://www.cloudwards.net/asana-review/).
  - Basecamp: [The Digital Project Manager review](https://thedigitalprojectmanager.com/tools/basecamp-review), [Cloudwards review](https://www.cloudwards.net/basecamp-review/).
  - Milanote, Obsidian, Airtable: [Toolradar Milanote vs Airtable](https://toolradar.com/compare/milanote-vs-airtable), [TrustRadius Milanote vs Obsidian](https://www.trustradius.com/compare-products/milanote-vs-obsidian-markdown-editor).
- Search-result summaries (practitioner and vendor sites, not independently verified):
  - Personal vs team workspaces: [Granola workspaces](https://docs.granola.ai/help-center/workspaces), [Replit team workspaces](https://docs.replit.com/core-concepts/team-workspaces), [Shelf: why you cannot invite anyone to a personal workspace](https://www.shelf.nu/knowledge-base/why-you-cant-invite-anyone-to-a-personal-workspace), [Todoist team workspace](https://www.todoist.com/zh-CN/inspiration/todoist-team), [Dave Rupert: users then teams](https://daverupert.com/2024/01/users-then-teams/).
  - Single-player before multiplayer: [Commons: single-player mode pattern](https://commons-os.github.io/patterns/single-player-mode/), [CommandBar: rise of multiplayer SaaS](https://command.ai/blog/rise-of-multiplayer-saas), [Elena Verna on individual-centric PLG](https://elenaverna.com/p/a-deadly-gravitational-pull-in-plg).
  - Dashboard cognitive load and Hick's/Miller's laws: [LogRocket on cognitive overload](https://blog.logrocket.com/ux-design/cognitive-overload), [UX Pilot dashboard principles](https://uxpilot.ai/blogs/dashboard-design-principles), [Uxcel on reducing cognitive load](https://uxcel.com/blog/8-design-tips-to-reduce-cognitive-load-795).
  - Navigation structure: [Eleken on navigation design](https://www.eleken.co/blog-posts/ux-navigation-design), [Intercom on restructuring its information architecture](https://www.intercom.com/blog/designing-for-clarity-restructuring-intercoms-information-architecture), [SaaS sidebar navigation patterns](https://www.saasui.design/blog/saas-sidebar-navigation-ux-patterns).
  - Onboarding and empty states: [Appcues on value-first onboarding](https://www.appcues.com/product-adoption-academy/value-first-onboarding), [Kompassify empty states guide](https://kompassify.com/blog/empty-states-guide).
  - Traceability in Jira and Jama: [Atlassian traceability matrix template](https://www.atlassian.com/software/jira/templates/requirements-traceability-matrix), [Jama on tracking requirements in Jira](https://www.jamasoftware.com/requirements-management-guide/requirements-management-tools-and-software/can-you-track-requirements-in-jira/), [Links Explorer for Jira](https://marketplace.atlassian.com/apps/1211120/links-explorer-traceability-matrix-hierarchy-dependency).

## 13. Related project documents

- [PROJECT-SPECS.md](PROJECT-SPECS.md): the product specification the current module list comes from.
- [docs/plan/frontend/PLAN-A-04.md](docs/plan/frontend/PLAN-A-04.md): the workspace plan, rewritten as Revision 3 from this research (individual workspace, five destinations, project hub); its page plans are 04A to 04L in the same folder.
