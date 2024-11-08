import { FC, useMemo } from "react"

interface BreakdownNumberProps {
  value: string
  countOfZeros?: number
  className?: string
}

export const BreakdownNumber: FC<BreakdownNumberProps> = ({ value = 0, countOfZeros = 5, className }) => {
  const breakNumber = useMemo(() => {
    const wholeNumber = Math.floor(Number(value))
    const decimalPart = value.toString().split(".")[1]
    const regex = /0+([1-9]\d*)/
    const match = decimalPart.match(regex)
    const countOfZeros = match ? decimalPart.indexOf(match[1]) : -1
    const remainingDigits = decimalPart.slice(countOfZeros)

    return {
      wholeNumber,
      decimalPart,
      countOfZeros,
      remainingDigits,
    }
  }, [value])

  if (breakNumber.countOfZeros >= countOfZeros) {
    return (
      <span className={className} title={value?.toString()}>
        {breakNumber.wholeNumber}.0
        <span
          className="relative top-[0.2em] inline-block text-[0.8em]"
          style={{
            paddingInlineStart: "0.2em",
            paddingInlineEnd: "0.2em",
          }}
        >
          {breakNumber?.countOfZeros}
        </span>
        {breakNumber?.remainingDigits}
      </span>
    )
  }

  return <span className={className}>{value}</span>
}
