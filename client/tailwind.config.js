/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  variants: {
    backgroundColor:['responsive', 'group-hover', 'hover', 'focus', 'active' ],
  },
}
