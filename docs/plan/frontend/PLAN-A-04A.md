# PLAN-A-04A — `/dashboard` Overview Page

## Scope

Detailed implementation plan for the authenticated dashboard overview only. This page summarizes production activity and links users into the other authenticated modules.

## Page objectives

- [ ] Give users an immediate view of project health and current work.
- [ ] Keep the first viewport useful without requiring excessive scrolling.
- [ ] Make every metric traceable to a future record calculation.
- [ ] Clearly mark all current content as placeholder/demo data.

## Shared shell

- [ ] Use the authenticated application header with compact brand, demo workspace badge, and account trigger.
- [ ] Keep the full desktop module dock and compact mobile dock.
- [ ] Use the floating left page-section navigation:
  - [ ] Overview
  - [ ] Project pulse
  - [ ] Upcoming milestones
  - [ ] Tasks needing attention
  - [ ] Recent activity
  - [ ] Quick actions
- [ ] Keep legal links and `Back to landing` in the footer.

## Nested content

### Overview

- [ ] Compact page heading and workspace context.
- [ ] Metric cards:
  - [ ] Total projects
  - [ ] Active projects
  - [ ] Open tasks
  - [ ] Overdue records
- [ ] Document each metric formula and source collection.

### Project pulse

- [ ] Show recently accessed projects.
- [ ] Show project category, status, next thread, and progress source.
- [ ] Link each project to its project workspace when that route exists.

### Upcoming milestones

- [ ] Show milestone title, project, due date, priority, and status.
- [ ] Distinguish upcoming, overdue, completed, and blocked states without color alone.

### Tasks needing attention

- [ ] Show urgent, due-soon, blocked, and overdue tasks.
- [ ] Show project and milestone context.
- [ ] Link to the task module.

### Recent activity

- [ ] Show chronological activity entries.
- [ ] Include actor, action, affected record, project, and timestamp.
- [ ] Link to reports or the affected record where supported.

### Quick actions

- [ ] Provide presentation-only `Create project` and `Create task` actions during the prototype.
- [ ] Define future modal/form destinations without implying persistence.

## Motion and responsive behavior

- [ ] Use compact-header GSAP entry.
- [ ] Reveal metrics and panels in reading order with restrained stagger.
- [ ] Animate section changes without delaying content access.
- [ ] Disable non-essential motion with `prefers-reduced-motion`.
- [ ] Validate desktop, tablet, 390px, and 320px layouts.

## Data and production boundary

- [ ] Future sources: `projects`, `milestones`, `tasks`, `activities`.
- [ ] Avoid manually invented percentages.
- [ ] Provide loading, empty, error, and unauthorized states.
- [ ] Do not implement authentication, persistence, API calls, or real account actions in the static pass.

## Acceptance checklist

- [ ] User can understand current work from the first viewport.
- [ ] Every dashboard section is reachable from local navigation.
- [ ] Metrics have documented calculation definitions.
- [ ] Keyboard, reduced-motion, and responsive checks pass.

