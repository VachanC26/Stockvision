import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: { stock: "#1D9E75" },
        red: { stock: "#E24B4A" },
        blue: { accent: "#378ADD" },
      },
    },
  },
  plugins: [],
};
export default config;
