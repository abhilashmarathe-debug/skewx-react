import { useState } from 'react'
import Modal, { SubmitArrow } from './Modal.jsx'
import { useApp } from '../../lib/AppContext.jsx'
import { submitDemo } from '../../lib/supabase.js'

const initial = { name: '', email: '', company: '', size: '', interest: '', timezone: '', message: '' }

const inputClass =
  'w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white'

export default function DemoModal() {
  const { closeModal, showToast } = useApp()
  const [f, setF] = useState(initial)
  const [busy, setBusy] = useState(false)

  const onChange = (e) => setF(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const res = await submitDemo(f)
    setBusy(false)
    if (res.ok) {
      setF(initial)
      closeModal()
      showToast('Demo Scheduled', 'Demo request submitted successfully.')
    } else {
      showToast('Submission Failed', res.message)
    }
  }

  return (
    <Modal id="demo">
      {/* Slim brand accent, single color instead of a rainbow gradient */}
      <div className="absolute top-0 left-0 h-1 w-full bg-indigo-600 rounded-t-2xl" />

      <div className="mb-6 relative z-10 pt-1">
        <p className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[11px] font-semibold inline-block mb-3">
          Free consultation
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Book your AI strategy demo
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mt-1.5">
          30 minutes with a senior AI engineer. No sales pitch - just real solutions for your technical challenges.
        </p>
      </div>

      <div className="mb-6 border-b border-slate-100" />

      <form onSubmit={onSubmit} className="relative z-10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text" name="name" placeholder="Full name *" required
            className={inputClass} value={f.name} onChange={onChange}
          />
          <input
            type="email" name="email" placeholder="Business email *" required
            className={inputClass} value={f.email} onChange={onChange}
          />
          <input
            type="text" name="company" placeholder="Company name *" required
            className={inputClass} value={f.company} onChange={onChange}
          />

          <select
            name="size" required value={f.size} onChange={onChange}
            className={`${inputClass} ${f.size ? 'text-slate-900' : 'text-slate-400'}`}
          >
            <option value="" disabled>Company size</option>
            <option>1–10</option>
            <option>10–50</option>
            <option>50–200</option>
            <option>200+</option>
          </select>

          <select
            name="interest" required value={f.interest} onChange={onChange}
            className={`${inputClass} sm:col-span-2 ${f.interest ? 'text-slate-900' : 'text-slate-400'}`}
          >
            <option value="" disabled>Primary interest</option>
            <option>AI chatbots</option>
            <option>Intelligent document processing</option>
            <option>Workflow automation</option>
            <option>Autonomous AI agents</option>
            <option>RAG / enterprise search</option>
            <option>Predictive AI</option>
            <option>Computer vision</option>
            <option>Full platform overview</option>
          </select>

          <select
            name="timezone" required value={f.timezone} onChange={onChange}
            className={`${inputClass} sm:col-span-2 ${f.timezone ? 'text-slate-900' : 'text-slate-400'}`}
          >
            <option value="" disabled>Preferred time zone</option>
            <option>IST (India)</option>
            <option>EST (US East)</option>
            <option>PST (US West)</option>
            <option>CET (Europe)</option>
            <option>SGT (Singapore)</option>
          </select>

          <textarea
            name="message" rows={3}
            className={`${inputClass} sm:col-span-2 resize-none`}
            placeholder="What challenge are you trying to solve? (optional)"
            value={f.message} onChange={onChange}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg cursor-pointer transition-all shadow-sm flex items-center justify-center gap-2"
        >
          {busy && (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          <span>{busy ? 'Scheduling...' : 'Schedule my strategy demo'}</span>
          {!busy && <SubmitArrow />}
        </button>
      </form>

      {/* Trust indicators */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.5a1 1 0 01.4.083l6 2.5A1 1 0 0117 5v4.5c0 4.02-2.53 7.24-6.6 8.94a1 1 0 01-.8 0C5.53 16.74 3 13.52 3 9.5V5a1 1 0 01.6-.917l6-2.5A1 1 0 0110 1.5z" clipRule="evenodd" />
          </svg>
          No commitment required
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h5.586A2 2 0 0113 2.586L16.414 6A2 2 0 0117 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm7 1V3.414L15.586 8H13a2 2 0 01-2-2z" clipRule="evenodd" />
          </svg>
          NDA on request
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.983 1.907a.75.75 0 00-1.292-.657L4.7 9.257a.75.75 0 00.545 1.257h4.334l-1.591 7.28a.75.75 0 001.29.66l6-8a.75.75 0 00-.546-1.257H10.4l1.583-7.29z" clipRule="evenodd" />
          </svg>
          Response within 4 hrs
        </span>
      </div>
    </Modal>
  )
}