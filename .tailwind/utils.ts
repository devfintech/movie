import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

export const apply = (...inputs: string[]) => {
  return {
    [`@apply ${twMerge(cx(inputs))}`]: {},
  }
}

export const appendDefault = (color: Record<number | string, string>) => {
  if (color[500]) {
    return {
      DEFAULT: color[500],
      ...color,
    }
  }
  return color
}

export const reverseColors = <T extends object>(color: T) => {
  const colorKeys = Object.keys(color).sort((a, b) => Number(a) - Number(b))
  const colorKeysReverse = [...colorKeys].reverse()

  const result = colorKeys.reduce((prevColor, currentColor, index) => {
    return {
      ...prevColor,
      [currentColor]: color[colorKeysReverse[index] as keyof typeof color],
    }
  }, {})

  return result as Record<number, string>
}
