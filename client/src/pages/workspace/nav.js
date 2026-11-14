import { BarChart3, BookOpen, Boxes, CheckSquare, ClipboardList, FolderKanban, History, LayoutDashboard, Milestone, Settings } from 'lucide-react'

export const modules = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/milestones', label: 'Milestones', icon: Milestone },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/requirements', label: 'Requirements', icon: ClipboardList },
  { href: '/assets', label: 'Assets', icon: Boxes },
  { href: '/revisions', label: 'Revisions', icon: History },
  { href: '/documentation', label: 'Documentation', icon: BookOpen },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
]

export const settingsModule = { href: '/settings', label: 'Settings', icon: Settings }

// Mobile bottom tabs show four modules; the rest live in the "More" sheet.
export const mobilePrimary = ['/dashboard', '/projects', '/tasks', '/documentation']
