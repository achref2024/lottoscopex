import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#F4F1E8",
        surface: "#0B5C3A",
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#B8941F",
          light: "#F5D576",
        },
        accent: {
          DEFAULT: "#D4AF37",
          dark: "#B8941F",
          light: "rgba(212, 175, 55, 0.14)",
        },
        felt: {
          950: "#0B5C3A",
          900: "#0F7048",
          800: "#1C8A5A",
          700: "#279E6C",
          600: "#34B47D",
        },
        mist: {
          500: "#A8E0C4",
          400: "#BCE9D2",
          300: "#D6F3E5",
          200: "#EAF9F1",
        },
      },
      fontFamily: {
        display: [
          "Poppins",
          "-apple-system",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "-apple-system",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        fun: ["Fredoka", "ui-rounded", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.35)",
        glow: "0 0 0 1px rgba(212,175,55,0.15), 0 12px 30px -12px rgba(212,175,55,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "70%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
