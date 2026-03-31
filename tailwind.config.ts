import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f2937",
        sand: "#f8f4ec",
        coral: "#f97360",
        ocean: "#28536b",
        mint: "#d7f2e3",
      },
      boxShadow: {
        card: "0 18px 40px rgba(31, 41, 55, 0.08)",
      },
      fontFamily: {
        heading: ["Avenir Next", "Trebuchet MS", "Hiragino Sans", "sans-serif"],
        body: ["Hiragino Sans", "Yu Gothic", "Avenir Next", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
