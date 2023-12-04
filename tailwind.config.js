/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      hp: {max: "768px"},
      laptop: "1024px",
    },
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        primary: {
          DEFAULT: '#252C58',
          dark: '#0e185c',
          light: '#3e467a',
        },
        purple: {
          DEFAULT: '#A332C3',
          dark: '#5e1d70',
          light: '#a070ad',
        },
        yellow: {
          DEFAULT: '#F9BE2A',
          dark: '#bd8e00',
          light: '#fbcc54',
        },
        green: {
          DEFAULT: '#57C125',
          dark: '#2e7d32',
        },
        red: {
          DEFAULT: '#D91A1A',
          dark: '#980808',
        },
        gray: {
          DEFAULT: '#d9d9d9',
          dark: '#9295AB',
        },
        white: '#FFFFFF',
        darkwhite: '#F9F9F9',
      }
    },
  },
  plugins: [],
}

