/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js", "./data.js"],
  theme: {
    extend: {

      colors: {
        brand: {
          DEFAULT: "#4B5563",
          dark: "#374151",
          light: "#E5E7EB",
        },
        ink: "#14171D",
        muted: "#545B68",
        ground: "#EDEFF3",
        line: "#D5D9E1",
      },
      iijfontFamily: {
        display: ["Arial", "sans-serif"],
        body: ["Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
