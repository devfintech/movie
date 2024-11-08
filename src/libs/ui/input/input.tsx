import { Input as AntInput, InputProps as AntInputProps, InputRef } from "antd"
import { PasswordProps } from "antd/es/input"
import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"

import { cn } from "@/utils/classnames"

const inputVariants = cva(cn(""), {
  variants: {
    size: {
      small: "input-sm h-8 text-sm",
      middle: "input-md h-10 text-base",
      large: "input-lg h-12 text-lg",
    },
  },
  defaultVariants: {
    size: "middle",
  },
})
const inputSearchVariants = cva(cn(""), {
  variants: {
    size: {
      small: "input-search-sm",
      middle: "input-search-md",
      large: "input-search-lg",
    },
  },
  defaultVariants: {
    size: "middle",
  },
})

export interface InputProps extends AntInputProps, Omit<VariantProps<typeof inputVariants>, "size"> {}

export interface InputPasswordProps extends PasswordProps, Omit<VariantProps<typeof inputVariants>, "size"> {}

export interface InputSearchProps extends PasswordProps, Omit<VariantProps<typeof inputSearchVariants>, "size"> {}

export const Input = forwardRef<InputRef, InputProps>(({ className, size, ...props }, ref) => {
  return <AntInput className={cn(inputVariants({ size }), className)} ref={ref} {...props} />
})

Input.displayName = "Input"

export const InputPassword = forwardRef<InputRef, InputPasswordProps>(({ className, size, ...props }, ref) => {
  return <AntInput.Password className={cn(inputVariants({ size }), className)} ref={ref} {...props} />
})

InputPassword.displayName = "InputPassword"

export const InputSearch = forwardRef<InputRef, InputProps>(({ className, size, ...props }, ref) => {
  return <AntInput.Search className={cn(inputVariants({ size }), className)} ref={ref} {...props} />
})
InputSearch.displayName = "InputSearch"
