import { cn } from "@/utils/classnames"
import { FC } from "react"

interface Spin2LoadingProps {
  className?: string
}

export const Spin2Loading: FC<Spin2LoadingProps> = ({ className }) => {
  return <div className={cn("spin-2 text-primary-500 w-14", className)}></div>
}
