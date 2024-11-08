import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, ReactNode, forwardRef } from "react"

import { cn } from "@/utils/classnames"

const containerVariants = cva("mx-auto w-full px-4 lg:px-6", {
  variants: {
    size: {
      default: "max-w-screen-default",
      mobile: "max-w-screen-mobile",
      tablet: "max-w-screen-tablet",
      retina: "max-w-screen-retina",
      fhd: "max-w-screen-fhd",
      qhd: "max-w-screen-qhd",
      uhd: "max-w-screen-uhd",
      xs: "max-w-screen-xs",
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  children?: ReactNode
  size?: VariantProps<typeof containerVariants>["size"]
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className, size, ...props }, ref) => {
  const classes = cn(containerVariants({ size }), className)

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

Container.displayName = "Container"
