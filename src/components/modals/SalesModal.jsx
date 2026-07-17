import { useState } from 'react'
import Modal, { SubmitArrow } from './Modal.jsx'
import { useApp } from '../../lib/AppContext.jsx'
import { submitSales } from '../../lib/supabase.js'

const initial = { name: '', email: '', company: '', title: '', size: '', budget: '', region: '', deploy: '', message: '' }

export default function SalesModal() {
  const { closeModal, showToast } = useApp()
  const [f, setF] = useState(initial)
  const [busy, setBusy] = useState(false)

  const onChange = (e) => setF(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const res = await submitSales(f)
    setBusy(false)
    if (res.ok) {
      setF(initial)
      closeModal()
      showToast('Inquiry Received', 'Sales inquiry submitted successfully.')
    } else {
      showToast('Submission Failed', res.message)
    }
  }

  return (
    <Modal id="sales">
      <p className="modal-eyebrow">Enterprise</p>
      <h2 className="modal-heading">Talk to Our Sales Team</h2>
      <p className="modal-sub">Custom pricing, on-prem deployment, dedicated AI engineers. Let's scope your requirements.</p>
      <div className="modal-divider"></div>
      <form onSubmit={onSubmit}>
        <div className="mf-grid">
          <input type="text"  name="name"    placeholder="Full Name *"      required className="mf-field" value={f.name}    onChange={onChange} />
          <input type="email" name="email"   placeholder="Business Email *" required className="mf-field" value={f.email}   onChange={onChange} />
          <input type="text"  name="company" placeholder="Company Name *"   required className="mf-field" value={f.company} onChange={onChange} />
          <input type="text"  name="title"   placeholder="Job Title *"      required className="mf-field" value={f.title}   onChange={onChange} />
          <select name="size" className="mf-field" value={f.size} onChange={onChange}>
            <option value="" disabled>Company Size</option>
            <option>50–200</option><option>200–1000</option><option>1000+</option>
          </select>
          <select name="budget" className="mf-field" value={f.budget} onChange={onChange}>
            <option value="" disabled>Annual Budget</option>
            <option>$15k–$50k</option>
            <option>$50k–$150k</option>
            <option>$150k+</option>
          </select>
          <select name="region" className="mf-field" value={f.region} onChange={onChange}>
            <option value="" disabled>Region</option>
            <option>India</option><option>United States</option><option>Europe</option><option>APAC</option>
          </select>
          <select name="deploy" className="mf-field" value={f.deploy} onChange={onChange}>
            <option value="" disabled>Deployment</option>
            <option>Cloud (SaaS)</option>
            <option>Private Cloud</option>
            <option>On-Premise</option>
          </select>
          <textarea name="message" className="mf-field mf-full" placeholder="Describe your use case and expected scale..." value={f.message} onChange={onChange} />
        </div>
        <button type="submit" className="mf-submit" disabled={busy}>
          {busy ? 'Please wait...' : <>Request Enterprise Proposal <SubmitArrow /></>}
        </button>
      </form>
      <div className="modal-trust">
        <span>NDA available</span>
        <span>Custom SLA</span>
        <span>Dedicated engineer assigned</span>
      </div>
    </Modal>
  )
}
