import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1EA',
        surface: '#FFFFFF',
        'surface-raised': '#FCFAF6',
        ink: {
          DEFAULT: '#241B14',
          muted: '#5C5349',
          faint: '#948A7C',
        },
        hairline: '#E4DBCC',
        jade: {
          DEFAULT: '#D9541F',
          ink: '#A83D14',
          soft: '#FBE6D9',
          'soft-border': '#F0C9A8',
        },
        ledger: {
          DEFAULT: '#0E6B52',
          soft: '#DCEDE4',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        stamp: '2px 14px 2px 14px',
      },
    },
  },
  plugins: [],
};

export default config;
