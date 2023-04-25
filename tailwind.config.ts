import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:  "#0D0D0D"
      }

    },
  },
  plugins: [],
} satisfies Config;
