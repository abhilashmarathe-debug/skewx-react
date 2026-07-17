import { useState } from 'react'
import Modal, { SubmitArrow } from './Modal.jsx'
import { useApp } from '../../lib/AppContext.jsx'
import { submitROI } from '../../lib/supabase.js'

const initial = { name: '', email: '', company: '', industry: '' }

export default function ROIModal() {
  const { closeModal, showToast, roiSnapshot } = useApp()
  const [f, setF] = useState(initial)
  const [busy, setBusy] = useState(false)

  const onChange = (e) => setF(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const res = await submitROI({
      ...f,
      roi_total:  roiSnapshot.total,
      roi_manual: roiSnapshot.manual,
      roi_error:  roiSnapshot.err,
      roi_net:    roiSnapshot.net,
    })
    setBusy(false)
    if (res.ok) {
      setF(initial)
      closeModal()
      showToast('Report Requested', 'ROI request submitted successfully.')
    } else {
      showToast('Submission Failed', res.message)
    }
  }

  return (
    <Modal id="roi">
      <p className="modal-eyebrow">Personalised analysis</p>
      <h2 className="modal-heading">Get Your Custom ROI Report</h2>
      <p className="modal-sub">We'll build a detailed savings analysis specific to your industry, org size, and document volumes.</p>
      <div className="modal-divider"></div>

      {/* ROI summary pulled from the calculator on the home page */}
      <div className="roi-modal-summary">
        <p style={{ fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#6b7280', margin: '0 0 4px' }}>
          Your estimate from the calculator
        </p>
        <div className="roi-modal-val" dangerouslySetInnerHTML={{ __html: roiSnapshot.total }} />
        <div className="roi-modal-row">
          <span style={{ color: '#9ca3af' }}>Manual processing savings</span>
          <span style={{ color: '#4ade80' }} dangerouslySetInnerHTML={{ __html: roiSnapshot.manual }} />
        </div>
        <div className="roi-modal-row">
          <span style={{ color: '#9ca3af' }}>Error reduction savings</span>
          <span style={{ color: '#4ade80' }} dangerouslySetInnerHTML={{ __html: roiSnapshot.err }} />
        </div>
        <div className="roi-modal-row">
          <span style={{ color: '#9ca3af' }}>Net ROI</span>
          <span style={{ color: '#22d3ee', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: roiSnapshot.net }} />
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mf-grid">
          <input type="text"  name="name"    placeholder="Full Name *"      required className="mf-field" value={f.name}    onChange={onChange} />
          <input type="email" name="email"   placeholder="Business Email *" required className="mf-field" value={f.email}   onChange={onChange} />
          <input type="text"  name="company" placeholder="Company Name *"   required className="mf-field" value={f.company} onChange={onChange} />
          <select name="industry" className="mf-field" value={f.industry} onChange={onChange}>
            <option value="" disabled>Industry</option>
            <option>Financial Services</option>
            <option>Healthcare</option>
            <option>Logistics</option>
            <option>Retail</option>
            <option>Legal</option>
            <option>Manufacturing</option>
            <option>Other</option>
          </select>
        </div>
        <button type="submit" className="mf-submit" disabled={busy}>
          {busy ? 'Please wait...' : <>Send Me the Full Report <SubmitArrow /></>}
        </button>
      </form>
      <div className="modal-trust">
        <span>PDF delivered within 24 hrs</span>
        <span>No spam, ever</span>
      </div>
    </Modal>
  )
}
