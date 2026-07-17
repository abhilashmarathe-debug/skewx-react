import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

// --- Premium UI Icons for Job Data ---
const IconBriefcase = () => <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
const IconCalendar = () => <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
const IconClock = () => <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

export default function Careers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDept, setSelectedDept] = useState('All')
  
  // Application Drawer States
  const [activeJobForApply, setActiveJobForApply] = useState(null)
  const [submittingApp, setSubmittingApp] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [appForm, setAppForm] = useState({
    fullName: '', email: '', linkedinUrl: '', portfolioUrl: '', resumeUrl: '', coverLetter: ''
  })

  useEffect(() => {
    fetchActiveJobs()
  }, [])

  const fetchActiveJobs = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setJobs(data)
    } catch (err) {
      console.error('Error fetching jobs:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => setAppForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    if (!appForm.fullName || !appForm.email || !appForm.resumeUrl) {
      alert('Please fill out all required fields (*)')
      return
    }

    setSubmittingApp(true)
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          job_id: activeJobForApply.id,
          full_name: appForm.fullName,
          email: appForm.email,
          linkedin_url: appForm.linkedinUrl || null,
          portfolio_url: appForm.portfolioUrl || null,
          resume_url: appForm.resumeUrl,
          cover_letter: appForm.coverLetter || null,
          status: 'Applied'
        }])

      if (error) throw error

      setIsSuccess(true)
    } catch (err) {
      alert(`Submission failed: ${err.message}`)
    } finally {
      setSubmittingApp(false)
    }
  }

  const handleCloseDrawer = () => {
    setActiveJobForApply(null)
    setIsSuccess(false)
    setAppForm({ fullName: '', email: '', linkedinUrl: '', portfolioUrl: '', resumeUrl: '', coverLetter: '' })
  }

  const departments = ['All', ...new Set(jobs.map(job => job.department).filter(Boolean))]

  const filteredJobs = selectedDept === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDept)

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased">
      <style dangerouslySetInnerHTML={{__html: `
        .careers-hero { background: radial-gradient(circle at top right, rgba(6, 182, 212, 0.08), transparent 45%), radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.05), transparent 40%); }
        .dept-btn { padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid #e2e8f0; background: #ffffff; color: #64748b; cursor: pointer; transition: all 0.2s ease; }
        .dept-btn:hover { border-color: #cbd5e1; color: #0f172a; }
        .dept-btn.active { background: #0891b2; color: #ffffff; border-color: #0891b2; box-shadow: 0 4px 12px rgba(8,145,178,0.15); }
        .job-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); scroll-margin-top: 100px; }
        .job-card:hover { transform: translateY(-2px); border-color: #0891b2; box-shadow: 0 12px 20px -4px rgba(8,145,178,0.04); }
        .apply-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: 100%; max-width: 500px; background: #ffffff; box-shadow: -10px 0 50px rgba(15,23,42,0.15); z-index: 9999; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .apply-drawer.open { transform: translateX(0); }
        .drawer-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.3); backdrop-filter: blur(4px); z-index: 9998; opacity: 0; pointer-events: none; transition: opacity 0.2s ease; }
        .drawer-overlay.open { opacity: 1; pointer-events: auto; }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
        .form-input:focus { border-color: #0891b2; box-shadow: 0 0 0 3px rgba(8,145,178,0.08); }
      `}} />

      {/* ================= HERO SECTION ================= */}
      <section className="careers-hero py-20 px-6 border-b border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full uppercase tracking-wider">
            We are Hiring!
          </span>
          <h1 className="text-4xl sm:text-5xl tracking-tight text-slate-900 leading-tight">
            Build the future of digital automation with SkewX
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Join a distributed team of engineers, innovators, and designers building next-generation intelligent customer frameworks and AI pipelines.
          </p>
        </div>
      </section>

      {/* ================= VALUES CORE MATRIX ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg mb-4">🚀</div>
            <h4 className="font-bold text-slate-900 text-base mb-2">High Impact Projects</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Own architectures from day one. Your code pushes to production clusters powering live SaaS clients daily.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-4">🏠</div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Flexible / Remote Mindset</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Work async from anywhere, or visit our collaborative engineering hubs in Pune. We prioritize metrics over hours.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">📚</div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Continuous Upskilling</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Get dedicated budgets for tech courses, premium AI sandboxes, and structural interview coaching paths.</p>
          </div>
        </div>
      </section>

      {/* ================= ACTIVE JOB LISTINGS CONSOLE ================= */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8 pb-32">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Current Openings</h2>
          
          <div className="flex flex-wrap gap-2">
            {departments.map(dept => (
              <button 
                key={dept} 
                onClick={() => setSelectedDept(dept)}
                className={`dept-btn ${selectedDept === dept ? 'active' : ''}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-sm font-medium text-slate-400">Loading open slots from active tables...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl text-sm text-slate-400">
            No openings published in {selectedDept} right now. Check back soon!
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                id={`job-position-${job.id}`} 
                className="job-card bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">📍 {job.location}</span>
                    <span className="text-xs text-slate-400 font-mono">⏳ {job.employment_type}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{job.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Required Skill Level: <span className="text-slate-700 font-semibold">{job.experience_level}</span></p>
                  </div>

                  {/* ===== NEW METADATA GRID (Positions, Deadline, Posted Date) ===== */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 border-y border-slate-50 my-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <IconBriefcase />
                      <span><strong className="text-slate-700">{job.positions_available || 1}</strong> Opening(s)</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <IconCalendar />
                      <span>Deadline: <strong className="text-rose-600">{job.last_date_to_apply ? new Date(job.last_date_to_apply).toLocaleDateString([], {month:'short', day:'numeric', year:'numeric'}) : 'Open until filled'}</strong></span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <IconClock />
                      <span>Posted: <strong className="text-slate-700">{job.created_at ? new Date(job.created_at).toLocaleDateString([], {month:'short', day:'numeric', year:'numeric'}) : 'Recently'}</strong></span>
                    </div>
                  </div>

                  {job.requirements && job.requirements.length > 0 && (
                    <ul className="text-xs text-slate-500 space-y-1.5 pt-1 list-disc pl-4">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center shrink-0 gap-3 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0 mt-4 sm:mt-0 w-full sm:w-auto">
                  <span className="text-xs font-mono font-bold text-slate-500">{job.salary_range}</span>
                  <button 
                    onClick={() => {
                      setActiveJobForApply(job);
                      setIsSuccess(false);
                      document.getElementById(`job-position-${job.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl border-none cursor-pointer transition-colors shadow-sm w-full sm:w-auto text-center"
                  >
                    Apply for Role &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= CANDIDATE APPLICATION SLIDE DRAWER ================= */}
      <div className={`drawer-overlay ${activeJobForApply ? 'open' : ''}`} onClick={handleCloseDrawer} />
      
      <aside className={`apply-drawer ${activeJobForApply ? 'open' : ''}`}>
        {activeJobForApply && (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Apply for Position</h3>
                <p className="text-xs text-cyan-600 font-semibold mt-0.5 truncate max-w-[340px]">{activeJobForApply.title}</p>
              </div>
              <button onClick={handleCloseDrawer} className="text-slate-400 hover:text-slate-600 text-sm font-bold border-none bg-transparent cursor-pointer">✕</button>
            </div>

            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5 bg-white">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-sm">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Application Transmitted!</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your profiling record has been successfully added to our pipeline ledger stack for <span className="font-semibold text-slate-700">{activeJobForApply.title}</span>.
                  </p>
                </div>
                <button 
                  onClick={handleCloseDrawer}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl border-none cursor-pointer shadow-sm transition-all"
                >
                  Return to Listings Ledger
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="flex-1 p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Full Name *</label>
                  <input type="text" name="fullName" required className="form-input" placeholder="Your Name" value={appForm.fullName} onChange={handleInputChange} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email Address *</label>
                  <input type="email" name="email" required className="form-input" placeholder="name@company.com" value={appForm.email} onChange={handleInputChange} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Hosted Resume Link *</label>
                  <input type="url" name="resumeUrl" required className="form-input" placeholder="e.g., Google Drive link to PDF document" value={appForm.resumeUrl} onChange={handleInputChange} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">LinkedIn Profile URL</label>
                  <input type="url" name="linkedinUrl" className="form-input" placeholder="https://linkedin.com/in/username" value={appForm.linkedinUrl} onChange={handleInputChange} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Portfolio / GitHub Profile</label>
                  <input type="url" name="portfolioUrl" className="form-input" placeholder="https://github.com/username" value={appForm.portfolioUrl} onChange={handleInputChange} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Brief Statement / Notes</label>
                  <textarea name="coverLetter" rows="4" className="form-input resize-none" placeholder="Tell us briefly why you're a great fit for SkewX..." value={appForm.coverLetter} onChange={handleInputChange} />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 bg-white sticky bottom-0">
                  <button type="button" onClick={handleCloseDrawer} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl border-none bg-transparent cursor-pointer">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submittingApp}
                    className="px-5 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl border-none cursor-pointer transition-all shadow-sm disabled:opacity-50"
                  >
                    {submittingApp ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </aside>
    </div>
  )
}