import { useApp } from '../lib/AppContext.jsx'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  return (
    <div
      className="fixed top-6 right-6 z-[10000] flex items-start gap-3 px-5 py-4 rounded-xl border border-cyan-500/20 shadow-2xl backdrop-blur-xl"
      style={{ background: 'rgba(7, 26, 38, 0.85)', maxWidth: '360px' }}
    >
      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
      <div>
        <div className="text-sm font-semibold text-white">{toast.title}</div>
        <div className="text-xs text-gray-400 mt-1 leading-relaxed">{toast.message}</div>
      </div>
    </div>
  )
}
