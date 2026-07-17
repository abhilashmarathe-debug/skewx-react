import { useState, useEffect, useRef } from 'react'
import { useApp } from '../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Company() {
  const { openModal } = useApp()

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-cyan-100 select-normal">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .saas-font {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .cp-heading {
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #0891b2;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .cp-main-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          letter-spacing: -.03em;
          color: #0f172a;
          line-height: 1.15;
          margin-bottom: 24px;
        }
        .cp-section-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -.02em;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 32px;
        }
        .cp-bento-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          padding: 32px;
          border-radius: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cp-bento-card:hover {
          border-color: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }
        .cp-stat-val {
          font-size: clamp(2.25rem, 3vw, 3rem);
          font-weight: 700;
          letter-spacing: -.03em;
          color: #0891b2;
          line-height: 1;
        }
        .cp-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(6, 182, 212, 0.04);
          border: 1px solid rgba(6, 182, 212, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0891b2;
          margin-bottom: 20px;
        }
      `}} />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 bg-white saas-font">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase text-cyan-700 bg-cyan-50 border border-cyan-100 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              About SkewX Technologies
            </div>

            <h1 className="cp-main-title">
              Engineering the Future of<br />
              <span className="text-cyan-600">Enterprise AI Automation</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
              SkewX Technologies builds enterprise-grade AI systems that automate complex workflows, enhance baseline decision-making accuracy, and scale digital operations through pragmatic machine learning infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ================= COMPANY OVERVIEW ================= */}
      <section className="py-20 bg-gray-50/50 border-t border-b border-gray-100 scroll-mt-20 saas-font">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            
            <div>
              <p className="cp-heading">Company Overview</p>
              <h2 className="cp-section-title">
                Building Intelligent Infrastructure for Modern Businesses
              </h2>

              <div className="space-y-6 text-slate-600 leading-relaxed text-[15px]">
                <p>
                  Founded in 2025, SkewX Technologies focuses on developing highly custom, scalable artificial intelligence architectures tailored specifically to the unique constraints of core operations.
                </p>
                <p>
                  Our goal is to eliminate operational friction loops through robust model pipeline engineering, deterministic agent workflows, and data processing frameworks.
                </p>
                <p>
                  By marrying structural backend engineering with production reliability metrics, we deliver turn-key deployments that create verifiable system productivity returns.
                </p>
              </div>
            </div>

            {/* STATS BENTO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="cp-bento-card">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Founded</p>
                <h3 className="cp-stat-val">2025</h3>
              </div>

              <div className="cp-bento-card">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Focus Architecture</p>
                <h3 className="text-base font-bold text-slate-800 mt-2">Enterprise Systems</h3>
              </div>

              <div className="cp-bento-card">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Specialization</p>
                <h3 className="text-base font-bold text-slate-800 mt-2">Intelligent Workflows</h3>
              </div>

              <div className="cp-bento-card">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Primary Domain</p>
                <h3 className="text-base font-bold text-slate-800 mt-2">Applied Engineering</h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="py-20 bg-white saas-font">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="cp-heading">Mission Parameters</p>
            <h2 className="cp-section-title">
              Creating Practical AI Frameworks That Deliver Scaled Impact
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              We operate under the principle that cognitive automation structures should move past sandbox experimentation. Our engineering objectives target building production-ready architectures that increase daily output capacities, isolate drift anomalies automatically, and insulate technical scaling pathways.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 bg-gray-50/50 border-t border-b border-gray-100 saas-font">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="cp-heading">Core Values</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Principles Guiding Our Code</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "Engineering Rigor", 
                desc: "We prioritize systematic, production-tested model auditing over temporary implementation trends.",
                icon: <svg width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              },
              { 
                title: "Infrastructural Scale", 
                desc: "Every data router pipeline is optimized to scale automatically to match intense query spikes smoothly.",
                icon: <svg width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              },
              { 
                title: "Systemic Trust", 
                desc: "Built with isolation layers guaranteeing strict data privacy policies and absolute data custody loops.",
                icon: <svg width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              }
            ].map((v, idx) => (
              <div key={idx} className="cp-bento-card group">
                <div className="cp-icon-wrapper transition-all duration-300 group-hover:bg-cyan-500/10">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-white saas-font">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gray-50 border border-slate-100 p-10 md:p-16 rounded-3xl text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            
            <p className="cp-heading mb-4">Let's Build Together</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Ready to automate what matters?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Partner with SkewX Technologies to implement deterministic AI pipelines, custom agent routing matrices, and secure document processing capabilities.
            </p>

            <Link 
              to="/#contact"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold text-sm shadow-[0_4px_12px_rgba(8,145,178,0.15)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 inline-block"
            >
              Initiate Project Blueprint &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}