import { cn } from "@/utils/classnames"
import { FC } from "react"

interface Spin1LoadingProps {
  className?: string
}

export const Spin1Loading: FC<Spin1LoadingProps> = ({ className }) => {
  return <div className={cn("spin-1 text-primary-500 w-16", className)}></div>
}
