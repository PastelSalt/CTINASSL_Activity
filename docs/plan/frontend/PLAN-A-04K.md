# PLAN-A-04K — `/account` Account and preferences (Revision 3)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Replaces:** `/settings` · **Status:** Planning · **Evidence:** RESEARCH.md D5, D9

## 1. Purpose

Your profile, how the app behaves for you, privacy information, and the developer tools that used to clutter every page. Reached from the **account menu**, not the rail.

## 2. What changes from Revision 2

- Moved out of the rail; route `/account` (`/settings` redirects).
- Six groups (Account, Workspace, Notifications, Appearance, Privacy and legal, Security) become **five**: **Profile, Preferences, Appearance, Privacy and legal, Developer**.
- Removed: the **Security** panel (no password, sessions, or account deletion until real accounts exist), notification categories for other people (mentions, review requests), the digest.
- Added: **Developer** section holding the demo scaffolding (section 4).
- Still **no Save button**; controls are local and show an "Edited" chip with `Reset to demo values`, and a "Preview only" notice.

## 3. Groups

| Group | Controls (local state) |
|---|---|
| Profile | Display name, avatar colour, read-only email |
| Preferences | Default Tasks view (Today, Upcoming, All), week starts on, **Reminders** (a single toggle for reminders to yourself) |
| Appearance | Density, text size, reduced motion (System, On, Off), with a sample card that previews the choice |
| Privacy and legal | Links to the three policies and a plain statement that the demo stores nothing |
| Developer | Show preview-state selector, show sample-data explanation, reset sample data, "leave demo" |

## 4. Developer section

- Off by default. Turning it on shows the preview-state selector (Normal, Loading, Empty, Error) in the page header area, and the sample-data explanation.
- Also enabled by `?dev` in the URL for the session.
- Rationale: the demo bar and selector are scaffolding (RESEARCH.md D5) and must not compete with the product.

## 5. Layout

A narrow column (max 720px) with a vertical group list at ≥768px and a horizontal tab strip below. Each group is a titled section with label and help text on the left and the control on the right, stacked on mobile.

## 6. Components

Shared: `PageHeader` (no primary action), `ViewTabs` (vertical variant), form components (`Toggle`, `Segmented`, `SwatchPicker`, `TextField`), `PreviewAction`. New: `DeveloperPanel`.

## 7. States

Edited indicator and reset; read-only fields; loading and error.

## 8. Responsive

At 320px toggles and selects keep a 40px minimum target; rows stack with the control below the label.

## 9. Preview-only actions

`Leave demo` (goes to the landing page or login), `Reset sample data` (confirmation layout).

## 10. Acceptance checklist

- [ ] No Save button; the Preview-only notice is visible on every group.
- [ ] No Security, notification-category, member, or role controls.
- [ ] Developer tools are off by default and fully contained in this section.
- [ ] Legal links work and the storage statement says nothing is persisted.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## Implementation status (Revision 3)

Implemented on 2026-11-14 after the owner approved D6-D10. See `LOG.md` for the entry, files, and validation. Deviations: Quick add and the palette use one shared native-dialog shell (`quickadd/Modal.jsx`); the first-run checklist lives on Home; compare mode shows the changed document as one diff pane rather than two columns. Not yet verified: screen-reader pass, 320 and 1440px visual review.
