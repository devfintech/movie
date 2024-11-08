import { Drawer } from "antd"
import { FC, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { HiMenu } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { Link, NavLink } from "react-router-dom"

import { useRainbowKit } from "@/hooks/wallet/use-rainbow-kit"
import { Button } from "@/libs/ui/button"
import { routePath, routes } from "@/routes/routes"
import { cn } from "@/utils/classnames"
import { truncateAddress } from "@/utils/string"
import { ToggleTheme } from "../app/toggle-theme"
import { LanguageSelector } from "../language-selector"
import { ChainSelector } from "../wallet/chain-selector"
import { ConnectWalletWrapper } from "../wallet/connect-wallet-wrapper"
import { Container } from "./container"

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const handleCloseDrawer = () => setIsOpenDrawer(false)

  const { account, isConnected, isConnecting, connectWallet } = useRainbowKit()

  return (
    <>
      <header className="bg-body fixed left-0 right-0 top-0 z-50 h-16 shadow">
        <Container className="flex h-full items-center justify-between">
          <Link to={routePath.home} className="max-w-10">
            <img src="/logo/logo.svg" alt="" className="" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-10 max-lg:hidden">
              <nav className="flex items-center justify-center gap-4">
                {routes.map((route) => {
                  return (
                    <NavLink key={route.to} to={route.to}>
                      {({ isActive }) => {
                        return <div className={cn("", isActive && "text-primary-500 underline")}>{route.label}</div>
                      }}
                    </NavLink>
                  )
                })}
              </nav>
              <div className="hidden items-center gap-4 sm:inline-flex">
                <ToggleTheme />
                <LanguageSelector />
                <ChainSelector />

                {/* <ConnectButton showBalance accountStatus="full" /> */}

                <ConnectWalletWrapper type="primary" disconnectEnabled>
                  <Button className="gap-1 px-2">
                    {account && truncateAddress(account)}
                    <BiChevronDown className="text-xl" />
                  </Button>
                </ConnectWalletWrapper>
              </div>
            </div>
            <Button
              icon={<HiMenu />}
              type="default"
              className="!hidden aspect-square p-0 max-xl:!flex"
              onClick={() => setIsOpenDrawer(true)}
            />
          </div>
        </Container>
      </header>

      <Drawer
        open={isOpenDrawer}
        width={375}
        classNames={{
          header: cn("!hidden"),
          body: cn(""),
          content: cn(""),
          footer: cn(""),
          mask: cn(""),
        }}
        onClose={handleCloseDrawer}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h4 className=""></h4>
            <button className="hover:text-primary-500 text-xl" onClick={handleCloseDrawer}>
              <IoClose />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {routes.map((route, index) => {
              return (
                <NavLink key={`drawer-${route.to}`} to={route.to} onClick={handleCloseDrawer}>
                  {({ isActive }) => {
                    return <div className={cn("", isActive && "text-primary-500 underline")}>{route.label}</div>
                  }}
                </NavLink>
              )
            })}

            <ConnectWalletWrapper disconnectEnabled>
              <Button block type="primary">
                {account ? truncateAddress(account) : "Connect Wallet"}
              </Button>
            </ConnectWalletWrapper>
          </div>
        </div>
      </Drawer>
    </>
  )
}
