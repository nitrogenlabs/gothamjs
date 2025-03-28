/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-primary': '#ffffff',
        'background-primary-dark': '#1a1a1a',
        'secondary': '#4a5568'
      }
    }
  },
  plugins: []
};