'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { personal, typingPhrases } from '@/data/portfolio'
import { assetPath } from '@/lib/assetPath'

/* ── Typing hook ─────────────────────────────────────────────────────────── */
function useTyping(phrases: string[]) {
  const [text,      setText]      = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    const delay = deleting
      ? text.length === 0 ? 420 : 28
      : text.length === current.length ? 2200 : 52

    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1))
        else setDeleting(true)
      } else {
        if (text.length > 0) setText(current.slice(0, text.length - 1))
        else { setDeleting(false); setPhraseIdx(i => (i + 1) % phrases.length) }
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, phraseIdx, phrases])

  return text
}

/* ── Neural canvas ───────────────────────────────────────────────────────── */
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    class Node {
      x: number; y: number; vx: number; vy: number; r: number; op: number
      constructor() {
        this.x  = Math.random() * canvas!.width
        this.y  = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.45
        this.vy = (Math.random() - 0.5) * 0.45
        this.r  = Math.random() * 2.5 + 1
        this.op = Math.random() * 0.45 + 0.2
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > canvas!.width)  this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
      }
    }

    resize()
    const nodes = Array.from({ length: 55 }, () => new Node())

    const draw = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      nodes.forEach(n => {
        n.update()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${n.op})`
        ctx.fill()
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 160) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 160) * 0.22})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return <canvas ref={ref} id="hero-canvas" />
}

/* ── Word animation ──────────────────────────────────────────────────────── */
const wordVariants = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

type HeroStat = { val: string; label: string }

const heroStats: HeroStat[] = [
  { val: '3.96', label: 'GPA'         },
  { val: '3+',   label: 'Projects'    },
  { val: '1',    label: 'Publication' },
  { val: '2026', label: 'Graduating'  },
]

export default function Hero() {
  const typedText = useTyping(typingPhrases)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <NeuralCanvas />

      {/* Radial glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent2/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 items-center">

        {/* ── Avatar column ── */}
        <div className="flex flex-col items-center gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-accent/30 shadow-2xl shadow-accent/30 bg-black flex items-center justify-center">
              <Image
                src={assetPath('/logo.png')}
                alt={`${personal.name} logo`}
                width={160}
                height={160}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            {/* Pulsing rings */}
            {[1, 1.18, 1.36].map((scale, i) => (
              <motion.div
                key={i}
                animate={{ scale: [scale, scale + 0.12, scale], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border border-accent/30"
              />
            ))}
            {/* Online dot */}
            <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-green border-[3px] border-bg shadow-lg shadow-green/50">
              <motion.div
                animate={{ scale: [1, 2.2, 1], opacity: [0.9, 0, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-green"
              />
            </div>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green/25 bg-green/5 text-green text-xs font-medium">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green flex-shrink-0"
              />
              Open to AI Data Engineer Roles
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3"
          >
            {[
              { icon: 'fab fa-github',        href: personal.github,              label: 'GitHub'   },
              { icon: 'fab fa-linkedin-in',   href: personal.linkedin,            label: 'LinkedIn' },
              { icon: 'fa-solid fa-envelope', href: `mailto:${personal.email}`,   label: 'Email'    },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center border border-divider bg-surface text-muted hover:border-accent/40 hover:text-accent transition-colors duration-200 text-sm"
              >
                <i className={s.icon} />
              </motion.a>
            ))}
          </motion.div>

          {/* Meta chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-2 text-xs text-muted"
          >
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot text-accent text-[10px]" />
              Fairfax, VA — Open to Relocate
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-graduation-cap text-accent text-[10px]" />
              GPA {personal.gpa} / 4.0
            </span>
          </motion.div>
        </div>

        {/* ── Text column ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-label mb-5"
          >
            Hello, I'm
          </motion.p>

          {/* Animated name words */}
          <h1 className="font-grotesk text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] mb-6 tracking-tight">
            {['Sathyapal', 'Reddy.'].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-4 ${i === 1 ? 'gradient-text' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Typing line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-lg text-muted mb-6 min-h-[2em]"
          >
            <span className="font-medium">I&apos;m a</span>
            <span className="gradient-text font-grotesk font-semibold">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'steps(1)' }}
              className="text-accent font-light"
            >
              |
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-secondary text-base leading-relaxed max-w-[560px] mb-10"
          >
            AI Data Engineer building production data pipelines that ship intelligence —
            from FDA regulatory AI to large-scale clinical ML on Databricks. MS Data Analytics
            Engineering at George Mason University. Open to AI Data Engineer roles.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary group"
            >
              <i className="fa-solid fa-flask-vial text-xs" />
              View Projects
              <motion.i
                className="fa-solid fa-arrow-right text-xs opacity-70"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.a>
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary group"
              aria-label="View resume on LinkedIn"
            >
              <i className="fa-solid fa-file-lines text-xs" />
              Resume
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-70" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-8"
          >
            {heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.08 }}
                className="flex flex-col"
              >
                <span className="font-grotesk text-2xl font-bold gradient-text">{s.val}</span>
                <span className="text-xs text-muted mt-0.5">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono tracking-widest uppercase text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-divider flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.a>
    </section>
  )
}
