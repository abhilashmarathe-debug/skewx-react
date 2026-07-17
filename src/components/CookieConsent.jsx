import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('skewx_cookie_consent')
    if (consent) return
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  const accept  = () => { localStorage.setItem('skewx_cookie_consent', 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem('skewx_cookie_consent', 'declined'); setVisible(false) }
  const ignore  = () => setVisible(false)

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-[9999]">
      <div
        className="border rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'rgba(0,0,0,0.08)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <h3 className="text-gray-900 text-lg font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies to improve website functionality, analytics, and user experience.
              You can accept or decline optional cookies. Read our{' '}
              <a href="/cookie-policy" className="text-cyan-700 hover:text-cyan-800 transition font-medium">Cookie Policy</a>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button onClick={ignore}  className="px-5 py-2.5 rounded-xl border border-black/10 text-sm text-gray-600 hover:bg-black/5 transition">Ignore</button>
            <button onClick={decline} className="px-5 py-2.5 rounded-xl border border-black/10 text-sm text-gray-700 hover:bg-black/5 transition">Decline</button>
            <button onClick={accept}  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-sm font-semibold hover:opacity-90 transition">Accept</button>
          </div>
        </div>
      </div>
    </div>
  )
}