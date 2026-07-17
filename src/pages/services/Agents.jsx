import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Agents() {
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
          letter-spacing: .16em; 
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
          letter-spacing: -.03em; 
          color: #0f172a;
        }
        
        .skx-h1 em {
          font-style: normal; 
          font-weight: 700; 
          background: linear-gradient(135deg, #0891b2, #7c3aed); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text;
        }
        
        .skx-h2 {
          font-size: clamp(2rem, 3.5vw, 2.75rem); 
          font-weight: 700; 
          letter-spacing: -.02em; 
          color: #0f172a; 
          line-height: 1.2;
        }
        
        .skx-h2 strong { font-weight: 700; }
        
        /* SaaS Bento Layout Grid */
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
          letter-spacing: -.03em; 
          line-height: 1; 
          display: block; 
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 11px; 
          color: #94a3b8; 
          letter-spacing: .08em; 
          text-transform: uppercase;
          font-weight: 700;
        }
        
        /* Premium Features Architecture */
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
        
        .feat-title { font-size: 16px; font-weight: 600; color: #0f172a; letter-spacing: -.01em; }
        .feat-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
        
        /* Core Deployments / Use Cases */
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
          width: 48px; 
          height: 40px; 
          background: #fafafa; 
          border: 1px solid #f1f5f9; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: #475569;
        }
        
        .use-title { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px; letter-spacing: -.01em; }
        .use-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
        
        /* Strategic Metrics Rows */
        .benefit-row {
          display: flex; 
          gap: 20px; 
          align-items: flex-start; 
          padding: 24px 0; 
          border-bottom: 1px solid #f1f5f9;
        }
        
        .benefit-row:last-child { border-bottom: none; }
        
        .benefit-arrow {
          width: 28px; 
          height: 28px; 
          border-radius: 50%; 
          background: rgba(124, 58, 237, 0.06); 
          border: 1px solid rgba(124, 58, 237, 0.12); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-shrink: 0; 
          margin-top: 2px; 
          color: #7c3aed; 
          font-size: 12px; 
          font-weight: 700;
        }
        
        .benefit-title { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
        .benefit-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
        
        /* Pricing Cards */
        .price-card {
          background: #ffffff; 
          border: 1px solid #f1f5f9; 
          border-radius: 24px; 
          padding: 40px; 
          position: relative; 
          overflow: hidden; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .price-card:hover {
          border-color: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }
        
        .price-card::before {
          content: ''; 
          position: absolute; 
          top: -80px; 
          right: -80px; 
          width: 200px; 
          height: 200px; 
          background: radial-gradient(circle, rgba(124,58,237,.05) 0%, transparent 70%); 
          pointer-events: none;
        }
        
        .price-feature {
          display: flex; 
          align-items: center; 
          gap: 10px; 
          font-size: 13.5px; 
          color: #475569; 
          padding: 12px 0; 
          border-bottom: 1px solid #f1f5f9;
        }
        
        .price-feature:last-of-type { border-bottom: none; margin-bottom: 28px; }
        
        .price-check {
          width: 18px; 
          height: 18px; 
          border-radius: 50%; 
          background: rgba(124, 58, 237, 0.06); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-shrink: 0; 
          color: #7c3aed; 
          font-size: 10px; 
          font-weight: 700;
        }
        
        /* Unified Scroll Keyframe Reveals Hook */
        .saas-reveal-node {
          view-timeline-name: --itemReveal;
          view-timeline-axis: block;
          animation-name: saasReveal;
          animation-fill-mode: both;
          animation-timeline: --itemReveal;
          animation-range: entry 5% cover 35%;
        }
        
        /* Interface Buttons */
        .btn-primary {
          display: inline-flex; 
          align-items: center; 
          gap: 8px; 
          padding: 14px 28px; 
          background: #0891b2; 
          color: #ffffff; 
          font-weight: 600; 
          font-size: 14px; 
          border-radius: 12px; 
          letter-spacing: -.01em; 
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
          cursor: pointer; 
          border: none; 
          text-decoration: none; 
          box-shadow: 0 4px 12px rgba(8,145,178,.15);
        }
        
        .btn-primary:hover {
          background: #0e7490;
          transform: translateY(-2px); 
          box-shadow: 0 10px 25px rgba(8,145,178,.25);
        }
        
        .btn-ghost {
          display: inline-flex; 
          align-items: center; 
          gap: 8px; 
          padding: 14px 28px; 
          border: 1px solid #e2e8f0; 
          color: #475569; 
          font-size: 14px; 
          border-radius: 12px; 
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
          text-decoration: none; 
          background: #ffffff;
        }
        
        .btn-ghost:hover {
          border-color: #cbd5e1; 
          color: #0f172a; 
          background: #f8fafc;
          transform: translateY(-2px);
        }
        
        .skx-divider {
          height: 1px; 
          background: #f1f5f9; 
          margin: 0 24px;
        }
        
        .skx-section { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        @media(max-width:1024px){
          .stat-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
          .feat-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
          .use-grid { grid-template-columns: 1fr; gap: 16px; }
          .outcome-grid { grid-template-columns: 1fr; gap: 48px; }
          [data-two] { grid-template-columns: 1fr !important; gap: 48px; }
        }
        @media(max-width:768px){
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="skx-page">

        {/* HERO */}
        <section style={{padding: '140px 0 80px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: '0', right: '0', width: '600px', height: '500px', background: 'radial-gradient(ellipse at 80% 0%,rgba(124,58,237,.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}} data-two>
              
              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>Autonomous<br /><em>AI Agents</em></h1>
                <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>Enterprise-grade AI agents that reason, plan, use tools, self-correct, and execute complex workflows autonomously - with complete visibility and auditability.</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn-primary" onClick={() => openModal('demo')}>Deploy Your Agent &rarr;</button>
                  <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
                </div>
              </div>

              {/* Agent loop mockup visual */}
              <div style={{background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '40px 36px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02)'}} className="saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '24px'}}>ReAct reasoning loop</p>
                <svg width="100%" viewBox="0 0 320 260" role="img" aria-label="Agent reasoning loop: Observe, Think, Plan, Act, Reflect">
                  <defs>
                    <marker id="ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M2 2L8 5L2 8" fill="none" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>
                  
                  {/* Process loop nodes */}
                  <circle cx="160" cy="44" r="32" fill="#f8fafc" stroke="rgba(124,58,237,.3)" strokeWidth="1"/>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#6d28d9" x="160" y="40" textAnchor="middle" dominantBaseline="central">Observe</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="160" y="55" textAnchor="middle" dominantBaseline="central">inputs &amp; context</text>

                  <circle cx="280" cy="130" r="32" fill="#f8fafc" stroke="rgba(124,58,237,.3)" strokeWidth="1"/>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#6d28d9" x="280" y="126" textAnchor="middle" dominantBaseline="central">Think</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="280" y="141" textAnchor="middle" dominantBaseline="central">reason &amp; plan</text>

                  <circle cx="220" cy="220" r="32" fill="#f8fafc" stroke="rgba(8,145,178,.3)" strokeWidth="1"/>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0369a1" x="220" y="216" textAnchor="middle" dominantBaseline="central">Act</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="220" y="231" textAnchor="middle" dominantBaseline="central">use tools</text>

                  <circle cx="100" cy="220" r="32" fill="#f8fafc" stroke="rgba(22,163,74,.3)" strokeWidth="1"/>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#15803d" x="100" y="216" textAnchor="middle" dominantBaseline="central">Reflect</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="100" y="231" textAnchor="middle" dominantBaseline="central">self-correct</text>

                  <circle cx="40" cy="130" r="32" fill="#f8fafc" stroke="rgba(124,58,237,.3)" strokeWidth="1"/>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#6d28d9" x="40" y="126" textAnchor="middle" dominantBaseline="central">Plan</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="40" y="141" textAnchor="middle" dominantBaseline="central">goal decompose</text>

                  {/* Connectors */}
                  <path d="M184 64 L260 112" fill="none" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ag)"/>
                  <path d="M268 160 L238 190" fill="none" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ag)"/>
                  <path d="M188 220 L132 220" fill="none" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ag)"/>
                  <path d="M72 196 L54 160" fill="none" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ag)"/>
                  <path d="M58 106 L136 62" fill="none" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ag)"/>

                  {/* Core Label */}
                  <circle cx="160" cy="130" r="28" fill="rgba(124,58,237,.04)" stroke="rgba(124,58,237,.15)" strokeWidth="1" strokeDasharray="3 4"/>
                  <text fontFamily="monospace" fontSize="9" fontWeight="600" fill="#0f172a" x="160" y="126" textAnchor="middle" dominantBaseline="central">AGENT</text>
                  <text fontFamily="monospace" fontSize="9" fontWeight="600" fill="#0f172a" x="160" y="138" textAnchor="middle" dominantBaseline="central">CORE</text>
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Autonomous Execution</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">100%</span>
              <span className="stat-label">Auditable Actions</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Multi</span>
              <span className="stat-label">Agent Orchestration</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">ReAct</span>
              <span className="stat-label">Reasoning Engine</span>
            </div>
          </div>
        </div>

        <div className="skx-divider"></div>

        {/* CORE CAPABILITIES */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Core Capabilities</p>
                <h2 className="skx-h2">Beyond chatbots.<br /><strong>Real cognitive systems.</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.7', textAlign: 'right'}}>
                Agents that reason, plan, act, and self-correct - autonomously completing multi-step enterprise workflows.
              </p>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} data-three>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🧠</div>
                <div className="feat-title">Advanced Reasoning</div>
                <div className="feat-desc">Agents break down goals into structured execution plans and continuously evaluate outcomes before taking the next action.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔧</div>
                <div className="feat-title">Tool Use</div>
                <div className="feat-desc">Connect APIs, CRMs, databases, search engines, code execution environments, and internal systems seamlessly.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🛡️</div>
                <div className="feat-title">Enterprise Guardrails</div>
                <div className="feat-desc">Approval flows, permission boundaries, audit logging, and compliance-ready governance built directly into execution.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🤝</div>
                <div className="feat-title">Multi-Agent Systems</div>
                <div className="feat-desc">Supervisor agents coordinate specialist agents working in parallel across research, planning, execution, and review.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📚</div>
                <div className="feat-title">Persistent Memory</div>
                <div className="feat-desc">Maintain long-term business context and continuously improve with every interaction and completed workflow.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📈</div>
                <div className="feat-title">Self-Correction</div>
                <div className="feat-desc">Detect failures, retry intelligently, escalate when required, and adapt dynamically to changing environments.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Deployments</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>Enterprise agent <strong>use cases</strong></h2>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} data-two>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🔬</div>
                <div>
                  <div className="use-title">Research Agents</div>
                  <div className="use-desc">Continuously gather intelligence from the web, internal knowledge bases, APIs, and reports to generate structured insights automatically.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">💼</div>
                <div>
                  <div className="use-title">Sales Agents</div>
                  <div className="use-desc">Prospect research, outreach generation, CRM updates, meeting scheduling, and follow-up workflows running autonomously.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">⚙️</div>
                <div>
                  <div className="use-title">DevOps Agents</div>
                  <div className="use-desc">Monitor infrastructure, diagnose failures, execute remediation playbooks, and escalate incidents with full observability.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">📑</div>
                <div>
                  <div className="use-title">Compliance Agents</div>
                  <div className="use-desc">Audit systems continuously, detect violations, generate reports, and maintain enterprise governance automatically.</div>
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
                <p className="skx-label" style={{marginBottom: '16px'}}>Business Outcomes</p>
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>AI workers that <strong>actually deliver</strong></h2>
                
                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">10&times; operational throughput</div>
                      <div className="benefit-desc">Execute research, coordination, and analysis workflows at machine scale without expanding headcount.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">24/7 autonomous execution</div>
                      <div className="benefit-desc">Agents continue working across timezones, weekends, and peak operational hours without interruption.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Enterprise-safe deployment</div>
                      <div className="benefit-desc">Human approval gates, logging, and role-based controls ensure complete governance and accountability.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Custom Module Card */}
              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <div style={{fontSize: '3rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-.04em', lineHeight: '1'}}>$500<span style={{fontSize: '1rem', fontWeight: '500', color: '#94a3b8'}}>/mo</span></div>
                <p style={{fontSize: '12px', color: '#64748b', margin: '8px 0 28px', fontWeight: '500'}}>as an add-on · ₹41,600/month</p>
                
                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Multi-step reasoning engine</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Tool integrations included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Audit trail &amp; observability</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Multi-agent orchestration</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Human approval workflows</span>
                  </div>
                </div>
                
                <button className="btn-primary mt-6" onClick={() => openModal('demo')} style={{width: '100%', justifyContent: 'center'}}>Start Building &rarr;</button>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(124,58,237,.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Start Today</p>
            <h2 className="skx-h2" style={{marginBottom: '16px'}}>Your first AI agent<br /><strong>can go live in days</strong></h2>
            <p style={{fontSize: '14px', color: '#64748b', marginBottom: '40px'}}>Start with a focused workflow. Scale into a complete fleet of autonomous AI workers.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
              <button className="btn-primary" onClick={() => openModal('demo')}>Deploy Your Agent</button>
              <Link to="/#services" className="btn-ghost">&larr; Back to Services</Link>
            </div>
          </div>
        </section>
        
      </div>
    </>
  )
}