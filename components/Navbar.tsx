'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, personal } from '@/data/portfolio'
import { assetPath } from '@/lib/assetPath'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [activeHref, setActive]   = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const pathname = usePathname()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const y = window.scrollY + 100
      document.querySelectorAll<HTMLElement>('section[id]').forEach(s => {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight)
          setActive('#' + s.id)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-divider shadow-xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <a href={onHome ? '#hero' : '/'} className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-divider shadow-lg shadow-accent/20 bg-black">
              <Image src={assetPath('/logo.png')} alt={personal.name} width={36} height={36} priority />
            </div>
            <span className="font-grotesk font-semibold text-sm text-primary/80 group-hover:text-primary transition-colors hidden sm:block">
              {personal.shortName}
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={onHome ? link.href : '/' + link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeHref === link.href ? 'text-primary' : 'text-muted hover:text-secondary'
                  }`}
                >
                  {activeHref === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-surface2 border border-divider"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + toggle + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold font-grotesk border border-green/30 text-green bg-green/5 hover:bg-green/10 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              Available — AI Data Eng
            </a>

            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-divider bg-surface hover:border-accent/30 transition-all"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 6 }  : { rotate: 0, y: 0 }}  className="block w-4 h-px bg-secondary" />
              <motion.span animate={menuOpen ? { opacity: 0 }         : { opacity: 1 }}        className="block w-4 h-px bg-secondary" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}  className="block w-4 h-px bg-secondary" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg/95 backdrop-blur-xl border-b border-divider px-6 py-4"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={onHome ? link.href : '/' + link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-surface2 transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
