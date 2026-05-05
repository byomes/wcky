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
          950: '#04080f',
          900: '#080d18',
          800: '#0d1525',
          700: '#111c2e',
          600: '#182338',
          500: '#1e2b44',
          400: '#273452',
        },
        gold: {
          300: '#f0d080',
          400: '#e8c06a',
          500: '#d4a853',
          600: '#b8922f',
          700: '#9c7820',
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
