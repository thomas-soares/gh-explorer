import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
  content: [
    path.resolve(__dirname, "index.html"),
    path.resolve(__dirname, "src/**/*.{ts,tsx,html}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
