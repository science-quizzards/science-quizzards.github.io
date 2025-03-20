/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here if needed
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite alternate',
        'shimmer': 'shimmer 6s infinite',
        'cosmic-float': 'cosmic-float 15s ease-in-out infinite alternate',
        'nebula-pulse': 'nebula-pulse 10s ease-in-out infinite alternate',
        'twinkle': 'twinkle 10s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { top: '0', backgroundColor: 'rgba(99, 102, 241, 0.3)' },
          '50%': { backgroundColor: 'rgba(139, 92, 246, 0.3)' },
          '100%': { top: '100%', backgroundColor: 'rgba(99, 102, 241, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'cosmic-float': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        'nebula-pulse': {
          '0%': { opacity: '0.1', transform: 'scale(1)' },
          '50%': { opacity: '0.3' },
          '100%': { opacity: '0.1', transform: 'scale(1.1)' },
        },
        'twinkle': {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
} 