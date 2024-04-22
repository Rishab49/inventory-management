/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "secondary":"#161d22",
        "tertiary":"#72cfff",
        "primary":"#13262f"
      }
    },
  },
  plugins: [],
}

