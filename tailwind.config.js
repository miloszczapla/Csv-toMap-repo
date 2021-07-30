const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      body: ['Roboto'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      almostWhite: '#F5F5F5',
      almostBlack: '#4B4B4B',
      contrastMain: '#9FE6E2',
      error: '#D65C5C',
    },
    extend: {
      fontSize: {
        exs: ['10px', '14px'],
      },
      screens: {
        xs: '400px',
      },
    },
  },
  variants: {
    extend: {
      brightness: ['hover'],
    },
  },
  plugins: [],
};
