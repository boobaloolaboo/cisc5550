import daisyui from 'daisyui';
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["lofi", "forest", "cupcake", "lemonade", "valentine", "synthwave", "cyberpunk"],
  },

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
      forms: false,
    }),
    require('daisyui')
  ],
}

