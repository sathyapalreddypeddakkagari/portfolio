'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery } from '@/data/portfolio'
import type { GalleryItem } from '@/types'
import PhotoTile from './PhotoTile'

const ease = [0.22, 1, 0.36, 1] as const

export default function ShowcaseGallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const [active, setActive] = useState<GalleryItem | null>(null)

  const scrollByCard = useCallback((dir: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8
    const max = track.scrollWidth - track.clientWidth
    let next = track.scrollLeft + dir * amount
    if (next > max - 4) next = 0
    if (next < 0) next = max
    track.scrollTo({ left: next, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current && !active) scrollByCard(1)
    }, 3800)
    return () => clearInterval(id)
  }, [scrollByCard, active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
        className="relative mt-8"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 md:w-28 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 md:w-28 bg-gradient-to-l from-bg to-transparent" />

        <button
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="hidden sm:flex absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center glass-card border border-divider text-secondary hover:text-accent hover:border-accent/40 transition-all"
        >
          <i className="fa-solid fa-chevron-left text-sm" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="hidden sm:flex absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center glass-card border border-divider text-secondary hover:text-accent hover:border-accent/40 transition-all"
        >
          <i className="fa-solid fa-chevron-right text-sm" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[8vw] md:px-[16vw] py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {gallery.map((g, i) => (
            <motion.button
              key={g.title}
              data-card
              onClick={() => setActive(g)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
              whileHover={{ y: -6 }}
              className="snap-center group relative flex-shrink-0 w-[80vw] sm:w-[56vw] md:w-[42%] lg:w-[31%] text-left rounded-3xl overflow-hidden border border-divider hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
            >
              <PhotoTile src={g.src} alt={g.title} icon={g.icon} fit="contain" rounded="rounded-none" className="aspect-[4/3] w-full" />
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
            </motion.button>
          ))}
        </div>
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
              className="relative w-full max-w-lg rounded-3xl overflow-hidden glass-card border border-divider shadow-2xl"
            >
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
              <PhotoTile src={active.src} alt={active.title} icon={active.icon} fit="contain" rounded="rounded-none" className="aspect-[16/9] w-full" />
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
