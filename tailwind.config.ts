import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surya: {
          navy: {
            50: '#F0F5FA',
            100: '#E0EBF5',
            200: '#BFD7EB',
            300: '#94BCDE',
            400: '#548FC8',
            500: '#1E64AC',
            600: '#0F4C8D',
            700: '#0C3D73',
            800: '#0B3064', // Logo primary dark navy
            900: '#072044',
            950: '#041228',
          },
          orange: {
            50: '#FFF7EE',
            100: '#FFEED9',
            200: '#FFD9B3',
            300: '#FFBE82',
            400: '#FF9747',
            500: '#F26522', // Logo sun orange
            600: '#E04E0C',
            700: '#BA3907',
            800: '#942E0C',
            900: '#77270D',
          },
          gold: {
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
          }
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'navy-cinematic': 'linear-gradient(180deg, rgba(4, 18, 40, 0.85) 0%, rgba(7, 32, 68, 0.95) 100%)',
      }
    },
  },
  plugins: [],
};

export default config;

