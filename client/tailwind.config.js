/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class', // Adicione esta linha
  theme: {
    extend: {
      zIndex: {
        '1000000': '1000000',
        '100': '100',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
