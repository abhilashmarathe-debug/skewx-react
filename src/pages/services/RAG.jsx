import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function RAG() {
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
          background: linear-gradient(135deg, #0891b2 0%, #2563eb 100%);
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
          background: rgba(37, 99, 235, 0.04);
          border-color: rgba(37, 99, 235, 0.1);
          color: #2563eb;
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
          background: rgba(37, 99, 235, 0.06);
          border: 1px solid rgba(37, 99, 235, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          color: #2563eb; font-size: 12px; font-weight: 700;
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
          background: rgba(37, 99, 235, 0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #2563eb; font-size: 10px; font-weight: 700;
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
          <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse at 50% 0%,rgba(37,99,235,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>

          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center'}} className="outcome-grid">
              
              <div>
                <h1 className="skx-h1" style={{marginBottom: '28px'}}>AI Search &amp;<br /><em>RAG Engine</em></h1>
                <p style={{fontSize: '16px', color: '#475569', lineHeight: '1.75', marginBottom: '40px', fontWeight: '400'}}>Search your private data with accurate, source-backed AI answers. Index any document repository, intranet, or knowledge base and give your team an AI assistant that cites every answer.</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn-primary" onClick={() => openModal('demo')}>Request a Demo &rarr;</button>
                  <Link to="/#services" className="btn-ghost">&larr; All Services</Link>
                </div>
              </div>

              {/* RAG pipeline visual component */}
              <div className="canvas-wrap saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>How RAG works</p>
                <svg width="100%" viewBox="0 0 320 230" role="img" aria-label="RAG pipeline: query goes to vector search, retrieves docs, LLM generates cited answer">
                  <defs>
                    <marker id="rg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M2 2L8 5L2 8" fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>
                  
                  {/* User query block */}
                  <rect x="8" y="16" width="90" height="34" rx="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="53" y="26" textAnchor="middle" dominantBaseline="central" letterSpacing=".06em">USER QUERY</text>
                  <text fontFamily="sans-serif" fontSize="10" fill="#0f172a" x="53" y="40" textAnchor="middle" dominantBaseline="central">"Show policy..."</text>

                  <line x1="98" y1="33" x2="118" y2="33" stroke="#cbd5e1" strokeWidth="0.7" markerEnd="url(#rg)"/>

                  {/* Vector search block */}
                  <rect x="120" y="16" width="90" height="34" rx="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5"/>
                  <rect x="120" y="16" width="90" height="3" rx="1.5" fill="rgba(37,99,235,0.3)"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="165" y="26" textAnchor="middle" dominantBaseline="central" letterSpacing=".06em">VECTOR SEARCH</text>
                  <text fontFamily="sans-serif" fontSize="10" fill="#0f172a" x="165" y="40" textAnchor="middle" dominantBaseline="central">Semantic + BM25</text>

                  <line x1="210" y1="33" x2="228" y2="33" stroke="#cbd5e1" strokeWidth="0.7" markerEnd="url(#rg)"/>

                  {/* Knowledge base storage block */}
                  <rect x="230" y="8" width="82" height="50" rx="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="271" y="22" textAnchor="middle" dominantBaseline="central" letterSpacing=".05em">KNOWLEDGE</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="271" y="34" textAnchor="middle" dominantBaseline="central">BASE</text>
                  <text fontFamily="sans-serif" fontSize="9" fill="#0f172a" x="271" y="47" textAnchor="middle" dominantBaseline="central">PDFs · Docs · Wiki</text>

                  {/* Arrow down from vector search */}
                  <line x1="165" y1="50" x2="165" y2="78" stroke="#cbd5e1" strokeWidth="0.7" markerEnd="url(#rg)"/>

                  {/* Retrieved document chunks block */}
                  <rect x="80" y="80" width="170" height="44" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="165" y="93" textAnchor="middle" dominantBaseline="central" letterSpacing=".06em">RETRIEVED CHUNKS</text>
                  <text fontFamily="sans-serif" fontSize="10" fill="#0f172a" x="165" y="110" textAnchor="middle" dominantBaseline="central">Top-k relevant passages · ranked</text>

                  <line x1="165" y1="124" x2="165" y2="148" stroke="#cbd5e1" strokeWidth="0.7" markerEnd="url(#rg)"/>

                  {/* LLM Inference synthesis block */}
                  <rect x="80" y="150" width="170" height="44" rx="8" fill="#ffffff" stroke="rgba(37,99,235,0.2)" strokeWidth="0.5"/>
                  <rect x="80" y="150" width="170" height="3" rx="1.5" fill="rgba(37,99,235,0.3)"/>
                  <text fontFamily="sans-serif" fontSize="12" fontWeight="600" fill="#0f172a" x="165" y="169" textAnchor="middle" dominantBaseline="central">LLM synthesis</text>
                  <text fontFamily="monospace" fontSize="8" fill="#64748b" x="165" y="185" textAnchor="middle" dominantBaseline="central">grounded · cited · accurate</text>

                  <line x1="165" y1="194" x2="165" y2="210" stroke="#cbd5e1" strokeWidth="0.7" markerEnd="url(#rg)"/>

                  {/* Answer block */}
                  <rect x="60" y="212" width="210" height="15" rx="4" fill="#f0f9ff" stroke="rgba(37,99,235,0.15)" strokeWidth="0.5"/>
                  <text fontFamily="monospace" fontSize="8" fill="#0f172a" x="165" y="220" textAnchor="middle" dominantBaseline="central">Answer with source citation [Doc 3, p.12]</text>
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS PLATFORM LEDGER */}
        <div className="skx-section" style={{paddingBottom: '80px'}}>
          <div className="stat-grid">
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Source</span>
              <span className="stat-label">Backed Every Answer</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Private</span>
              <span className="stat-label">Data Only, Never Shared</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">Multi</span>
              <span className="stat-label">Modal Retrieval</span>
            </div>
            <div className="stat-block saas-reveal-node">
              <span className="stat-num">RBAC</span>
              <span className="stat-label">Role-Based Access</span>
            </div>
          </div>
        </div>

        <div className="skx-divider"></div>

        {/* CORE PLATFORM CAPABILITIES */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px'}}>
              <div>
                <p className="skx-label" style={{marginBottom: '16px'}}>Engine Capabilities</p>
                <h2 className="skx-h2">Your company's knowledge,<br /><strong>instantly searchable.</strong></h2>
              </div>
              <p style={{fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.7', textAlign: 'right'}}>
                RAG built for enterprise - with the accuracy, security, and access control your organisation requires.
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} className="feat-grid">
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔢</div>
                <div className="feat-title">Vector &amp; Semantic Search</div>
                <div className="feat-desc">Hybrid retrieval combining dense vector embeddings with BM25 keyword search. Find conceptually related content even when exact terms differ.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">📂</div>
                <div className="feat-title">Universal Document Indexing</div>
                <div className="feat-desc">Index PDFs, Word docs, PowerPoints, spreadsheets, emails, Confluence pages, Notion databases, and Slack conversations - all in one engine.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🏷️</div>
                <div className="feat-title">Citations in Every Answer</div>
                <div className="feat-desc">Every AI-generated response links directly to the source document and exact passage. No hallucinations - every claim is verifiable.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🖼️</div>
                <div className="feat-title">Multi-Modal Retrieval</div>
                <div className="feat-desc">Retrieve across text, images, charts, and tables within documents. Ask questions about a diagram and get an answer grounded in the visual content.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔐</div>
                <div className="feat-title">Role-Based Access Control</div>
                <div className="feat-desc">Users only see answers from documents they have permission to access. Fine-grained RBAC synced with your existing SSO and directory services.</div>
              </div>
              <div className="feat-card saas-reveal-node">
                <div className="feat-icon">🔁</div>
                <div className="feat-title">Continuous Sync</div>
                <div className="feat-desc">Connectors keep your index current as documents change. New files indexed within minutes. Deleted files removed from the index automatically.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES VERTICAL GRID */}
        <section style={{padding: '80px 0'}}>
          <div className="skx-section">
            <p className="skx-label" style={{marginBottom: '16px'}}>Deployments</p>
            <h2 className="skx-h2" style={{marginBottom: '48px'}}>Who uses RAG <strong>and how</strong></h2>

            <div className="use-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🧑‍💼</div>
                <div>
                  <div className="use-title">Internal Knowledge Base</div>
                  <div className="use-desc">Replace your intranet search with an AI assistant that answers HR, IT, and policy questions instantly with source links. Onboard new hires in half the time.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">⚖️</div>
                <div>
                  <div className="use-title">Legal &amp; Compliance Q&amp;A</div>
                  <div className="use-desc">Lawyers query contracts, precedents, and regulatory filings in natural language. Cited answers with clause-level precision. Review time cut by 70%.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🛠️</div>
                <div>
                  <div className="use-title">Technical Support</div>
                  <div className="use-desc">Support agents and customers ask questions against product documentation, runbooks, and historical tickets. Resolution accuracy improves dramatically.</div>
                </div>
              </div>
              <div className="use-card saas-reveal-node">
                <div className="use-icon">🔬</div>
                <div>
                  <div className="use-title">Research &amp; Development</div>
                  <div className="use-desc">R&amp;D teams search across internal research papers, experiment logs, and competitor filings. Surface insights buried in thousands of documents instantly.</div>
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
                <h2 className="skx-h2" style={{marginBottom: '36px'}}>Knowledge that <strong>actually gets used</strong></h2>

                <div className="flex flex-col">
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">90% reduction in time-to-answer</div>
                      <div className="benefit-desc">Find any piece of information in your organisation in seconds rather than hours of manual searching.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Zero hallucinations</div>
                      <div className="benefit-desc">Every answer is grounded in your documents with direct citations. Your team can trust and verify every response.</div>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-arrow">&rsaquo;</div>
                    <div>
                      <div className="benefit-title">Your data stays private</div>
                      <div className="benefit-desc">Deployed in your cloud environment. No data leaves your perimeter. End-to-end encryption at rest and in transit.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Custom Module Card */}
              <div className="price-card saas-reveal-node">
                <p className="skx-label" style={{marginBottom: '20px'}}>Pricing</p>
                <p style={{fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-.03em', marginBottom: '8px'}}>Custom pricing</p>
                <p style={{fontSize: '13px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6'}}>Based on document volume and number of users.</p>
                
                <div className="flex flex-col">
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Unlimited queries included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>All connector types included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>SSO and RBAC included</span>
                  </div>
                  <div className="price-feature">
                    <div className="price-check">&#10003;</div>
                    <span>Private cloud deployment</span>
                  </div>
                </div>
                
                <button className="btn-primary mt-6" onClick={() => openModal('demo')} style={{width: '100%', justifyContent: 'center'}}>Contact Sales &rarr;</button>
                <p style={{textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#94a3b8', letterSpacing: '.08em', fontWeight: '700'}}>INDEX FIRST DATA SOURCE FREE</p>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <section style={{padding: '80px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(37,99,235,0.04) 0%,transparent 65%)', pointerEvents: 'none'}}></div>
          <div className="skx-section" style={{position: 'relative', zIndex: '1'}}>
            <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>Get Started</p>
            <h2 className="skx-h2" style={{marginBottom: '16px'}}>Your organisation's collective<br /><strong>intelligence, unlocked</strong></h2>
            <p style={{fontSize: '14px', color: '#64748b', marginBottom: '40px'}}>Index your first data source free. Go live with your team in under a week.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px'}}>
              <button className="btn-primary" onClick={() => openModal('demo')}>Start Free Trial</button>
              <Link to="/#services" className="btn-ghost">&larr; Back to Services</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}