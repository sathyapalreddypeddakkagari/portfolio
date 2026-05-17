'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '@/data/portfolio'
import type { ExperienceItem } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const

function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease }}
      className="relative"
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.25, type: 'spring', stiffness: 300 }}
        className="absolute left-0 top-7 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-accent border-2 border-bg shadow-lg shadow-accent/40"
      />

      {/* Card */}
      <div className="ml-8 glass-card rounded-2xl border border-divider p-7 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
        <div className="flex flex-wrap justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
              <i className={`${item.icon} text-lg`} />
            </div>
            <div>
              <h3 className="font-grotesk font-bold text-primary text-xl leading-tight">{item.role}</h3>
              <p className="text-muted text-sm mt-0.5">{item.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-xs text-muted flex items-center gap-1.5">
              <i className="fa-regular fa-calendar text-accent text-[10px]" /> {item.period}
            </span>
            {item.active ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green/10 border border-green/25 text-green">
                Active
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-surface2 border border-divider text-muted">
                {item.type}
              </span>
            )}
          </div>
        </div>

        {item.project && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/5 border-l-2 border-accent mb-5 text-sm">
            <i className="fa-solid fa-robot text-accent text-xs" />
            <span className="text-accent font-medium">{item.project}</span>
          </div>
        )}

        <ul className="space-y-3 mb-5">
          {item.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 + 0.35 + i * 0.07 }}
              className="flex gap-3 text-sm text-secondary leading-relaxed"
            >
              <span className="text-accent mt-[3px] flex-shrink-0 text-xs">▸</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: bullet.replace(
                    /(\d+%)/g,
                    '<strong class="text-accent font-semibold">$1</strong>',
                  ),
                }}
              />
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-surface2 border border-divider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="section-label"
        >
          03 — Experience
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          className="section-heading"
        >
          Professional <span className="gradient-text">Journey</span>
        </motion.h2>

        <div ref={ref} className="relative mt-12 pl-px">
          {/* Track + animated fill */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent via-accent2 to-cyan"
          />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <TimelineCard key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
