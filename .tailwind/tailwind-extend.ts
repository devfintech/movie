import defaultTheme from "tailwindcss/defaultTheme"
import { ThemeConfig } from "tailwindcss/types/config"

export const tailwindExtend: Partial<ThemeConfig> = {
  fontFamily: {
    sans: ["Rubik", ...defaultTheme.fontFamily.sans],
  },
  screens: {
    default: "1464px",
    mobile: "390px",
    tablet: "820px",
    hd: "1366px",
    retina: "1440px",
    fhd: "1920px",
    qhd: "2560px",
    uhd: "3840px",
  },
  borderRadius: {
    DEFAULT: "0.375rem",
  },
  colors: {},
  transitionTimingFunction: {
    expo: "cubic-bezier(0.5, 1.5, 0.8, 1)",
    "expo-in": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
    "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
  },
}
