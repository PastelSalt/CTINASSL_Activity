export const KIND_LABELS = { document: 'Document', image: 'Image', media: 'Audio or video', data: 'Data', link: 'Link' }
export const kindLabel = (kind) => KIND_LABELS[kind] || 'File'
