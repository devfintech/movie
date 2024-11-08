import { FC } from "react"
import { Outlet } from "react-router-dom"

interface EmptyLayoutProps {}

export const EmptyLayout: FC<EmptyLayoutProps> = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
