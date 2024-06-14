/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      blur: {
        sm: "1px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
