/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#001F3F',
          hover: '#003366',
        },
        gold: {
          DEFAULT: '#FFD700',
          hover: '#FFC700',
          light: '#FEFEF8',
        },
        orange: {
          DEFAULT: '#FF8C00',
          warning: '#E67E22',
        },
        cream: '#FFFAF0',
        charcoal: '#2C3E50',
        success: '#27AE60',
      },
      fontFamily: {
        sans: ['Open Sans', 'Lato', 'sans-serif'],
        heading: ['Poppins', 'Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
