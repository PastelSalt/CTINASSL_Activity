export const workspaceProjects = [
  { name: 'Project Garden', type: 'Creative', status: 'Active', color: 'pink', progress: 68, next: 'Chapter one review' },
  { name: 'Tsumugi API', type: 'Software', status: 'Planning', color: 'blue', progress: 34, next: 'Define authentication flow' },
  { name: 'Color & Memory', type: 'Research', status: 'On Hold', color: 'yellow', progress: 22, next: 'Resume literature notes' },
]

export const workspaceMilestones = [
  ['Chapter one review', 'Project Garden', 'Tomorrow', 'pink'],
  ['Auth flow map', 'Tsumugi API', '14 Nov', 'blue'],
  ['Research outline', 'Color & Memory', '18 Nov', 'yellow'],
]

export const workspaceTasks = [
  ['Review opening scene notes', 'Due today', 'urgent'],
  ['Connect requirement to milestone', 'Due 14 Nov', 'soon'],
  ['Sort reference assets', 'Due 16 Nov', 'normal'],
]

export const workspaceActivity = [
  ['Mika linked a deliverable', 'Project Garden', '12 min ago'],
  ['You added a new requirement', 'Tsumugi API', '1 hr ago'],
  ['A milestone moved to planning', 'Color & Memory', 'Yesterday'],
]

export const workspaceSections = {
  '/dashboard': ['Overview', 'Project pulse', 'Upcoming milestones', 'Tasks needing attention', 'Recent activity', 'Quick actions'],
  '/projects': ['Directory', 'Search and filters', 'Status groups', 'Recently accessed', 'Archived projects'],
  '/milestones': ['All milestones', 'Timeline', 'Upcoming', 'Overdue', 'Completed'],
  '/tasks': ['All tasks', 'List view', 'Kanban view', 'Due soon', 'Blocked', 'Completed'],
  '/requirements': ['All requirements', 'Functional', 'Non-functional', 'Acceptance criteria', 'Verification status', 'Traceability'],
  '/assets': ['All assets', 'Images and illustrations', 'Documents and PDFs', 'Audio and video', 'Datasets and spreadsheets', 'References and exports'],
  '/revisions': ['All revisions', 'Recent changes', 'Pending review', 'Approved', 'Version comparison'],
  '/documentation': ['All documents', 'Project briefs', 'Technical specifications', 'Research notes', 'Architecture decisions', 'Testing and release notes'],
  '/reports': ['Overview', 'Project completion', 'Task distribution', 'Milestone progress', 'Requirement coverage', 'Activity history'],
  '/settings': ['Account and profile', 'Workspace preferences', 'Notifications', 'Appearance and density', 'Legal and privacy'],
}

export const moduleFixtures = {
  '/projects': {
    eyebrow: 'Central directory',
    title: 'Projects',
    description: 'Browse workspaces, compare their current thread, and find the next place to contribute.',
    action: 'Create project',
    columns: ['Project', 'Category', 'Status', 'Next thread'],
    rows: workspaceProjects.map((project) => [project.name, project.type, project.status, project.next]),
    note: 'Future filters: category, status, priority, owner, dates, and tags.',
  },
  '/milestones': {
    eyebrow: 'Phases and checkpoints',
    title: 'Milestones',
    description: 'Keep important phases visible with dates, priorities, and the work that leads to each checkpoint.',
    action: 'Create milestone',
    columns: ['Milestone', 'Project', 'Due', 'State'],
    rows: workspaceMilestones.map(([title, project, date, tone]) => [title, project, date, tone === 'pink' ? 'Upcoming' : 'Planned']),
    note: 'Future views: chronological timeline, dependencies, overdue indicators, and deliverables.',
  },
  '/tasks': {
    eyebrow: 'Actionable work',
    title: 'Tasks',
    description: 'Turn requirements and milestones into clear, prioritized work that can move through a project.',
    action: 'Create task',
    columns: ['Task', 'Due', 'Priority', 'Status'],
    rows: workspaceTasks.map(([title, due, tone]) => [title, due, tone === 'urgent' ? 'High' : 'Medium', tone === 'urgent' ? 'In progress' : 'To do']),
    note: 'Future views: list, Kanban, subtasks, assignees, comments, and linked records.',
  },
  '/requirements': {
    eyebrow: 'Specifications and acceptance',
    title: 'Requirements',
    description: 'Connect what a project must achieve to the milestones and tasks that make it real.',
    action: 'Add requirement',
    columns: ['ID', 'Requirement', 'Type', 'Verification'],
    rows: [
      ['REQ-001', 'Welcoming first chapter', 'Functional', 'In progress'],
      ['REQ-002', 'Traceable production records', 'Non-functional', 'Unverified'],
      ['REQ-003', 'Accessible review flow', 'Non-functional', 'Specified'],
    ],
    note: 'Future relationships: objective, milestone, task, deliverable, and requirement history.',
  },
  '/assets': {
    eyebrow: 'Files and references',
    title: 'Assets',
    description: 'Gather images, documents, media, datasets, and exports around the projects that use them.',
    action: 'Add asset',
    columns: ['Asset', 'Type', 'Project', 'Access'],
    rows: [
      ['chapter-one-notes.pdf', 'Document', 'Project Garden', 'Preview'],
      ['palette-reference.png', 'Image', 'Project Garden', 'Preview'],
      ['api-contract.md', 'Repository reference', 'Tsumugi API', 'Linked'],
    ],
    note: 'Future boundary: metadata lives in MongoDB; binary files belong in object storage.',
  },
  '/revisions': {
    eyebrow: 'The record of change',
    title: 'Revisions',
    description: 'Understand what changed, who changed it, and which project record moved forward.',
    action: 'Log revision',
    columns: ['Change', 'Author', 'Affected record', 'Review'],
    rows: [
      ['Linked chapter deliverable', 'Mika', 'Project Garden', 'Approved'],
      ['Updated authentication notes', 'You', 'Tsumugi API', 'Pending review'],
      ['Moved research phase to planning', 'You', 'Color & Memory', 'Recorded'],
    ],
    note: 'Future views: version references, supported document comparison, and approval history.',
  },
  '/documentation': {
    eyebrow: 'Project knowledge',
    title: 'Documentation',
    description: 'Keep briefs, specifications, research notes, decisions, and release records close to the work.',
    action: 'New document',
    columns: ['Document', 'Type', 'Project', 'Updated'],
    rows: [
      ['Project Garden brief', 'Project brief', 'Project Garden', 'Today'],
      ['Authentication flow map', 'Technical specification', 'Tsumugi API', 'Yesterday'],
      ['Color study notes', 'Research notes', 'Color & Memory', '18 Nov'],
    ],
    note: 'Future editor direction: Markdown first, with richer editing considered later.',
  },
  '/reports': {
    eyebrow: 'Progress and health',
    title: 'Reports',
    description: 'Read production progress through metrics that can be traced back to stored project records.',
    action: 'Set report scope',
    columns: ['Report', 'Source records', 'Status', 'Definition'],
    rows: [
      ['Project completion', 'Projects + tasks', 'Ready', 'Completed tasks / total tasks'],
      ['Milestone completion', 'Milestones', 'Ready', 'Completed milestones / total milestones'],
      ['Requirement coverage', 'Requirements + tasks', 'Planned', 'Verified requirements / total requirements'],
    ],
    note: 'Reports must document calculation sources and should not use arbitrary progress percentages.',
  },
  '/settings': {
    eyebrow: 'Workspace preferences',
    title: 'Settings',
    description: 'Shape account, workspace, notification, and appearance preferences around the way you work.',
    action: 'Review preferences',
    columns: ['Area', 'Example controls', 'Prototype state', 'Future owner'],
    rows: [
      ['Account', 'Profile and session', 'Presentation only', 'Users/auth module'],
      ['Workspace', 'Name and defaults', 'Presentation only', 'Workspace settings'],
      ['Appearance', 'Theme and density', 'Exploration only', 'Client theme'],
      ['Legal', 'Policy references', 'Available', 'Policy pages'],
    ],
    note: 'No setting is persisted in this exploration and no credential is processed.',
  },
}
