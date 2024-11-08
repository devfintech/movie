import { cn } from "@/utils/classnames"
import type { AnchorHTMLAttributes, FC } from "react"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ExternalLink: FC<ExternalLinkProps> = ({ children, ...props }) => {
  return (
    <a className={cn("hover:text-primary", props.className)} {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
