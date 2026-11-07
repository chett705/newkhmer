import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#1e3a8a", // Cambodian deep blue
          600: "#172554",
          700: "#0f172a",
        },
        khmerRed: {
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
        },
      },
      fontFamily: {
        khmer: ["var(--font-kantumruy)", "sans-serif"],
        battambang: ["var(--font-battambang)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

