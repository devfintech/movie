import { jwtDecode } from "jwt-decode"
import { FC, ReactElement, cloneElement } from "react"

import { useAuth } from "@/hooks/core/use-auth"
import { Button, ButtonProps } from "@/libs/ui/button"
import { cn } from "@/utils/classnames"
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

interface ConnectWalletWrapperProps extends ButtonProps {
  children?: ReactElement
  className?: string
  requiredLogin?: boolean
  disconnectEnabled?: boolean
}

export const ConnectWalletWrapper: FC<ConnectWalletWrapperProps> = ({
  children,
  className,
  disconnectEnabled = false,
  requiredLogin = false,
  ...buttonProps
}) => {
  const { openConnectModal } = useConnectModal()
  const { openAccountModal, accountModalOpen } = useAccountModal()

  const { address: account, isConnecting } = useAccount()

  // const { connectWallet, disconnectWallet } = useActive()

  const { token, login, logout } = useAuth()

  const cloneButtonElement =
    children &&
    cloneElement(children, {
      ...(disconnectEnabled
        ? {
            async: true,
            loading: isConnecting,
            async onClick() {
              openAccountModal?.()
              // await disconnectAsync()
              // logout()
            },
          }
        : {}),
      ...buttonProps,
      className: cn(className, children.props?.className),
    })

  if (!account) {
    return (
      <Button className={className} type="primary" loading={isConnecting} onClick={openConnectModal} {...buttonProps}>
        Connect Wallet
      </Button>
    )
  }

  if (requiredLogin) {
    const isInvalidToken = !token || jwtDecode<{ exp: number }>(token).exp * 1000 <= Date.now()

    if (isInvalidToken) {
      return (
        <Button className={className} type="primary" async onClick={login} {...buttonProps}>
          Sign Message
        </Button>
      )
    } else {
      return <>{cloneButtonElement}</>
    }
  }

  return <>{cloneButtonElement}</>
}
