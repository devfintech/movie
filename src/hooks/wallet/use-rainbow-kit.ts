import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

export const useRainbowKit = () => {
  const { connectModalOpen, openConnectModal } = useConnectModal()

  const { address: account, isConnecting, isConnected } = useAccount()

  const handleConnectWallet = () => {
    if (account) return

    openConnectModal && openConnectModal()
  }

  return {
    isConnecting,
    isConnected,
    account,
    connectModalOpen,
    connectWallet: handleConnectWallet,
  }
}
