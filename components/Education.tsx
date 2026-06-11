'use client'

import { motion } from 'framer-motion'
import { education, certifications } from '@/data/portfolio'
import { assetPath } from '@/lib/assetPath'

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
          Degrees &amp; <span className="gradient-text">Education</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-12">
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
              <div className="p-8 flex flex-col items-center text-center">
                {/* University logo */}
                <div className="h-28 w-full flex items-center justify-center mb-6">
                  {edu.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={assetPath(edu.logo)}
                      alt={`${edu.school} logo`}
                      loading="lazy"
                      className="h-28 w-auto max-w-[180px] object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <i className={`${edu.icon} text-2xl`} />
                    </div>
                  )}
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

                <h3 className="font-grotesk font-bold text-primary text-xl leading-tight">{edu.school}</h3>
                <p className="text-muted text-sm italic mt-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-accent text-[10px]" />
                  {edu.location}
                </p>

                <div className="w-12 h-px bg-divider my-5" />

                <p className="text-secondary text-sm font-medium">{edu.degree}</p>
                <p className="font-mono text-xs text-muted mt-1.5">{edu.period}</p>

                <div className="mt-4">
                  <span className="text-[10px] text-muted uppercase tracking-widest font-medium">GPA</span>
                  <div className="font-grotesk font-bold text-3xl gradient-text mt-0.5">{edu.gpa}</div>
                </div>

                {edu.thesis && (
                  <p className="text-muted text-xs italic mt-4 leading-relaxed max-w-sm">
                    Thesis: {edu.thesis}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Relevant Coursework */}
        {education.some(e => e.coursework && e.coursework.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mb-12"
          >
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-5">Relevant Coursework</p>
            <div className="flex flex-wrap gap-2.5">
              {education
                .flatMap(e => e.coursework ?? [])
                .map((course, i) => (
                  <motion.span
                    key={course}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium glass-card border border-divider text-secondary hover:border-accent/25 hover:text-primary transition-all duration-200"
                  >
                    <i className="fa-solid fa-book text-accent text-[11px]" />
                    {course}
                  </motion.span>
                ))}
            </div>
          </motion.div>
        )}

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted mb-5">Certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => {
              const CardInner = (
                <>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-divider overflow-hidden p-1.5">
                    {cert.badge ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={assetPath(cert.badge)}
                        alt={`${cert.name} badge`}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#FF6B35,#F7931E)' }}
                      >
                        <i className="fa-solid fa-award text-white text-sm" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-grotesk font-semibold text-primary text-sm leading-tight">{cert.name}</h4>
                    <p className="text-muted text-xs mt-0.5">{cert.issuer} — {cert.date}</p>
                    {cert.link && (
                      <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-medium text-accent">
                        View badge <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                      </span>
                    )}
                  </div>
                </>
              )

              const baseClass =
                'flex items-center gap-4 p-4 glass-card rounded-xl border border-divider hover:border-accent/25 transition-all duration-200'

              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                >
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClass} hover:shadow-lg hover:shadow-accent/5`}
                    >
                      {CardInner}
                    </a>
                  ) : (
                    <div className={baseClass}>{CardInner}</div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
