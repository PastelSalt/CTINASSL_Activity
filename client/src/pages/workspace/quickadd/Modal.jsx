import { useEffect, useRef } from 'react'

/** Native <dialog> shell shared by Quick add, the command palette, and the template picker. */
export default function Modal({ open, onClose, label, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      className={`ws-modal ${className}`}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => { if (event.target === ref.current) onClose() }}
    >
      {open && <div className="ws-modal__body">{children}</div>}
    </dialog>
  )
}
