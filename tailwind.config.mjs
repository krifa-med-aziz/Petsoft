/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
