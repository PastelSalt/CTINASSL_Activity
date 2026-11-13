# PLAN-A-04K — `/settings` Account and Application Preferences

## Scope

Plan for account, workspace, notification, appearance, density, legal, and security preference surfaces.

## Local navigation

- [ ] Account and profile
- [ ] Workspace preferences
- [ ] Notifications
- [ ] Appearance and density
- [ ] Legal and privacy

## Nested content

### Account and profile

- [ ] Show profile identity and account metadata.
- [ ] Reserve profile editing and session-management actions.
- [ ] Keep password and authentication controls separate from display preferences.

### Workspace preferences

- [ ] Show workspace name, defaults, project conventions, and future workflow defaults.

### Notifications

- [ ] Reserve notification categories, reminders, and delivery preferences.

### Appearance and density

- [ ] Show theme, contrast, density, and motion preferences.
- [ ] Keep theme values aligned with the centralized design system.

### Legal and privacy

- [ ] Link Privacy Policy, Terms of Service, and Cookie & Local Storage Policy.
- [ ] Explain prototype storage behavior without claiming durable account settings.

## Motion and states

- [ ] Use minimal motion to prioritize stable controls.
- [ ] Provide loading, empty, error, unauthorized, and unsaved-change states.
- [ ] Respect reduced motion.

## Data and security boundary

- [ ] Future sources: `users` and user preferences.
- [ ] Never process or expose credentials in the static exploration.
- [ ] Production authentication, authorization, secure cookies, secrets, and validation belong to the backend.
- [ ] Do not imply that changing a control persists until a settings API exists.

## Acceptance checklist

- [ ] Settings groups are clearly separated.
- [ ] Security-sensitive actions are visually distinct.
- [ ] Legal links remain accessible.

