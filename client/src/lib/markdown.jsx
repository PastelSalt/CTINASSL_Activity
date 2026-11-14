import { Fragment } from 'react'

/**
 * Minimal Markdown parser/renderer for the project's own documents (legal drafts, later the
 * workspace document reader). Supports headings, paragraphs, bullet/numbered lists, blockquotes,
 * horizontal rules, and inline code, bold, italic, and links. It never injects raw HTML.
 */

export const slugify = (text) => text
  .toLowerCase()
  .replace(/^\d+\.\s*/, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const INLINE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g

function resolveHref(href) {
  const document = href.match(/^\.\/([a-z0-9-]+)\.md$/i)
  return document ? `/${document[1]}` : href
}

const isPlaceholder = (code) => /^\[[^\]]+\]$/.test(code)

export function renderInline(text, keyPrefix = 'i') {
  const nodes = []
  let last = 0
  let index = 0
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const [token] = match
    const key = `${keyPrefix}-${index++}`
    if (token.startsWith('`')) {
      const code = token.slice(1, -1)
      nodes.push(<code key={key} className={isPlaceholder(code) ? 'placeholder' : undefined}>{code}</code>)
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else {
      const [, label, href] = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      const target = resolveHref(href)
      const external = /^https?:\/\//i.test(target)
      nodes.push(<a key={key} href={target} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>)
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

/** Splits a document into `{ title, meta, notice, sections }` where sections are level-2 blocks. */
export function parseDocument(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const title = (lines.find((line) => line.startsWith('# ')) || '# Untitled').slice(2).trim()
  const firstSection = lines.findIndex((line) => line.startsWith('## '))
  const intro = lines.slice(0, firstSection === -1 ? lines.length : firstSection)
  const meta = []
  const notice = []

  for (const line of intro) {
    const pair = line.match(/^\*\*([^*]+):\*\*\s*(.*?)\s*$/)
    if (pair) meta.push([pair[1], pair[2]])
    else if (line.startsWith('>')) notice.push(line.replace(/^>\s?/, ''))
  }

  const sections = []
  let current = null
  for (const line of lines.slice(firstSection === -1 ? lines.length : firstSection)) {
    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      current = { heading, id: slugify(heading), lines: [] }
      sections.push(current)
    } else if (current) {
      current.lines.push(line)
    }
  }

  return { title, meta, notice: notice.join(' ').trim(), sections }
}

/** Renders block-level Markdown for a section body. */
export function renderBlocks(lines, keyPrefix = 'b') {
  const blocks = []
  let paragraph = []
  let list = null
  let quote = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    const key = `${keyPrefix}-p${blocks.length}`
    blocks.push(
      <p key={key}>
        {paragraph.map((line, i) => (
          <Fragment key={i}>{renderInline(line.replace(/\s{2,}$/, ''), `${key}-${i}`)}{/\s{2,}$/.test(line) && i < paragraph.length - 1 ? <br /> : ' '}</Fragment>
        ))}
      </p>,
    )
    paragraph = []
  }
  const flushList = () => {
    if (!list) return
    const key = `${keyPrefix}-l${blocks.length}`
    const Tag = list.ordered ? 'ol' : 'ul'
    blocks.push(<Tag key={key}>{list.items.map((item, i) => <li key={i}>{renderInline(item, `${key}-${i}`)}</li>)}</Tag>)
    list = null
  }
  const flushQuote = () => {
    if (!quote.length) return
    blocks.push(<blockquote key={`${keyPrefix}-q${blocks.length}`}>{renderInline(quote.join(' '), `${keyPrefix}-q`)}</blockquote>)
    quote = []
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    const bullet = line.match(/^\s*[-*]\s+(.*)$/)
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/)
    if (!line.trim()) { flushParagraph(); flushList(); flushQuote(); continue }
    if (line.startsWith('### ')) { flushParagraph(); flushList(); flushQuote(); blocks.push(<h3 key={`${keyPrefix}-h${blocks.length}`} id={slugify(line.slice(4))}>{renderInline(line.slice(4))}</h3>); continue }
    if (/^---+$/.test(line.trim())) { flushParagraph(); flushList(); flushQuote(); blocks.push(<hr key={`${keyPrefix}-r${blocks.length}`} />); continue }
    if (line.startsWith('>')) { flushParagraph(); flushList(); quote.push(line.replace(/^>\s?/, '')); continue }
    if (bullet || numbered) {
      flushParagraph(); flushQuote()
      const ordered = Boolean(numbered)
      if (!list || list.ordered !== ordered) { flushList(); list = { ordered, items: [] } }
      list.items.push((bullet || numbered)[1])
      continue
    }
    flushList(); flushQuote()
    paragraph.push(line)
  }
  flushParagraph(); flushList(); flushQuote()
  return blocks
}
