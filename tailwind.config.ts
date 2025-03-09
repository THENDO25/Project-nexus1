import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'EAE287': '#EAE287',
        'EF233C':'#EF233C',
        'D3D3D3':'#D3D3D3',
      },
    },
  },
  plugins: [],
};

export default config;