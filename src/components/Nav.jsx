import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../lib/AppContext.jsx'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openModal } = useApp()

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Handle navbar transition triggers on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeAndGo = () => setMobileOpen(false)

  return (
    <>
      {/* MOBILE NAV DRAWER - Elevated to z-[100] with standard top-down natural flow */}
      <div 
        id="mobileNav" 
        className={`fixed inset-0 bg-white z-[100] p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Dedicated Mobile Header Row */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-100">
          <img src="assets/skewx-logo.png" alt="Company Logo" className="h-8 w-auto object-contain -translate-y-[2px]" />
          <button 
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-800 text-lg font-bold focus:outline-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links List */}
        <nav className="flex flex-col gap-5 pt-8 text-lg font-bold text-gray-900">
          <a href="/#services" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>Services</a>
          <a href="/#process" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>How It Works</a>
          <a href="/#whychooseus" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>Why Choose Us</a>
          <a href="/#solutions" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>Industries</a>
          <Link to="/company" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>About Us</Link>
          <Link to="/careers" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>Careers</Link>
          <a href="/#contact" className="hover:text-cyan-600 transition-colors" onClick={closeAndGo}>Contact</a>
        </nav>

        {/* CTA Button placed safely right below the link stack layout blocks */}
        <div className="pt-8">
          <button
            onClick={() => { setMobileOpen(false); openModal('demo') }}
            className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-base font-bold text-center hover:brightness-110 shadow-lg shadow-cyan-600/10 transition"
          >
            Book Demo
          </button>
        </div>
      </div>

      {/* PERFECT ENTERPRISE NAVBAR CONTAINER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] py-3' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          
          {/* Brand/Logo Wrapper with Optical Baseline Adjustment */}
          <a href="/" className="flex items-center -translate-y-[2px] transition-transform active:scale-98">
            <img src="assets/skewx-logo.png" alt="Company Logo" className="h-9 w-auto object-contain logo" />
          </a>

          {/* Desktop Navigation Link Cluster (Enhanced text size & weight) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-base font-semibold text-gray-800">
            <a href="/#services" className="nav-link transition-colors">Services</a>
            <a href="/#process" className="nav-link transition-colors">How It Works</a>
            <a href="/#whychooseus" className="nav-link transition-colors">Why Choose Us</a>
            <a href="/#solutions" className="nav-link transition-colors">Industries</a>
            <Link to="/company" className="nav-link transition-colors">About Us</Link>
            <Link to="/careers" className="nav-link transition-colors">Careers</Link>
            <a href="/#contact" className="nav-link transition-colors">Contact</a>
          </nav>

          {/* Call To Action Actions Control Block */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <button
                onClick={() => openModal('demo')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-sm font-bold shadow-md shadow-cyan-600/10 hover:shadow-xl hover:shadow-cyan-600/20 hover:brightness-110 active:scale-98 transition-all"
              >
                Book Demo
              </button>
            </div>

            {/* Clean Mobile Hamburger Trigger Node */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className="block w-5 h-0.5 bg-gray-900 rounded-full"></span>
                <span className="block w-5 h-0.5 bg-gray-900 rounded-full"></span>
                <span className="block w-5 h-0.5 bg-gray-900 rounded-full"></span>
              </div>
            </button>
          </div>

        </div>
      </header>
    </>
  )
}