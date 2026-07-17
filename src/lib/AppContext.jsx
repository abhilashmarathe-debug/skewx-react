import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  // Which modal is open: 'demo' | 'roi' | 'start' | 'sales' | null
  const [modal, setModal] = useState(null)

  // ROI snapshot - when the ROI calculator updates on the home page,
  // it pushes its latest values here. The ROI modal then reads them.
  const [roiSnapshot, setRoiSnapshot] = useState({
    total: '-', manual: '-', err: '-', net: '-',
  })

  // Toast
  const [toast, setToast] = useState(null) // { title, message }

  const openModal  = useCallback((id) => setModal(id), [])
  const closeModal = useCallback(() => setModal(null), [])
  const showToast  = useCallback((title, message) => {
    setToast({ title, message })
    setTimeout(() => setToast(null), 4000)
  }, [])

  // Body scroll lock when a modal is open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  // ESC closes modals
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setModal(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AppCtx.Provider value={{
      modal, openModal, closeModal,
      roiSnapshot, setRoiSnapshot,
      toast, showToast,
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
