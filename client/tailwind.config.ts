import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#407BFF",
          100: "#c6d9ff",
          200: "#93b3ff",
          300: "#6090ff",
          400: "#407bff",
          500: "#0066cc",
          600: "#0059b3",
          700: "#004c99",
          800: "#003f80",
          900: "#003266",
          foreground: "#fff",
        },
        destructive: {
          DEFAULT: "#e11d48",
          100: "#f8d7da",
          200: "#f1b0b5",
          300: "#e11d48",
          400: "#c7152a",
          500: "#9b1c1f",
          600: "#7a171b",
          700: "#5b1417",
          800: "#3c1013",
          900: "#2a0c10",
          foreground: "#fff",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
