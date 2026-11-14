import {
  Archive, ArrowDown, ArrowUp, Calendar, Check, ChevronsUp, CircleCheck, CircleCheckBig, CircleX, Circle, Clock, Compass,
  Eye, FileText, Hourglass, Inbox, Lightbulb, Loader, Lock, Minus, OctagonX, Pause, Pencil, Play, ShieldAlert, ShieldCheck, TriangleAlert, Download, Link2,
} from 'lucide-react'

// Single source of truth for status vocabulary: label, tone, and icon (never colour alone).
// Tones: neutral, info, progress, warning, danger, success (defined once in workspace.css).
const s = (tone, icon) => ({ tone, icon })

export const STATUS = {
  project: {
    Idea: s('info', Lightbulb), Planning: s('progress', Compass), Active: s('success', Play),
    'On hold': s('warning', Pause), Completed: s('neutral', CircleCheck), Archived: s('neutral', Archive),
  },
  milestone: {
    Upcoming: s('info', Calendar), 'In progress': s('progress', Loader), Overdue: s('danger', TriangleAlert),
    Blocked: s('danger', OctagonX), Completed: s('success', Check),
  },
  task: {
    Backlog: s('neutral', Inbox), 'To do': s('info', Circle), 'In progress': s('progress', Loader),
    'In review': s('warning', Eye), Blocked: s('danger', OctagonX), Completed: s('success', CircleCheckBig),
  },
  lifecycle: {
    Specified: s('info', FileText), 'In progress': s('progress', Loader), Implemented: s('success', Check),
    Blocked: s('danger', OctagonX), Rejected: s('neutral', CircleX),
  },
  verification: {
    Unverified: s('warning', ShieldAlert), Verified: s('success', ShieldCheck), Failed: s('danger', CircleX),
  },
  revision: {
    Recorded: s('neutral', Clock), 'Pending review': s('warning', Hourglass), Approved: s('success', Check), Rejected: s('danger', CircleX),
  },
  document: {
    Draft: s('warning', Pencil), 'In review': s('progress', Eye), Completed: s('success', Check),
  },
  access: {
    Preview: s('success', Eye), Download: s('info', Download), Linked: s('progress', Link2),
    Restricted: s('danger', Lock), Uploading: s('warning', Loader),
  },
  deliverable: {
    Planned: s('info', Calendar), 'In progress': s('progress', Loader), Delivered: s('success', Check),
  },
  health: {
    'On track': s('success', Check), 'At risk': s('warning', TriangleAlert), 'Off track': s('danger', OctagonX), Paused: s('neutral', Pause),
  },
}

export const PRIORITY = {
  Low: s('neutral', ArrowDown), Medium: s('info', Minus), High: s('warning', ArrowUp), Urgent: s('danger', ChevronsUp),
}

export const TASK_STATUSES = Object.keys(STATUS.task)
export const PROJECT_STATUSES = Object.keys(STATUS.project)
