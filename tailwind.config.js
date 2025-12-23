/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/*/*.{js,jsx,ts,tsx}",
    "./navigation/*/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6864f0",
      },
      fontSize: {
        f10: ["10px"],
        f11: ["11px"],
        f12: ["12px"],
        f13: ["13px"],
        f14: ["14px"],
        f15: ["15px"],
        f16: ["16px"],
        f17: ["17px"],
        f18: ["18px"],
        f19: ["19px"],
        f20: ["20px"],
      },
      fontFamily: {
        sfregular: ["sfregular"],
        sfmedium: ["sfmedium"],
        sfbold: ["sfbold"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    fontSize: true,
  },
  safelist: ["text-base"],
  important: true,
};
