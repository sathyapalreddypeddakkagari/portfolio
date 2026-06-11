'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '@/data/portfolio'
import Link from 'next/link'
import type { Project } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const

const badgeStyles: Record<string, string> = {
  'Capstone':           'bg-gradient-accent text-white',
  'RAG Pipeline':       'bg-violet-500/15 border border-violet-500/30 text-violet-300',
  'FDA Regulatory AI':  'bg-red-500/15 border border-red-500/30 text-red-300',
  'OCR + LLM':          'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300',
  'ML Research':        'bg-sky-500/15 border border-sky-500/30 text-sky-300',
  'Clinical AI':        'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300',
  'NLP':                'bg-amber-500/15 border border-amber-500/30 text-amber-300',
  'Document AI':        'bg-orange-500/15 border border-orange-500/30 text-orange-300',
}

/* 3-D tilt wrapper */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref   = useRef<HTMLDivElement>(null)
  const mx    = useMotionValue(0)
  const my    = useMotionValue(0)
  const sx    = useSpring(mx, { stiffness: 280, damping: 28 })
  const sy    = useSpring(my, { stiffness: 280, damping: 28 })
  const rotX  = useTransform(sy, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotY  = useTransform(sx, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width  - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ item, index }: { item: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      className={item.featured ? 'col-span-full' : ''}
    >
      <TiltCard
        className={`h-full glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
          item.featured
            ? 'border-accent/25 shadow-2xl shadow-accent/10'
            : 'border-divider hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5'
        }`}
      >
        {/* Gradient top line */}
        <div className="h-px bg-gradient-accent opacity-70" />

        <div className={`h-full p-7 flex flex-col gap-5 ${item.featured ? 'lg:flex-row' : ''}`}>
          <div className="flex flex-col gap-4 flex-1">
            {/* Badges + date */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex flex-wrap gap-2">
                {item.badges.map(b => (
                  <span
                    key={b}
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      badgeStyles[b] ?? 'bg-surface2 text-muted border border-divider'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs text-muted flex-shrink-0">{item.period}</span>
            </div>

            <div>
              <h3 className="font-grotesk font-bold text-primary text-xl mb-1">{item.title}</h3>
              {item.org && (
                <p className="text-muted text-xs flex items-center gap-1.5">
                  <i className="fa-solid fa-building text-accent" /> {item.org}
                </p>
              )}
            </div>

            <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map(t => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-surface2 border border-divider text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto flex-wrap">
              <motion.a
                href={item.github}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="btn-outline text-xs px-4 py-2"
              >
                <i className="fab fa-github" /> GitHub
              </motion.a>
              {item.demo && (
                <motion.a
                  href={item.demo}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary text-xs px-4 py-2"
                  aria-label={`Open ${item.title} live demo in a new tab`}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>

          {/* Stats panel */}
          <div className={`${
            item.featured
              ? 'lg:w-72 bg-bg/60 rounded-xl p-5 border border-divider flex flex-col justify-center gap-5 flex-shrink-0'
              : 'flex gap-3 bg-bg/60 rounded-xl p-4 border border-divider'
          }`}>
            {item.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.3 + i * 0.09, ease }}
                className={`flex flex-col items-center text-center ${item.featured ? '' : 'flex-1'}`}
              >
                <span className={`font-grotesk font-bold text-2xl ${s.accent ? 'gradient-text' : 'text-primary'}`}>
                  {s.val}
                </span>
                <span className="text-muted text-[10px] mt-0.5 leading-tight">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="section-label"
        >
          04 — Featured Projects
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          className="section-heading"
        >
          Production <span className="gradient-text">AI Data Systems</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-base max-w-xl mb-14"
        >
          End-to-end AI data platforms — regulatory NLP, clinical ML on Spark, and document intelligence.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} item={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-12 flex justify-center"
        >
          <Link href="/work" className="btn-primary group">
            <i className="fa-solid fa-layer-group text-xs" />
            Explore all projects &amp; research
            <i className="fa-solid fa-arrow-right text-xs opacity-70" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
