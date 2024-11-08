import { Config } from "tailwindcss"
import { createThemes } from "tw-colors"

import dynamicColors from "./colors"
import { tailwindExtend } from "./tailwind-extend"

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: tailwindExtend,
  },
  plugins: [
    createThemes(dynamicColors),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animate"),
    require("./base"),
    require("./antd"),
    require("./legacy"),
  ],
}

export default config
