# PLAN-A-04L — Quick add, templates, first run, and command palette (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Status:** Planning · **New in Revision 3** · **Evidence:** RESEARCH.md 3.3, 3.5, section 10 (Todoist and Linear speed; Notion templates), section 11.3 items 7, 8, 10, 13

## 1. Purpose

Remove effort from the two moments that decide whether the tool feels easy: **starting** (first project) and **every day** (adding and finding things).

## 2. Quick add

- **Entry points:** a button in the rail (desktop) and the centre of the mobile bar; the `q` key when no field is focused; an inline field at the top of Tasks and of a project's Work tab.
- **One field.** Type a title; a line below shows what was understood, as removable chips:
  - **Project:** defaults to the current project, or the last used; type `#` to pick another.
  - **Due:** simple words (today, tomorrow, a weekday, a date); shown as a chip.
  - **High priority:** `!` marks it High.
- **Enter** adds; the field stays open for the next one; **Escape** closes. No other fields are asked for. Anything else (notes, subtasks, milestone) is edited later in the task panel.
- **Frontend-only behaviour:** the task is added to **session-only in-memory state** so it appears in Today, Upcoming, and All immediately; a quiet note says "Added for this session only". Reload resets it. No other record type can be created this way.
- Mobile: a bottom sheet with the keyboard open; chips scroll horizontally.

## 3. Templates

New project opens a **template picker** (one dialog, two steps: pick, then name).

| Template | Phases | Starter records (examples) |
|---|---|---|
| Software | Discovery, Design, Build, Test, Ship | Milestone "First release"; tasks "Write the first requirement", "Sketch the main screen" |
| Creative | Concept, Outline, Draft, Review, Release | Milestone "Outline locked"; tasks "Write the one-page brief", "Collect references" |
| Research | Question, Method, Collection, Analysis, Report | Milestone "Protocol ready"; tasks "Write the research question", "List sources" |
| Multimedia | Brief, Production, Edit, Review, Master | Milestone "First cut"; tasks "Write the brief", "Gather assets" |
| Blank | One phase | Nothing |

Starter records are clearly **sample content** that can be deleted; each template previews its phases before creation. The four kinds mirror the landing page's "worlds".

## 4. First run

- A workspace with no projects shows a **checklist** instead of Home's body: *Create a project → Add a first milestone → Add a first task*. Three items, skippable, with one visible **next** action; it disappears when done or skipped (session only).
- An empty project shows a short first-use message in each tab (04C) with the single action that makes sense there.
- Sample data is always labelled ("Sample workspace" in the account menu and footer).

## 5. Command palette

- **Open:** `Ctrl` or `Cmd` plus `K`, and the search field in the top bar.
- **Contents (recognition over recall):** recent projects and records first; then navigation destinations, then actions (Add task, New project, Add requirement, Add file). Results show the type, project, and the keyboard hint.
- **Behaviour:** labelled dialog, type to filter, arrow keys to move, Enter to go, Escape to close; actions open the same preview-only dialogs.
- Search covers titles of projects, tasks, requirements, and files in the fixtures; it never searches document bodies in v1.

## 6. Components and files

`quickadd/QuickAdd.jsx` (field, chips, parser), `quickadd/CommandPalette.jsx`, `quickadd/NewProjectDialog.jsx` and `quickadd/templates.js`, `home/FirstRunChecklist.jsx`; shared `Dialog` and `Sheet`. The palette, templates, and the parser are one lazy chunk loaded on first use.

## 7. Accessibility

Quick add and the palette are labelled dialogs or sheets with focus management and Escape to close; shortcuts are announced in tooltips and in the palette; every action is also reachable by mouse and touch; the parser output is a live region ("Project Garden, due tomorrow").

## 8. Acceptance checklist

- [ ] A new person adds a task in under five seconds from any page.
- [ ] A new project is created from a template in under 60 seconds including naming.
- [ ] The first-run checklist has three skippable items and one clear next action.
- [ ] The palette lists recent items first and works entirely from the keyboard.
- [ ] Session-only additions are labelled and never claim to be saved.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
