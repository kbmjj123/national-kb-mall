module.exports = {
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
  },
};
