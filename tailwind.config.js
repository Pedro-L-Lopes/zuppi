/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary1: "#0A0E14", // azul principal
        dark1: "#0A0F1C", // preto escuro
        dark2: "#14161A", // preto secundário
        teal: "#1FE19D", // verde água
        green: "#37F365", // verde claro
        blueLight: "#00B6FA", // azul claro
        cyan: "#03CCDD", // ciano
        gold: "#D4AF37", // dourado
        red: "red", // vermelho
        grayLight: "#E6E6E6", // cinza claro
      },
    },
  },
  plugins: [],
};
