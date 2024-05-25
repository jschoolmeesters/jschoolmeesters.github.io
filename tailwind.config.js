module.exports = {
  content: ["./wwwroot/index.html", "./Pages/*.{razor,html,cshtml}", "./Shared/*.{razor,html,cshtml}", "./Components/*.{razor,html,cshtml}"],
  theme: { extend: {} },
  plugins: [
    require('daisyui'),
    require('tailwindcss'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#669900",
          "secondary": "#998000",
          "accent": "#330099",
          "neutral": "#3b3b3b",
          "base-100": "#141612",
          "info": "#006699",
          "success": "#1a9900",
          "warning": "#998000",
          "error": "#993300",
        },
      },
    ],
  },
}