import { FC, ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAccount } from "wagmi"

import { useUserStore } from "@/hooks/stores/use-user-store"
import { routePath } from "@/routes/routes"

interface ConnectRequiredWrapperProps {
  children: ReactNode
}

export const ConnectRequiredWrapper: FC<ConnectRequiredWrapperProps> = ({ children }) => {
  const { token } = useUserStore()
  const { address: account } = useAccount()

  if (!token || !account) {
    return <Navigate to={routePath.home} />
  }

  return children
}
