import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function IDP() {
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
          background: linear-gradient(135deg, #06b6d4 0%, #2563eb 50%, #7c3aed 100%);
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
          margin-bottom: 20px;
          color: #475569;
          transition: all 0.3s ease;
        }
        .feat-card:hover .feat-icon {
          background: rgba(6, 182, 212, 0.04);
          border-color: rgba(6, 182, 212, 0.1);
          color: #0891b2;
        }
        .feat-title { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 10px; letter-spacing: -0.01em; }
        .feat-desc  { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* Interactive Pipeline Panel */
        .pipeline {
          display: grid;
          grid-template-columns: 1fr 32px 1fr 32px 1fr 32px 1fr 32px 1fr;
          align-items: center;
          gap: 0;
        }
        .pipe-step-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px 20px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pipe-step-card:hover { 
          border-color: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.04);
        }
        .pipe-step-num {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 600;
          font-family: monospace;
          margin-bottom: 12px;
          display: block;
        }
        .pipe-step-icon {
          font-size: 22px;
          margin-bottom: 12px;
          display: block;
        }
        .pipe-step-name { font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
        .pipe-step-sub  { font-size: 11px; color: #64748b; line-height: 1.5; font-weight: 500; }
        .pipe-arrow     { color: #cbd5e1; font-size: 18px; text-align: center; font-weight: 600; }

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
        .use-title { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 10px; letter-spacing: -0.01em; }
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
          background: rgba(6, 182, 212, 0.06);
          border: 1px solid rgba(6, 182, 212, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          color: #0891b2; font-size: 12px; font-weight: 700;
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
        .price-amount {
          font-size: 3rem; font-weight: 700;
          color: #0f172a; letter-spacing: -0.04em;
          line-height: 1;
        }
        .price-period { font-size: 1rem; font-weight: 500; color: #94a3b8; }
        .price-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: #475569;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .price-feature:last-of-type { border-bottom: none; margin-bottom: 28px; }
        .price-check {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(6, 182, 212, 0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #0891b2; font-size: 10px; font-weight: 700;
        }

        /* Accuracy Metrics Interface */
        .accuracy-bar-wrap {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
        }
        .acc-row {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 20px;
        }
        .acc-row:last-child { margin-bottom: 0; }
        .acc-label { font-size: 13px; font-weight: 500; color: #475569; min-width: 130px; }
        .acc-track {
          flex: 1; height: 4px;
          background: #f1f5f9;
          border-radius: 99px;
          overflow: hidden;
        }
        .acc-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #06b6d4, #2563eb);
        }
        .acc-val { font-size: 13px; color: #0891b2; min-width: 44px; text-align: right; font-weight: 600; }

        /* Simultaneous Scroll Transitions Keyframes Hook */
        .saas-reveal-node {
          view-timeline-name: --itemReveal;
          view-timeline-axis: block;
          animation-name: saasReveal;
          animation-fill-mode: both;
          animation-timeline: --itemReveal;
          animation-range: entry 5% cover 35%;
        }

        /* Call To Action Panels */
        .cta-box {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          padding: 64px 32px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
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
          .pipeline { grid-template-columns: 1fr; gap: 16px; }
          .pipe-arrow { transform: rotate(90deg); margin: 4px 0; }
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
          <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse at 50% 0%,rgba(8,145,178,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>

          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div className="hero-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}}>

              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>
                  Intelligent<br />
                  <em>Document<br />Processing</em>
                </h1>
                <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>
                  Extract, classify, and act on unstructured data with 99.4% accuracy. Turn any document - invoice, contract, medical record, or email - into structured, actionable data in milliseconds.
                </p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &rarr;</button>
                  <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
                </div>
              </div>

              {/* Accuracy Meter Panel */}
              <div className="accuracy-bar-wrap saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '24px'}}>Extraction Accuracy</p>
                <div className="acc-row">
                  <span className="acc-label">Invoices</span>
                  <div className="acc-track"><div className="acc-fill" style={{width: '99.6%'}}></div></div>
                  <span className="acc-val">99.6%</span>
                </div>
                <div className="acc-row">
                  <span className="acc-label">Contracts</span>
                  <div className="acc-track"><div className="acc-fill" style={{width: '99.2%'}}></div></div>
                  <span className="acc-val">99.2%</span>
                </div>
                <div className="acc-row">
                  <span className="acc-label">Medical records</span>
                  <div className="acc-track"><div className="acc-fill" style={{width: '98.8%'}}></div></div>
                  <span className="acc-val">98.8%</span>
                </div>
                <div className="acc-row">
                  <span className="acc-label">Handwritten forms</span>
                  <div className="acc-track"><div className="acc-fill" style={{width: '97.4%'}}></div></div>
                  <span className="acc-val">97.4%</span>
                </div>
                <div className="acc-row">
                  <span className="acc-label">Scanned PDFs</span>
                  <div className="acc-track"><div className="acc-fill" style={{width: '99.1%'}}></div></div>
                  <span className="acc-val">99.1%</span>
                </div>
                <div style={{marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifySpaceBetween: 'space-between', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '11px', color: '#94a3b8', fontLetters: '0.1em', fontWeight: '700'}}>OVERALL AVERAGE</span>
                  <span style={{fontSize: '1.5rem', fontWeight: '700', color: '#0891b2', letterSpacing: '-0.03em'}}>99.4%</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">99.4%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">85%</span>
              <span className="stat-label">Cost Reduction</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">50+</span>
              <span className="stat-label">Doc Types</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">$0.002</span>
              <span className="stat-label">Per Document</span>
            </div>
          </div>
        </div>

        <div className="skx-divider"></div>

        {/* PIPELINE ARCHITECTURE */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start', marginBottom: '48px'}} className="outcome-grid">
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>How It Works</p>
                <h2 className="skx-h2">Inbox to insight <strong>in milliseconds</strong></h2>
              </div>
              <p style={{fontSize: '14px', color: '#64748b', lineHeight: '1.6', alignSelf: 'end'}}>
                A five-stage pipeline handles every document: ingestion from any source &rarr; automatic classification &rarr; entity extraction &rarr; confidence validation &rarr; downstream export to your existing stack.
              </p>
            </div>

            <div className="pipeline">
              <div className="pipe-step-card saas-reveal-node">
                <span className="pipe-step-num">01</span>
                <span className="pipe-step-icon">📥</span>
                <div className="pipe-step-name">Ingest</div>
                <div className="pipe-step-sub">Email · S3 · API · SFTP</div>
              </div>
              <div className="pipe-arrow">&rsaquo;</div>
              <div className="pipe-step-card saas-reveal-node">
                <span className="pipe-step-num">02</span>
                <span className="pipe-step-icon">🔬</span>
                <div className="pipe-step-name">Classify</div>
                <div className="pipe-step-sub">Type detection · ML + rules</div>
              </div>
              <div className="pipe-arrow">&rsaquo;</div>
              <div className="pipe-step-card saas-reveal-node">
                <span className="pipe-step-num">03</span>
                <span className="pipe-step-icon">🧲</span>
                <div className="pipe-step-name">Extract</div>
                <div className="pipe-step-sub">Fields · entities · tables</div>
              </div>
              <div className="pipe-arrow">&rsaquo;</div>
              <div className="pipe-step-card saas-reveal-node">
                <span className="pipe-step-num">04</span>
                <span className="pipe-step-icon">✅</span>
                <div className="pipe-step-name">Validate</div>
                <div className="pipe-step-sub">Confidence scoring · review</div>
              </div>
              <div className="pipe-arrow">&rsaquo;</div>
              <div className="pipe-step-card saas-reveal-node">
                <span className="pipe-step-num">05</span>
                <span className="pipe-step-icon">🚀</span>
                <div className="pipe-step-name">Export</div>
                <div className="pipe-step-sub">ERP · CRM · webhooks</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* CORE CAPABILITIES */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Capabilities</p>
                <h2 className="skx-h2">The most accurate IDP<br /><strong>on the market</strong></h2>
              </div>
              <p style={{fontSize: '14px', color: '#64748b', maxWidth: '340px', lineHeight: '1.6'}}>
                Multi-model ensemble handles every document format with enterprise-grade precision.
              </p>
            </div>

            <div className="feat-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}}>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🗂️</div>
                <div className="feat-title">Universal Document Support</div>
                <div className="feat-desc">Invoices, purchase orders, contracts, medical records, financial statements, emails - PDF, Word, scanned images, all handled.</div>
              </div>

              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🏷️</div>
                <div className="feat-title">Auto-Classification</div>
                <div className="feat-desc">Documents are automatically categorized on ingestion. No manual tagging. Rules-based and ML classification working in tandem.</div>
              </div>

              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔍</div>
                <div className="feat-title">Entity Extraction</div>
                <div className="feat-desc">Pulls structured fields - amounts, dates, vendor names, account numbers, signatures - with configurable confidence thresholds.</div>
              </div>

              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🛡️</div>
                <div className="feat-title">Compliance-Ready</div>
                <div className="feat-desc">HIPAA, SOX, and GDPR-compliant pipelines with PII redaction, encrypted storage, and full audit trails for every document.</div>
              </div>

              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">⚡</div>
                <div className="feat-title">Real-Time Processing</div>
                <div className="feat-desc">Sub-second extraction on standard documents. Batch processing for high-volume ingestion. Both synchronous and async APIs.</div>
              </div>

              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔗</div>
                <div className="feat-title">ERP & CRM Push</div>
                <div className="feat-desc">Extracted data flows directly into SAP, Oracle, Salesforce, or any downstream system via webhooks and native connectors.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Industry Applications</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>IDP across <strong>verticals</strong></h2>

            <div className="use-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏦</div>
                <div>
                  <div className="use-title">Banking & Insurance</div>
                  <div className="use-desc">Automate claims processing, KYC document verification, mortgage applications, and audit report generation with sub-1% error rates.</div>
                </div>
              </div>

              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏥</div>
                <div>
                  <div className="use-title">Healthcare</div>
                  <div className="use-desc">Extract data from clinical notes, lab reports, and insurance EOBs. HIPAA-compliant with full audit log and PII masking.</div>
                </div>
              </div>

              <div className="use-card saas-reveal-node">
                <div className="use-icon">⚖️</div>
                <div>
                  <div className="use-title">Legal</div>
                  <div className="use-desc">Contract clause extraction, due diligence packages, and eDiscovery at scale. Reduce review time from hours to minutes.</div>
                </div>
              </div>

              <div className="use-card saas-reveal-node">
                <div className="use-icon">🛒</div>
                <div>
                  <div className="use-title">Retail & Logistics</div>
                  <div className="use-desc">Invoice reconciliation, purchase order matching, and shipping manifest processing - fully automated with ERP push.</div>
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
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>Measurable <strong>business impact</strong></h2>

                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">85% reduction in processing cost</div>
                      <div className="benefit-desc">Replace manual data entry teams with an automated pipeline that runs 24/7 at a fraction of the cost.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">10× throughput on document volumes</div>
                      <div className="benefit-desc">Process millions of documents per month without adding headcount or infrastructure overhead.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Full compliance and auditability</div>
                      <div className="benefit-desc">Every extraction logged, versioned, and reviewable. Built for SOX, HIPAA, and GDPR environments.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <div className="price-amount">$0.002<span className="price-period"> / doc</span></div>
                <p style={{fontSize: '12px', color: '#64748b', margin: '8px 0 28px', fontWeight: '500'}}>₹0.17/doc · min 10,000 docs/month</p>

                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>All document types included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Bulk pricing available</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>HIPAA, SOX, GDPR compliant</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>SLA-backed accuracy guarantee</span>
                  </div>
                </div>

                <button className="btn-primary mt-6" style={{width: '100%', justifyContent: 'center'}}>Start Processing Documents &rarr;</button>
                <p style={{textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#94a3b8', letterSpacing: '0.08em', fontWeight: '700'}}>FIRST 1,000 DOCUMENTS FREE</p>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(8,145,178,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div className="cta-box saas-reveal-node" style={{boxShadow: 'none', background: 'transparent', border: 'none', padding: '0'}}>
              <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
              <h2 className="skx-h2" style={{marginBottom: '16px'}}>Stop paying for<br /><strong>manual data entry</strong></h2>
              <p style={{fontSize: '14px', color: '#64748b', marginBottom: '40px'}}>
                Deploy in 14 days. Process your first 1,000 documents free.
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
                <button className="btn-primary" onClick={() => openModal('demo')}>Get Free Trial</button>
                <Link to="/#services" className="btn-ghost">&larr; Back to All Services</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}