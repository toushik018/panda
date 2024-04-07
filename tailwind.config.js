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
        'footer-bg': 'linear-gradient(315deg, #c1f4e6 0%, #EAF9F7 74%)',
        'menu-bg': 'linear-gradient(315deg, #d4f0e8 0%, #f5f3f2 74%)',
        'menu-dark': 'linear-gradient(to right, #3a356f 0%, #000000 100%)',
        'card-bg': 'linear-gradient(315deg, #c1f4e6 0%, #f7f1ea 74%)',
        'card-bg-dark': 'linear-gradient(to right, #3a356f 0%, #292645 50%, #1c1a35 100%)',

      },
    },
  },
}
