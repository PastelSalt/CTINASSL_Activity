import { Archive, ArrowUp, Calendar, Check, CircleCheckBig, Circle, Compass, Loader, OctagonX, Pause, Pencil, Play, ShieldCheck, Star, TriangleAlert, ClipboardCheck } from 'lucide-react'

// One small vocabulary (PLAN-A-04 section 6): about 15 labels. Icon plus text, never colour alone.
// Tones: neutral, info, progress, warning, danger, success (defined once in workspace.css).
const s = (tone, icon) => ({ tone, icon })

export const STATUS = {
  project: { Planning: s('progress', Compass), Active: s('success', Play), 'On hold': s('warning', Pause), Done: s('neutral', CircleCheckBig), Archived: s('neutral', Archive) },
  work: { 'To do': s('info', Circle), Doing: s('progress', Loader), Done: s('success', CircleCheckBig) },
  derived: { Upcoming: s('info', Calendar), Doing: s('progress', Loader), Overdue: s('danger', TriangleAlert), Done: s('success', Check) },
  requirement: { Open: s('info', Circle), Met: s('success', Check) },
  document: { Draft: s('warning', Pencil), Final: s('success', Star) },
  health: { 'On track': s('success', Check), 'At risk': s('warning', TriangleAlert) },
  change: { Recorded: s('neutral', ClipboardCheck) },
}

/** Flags shown next to a status when they apply. */
export const FLAGS = {
  Blocked: s('danger', OctagonX),
  Verified: s('success', ShieldCheck),
  Reviewed: s('success', Check),
  Final: s('success', Star),
  High: s('warning', ArrowUp),
}

export const WORK_STATUSES = Object.keys(STATUS.work)
export const PROJECT_STATUSES = ['Planning', 'Active', 'On hold', 'Done']
