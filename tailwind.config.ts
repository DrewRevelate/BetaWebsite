import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--border))",
        ring: "hsl(var(--primary))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--foreground))",
        "accent-foreground": "hsl(var(--foreground))",
        // Updated color palette with better contrast ratios for accessibility
        primary: {
          DEFAULT: '#3b55e3', // Improved contrast against white
          dark: '#2d43be',    // Darker shade for contrast against light backgrounds
          light: '#5e7aef',   // Lighter shade with better contrast against dark backgrounds
        },
        secondary: {
          DEFAULT: '#6a0dad', // Improved contrast against white
          dark: '#56088f',    // Darker shade for better visibility
          light: '#8e1fd1',   // Lighter shade with better contrast against dark backgrounds
        },
        accent: '#f72585',
        dark: {
          DEFAULT: '#0d1b2a',
          light: '#1b263b',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
        'flat': 'flat',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
      },
      rotate: {
        '3d': 'var(--rotate-x, 0) var(--rotate-y, 0) var(--rotate-z, 0)',
      },
      translate: {
        'z': {
          '[-10px]': '-10px',
          '[-20px]': '-20px',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 15s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 15s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 12s ease-in-out infinite',
        'gradient': 'gradient 4s ease infinite',
        'appear': 'appear 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'appear-zoom': 'appear-zoom 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'appear-subtle': 'appear-subtle 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'star-movement-top': 'star-movement-top 6s linear infinite',
        'star-movement-bottom': 'star-movement-bottom 6s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.4' },
        },
        'pulse-slower': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.15)', opacity: '0.2' },
        },
        'gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'appear': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'appear-subtle': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'appear-zoom': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'star-movement-top': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config