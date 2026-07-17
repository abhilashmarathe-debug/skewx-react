import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Governance() {
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
          background: linear-gradient(135deg, #0891b2 0%, #e11d48 100%);
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
          background: rgba(225, 29, 72, 0.04);
          border-color: rgba(225, 29, 72, 0.1);
          color: #e11d48;
        }
        .feat-title { font-size: 16px; font-weight: 600; color: #0f172a; letter-spacing: -0.01em; }
        .feat-desc  { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* Regulation Cards */
        .reg-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reg-card:hover { border-color: #e2e8f0; transform: translateY(-4px); }
        .reg-title { font-size: 1.25rem; font-weight: 700; color: #0891b2; margin-bottom: 12px; }
        .reg-desc { font-size: 13px; color: #64748b; line-height: 1.7; }

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
          background: rgba(225, 29, 72, 0.06);
          border: 1px solid rgba(225, 29, 72, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          color: #e11d48; font-size: 12px; font-weight: 700;
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
          background: rgba(225, 29, 72, 0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #e11d48; font-size: 10px; font-weight: 700;
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
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="skx-page">

        {/* HERO SECTION */}
        <section style={{padding: '140px 0 80px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse at 50% 0%,rgba(225,29,72,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>

          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div className="max-w-4xl">
              <h1 className="skx-h1" style={{marginBottom: '28px'}}>AI Governance<br /><em>&amp; Compliance</em></h1>
              <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>
                Ensure your AI systems are explainable, fair, and regulation-ready. From GDPR to the EU AI Act, we build the governance infrastructure that keeps your AI deployments compliant and auditable.
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                <button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &rarr;</button>
                <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Audit</span>
              <span className="stat-label">Full Trail Infrastructure</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">XAI</span>
              <span className="stat-label">Explainability Built-In</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">GDPR</span>
              <span className="stat-label">EU AI Act Ready</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Red</span>
              <span className="stat-label">Team Testing Included</span>
            </div>
          </div>
        </div>

        <div className="skx-divider"></div>

        {/* CORE PLATFORM CAPABILITIES */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Governance Capabilities</p>
                <h2 className="skx-h2">AI you can trust.<br /><strong>Regulators can verify.</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.7', textAlign: 'right'}}>
                A complete governance layer - explainability, bias monitoring, regulatory mapping, and adversarial testing in one console.
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} className="feat-grid">
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">💡</div>
                <div className="feat-title">Model Explainability</div>
                <div className="feat-desc">SHAP values, LIME explanations, and decision trees for every AI prediction. Auto-generate human-readable reports for regulators, auditors, and stakeholders.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">⚖️</div>
                <div className="feat-title">Bias Detection & Mitigation</div>
                <div className="feat-desc">Continuous fairness monitoring across protected attributes. Detect disparate impact, demographic parity violations, and equalised odds drift in real time.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📋</div>
                <div className="feat-title">Regulatory Mapping</div>
                <div className="feat-desc">Automated gap analysis against GDPR, EU AI Act, CCPA, ISO 42001, and sector-specific frameworks. Know exactly which controls are needed for your AI risk level.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📜</div>
                <div className="feat-title">Complete Audit Logging</div>
                <div className="feat-desc">Immutable logs for every model inference, data access, prediction, and decision. Tamper-proof audit trails with cryptographic signing and retention management.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔴</div>
                <div className="feat-title">Red-Team Testing</div>
                <div className="feat-desc">Adversarial testing against prompt injection, jailbreaks, data extraction, and model inversion attacks. Identify vulnerabilities before hostile actors do.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📊</div>
                <div className="feat-title">Governance Dashboard</div>
                <div className="feat-desc">Unified console showing risk scores, compliance status, bias metrics, and audit trail summaries across all your AI systems. Board-ready reporting in one click.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* REGULATORY COVERAGE */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Regulatory Coverage</p>
                <h2 className="skx-h2">Every major framework.<br /><strong>One platform.</strong></h2>
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px'}} data-three>
              <div className="reg-card saas-reveal-node">
                <div className="reg-title">EU AI Act</div>
                <p className="reg-desc">Risk classification, conformity assessments, and technical documentation for high-risk AI systems. Full Article 9–15 coverage.</p>
              </div>
              <div className="reg-card saas-reveal-node">
                <div className="reg-title">GDPR</div>
                <p className="reg-desc">Data minimisation checks, consent tracking, right-to-explanation compliance, and automated DPIA generation for AI processing activities.</p>
              </div>
              <div className="reg-card saas-reveal-node">
                <div className="reg-title">ISO 42001</div>
                <p className="reg-desc">AI Management System implementation with gap analysis, policy templates, and audit readiness assessment against the global AI governance standard.</p>
              </div>
              <div className="reg-card saas-reveal-node">
                <div className="reg-title">NIST AI RMF</div>
                <p className="reg-desc">Govern, Map, Measure, and Manage functions implemented with automated evidence collection and risk scoring aligned to the NIST framework.</p>
              </div>
              <div className="reg-card saas-reveal-node">
                <div className="reg-title">CCPA / CPRA</div>
                <p className="reg-desc">Automated data subject rights management, opt-out tracking, and AI decision transparency disclosures for California privacy law compliance.</p>
              </div>
              <div className="reg-card saas-reveal-node">
                <div className="reg-title">Sector-Specific</div>
                <p className="reg-desc">Healthcare (HIPAA, FDA AI), financial services (SR 11-7, EBA), and HR AI regulations across jurisdictions - covered.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Deployments</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>Built for <strong>regulated industries</strong></h2>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}} className="use-grid">
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏦</div>
                <div>
                  <div className="use-title">Financial Services</div>
                  <div className="use-desc">Credit scoring models, trading algorithms, and fraud detection governed against SR 11-7, EBA guidelines, and EU AI Act obligations for high-risk financial AI.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏥</div>
                <div>
                  <div className="use-title">Healthcare</div>
                  <div className="use-desc">Clinical AI tools validated for bias, documented for FDA Software as a Medical Device pathways, and compliant with HIPAA technical safeguards throughout the AI lifecycle.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏛️</div>
                <div>
                  <div className="use-title">Public Sector</div>
                  <div className="use-desc">Government AI systems governed for algorithmic transparency, public interest justification, and democratic accountability - built to withstand FOI and parliamentary scrutiny.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">👥</div>
                <div>
                  <div className="use-title">HR & Hiring AI</div>
                  <div className="use-desc">CV screening and workforce analytics tools assessed for demographic bias, compliant with NYC Local Law 144, Illinois AEIA, and emerging global hiring AI regulations.</div>
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
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>What good governance <strong>delivers</strong></h2>

                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Regulatory confidence without the manual work</div>
                      <div className="benefit-desc">Automated evidence collection and compliance documentation replaces weeks of manual preparation for audits and regulatory submissions.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Catch bias before it causes harm</div>
                      <div className="benefit-desc">Continuous fairness monitoring detects model drift and disparate impact in production before it reaches a regulatory investigation or public incident.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Board-level AI risk visibility</div>
                      <div className="benefit-desc">Executive dashboards give your C-suite and board real-time visibility into AI risk posture without requiring technical understanding of underlying models.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Custom Module Card */}
              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <p style={{fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-.03em', marginBottom: '8px'}}>Custom pricing</p>
                <p style={{fontSize: '13px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6'}}>Based on number of AI systems, regulatory scope, and team size.</p>
                
                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>All major frameworks covered</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Governance dashboard included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Red-team testing available</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Regulatory advisory support</span>
                  </div>
                </div>
                
                <button className="btn-primary mt-6" onClick={() => openModal('demo')} style={{width: '100%', justifyContent: 'center'}}>Contact Sales &rarr;</button>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(225,29,72,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
            <h2 className="skx-h2" style={{marginBottom: '16px'}}>Govern your AI<br /><strong>before regulators do</strong></h2>
            <p style={{fontSize: '14px', color: '#64748b', marginBottom: '40px'}}>Proactive governance is 10&times; cheaper than reactive compliance. Start with a free AI risk assessment.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
              <button className="btn-primary" onClick={() => openModal('demo')}>Get Free Risk Assessment</button>
              <Link to="/#services" className="btn-ghost">&larr; Back to Services</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}