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
        "surface-container-low": "#101014",
        "surface-container-high": "#16161c",
        "surface-container-highest": "#1c1c24",
        "surface-bright": "#1a1a22",
        "surface-dim": "#06060a",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#a0a0a0",
        "inverse-on-surface": "#08080a",
        "inverse-surface": "#e2e2e2",
        primary: "#ffffff",
        "on-primary": "#08080a",
        "primary-container": "#1d2a3a",
        "on-primary-container": "#bcd4ff",
        secondary: "#3cd7ff",
        "on-secondary": "#08080a",
        "secondary-container": "#0a5a6e",
        "on-secondary-container": "#bdeefb",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        outline: "#45474a",
        "outline-variant": "#2c2c2e",
      },

      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        full: "9999px",
      },

      fontFamily: {
        headline: ["Playfair Display", "serif"],
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        metadata: ["Inter", "sans-serif"],
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