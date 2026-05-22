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
        limestone: "#F4EFE7",
        sand: "#E8D8C3",
        pearl: "#FFFCF6",
        navy: "#071923",
        turquoise: "#2A9DA1",
        "turquoise-soft": "#D9EFEC",
        bronze: "#B88955"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 34, 45, 0.12)",
        image: "0 28px 80px rgba(7, 25, 35, 0.22)"
      },
      maxWidth: {
        site: "1180px"
      }
    }
  },
  plugins: []
};

export default config;
