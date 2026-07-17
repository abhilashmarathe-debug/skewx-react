import { useApp } from '../../lib/AppContext.jsx'

export default function Modal({ id, children }) {
  const { modal, closeModal } = useApp()
  const open = modal === id

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal()
  }

  return (
    <div
      className={`modal-overlay ${open ? 'open' : ''}`}
      onClick={onOverlayClick}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  )
}

export function SubmitArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
