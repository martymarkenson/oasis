/** @type {import('postcss-load-config').Config} */
import pkg from "next";
const { NextConfig } = pkg;

const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
