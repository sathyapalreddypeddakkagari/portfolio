'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects, researchCollabs } from '@/data/portfolio'
import PhotoTile from './PhotoTile'

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectsResearchView() {
  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/3 top-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] dark:bg-accent/10" />
          <div className="absolute right-1/4 top-20 w-[420px] h-[420px] rounded-full bg-accent2/5 blur-[130px] dark:bg-accent2/10" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8">
            <i className="fa-solid fa-arrow-left text-xs" /> Back to portfolio
          </Link>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="section-label">
            Portfolio — Deep Dive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
            className="font-grotesk text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Projects &amp; <span className="gradient-text">Research</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-secondary text-base leading-relaxed max-w-2xl mt-5"
          >
            A closer look at the production AI data systems I&apos;ve built and the research &amp;
            milestones behind them.
          </motion.p>
        </div>
      </section>

      <section className="py-14 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="section-heading mb-0">Selected <span className="gradient-text">Projects</span></h2>
            <span className="font-mono text-xs text-muted flex-shrink-0">{projects.length} builds</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-2xl overflow-hidden glass-card border border-divider hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
              >
                <div className="relative">
                  <PhotoTile src={p.image} alt={p.title} icon="fa-solid fa-diagram-project" fit="contain" rounded="rounded-none" className="aspect-[16/9] w-full" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/45 backdrop-blur-sm text-white border border-white/15">
                    {p.badges[0]}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-grotesk font-bold text-primary text-lg leading-tight">{p.title}</h3>
                    <span className="font-mono text-[11px] text-muted flex-shrink-0 mt-1">{p.period}</span>
                  </div>
                  {p.org && (
                    <p className="text-muted text-xs flex items-center gap-1.5 -mt-1">
                      <i className="fa-solid fa-building text-accent" /> {p.org}
                    </p>
                  )}
                  <p className="text-secondary text-sm leading-relaxed line-clamp-2">{p.tagline ?? p.desc}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface2 border border-divider text-muted">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-2.5 mt-auto pt-2">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-3.5 py-2">
                      <i className="fab fa-github" /> Code
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-3.5 py-2" aria-label={`Open ${p.title} live demo`}>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-divider to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-heading">Milestones &amp; <span className="gradient-text">Highlights</span></h2>
          <p className="text-muted text-base max-w-xl mb-10">
            Beyond the code — achievements, events and experiences that shaped my path.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {researchCollabs.map((r, i) => (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-2xl overflow-hidden glass-card border border-divider hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
              >
                <PhotoTile src={r.image} alt={r.title} icon={r.icon} fit="cover" rounded="rounded-none" className="aspect-[16/9] w-full" />
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="w-10 h-10 -mt-11 relative z-10 rounded-xl bg-accent/15 border border-accent/25 backdrop-blur-sm flex items-center justify-center text-accent">
                    <i className={`${r.icon} text-base`} />
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-primary text-base leading-tight">{r.title}</h3>
                    {r.org && <p className="text-muted text-xs mt-0.5">{r.org}</p>}
                    <p className="font-mono text-[11px] text-accent mt-1">{r.period}</p>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed line-clamp-2">{r.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface2 border border-divider text-muted">{t}</span>
                    ))}
                  </div>
                  {r.links.length > 0 && (
                    <div className="flex gap-2.5 mt-auto pt-2 flex-wrap">
                      {r.links.map(l => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-3.5 py-2">
                          <i className={`${l.icon} text-[10px]`} /> {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/" className="btn-outline group">
              <i className="fa-solid fa-arrow-left text-xs" /> Back to portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
