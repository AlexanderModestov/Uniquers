/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        primary: {
          50: '#e0f7ff',
          100: '#b8eeff',
          200: '#8de5ff',
          300: '#4ddaff',
          400: '#00c2ff',
          500: '#00a3ff',
          600: '#0086e6',
          700: '#006bb8',
          800: '#00519c',
          900: '#003c70',
        },
        accent: {
          50: '#ffe0ec',
          100: '#ffb8d6',
          200: '#ff8dbc',
          300: '#ff5c9f',
          400: '#ff3183',
          500: '#ff0066',
          600: '#e60057',
          700: '#b80045',
          800: '#990039',
          900: '#70002a',
        },
        secondary: {
          50: '#f3e0ff',
          100: '#e2b8ff',
          200: '#ce8dff',
          300: '#b75cff',
          400: '#a431ff',
          500: '#8c00ff',
          600: '#7800e6',
          700: '#6200b8',
          800: '#520099',
          900: '#400070',
        },
        success: {
          50: '#e0fff4',
          100: '#b8ffe9',
          200: '#8dffdd',
          300: '#5cffd1',
          400: '#31ffc5',
          500: '#00ff6a',
          600: '#00e65f',
          700: '#00b84c',
          800: '#009940',
          900: '#007032',
        },
        warning: {
          50: '#fff7e0',
          100: '#ffeeb8',
          200: '#ffe58d',
          300: '#ffdb5c',
          400: '#ffd131',
          500: '#ffc800',
          600: '#e6b400',
          700: '#b88e00',
          800: '#997700',
          900: '#7a5f00',
        },
        error: {
          50: '#ffe0e0',
          100: '#ffb8b8',
          200: '#ff8d8d',
          300: '#ff5c5c',
          400: '#ff3131',
          500: '#ff0000',
          600: '#e60000',
          700: '#b80000',
          800: '#990000',
          900: '#700000',
        },
        neutral: {
          50: '#f7f7fc',
          100: '#eeeef7',
          200: '#d7d7e8',
          300: '#b9b9d1',
          400: '#9595b7',
          500: '#7a7a9e',
          600: '#646482',
          700: '#4a4a5f',
          800: '#313142',
          900: '#181826',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 5px theme(colors.primary.400), 0 0 20px theme(colors.primary.500/50)',
        'neon-accent': '0 0 5px theme(colors.accent.400), 0 0 20px theme(colors.accent.500/50)',
        'neon-secondary': '0 0 5px theme(colors.secondary.400), 0 0 20px theme(colors.secondary.500/50)',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/grid.png')",
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
};