# PLAN-A-04A — `/dashboard` Overview Page

## Scope

Detailed implementation plan for the authenticated dashboard overview only. This page summarizes production activity and links users into the other authenticated modules.

## Page objectives

- [x] Give users an immediate view of project health and current work.
- [x] Keep the first viewport useful without requiring excessive scrolling.
- [x] Make every metric traceable to a future record calculation.
- [x] Clearly mark all current content as placeholder/demo data.

## Shared shell

- [x] Use the authenticated application header with compact brand, demo workspace badge, and account trigger.
- [x] Keep the full desktop module dock and compact mobile dock.
- [x] Use the floating left page-section navigation:
  - [x] Overview
  - [x] Project pulse
  - [x] Upcoming milestones
  - [x] Tasks needing attention
  - [x] Recent activity
  - [x] Quick actions
- [x] Keep legal links and `Back to landing` in the footer.

## Nested content

### Overview

- [x] Compact page heading and workspace context.
- [x] Metric cards:
  - [x] Total projects
  - [x] Active projects
  - [x] Open tasks
  - [x] Overdue records
- [x] Document each metric formula and source collection.

### Project pulse

- [x] Show recently accessed projects.
- [x] Show project category, status, next thread, and progress source.
- [x] Link each project to its project workspace when that route exists.

### Upcoming milestones

- [x] Show milestone title, project, due date, priority, and status.
- [x] Distinguish upcoming, overdue, completed, and blocked states without color alone.

### Tasks needing attention

- [x] Show urgent, due-soon, blocked, and overdue tasks.
- [x] Show project and milestone context.
- [x] Link to the task module.

### Recent activity

- [x] Show chronological activity entries.
- [x] Include actor, action, affected record, project, and timestamp.
- [x] Link to reports or the affected record where supported.

### Quick actions

- [x] Provide presentation-only `Create project` and `Create task` actions during the prototype.
- [x] Define future modal/form destinations without implying persistence.

## Motion and responsive behavior

- [x] Use compact-header GSAP entry.
- [x] Reveal metrics and panels in reading order with restrained stagger.
- [x] Animate section changes without delaying content access.
- [x] Disable non-essential motion with `prefers-reduced-motion`.
- [x] Validate desktop, tablet, 390px, and 320px layouts.

## Data and production boundary

- [x] Future sources: `projects`, `milestones`, `tasks`, `activities`.
- [x] Avoid manually invented percentages.
- [x] Provide loading, empty, error, and unauthorized states.
- [x] Do not implement authentication, persistence, API calls, or real account actions in the static pass.

## Acceptance checklist

- [x] User can understand current work from the first viewport.
- [x] Every dashboard section is reachable from local navigation.
- [x] Metrics have documented calculation definitions.
- [x] Keyboard, reduced-motion, and responsive checks pass.

