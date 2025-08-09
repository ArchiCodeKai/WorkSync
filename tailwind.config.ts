import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        surface: "rgb(var(--surface))",
        border: "rgb(var(--border))",
        primary: "rgb(var(--primary))",
        hover: "rgb(var(--hover))",
      },
      animation: {
        'rotate-360': 'rotate360 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transformOrigin: {
        'center-center': 'center center',
      },
    },
  },
  plugins: [],
};

export default config;