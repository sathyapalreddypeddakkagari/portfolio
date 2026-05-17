'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '@/data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

interface Field { id: string; label: string; type: string; placeholder: string; required: boolean }

const fields: Field[] = [
  { id: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your full name',                          required: true  },
  { id: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com',                          required: true  },
  { id: 'subject', label: 'Subject', type: 'text',  placeholder: 'AI Data Engineer role, project, opportunity...',  required: false },
]

export default function Contact() {
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1600)
    setTimeout(() => { setSent(false); (e.target as HTMLFormElement).reset() }, 4800)
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.04] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="section-label"
        >
          07 — Contact
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              className="section-heading"
            >
              Let&apos;s Build<br />the Next <span className="gradient-text">AI Data Platform</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-secondary text-base leading-relaxed mb-8"
            >
              Open to AI Data Engineer roles — building production data pipelines on AWS and
              Databricks, then layering LLMs, RAG, and ML to turn data into shipped intelligence.
              Let&apos;s connect.
            </motion.p>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-green/5 border border-green/20 mb-8"
            >
              <motion.span
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green flex-shrink-0"
              />
              <span className="text-green text-sm font-medium">
                Available for AI Data Engineer Roles — May 2026
              </span>
            </motion.div>

            {/* Contact rows */}
            <div className="space-y-3 mb-8">
              {[
                { icon: 'fa-solid fa-envelope',     label: 'Email',    val: personal.email, href: `mailto:${personal.email}` },
                { icon: 'fa-solid fa-phone',         label: 'Phone',    val: personal.phone, href: `tel:${personal.phone}` },
                { icon: 'fa-solid fa-location-dot', label: 'Location', val: 'Fairfax, VA — Open to Relocate', href: null },
              ].map((row, i) => {
                const inner = (
                  <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-divider hover:border-accent/20 transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                      <i className={`${row.icon} text-sm`} />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted uppercase tracking-widest font-medium">{row.label}</div>
                      <div className="text-primary text-sm font-medium mt-0.5">{row.val}</div>
                    </div>
                  </div>
                )
                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                  >
                    {row.href ? <a href={row.href}>{inner}</a> : inner}
                  </motion.div>
                )
              })}
            </div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-3"
            >
              {[
                { icon: 'fab fa-github',      label: 'GitHub',   href: personal.github   },
                { icon: 'fab fa-linkedin-in', label: 'LinkedIn', href: personal.linkedin  },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-outline text-sm px-5 py-2.5"
                >
                  <i className={s.icon} /> {s.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl border border-divider p-8 space-y-5"
            >
              {fields.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex flex-col gap-1.5"
                >
                  <label htmlFor={f.id} className="text-xs font-semibold text-muted uppercase tracking-wider">
                    {f.label}
                  </label>
                  <input
                    id={f.id} type={f.type} name={f.id}
                    placeholder={f.placeholder} required={f.required}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-divider text-primary text-sm placeholder:text-muted focus:outline-none focus:border-accent/40 focus:bg-surface2 transition-all duration-200"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.44 }}
                className="flex flex-col gap-1.5"
              >
                <label htmlFor="message" className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  placeholder="Tell me about the role, team, or data platform you're building..."
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-divider text-primary text-sm placeholder:text-muted focus:outline-none focus:border-accent/40 focus:bg-surface2 transition-all duration-200 resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.52 }}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="w-full py-3 rounded-xl text-center text-sm font-semibold bg-green/10 border border-green/25 text-green flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-check" /> Message Sent!
                    </motion.div>
                  ) : (
                    <motion.button
                      key="send" type="submit" disabled={loading}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="btn-primary w-full justify-center py-3 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <motion.i
                            className="fa-solid fa-spinner"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <><i className="fa-solid fa-paper-plane" /> Send Message</>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
