import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="site-footer" className="relative mt-24 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 border-b border-black/10 pb-14">

          {/* BRAND */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <a href="/">
                {/* FIXED: Added leading slash for absolute root resolution */}
                <img src="/assets/skewx-logo.png" alt="Company Logo" className="h-15 w-auto object-contain" />
              </a>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-7">
              SkewX is an AI digital engineering company. We help enterprises reimagine business models and unlock transformational value through applied artificial intelligence.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CAPABILITIES */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-900 mb-6">Capabilities</h3>
            <ul className="space-y-3">
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/chatbots">AI Chatbots & Conversational AI</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/idp">Intelligent Document Processing</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/workflow">Workflow Automation</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/agents">Autonomous AI Agents</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/predictive">Predective AI & Forecasting</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/rag">AI Search & RAG Engine</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/vision">Computer Vision & Visiual AI</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/governance">AI Governance & Compliance</Link></li>
              <li><Link className="text-sm text-gray-600 hover:text-cyan-600 transition" to="/services/integration">AI Integration & API Orchestration</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="/#solutions" className="text-sm text-gray-600 hover:text-cyan-600 transition">Industries</a></li>
  
              <li><Link to="/company" className="text-sm text-gray-600 hover:text-cyan-600 transition">About SkewX</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-cyan-600 transition">Careers</Link></li>
              <li><a href="/#contact" className="text-sm text-gray-600 hover:text-cyan-600 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-900 mb-6">Global Offices</h3>
            <div className="space-y-5">
              <div>
                <p className="text-[11px] uppercase font-bold tracking-[0.1em] text-gray-400 mb-1">Email</p>
                <a href="mailto:contact@skewx.com" className="text-sm text-cyan-600 font-medium hover:underline">contact@skewx.com</a>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold tracking-[0.1em] text-gray-400 mb-1">India (HQ)</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Office No. 1103, Sector 142<br />
                  Noida, Uttar Pradesh 201304
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pt-8">
          <div>
            <p className="text-sm text-gray-500 mb-3">
              &copy; {new Date().getFullYear()} SkewX Technologies. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="text-xs text-gray-500 hover:text-cyan-600 transition" to="/privacy-policy">Privacy Policy</Link>
              <Link className="text-xs text-gray-500 hover:text-cyan-600 transition" to="/terms-of-service">Terms of Service</Link>
              <Link className="text-xs text-gray-500 hover:text-cyan-600 transition" to="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium border border-gray-200 bg-gray-50 text-gray-600 px-3 py-1 rounded-md">SOC2</span>
            <span className="text-[11px] font-medium border border-gray-200 bg-gray-50 text-gray-600 px-3 py-1 rounded-md">ISO 27001</span>
            <span className="text-[11px] font-medium border border-gray-200 bg-gray-50 text-gray-600 px-3 py-1 rounded-md">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}