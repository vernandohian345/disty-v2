/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        primaryHover: "EA580C",
        cyanAccent: "38BDF8",
        purpleAccent: "8B5CF6",
        background: "F8FAFC",
        darkText: "0F172A",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },

  plugins: [],
}