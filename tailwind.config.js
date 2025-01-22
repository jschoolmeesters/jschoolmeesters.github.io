module.exports = {
  content: ["./wwwroot/css/*.css", "./wwwroot/index.html", "./Pages/*.{razor,html,cshtml}", "./Shared/*.{razor,html,cshtml}", "./Components/*.{razor,html,cshtml}"],
  darkMode: 'class',
  theme: { 
    extend: {
      listStyleImage: {
        subdir: "url('../media/subdirectory.svg')",
      }
    } 
  },
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/typography'),
    require('postcss-import')
  ],
}