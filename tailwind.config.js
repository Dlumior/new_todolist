const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          50: "#E6E6E6",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        primary: {
          50: "#E5FFEA",
          100: "#CCFFD2",
          200: "#99FFA0",
          300: "#66FF69",
          400: "#3AFF33",
          500: "#16FF00",
          600: "#07CC00",
          700: "#009903",
          800: "#006607",
          900: "#003306",
          950: "#001904",
        },
        secondary: {
          50: "#DFF1FC",
          100: "#BEE3F8",
          200: "#82C9F2",
          300: "#41ADEC",
          400: "#158CD0",
          500: "#0F6292",
          600: "#0C4E74",
          700: "#093B58",
          800: "#06283C",
          900: "#03131C",
          950: "#01090E",
        },
        accent: {
          50: "#FFFEEB",
          100: "#FFFCD6",
          200: "#FFFAB8",
          300: "#FFF780",
          400: "#FFF238",
          500: "#FFED00",
          600: "#E6D600",
          700: "#CCBE00",
          800: "#A89D00",
          900: "#7A7200",
          950: "#575100",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("prettier-plugin-tailwindcss")],
};
