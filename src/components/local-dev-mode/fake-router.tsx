import { FC } from "react"
import { NavLink } from "react-router-dom"

import { useDevStore } from "@/hooks/stores/use-dev-store"
import { Button } from "@/libs/ui/button"
import { routes } from "@/routes/routes"

interface FakeRouterProps {}

export const FakeRouter: FC<FakeRouterProps> = () => {
  const { isOpenDev, setIsOpenDev } = useDevStore()

  return (
    <div className="space-y-2">
      <h2 className="">Fake Router</h2>

      <div className="flex flex-wrap items-center gap-3">
        {routes.map((route) => {
          return (
            <NavLink key={route.to} to={route.to} onClick={() => setIsOpenDev(false)}>
              {({ isActive }) => {
                return (
                  <Button size="small" block type={isActive ? "primary" : "default"}>
                    {route.label}
                  </Button>
                )
              }}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
