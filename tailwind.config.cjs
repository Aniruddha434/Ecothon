/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981",
        secondary: "#1E293B",
        accent: "#3B82F6",
        dark: "#0F172A",
        light: "#F8FAFC",
      },
    },
  },
  plugins: [],
} 