import colors from "tailwindcss/colors"
import { appendDefault } from "./utils"

const primary = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e",
  950: "#082f49",
}

// Colors should be hex code colors

const config = {
  light: {
    default: colors.stone[100],
    primary: appendDefault(colors.pink),
    secondary: colors.emerald[500],
    body: colors.white,
    component: colors.white,
    modal: colors.white,
    table: colors.white,
    muted: colors.neutral[200],
    content: colors.black,
    invert: colors.white,
    line: appendDefault(colors.neutral),
    success: appendDefault(colors.green),
    warning: appendDefault(colors.amber),
    info: appendDefault(colors.blue),
    error: appendDefault(colors.red),
    warm: appendDefault(colors.neutral),
    cool: appendDefault(colors.gray),
  },
  dark: {
    default: colors.gray[900],
    primary: appendDefault(primary),
    secondary: colors.emerald[500],
    body: colors.gray[950],
    component: colors.gray[800],
    modal: colors.gray[800],
    table: colors.zinc[900],
    muted: colors.gray[800],
    content: colors.white,
    invert: colors.black,
    line: appendDefault(colors.gray),
    success: appendDefault(colors.green),
    warning: appendDefault(colors.amber),
    info: appendDefault(colors.blue),
    error: appendDefault(colors.red),
    warm: appendDefault(colors.neutral),
    cool: appendDefault(colors.gray),
  },
}

export default config
