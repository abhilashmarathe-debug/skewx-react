import { useApp } from '../../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Chatbots() {
  const { openModal } = useApp()
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .skx-page {
          color: #0f172a;
          background-color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
        }

        .skx-container {
          max-width: 1232px;
          margin: auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
        }

        .skx-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #0891b2;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .16em;
          font-weight: 700;
        }

        .skx-h1 {
          font-size: clamp(2.75rem, 5.5vw, 4.5rem);
          line-height: 1.1;
          letter-spacing: -.03em;
          font-weight: 700;
          margin-bottom: 24px;
          color: #0f172a;
        }

        .skx-h1 span {
          font-weight: 700;
          background: linear-gradient(135deg, #06b6d4, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .skx-h2 {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          line-height: 1.2;
          letter-spacing: -.02em;
          font-weight: 500;
          color: #0f172a;
        }

        .skx-h2 strong {
          font-weight: 700;
        }

        .skx-muted {
          color: #64748b;
          line-height: 1.6;
          font-size: 15px;
        }

        .skx-divider {
          width: 100%;
          height: 1px;
          background: #f1f5f9;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          background: #0891b2;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(8,145,178,.15);
        }

        .btn-primary:hover {
          background: #0e7490;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(8,145,178,.25);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #ffffff;
        }

        .btn-outline:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
          color: #0f172a;
          transform: translateY(-2px);
        }

        .hero {
          padding: 140px 0 100px;
          position: relative;
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 48px;
          align-items: center;
        }

        /* Continuous scroll reveal timeline linked directly to index.css rules */
        .saas-reveal-node {
          view-timeline-name: --itemReveal;
          view-timeline-axis: block;
          animation-name: saasReveal;
          animation-fill-mode: both;
          animation-timeline: --itemReveal;
          animation-range: entry 5% cover 35%;
        }

        .hero-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
        }

        .hero-chat {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          max-width: 85%;
          font-size: 13.5px;
          line-height: 1.6;
        }

        .chat-bubble.ai {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #334155;
          align-self: flex-start;
          border-top-left-radius: 4px;
        }

        .chat-bubble.user {
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          color: #ffffff;
          align-self: flex-end;
          font-weight: 500;
          border-top-right-radius: 4px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 80px;
        }

        .stat {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 2px rgba(0,0,0,0.01);
        }

        .stat:hover {
          border-color: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.04);
        }

        .stat h3 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: #0891b2;
          letter-spacing: -.03em;
        }

        .stat p {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .workflow, .features, .usecases, .cta {
          padding: 100px 0;
        }

        .workflow-box {
          margin-top: 48px;
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .flow-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .flow-card:hover {
          border-color: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }

        .flow-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #fafafa;
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
          color: #475569;
        }

        .flow-card:hover .flow-icon {
          background: rgba(6, 182, 212, 0.04);
          border-color: rgba(6, 182, 212, 0.1);
          color: #0891b2;
        }

        .flow-title {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -.01em;
        }

        .flow-desc {
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-card:hover {
          border-color: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }

        .feature-icon {
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

        .feature-card:hover .feature-icon {
          background: rgba(6, 182, 212, 0.04);
          border-color: rgba(6, 182, 212, 0.1);
          color: #0891b2;
        }

        .feature-title {
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -.01em;
        }

        .feature-desc {
          color: #64748b;
          line-height: 1.6;
          font-size: 13px;
        }

        .use-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        .use-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 36px;
          display: flex;
          gap: 20px;
          align-items: start;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .use-card:hover {
          border-color: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
        }

        .use-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -.01em;
          margin-bottom: 6px;
        }

        .use-card p {
          color: #64748b;
          line-height: 1.6;
          font-size: 13px;
        }

        .cta-box {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          padding: 64px 32px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
        }

        @media(max-width:1024px){
          .hero-grid, .workflow-grid, .feature-grid { grid-template-columns: repeat(2, 1fr); }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .use-grid { grid-template-columns: 1fr; }
        }

        @media(max-width:640px){
          .hero-grid, .stats, .workflow-grid, .feature-grid { grid-template-columns: 1fr; }
          .hero { padding: 100px 0 60px; }
          .workflow, .features, .usecases, .cta { padding: 60px 0; }
        }
      `}} />

      <div className="skx-page saas-font">

        {/* HERO */}
        <section className="hero">
          <div className="skx-container">
            <div className="hero-grid">
              
              <div>
                <p className="skx-label" style={{marginBottom: '22px'}}>
                  Conversational AI Platform
                </p>

                <h1 className="skx-h1">
                  AI Chatbots & <br />
                  <span>Conversational AI</span>
                </h1>

                <p className="skx-muted" style={{maxWidth: '620px', marginBottom: '40px'}}>
                  Build intelligent AI assistants for support, sales, operations, and customer engagement. Deliver real-time conversations across web, WhatsApp, Slack, Microsoft Teams, and enterprise systems with seamless automation and human escalation.
                </p>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: '14px'}}>
                  <button onClick={() => openModal('demo')} className="btn-primary">
                    Request a Demo
                  </button>
                  <Link to="/#services" className="btn-outline">
                    View All Services
                  </Link>
                </div>
              </div>

              <div className="hero-card saas-reveal-node">
                <div className="hero-chat">
                  <div className="chat-bubble ai">
                    👋 Hello! How can I help you today?
                  </div>
                  <div className="chat-bubble user">
                    I need help with order tracking and refund status.
                  </div>
                  <div className="chat-bubble ai">
                    Your refund has been approved and will be processed within 24 hours. Would you also like the tracking update?
                  </div>
                  <div className="chat-bubble user">
                    Yes please.
                  </div>
                  <div className="chat-bubble ai">
                    🚚 Your package is out for delivery and expected before 7 PM today.
                  </div>
                </div>
              </div>

            </div>

            <div className="stats">
              <div className="stat saas-reveal-node">
                <h3>24/7</h3>
                <p>Always Active</p>
              </div>
              <div className="stat saas-reveal-node">
                <h3>68%</h3>
                <p>Ticket Reduction</p>
              </div>
              <div className="stat saas-reveal-node">
                <h3>40+</h3>
                <p>Languages Supported</p>
              </div>
              <div className="stat saas-reveal-node">
                <h3>&lt;14d</h3>
                <p>Deployment Time</p>
              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* WORKFLOW */}
        <section className="workflow">
          <div className="skx-container">
            <div style={{maxWidth: '760px'}}>
              <p className="skx-label" style={{marginBottom: '16px'}}>
                Workflow Architecture
              </p>
              <h2 className="skx-h2" style={{marginBottom: '20px'}}>
                Intelligent conversations powered by <strong>enterprise AI workflows</strong>
              </h2>
              <p className="skx-muted">
                Every message passes through a structured conversational pipeline that understands intent, retrieves context, generates responses, and escalates complex cases to human agents with complete conversation history.
              </p>
            </div>

            <div className="workflow-box">
              <div className="workflow-grid">
                
                <div className="flow-card saas-reveal-node">
                  <div className="flow-icon">📥</div>
                  <div className="flow-title">Input Channels</div>
                  <div className="flow-desc">
                    Web chat, WhatsApp, Slack, Teams, Telegram, APIs, and customer support portals.
                  </div>
                </div>

                <div className="flow-card saas-reveal-node">
                  <div className="flow-icon">🧠</div>
                  <div className="flow-title">Intent Detection</div>
                  <div className="flow-desc">
                    Natural language processing identifies user intent, entities, sentiment, and context.
                  </div>
                </div>

                <div className="flow-card saas-reveal-node">
                  <div className="flow-icon">⚡</div>
                  <div className="flow-title">AI Processing</div>
                  <div className="flow-desc">
                    Retrieval pipelines and LLM orchestration generate accurate contextual responses.
                  </div>
                </div>

                <div className="flow-card saas-reveal-node">
                  <div className="flow-icon">🤝</div>
                  <div className="flow-title">Human Escalation</div>
                  <div className="flow-desc">
                    Complex conversations are transferred with complete chat history and insights.
                  </div>
                </div>

                <div className="flow-card saas-reveal-node">
                  <div className="flow-icon">📊</div>
                  <div className="flow-title">Analytics</div>
                  <div className="flow-desc">
                    Measure CSAT, engagement, resolution rates, conversion performance, and trends.
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* FEATURES */}
        <section className="features">
          <div className="skx-container">
            <div style={{maxWidth: '720px'}}>
              <p className="skx-label" style={{marginBottom: '16px'}}>
                Core Capabilities
              </p>
              <h2 className="skx-h2">
                Enterprise AI features designed for <strong>modern businesses</strong>
              </h2>
            </div>

            <div className="feature-grid">
              
              <div className="feature-card saas-reveal-node">
                <div className="feature-icon">🌐</div>
                <div className="feature-title">Omnichannel Support</div>
                <div className="feature-desc">
                  Deploy one AI assistant across websites, mobile apps, WhatsApp, Slack, Teams, and APIs from a centralized platform.
                </div>
              </div>

              <div className="feature-card saas-reveal-node">
                <div className="feature-icon">🧠</div>
                <div className="feature-title">Advanced NLP</div>
                <div className="feature-desc">
                  Understand intent, sentiment, and context using enterprise-grade natural language understanding models.
                </div>
              </div>

              <div className="feature-card saas-reveal-node">
                <div className="feature-icon">🔗</div>
                <div className="feature-title">Enterprise Integrations</div>
                <div className="feature-desc">
                  Connect seamlessly with Salesforce, HubSpot, Zendesk, SAP, CRMs, ERPs, and internal tools.
                </div>
              </div>

              <div className="feature-card saas-reveal-node">
                <div className="feature-icon">📈</div>
                <div className="feature-title">Real-Time Analytics</div>
                <div className="feature-desc">
                  Monitor performance metrics including containment rate, engagement, satisfaction, and conversion funnels.
                </div>
              </div>

              <div className="feature-card saas-reveal-node">
                <div className="feature-icon">🔒</div>
                <div className="feature-title">Enterprise Security</div>
                <div className="feature-desc">
                  Secure infrastructure with role-based access, encrypted communication, and enterprise compliance support.
                </div>
              </div>

              <div className="feature-card saas-reveal-node">
                <div className="feature-icon">⚙️</div>
                <div className="feature-title">Workflow Automation</div>
                <div className="feature-desc">
                  Automate repetitive tasks, lead qualification, ticket routing, appointment booking, and internal operations.
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* USE CASES */}
        <section className="usecases">
          <div className="skx-container">
            <p className="skx-label" style={{marginBottom: '16px'}}>
              Industry Solutions
            </p>
            <h2 className="skx-h2" style={{maxWidth: '720px', marginBottom: '48px'}}>
              AI chatbot solutions tailored for <strong>high-growth industries</strong>
            </h2>

            <div className="use-grid">
              
              <div className="use-card saas-reveal-node">
                <div style={{fontSize: '32px', lineHeight: '1'}}>🏦</div>
                <div>
                  <h3>Financial Services</h3>
                  <p>
                    Automate customer support, account inquiries, onboarding workflows, fraud notifications, and loan qualification experiences.
                  </p>
                </div>
              </div>

              <div className="use-card saas-reveal-node">
                <div style={{fontSize: '32px', lineHeight: '1'}}>🏥</div>
                <div>
                  <h3>Healthcare</h3>
                  <p>
                    Streamline appointment scheduling, patient communication, symptom triage, insurance assistance, and support operations.
                  </p>
                </div>
              </div>

              <div className="use-card saas-reveal-node">
                <div style={{fontSize: '32px', lineHeight: '1'}}>🛒</div>
                <div>
                  <h3>E-Commerce</h3>
                  <p>
                    Improve shopping experiences with order tracking, product discovery, personalized recommendations, and automated support.
                  </p>
                </div>
              </div>

              <div className="use-card saas-reveal-node">
                <div style={{fontSize: '32px', lineHeight: '1'}}>🏭</div>
                <div>
                  <h3>Manufacturing</h3>
                  <p>
                    Automate vendor communication, procurement workflows, employee helpdesk operations, and field support interactions.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="skx-divider"></div>

        {/* CTA */}
        <section className="cta" id="contact">
          <div className="skx-container">
            <div className="cta-box saas-reveal-node">
              
              <p className="skx-label" style={{justifyContent: 'center', marginBottom: '20px'}}>
                Start Your AI Journey
              </p>

              <h2 className="skx-h2" style={{marginBottom: '20px'}}>
                Ready to launch your <strong>AI chatbot platform?</strong>
              </h2>

              <p className="skx-muted" style={{maxWidth: '620px', margin: 'auto auto 40px'}}>
                Deploy enterprise-grade conversational AI in days with seamless integrations, intelligent workflows, and scalable infrastructure.
              </p>

              <div style={{display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap'}}>
                <button onClick={() => openModal('demo')} className="btn-primary">
                  Book Free Consultation
                </button>
                <Link to="/#services" className="btn-outline">
                  Explore More Services
                </Link>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  )
}