import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10222D",
        "ink-soft": "#405766",
        limestone: "#F6F0E6",
        sand: "#E6D2B8",
        pearl: "#FFF9EF",
        navy: "#071B26",
        turquoise: "#1F7C86",
        "turquoise-soft": "#D9EFEC",
        bronze: "#A87847"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 54px rgba(16, 34, 45, 0.10)",
        image: "0 32px 90px rgba(7, 27, 38, 0.20)"
      },
      maxWidth: {
        site: "1180px"
      }
    }
  },
  plugins: []
};

export default config;
