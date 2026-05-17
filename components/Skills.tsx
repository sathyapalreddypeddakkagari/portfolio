'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio'
import type { SkillColor } from '@/types'

const colorMap: Record<SkillColor, { tag: string; glow: string }> = {
  violet:  { tag: 'border-violet-500/20 bg-violet-500/[0.08] text-violet-700 dark:text-violet-300',   glow: 'hover:shadow-violet-500/10'  },
  sky:     { tag: 'border-sky-500/20 bg-sky-500/[0.08] text-sky-700 dark:text-sky-300',               glow: 'hover:shadow-sky-500/10'     },
  amber:   { tag: 'border-amber-500/20 bg-amber-500/[0.08] text-amber-700 dark:text-amber-300',       glow: 'hover:shadow-amber-500/10'   },
  emerald: { tag: 'border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-300', glow: 'hover:shadow-emerald-500/10' },
  rose:    { tag: 'border-rose-500/20 bg-rose-500/[0.08] text-rose-700 dark:text-rose-300',           glow: 'hover:shadow-rose-500/10'    },
}

const ease = [0.22, 1, 0.36, 1] as const

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 relative overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-divider to-transparent" />
        <div className="absolute -left-24 top-16 w-80 h-80 rounded-full bg-accent/5 blur-[120px] dark:bg-accent/10" />
        <div className="absolute right-[-8rem] bottom-[-4rem] w-[28rem] h-[28rem] rounded-full bg-cyan-500/[0.06] blur-[140px] dark:bg-accent2/10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="section-label"
        >
          02 — Skills
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          className="section-heading"
        >
          Technical <span className="gradient-text">Expertise</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-base max-w-xl mb-14"
        >
          A production-tested toolkit spanning cloud data engineering, GenAI, and end-to-end ML.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skills.map((group, gi) => {
            const c = colorMap[group.color]
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: gi * 0.08, ease }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass-card rounded-2xl p-6 border border-divider hover:border-accent/15 transition-all duration-300 hover:shadow-xl ${c.glow}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl" role="img" aria-label={group.label}>{group.icon}</span>
                  <h3 className="font-grotesk font-semibold text-primary text-sm">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ti) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.82 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: gi * 0.06 + ti * 0.03, ease }}
                      whileHover={{ scale: 1.07, transition: { duration: 0.12 } }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border cursor-default ${c.tag}`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
