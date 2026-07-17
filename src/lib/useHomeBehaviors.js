import { useEffect } from 'react'

/**
 * Re-implements the original home.html JavaScript behaviors against
 * the rendered DOM. The converted JSX preserves all the IDs the
 * scripts target, so we hook into them after mount.
 *
 * Returns nothing - purely side effects on the DOM.
 *
 * pushROISnapshot: function (from AppContext) used to copy the live
 * calculator values into the ROI modal whenever they change.
 */
export default function useHomeBehaviors({ pushROISnapshot }) {

  // ===== ROI CALCULATOR =====
  useEffect(() => {
    const INR_RATE = 83
    const PLATFORM_USD = 95988

    const $ = (id) => document.getElementById(id)
    const docs       = $('rc-docs')
    const cost       = $('rc-cost')
    const error      = $('rc-error')
    const errorCost  = $('rc-errorCost')
    const currency   = $('rc-currency')
    if (!docs || !cost || !error || !errorCost || !currency) return

    function fmt(val, sym) {
      const abs = Math.abs(val)
      let str
      if      (abs >= 1e6) str = (abs / 1e6).toFixed(2) + 'M'
      else if (abs >= 1e3) str = (abs / 1e3).toFixed(1) + 'K'
      else                 str = Math.round(abs).toString()
      return (val < 0 ? '-' : '') + sym + str
    }

    function calculate() {
      const cur  = currency.value
      const sym  = cur === 'inr' ? '₹' : '$'
      const rate = cur === 'inr' ? INR_RATE : 1

      const d  = parseInt(docs.value)
      const c  = parseFloat(cost.value)
      const er = parseFloat(error.value) / 100
      const ec = parseFloat(errorCost.value)

      const manualSave = d * 12 * c  * 0.80
      const errSave    = d * 12 * er * ec * 0.90
      const net        = (manualSave + errSave - PLATFORM_USD) * rate

      $('rc-docsVal')      && ($('rc-docsVal').textContent      = d.toLocaleString())
      $('rc-costVal')      && ($('rc-costVal').textContent      = sym + Math.round(c * rate))
      $('rc-errorVal')     && ($('rc-errorVal').textContent     = Math.round(er * 100) + '%')
      $('rc-errorCostVal') && ($('rc-errorCostVal').textContent = sym + Math.round(ec * rate).toLocaleString())

      const totalEl = $('rc-total')
      if (totalEl) {
        totalEl.textContent = fmt(net, sym)
        totalEl.className = net >= 0
          ? 'text-4xl md:text-5xl font-bold text-cyan-400 mb-1 tabular-nums transition-colors duration-300'
          : 'text-4xl md:text-5xl font-bold text-red-400 mb-1 tabular-nums transition-colors duration-300'
      }

      const monthlyGross = (manualSave + errSave) / 12
      const months = monthlyGross > 0
        ? Math.max(1, Math.round(PLATFORM_USD / monthlyGross))
        : null
      const payback = $('rc-payback')
      if (payback) {
        payback.innerHTML = months
          ? 'Payback period: <span class="text-gray-400">' + months + ' month' + (months !== 1 ? 's' : '') + '</span>'
          : 'Payback period: <span class="text-gray-400">adjust inputs above</span>'
      }

      const manualEl   = $('rc-manual')
      const errSaveEl  = $('rc-errSave')
      const platformEl = $('rc-platform')
      const netEl      = $('rc-net')
      if (manualEl)   manualEl.textContent   = fmt(manualSave * rate, sym)
      if (errSaveEl)  errSaveEl.textContent  = fmt(errSave * rate, sym)
      if (platformEl) platformEl.textContent = '-' + sym + Math.round(PLATFORM_USD * rate).toLocaleString()
      if (netEl) {
        netEl.textContent = fmt(net, sym)
        netEl.className = 'tabular-nums ' + (net >= 0 ? 'text-green-400' : 'text-red-400')
      }

      const gross = manualSave + errSave
      const barM = $('rc-bar-manual')
      const barE = $('rc-bar-err')
      if (barM) barM.style.width = gross > 0 ? Math.min(100, (manualSave / gross) * 100).toFixed(1) + '%' : '0%'
      if (barE) barE.style.width = gross > 0 ? Math.min(100, (errSave    / gross) * 100).toFixed(1) + '%' : '0%'

      // Push snapshot to the React app state so ROI modal can read it
      pushROISnapshot && pushROISnapshot({
        total:  totalEl ? totalEl.textContent : '-',
        manual: manualEl ? manualEl.textContent : '-',
        err:    errSaveEl ? errSaveEl.textContent : '-',
        net:    netEl ? netEl.textContent : '-',
      })
    }

    const inputs = [docs, cost, error, errorCost, currency]
    inputs.forEach(el => el.addEventListener('input', calculate))
    calculate()

    return () => inputs.forEach(el => el.removeEventListener('input', calculate))
  }, [pushROISnapshot])


  // ===== PRICING TOGGLE (top-of-page tier toggle) =====
  useEffect(() => {
    const priceElements = document.querySelectorAll('.price')
    const toggleBtns    = document.querySelectorAll('.toggle-btn')
    const currencyBtns  = document.querySelectorAll('.currency-btn')
    if (!priceElements.length && !toggleBtns.length) return

    let billing  = 'monthly'
    let currency = 'usd'
    const USD_TO_INR = 83

    function formatNumber(num) { return num.toLocaleString('en-IN') }

    function updatePrices() {
      priceElements.forEach(el => {
        const usd = parseFloat(el.dataset.usd)
        const inr = parseFloat(el.dataset.inr)
        let value = currency === 'usd' ? usd : (inr || usd * USD_TO_INR)
        if (billing === 'annual') value *= 0.8
        const symbol = currency === 'usd' ? '$' : '₹'
        el.textContent = symbol + formatNumber(Math.round(value))
      })
      document.querySelectorAll('.pricing-card p.text-gray-500').forEach(el => {
        if (el.textContent.includes('/mo') || el.textContent.includes('/yr')) {
          el.textContent = billing === 'monthly' ? '/mo' : '/yr'
        }
      })
    }

    const tHandlers = []
    toggleBtns.forEach((btn, i) => {
      const handler = () => {
        toggleBtns.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        billing = i === 0 ? 'monthly' : 'annual'
        updatePrices()
      }
      btn.addEventListener('click', handler)
      tHandlers.push([btn, handler])
    })

    const cHandlers = []
    currencyBtns.forEach((btn, i) => {
      const handler = () => {
        currencyBtns.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        currency = i === 0 ? 'usd' : 'inr'
        updatePrices()
      }
      btn.addEventListener('click', handler)
      cHandlers.push([btn, handler])
    })

    updatePrices()

    return () => {
      tHandlers.forEach(([b, h]) => b.removeEventListener('click', h))
      cHandlers.forEach(([b, h]) => b.removeEventListener('click', h))
    }
  }, [])


  // ===== PRICING (pr-) - the 2nd pricing block with Starter/Growth/Enterprise =====
  useEffect(() => {
    const INR = 83
    const DISC = 0.85
    const plans = {
      starter: { usd: 2499, inr: 207417 },
      growth:  { usd: 7999, inr: 663917 },
    }
    const entBase = { usd: 15000, inr: 1245000 }

    const billingRoot  = document.getElementById('pr-billing')
    const currencyRoot = document.getElementById('pr-currency')
    if (!billingRoot || !currencyRoot) return

    let billing  = 'monthly'
    let currency = 'usd'

    function fmt(n) { return Math.round(n).toLocaleString('en-US') }

    function update() {
      const disc = billing === 'annual' ? DISC : 1
      const sym  = currency === 'inr' ? '₹' : '$'

      document.querySelectorAll('.pr-sym').forEach(el => { el.textContent = sym })

      ;['starter', 'growth'].forEach(plan => {
        const val = plans[plan][currency] * disc
        const valEl = document.getElementById('pr-val-' + plan)
        if (valEl) valEl.textContent = fmt(val)
        const cad = document.getElementById('pr-cad-' + plan)
        if (cad) {
          if (billing === 'annual') {
            cad.innerHTML = '/mo &nbsp;<span style="font-size:10px;color:#4ade80;background:rgba(74,222,128,0.1);border:0.5px solid rgba(74,222,128,0.25);padding:2px 7px;border-radius:99px;">billed annually</span>'
          } else {
            cad.textContent = '/mo'
          }
        }
      })

      const entVal = entBase[currency] * disc
      const entEl = document.getElementById('pr-ent-base')
      if (entEl) entEl.innerHTML = sym + fmt(entVal)

      const saveTag = document.getElementById('pr-save-tag')
      if (saveTag) saveTag.classList.toggle('hidden', billing !== 'annual')
    }

    const onBilling = (e) => {
      const btn = e.target.closest('.pr-toggle')
      if (!btn) return
      billingRoot.querySelectorAll('.pr-toggle').forEach(b => { b.classList.remove('active'); b.classList.add('text-gray-400') })
      btn.classList.add('active'); btn.classList.remove('text-gray-400')
      billing = btn.dataset.val
      update()
    }
    const onCurrency = (e) => {
      const btn = e.target.closest('.pr-toggle')
      if (!btn) return
      currencyRoot.querySelectorAll('.pr-toggle').forEach(b => { b.classList.remove('active'); b.classList.add('text-gray-400') })
      btn.classList.add('active'); btn.classList.remove('text-gray-400')
      currency = btn.dataset.val
      update()
    }

    billingRoot.addEventListener('click', onBilling)
    currencyRoot.addEventListener('click', onCurrency)
    update()

    return () => {
      billingRoot.removeEventListener('click', onBilling)
      currencyRoot.removeEventListener('click', onCurrency)
    }
  }, [])


  // ===== IMPACT COUNTERS (count-up) =====
  useEffect(() => {
    const grid = document.getElementById('impactGrid')
    if (!grid) return

    function animateCount(el) {
      const target = parseFloat(el.dataset.target)
      const suffix = el.dataset.suffix || ''
      const duration = 1400
      const start = performance.now()
      function step(now) {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        const val = target * ease
        el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = (Number.isInteger(target) ? target : target + suffix)
      }
      requestAnimationFrame(step)
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        grid.querySelectorAll('.count-up').forEach(animateCount)
        grid.querySelectorAll('.card-bar').forEach(bar => {
          bar.style.width = bar.dataset.width + '%'
        })
        obs.disconnect()
      })
    }, { threshold: 0.3 })

    obs.observe(grid)
    return () => obs.disconnect()
  }, [])


  // ===== PROCESS LINE + CARD REVEAL =====
  useEffect(() => {
    const section = document.querySelector('.process-premium')
    if (!section) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        section.querySelectorAll('.process-card').forEach(card => {
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        })
        const line = section.querySelector('.process-line')
        if (line) line.style.width = '100%'
        obs.disconnect()
      })
    }, { threshold: 0.25 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [])


  // ===== PROCESS STEPS FLOAT =====
  useEffect(() => {
    const gsap = window.gsap
    if (!gsap) return
    const steps = document.querySelectorAll('.process-step')
    if (!steps.length) return
    gsap.to('.process-step', {
      y: -10, duration: 2, repeat: -1, yoyo: true, stagger: 0.2, ease: 'sine.inOut',
    })
  }, [])


  // ===== FADE-UP scroll reveals =====
  useEffect(() => {
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger
    if (!gsap || !ScrollTrigger) return
    gsap.registerPlugin(ScrollTrigger)
    const els = document.querySelectorAll('.fade-up')
    if (!els.length) return
    els.forEach(el => {
      gsap.from(el, { y: 60, opacity: 0, duration: 0.8, scrollTrigger: el })
    })
  }, [])
}
