module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          500: '#db4c3f'
        },
        grey: {
          500: '#F3F4F6'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
