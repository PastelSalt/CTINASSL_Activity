// Placeholder fixtures shaped like the future records: explicit IDs and explicit relationships.
// No percentages or counts are stored here; selectors derive them (see selectors.js).

export const users = [
  { id: 'demo', name: 'Demo user', initials: 'DU', tone: 'pink' },
  { id: 'mika', name: 'Mika Tanaka', initials: 'MT', tone: 'blue' },
  { id: 'yuki', name: 'Yuki Sato', initials: 'YS', tone: 'yellow' },
  { id: 'ari', name: 'Ari Moreno', initials: 'AM', tone: 'lilac' },
]

export const projects = [
  {
    id: 'project-garden', name: 'Project Garden', category: 'Creative', status: 'Active', priority: 'High', tone: 'pink',
    ownerId: 'mika', collaboratorIds: ['yuki', 'ari'], tags: ['visual novel', 'writing'],
    description: 'A story-led creative production workspace for a visual novel.',
    objective: 'Ship a welcoming first chapter that holds together as a story and as a product.',
    start: '2026-09-01', end: '2027-02-28', updatedAt: '2026-11-12', lastAccessedAt: '2026-11-12T09:10:00',
    phases: ['Concept', 'Outline', 'Chapter one', 'Review', 'Release'], phaseIndex: 2, health: 'At risk',
  },
  {
    id: 'tsumugi-api', name: 'Tsumugi API', category: 'Software', status: 'Planning', priority: 'Medium', tone: 'blue',
    ownerId: 'demo', collaboratorIds: ['yuki'], tags: ['backend', 'auth'],
    description: 'Service layer for projects, requirements, and traceability.',
    objective: 'Define a secure, well-specified API that the workspace can rely on.',
    start: '2026-10-15', end: '2027-03-31', updatedAt: '2026-11-11', lastAccessedAt: '2026-11-11T16:40:00',
    phases: ['Discovery', 'Design', 'Build', 'Test', 'Ship'], phaseIndex: 1, health: 'At risk',
  },
  {
    id: 'color-and-memory', name: 'Color & Memory', category: 'Research', status: 'On hold', priority: 'Low', tone: 'lilac',
    ownerId: 'ari', collaboratorIds: ['mika'], tags: ['interviews', 'color'],
    description: 'A study of how color shapes recalled memories.',
    objective: 'Collect and analyze interviews to answer one clear research question.',
    start: '2026-08-20', end: '2027-01-15', updatedAt: '2026-11-05', lastAccessedAt: '2026-11-03T14:00:00',
    phases: ['Question', 'Method', 'Collection', 'Analysis', 'Report'], phaseIndex: 2, health: 'Paused',
  },
  {
    id: 'atlas-zine', name: 'Atlas Zine', category: 'Creative', status: 'Completed', priority: 'Medium', tone: 'yellow',
    ownerId: 'yuki', collaboratorIds: ['mika'], tags: ['print', 'zine'],
    description: 'A small-run printed zine of map illustrations.',
    objective: 'Print and distribute a first edition.',
    start: '2026-06-01', end: '2026-09-30', updatedAt: '2026-10-01', lastAccessedAt: '2026-10-02T10:00:00',
    phases: ['Concept', 'Layout', 'Proof', 'Print', 'Distribution'], phaseIndex: 4, health: 'On track',
  },
  {
    id: 'field-notes-2025', name: 'Field Notes 2025', category: 'Research', status: 'Archived', priority: 'Low', tone: 'lilac',
    ownerId: 'ari', collaboratorIds: [], tags: ['archive'],
    description: 'Notes from last year’s field work, kept for reference.',
    objective: 'Preserve the record of the 2025 season.',
    start: '2025-03-01', end: '2025-11-30', updatedAt: '2026-06-30', lastAccessedAt: '2026-06-30T09:00:00', archivedAt: '2026-06-30',
    phases: ['Collect', 'Review', 'Archive'], phaseIndex: 2, health: 'Paused',
  },
  {
    id: 'sketchbook-sprint', name: 'Sketchbook Sprint', category: 'Creative', status: 'Idea', priority: 'Low', tone: 'green',
    ownerId: 'demo', collaboratorIds: [], tags: ['drawing'],
    description: 'A rough idea for a month of daily sketches.',
    objective: 'Decide whether this is worth planning.',
    start: '2026-12-01', end: '2026-12-31', updatedAt: '2026-11-10', lastAccessedAt: '2026-11-10T20:00:00',
    phases: ['Idea', 'Plan'], phaseIndex: 0, health: 'On track',
  },
]

export const milestones = [
  { id: 'm1', projectId: 'project-garden', title: 'Chapter one review', description: 'Review the opening chapter against the style guide.', start: '2026-10-20', due: '2026-11-13', priority: 'High', phase: 2, dependencyIds: [], deliverableIds: ['dl1'] },
  { id: 'm2', projectId: 'project-garden', title: 'Outline locked', description: 'Freeze the story outline for chapters one to three.', start: '2026-09-15', due: '2026-10-15', priority: 'Medium', phase: 1, done: true, dependencyIds: [], deliverableIds: ['dl2'] },
  { id: 'm3', projectId: 'project-garden', title: 'Character bible', description: 'Finish profiles and reference art for the main cast.', start: '2026-11-01', due: '2026-11-10', priority: 'High', phase: 2, dependencyIds: ['m2'], deliverableIds: [] },
  { id: 'm4', projectId: 'project-garden', title: 'Chapter two draft', description: 'First full draft of chapter two.', start: '2026-11-16', due: '2026-12-18', priority: 'Medium', phase: 3, dependencyIds: ['m1'], deliverableIds: [] },
  { id: 'm5', projectId: 'tsumugi-api', title: 'Auth flow map', description: 'Document every sign-in and recovery state.', start: '2026-11-05', due: '2026-11-19', priority: 'High', phase: 1, blocked: true, dependencyIds: [], deliverableIds: ['dl3'] },
  { id: 'm6', projectId: 'tsumugi-api', title: 'API schema v1', description: 'First reviewed schema for projects and requirements.', start: '2026-11-20', due: '2026-12-15', priority: 'Medium', phase: 2, dependencyIds: ['m5'], deliverableIds: [] },
  { id: 'm7', projectId: 'color-and-memory', title: 'Interview protocol', description: 'Final protocol and consent process.', start: '2026-09-20', due: '2026-10-30', priority: 'Medium', phase: 1, done: true, dependencyIds: [], deliverableIds: [] },
  { id: 'm8', projectId: 'color-and-memory', title: 'Data collection wave 1', description: 'Run the first round of participant sessions.', start: '2026-11-01', due: '2026-11-30', priority: 'Medium', phase: 2, dependencyIds: ['m7'], deliverableIds: ['dl4'] },
  { id: 'm9', projectId: 'atlas-zine', title: 'Print run', description: 'Send final files to the printer and receive copies.', start: '2026-08-01', due: '2026-09-30', priority: 'Medium', phase: 3, done: true, dependencyIds: [], deliverableIds: ['dl5'] },
]

export const deliverables = [
  { id: 'dl1', projectId: 'project-garden', title: 'Chapter one script', state: 'In progress' },
  { id: 'dl2', projectId: 'project-garden', title: 'Style guide PDF', state: 'Delivered' },
  { id: 'dl3', projectId: 'tsumugi-api', title: 'Auth service spec', state: 'Planned' },
  { id: 'dl4', projectId: 'color-and-memory', title: 'Interview findings', state: 'Planned' },
  { id: 'dl5', projectId: 'atlas-zine', title: 'Atlas Zine PDF', state: 'Delivered' },
]

const sub = (...items) => items.map(([text, done]) => ({ text, done }))

export const tasks = [
  { id: 't1', projectId: 'project-garden', milestoneId: 'm1', title: 'Review opening scene notes', description: 'Read the chapter one notes and confirm tone before the review.', status: 'In progress', priority: 'High', due: '2026-11-12', assigneeId: 'mika', creatorId: 'yuki', subtasks: sub(['Read the notes', true], ['Mark tone issues', false]), requirementIds: ['REQ-001'], assetIds: ['a-notes'], revisionIds: ['r3'] },
  { id: 't2', projectId: 'project-garden', milestoneId: 'm1', title: 'Reconcile character names', description: 'Check every name against the character bible.', status: 'To do', priority: 'High', due: '2026-11-13', assigneeId: 'yuki', creatorId: 'mika', subtasks: [], requirementIds: ['REQ-002'], assetIds: [], revisionIds: [] },
  { id: 't3', projectId: 'project-garden', milestoneId: 'm3', title: 'Write character profiles', description: 'One page per main character: voice, goals, relationships.', status: 'In progress', priority: 'High', due: '2026-11-09', assigneeId: 'ari', creatorId: 'mika', subtasks: sub(['Protagonist', true], ['Rival', true], ['Mentor', false], ['Villain', false]), requirementIds: ['REQ-002'], assetIds: [], revisionIds: [] },
  { id: 't4', projectId: 'project-garden', milestoneId: 'm3', title: 'Collect reference art', description: 'Gather mood references for each character.', status: 'In review', priority: 'Medium', due: '2026-11-11', assigneeId: 'yuki', creatorId: 'ari', subtasks: [], requirementIds: [], assetIds: ['a-moodboard'], revisionIds: [] },
  { id: 't5', projectId: 'project-garden', milestoneId: 'm4', title: 'Outline chapter two beats', description: 'List the main story beats for chapter two.', status: 'Backlog', priority: 'Medium', due: null, assigneeId: null, creatorId: 'mika', subtasks: [], requirementIds: [], assetIds: [], revisionIds: [] },
  { id: 't6', projectId: 'project-garden', milestoneId: 'm2', title: 'Lock outline v2', description: 'Final read-through and sign-off of the outline.', status: 'Completed', priority: 'High', due: '2026-10-15', assigneeId: 'mika', creatorId: 'mika', subtasks: [], requirementIds: ['REQ-004'], assetIds: ['a-style'], revisionIds: ['r8'] },
  { id: 't14', projectId: 'project-garden', milestoneId: 'm1', title: 'Proof chapter one dialogue', description: 'Read dialogue aloud and fix awkward lines.', status: 'To do', priority: 'Medium', due: '2026-11-18', assigneeId: 'yuki', creatorId: 'yuki', subtasks: [], requirementIds: ['REQ-001'], assetIds: [], revisionIds: ['r2'] },
  { id: 't7', projectId: 'tsumugi-api', milestoneId: 'm5', title: 'Map sign-in states', description: 'Draw every state from first visit to recovery. Waiting on the session decision.', status: 'Blocked', priority: 'High', due: '2026-11-16', assigneeId: 'demo', creatorId: 'demo', subtasks: sub(['List states', true], ['Draw diagram', false]), requirementIds: ['REQ-005'], assetIds: [], revisionIds: [] },
  { id: 't8', projectId: 'tsumugi-api', milestoneId: 'm5', title: 'Choose session strategy', description: 'Compare cookie and token sessions and write a recommendation.', status: 'To do', priority: 'Urgent', due: '2026-11-14', assigneeId: 'demo', creatorId: 'demo', subtasks: [], requirementIds: ['REQ-005'], assetIds: [], revisionIds: ['r4'] },
  { id: 't10', projectId: 'tsumugi-api', milestoneId: 'm5', title: 'Write auth threat notes', description: 'List the main threats and mitigations for sign-in.', status: 'In review', priority: 'Medium', due: '2026-11-18', assigneeId: 'demo', creatorId: 'yuki', subtasks: [], requirementIds: ['REQ-005'], assetIds: [], revisionIds: ['r7'] },
  { id: 't9', projectId: 'tsumugi-api', milestoneId: 'm6', title: 'Draft schema for projects', description: 'Fields and relationships for the projects collection.', status: 'Backlog', priority: 'Medium', due: '2026-11-25', assigneeId: 'yuki', creatorId: 'demo', subtasks: [], requirementIds: ['REQ-007'], assetIds: ['a-schema'], revisionIds: [] },
  { id: 't11', projectId: 'color-and-memory', milestoneId: 'm8', title: 'Schedule participant sessions', description: 'Book twelve sessions across three weeks.', status: 'In progress', priority: 'Medium', due: '2026-11-20', assigneeId: 'ari', creatorId: 'ari', subtasks: sub(['Send invitations', true], ['Confirm rooms', false]), requirementIds: ['REQ-008'], assetIds: [], revisionIds: [] },
  { id: 't12', projectId: 'color-and-memory', milestoneId: 'm8', title: 'Prepare consent forms', description: 'Finalize and print consent forms.', status: 'Completed', priority: 'Medium', due: '2026-11-05', assigneeId: 'ari', creatorId: 'ari', subtasks: [], requirementIds: ['REQ-008'], assetIds: ['a-survey'], revisionIds: [] },
  { id: 't13', projectId: 'color-and-memory', milestoneId: 'm8', title: 'Transcribe first interviews', description: 'Waiting on a secure storage decision.', status: 'Blocked', priority: 'Low', due: '2026-11-22', assigneeId: 'ari', creatorId: 'ari', subtasks: [], requirementIds: ['REQ-009'], assetIds: [], revisionIds: ['r5'] },
  { id: 't15', projectId: 'atlas-zine', milestoneId: 'm9', title: 'Archive print files', description: 'Store final print-ready files.', status: 'Completed', priority: 'Low', due: '2026-10-01', assigneeId: 'yuki', creatorId: 'yuki', subtasks: [], requirementIds: [], assetIds: ['a-export'], revisionIds: [] },
]

const crit = (...items) => items.map(([text, met]) => ({ text, met }))

export const requirements = [
  { id: 'REQ-001', projectId: 'project-garden', title: 'Opening scene sets the tone', type: 'Functional', lifecycle: 'In progress', verification: 'Unverified', priority: 'High', milestoneId: 'm1', deliverableId: 'dl1', description: 'The first scene must establish mood, setting, and the main character within one page.', acceptance: crit(['Tone matches the style guide', true], ['Scene is under 600 words', false], ['Owner sign-off recorded', false]) },
  { id: 'REQ-002', projectId: 'project-garden', title: 'Characters keep consistent names', type: 'Functional', lifecycle: 'Specified', verification: 'Unverified', priority: 'High', milestoneId: 'm3', deliverableId: 'dl1', description: 'Every named character uses the spelling in the character bible.', acceptance: crit(['No spelling conflicts across chapters', false], ['Bible lists every named character', false]) },
  { id: 'REQ-003', projectId: 'project-garden', title: 'Script exports to PDF in under 10 seconds', type: 'Non-functional', lifecycle: 'Specified', verification: 'Unverified', priority: 'Low', milestoneId: 'm4', deliverableId: null, description: 'Exporting the full script to PDF must feel immediate.', acceptance: [] },
  { id: 'REQ-004', projectId: 'project-garden', title: 'Style guide approved', type: 'Functional', lifecycle: 'Implemented', verification: 'Verified', priority: 'Medium', milestoneId: 'm2', deliverableId: 'dl2', description: 'The style guide is reviewed and approved by the owner.', acceptance: crit(['Reviewed by all collaborators', true], ['Approved by the owner', true]) },
  { id: 'REQ-005', projectId: 'tsumugi-api', title: 'Users can sign in with email', type: 'Functional', lifecycle: 'In progress', verification: 'Unverified', priority: 'High', milestoneId: 'm5', deliverableId: 'dl3', description: 'A returning user can sign in with an email address and password.', acceptance: crit(['All sign-in states are documented', false], ['Session strategy is chosen', false], ['Threats are reviewed', false]) },
  { id: 'REQ-006', projectId: 'tsumugi-api', title: 'Auth responses under 300 ms', type: 'Non-functional', lifecycle: 'Specified', verification: 'Unverified', priority: 'Medium', milestoneId: 'm6', deliverableId: null, description: 'Authentication endpoints respond quickly under normal load.', acceptance: crit(['Measured at the 95th percentile', false]) },
  { id: 'REQ-007', projectId: 'tsumugi-api', title: 'Projects have an owner and metadata', type: 'Functional', lifecycle: 'Specified', verification: 'Unverified', priority: 'Medium', milestoneId: 'm6', deliverableId: 'dl3', description: 'Every project record stores its owner and descriptive metadata.', acceptance: crit(['Owner is required', false], ['Metadata fields are documented', false]) },
  { id: 'REQ-008', projectId: 'color-and-memory', title: 'Consent recorded for each participant', type: 'Functional', lifecycle: 'Implemented', verification: 'Verified', priority: 'High', milestoneId: 'm8', deliverableId: 'dl4', description: 'Each participant gives written consent before a session.', acceptance: crit(['Form signed before the session', true], ['Forms stored securely', true]) },
  { id: 'REQ-009', projectId: 'color-and-memory', title: 'Transcripts stored securely', type: 'Non-functional', lifecycle: 'Blocked', verification: 'Failed', priority: 'Medium', milestoneId: 'm8', deliverableId: null, description: 'Interview transcripts are stored with access limited to the team.', acceptance: crit(['Storage location approved', false], ['Access list reviewed', false]) },
  { id: 'REQ-010', projectId: 'tsumugi-api', title: 'Offline mode', type: 'Functional', lifecycle: 'Rejected', verification: 'Unverified', priority: 'Low', milestoneId: null, deliverableId: null, description: 'Rejected for the first release: out of scope.', acceptance: [] },
]

const asset = (id, projectId, name, kind, ext, bytes, access, tags, updatedAt, description, extra = {}) => ({ id, projectId, name, kind, ext, bytes, access, tags, updatedAt, description, ...extra })

export const assets = [
  asset('a-notes', 'project-garden', 'opening-scene-notes.md', 'Document', 'md', 18400, 'Preview', ['notes', 'chapter one'], '2026-11-11', 'Working notes for the opening scene.'),
  asset('a-cover', 'project-garden', 'cover-art-v2.png', 'Image', 'png', 2480000, 'Preview', ['cover', 'art'], '2026-11-09', 'Second pass of the cover illustration.'),
  asset('a-style', 'project-garden', 'style-guide.pdf', 'Document', 'pdf', 5300000, 'Download', ['style'], '2026-10-15', 'Approved visual and writing style guide.'),
  asset('a-moodboard', 'project-garden', 'moodboard.jpg', 'Image', 'jpg', 3100000, 'Preview', ['reference'], '2026-11-11', 'Mood references for the main cast.'),
  asset('a-theme', 'project-garden', 'theme-sketch.wav', 'Audio', 'wav', 8900000, 'Download', ['music'], '2026-11-02', 'Rough sketch of the main theme.'),
  asset('a-teaser', 'project-garden', 'teaser-cut.mp4', 'Video', 'mp4', 48000000, 'Restricted', ['teaser'], '2026-11-03', 'Unreleased teaser cut — limited access.'),
  asset('a-upload', 'project-garden', 'chapter-one-draft.docx', 'Document', 'docx', 220000, 'Uploading', ['draft'], '2026-11-12', 'Draft export being added to the library.', { progress: 62 }),
  asset('a-schema', 'tsumugi-api', 'schema-draft.xlsx', 'Dataset', 'xlsx', 96000, 'Download', ['schema'], '2026-11-08', 'Spreadsheet sketch of the projects schema.'),
  asset('a-repo', 'tsumugi-api', 'tsumugi-api repository', 'Reference', 'link', 0, 'Linked', ['code'], '2026-11-06', 'Source repository for the API.', { host: 'github.com' }),
  asset('a-survey', 'color-and-memory', 'survey-responses.csv', 'Dataset', 'csv', 410000, 'Download', ['survey', 'data'], '2026-10-20', 'Pilot survey responses.'),
  asset('a-export', 'atlas-zine', 'atlas-final.pdf', 'Export', 'pdf', 12000000, 'Download', ['print'], '2026-09-29', 'Final print-ready export.'),
]

export const documents = [
  {
    id: 'd-brief', projectId: 'project-garden', title: 'Opening brief', type: 'Project brief', status: 'Draft', authorId: 'mika', updatedAt: '2026-11-12', version: 4, requirementIds: ['REQ-001'], taskIds: ['t1'], milestoneId: 'm1',
    body: '# Opening brief\n\n## Overview\nThe opening chapter introduces the world and its main character. It must feel welcoming without explaining everything.\n\n## Goals\n- Establish tone and setting in the first page\n- Introduce the protagonist through action\n- End on a **clear hook** into chapter two\n\n## Scope\nThis brief covers chapter one only. Later chapters get their own briefs.\n\n## Open questions\n1. Should the narrator be named?\n2. How much backstory belongs in the first scene?\n\n> Review date: 13 November.',
  },
  {
    id: 'd-style', projectId: 'project-garden', title: 'Style guide', type: 'Technical specification', status: 'Completed', authorId: 'yuki', updatedAt: '2026-10-15', version: 2, requirementIds: ['REQ-004'], taskIds: ['t6'], milestoneId: 'm2',
    body: '# Style guide\n\n## Voice\nWarm, concrete, and a little playful. Prefer short sentences.\n\n## Visual rules\n- Solid colors, no gradients\n- One accent color per scene\n- Characters are always outlined\n\n## Naming\nUse the spelling in the character bible. When unsure, ask the owner.',
  },
  {
    id: 'd-auth', projectId: 'tsumugi-api', title: 'Auth design notes', type: 'Architecture decision', status: 'In review', authorId: 'demo', updatedAt: '2026-11-11', version: 2, requirementIds: ['REQ-005'], taskIds: ['t8'], milestoneId: 'm5',
    body: '# Auth design notes\n\n## Decision\nUse server-side sessions with secure cookies.\n\n## Why\n- Simple revocation\n- No tokens stored in the browser\n- Works with the planned backend\n\n## Consequences\nThe client must send cookies with every request, and CSRF protection is required.\n\n## Alternatives\n1. Short-lived tokens with refresh\n2. Third-party sign-in only',
  },
  {
    id: 'd-schema', projectId: 'tsumugi-api', title: 'API schema outline', type: 'Technical specification', status: 'Draft', authorId: 'yuki', updatedAt: '2026-11-08', version: 1, requirementIds: ['REQ-007'], taskIds: ['t9'], milestoneId: 'm6',
    body: '# API schema outline\n\n## Collections\n- projects\n- milestones\n- tasks\n- requirements\n\n## Relationships\nEvery record stores its project ID. Links between records use IDs, not free text.',
  },
  {
    id: 'd-interview', projectId: 'color-and-memory', title: 'Interview protocol', type: 'Research notes', status: 'Completed', authorId: 'ari', updatedAt: '2026-10-30', version: 3, requirementIds: ['REQ-008'], taskIds: ['t11'], milestoneId: 'm7',
    body: '# Interview protocol\n\n## Before the session\n1. Confirm consent\n2. Explain that the session is recorded\n\n## Questions\n- What color do you remember from that day?\n- What did it feel like?\n\n## After the session\nSend the transcript to the participant within a week.',
  },
  {
    id: 'd-release', projectId: 'atlas-zine', title: 'Release notes: Atlas Zine 1.0', type: 'Release notes', status: 'Completed', authorId: 'yuki', updatedAt: '2026-10-01', version: 1, requirementIds: [], taskIds: ['t15'], milestoneId: 'm9',
    body: '# Atlas Zine 1.0\n\n## Included\n- 24 pages of map illustrations\n- A short afterword\n\n## Print details\nRisograph, two colors, 150 copies.',
  },
]

const d = (...lines) => lines.map(([mark, text]) => ({ mark, text }))

export const revisions = [
  { id: 'r1', projectId: 'project-garden', at: '2026-11-12T10:42:00', authorId: 'mika', recordType: 'Document', recordId: 'd-brief', summary: 'Updated scope and goals in the Opening brief', state: 'Pending review', fromVersion: 3, toVersion: 4, requirementIds: ['REQ-001'], taskIds: ['t1'],
    diff: d(['=', '# Opening brief'], ['=', '## Goals'], ['-', '- Establish tone in the first scene'], ['+', '- Establish tone and setting in the first page'], ['+', '- Introduce the protagonist through action'], ['=', '- End on a clear hook into chapter two'], ['=', '## Scope'], ['-', 'This brief covers chapters one and two.'], ['+', 'This brief covers chapter one only.']) },
  { id: 'r2', projectId: 'project-garden', at: '2026-11-12T09:15:00', authorId: 'yuki', recordType: 'Task', recordId: 't14', summary: 'Added a dialogue proofing task', state: 'Recorded', requirementIds: ['REQ-001'], taskIds: ['t14'] },
  { id: 'r3', projectId: 'project-garden', at: '2026-11-11T16:30:00', authorId: 'mika', recordType: 'Asset', recordId: 'a-notes', summary: 'Replaced the opening scene notes', state: 'Approved', requirementIds: [], taskIds: ['t1'] },
  { id: 'r4', projectId: 'tsumugi-api', at: '2026-11-11T11:05:00', authorId: 'demo', recordType: 'Document', recordId: 'd-auth', summary: 'Rewrote the session strategy section', state: 'Pending review', fromVersion: 1, toVersion: 2, requirementIds: ['REQ-005'], taskIds: ['t8'],
    diff: d(['=', '# Auth design notes'], ['=', '## Decision'], ['-', 'Use short-lived tokens stored in the browser.'], ['+', 'Use server-side sessions with secure cookies.'], ['=', '## Why'], ['+', '- Simple revocation'], ['+', '- No tokens stored in the browser']) },
  { id: 'r5', projectId: 'color-and-memory', at: '2026-11-10T14:20:00', authorId: 'ari', recordType: 'Requirement', recordId: 'REQ-009', summary: 'Marked transcript storage as failing verification', state: 'Recorded', requirementIds: ['REQ-009'], taskIds: ['t13'] },
  { id: 'r6', projectId: 'project-garden', at: '2026-11-09T09:00:00', authorId: 'yuki', recordType: 'Asset', recordId: 'a-cover', summary: 'Uploaded cover art v2', state: 'Approved', requirementIds: [], taskIds: [] },
  { id: 'r7', projectId: 'tsumugi-api', at: '2026-11-06T17:45:00', authorId: 'demo', recordType: 'Document', recordId: 'd-auth', summary: 'Added a threat model outline', state: 'Rejected', fromVersion: 0, toVersion: 1, requirementIds: ['REQ-005'], taskIds: ['t10'],
    diff: d(['+', '# Auth design notes'], ['+', '## Threats'], ['+', '- Credential stuffing'], ['+', '- Session theft']) },
  { id: 'r8', projectId: 'project-garden', at: '2026-10-28T10:10:00', authorId: 'mika', recordType: 'Milestone', recordId: 'm2', summary: 'Marked the outline as locked', state: 'Approved', requirementIds: ['REQ-004'], taskIds: ['t6'] },
  { id: 'r9', projectId: 'color-and-memory', at: '2026-10-20T13:00:00', authorId: 'ari', recordType: 'Asset', recordId: 'a-survey', summary: 'Updated the survey export', state: 'Recorded', requirementIds: [], taskIds: [] },
]

export const activities = [
  { id: 'ac1', at: '2026-11-12T10:42:00', actorId: 'mika', verb: 'edited', recordType: 'Document', recordId: 'd-brief', projectId: 'project-garden' },
  { id: 'ac2', at: '2026-11-12T09:15:00', actorId: 'yuki', verb: 'created', recordType: 'Task', recordId: 't14', projectId: 'project-garden' },
  { id: 'ac3', at: '2026-11-11T16:40:00', actorId: 'demo', verb: 'commented on', recordType: 'Document', recordId: 'd-auth', projectId: 'tsumugi-api' },
  { id: 'ac4', at: '2026-11-11T11:05:00', actorId: 'demo', verb: 'edited', recordType: 'Document', recordId: 'd-auth', projectId: 'tsumugi-api' },
  { id: 'ac5', at: '2026-11-10T14:20:00', actorId: 'ari', verb: 'blocked', recordType: 'Task', recordId: 't13', projectId: 'color-and-memory' },
  { id: 'ac6', at: '2026-11-09T09:00:00', actorId: 'yuki', verb: 'uploaded', recordType: 'Asset', recordId: 'a-cover', projectId: 'project-garden' },
  { id: 'ac7', at: '2026-11-05T12:00:00', actorId: 'ari', verb: 'completed', recordType: 'Task', recordId: 't12', projectId: 'color-and-memory' },
]
