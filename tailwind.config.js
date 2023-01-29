/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e8b453",

          secondary: "#ed42de",

          accent: "#b09ced",

          neutral: "#1F272D",

          "base-100": "#F5F6FA",

          info: "#5CACCC",

          success: "#63EE9A",

          warning: "#F2BB6E",

          error: "#EA766C",

          text: "#F5F6FA",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
