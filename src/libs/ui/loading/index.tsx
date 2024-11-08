import { cn } from "@/utils/classnames"
import { FC } from "react"

interface LoadingProps {
  className?: string
}

export const Loading: FC<LoadingProps> = ({ className }) => {
  return <div className={cn("spin-1 text-primary-500 w-20", className)}></div>
}

Loading.displayName = "Loading"
