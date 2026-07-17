import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase.js'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Company from './pages/Company.jsx'
import Careers from './pages/Careers.jsx'
import Login from './pages/Login.jsx' 
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'

import Chatbots    from './pages/services/Chatbots.jsx'
import IDP         from './pages/services/IDP.jsx'
import Workflow    from './pages/services/Workflow.jsx'
import Agents      from './pages/services/Agents.jsx'
import Predictive  from './pages/services/Predictive.jsx'
import RAG         from './pages/services/RAG.jsx'
import Vision      from './pages/services/Vision.jsx'
import Governance  from './pages/services/Governance.jsx'
import Integration from './pages/services/Integration.jsx'

import AdminDashboard from './views/dashboard/AdminDashboard.jsx'

const SERVICE_PAGES = {
  chatbots:    Chatbots,
  idp:         IDP,
  workflow:    Workflow,
  agents:      Agents,
  predictive:  Predictive,
  rag:         RAG,
  vision:      Vision,
  governance:  Governance,
  integration: Integration,
}

function ServiceRoute({ slug }) {
  const Page = SERVICE_PAGES[slug]
  if (!Page) return <Navigate to="/" replace />
  return <Page />
}

// ROUTE PROTECTION WRAPPER: Safely checks session status
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setCheckingAuth(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-sans text-sm font-semibold text-slate-400">
        Verifying System Authorization...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      }, 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* ================= AUTHENTICATION PATHWAYS ================= */}
        <Route path="/login" element={<Login />} />
        
        {/* PRIVILEGED SECURED CORE INTERFACE */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* ================= WRAPPED PUBLIC MARKETING ROUTES ================= */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/company" element={<Company />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<Terms />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />

                {Object.keys(SERVICE_PAGES).map(slug => (
                  <Route
                    key={slug}
                    path={`/services/${slug}`}
                    element={<ServiceRoute slug={slug} />}
                  />
                ))}

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </>
  )
}