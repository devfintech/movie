import { formatUnits } from "viem"

export function pad(d: number): string {
  return d < 10 ? "0" + d.toString() : d.toString()
}

export function formatNumber(value: number | bigint, maximumFractionDigits = 6, compact = false) {
  if (typeof value !== "number" && typeof value !== "bigint") return value
  if (isNaN(Number(value))) return value?.toString()

  return new Intl.NumberFormat("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
  }).format(value)
}

export function formatWei(wei: bigint, decimals: number = 18, maximumFractionDigits = 6, compact = false) {
  try {
    return new Intl.NumberFormat("en", {
      maximumFractionDigits,
      notation: compact ? "compact" : "standard",
      compactDisplay: "short",
    }).format(+formatUnits(wei, decimals))
  } catch (err) {
    return ""
  }
}

export function toFixedNumber(numb: number, digits?: number) {
  if (digits === undefined) {
    digits = 0
  }
  const multiplicator = Math.pow(10, digits)

  numb = parseFloat((numb * multiplicator).toFixed(11))
  return Math.round(numb) / multiplicator
}
// Ex1: toFixedNumber(0.123456789, 5) => 0.12345
// Ex2: toFixedNumber(0.123456789, 5)
