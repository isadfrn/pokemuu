import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#F5D87B',
          400: '#E8C14A',
          500: '#D4AF37',
          600: '#B8960C',
          700: '#8B6C0A',
        },
        dark: {
          900: '#06040A',
          800: '#0D0912',
          700: '#14101E',
          600: '#1C1728',
          500: '#251F35',
        },
        musculos: {
          light: '#F87171',
          DEFAULT: '#DC2626',
          dark: '#7F1D1D',
        },
        articulacoes: {
          light: '#34D399',
          DEFAULT: '#059669',
          dark: '#064E3B',
        },
        ossos: {
          light: '#C084FC',
          DEFAULT: '#9333EA',
          dark: '#3B0764',
        },
        especiais: {
          light: '#FDE68A',
          DEFAULT: '#D97706',
          dark: '#451A03',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        cinzel: ['var(--font-display)', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse_gold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212,175,55,0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-gold': 'pulse_gold 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8B6C0A 0%, #D4AF37 40%, #F5D87B 60%, #D4AF37 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center, #14101E 0%, #06040A 70%)',
        'card-glow-musculos': 'radial-gradient(circle at center, rgba(220,38,38,0.15) 0%, transparent 70%)',
        'card-glow-articulacoes': 'radial-gradient(circle at center, rgba(5,150,105,0.15) 0%, transparent 70%)',
        'card-glow-ossos': 'radial-gradient(circle at center, rgba(147,51,234,0.15) 0%, transparent 70%)',
        'card-glow-especiais': 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
