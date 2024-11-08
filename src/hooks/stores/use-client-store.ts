import { useAccount, usePublicClient, useWalletClient } from "wagmi"
import { useShallow } from "zustand/react/shallow"
import { useWeb3Store } from "./use-web3-store"

export const useClientStore = ({ chainId }: { chainId?: number } = {}) => {
  const { chain } = useWeb3Store(useShallow((state) => ({ chain: state.chain })))

  const { isConnected, address: account } = useAccount()

  const publicClient = usePublicClient({
    chainId: chainId || chain.id,
  })

  const {
    data: walletClient,
    isLoading: isWalletClientLoading,
    isSuccess: isWalletClientSuccess,
  } = useWalletClient({
    chainId: chainId || chain.id,
  })

  return {
    chainStore: chain,
    chain: publicClient?.chain,
    account,
    isConnected,
    isWalletClientLoading,
    isWalletClientSuccess,

    publicClient,
    walletClient,
  }
}
