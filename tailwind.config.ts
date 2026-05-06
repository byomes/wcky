import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0f0e0d',
          900: '#181715',
          800: '#21201d',
          700: '#2a2926',
          600: '#34322e',
          500: '#3e3c37',
          400: '#4a4843',
        },
        gold: {
          300: '#f5d98a',
          400: '#edba4a',
          500: '#e09e22',
          600: '#c0831a',
          700: '#a06a12',
        },
        cream: {
          50: '#fefdfb',
          100: '#faf8f4',
          200: '#f5f0e8',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
