import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Workflow() {
  const { openModal } = useApp()
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .skx-page { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          background-color: #f8fafc; 
          color: #0f172a; 
        }

        .skx-label {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0891b2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
        }

        .skx-h1 {
          font-size: clamp(2.75rem, 5.5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #0f172a;
        }
        
        .skx-h1 em {
          font-style: normal;
          font-weight: 700;
          background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .skx-h2 {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0f172a;
          line-height: 1.2;
        }
        .skx-h2 strong { font-weight: 700; }

        /* SaaS Bento Grid Updates */
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stat-block {
          background: #ffffff;
          padding: 32px 24px;
          text-align: center;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-block:hover {
          border-color: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }
        .stat-num {
          font-size: 2.25rem;
          font-weight: 700;
          color: #0891b2;
          letter-spacing: -0.03em;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 11px;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
        }

        /* SaaS Premium Feature Cards */
        .feat-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .feat-card:hover { 
          border-color: #e2e8f0; 
          transform: translateY(-4px); 
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }
        .feat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #fafafa;
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #475569;
          transition: all 0.3s ease;
        }
        .feat-card:hover .feat-icon {
          background: rgba(124, 58, 237, 0.04);
          border-color: rgba(124, 58, 237, 0.1);
          color: #7c3aed;
        }
        .feat-title { font-size: 16px; font-weight: 600; color: #0f172a; letter-spacing: -0.01em; }
        .feat-desc  { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* Use Cases Layout */
        .use-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          gap: 24px;
          align-items: flex-start;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .use-card:hover { 
          border-color: #e2e8f0; 
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }
        .use-icon {
          font-size: 22px;
          flex-shrink: 0;
          width: 48px; height: 40px;
          background: #fafafa;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: #475569;
        }
        .use-title { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.01em; }
        .use-desc  { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* Outcomes Lists */
        .benefit-row {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 24px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .benefit-row:last-child { border-bottom: none; }
        .benefit-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(124, 58, 237, 0.06);
          border: 1px solid rgba(124, 58, 237, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          color: #7c3aed; font-size: 12px; font-weight: 700;
        }
        .benefit-title { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
        .benefit-desc  { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* Pricing Elements */
        .price-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          padding: 40px;
          position: relative; overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .price-card:hover {
          border-color: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }
        .price-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: #475569;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .price-feature:last-of-type { border-bottom: none; margin-bottom: 28px; }
        .price-check {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(124, 58, 237, 0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #7c3aed; font-size: 10px; font-weight: 700;
        }

        /* Canvas Platform Workspace Wrapper */
        .canvas-wrap {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
          position: relative;
          overflow: hidden;
        }
        .canvas-wrap::after {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(148, 163, 184, 0.08) 1.5px, transparent 1.5px);
          background-size: 24px 24px; pointer-events: none;
        }

        /* Integration Strip Elements */
        .integrations-strip {
          display: flex; gap: 8px; flex-wrap: wrap; margin-top: 24px;
          position: relative; z-index: 2;
        }
        .int-badge {
          font-size: 11px;
          color: #475569;
          padding: 6px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #ffffff;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .int-badge:hover { border-color: rgba(124,58,237,0.2); color: #7c3aed; background: #fafafa; }

        /* Simultaneous Scroll Transitions Keyframes Hook */
        .saas-reveal-node {
          view-timeline-name: --itemReveal;
          view-timeline-axis: block;
          animation-name: saasReveal;
          animation-fill-mode: both;
          animation-timeline: --itemReveal;
          animation-range: entry 5% cover 35%;
        }

        /* Core Buttons Override */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: #0891b2;
          color: #ffffff; font-weight: 600; font-size: 14px;
          border-radius: 12px; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer; border: none; text-decoration: none;
          box-shadow: 0 4px 12px rgba(8,145,178,0.15);
        }
        .btn-primary:hover { background: #0e7490; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(8,145,178,0.25); }
        
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          border: 1px solid #e2e8f0;
          color: #475569; font-size: 14px; border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none;
          background: #ffffff;
        }
        .btn-ghost:hover { border-color: #cbd5e1; background: #f8fafc; color: #0f172a; transform: translateY(-2px); }

        .skx-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 0 24px;
        }
        .skx-section { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        @media (max-width: 1024px) {
          .stat-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
          .feat-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
          .use-grid { grid-template-columns: 1fr; gap: 16px; }
          .outcome-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="skx-page">

        {/* HERO SECTION */}
        <section style={{padding: '140px 0 80px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>

          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div className="hero-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}}>

              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>
                  Workflow<br />
                  <em>Automation</em>
                </h1>
                <p style={{fontSize: '16px', color: '#4b5563', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>
                  End-to-end process automation with AI decision nodes. Connect 200+ enterprise systems, build complex workflows visually, and deploy without writing a single line of code.
                </p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &arr;</button>
                  <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
                </div>
              </div>

              {/* Visual Workflow Canvas Mockup Component */}
              <div className="canvas-wrap saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Sample workflow</p>
                <svg width="100%" viewBox="0 0 380 280" role="img" aria-label="Sample automation workflow: invoice receipt to payment approval">
                  <title>Invoice approval workflow</title>
                  <desc>A sample automation workflow showing invoice receipt flowing through AI classification, three-way PO match, and conditional approval routing.</desc>
                  <defs>
                    <marker id="wa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M2 2L8 5L2 8" fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  {/* Trigger Node */}
                  <rect x="20" y="16" width="120" height="40" rx="8" fill="#ffffff" stroke="rgba(8,145,178,0.2)" strokeWidth="0.5"/>
                  <rect x="20" y="16" width="120" height="2.5" rx="1.5" fill="rgba(8,145,178,0.3)"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="80" y="27" textAnchor="middle" dominantBaseline="central" letterSpacing="0.08em">TRIGGER</text>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a" x="80" y="44" textAnchor="middle" dominantBaseline="central">Invoice received</text>

                  <line x1="140" y1="36" x2="168" y2="36" stroke="#94a3b8" strokeWidth="0.8" markerEnd="url(#wa)"/>

                  {/* AI Node */}
                  <rect x="170" y="16" width="120" height="40" rx="8" fill="#ffffff" stroke="rgba(124,58,237,0.3)" strokeWidth="0.5"/>
                  <rect x="170" y="16" width="120" height="2.5" rx="1.5" fill="rgba(124,58,237,0.4)"/>
                  <text fontFamily="monospace" fontSize="8" fill="#7c3aed" x="230" y="27" textAnchor="middle" dominantBaseline="central" letterSpacing="0.08em">AI NODE</text>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a" x="230" y="44" textAnchor="middle" dominantBaseline="central">Classify &amp; extract</text>

                  <line x1="230" y1="56" x2="230" y2="82" stroke="#94a3b8" strokeWidth="0.8" markerEnd="url(#wa)"/>

                  {/* PO Match Node */}
                  <rect x="170" y="84" width="120" height="40" rx="8" fill="#ffffff" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="230" y="96" textAnchor="middle" dominantBaseline="central" letterSpacing="0.08em">VALIDATION</text>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a" x="230" y="113" textAnchor="middle" dominantBaseline="central">3-way PO match</text>

                  <line x1="230" y1="124" x2="230" y2="150" stroke="#94a3b8" strokeWidth="0.8" markerEnd="url(#wa)"/>

                  {/* Decision Diamond */}
                  <polygon points="230,152 270,172 230,192 190,172" fill="#ffffff" stroke="rgba(8,145,178,0.2)" strokeWidth="0.8"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="230" y="172" textAnchor="middle" dominantBaseline="central" letterSpacing="0.06em">MATCH?</text>

                  {/* Yes Branch */}
                  <text fontFamily="monospace" fontSize="8" fill="#166534" x="118" y="196" textAnchor="middle">YES</text>
                  <path d="M190 172 L80 172 L80 214" fill="none" stroke="#94a3b8" strokeWidth="0.8" markerEnd="url(#wa)"/>
                  <rect x="20" y="216" width="120" height="40" rx="8" fill="#f0fdf4" stroke="rgba(22,163,74,0.2)" strokeWidth="0.5"/>
                  <rect x="20" y="216" width="120" height="2.5" rx="1.5" fill="rgba(22,163,74,0.4)"/>
                  <text fontFamily="monospace" fontSize="8" fill="#166534" x="80" y="227" textAnchor="middle" dominantBaseline="central" letterSpacing="0.08em">ACTION</text>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a" x="80" y="244" textAnchor="middle" dominantBaseline="central">Approve &amp; pay</text>

                  {/* No Branch */}
                  <text fontFamily="monospace" fontSize="8" fill="#dc2626" x="342" y="196" textAnchor="middle">NO</text>
                  <path d="M270 172 L350 172 L350 214" fill="none" stroke="#94a3b8" strokeWidth="0.8" markerEnd="url(#wa)"/>
                  <rect x="290" y="216" width="80" height="40" rx="8" fill="#f0fdf4" stroke="rgba(220,38,38,0.2)" strokeWidth="0.5"/>
                  <rect x="290" y="216" width="80" height="2.5" rx="1.5" fill="rgba(220,38,38,0.4)"/>
                  <text fontFamily="monospace" fontSize="8" fill="#991b1b" x="330" y="227" textAnchor="middle" dominantBaseline="central" letterSpacing="0.08em">ROUTE</text>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a" x="330" y="244" textAnchor="middle" dominantBaseline="central">Exception queue</text>

                  {/* ERP Push Layout */}
                  <line x1="80" y1="256" x2="80" y2="266" stroke="#94a3b8" strokeWidth="0.8" markerEnd="url(#wa)"/>
                  <rect x="20" y="268" width="120" height="12" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="80" y="274" textAnchor="middle" dominantBaseline="central" letterSpacing="0.06em">ERP PUSH · SAP</text>
                </svg>

                {/* Integration Ecosystem Badges */}
                <div className="integrations-strip">
                  <span className="int-badge">SAP</span>
                  <span className="int-badge">Salesforce</span>
                  <span className="int-badge">ServiceNow</span>
                  <span className="int-badge">Oracle</span>
                  <span className="int-badge">MS 365</span>
                  <span className="int-badge">+ 195 more</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">200+</span>
              <span className="stat-label">Integrations</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">0</span>
              <span className="stat-label">Code Required</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">3&times;</span>
              <span className="stat-label">Faster Cycles</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">99.9%</span>
              <span className="stat-label">Uptime SLA</span>
            </div>
          </div>
        </div>

        <div className="skx-divider"></div>

        {/* CORE PLATFORM CAPABILITIES */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Platform Capabilities</p>
                <h2 className="skx-h2">Build any process.<br /><strong>Automate everything.</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '340px', lineHeight: '1.6'}}>
                Visual workflow builder meets enterprise-grade orchestration. Build, test, and deploy without writing code.
              </p>
            </div>
            
            <div className="feat-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}}>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🎨</div>
                <div className="feat-title">Drag-and-Drop Builder</div>
                <div className="feat-desc">Build sophisticated multi-step workflows with a canvas-based designer. Conditional branches, loops, and parallel execution - no code needed.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🤖</div>
                <div className="feat-title">AI Decision Nodes</div>
                <div className="feat-desc">Embed AI at any step in your workflow. Classify incoming data, predict outcomes, and route automatically based on configurable confidence thresholds.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔌</div>
                <div className="feat-title">Enterprise Connectors</div>
                <div className="feat-desc">Native integrations with SAP, Salesforce, ServiceNow, Oracle, Microsoft 365, and 190+ more. Custom connectors via REST and GraphQL.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📊</div>
                <div className="feat-title">Real-Time Monitoring</div>
                <div className="feat-desc">Live dashboards showing workflow health, execution times, error rates, and business KPIs. Alerting via Slack, email, or PagerDuty.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔄</div>
                <div className="feat-title">Version Control & Rollback</div>
                <div className="feat-desc">Full Git-style versioning on every workflow. Roll back to any prior version in one click. Compare changes with a visual diff.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">⚡</div>
                <div className="feat-title">Event-Driven Triggers</div>
                <div className="feat-desc">Trigger workflows from webhooks, schedules, file drops, database changes, or any business event. Sub-100ms trigger latency.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Common Automations</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>What teams are automating <strong>today</strong></h2>
            
            <div className="use-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">💰</div>
                <div>
                  <div className="use-title">Accounts Payable</div>
                  <div className="use-desc">Invoice receipt to payment approval in under 2 minutes. Three-way PO match, exception routing, and ERP push - fully automated.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🧑‍💼</div>
                <div>
                  <div className="use-title">HR Onboarding</div>
                  <div className="use-desc">New hire paperwork, system provisioning, training assignments, and welcome sequences - triggered the moment an offer is accepted.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🎫</div>
                <div>
                  <div className="use-title">IT Service Management</div>
                  <div className="use-desc">Auto-triage incoming tickets, resolve common issues without human touch, and escalate with context to the right team.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">📦</div>
                <div>
                  <div className="use-title">Order-to-Cash</div>
                  <div className="use-desc">From order intake to cash collection - validation, fulfillment triggering, invoicing, and collections workflows all automated end-to-end.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BUSINESS OUTCOMES + PRICING BLOCK */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start'}} className="outcome-grid">
              
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Outcomes</p>
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>What changes when<br /><strong>you automate</strong></h2>
                
                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">80% reduction in manual task time</div>
                      <div className="benefit-desc">Staff focus on decisions requiring human judgment, not repetitive data movement and approvals.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Near-zero error rate on routine tasks</div>
                      <div className="benefit-desc">Automated workflows don't forget steps, skip validation, or misroute. Every rule applied consistently, every time.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Scale without hiring</div>
                      <div className="benefit-desc">Handle 10&times; the transaction volume with the same team. Automation scales horizontally on demand.</div>
                    </div>
                  </div>
                </div>

                {/* Deployment SLA Indicator Box */}
                <div style={{marginTop: '36px', background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.01)'}}>
                  <div>
                    <p style={{fontSize: '11px', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '6px', fontWeight: '700'}}>FIRST WORKFLOW LIVE IN</p>
                    <p style={{fontSize: '2rem', fontWeight: '700', color: '#7c3aed', letterSpacing: '-0.03em', lineHeight: '1'}}>72 hrs</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p style={{fontSize: '11px', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '6px', fontWeight: '700'}}>GUARANTEED</p>
                    <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', color: '#7c3aed', fontSize: '14px', fontWeight: '700'}}>✓</div>
                  </div>
                </div>
              </div>

              {/* Pricing Custom Module Card */}
              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <p style={{fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-.03em', marginBottom: '8px'}}>Custom pricing</p>
                <p style={{fontSize: '13px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6'}}>Based on workflow complexity and volume.<br />Contact sales for a tailored quote.</p>
                
                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Unlimited workflow runs</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>All 200+ integrations included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>White-glove onboarding</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Dedicated workflow architect</span>
                  </div>
                </div>
                
                <button className="btn-primary mt-6" onClick={() => openModal('demo')} style={{width: '100%', justifyContent: 'center'}}>Contact Sales &rarr;</button>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px'}}>
                  <div style={{textAlignment: 'center', textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                    <p style={{fontSize: '10px', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '4px', fontWeight: '700'}}>TRIAL</p>
                    <p style={{fontSize: '12px', color: '#0f172a', fontWeight: '600'}}>Free POC</p>
                  </div>
                  <div style={{textAlignment: 'center', textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                    <p style={{fontSize: '10px', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '4px', fontWeight: '700'}}>CONTRACT</p>
                    <p style={{fontSize: '12px', color: '#0f172a', fontWeight: '600'}}>No lock-in</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(124,58,237,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div className="cta-box saas-reveal-node" style={{boxShadow: 'none', background: 'transparent', border: 'none', padding: '0'}}>
              <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
              <h2 className="skx-h2" style={{marginBottom: '16px'}}>Your ops team is<br /><strong>ready to scale</strong></h2>
              <p style={{fontSize: '14px', color: '#64748b', marginBottom: '40px'}}>Deploy your first automated workflow in under 72 hours. Guaranteed.</p>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
                <button className="btn-primary" onClick={() => openModal('demo')}>Start Automating</button>
                <Link to="/#services" className="btn-ghost">&larr; Back to All Services</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}