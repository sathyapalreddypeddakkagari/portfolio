import type { Config } from 'tailwindcss'

const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-inter)',    'system-ui', 'sans-serif'],
        grotesk: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',     'monospace'],
      },
      colors: {
        bg:        withAlpha('--rgb-bg'),
        surface:   withAlpha('--rgb-surface'),
        surface2:  withAlpha('--rgb-surface2'),
        primary:   withAlpha('--rgb-primary'),
        secondary: withAlpha('--rgb-secondary'),
        muted:     withAlpha('--rgb-muted'),
        divider:   'var(--color-divider)',
        accent:    '#6366F1',
        accent2:   '#A78BFA',
        green:     '#34D399',
        cyan:      '#22D3EE',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg,#6366F1 0%,#A78BFA 50%,#22D3EE 100%)',
        'gradient-glow':   'radial-gradient(ellipse at center,rgba(99,102,241,0.15) 0%,transparent 70%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
