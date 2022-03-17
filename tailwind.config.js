module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        notes:
          "url('https://cdn.dribbble.com/users/47990/screenshots/3709437/media/6e6cfe31b949d1a3d8ffdb7d4b04303a.png')",
        schedule:
          "url('https://cdn.dribbble.com/users/4187655/screenshots/15568499/media/aeceb559af3f7b5285d30efaa6fd5b97.png')",
      },
      fontFace: {
        roboto: ['"Roboto"', "sans-serif"],
        comforter: ["Comforter Brush", "cursive"],
      },
    },
  },
  variants: {
    extend: {
      tableLayout: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
