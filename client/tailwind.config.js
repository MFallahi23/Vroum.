/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      SpaceGrotesk: ['"Space Grotesk"', "sans-serif"],
    },
    extend: {
      colors: {
        myOrange: "rgb(253, 60, 51)",
        myWhite: "rgb(244, 244 ,244)",
        myBlack: "rgb(27, 30 ,33)",
        myOrangeWhite: "rgb(255, 236 ,235)",
        myYellow: "rgb(255 ,194, 111)",
        myGray: "rgb(230,230,230)",
        myOtherGray: "rgb(65,73,76)",
        myGreen: "#8FFD33",
      },
    },
  },
  plugins: [],
};
