import { useState, useRef, useEffect, useCallback } from 'react'
import { sendMessage, resetSession } from './dialogflowService.js'

/* ─── constants ────────────────────────────────────────────────────── */
const WELCOME = {
  id: "welcome",
  role: "bot",
  text: `Welcome to SkewX Technologies 👋
         We help businesses automate operations using AI. May I know your name?`,
  quickReplies: [],
  ts: Date.now(),
}

const QUICK_REPLIES = []

/* ─── tiny helpers ──────────────────────────────────────────────────── */
let msgId = 0
function mkMsg(role, text, quickReplies = []) {
  return {
    id: ++msgId,
    role,
    text,
    quickReplies,
    ts: Date.now()
  }
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* ─── SVG icons (inline - no extra deps) ───────────────────────────── */
function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
function IconMinus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconRefresh() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3" />
    </svg>
  )
}

/* ─── Typing indicator ──────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={styles.typingWrap}>
      <span style={{ ...styles.dot, animationDelay: '0ms' }} />
      <span style={{ ...styles.dot, animationDelay: '160ms' }} />
      <span style={{ ...styles.dot, animationDelay: '320ms' }} />
    </div>
  )
}

/* ─── Single message bubble ─────────────────────────────────────────── */
function Bubble({ msg, onOptionClick }) {
  const isBot = msg.role === 'bot'

  return (
    <div
      style={{
        ...styles.bubbleRow,
        justifyContent: isBot ? 'flex-start' : 'flex-end'
      }}
    >
      {isBot && (
        <div style={styles.avatar}>
          <span style={{ fontSize: 11 }}>AI</span>
        </div>
      )}

      <div style={{ maxWidth: '76%' }}>
        <div style={isBot ? styles.botBubble : styles.userBubble}>
          {msg.text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < msg.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>

        {msg.options?.length > 0 && (
          <div style={styles.capsuleWrap}>
            {msg.options.map(option => (
              <button
                key={option}
                style={styles.capsule}
                onClick={() => onOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <div
          style={{
            ...styles.ts,
            textAlign: isBot ? 'left' : 'right'
          }}
        >
          {formatTime(msg.ts)}
        </div>
      </div>
    </div>
  )
}

/* ─── Main widget ───────────────────────────────────────────────────── */
export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [minimised, setMin]   = useState(false)
  const [messages, setMsgs]   = useState([])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const [error, setError]     = useState(null)
  const [unread, setUnread]   = useState(0)
  const [pulse, setPulse]     = useState(false)
  const [visible, setVisible] = useState(false)  // entrance animation

  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)
  const panelRef   = useRef(null)

  /* entrance: show widget after short delay */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  /* pulse the button when closed & there are unread msgs */
  useEffect(() => {
    if (!open && unread > 0) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 2000)
      return () => clearTimeout(t)
    }
  }, [open, unread])

  /* scroll to bottom on new messages */
  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing, open, minimised])

  /* focus input when panel opens */
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, minimised])

  /* track unread when closed */
  useEffect(() => {
    if (!open && messages.length > 1) {
      setUnread(messages.filter(m => m.role === 'bot').length - 1)
    }
    if (open) setUnread(0)
  }, [open, messages])

  /* initialize Dialogflow welcome event */
useEffect(() => {
  const initializeChat = async () => {
    try {
      setTyping(true)

      const response = await sendMessage('', 'WELCOME')

      setMsgs([
        {
          id: Date.now(),
          role: 'bot',
          text: response.reply,
          options: response.options || [],
          ts: Date.now(),
        }
      ])
    } catch (err) {
      console.error('Welcome event failed:', err)

      setMsgs([
        {
          id: Date.now(),
          role: 'bot',
          text: 'Welcome to SkewX Technologies 👋\nWe help businesses automate operations using AI. May I know your name?',
          ts: Date.now(),
        }
      ])
    } finally {
      setTyping(false)
    }
  }

  initializeChat()
}, [])

  /* send a message */
  const send = useCallback(async (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed || typing) return

    console.log("Sending:", trimmed)

    setInput('')
    setError(null)
    setMsgs(prev => [...prev, mkMsg('user', trimmed)])
    setTyping(true)

    try {
      const response = await sendMessage(trimmed)

      console.log("Dialogflow Response:", {
        reply: response.reply,
        intent: response.intent,
        parameters: response.parameters,
        confidence: response.confidence
      })

      setMsgs(prev => [
        ...prev,
        mkMsg(
          'bot',
          response.reply || 'No response',
          response.options || []
        )
      ])
    } catch (e) {
      console.error("Error:", e)
      setError('Connection error - please try again.')
    } finally {
      setTyping(false)
    }
  }, [input, typing])

  /* keyboard send */
  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  /* reset conversation */
  const reset = async () => {
    resetSession()
    setError(null)
    setInput('')
    setMsgs([])

    try {
      setTyping(true)

      const response = await sendMessage('', 'WELCOME')

      setMsgs([
        {
          id: Date.now(),
          role: 'bot',
          text: response.reply,
          ts: Date.now(),
        }
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setTyping(false)
    }
  }

  /* toggle */
  const toggle = () => {
    setOpen(v => !v)
    setMin(false)
  }

  /* ── render ── */
  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{keyframes}</style>

      {/* ── floating panel ── */}
      {open && (
        <div
          ref={panelRef}
          style={{
            ...styles.panel,
            animation: minimised ? 'none' : 'chatSlideIn 0.32s cubic-bezier(0.34,1.56,0.64,1)',
            height: minimised ? 'auto' : 520,
          }}
        >
          {/* header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.headerAvatar}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>AI</span>
              </div>
              <div>
                <div style={styles.headerName}>SkewX Assistant</div>
                <div style={styles.headerStatus}>
                  <span style={styles.statusDot} /> Online
                </div>
              </div>
            </div>
            <div style={styles.headerActions}>
              <button className="skewx-chat-iconbtn" style={styles.iconBtn} title="Reset chat" onClick={reset}>
                <IconRefresh />
              </button>
              <button className="skewx-chat-iconbtn" style={styles.iconBtn} title={minimised ? 'Expand' : 'Minimise'} onClick={() => setMin(v => !v)}>
                <IconMinus />
              </button>
              <button className="skewx-chat-iconbtn" style={styles.iconBtn} title="Close" onClick={toggle}>
                <IconX />
              </button>
            </div>
          </div>

          {/* body - hidden when minimised */}
          {!minimised && (
            <>
              {/* messages */}
              <div style={styles.body}>
                {messages.map(msg => (
                  <div key={msg.id}>
                    <Bubble msg={msg} />

                    {msg.role === "bot" &&
                      msg.quickReplies?.length > 0 && (
                        <div style={styles.quickWrap}>
                          {msg.quickReplies.map(option => (
                            <button
                              key={option}
                              className="skewx-chat-quickbtn"
                              style={styles.quickBtn}
                              onClick={() => send(option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}

                {typing && (
                  <div style={{ ...styles.bubbleRow, justifyContent: 'flex-start' }}>
                    <div style={styles.avatar}><span style={{ fontSize: 11 }}>AI</span></div>
                    <div style={styles.botBubble}><TypingDots /></div>
                  </div>
                )}

                {error && (
                  <div style={styles.errorMsg}>⚠ {error}</div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* quick replies (shown only with welcome msg) */}
              {messages.length === 1 && (
                <div style={styles.quickWrap}>
                  {QUICK_REPLIES.map(q => (
                    <button key={q} className="skewx-chat-quickbtn" style={styles.quickBtn} onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* input row */}
              <div style={styles.inputRow}>
                <textarea
                  ref={inputRef}
                  rows={1}
                  placeholder="Type a message…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={typing}
                  style={styles.textarea}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || typing}
                  style={{
                    ...styles.sendBtn,
                    opacity: (!input.trim() || typing) ? 0.45 : 1,
                  }}
                  title="Send"
                >
                  <IconSend />
                </button>
              </div>

              {/* powered by */}
              <div style={styles.poweredBy}>
                Powered by <span style={{ color: '#0891b2' }}>SkewX</span> · Technologies
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FAB trigger button ── */}
      <button
        onClick={toggle}
        style={{
          ...styles.fab,
          transform: visible
            ? (open ? 'scale(0.9)' : 'scale(1)')
            : 'scale(0) translateY(20px)',
          opacity: visible ? 1 : 0,
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        title={open ? 'Close chat' : 'Chat with us'}
      >
        {/* pulse ring */}
        {pulse && !open && <span style={styles.pulseRing} />}

        {/* unread badge */}
        {unread > 0 && !open && (
          <span style={styles.badge}>{unread > 9 ? '9+' : unread}</span>
        )}

        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        }}>
          {open ? <IconX /> : <IconChat />}
        </span>
      </button>
    </>
  )
}

/* ─── Styles (inline - no extra CSS file needed) ────────────────────── */
const styles = {
  /* panel */
  panel: {
    position: 'fixed',
    bottom: 88,
    right: 24,
    width: 360,
    maxWidth: 'calc(100vw - 32px)',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9997,
    boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
    background: '#ffffff',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  /* header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'linear-gradient(90deg, rgba(8,145,178,0.08) 0%, rgba(124,58,237,0.06) 100%)',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    flexShrink: 0,
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  headerAvatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: 'linear-gradient(135deg, #0891b2, #7c3aed)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#ffffff', fontWeight: 700, fontSize: 11, flexShrink: 0,
    boxShadow: '0 0 12px rgba(8,145,178,0.2)',
  },
  headerName: { color: '#111827', fontSize: 13, fontWeight: 600, lineHeight: 1.3 },
  headerStatus: {
    display: 'flex', alignItems: 'center', gap: 5,
    color: '#6b7280', fontSize: 11,
  },
  statusDot: {
    display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
    background: '#16a34a', boxShadow: '0 0 6px rgba(22,163,74,0.4)',
  },
  headerActions: { display: 'flex', gap: 4 },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    borderRadius: 8,
    width: 28, height: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#6b7280',
    transition: 'background 0.2s, color 0.2s',
  },
  /* body */
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '14px 14px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(0,0,0,0.2) transparent',
  },
  /* bubbles */
  bubbleRow: { display: 'flex', alignItems: 'flex-end', gap: 8 },
  avatar: {
    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, rgba(8,145,178,0.1), rgba(124,58,237,0.1))',
    border: '1px solid rgba(8,145,178,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#0891b2', fontSize: 9, fontWeight: 700,
  },
  botBubble: {
    background: '#f8fafc',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '16px 16px 16px 4px',
    padding: '10px 13px',
    color: '#1f2937',
    fontSize: 13, lineHeight: 1.55,
  },
  userBubble: {
    background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(124,58,237,0.15))',
    border: '1px solid rgba(8,145,178,0.2)',
    borderRadius: '16px 16px 4px 16px',
    padding: '10px 13px',
    color: '#111827',
    fontSize: 13, lineHeight: 1.55,
  },
  ts: { fontSize: 10, color: '#9ca3af', marginTop: 3, paddingX: 4 },
  /* typing */
  typingWrap: { display: 'flex', gap: 4, alignItems: 'center', height: 18 },
  dot: {
    display: 'inline-block',
    width: 6, height: 6, borderRadius: '50%',
    background: 'rgba(8,145,178,0.6)',
    animation: 'chatTypingBounce 0.9s infinite ease-in-out',
  },
  /* error */
  errorMsg: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: 10, padding: '8px 12px',
    color: '#dc2626', fontSize: 12, textAlign: 'center',
  },
  /* quick replies */
  quickWrap: {
    display: 'flex', flexWrap: 'wrap', gap: 6,
    padding: '0 14px 10px',
    flexShrink: 0,
  },
  quickBtn: {
    background: '#f1f5f9',
    border: '1px solid rgba(8,145,178,0.2)',
    borderRadius: 20, padding: '5px 12px',
    color: '#0891b2', fontSize: 11, cursor: 'pointer',
    transition: 'background 0.2s, border-color 0.2s',
    whiteSpace: 'nowrap',
  },
  /* input */
  inputRow: {
    display: 'flex', alignItems: 'flex-end', gap: 8,
    padding: '10px 14px',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    background: '#f8fafc',
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 12,
    padding: '9px 12px',
    color: '#111827',
    fontSize: 13,
    lineHeight: 1.5,
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    maxHeight: 100,
    overflow: 'auto',
  },
  sendBtn: {
    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
    background: 'linear-gradient(135deg, #0891b2, #7c3aed)',
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#ffffff', transition: 'opacity 0.2s, transform 0.2s',
    boxShadow: '0 4px 12px rgba(8,145,178,0.2)',
  },
  poweredBy: {
    textAlign: 'center', fontSize: 10,
    color: '#9ca3af', padding: '6px 0 10px',
    flexShrink: 0,
    background: '#f8fafc',
  },
  /* FAB */
  fab: {
    position: 'fixed',
    bottom: 28, right: 24,
    width: 56, height: 56,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    zIndex: 9998,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #0891b2, #7c3aed)',
    boxShadow: '0 8px 24px rgba(8,145,178,0.3), 0 4px 12px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, box-shadow 0.2s',
  },
  /* pulse ring */
  pulseRing: {
    position: 'absolute',
    inset: -4,
    borderRadius: '50%',
    border: '2px solid rgba(8,145,178,0.4)',
    animation: 'chatPulse 1.4s ease-out infinite',
    pointerEvents: 'none',
  },
  /* badge */
  badge: {
    position: 'absolute',
    top: -2, right: -2,
    minWidth: 18, height: 18,
    borderRadius: 9,
    background: '#ef4444',
    border: '2px solid #ffffff',
    color: '#fff', fontSize: 10, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0 4px',
  },
}

/* ─── Keyframes (injected as a style tag) ───────────────────────────── */
const keyframes = `
@keyframes chatSlideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes chatTypingBounce {
  0%, 80%, 100% { transform: translateY(0);   opacity: 0.4; }
  40%           { transform: translateY(-5px); opacity: 1;   }
}
@keyframes chatPulse {
  0%   { transform: scale(1);   opacity: 0.8; }
  100% { transform: scale(1.7); opacity: 0;   }
}
.skewx-chat-iconbtn:hover {
  background: rgba(0,0,0,0.05) !important;
  color: #111827 !important;
}
.skewx-chat-quickbtn:hover {
  background: rgba(8,145,178,0.1) !important;
  border-color: rgba(8,145,178,0.3) !important;
}
`