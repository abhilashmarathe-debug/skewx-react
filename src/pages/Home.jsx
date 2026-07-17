import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import { useApp } from "../lib/AppContext.jsx";
import useHomeBehaviors from "../lib/useHomeBehaviors.js";
import { submitContact } from "../lib/supabase.js";

import anim1 from "../../assets/animation1.json";
import anim2 from "../../assets/animation2.json";
import anim3 from "../../assets/animation3.json";
import anim4 from "../../assets/animation4.json";

const contactInitial = {
  name: "",
  email: "",
  company: "",
  size: "",
  region: "",
  budget: "",
  usecase: "",
  message: "",
};

// --- SCROLL INTERSECTION COUNT-UP COMPONENT ---
function CountUp({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const parsedTarget = parseFloat(target);

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            const easeOutQuad = t => t * (2 - t);
            const currentCount = easeOutQuad(percentage) * parsedTarget;

            if (target.toString().includes('.')) {
              setCount(currentCount.toFixed(1));
            } else {
              setCount(Math.floor(currentCount));
            }

            if (percentage < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Home() {
  const { openModal, showToast, setRoiSnapshot } = useApp();

  useHomeBehaviors({
    pushROISnapshot: setRoiSnapshot,
  });

  const heroAnimation = anim1;
  const animationsGrid = [anim1, anim2, anim3, anim4];

  const [contact, setContact] = useState(contactInitial);
  const [contactBusy, setContactBusy] = useState(false);

  const onContactChange = (e) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onContactSubmit = async (e) => {
    e.preventDefault();
    setContactBusy(true);
    const res = await submitContact(contact);
    setContactBusy(false);

    if (res.ok) {
      setContact(contactInitial);
      showToast("Message Sent", "Contact form submitted successfully.");
    } else {
      showToast("Submission Failed", res.message);
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-cyan-100 select-normal flex flex-col gap-0">
      
     {/* ================= HERO SECTION ================= */}
<section className="relative bg-slate-900 text-slate-100 px-6 pt-20 pb-10 md:pt-24 md:pb-12 overflow-hidden transition-all duration-700 ease-in-out">
  {/* Dark mode glow */}
  <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none"></div>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    
    {/* Left Column */}
    <div className="transform transition-all duration-700 ease-out translate-y-0 opacity-100">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase text-cyan-300 bg-cyan-950 border border-cyan-800 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        AI Digital Engineering
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6 tracking-tight">
        Intelligence Built to <span className="text-cyan-400">Transform.</span>
      </h1>

      <p className="max-w-xl text-lg text-slate-400 mb-8 leading-relaxed">
        SkewX Technologies delivers production-ready AI systems - chatbots, document automation, autonomous agents, and predictive analytics - deployed in 14 days, not 6 months.
      </p>

      <div className="flex flex-wrap gap-4">
        <a href="#services" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg shadow-cyan-900/50 hover:shadow-cyan-600/20 hover:brightness-110">
          Explore Services
        </a>
      </div>
    </div>

    {/* Right Column: Dark Panel with White Animation Cards */}
    <div className="hidden lg:block relative w-full h-[450px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-indigo-900/20 rounded-2xl transform rotate-2"></div>
      <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          {animationsGrid.map((anim, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center bg-white rounded-xl border border-slate-100 p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-cyan-400"
            >
              {/* Filter removed so the Lottie files render properly on the white card background */}
              <div className="w-full h-full max-w-[160px] max-h-[160px] flex items-center justify-center">
                <Lottie 
                  animationData={anim} 
                  loop={true} 
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
</section>
      {/* ================= SERVICES ================= */}
      <section id="services" className="services section px-6 py-12 bg-gray-50/50 border-t border-b border-gray-100 scroll-mt-20">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          .saas-font {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .svc-heading {
            font-size: 11px;
            letter-spacing: .16em;
            text-transform: uppercase;
            color: #0891b2;
            font-weight: 700;
            margin-bottom: 12px;
          }
          .svc-main-title {
            font-size: clamp(2rem, 3.5vw, 2.75rem);
            font-weight: 700;
            letter-spacing: -.03em;
            color: #0f172a;
            margin-bottom: 24px;
            line-height: 1.2;
          }
          .svc-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .svc-card {
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            position: relative;
            background: #ffffff;
            border: 1px solid #f1f5f9;
            border-radius: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .svc-card:hover {
            background: #ffffff;
            border-color: #e2e8f0;
            transform: translateY(-4px);
            box-shadow: 0 10px 30px -5px rgba(0,0,0,0.05), 0 1px 3px rgba(6,182,212,0.05);
          }
          .svc-card a.cover {
            position: absolute;
            inset: 0;
            z-index: 1;
          }
          .svc-num {
            font-size: 11px;
            font-weight: 600;
            color: #cbd5e1;
            font-family: monospace;
          }
          .svc-icon {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: #fafafa;
            border: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s ease;
          }
          .svc-card:hover .svc-icon {
            background: rgba(6,182,212,0.06);
            border-color: rgba(6,182,212,0.15);
          }
          .svc-name {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
            letter-spacing: -.01em;
          }
          .svc-desc {
            font-size: 13px;
            color: #64748b;
            line-height: 1.6;
            flex: 1;
          }
          .svc-link {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            font-weight: 600;
            color: #0891b2;
            text-decoration: none;
            transition: all .2s;
            position: relative;
            z-index: 2;
            opacity: 0.8;
          }
          .svc-card:hover .svc-link { 
            opacity: 1;
            gap: 8px;
          }
          .svc-link-arrow { 
            display: inline-block; 
            transition: transform .2s; 
          }
          
          /* INLINE AUTOMATED HARDWARE-ACCELERATED MARQUEE CSS ENGINE */
          .marquee-viewport { overflow: hidden; width: 100%; display: flex; relative; mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent); }
          .marquee-track { display: flex; width: max-content; gap: 48px; animation: scrollMarquee 25s linear infinite; }
          .marquee-item { flex-shrink: 0; display: flex; align-items: center; justify-content: center; height: 36px; mix-blend-mode: luminosity; opacity: 0.45; transition: all 0.3s ease; }
          .marquee-item:hover { opacity: 0.9; mix-blend-mode: normal; }
          @keyframes scrollMarquee { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }

          @media (max-width: 1024px) { .svc-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
          @media (max-width: 640px) { .svc-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}} />

        <div className="max-w-7xl mx-auto saas-font">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="svc-heading">Capabilities</p>
            <h2 className="svc-main-title">The SkewX Intelligence Stack</h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">
              We fuse deep industry experience with flawless execution to deliver enterprise engineering outcomes that reshape system productivity.
            </p>
          </div>

          {/* ================= HIGH-END INFINITE TECH PARTNER MARQUEE ================= */}
          <div className="w-full max-w-5xl mx-auto mb-14 bg-white/40 border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-center text-[10px] uppercase font-bold  tracking-[0.2em] mb-5"><b>Supported Integration Ecosystem</b></p>
            <div className="marquee-viewport">
              {/* Duplicated stack layout array guarantees an infinite smooth visual stitch loop without snapping breaks */}
              <div className="marquee-track">
                {[
                  { alt: "Google Cloud Partner", src: "https://cdn.quantiphi.com/2025/10/Google-cloud-logo-scaled.webp" },
                  { alt: "NVIDIA logo", src: "https://cdn.quantiphi.com/2025/08/nvidia.webp" },
                  { alt: "Snowflake logo", src: "https://cdn.quantiphi.com/2025/08/snowflake.webp" },
                  { alt: "Tensorflow logo", src: "https://cdn.quantiphi.com/2025/08/TEnsorFlow.webp" },
                  { alt: "Looker logo", src: "https://cdn.quantiphi.com/2025/08/Looker.webp" },
                  { alt: "Oracle logo", src: "https://cdn.quantiphi.com/2025/08/Oracle.webp" },
                  { alt: "AWS logo", src: "https://cdn.quantiphi.com/2025/08/AWS.webp" },
                  { alt: "SAP logo", src: "https://cdn.quantiphi.com/2025/08/SAP.webp" },
                  { alt: "Google Cloud Partner", src: "https://cdn.quantiphi.com/2025/10/Google-cloud-logo-scaled.webp" },
                  { alt: "NVIDIA logo", src: "https://cdn.quantiphi.com/2025/08/nvidia.webp" },
                  { alt: "Snowflake logo", src: "https://cdn.quantiphi.com/2025/08/snowflake.webp" },
                  { alt: "Tensorflow logo", src: "https://cdn.quantiphi.com/2025/08/TEnsorFlow.webp" },
                  { alt: "Looker logo", src: "https://cdn.quantiphi.com/2025/08/Looker.webp" },
                  { alt: "Oracle logo", src: "https://cdn.quantiphi.com/2025/08/Oracle.webp" },
                  { alt: "AWS logo", src: "https://cdn.quantiphi.com/2025/08/AWS.webp" },
                  { alt: "SAP logo", src: "https://cdn.quantiphi.com/2025/08/SAP.webp" }
                ].map((logo, idx) => (
                  <div key={idx} className="marquee-item">
                    <img src={logo.src} alt={logo.alt} title={logo.alt} className="h-full w-auto object-contain max-w-[140px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="svc-grid">
            {[
              { num: "01", icon: "🤖", name: "AI Chatbots & Conversational AI", desc: "24/7 intelligent agents for support, sales, HR, and internal ops. Omnichannel setup across Web, WhatsApp, and Teams.", path: "/services/chatbots/" },
              { num: "02", icon: "📄", name: "Intelligent Document Processing", desc: "Extract, classify, and act on unstructured corporate metadata with 99.4% accuracy across invoices, layouts, and contracts.", path: "/services/idp/" },
              { num: "03", icon: "⚙️", name: "Workflow Automation", desc: "End-to-end process automation utilizing smart cloud decision nodes and hundreds of pre-built platform hooks.", path: "/services/workflow/" },
              { num: "04", icon: "🧠", name: "Autonomous AI Agents", desc: "Agents capable of multi-step task logic execution, context scheduling, tool usage orchestration, and logging loops.", path: "/services/agents/" },
              { num: "05", icon: "📈", name: "Predictive AI & Forecasting", desc: "Forecast operational volatility, predict inventory shifts, and isolate complex transactional structural anomalies early.", path: "/services/predictive/" },
              { num: "06", icon: "🔎", name: "AI Search & RAG Engine", desc: "Secure multi-vector cognitive retrieval layer across your private storage silo with accurate source reference citing.", path: "/services/rag/" },
              { num: "07", icon: "👁️", name: "Computer Vision & Visual AI", desc: "Real-time edge visual validation, item processing counting, safety checkpoint alerts, and OCR classification logs.", path: "/services/vision/" },
              { num: "08", icon: "🛡️", name: "AI Governance & Compliance", desc: "Enterprise observability tools protecting operations with transparent data data policy configurations and drift alerts.", path: "/services/governance/" },
              { num: "09", icon: "🔗", name: "AI Integration & API Orchestration", desc: "Consolidated infrastructure endpoints with predictive query routing to minimize processing costs.", path: "/services/integration/" }
            ].map((svc) => (
              <div className="svc-card" key={svc.num}>
                <Link className="cover" to={svc.path}></Link>
                <div className="flex justify-between items-center w-full">
                  <div className="svc-icon">{svc.icon}</div>
                  <span className="svc-num">{svc.num}</span>
                </div>
                <div>
                  <div className="svc-name mb-1">{svc.name}</div>
                  <div className="svc-desc">{svc.desc}</div>
                </div>
                <div className="svc-link mt-auto pt-2">
                  Explore Documentation <span className="svc-link-arrow">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE PROCESS ================= */}
      <section id="process" className="px-6 py-12 bg-gray-50/50 border-t border-b border-gray-100 scroll-mt-20">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          .saas-font {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .proc-heading {
            font-size: 11px;
            letter-spacing: .16em;
            text-transform: uppercase;
            color: #0891b2;
            font-weight: 700;
            margin-bottom: 12px;
          }
          .proc-main-title {
            text-shadow: 0 1px 1px rgba(255,255,255,0.8);
            font-size: clamp(2rem, 3.5vw, 2.75rem);
            font-weight: 700;
            letter-spacing: -.03em;
            color: #0f172a;
            line-height: 1.2;
          }
          .proc-pipeline {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .proc-node {
            position: relative;
            background: #ffffff;
            border: 1px solid #f1f5f9;
            padding: 32px 24px;
            border-radius: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .proc-node:hover {
            border-color: #e2e8f0;
            transform: translateY(-4px);
            box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04), 0 1px 3px rgba(6,182,212,0.02);
          }
          .proc-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 11px;
            font-weight: 600;
            background: #f8fafc;
            border: 1px solid #f1f5f9;
            color: #64748b;
            transition: all 0.3s ease;
          }
          .proc-node:hover .proc-badge {
            background: rgba(6,182,212,0.06);
            border-color: rgba(6,182,212,0.15);
            color: #0891b2;
          }
          .proc-icon-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #fafafa;
            border: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #475569;
            margin-top: 20px;
            transition: all 0.3s ease;
          }
          .proc-node:hover .proc-icon-wrapper {
            background: rgba(6,182,212,0.04);
            border-color: rgba(6,182,212,0.1);
            color: #0891b2;
          }
          .proc-title {
            font-size: 15px;
            font-weight: 600;
            color: #0f172a;
            letter-spacing: -.01em;
            margin-top: 16px;
            margin-bottom: 8px;
          }
          .proc-desc {
            font-size: 13px;
            color: #64748b;
            line-height: 1.6;
          }
          
          @media (max-width: 1024px) {
            .proc-pipeline {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
          }
          @media (max-width: 640px) {
            .proc-pipeline {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }
        `}} />

        <div className="max-w-7xl mx-auto saas-font">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="proc-heading">Transformation Methodology</p>
            <h2 className="proc-main-title">How We Deliver</h2>
            <p className="text-slate-500 text-sm md:text-base mt-4 leading-relaxed">
              An agile, iterative pipeline infrastructure engineered specifically for immediate technical activation and operational returns.
            </p>
          </div>

          <div className="proc-pipeline max-w-6xl mx-auto">
            {[
              { 
                step: "01", 
                label: "Assess & Strategize", 
                txt: "Evaluate data infrastructure frameworks, map core workflow blockers, and scope enterprise value pipelines.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              },
              { 
                step: "02", 
                label: "Engineer & Build", 
                txt: "Clean raw unstructured sets, model live testing boundaries, and calibrate alignment matrices safely.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              },
              { 
                step: "03", 
                label: "Integrate & Deploy", 
                txt: "Embed tuned multi-agent components natively into live production loops using protected API endpoints.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              },
              { 
                step: "04", 
                label: "Govern & Optimize", 
                txt: "Track accuracy telemetry arrays, enforce real-time security layers, and update operational parameters continuously.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              }
            ].map((p, idx) => (
              <div key={idx} className="proc-node group">
                <div className="flex justify-between items-center w-full">
                  <span className="proc-badge">Phase {p.step}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 transition-colors duration-300 group-hover:bg-cyan-500"></div>
                </div>
                <div className="proc-icon-wrapper">
                  {p.icon}
                </div>
                <h4 className="proc-title">{p.label}</h4>
                <p className="proc-desc">{p.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADVANTAGE TABLE ================= */}
      <section id="whychooseus" className="px-6 py-12 bg-white scroll-mt-20">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          .saas-font {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .adv-heading {
            font-size: 11px;
            letter-spacing: .16em;
            text-transform: uppercase;
            color: #0891b2;
            font-weight: 700;
            margin-bottom: 12px;
          }
          .adv-main-title {
            font-size: clamp(2rem, 3.5vw, 2.75rem);
            font-weight: 700;
            letter-spacing: -.03em;
            color: #0f172a;
            line-height: 1.2;
          }
          .adv-table-container {
            max-width: 5xl;
            margin-left: auto;
            margin-right: auto;
            border: 1px solid #f1f5f9;
            border-radius: 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
            background: #ffffff;
            overflow: hidden;
          }
          .adv-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
          }
          .adv-th {
            padding: 20px 24px;
            font-weight: 600;
            color: #64748b;
            font-size: 13px;
            background: #fafafa;
            border-bottom: 1px solid #f1f5f9;
          }
          .adv-td {
            padding: 20px 24px;
            vertical-align: middle;
            border-bottom: 1px solid #f8fafc;
            color: #475569;
          }
          .adv-row:last-child .adv-td {
            border-bottom: none;
          }
          .adv-pillar {
            font-weight: 600;
            color: #0f172a;
          }
          .saas-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
          }
          .badge-primary {
            background: rgba(6, 182, 212, 0.06);
            border: 1px solid rgba(6, 182, 212, 0.12);
            color: #0891b2;
          }
          .badge-secondary {
            background: #f8fafc;
            border: 1px solid #f1f5f9;
            color: #64748b;
          }
        `}} />

        <div className="max-w-7xl mx-auto saas-font">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="adv-heading">The SkewX Advantage</p>
            <h2 className="adv-main-title">Why Enterprises Choose Us</h2>
          </div>

          <div className="overflow-x-auto adv-table-container">
            <table className="adv-table">
              <thead>
                <tr>
                  <th className="adv-th w-[25%]">Value Pillar</th>
                  <th className="adv-th text-cyan-700 font-bold w-[30%]">SkewX Architecture</th>
                  <th className="adv-th w-[22%]">Traditional SIs</th>
                  <th className="adv-th w-[23%]">Product Vendors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="adv-row">
                  <td className="adv-td adv-pillar">Engineering Scope</td>
                  <td className="adv-td">
                    <span className="saas-badge badge-primary">AI-Native & Configurable</span>
                  </td>
                  <td className="adv-td text-slate-500">Legacy Modernization Focus</td>
                  <td className="adv-td text-slate-500">Black-box Out-of-the-box</td>
                </tr>
                <tr className="adv-row">
                  <td className="adv-td adv-pillar">Model Flexibility</td>
                  <td className="adv-td">
                    <span className="saas-badge badge-primary">Agnostic (Best-of-breed)</span>
                  </td>
                  <td className="adv-td text-slate-500">Rigid Single Vendor Stack</td>
                  <td className="adv-td text-slate-500">Proprietary Closed Code</td>
                </tr>
                <tr className="adv-row">
                  <td className="adv-td adv-pillar">Data Architecture</td>
                  <td className="adv-td">
                    <span className="saas-badge badge-primary">100% Secure Client Custody</span>
                  </td>
                  <td className="adv-td text-slate-500">
                    <span className="saas-badge badge-secondary">Client Managed Pools</span>
                  </td>
                  <td className="adv-td text-slate-500">Shared/Used for base training</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= METRICS / IMPACT ================= */}
      <section className="py-12 bg-gray-50/50 border-t border-b border-gray-100 font-sans">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          
          .metrics-font {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .metric-card {
            background: #ffffff;
            border: 1px solid #f1f5f9;
            padding: 32px;
            border-radius: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
          }
          .metric-card:hover {
            border-color: #e2e8f0;
            transform: translateY(-4px);
            box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
          }
          .metric-icon-box {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: #fafafa;
            border: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            margin-bottom: 20px;
            color: #475569;
            transition: all 0.3s ease;
          }
          .metric-card:hover .metric-icon-box {
            background: rgba(6,182,212,0.04);
            border-color: rgba(6,182,212,0.1);
            color: #0891b2;
          }
          .metric-val {
            font-size: clamp(2.75rem, 4.5vw, 3.75rem);
            font-weight: 700;
            letter-spacing: -.04em;
            color: #0f172a;
            line-height: 1;
            margin-bottom: 8px;
          }
          .metric-val-accent {
            color: #0891b2;
          }
          .metric-title {
            font-size: 14px;
            font-weight: 600;
            color: #334155;
            letter-spacing: -.01em;
            margin-bottom: 16px;
            line-height: 1.4;
          }
          .metric-progress-track {
            width: 100%;
            height: 3px;
            background: #f1f5f9;
            border-radius: 99px;
            overflow: hidden;
            margin-bottom: 12px;
            position: relative;
          }
          .metric-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);
            border-radius: 99px;
            transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .metric-subtext {
            font-size: 11px;
            color: #94a3b8;
            font-weight: 500;
            line-height: 1.4;
          }
        `}} />

        <div className="max-w-7xl mx-auto px-6 metrics-font">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                target: "80", 
                suffix: "%", 
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                heading: "Reduction in manual processing time", 
                text: "Avg. across IDP + Workflow deployments",
                progress: "80%"
              },
              { 
                target: "99.4", 
                suffix: "%", 
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
                heading: "Document processing accuracy", 
                text: "Validated across 50M+ documents processed",
                progress: "99.4%"
              },
              { 
                target: "3", 
                suffix: "x", 
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                heading: "Faster decision-making workflows", 
                text: "Measured on enterprise workflow automation",
                progress: "75%"
              },
              { 
                target: "68", 
                suffix: "%", 
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                heading: "Customer support cost reduction", 
                text: "Via AI chatbot deflection - median client result",
                progress: "68%"
              }
            ].map((m, idx) => (
              <div key={idx} className="metric-card group">
                <div className="metric-icon-box">
                  {m.icon}
                </div>
                
                <div className="metric-val">
                  <CountUp target={m.target} />
                  <span className="metric-val-accent">{m.suffix}</span>
                </div>
                
                <h4 className="metric-title">{m.heading}</h4>
                
                <div className="metric-progress-track mt-auto">
                  <div className="metric-progress-bar" style={{ width: m.progress }}></div>
                </div>
                
                <p className="metric-subtext">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VERTICAL SECTORS ================= */}
      <section id="solutions" className="px-6 py-12 bg-white scroll-mt-20">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          .saas-font {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .sol-heading {
            font-size: 11px;
            letter-spacing: .16em;
            text-transform: uppercase;
            color: #0891b2;
            font-weight: 700;
            margin-bottom: 12px;
            text-align: center;
          }
          .sol-main-title {
            font-size: clamp(2rem, 3.5vw, 2.75rem);
            font-weight: 700;
            letter-spacing: -.03em;
            color: #0f172a;
            margin-bottom: 32px;
            line-height: 1.2;
          }
          .sol-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .sol-card {
            padding: 32px;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border: 1px solid #f1f5f9;
            border-radius: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.02);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .sol-card:hover {
            border-color: #e2e8f0;
            transform: translateY(-4px);
            box-shadow: 0 12px 30px -5px rgba(0,0,0,0.04);
          }
          .sol-icon-box {
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
          }
          .sol-title {
            font-size: 18px;
            font-weight: 600;
            color: #0f172a;
            letter-spacing: -.01em;
            margin-bottom: 12px;
          }
          .sol-pill {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            background: rgba(6, 182, 212, 0.06);
            border: 1px solid rgba(6, 182, 212, 0.12);
            color: #0891b2;
            margin-bottom: 16px;
            align-self: flex-start;
          }
          .sol-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .sol-item {
            font-size: 13px;
            color: #64748b;
            line-height: 1.5;
            display: flex;
            align-items: baseline;
            gap: 8px;
          }
          .sol-bullet {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #cbd5e1;
            flex-shrink: 0;
            transform: translateY(-2px);
          }
          .sol-link {
            font-size: 12px;
            font-weight: 600;
            color: #0891b2;
            margin-top: 24px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
          }
          .sol-link:hover {
            text-decoration: underline;
          }

          @media (max-width: 1024px) { .sol-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
          @media (max-width: 640px) { .sol-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}} />

        <div className="max-w-7xl mx-auto saas-font">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="sol-heading">Industry Alignment</p>
            <h2 className="sol-main-title">Transforming Key Sectors</h2>
          </div>

          <div className="sol-grid">
            {[
              {
                title: "Healthcare & Life Sciences",
                icon: "🏥",
                metric: "80% less doc review time",
                points: [
                  "IDP for medical records & clinical docs",
                  "Prior authorization automation",
                  "HIPAA-compliant AI chatbots",
                  "Clinical trial documentation AI"
                ]
              },
              {
                title: "Banking & Insurance",
                icon: "💰",
                metric: "99.1% compliance accuracy",
                points: [
                  "KYC / AML automation",
                  "Compliance document review AI",
                  "Fraud detection & flagging",
                  "Claims processing automation"
                ]
              },
              {
                title: "Logistics & Supply Chain",
                icon: "🚚",
                metric: "94% demand forecast accuracy",
                points: [
                  "Demand forecasting AI",
                  "Route optimization agents",
                  "Invoice & PO processing",
                  "Supplier risk prediction"
                ]
              },
              {
                title: "Government & Public Sector",
                icon: "🏛️",
                metric: "4 hrs from 14-day processing",
                points: [
                  "Grant processing automation",
                  "Citizen service AI chatbots",
                  "Policy document analysis",
                  "Audit trail & compliance AI"
                ]
              },
              {
                title: "Retail & Ecommerce",
                icon: "🛒",
                metric: "68% ticket deflection rate",
                points: [
                  "AI product catalog management",
                  "Customer service bot deflection",
                  "Returns & refunds automation",
                  "Personalization AI"
                ]
              },
              {
                title: "Legal & Compliance",
                icon: "⚖️",
                metric: "22 min from 8-hr contract review",
                points: [
                  "Contract analysis & red-lining AI",
                  "Due diligence automation",
                  "Regulatory change tracking",
                  "eDiscovery document processing"
                ]
              }
            ].map((ind, idx) => (
              <div key={idx} className="sol-card">
                <div className="sol-icon-box">{ind.icon}</div>
                <h3 className="sol-title">{ind.title}</h3>
                <div className="sol-pill">{ind.metric}</div>
                
                <ul className="sol-list">
                  {ind.points.map((pt, pIdx) => (
                    <li key={pIdx} className="sol-item">
                      <span className="sol-bullet"></span>
                      {pt}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <span className="sol-link">View Solutions &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="px-6 py-12 bg-gray-50/50 border-t border-b border-gray-100 scroll-mt-20">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          .saas-font {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .cnt-card {
            max-width: 1152px;
            margin-left: auto;
            margin-right: auto;
            display: grid;
            grid-template-columns: 1fr 1.3fr;
            gap: 0;
            background: #ffffff;
            border: 1px solid #f1f5f9;
            border-radius: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 10px 40px -10px rgba(0,0,0,0.03);
            overflow: hidden;
          }
          .cnt-info-side {
            padding: 48px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #ffffff;
            border-right: 1px solid #f1f5f9;
          }
          .cnt-form-side {
            padding: 48px;
            background: #fafafa;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .cnt-title {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -.02em;
            margin-bottom: 12px;
          }
          .cnt-desc {
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 32px;
          }
          .cnt-icon-plate {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: rgba(6, 182, 212, 0.04);
            border: 1px solid rgba(6, 182, 212, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0891b2;
            flex-shrink: 0;
          }
          .cnt-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: #94a3b8;
            margin-bottom: 2px;
          }
          .cnt-value {
            font-size: 14px;
            font-weight: 500;
            color: #334155;
          }
          .cnt-input {
            width: 100%;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            color: #0f172a;
            outline: none;
            transition: all 0.2s ease;
          }
          .cnt-input:focus {
            border-color: #0891b2;
            box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.08);
          }
          .cnt-badge {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 4px 12px;
            border-radius: 99px;
          }
          
          @media (max-width: 1024px) {
            .cnt-card { grid-template-columns: 1fr; }
            .cnt-info-side { border-right: none; border-bottom: 1px solid #f1f5f9; padding: 36px; }
            .cnt-form-side { padding: 36px; }
          }
        `}} />

        <div className="max-w-7xl mx-auto saas-font">
          <div className="cnt-card">
            
            <div className="cnt-info-side">
              <div>
                <h3 className="cnt-title">Let's solve what matters, together.</h3>
                <p className="cnt-desc">
                  Speak directly with our technical deployment leads to review target process pipelines, security architectures, or custom engagement timelines.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="cnt-icon-plate">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <p className="cnt-label">Enterprise Operations</p>
                      <a href="mailto:contact@skewx.com" className="cnt-value text-cyan-600 font-semibold hover:underline">contact@SkewX.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="cnt-icon-plate">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <div>
                      <p className="cnt-label">Global Hub Infrastructure</p>
                      <p className="cnt-value">North America &middot; Europe &middot; India &middot; APAC</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-slate-100">
                <span className="cnt-badge">SOC2 Certified</span>
                <span className="cnt-badge">GDPR Compliant</span>
                <span className="cnt-badge">ISO 27001</span>
              </div>
            </div>

            <form onSubmit={onContactSubmit} className="cnt-form-side">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Full Name" required className="cnt-input px-4 h-11" value={contact.name} onChange={onContactChange} />
                <input type="email" name="email" placeholder="Business Email" required className="cnt-input px-4 h-11" value={contact.email} onChange={onContactChange} />
                <input type="text" name="company" placeholder="Company Name" required className="cnt-input px-4 h-11" value={contact.company} onChange={onContactChange} />
                
                <select name="size" className="cnt-input px-3 h-11 text-slate-500 bg-white cursor-pointer" value={contact.size} onChange={onContactChange}>
                  <option value="" disabled>Company Size</option>
                  <option>1–50</option>
                  <option>51–200</option>
                  <option>201–1000</option>
                  <option>1000+</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select name="region" className="cnt-input px-3 h-11 text-slate-500 bg-white cursor-pointer" value={contact.region} onChange={onContactChange}>
                  <option value="" disabled>Operating Region</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>India / APAC</option>
                  <option>Other</option>
                </select>

                <select name="budget" className="cnt-input px-3 h-11 text-slate-500 bg-white cursor-pointer" value={contact.budget} onChange={onContactChange}>
                  <option value="" disabled>Project Budget Scope</option>
                  <option>Under $50k</option>
                  <option>$50k–$250k</option>
                  <option>$250k+</option>
                  <option>TBD / Exploring</option>
                </select>
              </div>

              <select name="usecase" className="cnt-input px-3 h-11 text-slate-500 bg-white cursor-pointer" value={contact.usecase} onChange={onContactChange}>
                <option value="" disabled>Primary Target Framework</option>
                <option>Data & AI</option>
                <option>Generative AI & LLMs</option>
                <option>Digital Engineering</option>
                <option>Document Intelligence</option>
                <option>Autonomous Agents</option>
              </select>

              <textarea name="message" rows="4" placeholder="Briefly specify key milestones or infrastructure challenges..." className="cnt-input px-4 py-3 resize-none" value={contact.message} onChange={onContactChange}></textarea>

              <button type="submit" disabled={contactBusy} className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold text-sm transition-transform duration-150 active:scale-[0.995] disabled:opacity-50 shadow-[0_4px_12px_rgba(8,145,178,0.15)] flex items-center justify-center gap-2">
                {contactBusy ? "Submitting..." : "Initiate Project Activation \u2192"}
              </button>
            </form>

          </div>
        </div>
      </section>

    </div>
  );
}