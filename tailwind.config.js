/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Custom CSS class definition
  corePlugins: {
    container: false, // Disable the container plugin
  },
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': 'linear-gradient(315deg, #c1f4e6 0%, #f7f1ea 74%)',
        'custom-dark': 'linear-gradient(315deg, #130f40 0%, #000000 74%)',
        'navbg': 'linear-gradient(315deg, #44b09e 0%, #e0d2c7 74%)',
        'footer-bg': 'linear-gradient(315deg, #c1f4e6 0%, #EAF9F7 74%)'

      },
    },
  },
}
