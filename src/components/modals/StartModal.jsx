import { useState } from 'react'
import Modal, { SubmitArrow } from './Modal.jsx'
import { useApp } from '../../lib/AppContext.jsx'
import { submitStart } from '../../lib/supabase.js'

const initial = { name: '', email: '', company: '', size: '', billing: '', currency: '', usecase: '' }

export default function StartModal() {
  const { closeModal, showToast } = useApp()
  const [f, setF] = useState(initial)
  const [busy, setBusy] = useState(false)

  const onChange = (e) => setF(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const res = await submitStart(f)
    setBusy(false)
    if (res.ok) {
      setF(initial)
      closeModal()
      showToast('Account Requested', 'Starter request submitted successfully.')
    } else {
      showToast('Submission Failed', res.message)
    }
  }

  return (
    <Modal id="start">
      <p className="modal-eyebrow">Starter Plan</p>
      <h2 className="modal-heading">Get Started with SkewX</h2>
      <p className="modal-sub">Tell us about your needs and we'll activate your account within 24 hours. No setup fees.</p>
      <div className="modal-divider"></div>
      <form onSubmit={onSubmit}>
        <div className="mf-grid">
          <input type="text"  name="name"    placeholder="Full Name *"      required className="mf-field" value={f.name}    onChange={onChange} />
          <input type="email" name="email"   placeholder="Business Email *" required className="mf-field" value={f.email}   onChange={onChange} />
          <input type="text"  name="company" placeholder="Company Name *"   required className="mf-field" value={f.company} onChange={onChange} />
          <select name="size" className="mf-field" value={f.size} onChange={onChange}>
            <option value="" disabled>Company Size</option>
            <option>1–10</option><option>10–50</option><option>50–200</option><option>200+</option>
          </select>
          <select name="billing" className="mf-field" value={f.billing} onChange={onChange}>
            <option value="" disabled>Billing Preference</option>
            <option>Monthly</option>
            <option>Annual (save 15%)</option>
          </select>
          <select name="currency" className="mf-field" value={f.currency} onChange={onChange}>
            <option value="" disabled>Currency</option>
            <option>USD $</option>
            <option>INR ₹</option>
          </select>
          <select name="usecase" className="mf-field mf-full" value={f.usecase} onChange={onChange}>
            <option value="" disabled>Primary Use Case</option>
            <option>AI Chatbots</option>
            <option>Document Processing</option>
            <option>Workflow Automation</option>
            <option>AI Agents</option>
            <option>RAG / Search</option>
            <option>Other</option>
          </select>
        </div>
        <button type="submit" className="mf-submit" disabled={busy}>
          {busy ? 'Please wait...' : <>Activate My Account <SubmitArrow /></>}
        </button>
      </form>
      <div className="modal-trust">
        <span>Cancel anytime</span>
        <span>No setup fees</span>
        <span>Live in 24 hrs</span>
      </div>
    </Modal>
  )
}
