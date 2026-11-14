# Tsumugi individual workspace guide

**Applies to:** the individual workspace (one person, no team features)
**Status:** describes the demo. Everything runs on sample data in your browser. Nothing is saved or sent anywhere.

> This guide is the single source for the in-app Help page. Edit this file and the Help page updates with it.

## 1. What the individual workspace is

The individual workspace is for one person working alone: a freelancer, a student, or anyone planning their own work. There are no teammates, assignees, roles, invitations, or sharing settings. Every project, task, and file belongs to you.

Tsumugi connects the *why* behind your work to the *what you made*. A project has an objective. The objective breaks into requirements (what must be true when you are done). Requirements are carried out by tasks, grouped under milestones. Tasks produce files and documents, and every edit leaves a recorded change. Because these records are linked, you can always answer "why does this exist?" and "what did it turn into?".

### 1.1 What you can do today

- See what needs your attention today on **Home**.
- Add a task in a few seconds with **Quick add**.
- Plan and review work by day, week, or month in **Tasks** and its **Calendar** view.
- Organise work into **Projects**, each with phases, milestones, tasks, requirements, files, and history.
- Keep notes, documents, images, and links together in the **Library**.
- Check progress, requirement coverage, and what is overdue in **Insights**.

### 1.2 What this demo does not do

- It does not save anything. Items you add last until you reload the page.
- Buttons such as Edit, Mark done, and Add file open a **Preview only** dialog. They show where the action will live but do not change data.
- It has no sign-in, sync, notifications, or file upload yet.

## 2. Getting around

### 2.1 The five destinations

The left rail (or the bottom bar on a phone) has five destinations:

- **Home:** today at a glance.
- **Projects:** everything you are working on.
- **Tasks:** every task across projects, with Today, Upcoming, Calendar, and All views.
- **Library:** notes, documents, and files from every project.
- **Insights:** three numbers that show where things stand.

Your account menu sits at the bottom of the left rail. On a phone it is the round button at the top right, and Insights is listed there because the bottom bar has room for only four destinations.

### 2.2 The top bar

- **Search or jump to:** opens the command palette (see 2.3).
- **Today chip:** the date the demo treats as today.
- **Due today and Overdue chips:** counts of open tasks. Select either to open Tasks.

### 2.3 The command palette

Press **Ctrl+K** (or **Cmd+K** on a Mac), or select the search box in the top bar.

- With nothing typed, you see recent items and common commands.
- Type to find a project, a file, or a page.
- Use the **Up** and **Down** arrow keys to move, **Enter** to open, and **Esc** to close.
- Commands include Quick add a task and New project.

### 2.4 Keyboard shortcuts

- **Q:** open Quick add (when you are not typing in a field).
- **Ctrl+K or Cmd+K:** open the command palette.
- **Esc:** close a dialog, a menu, or a details panel.
- **Enter** in Quick add: add the task. The dialog stays open so you can add another.

### 2.5 The account menu

Select your name at the bottom of the left rail. The menu holds:

- **Account and preferences:** profile and preferences.
- **Developer tools:** shows or hides the developer bar (see 12.2).
- **Help:** opens this guide.
- **Legal:** Privacy Policy, Terms of Service, and Cookie and Local Storage policy.
- **Back to landing page** and **Leave demo.**

## 3. The building blocks

### 3.1 Records

- **Project:** a body of work with an objective, dates, a category, and phases.
- **Milestone:** a dated checkpoint inside a project. Milestones group tasks.
- **Task:** one thing to do. A task has a status, an optional due date, a priority, and may have subtasks.
- **Requirement:** something that must be true when the project is done, with acceptance criteria.
- **File:** an uploaded file, an image, a link, or a written document.
- **Change:** a recorded edit, such as a changed document or a new task.

### 3.2 How records connect

- A requirement links to the tasks that carry it out and the files that prove it.
- A task can link to a milestone, to requirements, to files, and to changes.
- A file or document can link to requirements and tasks.
- A change points at the record it changed.

Open any record and look at the **Why it exists** and **What it becomes** block. The first lists what is above the record (its project, milestone, and requirements). The second lists what follows from it (files, changes, tasks). Each item is a link.

### 3.3 Statuses

Tsumugi keeps the vocabulary small.

- **Task status:** To do, Doing, Done.
- **Project status:** Planning, Active, On hold, Done. Archived projects are hidden until you ask for them.
- **Milestone state:** Upcoming, Doing, Overdue, Done. This is worked out from dates and tasks, not set by hand.
- **Requirement:** Open or Met. A requirement can also be **Verified**.
- **Document:** Draft or Final.
- **Project health:** On track, or At risk when the project has an overdue task.

Some labels are flags that sit next to a status: **Blocked**, **High priority**, **Verified**, **Reviewed**, and **Final file**. Colour is never the only signal: every status also has an icon and a word.

### 3.4 Dates

Due dates show as plain words: Today, Tomorrow, In 3 days, or the date. Overdue items say how many days late they are. Hover over a date to see the exact day. In this demo, "today" is fixed at 12 November 2026 so the sample data always makes sense.

## 4. Home

Home answers: what needs me today, and what is coming?

- **Three figures:** Due today, Overdue, and In progress.
- **Today:** overdue tasks, tasks due today, and tasks you are already doing. Select a task to open it in Tasks.
- **Up next:** tasks and milestones due in the next seven days.
- **Your projects:** your most recently opened projects with progress. Select **New project** to start one.
- **Recent:** the last records you touched.

### 4.1 First run

When the workspace is empty, Home shows a short checklist of three optional steps: create a project, add a task, and open the Library. Tick each off or ignore it. To see this state in the demo, add `?preview=empty` to the address or choose "Empty / first run" in the developer bar.

## 5. Quick add

Quick add creates a task in one line.

1. Press **Q**, select **Quick add** in the rail, or use the round **+** button in the phone bar.
2. Type the task. Details are picked up as you type and shown as chips under the field.
3. Press **Enter** to add it. A confirmation line appears and the field clears.
4. Press **Esc** to close.

### 5.1 Quick add shortcuts

- **#project:** puts the task in a project. Type part of its name, for example `#garden`.
- **Day words:** `today`, `tomorrow`, or a weekday such as `fri` set the due date. A weekday means the next one.
- **!** (or `!high`): marks the task as high priority.

Example: `Proof chapter one #garden fri !` creates "Proof chapter one" in Project Garden, due on the next Friday, as high priority.

If you do not name a project, the task goes to your first active project. Tasks added this way are marked **Session only**.

## 6. Tasks

Tasks is the one place to see all your work. It has four views, chosen from the tabs under the title.

### 6.1 Today

- Groups: **Overdue**, **Today**, and **In progress**.
- An **inline add** field at the top adds a task due today. Type and press Enter.

### 6.2 Upcoming

Open tasks and milestones due in the next 30 days, grouped by day.

### 6.3 Calendar

A month grid of your tasks and milestones. See section 7.

### 6.4 All

Every task in one list, with open tasks first and overdue tasks on top. Finished tasks are folded into a **Done** section you can expand.

Use the **List / Board** switch to change layout. Board shows three columns: To do, Doing, and Done.

### 6.5 Searching and filtering

- Type in the search box to match task titles.
- Select **Filter** to narrow by project (and by status in the All view). The Filter button shows how many filters are active, and **Clear filters** resets them.
- Your view, filters, and selected task are kept in the address bar, so you can bookmark or share a link to exactly what you see.

### 6.6 The task panel

Select a task to open its panel. On wide screens the panel docks on the right; on smaller screens it slides up from the bottom. The panel shows the status, flags, notes, due date, milestone, subtasks, and the **Why it exists / What it becomes** block. Its buttons (Edit task, Change status, Mark blocked) are preview only in this demo. Press **Esc** or the close button to dismiss it.

## 7. Calendar

The calendar is a view inside Tasks. Open **Tasks**, then choose **Calendar**.

### 7.1 Reading the calendar

- Weeks start on Monday. Today is outlined.
- Each day lists the tasks due that day as small pills. Milestones that fall due that day are shown with a flag icon.
- Done tasks are crossed out. Overdue tasks are tinted. High priority tasks carry an arrow.
- A day with more items than fit shows "+N more". On a phone, a day shows a count dot instead of pills.
- Days outside the current month are dimmed.

### 7.2 Moving around

- **Previous / Next:** change month.
- **Today:** jump back to the current month.
- The month is kept in the address bar as `?month=2026-11`.

### 7.3 The day agenda

Select a day. Below the grid you see an agenda for that day: its milestones and tasks, each one opening the full task panel. This is also where you read future plans: select a day next week or next month to see what is scheduled.

### 7.4 Filtering

Use **Filter** to show one project at a time. The search box narrows the pills and the agenda to matching tasks.

## 8. Projects

### 8.1 The list

Projects opens as a set of cards. Each card shows the category, name, short description, status, progress (tasks done out of all tasks), and the next milestone.

- A project with an overdue task shows **At risk**.
- **Session only** marks projects you created in this visit.
- Use **Filter** for status, category, and **Show archived**.

### 8.2 The timeline

Choose **Timeline** to see every milestone from every project on one date axis. A pink line marks today. Bars are tinted by state (done, doing, overdue). Select a bar to open the milestone. On a phone, the timeline becomes a vertical list.

### 8.3 Creating a project

1. Select **New project** (on Projects, on Home, or from the palette).
2. Pick a template: **Software**, **Creative**, **Research**, **Multimedia**, or **Blank**.
3. Give it a name (optional) and select **Create project**.

The template sets the project's phases and adds a starter milestone and a couple of starter tasks. Delete or change them freely. The new project opens straight away and is marked as session only.

## 9. A project page

Open a project from its card. The header shows the name, a short description, the project status, and health. Five tabs sit under it.

### 9.1 Overview

- **Phases:** a row showing where the project is, such as Concept, Outline, Chapter one, Review, Release.
- **Three figures:** tasks done, requirements complete, and files.
- **Next milestone**, **About** (objective, dates, tags), and **Recent changes**.

### 9.2 Work

Tasks grouped by milestone. Each group shows the milestone state, due date, and task progress. Tasks with no milestone sit in a **No milestone** group. Switch between **Groups** and **Timeline** at the top. Select a task or a milestone for its panel.

### 9.3 Specs

Requirements. Each row shows its ID, title, how many acceptance criteria are met, and how much work and how many files are linked. A row can show **No work yet** when no task is linked.

Open a requirement to read its description and acceptance criteria. A requirement is only complete when it is **Met**, **Verified**, has at least one linked task, and has a **Final file**. The gaps are listed in its panel so you know what is missing.

### 9.4 Files

The project's files as tiles. Select one to see its details, tags, links, and a preview area. Types that cannot be previewed in the browser say so plainly. Uploads in progress show their percentage.

### 9.5 History

A feed of changes, newest first, grouped by day. Select a change to see what was affected and what it was linked to. For a changed document, **Open comparison** shows the removed and added lines. Removed lines are crossed out and marked with a minus, and added lines are marked with a plus, so the change is clear without relying on colour.

## 10. Library

The Library gathers every note, document, image, data file, and link from all projects.

- **Grid / List** switch layouts.
- **Search** matches file names and tags.
- **Filter** by type, project, and **Final files only**.
- Select a file to see its panel. For files, the panel has **Download** and **Mark as final file** (preview only).

### 10.1 The document reader

Select a document (a written note or brief) to read it on its own page.

- **Outline:** a list of sections on the left. Select one to jump to it.
- **Preview / Source:** Preview shows formatted text. Source shows the raw Markdown.
- **Status:** Draft or Final, with a version number.
- **Why it exists / What it becomes:** the requirements and tasks the document links to.
- **Back to Library** returns you to the grid.

## 11. Insights

Insights keeps to three numbers. Use the **Project** selector to look at one project or all of them.

- **Progress:** done tasks divided by all tasks.
- **Coverage:** requirements that are complete out of all requirements, plus how many have gaps.
- **Overdue:** open tasks and milestones with a date before today. They are listed below so you can act on them.

Under the cards, **By project** compares status, health, and progress. **How these are counted** repeats the definitions.

## 12. Account, preferences, and developer tools

### 12.1 Account

Open the account menu, then **Account and preferences**. You can edit your name and email, the first day of the week, density, reminders, and motion. This page is a preview: edits show an **Edited** chip and a **Reset** link, but nothing is saved.

### 12.2 Developer tools

Developer tools are for reviewing the designed screens. Most people never need them.

- Turn them on from the account menu, from Account, or by adding `?dev` to the address.
- **Preview state:** Normal, Loading, Empty / first run, or Error. This shows how any page looks in each state.
- **Reset sample data:** removes the tasks and projects you added this session.

## 13. Everyday workflows

### 13.1 Start a new project

1. Press **Ctrl+K**, type "New project", and press Enter.
2. Pick a template and name it.
3. On the project page, open **Work** and refine the starter tasks.
4. Open **Specs** and write what must be true when you are done.
5. Link tasks to requirements as you create them.

### 13.2 Plan your week

1. Open **Tasks**, then **Calendar**.
2. Find the week and the days with too much on them.
3. Select a heavy day to see its agenda.
4. Use **Quick add** (`Q`) with a day word to put new work on a lighter day.
5. Return to **Today** each morning to start.

### 13.3 Clear what is overdue

1. Select the **overdue** chip in the top bar.
2. Open each task and decide: do it, change its status, or move it.
3. Check **Insights** to confirm the Overdue number is falling.

### 13.4 Trace a requirement

1. Open the project, then **Specs**, then the requirement.
2. In **What it becomes**, follow the linked tasks and files.
3. If you see **No task yet** or **No final file yet**, that is the gap to close.
4. When the criteria are met, mark the requirement **Met**, then **Verified**.

### 13.5 Review what changed

1. Open the project, then **History**.
2. Select a change to see its links.
3. For a document change, choose **Open comparison**.
4. Mark it **Reviewed** when you are happy.

### 13.6 Finish a project

1. Check **Insights** for the project: progress at 100%, coverage complete, nothing overdue.
2. Mark a final file for each requirement.
3. Set the project status to **Done**. Archive it when you no longer need it on the list.

## 14. On a phone or tablet

- The bottom bar has Home, Projects, Tasks, and Library, with a round **+** in the middle for Quick add.
- The account button is at the top right. It includes Insights, Help, and the legal links.
- Detail panels slide up from the bottom. Filters open as a bottom sheet.
- The calendar shows a count per day. Select a day to read its agenda.
- Everything works with touch and with a keyboard.

## 15. Accessibility

- Every control can be reached and used with the keyboard. Dialogs trap focus and return it when closed.
- Status is shown with an icon and a word as well as colour.
- Text is never smaller than 12 pixels, and controls are at least 24 pixels square.
- Motion is gentle. If your device is set to reduce motion, animations are turned off.
- Screen readers get labels for icon-only buttons, a live message when Quick add succeeds, and headings that follow the page structure.

## 16. Frequently asked questions

### Why did my task disappear?

Tasks and projects you add in the demo last only for the visit. Reloading the page removes them. Use **Reset sample data** in the developer bar to clear them on purpose.

### Why does a button say "Preview only"?

The action is not connected yet. The dialog shows where it will live and confirms that nothing was changed.

### Why is today 12 November 2026?

The demo fixes the date so overdue, today, and upcoming always match the sample data.

### How do I put a task on a specific date?

Use a day word in Quick add (`tomorrow`, `fri`). Tasks added from the inline field on Today are due today.

### Where did Milestones, Requirements, Assets, Revisions, Documentation, Reports, and Settings go?

They were folded into the five destinations. Milestones are on Projects (Timeline) and each project's Work tab. Requirements are under Specs. Assets and documentation are in the Library. Revisions are under History. Reports became Insights, and Settings became Account. Old links still redirect to the right place.

### Can I share a link to what I am looking at?

Yes. The view, filters, selected record, and calendar month are in the address bar.

## 17. Glossary

- **Acceptance criteria:** the checks that show a requirement is met.
- **Coverage:** how many requirements are complete.
- **Final file:** the file you mark as the finished proof for a requirement.
- **Lens:** the Why it exists / What it becomes block on a record.
- **Milestone:** a dated checkpoint that groups tasks.
- **Phase:** a stage of the project, such as Concept or Review.
- **Requirement:** something that must be true when the project is done.
- **Session only:** added in this visit and not saved.
- **Specs:** the project tab that holds requirements.

## 18. Coming later

These are not in the individual workspace yet.

- Saving, sign-in, and sync.
- Real file upload and download.
- Notifications and reminders.
- Recurring tasks and drag-to-reschedule on the calendar.
- A team workspace with people, roles, and sharing. It will be a separate workspace type so the individual workspace stays simple.
