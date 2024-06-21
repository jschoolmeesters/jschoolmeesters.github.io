module.exports = {
  content: ["./wwwroot/index.html", "./Pages/*.{razor,html,cshtml}", "./Shared/*.{razor,html,cshtml}", "./Components/*.{razor,html,cshtml}"],
  darkMode: 'class',
  theme: { 
    extend: {
      listStyleImage: {
        subdir: "url('../media/subdirectory.svg')",
      }
    } 
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    //darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}