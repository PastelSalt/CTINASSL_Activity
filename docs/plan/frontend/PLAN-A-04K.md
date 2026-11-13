# PLAN-A-04K — `/settings` Account and Application Preferences

## Scope

Plan for account, workspace, notification, appearance, density, legal, and security preference surfaces.

## Local navigation

- [x] Account and profile
- [x] Workspace preferences
- [x] Notifications
- [x] Appearance and density
- [x] Legal and privacy

## Nested content

### Account and profile

- [x] Show profile identity and account metadata.
- [x] Reserve profile editing and session-management actions.
- [x] Keep password and authentication controls separate from display preferences.

### Workspace preferences

- [x] Show workspace name, defaults, project conventions, and future workflow defaults.

### Notifications

- [x] Reserve notification categories, reminders, and delivery preferences.

### Appearance and density

- [x] Show theme, contrast, density, and motion preferences.
- [x] Keep theme values aligned with the centralized design system.

### Legal and privacy

- [x] Link Privacy Policy, Terms of Service, and Cookie & Local Storage Policy.
- [x] Explain prototype storage behavior without claiming durable account settings.

## Motion and states

- [x] Use minimal motion to prioritize stable controls.
- [x] Provide loading, empty, error, unauthorized, and unsaved-change states.
- [x] Respect reduced motion.

## Data and security boundary

- [x] Future sources: `users` and user preferences.
- [x] Never process or expose credentials in the static exploration.
- [x] Production authentication, authorization, secure cookies, secrets, and validation belong to the backend.
- [x] Do not imply that changing a control persists until a settings API exists.

## Acceptance checklist

- [x] Settings groups are clearly separated.
- [x] Security-sensitive actions are visually distinct.
- [x] Legal links remain accessible.

