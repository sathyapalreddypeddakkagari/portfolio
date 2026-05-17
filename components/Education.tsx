'use client'

import { motion } from 'framer-motion'
import { education, certifications } from '@/data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

export default function Education() {
  return (
    <section
      id="education"
      className="py-28 relative overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-divider to-transparent" />
        <div className="absolute left-[-6rem] top-12 w-72 h-72 rounded-full bg-accent/5 blur-[120px] dark:bg-accent/10" />
        <div className="absolute right-[-6rem] bottom-0 w-80 h-80 rounded-full bg-orange-500/[0.05] blur-[130px] dark:bg-orange-400/10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="section-label"
        >
          06 — Education
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          className="section-heading"
        >
          Academic <span className="gradient-text">Background</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-card rounded-2xl border border-divider hover:border-accent/20 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="h-0.5 bg-gradient-accent" />
              <div className="p-7">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                  <i className={`${edu.icon} text-xl`} />
                </div>

                {edu.current && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green/10 border border-green/25 text-green mb-3">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-green"
                    />
                    Current
                  </span>
                )}

                <h3 className="font-grotesk font-bold text-primary text-xl mb-1 leading-tight">{edu.school}</h3>
                <p className="text-secondary text-sm mb-2">{edu.degree}</p>
                <p className="font-mono text-xs text-muted mb-5">{edu.period}</p>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-muted uppercase tracking-widest font-medium">GPA</span>
                    <div className="font-grotesk font-bold text-3xl gradient-text mt-0.5">{edu.gpa}</div>
                  </div>
                  <span className="text-muted text-xs flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-accent text-[10px]" />
                    {edu.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted mb-5">Certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                className="flex items-center gap-4 p-4 glass-card rounded-xl border border-divider hover:border-accent/15 transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#FF6B35,#F7931E)' }}
                >
                  <i className="fa-solid fa-award text-white text-sm" />
                </div>
                <div>
                  <h4 className="font-grotesk font-semibold text-primary text-sm leading-tight">{cert.name}</h4>
                  <p className="text-muted text-xs mt-0.5">{cert.issuer} — {cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
