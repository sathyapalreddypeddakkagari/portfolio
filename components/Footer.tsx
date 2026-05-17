'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { personal } from '@/data/portfolio'
import { assetPath } from '@/lib/assetPath'

export default function Footer() {
  return (
    <footer className="border-t border-divider bg-surface py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-black ring-1 ring-divider">
            <Image src={assetPath('/logo.png')} alt={personal.name} width={28} height={28} />
          </div>
          <span className="font-grotesk text-sm text-secondary">{personal.name}</span>
        </div>

        <p className="text-muted text-xs font-mono">
          Built with Next.js · TypeScript · Framer Motion — 2026
        </p>

        <div className="flex gap-3">
          {[
            { icon: 'fab fa-github',        href: personal.github,             label: 'GitHub'   },
            { icon: 'fab fa-linkedin-in',   href: personal.linkedin,           label: 'LinkedIn' },
            { icon: 'fa-solid fa-envelope', href: `mailto:${personal.email}`,  label: 'Email'    },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg border border-divider bg-surface2 flex items-center justify-center text-muted hover:border-accent/30 hover:text-accent transition-colors duration-200 text-xs"
            >
              <i className={s.icon} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}
