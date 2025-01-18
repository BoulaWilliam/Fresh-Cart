/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container :{
      center:true
    },
    extend: {
      colors:{
        primary:{
          50:"#e7f7e7",
          100:"#ceefce",
          200:"#b6e6b6",
          300:"#9dde9d",
          400:"#85d685",
          500:"#6cce6c",
          600:"#54c654",
          700:"#3bbd3b",
          800:"#23b523",
          900:"#0aad0a",
          950:"#055705",
        }
      },
      screens:{
        "4xl":"1320px",
          'verySm': {'max': '639px'}, // Custom breakpoint for width < 640px
      }
    },
  },
  plugins: [],
}

