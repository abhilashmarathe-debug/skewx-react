import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Vision() {
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
          color: #7c3aed;
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
          background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
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
          color: #7c3aed;
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

        /* Feature Cards */
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

        /* Use Card */
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

        /* Benefit rows */
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

        /* Canvas Workspace Wrapper */
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

        /* Animations */
        .saas-reveal-node {
          view-timeline-name: --itemReveal;
          view-timeline-axis: block;
          animation-name: saasReveal;
          animation-fill-mode: both;
          animation-timeline: --itemReveal;
          animation-range: entry 5% cover 35%;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: #7c3aed;
          color: #ffffff; font-weight: 600; font-size: 14px;
          border-radius: 12px; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer; border: none; text-decoration: none;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
        }
        .btn-primary:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(124, 58, 237, 0.25); }
        
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
          <div style={{position: 'absolute', top: '0', right: '0', width: '600px', height: '500px', background: 'radial-gradient(ellipse at 80% 0%,rgba(124,58,237,0.05) 0%,transparent 65%)', pointerEvents: 'none'}}></div>

          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}} className="outcome-grid">
              
              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>Computer Vision<br /><em>&amp; Visual AI</em></h1>
                <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>Object detection, OCR, and quality inspection for real-world systems. Deploy visual intelligence at the edge, in the cloud, or embedded directly in your production line - with real-time inference speeds.</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &rarr;</button>
                  <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
                </div>
              </div>

              {/* Vision detection visual mockup */}
              <div className="canvas-wrap saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Real-time detection · 30fps</p>
                <svg width="100%" viewBox="0 0 320 220" role="img" aria-label="Computer vision detection showing bounding boxes on manufacturing parts">
                  <rect x="8" y="8" width="304" height="170" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8"/>
                  <line x1="8" y1="90" x2="312" y2="90" stroke="rgba(124,58,237,0.1)" strokeWidth="0.5" strokeDasharray="3 5"/>
                  
                  <rect x="28" y="28" width="80" height="60" rx="4" fill="rgba(22,163,74,0.04)" stroke="#16a34a" strokeWidth="1"/>
                  <rect x="28" y="28" width="80" height="14" rx="4" fill="rgba(22,163,74,0.15)"/>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="68" y="35" textAnchor="middle" dominantBaseline="central">PART A · OK</text>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="68" y="64" textAnchor="middle" dominantBaseline="central">conf: 99.2%</text>

                  <rect x="122" y="38" width="76" height="56" rx="4" fill="rgba(220,38,38,0.04)" stroke="#dc2626" strokeWidth="1"/>
                  <rect x="122" y="38" width="76" height="14" rx="4" fill="rgba(220,38,38,0.15)"/>
                  <text fontFamily="monospace" fontSize="7" fill="#dc2626" x="160" y="45" textAnchor="middle" dominantBaseline="central">DEFECT · FLAG</text>
                  <text fontFamily="monospace" fontSize="7" fill="#dc2626" x="160" y="72" textAnchor="middle" dominantBaseline="central">conf: 97.8%</text>

                  <rect x="212" y="24" width="84" height="64" rx="4" fill="rgba(22,163,74,0.04)" stroke="#16a34a" strokeWidth="1"/>
                  <rect x="212" y="24" width="84" height="14" rx="4" fill="rgba(22,163,74,0.12)"/>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="254" y="31" textAnchor="middle" dominantBaseline="central">PART C · OK</text>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="254" y="66" textAnchor="middle" dominantBaseline="central">conf: 98.5%</text>

                  <rect x="40" y="106" width="70" height="54" rx="4" fill="rgba(22,163,74,0.04)" stroke="#16a34a" strokeWidth="0.8"/>
                  <rect x="40" y="106" width="70" height="12" rx="4" fill="rgba(22,163,74,0.1)"/>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="75" y="112" textAnchor="middle" dominantBaseline="central">PART D · OK</text>

                  <rect x="130" y="112" width="66" height="48" rx="4" fill="rgba(22,163,74,0.04)" stroke="#16a34a" strokeWidth="0.8"/>
                  <rect x="130" y="112" width="66" height="12" rx="4" fill="rgba(22,163,74,0.08)"/>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="163" y="118" textAnchor="middle" dominantBaseline="central">PART E · OK</text>

                  <rect x="212" y="104" width="84" height="58" rx="4" fill="rgba(22,163,74,0.04)" stroke="#16a34a" strokeWidth="0.8"/>
                  <rect x="212" y="104" width="84" height="12" rx="4" fill="rgba(22,163,74,0.08)"/>
                  <text fontFamily="monospace" fontSize="7" fill="#166534" x="254" y="110" textAnchor="middle" dominantBaseline="central">PART F · OK</text>

                  <rect x="8" y="178" width="304" height="30" rx="0" fill="#f8fafc"/>
                  <rect x="8" y="178" width="304" height="1" fill="#e2e8f0"/>
                  <text fontFamily="monospace" fontSize="7" fill="#64748b" x="20" y="194" dominant-baseline="central">FRAME 4821</text>
                  <text fontFamily="monospace" fontSize="7" fill="#0f172a" x="160" y="194" textAnchor="middle" dominant-baseline="central">1 DEFECT DETECTED · LANE 2 ALERT SENT</text>
                  <text fontFamily="monospace" fontSize="7" fill="#64748b" x="300" y="194" textAnchor="end" dominant-baseline="central">30fps</text>
                </svg>
                <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
                  <span style={{fontFamily: 'monospace', fontSize: '10px', color: '#166534', padding: '5px 10px', background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.15)', borderRadius: '5px'}}>5 OK</span>
                  <span style={{fontFamily: 'monospace', fontSize: '10px', color: '#9f1239', padding: '5px 10px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '5px'}}>1 DEFECT</span>
                  <span style={{fontFamily: 'monospace', fontSize: '10px', color: '#64748b', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '5px', marginLeft: 'auto'}}>Edge · NVIDIA Jetson</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Real-Time</span>
              <span className="stat-label">Detection</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">OCR</span>
              <span className="stat-label">Handwritten &amp; Printed</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Edge</span>
              <span className="stat-label">Deployable Models</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">30fps</span>
              <span className="stat-label">Video Stream Analysis</span>
            </div>
          </div>
        </div>

        <div className="skx-divider"></div>

        {/* CORE CAPABILITIES */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Vision Capabilities</p>
                <h2 className="skx-h2">See what <strong>others miss</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.7', textAlign: 'right'}}>
                Production-grade vision models trained on your data, deployed where you need them - cloud, on-premise, or at the edge.
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} className="feat-grid">
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🎯</div>
                <div className="feat-title">Object & Defect Detection</div>
                <div className="feat-desc">Real-time detection and classification of objects, anomalies, and defects in images and video streams. Fine-tuned on your production data for domain-specific accuracy.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📝</div>
                <div className="feat-title">Advanced OCR</div>
                <div className="feat-desc">Extract text from scanned documents, handwritten forms, ID cards, receipts, and complex layouts. Supports 80+ languages with structured field extraction.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🏭</div>
                <div className="feat-title">Quality Inspection Automation</div>
                <div className="feat-desc">Replace manual visual inspection on production lines with AI that detects defects at speeds and accuracy humans cannot match. Reduces quality escapes to near zero.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📹</div>
                <div className="feat-title">Video Stream Analysis</div>
                <div className="feat-desc">Analyse CCTV, drone, and industrial camera feeds in real time. Detect events, count objects, track movement, and trigger alerts without manual monitoring.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📟</div>
                <div className="feat-title">Edge-Deployable Models</div>
                <div className="feat-desc">Optimised models that run on NVIDIA Jetson, Raspberry Pi, and industrial PLCs. Inference at the source with no cloud latency and full offline capability.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔄</div>
                <div className="feat-title">Continuous Learning</div>
                <div className="feat-desc">Models improve automatically with new labelled examples from your production environment. Drift detection triggers retraining before accuracy degrades.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Applications</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>Visual AI <strong>across industries</strong></h2>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}} className="use-grid">
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏭</div>
                <div>
                  <div className="use-title">Manufacturing Quality Control</div>
                  <div className="use-desc">Detect surface defects, dimensional anomalies, and assembly errors on production lines at 30fps. Reduce quality escapes by up to 95% compared to manual inspection.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏥</div>
                <div>
                  <div className="use-title">Medical Imaging</div>
                  <div className="use-desc">AI-assisted analysis of X-rays, MRI scans, pathology slides, and dermatology images. Clinical decision support that highlights findings for radiologist review.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏪</div>
                <div>
                  <div className="use-title">Retail & Loss Prevention</div>
                  <div className="use-desc">Shelf compliance monitoring, planogram verification, people counting, and anomaly detection - all from existing CCTV infrastructure with no hardware changes.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏗️</div>
                <div>
                  <div className="use-title">Construction & Infrastructure</div>
                  <div className="use-desc">Safety compliance monitoring, progress tracking from drone footage, and structural defect detection. Reduce site incidents and accelerate project reporting.</div>
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
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>What visual AI <strong>delivers</strong></h2>

                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">10× faster inspection throughput</div>
                      <div className="benefit-desc">AI inspects 100% of production output continuously - no sampling, no fatigue, no missed defects during shift changes.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Sub-millisecond inference at the edge</div>
                      <div className="benefit-desc">Optimised models run directly on your hardware with no round-trip cloud latency. Critical for real-time production control systems.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Works with your existing cameras</div>
                      <div className="benefit-desc">No new hardware investment required in most cases. We integrate with your existing camera infrastructure via standard RTSP and ONVIF protocols.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <p style={{fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-.03em', marginBottom: '8px'}}>Custom pricing</p>
                <p style={{fontSize: '13px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6'}}>Scoped per camera, use case, and deployment environment.</p>
                
                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Custom model training included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Edge and cloud deployment</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Labelling service available</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Dedicated ML engineer support</span>
                  </div>
                </div>
                
                <button className="btn-primary mt-6" onClick={() => openModal('demo')} style={{width: '100%', justifyContent: 'center'}}>Contact Sales &rarr;</button>
                <div style={{marginTop: '16px', padding: '14px', background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.1)', borderRadius: '10px', textAlign: 'center'}}>
                  <p style={{fontFamily: 'monospace', fontSize: '10px', color: '#4c1d95', letterSpacing: '.08em', fontWeight: '700'}}>POC IN UNDER 2 WEEKS · EXISTING CAMERAS</p>
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
            <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
            <h2 className="skx-h2" style={{marginBottom: '16px'}}>Put AI eyes on<br /><strong>your operations</strong></h2>
            <p style={{fontSize: '13px', color: '#64748b', marginBottom: '40px'}}>Proof-of-concept deployable in under 2 weeks using your existing camera infrastructure.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
              <button className="btn-primary" onClick={() => openModal('demo')}>Book a Demo</button>
              <Link to="/#services" className="btn-ghost">&larr; Back to Services</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}