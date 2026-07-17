import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Predictive() {
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
          color: #059669;
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
          background: linear-gradient(135deg, #0891b2 0%, #059669 100%);
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

        /* SaaS Bento Grid Layout */
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
          color: #059669;
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
          background: rgba(16, 185, 129, 0.04);
          border-color: rgba(16, 185, 129, 0.1);
          color: #059669;
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
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          color: #059669; font-size: 12px; font-weight: 700;
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
          background: rgba(16, 185, 129, 0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #059669; font-size: 10px; font-weight: 700;
        }

        /* Continuous Scroll Transitions Keyframes Hook */
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
          background: #059669;
          color: #ffffff; font-weight: 600; font-size: 14px;
          border-radius: 12px; letter-spacing: -0.01em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer; border: none; text-decoration: none;
          box-shadow: 0 4px 12px rgba(5,150,105,0.15);
        }
        .btn-primary:hover { background: #047857; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(5,150,105,0.25); }
        
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

        {/* HERO */}
        <section style={{padding: '140px 0 80px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse at 50% 0%,rgba(16,185,129,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}} className="outcome-grid">
              
              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>Predictive AI<br /><em>&amp; Forecasting</em></h1>
                <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>Forecast demand, detect anomalies, and surface insights before they become problems. Production-grade ML pipelines with 94% forecast accuracy and explainable predictions your team can act on.</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}><button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &rarr;</button><Link to="/#services" className="btn-ghost">&larr; All Services</Link></div>
              </div>

              {/* Forecast Chart Visual Component */}
              <div style={{background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '36px 32px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02)'}} className="saas-reveal-node">
                <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '2px', background: 'linear-gradient(90deg,transparent,rgba(16,185,129,0.3),transparent)'}}></div>
                <p className="skx-label" style={{marginBottom: '20px'}}>Forecast accuracy · 94%</p>
                <svg width="100%" viewBox="0 0 320 180" role="img" aria-label="Forecast chart showing actual vs predicted values">
                  <line x1="30" y1="20"  x2="310" y2="20"  stroke="#e2e8f0" strokeWidth="0.5"/>
                  <line x1="30" y1="60"  x2="310" y2="60"  stroke="#e2e8f0" strokeWidth="0.5"/>
                  <line x1="30" y1="100" x2="310" y2="100" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <line x1="30" y1="140" x2="310" y2="140" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#94a3b8" x="26" y="22" textAnchor="end">100</text>
                  <text fontFamily="monospace" fontSize="8" fill="#94a3b8" x="26" y="62" textAnchor="end">75</text>
                  <text fontFamily="monospace" fontSize="8" fill="#94a3b8" x="26" y="102" textAnchor="end">50</text>
                  <text fontFamily="monospace" fontSize="8" fill="#94a3b8" x="26" y="142" textAnchor="end">25</text>
                  <polygon points="195,55 220,48 245,38 270,32 295,26 310,22 310,42 295,48 270,54 245,64 220,74 195,80" fill="rgba(16,185,129,0.05)" stroke="none"/>
                  <polyline points="30,120 55,110 80,105 105,95 130,88 155,92 180,80 195,72" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="195,72 220,62 245,52 270,44 295,36 310,30" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="195" y1="16" x2="195" y2="148" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="3 4"/>
                  <text fontFamily="monospace" fontSize="7" fill="#64748b" x="170" y="155" textAnchor="middle">HISTORICAL</text>
                  <text fontFamily="monospace" fontSize="7" fill="#064e3b" x="255" y="155" textAnchor="middle">FORECAST</text>
                  <circle cx="130" cy="88" r="5" fill="rgba(225,29,72,0.1)" stroke="rgba(225,29,72,0.5)" strokeWidth="0.8"/>
                  <text fontFamily="monospace" fontSize="7" fill="#9f1239" x="130" y="78" textAnchor="middle">anomaly</text>
                  <line x1="30" y1="168" x2="50" y2="168" stroke="#0891b2" strokeWidth="1.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#475569" x="54" y="172" dominantBaseline="central">Actual</text>
                  <line x1="100" y1="168" x2="120" y2="168" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2"/>
                  <text fontFamily="monospace" fontSize="8" fill="#064e3b" x="124" y="172" dominantBaseline="central">Forecast</text>
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">94%</span>
              <span className="stat-label">Forecast Accuracy</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Early</span>
              <span className="stat-label">Anomaly Detection</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Real-Time</span>
              <span className="stat-label">Model Inference</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">XAI</span>
              <span className="stat-label">Explainable Outputs</span>
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
                <h2 className="skx-h2">Predict the future.<br /><strong>Act on it now.</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.7', textAlign: 'right'}}>
                Enterprise forecasting on battle-tested ML architectures with the explainability your stakeholders demand.
              </p>
            </div>

            <div className="feat-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}}>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📅</div>
                <div className="feat-title">Time-Series Forecasting</div>
                <div className="feat-desc">Multi-variate forecasting with automated model selection. Handles seasonality, trend, and external regressors. Ensemble models for maximum accuracy.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🚨</div>
                <div className="feat-title">Anomaly Detection</div>
                <div className="feat-desc">Unsupervised and semi-supervised detection of outliers in operational, financial, and sensor data. Configurable sensitivity with low false-positive rates.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📦</div>
                <div className="feat-title">Demand Planning</div>
                <div className="feat-desc">SKU-level demand forecasting with ERP integration. Factor in promotions, seasonality, macroeconomics, and supply constraints automatically.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔩</div>
                <div className="feat-title">Custom ML Pipelines</div>
                <div className="feat-desc">End-to-end pipelines covering data ingestion, feature engineering, model training, validation, and deployment. Fully managed and monitored.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">💡</div>
                <div className="feat-title">Explainable AI Dashboards</div>
                <div className="feat-desc">SHAP and LIME-powered explanations show exactly which features drove each prediction. Build trust with stakeholders who need to understand model reasoning.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔄</div>
                <div className="feat-title">Continuous Retraining</div>
                <div className="feat-desc">Models automatically retrain on new data with drift detection. Performance benchmarked continuously - your forecasts stay accurate as your business evolves.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Applications</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>What businesses <strong>are forecasting</strong></h2>

            <div className="use-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏭</div>
                <div>
                  <div className="use-title">Predictive Maintenance</div>
                  <div className="use-desc">Predict equipment failure 48–72 hours in advance using sensor data. Reduce unplanned downtime by up to 45% and cut maintenance costs significantly.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">💳</div>
                <div>
                  <div className="use-title">Financial Forecasting</div>
                  <div className="use-desc">Revenue forecasting, churn prediction, credit risk scoring, and fraud probability - all running in real-time against your financial data.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🛒</div>
                <div>
                  <div className="use-title">Retail Demand Planning</div>
                  <div className="use-desc">Reduce overstock and stockouts with AI demand forecasting that accounts for promotions, weather, local events, and historical patterns.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🏥</div>
                <div>
                  <div className="use-title">Healthcare Outcomes</div>
                  <div className="use-desc">Patient readmission risk, bed occupancy forecasting, and supply chain demand prediction to optimise resource allocation across care facilities.</div>
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
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>From reactive to <strong>proactive operations</strong></h2>
                
                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">94% average forecast accuracy</div>
                      <div className="benefit-desc">Validated across production deployments across industries. Ensemble models consistently outperform single-model baselines.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Detect problems before they happen</div>
                      <div className="benefit-desc">Early warning systems surface anomalies and risk signals hours or days before they escalate - giving teams time to act.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Decisions your CFO will trust</div>
                      <div className="benefit-desc">Explainable outputs with confidence intervals. Not black-box predictions - clear reasoning your leadership team can act on with confidence.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <p style={{fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-.03em', marginBottom: '8px'}}>Custom pricing</p>
                <p style={{fontSize: '13px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6'}}>Scoped to your data volumes and model complexity.</p>
                
                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Custom ML pipeline build</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Managed retraining infrastructure</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Explainability dashboards</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Dedicated data science support</span>
                  </div>
                </div>
                
                <button className="btn-primary mt-6" onClick={() => openModal('demo')} style={{width: '100%', justifyContent: 'center'}}>Contact Sales &rarr;</button>
                
                <div style={{marginTop: '16px', padding: '14px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '10px', textAlign: 'center'}}>
                  <p style={{fontSize: '10px', color: '#064e3b', letterSpacing: '.08em', fontWeight: '700'}}>FIRST MODEL LIVE IN 4 WEEKS</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(16,185,129,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
            <h2 className="skx-h2" style={{marginBottom: '16px'}}>Stop reacting.<br /><strong>Start predicting.</strong></h2>
            <p style={{fontSize: '14px', color: '#64748b', marginBottom: '40px'}}>Your first forecast model can be live in under 4 weeks.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
              <button className="btn-primary" onClick={() => openModal('demo')}>Get Started</button>
              <Link to="/#services" className="btn-ghost">&larr; Back to Services</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}