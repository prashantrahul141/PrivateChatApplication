/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        themePrimary: {
          100: '#fff5f5',
          200: '#fcb7b8',
          300: '#f67a7c',
          400: '#ee4548',
          500: '#e21c1f',
          600: '#d20004',
          700: '#bd0003',
          800: '#a30003',
          900: '#830002',
          1000: '#5f0002',
          1100: '#3b0001',
        },
      },
    },
  },
  plugins: [],
};
