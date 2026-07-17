import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both an email and a password.')
      return
    }

    setLoading(true)
    setErrorMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (error) throw error

      // Login successful -> Redirect to the admin dashboard
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setErrorMessage(err.message || 'Invalid login credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex w-full font-sans antialiased">

      {/* LEFT BRAND PANEL - Hidden on mobile, flex on desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0B1120] overflow-hidden p-12 flex-col justify-between">
        {/* Subtle decorative grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Dynamic ambient background glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        

        {/* Centered Descriptive Content Statement */}
        <div className="relative z-10 space-y-4 max-w-md my-auto">
          <h1 className="text-3xl font-bold text-white tracking-tight leading-snug">
            Sign in to your control center
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Manage active job listings, review candidate applications, and oversee incoming chatbot customer sessions from a single unified gateway dashboard.
          </p>
        </div>

        {/* Bottom Footer Copyright Label */}
        <p className="relative z-10 text-slate-500 text-xs font-medium tracking-wide">
          &copy; {new Date().getFullYear()} SkewX Technologies. All rights reserved.
        </p>
      </div>

      {/* RIGHT FORM INTERFACE PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 sm:p-12 relative">
        <div className="w-full max-w-sm space-y-6">

          {/* BRAND LOGO POSITIONED DIRECTLY ABOVE WELCOME HEADER */}
          <div className="flex items-center gap-2.5 mb-2">
            {/* Desktop Brand Logo View */}
            <a href="/" className="hidden lg:block">
              <img src="assets/skewx-logo.png" alt="SkewX Logo" className="h-13 w-auto object-contain" />
            </a>

            {/* Mobile Adaptive Fallback Brand Mark */}
            <div className="lg:hidden flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-cyan-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                S
              </div>
              <span className="text-slate-900 font-bold text-xl tracking-tight">SkewX Portal</span>
            </div>
          </div>

          {/* Welcome Text Prompts */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to securely access your gateway dashboard operations.</p>
          </div>

          {/* Error Message Catcher Node */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Action Engine Wrapper */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all box-border"
                placeholder="admin@skewx.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Secret Credentials / Password
                </label>
                
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all box-border"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-2 border-none mt-2 select-none"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {loading ? 'Verifying Authorization...' : 'Access Dashboard Gateway'}
            </button>
          </form>

          {/* Secure compliance disclaimer banner note */}
          <p className="text-center text-xs text-slate-400 leading-relaxed pt-2">
            Privileged session tracking active. Unauthorized personnel access attempts are automatically logged and isolated.
          </p>
        </div>
      </div>
    </div>
  )
}