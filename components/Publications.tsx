'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function Publications() {
  return (
    <section id="publications" className="py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="section-label"
        >
          05 — Publications
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          className="section-heading"
        >
          Academic <span className="gradient-text">Publications</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-10"
        >
          <div className="glass-card rounded-2xl border border-divider hover:border-accent/20 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-accent/5">
            <div className="flex">
              <div className="w-1 bg-gradient-accent flex-shrink-0" />
              <div className="flex gap-6 p-7 flex-1">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                  <i className="fa-solid fa-book-open text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <span className="font-mono text-xs text-accent tracking-wider">
                      International Research Journal of Engineering and Technology (IRJET)
                    </span>
                    <span className="font-mono text-xs text-muted flex-shrink-0">May 2023</span>
                  </div>

                  <h3 className="font-grotesk font-bold text-primary text-lg mb-2">
                    Research Publication in Engineering &amp; Technology
                  </h3>
                  <p className="text-muted text-sm italic mb-3">
                    Sathyapal Reddy Peddakkagari et al.
                  </p>
                  <p className="text-secondary text-sm leading-relaxed mb-5">
                    Published in IRJET — a peer-reviewed international journal covering engineering,
                    technology, and applied sciences. Represents undergraduate research completed
                    during B.Tech at Institute of Aeronautical Engineering.
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    <motion.a
                      href="https://www.irjet.net/archives/V10/i5/IRJET-V10I527.pdf"
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="btn-outline text-xs px-4 py-2"
                    >
                      <i className="fa-solid fa-file-pdf text-[10px]" />
                      View PDF
                    </motion.a>
                    <motion.a
                      href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-divider text-muted bg-surface2/50 hover:text-secondary hover:border-divider transition-all duration-200"
                    >
                      <i className="fa-brands fa-google text-[10px]" />
                      Google Scholar
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
