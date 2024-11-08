import { InputRef } from "antd"
import { forwardRef } from "react"

import { Input, InputProps } from "."

export interface InputNumberProps extends Omit<InputProps, "type"> {
  maxDecimals?: number
  maxInteger?: number
}

export const InputNumber = forwardRef<InputRef, InputNumberProps>(
  ({ maxDecimals = 8, maxInteger = 12, min, max, onChange = (e) => {}, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        inputMode="decimal"
        {...props}
        type="text"
        onChange={(e) => {
          const newValue = transformToNumber({ value: e.target.value, maxDecimals, maxInteger, min, max })
          e.target.value = newValue
          e.currentTarget.value = newValue
          onChange && onChange(e)
        }}
      />
    )
  },
)
InputNumber.displayName = "InputNumber"

const transformToNumber = (
  {
    value,
    maxDecimals = 6,
    maxInteger = 12,
    min,
    max,
  }: { value: string; maxDecimals?: number; maxInteger?: number; min?: number | string; max?: number | string } = {
    value: "",
  },
): string => {
  const transformComma = value.replace(/,/g, ".")

  let pattern = `^\\d{1,${maxInteger}}(\\.(\\d{1,${maxDecimals}})?)?`

  if (maxDecimals === 0) {
    pattern = `^\\d{1,${maxInteger}}`
  }

  const regex = new RegExp(pattern, "g")

  let newValue = transformComma.match(regex)?.[0] || ""

  if (Number(max)) {
    newValue = Number(newValue) > Number(max) ? max?.toString() || "" : newValue
  }

  return newValue
}
