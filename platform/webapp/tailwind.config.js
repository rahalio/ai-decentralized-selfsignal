/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        seal: '#3D6F8C',
        baltic: {
          900: '#1A2A33',
          800: '#243B47',
          700: '#2F4D5C',
        },
        paper: '#F7F5F1',
        signal: '#2F8F6B',
        statute: '#B33A3A',
        amberwarn: '#C48A2A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['IBM Plex Sans', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
