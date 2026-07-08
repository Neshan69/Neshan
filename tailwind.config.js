/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#08080a",
        "surface-container": "#0c0c0e",
        "surface-container-lowest": "#000000",
        primary: "#ffffff",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#a0a0a0",
        secondary: "#0090ae",
        "on-secondary": "#ffffff",
        "on-primary": "#08080a",
        "secondary-container": "#004e5f",
        outline: "#45474a",
        "outline-variant": "#2c2c2e",
      },

      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "9999px",
      },

      fontFamily: {
        headline: ["Playfair Display", "serif"],
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },

      fontSize: {
        "headline-sm": ["1.25rem", { lineHeight: "1.5", letterSpacing: "tight" }],
        "body-lg": ["1.125rem", { lineHeight: "1.625" }],
        "body-md": ["1rem", { lineHeight: "1.5" }],
        "label-caps": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.2em" }],
      },
    },
  },
  plugins: [],
};