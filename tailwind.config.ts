import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        smoothFlow: 'smoothFlow 4s linear infinite',
      },
      keyframes: {
        smoothFlow: {
          to: { backgroundPosition: '200% center' },
        },
      },
    },
  },
};
export default config;
