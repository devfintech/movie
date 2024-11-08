import { Button as AntButton, ButtonProps as AntButtonProps, ConfigProvider } from "antd"
import { VariantProps, cva } from "class-variance-authority"
import { MouseEvent, forwardRef, useState } from "react"

import { cn } from "@/utils/classnames"

const buttonVariants = cva(cn(""), {
  variants: {
    size: {
      small: cn("h-8 text-sm"),
      middle: cn("h-10 text-lg"),
      large: cn("h-12 text-xl"),
    },
    type: {
      primary: cn("enabled:hover:bg-primary-600"),
      secondary: cn(""),
      tertiary: cn(""),
      danger: cn(
        "enabled:bg-red-500 enabled:hover:!bg-red-600 enabled:border-red-500 enabled:hover:!border-red-500 enabled:hover:!text-white",
      ),
      default: cn("enabled:hover:text-primary-500 enabled:hover:border-primary-500 shadow-none"),
      dashed: cn("enabled:hover:text-primary-500 enabled:hover:border-primary-500 "),
      text: cn(""),
      link: cn(""),
      ghost: cn("enabled:bg-transparent enabled:border-none "),

      success: cn(
        "bg-success-500 enabled:hover:!bg-success-600 enabled:hover:!border-success-500 enabled:hover:!text-white",
      ),
      info: cn("bg-info-500 enabled:hover:!bg-info-600 hover:!border-info-500 enabled:hover:!text-white"),
      warning: cn("bg-warning-500 enabled:hover:!bg-warning-600 hover:!border-warning-500 enabled:hover:!text-white"),
      none: cn("border-none outline-none shadow-none active:!bg-transparent"),
    },
  },
  defaultVariants: {
    size: "small",
    type: "default",
  },
})
export interface ButtonProps extends Omit<AntButtonProps, "type">, Omit<VariantProps<typeof buttonVariants>, "size"> {
  async?: boolean
  animateOnActive?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type,
      async = false,
      disabled = false,
      size = "small",
      animateOnActive = true,
      className,

      onClick,
      ...props
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(false)

    const buttonType = type ? (antButtonTypes.find((btnType) => btnType === type) as AntButtonProps["type"]) : undefined

    const handleClick = async (e: MouseEvent<HTMLButtonElement> & MouseEvent<HTMLAnchorElement>) => {
      if (!onClick) return

      if (async) {
        try {
          setIsLoading(true)
          await onClick(e)
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      } else {
        onClick(e)
      }
    }

    return (
      <ConfigProvider wave={{ disabled: type === "none" }}>
        <AntButton
          onClick={handleClick}
          type={buttonType}
          loading={isLoading}
          disabled={isLoading || disabled}
          {...props}
          className={cn(buttonVariants({ size, type, className }), animateOnActive && "enabled:active:scale-95")}
          ref={ref}
        >
          {children}
        </AntButton>
      </ConfigProvider>
    )
  },
)

const antButtonTypes = ["default", "primary", "dashed", "link", "text"]

Button.displayName = "Button"
