module.exports = {
  content: ["./**/*.{razor,html,cshtml}", "./wwwroot/css/app.css"],
  theme: { extend: {} },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    base: false,
  },
}
