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
        'custom-bg': 'linear-gradient(315deg, #44b09e 0%, #e0d2c7 74%)',
        'custom-dark': 'linear-gradient(315deg, #130f40 0%, #000000 74%)',
      },
    },
  },
}
