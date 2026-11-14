import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

/**
 * Preview-only dialog (PLAN-A-04 section 9). Shows what an action would look like and confirms
 * that nothing was saved or sent. Built on the native <dialog> element, which provides focus
 * containment and Escape-to-close.
 */
export default function PreviewDialog({ open, onClose, title, children, actions }) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="preview-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => { if (event.target === ref.current) onClose() }}
    >
      <div className="preview-dialog__body">
        <button className="preview-dialog__close" type="button" aria-label="Close" onClick={onClose}><X size={18} aria-hidden="true" /></button>
        <p className="preview-dialog__chip">Preview only — nothing is saved or sent</p>
        <h2 id={titleId}>{title}</h2>
        <div className="preview-dialog__content">{children}</div>
        <div className="preview-dialog__actions">
          {actions}
          <button className="button button--secondary button--small" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  )
}
