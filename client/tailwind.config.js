/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6216',        // Set primary color
        secondary: '#E55A12',      // Slightly darker secondary color
      },
    },
  },
  plugins: [],
}
