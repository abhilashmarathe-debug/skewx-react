import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef   = useRef(null)
  const followerRef = useRef(null)
  const canvasRef   = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const gsap = window.gsap
    if (!gsap) return

    const cursor   = cursorRef.current
    const follower = followerRef.current
    const canvas   = canvasRef.current
    if (!cursor || !follower || !canvas) return

    const supportsHover = window.matchMedia('(hover: hover)').matches
    if (!supportsHover) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let raf = 0

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function onMove(e) {
      gsap.to(cursor,   { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.25 })
      mouse.x = e.clientX
      mouse.y = e.clientY
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x, y: mouse.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
        })
      }
    }
    document.addEventListener('mousemove', onMove)

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.02
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${p.life})`; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${p.life * 0.1})`; ctx.fill()
      })
      particles = particles.filter(p => p.life > 0)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor"          ref={cursorRef}   />
      <div className="cursor-follower" ref={followerRef} />
      <canvas id="cursorCanvas" ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
    </>
  )
}
