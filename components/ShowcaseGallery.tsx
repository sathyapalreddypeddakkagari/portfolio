'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery } from '@/data/portfolio'
import type { GalleryItem } from '@/types'
import PhotoTile from './PhotoTile'

const ease = [0.22, 1, 0.36, 1] as const

export default function ShowcaseGallery() {
  const pausedRef = useRef(false)
  const [active, setActive] = useState<GalleryItem | null>(null)
  const [visible, setVisible] = useState(3)
  const [index, setIndex] = useState(0)

  const total = gallery.length

  // Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const maxIndex = Math.max(0, total - visible)

  // Keep index in range when the visible count changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => {
        const next = i + dir
        if (next > maxIndex) return 0
        if (next < 0) return maxIndex
        return next
      })
    },
    [maxIndex]
  )

  // Auto-advance one card at a time (out left, in right)
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current && !active) go(1)
    }, 3800)
    return () => clearInterval(id)
  }, [go, active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const pages = maxIndex + 1

  return (
    <section id="gallery" className="py-28 relative overflow-hidden bg-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-divider to-transparent" />
        <div className="absolute left-1/4 top-10 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px] dark:bg-accent/10" />
        <div className="absolute right-1/4 bottom-0 w-[420px] h-[420px] rounded-full bg-accent2/5 blur-[130px] dark:bg-accent2/10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-label">
          07 — Gallery
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          className="section-heading"
        >
          Research &amp; <span className="gradient-text">Collaborations</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-base max-w-xl mb-4"
        >
          A visual tour of my projects, publication and industry collaborations. Tap any card for the full story.
        </motion.p>
      </div>

      <div
        className="max-w-6xl mx-auto px-6 relative mt-8"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="hidden sm:flex flex-shrink-0 w-11 h-11 rounded-full items-center justify-center glass-card border border-divider text-secondary hover:text-accent hover:border-accent/40 transition-all"
          >
            <i className="fa-solid fa-chevron-left text-sm" />
          </button>

          {/* Viewport: exactly `visible` cards shown at once */}
          <div className="overflow-hidden flex-1 py-4">
            <motion.div
              className="flex"
              animate={{ x: `-${(index * 100) / total}%` }}
              transition={{ duration: 0.6, ease }}
              style={{ width: `${(total / visible) * 100}%` }}
            >
              {gallery.map((g) => (
                /* Each slot is exactly trackWidth/total; gutter lives inside via padding
                   so the percentage translate stays pixel-aligned. */
                <div key={g.title} className="px-3" style={{ flex: `0 0 ${100 / total}%` }}>
                  <button
                    onClick={() => setActive(g)}
                    className="group relative w-full text-left rounded-xl overflow-hidden border border-divider hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
                  >
                    <PhotoTile src={g.src} alt={g.title} icon={g.icon} fit="cover" rounded="rounded-none" className="aspect-[4/3] w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm text-white border border-white/20">
                      {g.tag}
                    </span>
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <h3 className="font-grotesk font-bold text-white text-lg leading-tight">{g.title}</h3>
                      <p className="text-white/80 text-xs mt-1">{g.caption}</p>
                      <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read more <i className="fa-solid fa-arrow-right text-[9px]" />
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="hidden sm:flex flex-shrink-0 w-11 h-11 rounded-full items-center justify-center glass-card border border-divider text-secondary hover:text-accent hover:border-accent/40 transition-all"
          >
            <i className="fa-solid fa-chevron-right text-sm" />
          </button>
        </div>

        {/* Pagination dots */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pages }).map((_, p) => (
              <button
                key={p}
                aria-label={`Go to position ${p + 1}`}
                onClick={() => setIndex(p)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  p === index ? 'w-6 bg-accent' : 'w-1.5 bg-divider hover:bg-accent/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden glass-card border border-divider shadow-2xl"
            >
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
              <PhotoTile src={active.src} alt={active.title} icon={active.icon} fit="cover" rounded="rounded-none" className="aspect-[16/9] w-full" />
              <div className="p-6 sm:p-7">
                <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 border border-accent/25 text-accent mb-3">
                  {active.tag}
                </span>
                <h3 className="font-grotesk font-bold text-primary text-2xl leading-tight">{active.title}</h3>
                <p className="text-accent text-sm mt-1 mb-4">{active.caption}</p>
                <p className="text-secondary text-sm leading-relaxed">{active.description}</p>
                {active.href && (
                  <a
                    href={active.href}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2 mt-6"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                    Open
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
