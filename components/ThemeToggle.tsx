'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative w-9 h-9 flex items-center justify-center rounded-lg border border-divider bg-surface text-secondary hover:text-accent hover:border-accent/40 transition-all overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.i
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`text-sm ${isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}`}
        />
      </AnimatePresence>
    </button>
  )
}
