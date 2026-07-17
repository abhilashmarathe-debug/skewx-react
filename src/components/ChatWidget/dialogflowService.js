/**
 * Dialogflow Service  ─  Frontend Layer
 * ──────────────────────────────────────
 * Calls the local Express proxy (backend/server.js) which holds the
 * service-account key and talks to Dialogflow on behalf of the browser.
 *
 * KEY FIX: sendMessage now accepts an optional `eventName` parameter.
 * On chat init / reset, pass eventName = 'WELCOME' to fire the Dialogflow
 * welcome intent and establish the correct conversation context - this
 * prevents the Default Fallback Intent from firing on the first user reply.
 *
 * Backend proxy payload shape:
 *   Event trigger  → { sessionId, event: 'WELCOME' }
 *   Text message   → { sessionId, message: 'user text' }
 *
 * Live mode response shape expected from the proxy:
 * {
 *   reply:       string,
 *   options?:    string[],   // capsule chips shown beneath the bot bubble
 *   intent?:     string,
 *   parameters?: object,
 *   confidence?: number,
 * }
 *
 * To switch from demo → live:
 *   Set VITE_DIALOGFLOW_ENDPOINT in your .env file, e.g.:
 *     VITE_DIALOGFLOW_ENDPOINT=http://localhost:3001/chat
 */

// ── Endpoint (set in .env) ─────────────────────────────────────────────
const ENDPOINT = import.meta.env.VITE_DIALOGFLOW_ENDPOINT || ''

// ── Session ID (unique per browser tab, regenerated on resetSession) ───
function getSessionId() {
  let id = sessionStorage.getItem('skewx_chat_session')
  if (!id) {
    id = `skewx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem('skewx_chat_session', id)
  }
  return id
}

// ── Fallback content (used when backend is not yet connected) ──────────

// Mirrors the Dialogflow Default Welcome Intent so the UI looks correct
// even in demo mode.
const FALLBACK_WELCOME = {
  text:    "Welcome to SkewX Technologies 👋\n\nWe help businesses automate operations using AI.\n\nMay I know your name?",
  options: null,
  intent:  'Default Welcome Intent',
}

// Cycled through for every subsequent user message in demo mode.
const FALLBACK_REPLIES = [
  {
    text:    "Thanks for reaching out! What brings you to SkewX today?",
    options: ['Book a Demo', 'AI Services', 'Pricing', 'General Inquiry'],
  },
  {
    text:    "SkewX specialises in AI automation - chatbots, intelligent document processing, agents, and more. Which area interests you most?",
    options: ['AI Chatbots', 'AI Automation', 'Custom AI Solution', 'Not Sure Yet'],
  },
  {
    text:    "I'd love to connect you with the right person. What would you prefer?",
    options: ['Book a Free Demo', 'Talk to Sales', 'Read Case Studies'],
  },
  {
    text:    "We work with businesses to cut manual workload through custom AI solutions. Tell me more about your current pain points!",
    options: null,
  },
  {
    text:    "You can also book a demo directly on our site - it's the fastest way to speak with our AI consultants.",
    options: ['Book Now', 'Maybe Later'],
  },
]
let _fallbackIdx = 0

// ── Main send function ─────────────────────────────────────────────────
/**
 * sendMessage(text, eventName?)
 *   → { reply, options?, intent?, parameters?, confidence? }
 *
 * @param {string}      text       - User's message text (ignored when eventName is set)
 * @param {string|null} eventName  - Dialogflow event name, e.g. 'WELCOME'.
 *                                   Pass on chat init and reset; null for normal turns.
 *
 * When `eventName` is provided the proxy receives { sessionId, event }
 * instead of { sessionId, message }, so Dialogflow fires the matching
 * intent and sets up the right followup context before the user speaks.
 *
 * Throws on network / server error - caller should catch and show errorMsg.
 */
export async function sendMessage(text, eventName = null) {

  /* ── DEMO MODE (no backend configured yet) ─────────────────────── */
  if (!ENDPOINT) {
    // Simulate network latency
    await new Promise(r => setTimeout(r, 700 + Math.random() * 400))

    // Welcome event → return the welcome fallback (mirrors real Dialogflow)
    if (eventName) {
      return {
        reply:   FALLBACK_WELCOME.text,
        options: FALLBACK_WELCOME.options,
        intent:  FALLBACK_WELCOME.intent,
      }
    }

    // Normal turn → cycle through fallback replies
    const item = FALLBACK_REPLIES[_fallbackIdx++ % FALLBACK_REPLIES.length]
    return {
      reply:   item.text,
      options: item.options ?? null,
      intent:  null,
    }
  }

  /* ── LIVE MODE ─────────────────────────────────────────────────── */

  // Build payload: send EITHER an event OR a text message - never both.
  // The Express proxy must read `event` and call Dialogflow's detectIntent
  // with queryInput.event instead of queryInput.text.
  const payload = eventName
    ? { sessionId: getSessionId(), event: eventName }
    : { sessionId: getSessionId(), message: text }

  let response
  try {
    response = await fetch(ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
  } catch (networkErr) {
    throw new Error(`Network error: ${networkErr.message}`)
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Proxy error ${response.status}: ${body || response.statusText}`)
  }

  const data = await response.json()

  if (data.error) throw new Error(data.error)

  // Accept either `options` or the legacy `quick_replies` key
  const options =
    (Array.isArray(data.options)       ? data.options       : null) ??
    (Array.isArray(data.quick_replies) ? data.quick_replies : null)

  return {
    reply:      data.reply      || "Sorry, I didn't get a response.",
    options,
    intent:     data.intent     || null,
    parameters: data.parameters || null,
    confidence: data.confidence ?? 0,
  }
}

// ── Reset Dialogflow session ───────────────────────────────────────────
/**
 * Wipes the stored session ID so the next sendMessage call creates a
 * brand-new Dialogflow session.  Call this BEFORE re-triggering 'WELCOME'.
 */
export function resetSession() {
  sessionStorage.removeItem('skewx_chat_session')
}