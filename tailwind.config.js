/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Add Outfit font
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animated"),
    require("flowbite/plugin"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#5D87FF", //blue
          secondary: "#379392", //green
          accent: "#142E1D",
          "base-100": "#ffffff",
          info: "#9ce37d",
          warning: "#ff5722",
        },
      },
    ],
  },
};
