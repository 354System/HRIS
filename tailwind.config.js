/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        primary: '#252C58',
        purple: '#A332C3',
        yellow: '#F9BE2A',
        grey: '#9295AB',
        white: '#FFFFFF',
        darkwhite: '#F9F9F9',
      }
    },
  },
  plugins: [],
}
