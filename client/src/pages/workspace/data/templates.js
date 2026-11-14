// Project templates (PLAN-A-04L). Starter records are sample content that the person can delete.
export const templates = [
  { kind: 'software', label: 'Software', category: 'Software', text: 'Requirements to a release you can trace.', phases: ['Discovery', 'Design', 'Build', 'Test', 'Ship'], milestone: 'First release', tasks: ['Write the first requirement', 'Sketch the main screen'] },
  { kind: 'creative', label: 'Creative', category: 'Creative', text: 'From concept to a finished piece.', phases: ['Concept', 'Outline', 'Draft', 'Review', 'Release'], milestone: 'Outline locked', tasks: ['Write the one-page brief', 'Collect references'] },
  { kind: 'research', label: 'Research', category: 'Research', text: 'Questions, method, findings.', phases: ['Question', 'Method', 'Collection', 'Analysis', 'Report'], milestone: 'Protocol ready', tasks: ['Write the research question', 'List sources'] },
  { kind: 'multimedia', label: 'Multimedia', category: 'Multimedia', text: 'Assets, edits, and a final master.', phases: ['Brief', 'Production', 'Edit', 'Review', 'Master'], milestone: 'First cut', tasks: ['Write the brief', 'Gather assets'] },
  { kind: 'blank', label: 'Blank', category: 'Other', text: 'Start empty and add what you need.', phases: ['Plan'], milestone: null, tasks: [] },
]
