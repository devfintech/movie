import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { FC, ReactNode } from "react"
import { Chain } from "viem"
import { WagmiProvider } from "wagmi"
import { useShallow } from "zustand/react/shallow"

import { tailwindExtend } from ".tailwind/tailwind-extend"
import { appConfig } from "@/configs/app.config"
import { queryClient } from "@/configs/react-query.config"
import { useAppSettingsStore } from "@/hooks/stores/use-app-settings-store"
import { useWeb3Store } from "@/hooks/stores/use-web3-store"

interface Web3ProviderProps {
  children?: ReactNode
}

export const Web3Provider: FC<Web3ProviderProps> = ({ children }) => {
  const { supportedChains, chain } = useWeb3Store(
    useShallow((state) => ({
      supportedChains: state.supportedChains,
      chain: state.chain,
    })),
  )
  // console.log("🚀 ~ chain:", chain)

  const { theme } = useAppSettingsStore(useShallow((state) => ({ theme: state.theme })))

  // const transports = supportedChains.reduce<{ [key: number]: HttpTransport }>((prev, cur) => {
  //   prev[cur.id] = http()

  //   return prev
  // }, {})

  // const wagmiConfig = createConfig({
  //   chains: supportedChains as [Chain, ...Chain[]],
  //   transports,
  // })

  const config = getDefaultConfig({
    appName: appConfig.appName,
    appDescription: appConfig.appDescription,
    projectId: appConfig.walletConnectProjectId,
    chains: supportedChains as [Chain, ...Chain[]],
    //
    // wallets: [
    //   {
    //     groupName: "Recommend",
    //     wallets: [metaMaskWallet, okxWallet, coin98Wallet, bitgetWallet, , phantomWallet, rabbyWallet, omniWallet],
    //   },
    // ],
    // multiInjectedProviderDiscovery: false,
  })

  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          // key={chain?.id}
          theme={
            theme === "dark"
              ? {
                  ...darkTheme(),
                  fonts: {
                    body: (tailwindExtend.fontFamily as any)?.sans,
                  },
                }
              : undefined
          }
          showRecentTransactions
          initialChain={chain}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
