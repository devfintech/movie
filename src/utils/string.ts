import { Address } from "viem"

export function truncateAddress(address: Address, numberic = 4) {
  return (
    address?.toLowerCase()?.slice(0, numberic > 2 ? numberic : 2) + "..." + address?.toLowerCase()?.slice(-numberic)
  )
}
export function truncateString(address: string, numberic = 4) {
  return (
    address?.toLowerCase()?.slice(0, numberic > 2 ? numberic : 2) + "..." + address?.toLowerCase()?.slice(-numberic)
  )
}

const PLURAL_RULES = [
  { regex: /([^aeiou])y$/, replacement: "$1ies" }, // e.g., "city" -> "cities"
  { regex: /s$/, replacement: "ses" }, // e.g., "bus" -> "buses"
  { regex: /(ss)$/, replacement: "$1es" }, // e.g., "kiss" -> "kisses"
  { regex: /(sh|ch)$/, replacement: "$1es" }, // e.g., "dish" -> "dishes"
  { regex: /x$/, replacement: "xes" }, // e.g., "box" -> "boxes"
  { regex: /z$/, replacement: "zes" }, // e.g., "quiz" -> "quizzes"
  { regex: /f$/, replacement: "ves" }, // e.g., "leaf" -> "leaves"
  { regex: /fe$/, replacement: "ves" }, // e.g., "life" -> "lives"
] as const

const IRREGULARNOUNS = {
  child: "children",
  person: "people",
  man: "men",
  woman: "women",
  mouse: "mice",
  goose: "geese",
  foot: "feet",
  tooth: "teeth",
  cactus: "cacti",
  focus: "foci",
  fungus: "fungi",
  nucleus: "nuclei",
  syllabus: "syllabi",
  analysis: "analyses",
  diagnosis: "diagnoses",
  oasis: "oases",
  thesis: "theses",
  crisis: "crises",
  phenomenon: "phenomena",
  criterion: "criteria",
  datum: "data",
} as const

export const convertPluralizeString = (noun: string, counter?: number) => {
  if (Number(counter) <= 1) return noun

  const matchedIrregularNoun = IRREGULARNOUNS[noun.toLowerCase() as keyof typeof IRREGULARNOUNS]

  if (matchedIrregularNoun) {
    return matchedIrregularNoun
  }

  for (const rule of PLURAL_RULES) {
    if (rule.regex.test(noun)) {
      return noun.replace(rule.regex, rule.replacement)
    }
  }

  return noun + "s"
}
