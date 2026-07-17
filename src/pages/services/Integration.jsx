import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Integration() {
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
          background: linear-gradient(135deg, #0891b2 0%, #0284c7 100%);
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

        /* SaaS Bento Grid */
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

        /* SaaS Feature Cards */
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
          background: rgba(14, 165, 233, 0.04);
          border-color: rgba(14, 165, 233, 0.1);
          color: #0ea5e9;
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
          background: rgba(14, 165, 233, 0.06);
          border: 1px solid rgba(14, 165, 233, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          color: #0ea5e9; font-size: 12px; font-weight: 700;
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
          background: rgba(14, 165, 233, 0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #0ea5e9; font-size: 10px; font-weight: 700;
        }

        /* Canvas Wrap */
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
          <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse at 50% 0%,rgba(14,165,233,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>

          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}} className="outcome-grid">
              
              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>AI Integration &amp;<br /><em>API Orchestration</em></h1>
                <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>Connect multiple AI models through a unified gateway with intelligent routing, cost optimisation, and failover logic. One integration point. Every model. Full observability.</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &rarr;</button>
                  <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
                </div>
              </div>

              {/* Gateway Architecture Diagram */}
              <div className="canvas-wrap saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '24px'}}>Gateway architecture</p>
                <svg width="100%" viewBox="0 0 340 220" role="img" aria-label="API gateway routing apps to multiple AI models">
                  {/* App nodes */}
                  <rect x="8" y="50" width="80" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="9" fill="#475569" x="48" y="65" textAnchor="middle" dominantBaseline="central">Web App</text>
                  <rect x="8" y="92" width="80" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="9" fill="#475569" x="48" y="107" textAnchor="middle" dominantBaseline="central">Mobile App</text>
                  <rect x="8" y="134" width="80" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="9" fill="#475569" x="48" y="149" textAnchor="middle" dominantBaseline="central">Internal API</text>

                  {/* Gateway box */}
                  <rect x="120" y="80" width="100" height="60" rx="10" fill="#ffffff" stroke="rgba(14,165,233,.3)" strokeWidth="0.8"/>
                  <rect x="120" y="80" width="100" height="3" rx="1.5" fill="rgba(14,165,233,.5)"/>
                  <text fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0369a1" x="170" y="103" textAnchor="middle" dominantBaseline="central">SkewX Gateway</text>
                  <text fontFamily="monospace" fontSize="8" fill="#475569" x="170" y="120" textAnchor="middle" dominantBaseline="central">Route · Guard · Log</text>

                  {/* Model pills */}
                  <rect x="252" y="40"  width="80" height="26" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#475569" x="292" y="53" textAnchor="middle" dominantBaseline="central">GPT-4o</text>
                  <rect x="252" y="76"  width="80" height="26" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#475569" x="292" y="89" textAnchor="middle" dominantBaseline="central">Claude</text>
                  <rect x="252" y="112" width="80" height="26" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#475569" x="292" y="125" textAnchor="middle" dominantBaseline="central">Fine-tuned</text>
                  <rect x="252" y="148" width="80" height="26" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#475569" x="292" y="161" textAnchor="middle" dominantBaseline="central">Open Source</text>
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Unified</span>
              <span className="stat-label">API Layer</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Multi</span>
              <span className="stat-label">Model Routing</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">40%</span>
              <span className="stat-label">Avg Cost Reduction</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">99.99%</span>
              <span className="stat-label">Uptime with Failover</span>
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
                <h2 className="skx-h2">One gateway.<br /><strong>Every model. Total control.</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.7', textAlign: 'right'}}>
                Stop managing API keys, rate limits, and retry logic for every AI provider. The SkewX Gateway abstracts all of it.
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} className="feat-grid">
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔀</div>
                <div className="feat-title">Intelligent Model Routing</div>
                <div className="feat-desc">Route requests to the best model for each task based on latency, cost budget, capability match, and current provider health - automatically.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">💰</div>
                <div className="feat-title">Cost & Latency Optimisation</div>
                <div className="feat-desc">Automatic model downgrading for simple requests, caching for repeated queries, and batch processing for non-urgent workloads. Cut AI spend by up to 40%.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔄</div>
                <div className="feat-title">Failover & Fallback</div>
                <div className="feat-desc">Automatic failover to backup providers when primary models are degraded or rate-limited. Configurable retry strategies with exponential backoff and circuit breakers.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📊</div>
                <div className="feat-title">Unified Observability</div>
                <div className="feat-desc">Real-time dashboards covering latency percentiles, token usage, cost-per-request, error rates, and model performance across every provider in your stack.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔐</div>
                <div className="feat-title">Enterprise SSO & Auth</div>
                <div className="feat-desc">OAuth 2.0, SAML, and API key management with per-team rate limiting, budget controls, and model access policies enforced at the gateway layer.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🧩</div>
                <div className="feat-title">Middleware & Transforms</div>
                <div className="feat-desc">Apply PII redaction, prompt guards, response filtering, and custom transformations inline without modifying application code. Fully configurable pipeline.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(14,165,233,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
            <h2 className="skx-h2" style={{marginBottom: '16px'}}>Unify your entire AI stack<br /><strong>in one day</strong></h2>
            <p style={{fontSize: '13px', color: '#64748b', marginBottom: '40px'}}>One API call. Every model. Zero infrastructure management.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
              <button className="btn-primary" onClick={() => openModal('demo')}>Get Free Sandbox Access</button>
              <Link to="/#services" className="btn-ghost">&larr; Back to Services</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}