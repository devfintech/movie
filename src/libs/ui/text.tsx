import { VariantProps, cva } from "class-variance-authority"
import { ElementType, HTMLAttributes, forwardRef } from "react"

import { cn } from "@/utils/classnames"

const textVariants = cva("text", {
  variants: {
    variant: {
      h1: cn("text-6xl font-semibold"),
      h2: cn("text-5xl font-medium"),
      h3: cn("text-4xl font-medium"),
      h4: cn("text-3xl"),
      h5: cn("text-2xl"),
      h6: cn("text-xl"),
      p: cn("text-base"),
      span: cn("text-base"),
    },
    type: {
      title: cn(""),
      subtitle: cn(""),
      description: cn(""),
    },
    size: {
      xs: cn("text-xs"),
      sm: cn("text-sm"),
      md: cn("text-base"),
      lg: cn("text-lg"),
    },
    color: {
      success: cn("text-success-500"),
      error: cn("text-error-500"),
      info: cn("text-info-500"),
    },
    ellipsis: {
      1: "text-overflow-1",
      2: "text-overflow-2",
      3: "text-overflow-3",
    },
  },
})

export interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  component?: VariantProps<typeof textVariants>["variant"] | "div"
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "p", size, component, className, type, color, ellipsis, children, ...props }, ref) => {
    const Component = (component as ElementType) || (variant as ElementType)

    return (
      <Component {...props} className={cn(textVariants({ variant, ellipsis, type, size, color, className }))} ref={ref}>
        {children}
      </Component>
    )
  },
)

Text.displayName = "Text"
