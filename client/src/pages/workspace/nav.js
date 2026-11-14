import { BarChart3, FolderKanban, House, Library, ListChecks } from 'lucide-react'

// Level 1 navigation: five destinations (PLAN-A-04 section 4).
export const modules = [
  { href: '/home', label: 'Home', icon: House },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
]

/** Mobile bottom bar: four destinations with Quick add in the middle; Insights lives in the account menu. */
export const mobileBar = ['/home', '/projects', '/tasks', '/library']
