'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { personal } from '@/data/portfolio'
import { assetPath } from '@/lib/assetPath'

type Highlight = { icon: string; title: string; sub: string }

const highlights: Highlight[] = [
  { icon: 'fa-solid fa-cloud',           title: 'Cloud-Scale Data Engineering', sub: 'AWS, Databricks, Snowflake, PySpark, Kafka'  },
  { icon: 'fa-solid fa-brain',           title: 'GenAI & ML Integration',       sub: 'LangChain, RAG, FAISS, BERT, LightGBM' },
  { icon: 'fa-solid fa-diagram-project', title: 'End-to-End AI Pipelines',      sub: 'FastAPI, OCR, python-docx, CI/CD' },
]

const inLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
const inRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0 } }
const ease    = [0.22, 1, 0.36, 1] as const

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.5) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(99,102,241,0.5) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={inLeft} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="section-label"
        >
          01 — About
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 items-start">

          {/* ── Left card ── */}
          <motion.div
            variants={inLeft} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="rounded-2xl glass-card border border-divider p-8 flex flex-col items-center gap-5 text-center sticky top-24">
              {/* Avatar — profile photo with gradient halo + spinning ring */}
              <motion.div
                className="relative w-56 h-56"
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {/* Decorative gradient halo behind the photo */}
                <div className="absolute inset-[-10px] rounded-full bg-gradient-accent opacity-70 blur-[16px]" />
                {/* Gradient ring (the visible border) */}
                <div className="absolute inset-0 rounded-full bg-gradient-accent p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface shadow-xl shadow-accent/30">
                    <Image
                      src={assetPath('/profile.jpg')}
                      alt={personal.name}
                      width={448}
                      height={448}
                      priority
                      sizes="224px"
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: '50% 30%' }}
                    />
                  </div>
                </div>
                {/* Spinning dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-14px] rounded-full border border-dashed border-accent/30 pointer-events-none"
                />
              </motion.div>

              <div className="space-y-1.5">
                <h3 className="font-grotesk font-bold text-primary text-xl leading-tight">{personal.shortName}</h3>
                <p className="text-secondary text-sm">{personal.title}</p>
                <p className="font-grotesk text-primary/90 text-sm">{personal.university}</p>
                <p className="text-muted text-xs flex items-center justify-center gap-1.5 pt-1">
                  <i className="fa-solid fa-location-dot text-accent text-[10px]" />
                  Fairfax, Virginia 22030
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right content ── */}
          <div>
            <motion.h2
              variants={inRight} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="section-heading"
            >
              Building the intersection of<br />
              <span className="gradient-text">Data & AI Engineering</span>
            </motion.h2>

            {personal.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={inRight} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease }}
                className="text-secondary text-base leading-relaxed mb-4"
              >
                {para}
              </motion.p>
            ))}

            {/* Highlight cards */}
            <div className="flex flex-col gap-3 mt-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-card border border-divider hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                    <i className={`${h.icon} text-sm`} />
                  </div>
                  <div>
                    <h4 className="font-grotesk font-semibold text-primary text-sm">{h.title}</h4>
                    <p className="text-muted text-xs mt-0.5">{h.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
