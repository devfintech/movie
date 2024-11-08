import defaultTailwindColors from "tailwindcss/colors"
import { DefaultColors } from "tailwindcss/types/generated/colors"
import dynamicColors from "./colors"
import { tailwindExtend } from "./tailwind-extend"

// delete tailwind colors was deprecated
delete (defaultTailwindColors as Partial<DefaultColors>)["lightBlue"]
delete (defaultTailwindColors as Partial<DefaultColors>)["warmGray"]
delete (defaultTailwindColors as Partial<DefaultColors>)["trueGray"]
delete (defaultTailwindColors as Partial<DefaultColors>)["coolGray"]
delete (defaultTailwindColors as Partial<DefaultColors>)["blueGray"]

export const tailwindColors = {
  light: { ...defaultTailwindColors, ...tailwindExtend?.colors, ...dynamicColors.light },
  dark: { ...defaultTailwindColors, ...tailwindExtend?.colors, ...dynamicColors.dark },
  default: { ...defaultTailwindColors, ...tailwindExtend?.colors },
}
