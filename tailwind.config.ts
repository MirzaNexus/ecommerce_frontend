import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",

        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        accent: "rgb(var(--accent))",

        muted: "rgb(var(--muted))",
        success: "rgb(var(--success))",
        error: "rgb(var(--error))",
        warning: "rgb(var(--warning))",

        border: "rgb(var(--border))",
        card: "rgb(var(--card))",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "monospace"],
      },

      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
