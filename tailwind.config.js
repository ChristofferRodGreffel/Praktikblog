export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "var(--primary-blue)",
        primaryGrey: "var(--primary-grey)",
        primaryBlack: "var(--primary-black)",
        primaryWhite: "var(--primary-white)",
        darkBlue: "var(--dark-blue)",
        primaryBlueShaded: "var(--primary-blue-shaded)",
      },
      fontFamily: {
        bebasNeue: ["Bebas Neue", "Sans Serif"],
      },
    },
  },
  plugins: [],
};
