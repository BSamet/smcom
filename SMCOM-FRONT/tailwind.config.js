const colors = require('tailwindcss/colors')
module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '60px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'gl': '1060',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors:{
      primary_cwork: "#324B5D",
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      emerald: colors.emerald,
      orange: colors.orange,
      failure: "#EC644B"
    },
    borderWidth: {
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      spacing:{
        '120': '30rem'
      },
      height:{
        'fullscreen': '80.5vh' /* 90.5vh sur écran de pc fixe */
      },

    },
  },
  variants: {
    extend: {},
    display: ['responsive', 'group-hover', 'group-focus'],
  }
};
