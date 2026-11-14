// Placeholder fixtures for the individual workspace (PLAN-A-04 Revision 3).
// One person owns everything: there are no users, assignees, owners, roles, or access states.
// Records carry explicit IDs and relationships; counts, progress, and statuses are derived in selectors.

export const workspace = { id: 'ws-me', type: 'individual', owner: 'Demo user' }

export const projects = [
  {
    id: 'project-garden', name: 'Project Garden', category: 'Creative', kind: 'creative', status: 'Active', tone: 'pink',
    tags: ['visual novel', 'writing'], description: 'A story-led creative production workspace for a visual novel.',
    objective: 'Ship a welcoming first chapter that holds together as a story and as a product.',
    start: '2026-09-01', end: '2027-02-28', updatedAt: '2026-11-12', lastOpenedAt: '2026-11-12T09:10:00',
    phases: ['Concept', 'Outline', 'Chapter one', 'Review', 'Release'], phaseIndex: 2,
  },
  {
    id: 'tsumugi-api', name: 'Tsumugi API', category: 'Software', kind: 'software', status: 'Planning', tone: 'blue',
    tags: ['backend', 'auth'], description: 'Service layer for projects, requirements, and traceability.',
    objective: 'Define a secure, well-specified API that the workspace can rely on.',
    start: '2026-10-15', end: '2027-03-31', updatedAt: '2026-11-11', lastOpenedAt: '2026-11-11T16:40:00',
    phases: ['Discovery', 'Design', 'Build', 'Test', 'Ship'], phaseIndex: 1,
  },
  {
    id: 'color-and-memory', name: 'Color & Memory', category: 'Research', kind: 'research', status: 'On hold', tone: 'lilac',
    tags: ['interviews', 'color'], description: 'A study of how color shapes recalled memories.',
    objective: 'Collect and analyze interviews to answer one clear research question.',
    start: '2026-08-20', end: '2027-01-15', updatedAt: '2026-11-05', lastOpenedAt: '2026-11-03T14:00:00',
    phases: ['Question', 'Method', 'Collection', 'Analysis', 'Report'], phaseIndex: 2,
  },
  {
    id: 'atlas-zine', name: 'Atlas Zine', category: 'Creative', kind: 'creative', status: 'Done', tone: 'yellow',
    tags: ['print', 'zine'], description: 'A small-run printed zine of map illustrations.',
    objective: 'Print and distribute a first edition.',
    start: '2026-06-01', end: '2026-09-30', updatedAt: '2026-10-01', lastOpenedAt: '2026-10-02T10:00:00',
    phases: ['Concept', 'Layout', 'Proof', 'Print', 'Distribution'], phaseIndex: 4,
  },
  {
    id: 'sketchbook-sprint', name: 'Sketchbook Sprint', category: 'Multimedia', kind: 'multimedia', status: 'Planning', tone: 'green',
    tags: ['drawing'], description: 'A rough plan for a month of daily sketches.',
    objective: 'Decide whether this is worth planning in detail.',
    start: '2026-12-01', end: '2026-12-31', updatedAt: '2026-11-10', lastOpenedAt: '2026-11-10T20:00:00',
    phases: ['Brief', 'Production'], phaseIndex: 0,
  },
  {
    id: 'field-notes-2025', name: 'Field Notes 2025', category: 'Research', kind: 'research', status: 'Done', tone: 'lilac', archived: true,
    tags: ['archive'], description: 'Notes from last year’s field work, kept for reference.',
    objective: 'Preserve the record of the 2025 season.',
    start: '2025-03-01', end: '2025-11-30', updatedAt: '2026-06-30', lastOpenedAt: '2026-06-30T09:00:00', archivedAt: '2026-06-30',
    phases: ['Collect', 'Review', 'Archive'], phaseIndex: 2,
  },
]

export const milestones = [
  { id: 'm1', projectId: 'project-garden', title: 'Chapter one review', description: 'Review the opening chapter against the style guide.', start: '2026-10-20', due: '2026-11-13', phase: 2, afterId: null },
  { id: 'm2', projectId: 'project-garden', title: 'Outline locked', description: 'Freeze the story outline for chapters one to three.', start: '2026-09-15', due: '2026-10-15', phase: 1, done: true, afterId: null },
  { id: 'm3', projectId: 'project-garden', title: 'Character bible', description: 'Finish profiles and reference art for the main cast.', start: '2026-11-01', due: '2026-11-10', phase: 2, afterId: 'm2' },
  { id: 'm4', projectId: 'project-garden', title: 'Chapter two draft', description: 'First full draft of chapter two.', start: '2026-11-16', due: '2026-12-18', phase: 3, afterId: 'm1' },
  { id: 'm5', projectId: 'tsumugi-api', title: 'Auth flow map', description: 'Document every sign-in and recovery state.', start: '2026-11-05', due: '2026-11-19', phase: 1, blocked: true, afterId: null },
  { id: 'm6', projectId: 'tsumugi-api', title: 'API schema v1', description: 'First reviewed schema for projects and requirements.', start: '2026-11-20', due: '2026-12-15', phase: 2, afterId: 'm5' },
  { id: 'm7', projectId: 'color-and-memory', title: 'Interview protocol', description: 'Final protocol and consent process.', start: '2026-09-20', due: '2026-10-30', phase: 1, done: true, afterId: null },
  { id: 'm8', projectId: 'color-and-memory', title: 'Data collection wave 1', description: 'Run the first round of participant sessions.', start: '2026-11-01', due: '2026-11-30', phase: 2, afterId: 'm7' },
  { id: 'm9', projectId: 'atlas-zine', title: 'Print run', description: 'Send final files to the printer and receive copies.', start: '2026-08-01', due: '2026-09-30', phase: 3, done: true, afterId: null },
]

const sub = (...items) => items.map(([text, done]) => ({ text, done }))
const task = (id, projectId, milestoneId, title, notes, status, priority, due, extra = {}) => ({
  id, projectId, milestoneId, title, notes, status, priority, due, blocked: false, subtasks: [], requirementIds: [], fileIds: [], changeIds: [], ...extra,
})

export const tasks = [
  task('t1', 'project-garden', 'm1', 'Review opening scene notes', 'Read the chapter one notes and confirm tone before the review.', 'Doing', 'high', '2026-11-12', { subtasks: sub(['Read the notes', true], ['Mark tone issues', false]), requirementIds: ['REQ-001'], fileIds: ['a-notes'], changeIds: ['r3'] }),
  task('t2', 'project-garden', 'm1', 'Reconcile character names', 'Check every name against the character bible.', 'To do', 'high', '2026-11-13', { requirementIds: ['REQ-002'] }),
  task('t3', 'project-garden', 'm3', 'Write character profiles', 'One page per main character: voice, goals, relationships.', 'Doing', 'high', '2026-11-09', { subtasks: sub(['Protagonist', true], ['Rival', true], ['Mentor', false], ['Villain', false]), requirementIds: ['REQ-002'] }),
  task('t4', 'project-garden', 'm3', 'Collect reference art', 'Gather mood references for each character.', 'Doing', 'normal', '2026-11-11', { fileIds: ['a-moodboard'] }),
  task('t5', 'project-garden', 'm4', 'Outline chapter two beats', 'List the main story beats for chapter two.', 'To do', 'normal', null),
  task('t6', 'project-garden', 'm2', 'Lock outline v2', 'Final read-through and sign-off of the outline.', 'Done', 'high', '2026-10-15', { requirementIds: ['REQ-004'], fileIds: ['a-style'], changeIds: ['r8'] }),
  task('t14', 'project-garden', 'm1', 'Proof chapter one dialogue', 'Read dialogue aloud and fix awkward lines.', 'To do', 'normal', '2026-11-18', { requirementIds: ['REQ-001'], changeIds: ['r2'] }),
  task('t7', 'tsumugi-api', 'm5', 'Map sign-in states', 'Draw every state from first visit to recovery. Waiting on the session decision.', 'Doing', 'high', '2026-11-16', { blocked: true, subtasks: sub(['List states', true], ['Draw diagram', false]), requirementIds: ['REQ-005'] }),
  task('t8', 'tsumugi-api', 'm5', 'Choose session strategy', 'Compare cookie and token sessions and write a recommendation.', 'To do', 'high', '2026-11-14', { requirementIds: ['REQ-005'], changeIds: ['r4'] }),
  task('t10', 'tsumugi-api', 'm5', 'Write auth threat notes', 'List the main threats and mitigations for sign-in.', 'Doing', 'normal', '2026-11-18', { requirementIds: ['REQ-005'], changeIds: ['r7'] }),
  task('t9', 'tsumugi-api', 'm6', 'Draft schema for projects', 'Fields and relationships for the projects collection.', 'To do', 'normal', '2026-11-25', { requirementIds: ['REQ-007'], fileIds: ['a-schema'] }),
  task('t11', 'color-and-memory', 'm8', 'Schedule participant sessions', 'Book twelve sessions across three weeks.', 'Doing', 'normal', '2026-11-20', { subtasks: sub(['Send invitations', true], ['Confirm rooms', false]), requirementIds: ['REQ-008'] }),
  task('t12', 'color-and-memory', 'm8', 'Prepare consent forms', 'Finalize and print consent forms.', 'Done', 'normal', '2026-11-05', { requirementIds: ['REQ-008'], fileIds: ['a-survey'] }),
  task('t13', 'color-and-memory', 'm8', 'Transcribe first interviews', 'Waiting on a secure storage decision.', 'To do', 'normal', '2026-11-22', { blocked: true, requirementIds: ['REQ-009'], changeIds: ['r5'] }),
  task('t15', 'atlas-zine', 'm9', 'Archive print files', 'Store final print-ready files.', 'Done', 'normal', '2026-10-01', { fileIds: ['a-export'] }),
]

const crit = (...items) => items.map(([text, met]) => ({ text, met }))
const req = (id, projectId, title, type, status, verified, milestoneId, description, acceptance) => ({ id, projectId, title, type, status, verified, milestoneId, description, acceptance })

export const requirements = [
  req('REQ-001', 'project-garden', 'Opening scene sets the tone', 'Functional', 'Open', false, 'm1', 'The first scene must establish mood, setting, and the main character within one page.', crit(['Tone matches the style guide', true], ['Scene is under 600 words', false], ['Sign-off recorded', false])),
  req('REQ-002', 'project-garden', 'Characters keep consistent names', 'Functional', 'Open', false, 'm3', 'Every named character uses the spelling in the character bible.', crit(['No spelling conflicts across chapters', false], ['Bible lists every named character', false])),
  req('REQ-003', 'project-garden', 'Script exports to PDF in under 10 seconds', 'Non-functional', 'Open', false, 'm4', 'Exporting the full script to PDF must feel immediate.', []),
  req('REQ-004', 'project-garden', 'Style guide approved', 'Functional', 'Met', true, 'm2', 'The style guide is reviewed and approved.', crit(['Reviewed', true], ['Approved', true])),
  req('REQ-005', 'tsumugi-api', 'Users can sign in with email', 'Functional', 'Open', false, 'm5', 'A returning user can sign in with an email address and password.', crit(['All sign-in states are documented', false], ['Session strategy is chosen', false], ['Threats are reviewed', false])),
  req('REQ-006', 'tsumugi-api', 'Auth responses under 300 ms', 'Non-functional', 'Open', false, 'm6', 'Authentication endpoints respond quickly under normal load.', crit(['Measured at the 95th percentile', false])),
  req('REQ-007', 'tsumugi-api', 'Projects store their metadata', 'Functional', 'Open', false, 'm6', 'Every project record stores its descriptive metadata.', crit(['Metadata fields are documented', false])),
  req('REQ-008', 'color-and-memory', 'Consent recorded for each participant', 'Functional', 'Met', true, 'm8', 'Each participant gives written consent before a session.', crit(['Form signed before the session', true], ['Forms stored securely', true])),
  req('REQ-009', 'color-and-memory', 'Transcripts stored securely', 'Non-functional', 'Open', false, 'm8', 'Interview transcripts are stored with access limited to you.', crit(['Storage location approved', false])),
]

const file = (id, projectId, name, kind, ext, bytes, tags, updatedAt, description, extra = {}) => ({ id, projectId, name, kind, ext, bytes, tags, updatedAt, description, requirementIds: [], taskIds: [], milestoneId: null, ...extra })
const md = (body) => ({ body })

export const files = [
  file('a-notes', 'project-garden', 'opening-scene-notes.md', 'document', 'md', 18400, ['notes', 'chapter one'], '2026-11-11', 'Working notes for the opening scene.', { taskIds: ['t1'] }),
  file('a-cover', 'project-garden', 'cover-art-v2.png', 'image', 'png', 2480000, ['cover', 'art'], '2026-11-09', 'Second pass of the cover illustration.'),
  file('a-style', 'project-garden', 'style-guide.pdf', 'document', 'pdf', 5300000, ['style'], '2026-10-15', 'Approved visual and writing style guide.', { isFinal: true, requirementIds: ['REQ-004'], taskIds: ['t6'] }),
  file('a-moodboard', 'project-garden', 'moodboard.jpg', 'image', 'jpg', 3100000, ['reference'], '2026-11-11', 'Mood references for the main cast.', { taskIds: ['t4'] }),
  file('a-theme', 'project-garden', 'theme-sketch.wav', 'media', 'wav', 8900000, ['music'], '2026-11-02', 'Rough sketch of the main theme.'),
  file('a-teaser', 'project-garden', 'teaser-cut.mp4', 'media', 'mp4', 48000000, ['teaser'], '2026-11-03', 'Unreleased teaser cut.'),
  file('a-upload', 'project-garden', 'chapter-one-draft.docx', 'document', 'docx', 220000, ['draft'], '2026-11-12', 'Draft export being added to the library.', { progress: 62 }),
  file('a-schema', 'tsumugi-api', 'schema-draft.xlsx', 'data', 'xlsx', 96000, ['schema'], '2026-11-08', 'Spreadsheet sketch of the projects schema.', { requirementIds: ['REQ-007'], taskIds: ['t9'] }),
  file('a-repo', 'tsumugi-api', 'tsumugi-api repository', 'link', 'link', 0, ['code'], '2026-11-06', 'Source repository for the API.', { host: 'github.com' }),
  file('a-survey', 'color-and-memory', 'survey-responses.csv', 'data', 'csv', 410000, ['survey', 'data'], '2026-10-20', 'Pilot survey responses.', { taskIds: ['t12'] }),
  file('a-export', 'atlas-zine', 'atlas-final.pdf', 'document', 'pdf', 12000000, ['print'], '2026-09-29', 'Final print-ready export.', { isFinal: true, taskIds: ['t15'] }),
  file('f-script', 'project-garden', 'Chapter one script', 'document', 'md', 9200, ['script'], '2026-11-12', 'The chapter one script, in progress.', { status: 'Draft', version: 1, requirementIds: ['REQ-001', 'REQ-002'], milestoneId: 'm1', ...md('# Chapter one script\n\n## Scene one\nThe garden gate is open. Someone has been here before.\n\n## Scene two\nA quiet conversation that sets the tone.') }),
  file('d-brief', 'project-garden', 'Opening brief', 'document', 'md', 4800, ['brief'], '2026-11-12', 'Scope and goals for the opening chapter.', { status: 'Draft', version: 4, requirementIds: ['REQ-001'], taskIds: ['t1'], milestoneId: 'm1', ...md('# Opening brief\n\n## Overview\nThe opening chapter introduces the world and its main character. It must feel welcoming without explaining everything.\n\n## Goals\n- Establish tone and setting in the first page\n- Introduce the protagonist through action\n- End on a **clear hook** into chapter two\n\n## Scope\nThis brief covers chapter one only. Later chapters get their own briefs.\n\n## Open questions\n1. Should the narrator be named?\n2. How much backstory belongs in the first scene?\n\n> Review date: 13 November.') }),
  file('d-style', 'project-garden', 'Style guide', 'document', 'md', 3100, ['style'], '2026-10-15', 'Voice, visual rules, and naming.', { status: 'Final', version: 2, requirementIds: ['REQ-004'], taskIds: ['t6'], milestoneId: 'm2', ...md('# Style guide\n\n## Voice\nWarm, concrete, and a little playful. Prefer short sentences.\n\n## Visual rules\n- Solid colors, no gradients\n- One accent color per scene\n- Characters are always outlined\n\n## Naming\nUse the spelling in the character bible. When unsure, decide once and note it here.') }),
  file('d-auth', 'tsumugi-api', 'Auth design notes', 'document', 'md', 2900, ['decision'], '2026-11-11', 'Session strategy decision record.', { status: 'Draft', version: 2, requirementIds: ['REQ-005'], taskIds: ['t8'], milestoneId: 'm5', ...md('# Auth design notes\n\n## Decision\nUse server-side sessions with secure cookies.\n\n## Why\n- Simple revocation\n- No tokens stored in the browser\n- Works with the planned backend\n\n## Consequences\nThe client must send cookies with every request, and CSRF protection is required.\n\n## Alternatives\n1. Short-lived tokens with refresh\n2. Third-party sign-in only') }),
  file('d-schema', 'tsumugi-api', 'API schema outline', 'document', 'md', 1800, ['spec'], '2026-11-08', 'Collections and relationships.', { status: 'Draft', version: 1, requirementIds: ['REQ-007'], taskIds: ['t9'], milestoneId: 'm6', ...md('# API schema outline\n\n## Collections\n- projects\n- milestones\n- tasks\n- requirements\n\n## Relationships\nEvery record stores its project ID. Links between records use IDs, not free text.') }),
  file('d-interview', 'color-and-memory', 'Interview protocol', 'document', 'md', 2400, ['research'], '2026-10-30', 'Protocol and consent process.', { status: 'Final', version: 3, requirementIds: ['REQ-008'], taskIds: ['t11'], milestoneId: 'm7', ...md('# Interview protocol\n\n## Before the session\n1. Confirm consent\n2. Explain that the session is recorded\n\n## Questions\n- What color do you remember from that day?\n- What did it feel like?\n\n## After the session\nSend the transcript to the participant within a week.') }),
  file('d-release', 'atlas-zine', 'Release notes: Atlas Zine 1.0', 'document', 'md', 900, ['release'], '2026-10-01', 'What shipped in the first edition.', { status: 'Final', version: 1, ...md('# Atlas Zine 1.0\n\n## Included\n- 24 pages of map illustrations\n- A short afterword\n\n## Print details\nRisograph, two colors, 150 copies.') }),
]

const d = (...lines) => lines.map(([mark, text]) => ({ mark, text }))
const change = (id, projectId, at, summary, recordType, recordId, reviewed, extra = {}) => ({ id, projectId, at, summary, recordType, recordId, reviewed, requirementIds: [], taskIds: [], ...extra })

export const changes = [
  change('r1', 'project-garden', '2026-11-12T10:42:00', 'Updated scope and goals in the Opening brief', 'File', 'd-brief', false, { fromVersion: 3, toVersion: 4, requirementIds: ['REQ-001'], taskIds: ['t1'],
    diff: d(['=', '# Opening brief'], ['=', '## Goals'], ['-', '- Establish tone in the first scene'], ['+', '- Establish tone and setting in the first page'], ['+', '- Introduce the protagonist through action'], ['=', '- End on a clear hook into chapter two'], ['=', '## Scope'], ['-', 'This brief covers chapters one and two.'], ['+', 'This brief covers chapter one only.']) }),
  change('r2', 'project-garden', '2026-11-12T09:15:00', 'Added a dialogue proofing task', 'Task', 't14', false, { requirementIds: ['REQ-001'], taskIds: ['t14'] }),
  change('r3', 'project-garden', '2026-11-11T16:30:00', 'Replaced the opening scene notes', 'File', 'a-notes', true, { taskIds: ['t1'] }),
  change('r4', 'tsumugi-api', '2026-11-11T11:05:00', 'Rewrote the session strategy section', 'File', 'd-auth', false, { fromVersion: 1, toVersion: 2, requirementIds: ['REQ-005'], taskIds: ['t8'],
    diff: d(['=', '# Auth design notes'], ['=', '## Decision'], ['-', 'Use short-lived tokens stored in the browser.'], ['+', 'Use server-side sessions with secure cookies.'], ['=', '## Why'], ['+', '- Simple revocation'], ['+', '- No tokens stored in the browser']) }),
  change('r5', 'color-and-memory', '2026-11-10T14:20:00', 'Marked transcript storage as not yet verified', 'Requirement', 'REQ-009', false, { requirementIds: ['REQ-009'], taskIds: ['t13'] }),
  change('r6', 'project-garden', '2026-11-09T09:00:00', 'Uploaded cover art v2', 'File', 'a-cover', true),
  change('r7', 'tsumugi-api', '2026-11-06T17:45:00', 'Added a threat model outline', 'File', 'd-auth', true, { fromVersion: 0, toVersion: 1, requirementIds: ['REQ-005'], taskIds: ['t10'],
    diff: d(['+', '# Auth design notes'], ['+', '## Threats'], ['+', '- Credential stuffing'], ['+', '- Session theft']) }),
  change('r8', 'project-garden', '2026-10-28T10:10:00', 'Marked the outline as locked', 'Milestone', 'm2', true, { requirementIds: ['REQ-004'], taskIds: ['t6'] }),
  change('r9', 'color-and-memory', '2026-10-20T13:00:00', 'Updated the survey export', 'File', 'a-survey', false),
]
