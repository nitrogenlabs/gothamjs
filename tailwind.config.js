/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,tsx}'],
  safelist: [{pattern: /./}],
  theme: {
    colors: {
      primary: colors.slate,
      secondary: colors.blue
    },
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    spacing: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '30px',
      5: '50px',
      6: '60px'
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};

