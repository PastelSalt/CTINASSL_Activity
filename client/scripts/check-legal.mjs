// Scans the legal Markdown sources for unresolved placeholders (PLAN-A-02 section 5).
// While LEGAL_STATUS is "draft" placeholders only produce a warning; when it is "published"
// any remaining placeholder fails the build.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { LEGAL_STATUS } from '../src/pages/legal/legalMeta.js'

const docs = ['privacy-policy.md', 'terms-of-service.md', 'cookie-and-local-storage-policy.md']
const placeholder = /`\[[^\]\n]+\]`|\bTBD\b/g
const findings = []

for (const name of docs) {
  const file = fileURLToPath(new URL(`../../docs/${name}`, import.meta.url))
  readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, index) => {
    for (const match of line.matchAll(placeholder)) findings.push(`${name}:${index + 1} ${match[0]}`)
  })
}

if (findings.length === 0) {
  console.log('check-legal: no unresolved placeholders.')
} else if (LEGAL_STATUS === 'published') {
  console.error(`check-legal: ${findings.length} unresolved placeholder(s) while LEGAL_STATUS is "published":\n  ${findings.join('\n  ')}`)
  process.exit(1)
} else {
  console.warn(`check-legal: ${findings.length} placeholder(s) remain (allowed while LEGAL_STATUS is "draft").`)
}
