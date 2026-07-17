import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../lib/AppContext.jsx'
import { supabase } from '../../lib/supabase.js'

// ================= PREMIUM COMPONENT VECTOR ICONS =================
const IconOverview = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
const IconMessenger = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
const IconCareers = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
const IconRefresh = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 6H16" /></svg>
const IconBriefcase = () => <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
const IconCalendar = () => <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
const IconLink = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
const IconFilter = () => <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
const IconLogout = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
const IconEdit = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>

const initialJobForm = {
  title: '', department: 'Engineering', location: 'Remote', employment_type: 'Full-time', experience_level: 'Junior (0-2 yrs)', salary_range: '', description: '', requirements: '', positions_available: '1', last_date_to_apply: ''
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const [currentView, setCurrentView] = useState('chats')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('Admin Account')

  // Core System State Management
  const [leadsList, setLeadsList] = useState([])
  const [chatLogs, setChatLogs] = useState([])
  const [threads, setThreads] = useState([])
  const [selectedThreadId, setSelectedThreadId] = useState(null)
  const [jobsList, setJobsList] = useState([])
  const [applicationsList, setApplicationsList] = useState([])
  const [selectedApplicantId, setSelectedApplicantId] = useState(null)
  
  // Custom Filters for Careers Applicant Console Matrix
  const [chatFilter, setChatFilter] = useState('all') 
  const [careerTab, setCareerTab] = useState('positions') 
  const [appRoleFilter, setAppRoleFilter] = useState('all')
  const [appStatusFilter, setAppStatusFilter] = useState('all')

  // Edit Job Position Structural States
  const [editingJobId, setEditingJobId] = useState(null)

  const chatEndRef = useRef(null)
  const [jobForm, setJobForm] = useState(initialJobForm)

  useEffect(() => {
    fetchDashboardData()
    getAuthenticatedUser()
  }, [])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedThreadId, chatLogs])

  const getAuthenticatedUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      setUserEmail(user.email)
    }
  }

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const { data: leadsData } = await supabase
        .from('skewx_leads')
        .select('*')
        .order('created_at', { ascending: false })
      const activeLeads = leadsData || []
      setLeadsList(activeLeads)

      const leadProfileMap = {}
      activeLeads.forEach(lead => {
        const sId = lead.session_id || lead.id
        if (sId) {
          leadProfileMap[sId] = { name: lead.name, status: lead.status || 'Unmarked' }
        }
      })

      const { data: chatData } = await supabase.from('skewx_chat_logs').select('*')

      if (chatData) {
        const sortedChatData = [...chatData].sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
        setChatLogs(sortedChatData)
        
        const threadMap = {}
        sortedChatData.forEach((log, index) => {
          const sId = log.session_id || log.sessionId || `session_${index}`
          const profile = leadProfileMap[sId] || { name: `Visitor (${sId.slice(0, 5)})`, status: log.status || 'Unmarked' }
          const msgText = log.message || log.user_message || 'Inbound statement logged'
          const timestamp = log.created_at || new Date().toISOString()

          threadMap[sId] = {
            id: sId,
            name: profile.name,
            status: profile.status || log.status || 'Unmarked',
            latestTimestamp: timestamp,
            latestMessage: msgText
          }
        })

        const sortedThreads = Object.values(threadMap).sort((a, b) => 
          new Date(b.latestTimestamp) - new Date(a.latestTimestamp)
        )
        
        setThreads(sortedThreads)
        if (sortedThreads.length > 0 && !selectedThreadId) {
          setSelectedThreadId(sortedThreads[0].id)
        }
      }

      const { data: jobsData } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
      if (jobsData) setJobsList(jobsData)

      const { data: appsData, error: appsError } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })
        
      if (appsError) {
        console.error("Database query failed:", appsError.message)
        showToast('Sync Error', appsError.message)
      } else if (appsData) {
        setApplicationsList(appsData)
        if (appsData.length > 0 && !selectedApplicantId) {
          setSelectedApplicantId(appsData[0].id)
        }
      }

    } catch (err) {
      console.error('Data layer synchronization break:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (sessionId, newStatus) => {
    try {
      const targetLead = leadsList.find(l => l.session_id === sessionId || l.id === sessionId)
      if (targetLead) {
        const { error } = await supabase.from('skewx_leads').update({ status: newStatus }).eq('id', targetLead.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('skewx_chat_logs').update({ status: newStatus }).eq('session_id', sessionId)
        if (error) throw error
      }
      showToast('Lead Status Locked', `Pipeline routing adjusted to ${newStatus}`)
      fetchDashboardData()
    } catch (err) {
      showToast('Status Commit Interrupted', err.message)
    }
  }

  const updateApplicantStatus = async (appId, newStatus) => {
    try {
      const { error } = await supabase.from('job_applications').update({ status: newStatus }).eq('id', appId)
      if (error) throw error
      showToast('Applicant Moved', `Stage successfully shifted to ${newStatus}`)
      fetchDashboardData()
    } catch (err) {
      showToast('Pipeline Update Failed', err.message)
    }
  }

  const handleAdminSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      showToast('Session Closed', 'Signed out successfully.')
      navigate('/login', { replace: true })
    } catch (err) {
      showToast('Sign Out Blocked', err.message)
    }
  }

  const handleFormChange = (e) => setJobForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleOpenCreateModal = () => {
    setEditingJobId(null)
    setJobForm(initialJobForm)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (job) => {
    setEditingJobId(job.id)
    setJobForm({
      title: job.title || '',
      department: job.department || 'Engineering',
      location: job.location || 'Remote',
      employment_type: job.employment_type || 'Full-time',
      experience_level: job.experience_level || 'Junior (0-2 yrs)',
      salary_range: job.salary_range || '',
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      positions_available: job.positions_available?.toString() || '1',
      last_date_to_apply: job.last_date_to_apply || ''
    })
    setIsModalOpen(true)
  }

  const executeManualJobPublish = async () => {
    if (!jobForm.title.trim() || !jobForm.requirements.trim()) {
      showToast('Validation Alert', 'Please complete the Required Job Title and Requirements fields.')
      return
    }

    setLoading(true)
    const generatedSlug = jobForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const reqArray = jobForm.requirements.split('\n').filter(r => r.trim() !== '')

    const payload = {
      title: jobForm.title,
      slug: `${generatedSlug}-${Date.now().toString().slice(-4)}`,
      department: jobForm.department,
      location: jobForm.location,
      employment_type: jobForm.employment_type,
      experience_level: jobForm.experience_level,
      salary_range: jobForm.salary_range || 'Not Disclosed',
      description: jobForm.description || jobForm.title,
      requirements: reqArray,
      positions_available: parseInt(jobForm.positions_available) || 1,
      last_date_to_apply: jobForm.last_date_to_apply || 'Open until filled'
    }

    try {
      if (editingJobId) {
        // Run Database UPDATE Command Flow Line
        const { error } = await supabase
          .from('jobs')
          .update(payload)
          .eq('id', editingJobId)

        if (error) throw error
        showToast('Listing Updated', 'Job parameters modified successfully.')
      } else {
        // Run Database INSERT Command Flow Line
        const { error } = await supabase
          .from('jobs')
          .insert([{ ...payload, is_active: true }])

        if (error) throw error
        showToast('Listing Provisioned', 'Job position launched live.')
      }
      
      setIsModalOpen(false)
      setJobForm(initialJobForm)
      setEditingJobId(null)
      fetchDashboardData()
    } catch (err) {
      showToast('Mutation Interrupted', err.message)
    } {
      setLoading(false)
    }
  }

  const toggleJobStatus = async (id, currentStatus) => {
    try {
      const { error } = await supabase.from('jobs').update({ is_active: !currentStatus }).eq('id', id)
      if (error) throw error
      showToast('Visibility Toggled', 'Visibility parameters modified successfully.')
      fetchDashboardData()
    } catch (err) {
      showToast('Update Failed', err.message)
    }
  }

  const filteredThreads = threads.filter(t => {
    if (chatFilter === 'all') return true
    return t.status.toLowerCase() === chatFilter.toLowerCase()
  })

  const filteredApplicants = applicationsList.filter(app => {
    const activeJob = jobsList.find(j => j.id === app.job_id)
    const matchesRole = appRoleFilter === 'all' || (activeJob && activeJob.id === appRoleFilter)
    const matchesStatus = appStatusFilter === 'all' || (app.status && app.status.toLowerCase() === appStatusFilter.toLowerCase())
    return matchesRole && matchesStatus
  })

  const activeThreadMessages = chatLogs.filter(log => (log.session_id || log.sessionId) === selectedThreadId)
  const currentActiveThread = threads.find(t => t.id === selectedThreadId)

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex font-sans antialiased selection:bg-cyan-100">
      <style dangerouslySetInnerHTML={{__html: `
        .db-sidebar { width: 260px; background: #ffffff; border-right: 1px solid #e2e8f0; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .db-sidebar.collapsed { width: 0px; overflow: hidden; border-right-color: transparent; }
        .db-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; color: #475569; font-weight: 500; font-size: 14px; transition: all 0.2s ease; width: 100%; text-align: left; border: none; background: transparent; cursor: pointer; }
        .db-nav-item:hover { background: #f1f5f9; color: #0f172a; }
        .db-nav-item.active { background: rgba(6, 182, 212, 0.06); color: #0891b2; font-weight: 600; }
        .db-metric-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.01); display: flex; align-items: center; gap: 16px; }
        
        .msg-container { display: grid; grid-template-columns: 320px 1fr; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; height: calc(100vh - 180px); min-height: 500px; overflow: hidden; }
        .msg-threads-pane { height: 100%; overflow-y: auto; }
        .msg-bubble-wrap { display: flex; flex-direction: column; width: 100%; margin-bottom: 12px; }
        .msg-bubble { max-width: 75%; padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
        .msg-bubble.user { background: #0891b2; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 4px; }
        .msg-bubble.bot { background: #f1f5f9; color: #334155; align-self: flex-start; border-bottom-left-radius: 4px; }
        
        .msg-thread-item { padding: 16px; border-bottom: 1px solid #f1f5f9; text-align: left; width: 100%; background: transparent; transition: all 0.2s ease; cursor: pointer; border-top:none; border-right:none; }
        .msg-thread-item.status-unmarked { border-left: 4px solid #94a3b8; }
        .msg-thread-item.status-unmarked:hover { background: #f8fafc; }
        .msg-thread-item.status-unmarked.active { background: rgba(148, 163, 184, 0.08); }
        .msg-thread-item.status-locked { border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.02); }
        .msg-thread-item.status-locked.active { background: rgba(16, 185, 129, 0.1); }
        .msg-thread-item.status-hold { border-left: 4px solid #f59e0b; background: rgba(245, 158, 11, 0.02); }
        .msg-thread-item.status-hold.active { background: rgba(245, 158, 11, 0.1); }
        .msg-thread-item.status-lost { border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.01); }
        .msg-thread-item.status-lost.active { background: rgba(239, 68, 68, 0.08); }

        .badge-applied { background: #e2e8f0; color: #475569; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
        .badge-reviewing { background: rgba(6, 182, 212, 0.1); color: #0891b2; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
        .badge-interviewing { background: #fef3c7; color: #92400e; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
        .badge-offered { background: #d1fae5; color: #065f46; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
        .badge-rejected { background: #fee2e2; color: #991b1b; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; }

        .badge-unmarked { background: #e2e8f0; color: #475569; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
        .badge-locked { background: #d1fae5; color: #065f46; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
        .badge-hold { background: #fef3c7; color: #92400e; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
        .badge-lost { background: #fee2e2; color: #991b1b; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; }

        .db-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .db-modal-box { background: #ffffff; width: 100%; max-width: 580px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); padding: 32px; max-height: 90vh; overflow-y: auto; position: relative; border: 1px solid #e2e8f0; }
        .db-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; background: #ffffff; transition: all 0.2s ease; box-sizing: border-box; }
        .db-input:focus { outline: none; border-color: #0891b2; box-shadow: 0 0 0 3px rgba(8,145,178,0.08); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />

      {/* SIDEBAR NAVIGATION SYSTEM */}
      <aside className={`db-sidebar fixed md:sticky top-0 h-screen z-30 flex flex-col ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="p-6 border-b border-slate-100 font-bold text-slate-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold shadow-sm">S</div>
          <span className="tracking-tight">SkewX Control</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <button onClick={() => setCurrentView('overview')} className={`db-nav-item ${currentView === 'overview' ? 'active' : ''}`}><IconOverview /> Overview</button>
          <button onClick={() => setCurrentView('chats')} className={`db-nav-item ${currentView === 'chats' ? 'active' : ''}`}><IconMessenger /> Chat Messenger</button>
          <button onClick={() => setCurrentView('careers')} className={`db-nav-item ${currentView === 'careers' ? 'active' : ''}`}><IconCareers /> Careers Console</button>
        </nav>
      </aside>

      {/* DASHBOARD RIGHT PORT CONTAINER */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 border-none bg-transparent cursor-pointer text-lg">☰</button>
            <button onClick={fetchDashboardData} className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm transition-colors">
              <IconRefresh /> {loading ? 'Syncing...' : 'Refresh Data'}
            </button>
          </div>

          <div className="flex items-center gap-4 border-l border-slate-100 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 tracking-tight truncate max-w-[180px]">{userEmail}</p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-0.5 flex items-center justify-end gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span> Live Session
              </p>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-sm select-none uppercase">
              {userEmail.slice(0, 2)}
            </div>

            <button 
              onClick={handleAdminSignOut}
              title="Terminate Session"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border-none bg-transparent flex items-center justify-center focus:outline-none"
            >
              <IconLogout />
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* VIEW: OVERVIEW */}
          {currentView === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Performance Summary</h1>
                <p className="text-sm text-slate-500 mt-1">Real-time infrastructure system statistics layout.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="db-metric-card">
                  <div className="p-3 bg-slate-100 rounded-xl text-slate-600"><IconMessenger /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unmarked Chats</p>
                    <p className="text-2xl font-bold text-slate-700 mt-0.5">{threads.filter(t => t.status === 'Unmarked').length}</p>
                  </div>
                </div>
                <div className="db-metric-card">
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Locked Leads</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-0.5">{threads.filter(t => t.status === 'Locked').length}</p>
                  </div>
                </div>
                <div className="db-metric-card">
                  <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600"><IconCareers /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Openings</p>
                    <p className="text-2xl font-bold text-cyan-600 mt-0.5">{jobsList.filter(j => j.is_active).length}</p>
                  </div>
                </div>
                <div className="db-metric-card">
                  <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications</p>
                    <p className="text-2xl font-bold text-purple-600 mt-0.5">{applicationsList.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: CHAT MESSENGER LAYER */}
          {currentView === 'chats' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lead Telephony Workspace</h1>
                  <p className="text-sm text-slate-500 mt-1">Color-coded channels avoid workflow blockades across multiple operations teams.</p>
                </div>
                
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
                  {['all', 'unmarked', 'locked', 'hold', 'lost'].map(f => (
                    <button key={f} onClick={() => setChatFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border-none cursor-pointer transition-all ${chatFilter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="msg-container">
                <div className="msg-threads-pane border-r border-slate-200 flex flex-col bg-slate-50/50">
                  {filteredThreads.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">No matching leads inside this tracking index path.</div>
                  ) : (
                    filteredThreads.map(thread => (
                      <button 
                        key={thread.id} 
                        onClick={() => setSelectedThreadId(thread.id)} 
                        className={`msg-thread-item status-${thread.status.toLowerCase()} ${selectedThreadId === thread.id ? 'active' : ''}`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="font-semibold text-slate-900 text-sm truncate">{thread.name}</span>
                          <span className={`badge-${thread.status.toLowerCase()}`}>{thread.status}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate font-normal">{thread.latestMessage}</p>
                      </button>
                    ))
                  )}
                </div>

                <div className="flex flex-col h-full bg-white overflow-hidden">
                  {currentActiveThread ? (
                    <div className="flex flex-col h-full overflow-hidden">
                      <div className="p-4 border-b border-slate-200 bg-slate-50/40 flex items-center justify-between shrink-0">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{currentActiveThread.name}</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">Session: {currentActiveThread.id}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Allocation Status:</span>
                          <select value={currentActiveThread.status} onChange={(e) => updateLeadStatus(currentActiveThread.id, e.target.value)} className="bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-xl outline-none cursor-pointer shadow-sm focus:border-cyan-500">
                            <option value="Unmarked">Unmarked</option>
                            <option value="Locked">Locked</option>
                            <option value="Hold">Hold</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex-1 p-6 overflow-y-auto flex flex-col bg-slate-50/10">
                        {activeThreadMessages.map(msg => {
                          const userText = msg.message || msg.user_message
                          const msgTime = msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''

                          return (
                            <div key={msg.id} className="w-full flex flex-col">
                              {userText && (
                                <div className="msg-bubble-wrap items-end">
                                  <div className="msg-bubble user">{userText}</div>
                                  <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">{msgTime}</span>
                                </div>
                              )}
                              {msg.intent && (
                                <div className="msg-bubble-wrap items-start">
                                  <div className="msg-bubble bot">
                                    <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">Bot Triggered Intent:</span>
                                    {msg.intent}
                                  </div>
                                  <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">{msgTime}</span>
                                </div>
                              )}
                            </div>
                          )
                        })}
                        <div ref={chatEndRef} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                      <span>Select a transaction loop context line row item to verify support histories.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ELITE CAREERS CONSOLE PANEL */}
          {currentView === 'careers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                  <button 
                    onClick={() => setCareerTab('positions')} 
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${careerTab === 'positions' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Positions ({jobsList.length})
                  </button>
                  <button 
                    onClick={() => setCareerTab('applicants')} 
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${careerTab === 'applicants' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Applicants ({applicationsList.length})
                  </button>
                </div>
                
                {careerTab === 'positions' && (
                  <button 
                    onClick={handleOpenCreateModal} 
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl border-none cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>+</span> Create Opening
                  </button>
                )}
              </div>

              {/* TAB 1: CARD OPENINGS OPEN */}
              {careerTab === 'positions' ? (
                jobsList.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
                    No active job openings deployed yet. Click above to launch one.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobsList.map(job => {
                      const jobApps = applicationsList.filter(a => a.job_id === job.id);
                      return (
                        <div 
                          key={job.id} 
                          onClick={() => handleOpenEditModal(job)}
                          className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-400 transition-all shadow-sm relative flex flex-col justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-3 mb-2">
                              <h3 className="font-bold text-slate-900 text-base group-hover:text-cyan-700 transition-colors flex items-center gap-2">
                                {job.title}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                                  <IconEdit />
                                </span>
                              </h3>
                              <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleJobStatus(job.id, job.is_active); }} 
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase border-none cursor-pointer select-none transition-colors relative z-10 ${job.is_active ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
                              >
                                {job.is_active ? '● Active' : '○ Hidden'}
                              </button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md">{job.department}</span>
                              <span className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md">📍 {job.location}</span>
                              <span className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md">⏳ {job.employment_type}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100 mb-4 text-xs">
                              <div className="flex items-center gap-2">
                                <IconBriefcase />
                                <div>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-none">Positions</p>
                                  <p className="font-semibold text-slate-700 mt-0.5 leading-none">{job.positions_available || 1} Open</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <IconCalendar />
                                <div>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-none">Deadline</p>
                                  <p className="font-semibold text-rose-600 mt-0.5 leading-none">
                                    {job.last_date_to_apply ? new Date(job.last_date_to_apply).toLocaleDateString([], {month:'short', day:'numeric'}) : 'Open'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-center text-xs">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-slate-500 font-medium">{job.salary_range || 'Not Disclosed'}</span>
                              <span className="text-[10px] text-slate-400 font-medium">Posted: {job.created_at ? new Date(job.created_at).toLocaleDateString([], {month:'short', day:'numeric'}) : 'Recent'}</span>
                            </div>
                            <span className="font-semibold text-cyan-600 bg-cyan-50/60 px-2.5 py-1 rounded-lg border border-cyan-100/40">
                              {jobApps.length} applicants
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                /* TAB 2: APPLICANT PIPELINE CONTROL WORKSPACE MATRIX */
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-xl">
                      <IconFilter />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Target Role:</span>
                      <select 
                        value={appRoleFilter} 
                        onChange={(e) => setAppRoleFilter(e.target.value)} 
                        className="bg-transparent border-none text-slate-700 font-semibold text-xs outline-none cursor-pointer"
                      >
                        <option value="all">All Published Openings</option>
                        {jobsList.map(j => (
                          <option key={j.id} value={j.id}>{j.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200/60">
                      {['all', 'applied', 'reviewing', 'interviewing', 'offered', 'rejected'].map(stage => (
                        <button 
                          key={stage} 
                          onClick={() => setAppStatusFilter(stage)} 
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all ${appStatusFilter === stage ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {stage}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3 min-h-[500px] h-[calc(100vh-320px)]">
                    <div className="border-r border-slate-200 overflow-y-auto bg-slate-50/40 divide-y divide-slate-100">
                      <div className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white sticky top-0 border-b border-slate-200/60 z-10">
                        Candidates Ledger ({filteredApplicants.length})
                      </div>
                      {filteredApplicants.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400">No applications match your filtering configurations.</div>
                      ) : (
                        filteredApplicants.map(app => {
                          const targetJob = jobsList.find(j => j.id === app.job_id);
                          const isSelected = selectedApplicantId === app.id;
                          return (
                            <button 
                              key={app.id}
                              onClick={() => setSelectedApplicantId(app.id)}
                              className={`w-full p-4 text-left border-none cursor-pointer transition-all flex flex-col gap-1 border-left-3 ${isSelected ? 'bg-white shadow-inner border-l-cyan-600' : 'bg-transparent border-l-transparent hover:bg-slate-50'}`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <span className="font-bold text-slate-900 text-sm truncate">{app.full_name}</span>
                                <span className={`badge-${(app.status || 'applied').toLowerCase()}`}>{app.status || 'Applied'}</span>
                              </div>
                              <p className="text-xs text-slate-500 truncate">{targetJob ? targetJob.title : 'General Role'}</p>
                              <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                                {app.created_at ? new Date(app.created_at).toLocaleDateString() : ''}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>

                    <div className="md:col-span-2 overflow-y-auto bg-white flex flex-col h-full">
                      {(() => {
                        const currentApp = filteredApplicants.find(a => a.id === selectedApplicantId) || filteredApplicants[0];
                        if (!currentApp) {
                          return (
                            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm p-8 text-center">
                              Select an applicant from the filtered stack to review information profiles.
                            </div>
                          );
                        }
                        const activeJob = jobsList.find(j => j.id === currentApp.job_id);

                        return (
                          <div className="flex-1 flex flex-col h-full">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-wrap justify-between items-start gap-4 shrink-0">
                              <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{currentApp.full_name}</h2>
                                <p className="text-sm text-cyan-600 font-medium mt-0.5">{currentApp.email}</p>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pipeline Flow Stage:</span>
                                <select 
                                  value={currentApp.status || 'Applied'} 
                                  onChange={(e) => updateApplicantStatus(currentApp.id, e.target.value)} 
                                  className="bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3 py-2 rounded-xl outline-none cursor-pointer shadow-sm focus:border-cyan-500 transition-colors"
                                >
                                  <option value="Applied">Applied (New)</option>
                                  <option value="Reviewing">Reviewing Profile</option>
                                  <option value="Interviewing">Active Interviewing</option>
                                  <option value="Offered">Offer Extended</option>
                                  <option value="Rejected">Pipeline Rejected</option>
                                </select>
                              </div>
                            </div>

                            <div className="p-6 flex-1 space-y-6">
                              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Application Role</p>
                                <p className="text-sm font-semibold text-slate-800">{activeJob ? activeJob.title : 'General System Opening'}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{activeJob ? `${activeJob.department} · ${activeJob.location}` : '-'}</p>
                              </div>

                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Credentials &amp; Portfolios</p>
                                <div className="flex flex-wrap gap-3">
                                  <a href={currentApp.resume_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all no-underline shadow-sm flex items-center gap-1.5">
                                    <span>📄</span> Open Resume Link <IconLink />
                                  </a>
                                  {currentApp.linkedin_url && (
                                    <a href={currentApp.linkedin_url} target="_blank" rel="noreferrer" className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors no-underline flex items-center gap-1.5">
                                      <span>🔗</span> LinkedIn Profile <IconLink />
                                    </a>
                                  )}
                                  {currentApp.portfolio_url && (
                                    <a href={currentApp.portfolio_url} target="_blank" rel="noreferrer" className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors no-underline flex items-center gap-1.5">
                                      <span>🌐</span> Personal Portfolio <IconLink />
                                    </a>
                                  )}
                                </div>
                              </div>

                              {currentApp.cover_letter && (
                                <div className="pt-4 border-t border-slate-100">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Candidate Statement / Cover Letter</p>
                                  <div className="text-sm text-slate-600 leading-relaxed bg-slate-50/60 border border-slate-100 p-4 rounded-xl whitespace-pre-wrap font-sans">
                                    {currentApp.cover_letter}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ================= MULTI-ACTION CREATION & EDITING FLOATING POPUP MODAL ================= */}
      {isModalOpen && (
        <div className="db-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="db-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingJobId ? 'Modify Job Position parameters' : 'Provision New Job Opening'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {editingJobId ? 'Alters the designated column metrics inside Supabase.' : 'Appends a deployment data row live into your Supabase database.'}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold bg-transparent border-none cursor-pointer">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Job Title *</label>
                <input type="text" name="title" className="db-input" placeholder="e.g., Lead Python Developer" value={jobForm.title} onChange={handleFormChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Department *</label>
                  <select name="department" className="db-input" value={jobForm.department} onChange={handleFormChange}>
                    <option>Engineering</option>
                    <option>Data Science</option>
                    <option>Product Management</option>
                    <option>Sales Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Location Type *</label>
                  <select name="location" className="db-input" value={jobForm.location} onChange={handleFormChange}>
                    <option>Remote</option>
                    <option>Hybrid (Pune)</option>
                    <option>On-site (Pune)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Employment Type *</label>
                  <select name="employment_type" className="db-input" value={jobForm.employment_type} onChange={handleFormChange}>
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Experience Level *</label>
                  <select name="experience_level" className="db-input" value={jobForm.experience_level} onChange={handleFormChange}>
                    <option>Junior (0-2 yrs)</option>
                    <option>Mid-Level (2-5 yrs)</option>
                    <option>Senior (5+ yrs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">No. of Positions *</label>
                  <input type="number" name="positions_available" min="1" className="db-input" value={jobForm.positions_available} onChange={handleFormChange} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Last Date to Apply *</label>
                  <input type="date" name="last_date_to_apply" className="db-input" value={jobForm.last_date_to_apply} onChange={handleFormChange} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Salary Range Indicator</label>
                <input type="text" name="salary_range" className="db-input" placeholder="e.g., ₹8,00,000 - ₹15,00,000" value={jobForm.salary_range} onChange={handleFormChange} />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Requirements (One entry per line) *</label>
                <textarea name="requirements" rows="3" className="db-input resize-none" placeholder="e.g., Deep understanding of Python and RAG architectures" value={jobForm.requirements} onChange={handleFormChange} />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors border-none bg-transparent cursor-pointer">Cancel</button>
                <button 
                  type="button"
                  onClick={executeManualJobPublish}
                  className="px-5 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl border-none cursor-pointer transition-all shadow-sm"
                >
                  {loading ? 'Saving Changes...' : editingJobId ? 'Save Position Changes' : 'Publish Active Listing'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}