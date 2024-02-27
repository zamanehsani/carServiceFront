// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: { },
    plugins: [
        require('@tailwindcss/forms'),
    ],
  
}