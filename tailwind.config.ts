import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'fadeIn': 'fadeInFromNone 0.5s ease-out',
      },
      keyframes: {
        fadeInFromNone: {
          '0%': { display: 'none', opacity: '0' },
          '1%': { display: 'flex', opacity: '0' },
          '100%': { display: 'flex', opacity: '1' }
        },
      },
      colors: {
        'main': '#0890b2',
        'sec': '#dc2626',
      },
      screens: {
        '2xsm': '280px',
        'xsm': '360px'
      },
    },
  },
  plugins: [],
};
export default config;
