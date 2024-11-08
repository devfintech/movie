import { FC, ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import ComingSoonPage from "@/pages/coming-soon"
import { routePath, routes } from "@/routes/routes"

interface ComingSoonPageWrapperProps {
  children: ReactNode
}

export const ComingSoonPageWrapper: FC<ComingSoonPageWrapperProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const routeMatched = routes.find((route) => route.to === location.pathname)

  useEffect(() => {
    if (routeMatched?.isComingSoon) {
      // Navigate to the home page when it's coming soon
      navigate(routePath.home)
    }
  }, [navigate, routeMatched?.isComingSoon])

  if (routeMatched?.isComingSoon) {
    return <ComingSoonPage />
  }

  return <>{children}</>
}
