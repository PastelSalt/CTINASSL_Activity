# PLAN-A-04K — `/settings` Settings (UI Plan, Revision 2)

**Parent:** [PLAN-A-04.md](PLAN-A-04.md) · **Scope:** UI only, local control state, no operations · **Status:** Planning

## 1. Current state (observed)

- Sections: Account and profile, Workspace preferences, Notifications, Appearance and density, Legal and privacy.
- Each setting is a card with a label, note, and a static value on the right (`Demo user`, `On`, `Compact`). Nothing is a control, so the page cannot be judged as a settings screen (audit F9).
- A `Save settings` button sits in the toolbar although nothing can change, and the header shows `Review preferences` + `New task`.
- A search field searches five-item groups, which adds noise.
- Security and display preferences are not visually distinct, as the plan required.

## 2. UI goals

1. Show the **real control types** (toggle, select, segmented, text field) so the interface can be evaluated.
2. Local state only, labelled **"Preview only — not saved"**; no Save button and no fake success.
3. Visually separate **security/account** actions from **display preferences**.
4. Keep legal links one click away and explain prototype storage honestly.

## 3. Layout

```text
Header: Settings                                           (no primary action)
        Preferences for your account and this workspace.
Tabs (vertical list ≥1024px, horizontal scroll tabs below):
        Account | Workspace | Notifications | Appearance | Privacy & legal | Security
Content: grouped form sections, max width 720px
┌ Profile ─────────────────────────────────────────────┐
│ Display name  [ Demo user                        ]   │
│ Email         demo@example.test  (read-only)         │
│ Role          Workspace member   (read-only)         │
└──────────────────────────────────────────────────────┘
┌ Notifications ─ Task reminders [ON ] Review requests [ON ] Weekly digest [OFF] ┐
Banner (sticky within content): ⓘ Preview only — changes are not saved and reset when you reload.
```

Settings is the one module where a left vertical list of views is retained on desktop (six peer groups, each a form); it uses the same `ViewTabs` component in its vertical orientation.

## 4. Views

| View | Controls (local state) | Notes |
|---|---|---|
| Account | Display name (text), avatar color (swatches), email and role (read-only) | Email is fixture data; no credential fields here |
| Workspace | Workspace name, default view (List/Board segmented), default project category (select), week start (select) | Shows where defaults apply |
| Notifications | Per-category toggles (task reminders, review requests, mentions, digest) with a delivery select (In-app / Email) | Descriptions explain each category |
| Appearance | Density (Comfortable/Compact segmented), text size (S/M/L), reduced motion (System/On/Off) | **Live preview inside the page only:** density and text size apply to a sample card on the page, not to the whole app, so no global state persists |
| Privacy & legal | Links to Privacy Policy, Terms of Service, Cookie & Local Storage Policy; a plain explanation of what the prototype stores (nothing) | Opens the existing legal routes |
| Security | Change password, active sessions list, sign out of all devices — rendered as **preview action buttons** inside a bordered "Security" panel with a distinct icon and heading | No password field is ever shown; dialogs show layout only |

## 5. Presentation rules

- Each group is a titled section with a short description; rows are label + help text on the left, control on the right (stacked below 640px).
- Destructive or security actions use a separate panel with an outline + icon (not color alone) and a confirmation layout dialog.
- Changed-control indicator: a small "Edited" chip next to a changed field, cleared by `Reset to demo values` (local only). This demonstrates the unsaved-change state without a Save button.
- The search field is removed; the page has six short groups.

## 6. Components

Shared: `PageHeader` (no primary action), `ViewTabs` (vertical variant), `DemoBanner`, `PreviewActionButton`, `EmptyState`, `Skeleton`. Page-specific: `SettingsSection`, `SettingRow`, `Toggle`, `Segmented`, `SwatchPicker`, `SecurityPanel`, `EditedChip`.

## 7. States

- [ ] Unsaved/edited indicator (local) and `Reset to demo values`.
- [ ] Read-only field presentation.
- [ ] Loading skeleton form; error "Settings could not load"; unauthorized.
- [ ] Session-expired preview dialog (layout only) from the Security panel.

## 8. Responsive

≥1024: vertical view list (220px) + content (≤720px). <1024: horizontal scroll tabs; setting rows stack (control below the label); security panel full width with 44px controls. At 320px, toggles and selects keep a 40px minimum touch target.

## 9. Fixture needs

A single `demoUser` and `demoPreferences` object (name, email, role, notification flags, density, text size, motion). No credentials, tokens, or session identifiers appear in fixtures.

## 10. Preview-only actions

`Change password`, `Sign out of all devices`, `Export my data`, `Delete account` (confirmation layout) — all open preview dialogs and perform nothing.

## 11. Acceptance checklist

- [ ] No `Save settings` button anywhere; the preview-only banner is visible on every group.
- [ ] Controls are real (toggle, select, segmented, text) with proper labels and keyboard behavior.
- [ ] Security panel is visually distinct from display preferences.
- [ ] Legal links work and the storage explanation says nothing is persisted.
- [ ] Changed controls show an "Edited" chip; `Reset to demo values` clears them.
- [ ] Verified at 320, 390, 768, 1024, 1280, 1536.

## 12. Carried over from Revision 1

Account, workspace, notification, appearance, and legal groupings; legal links; the rule that no credentials are processed.

## Implementation status — 2026-11-14

Done: Account, Workspace, Notifications, Appearance, Privacy and legal, and Security groups with real local controls (text, swatches, switches, segmented, selects); a Preview only notice, per-group Edited chip, and Reset to demo values; no Save button; density and text size preview on a sample card only; Security actions as preview dialogs with no password fields. Not done: the avatar color does not change the avatar elsewhere; session list.
