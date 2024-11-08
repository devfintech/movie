import { ERC20TokenInfo } from "@/types/web3.type"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"
import { useShallow } from "zustand/react/shallow"
import { useWeb3Store } from "../stores/use-web3-store"

export const useAddCustomToken = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { chain } = useAccount()

  const { chain: currentChain } = useWeb3Store(useShallow((state) => ({ chain: state.chain })))

  const isWrongChain = chain?.id !== currentChain?.id

  const handleAddCustomToken = async (
    tokenInfo: ERC20TokenInfo,
    type: string = "ERC20",
  ): Promise<ERC20TokenInfo | undefined> => {
    try {
      if (!window?.ethereum) {
        toast.error("Wallet not found")
        return
      }

      if (isWrongChain) {
        toast.error("You are wrong chain. Please switch chain to add token")
        return
      }

      setIsLoading(true)

      const tokenAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type,
          options: tokenInfo,
        },
      })

      if (tokenAdded) {
        toast.success(`Add ${tokenInfo?.symbol} token successfully!`)

        return tokenAdded
      } else {
        toast.error("Add token failed")
      }
    } catch (error: any) {
      console.log("🚀 ~ file: use-add-custom-token.ts:18 ~ handleAddCustomToken ~ error:", error)
      toast.error(error?.message || "Add token failed")
    } finally {
      setIsLoading(false)
    }
  }
  return {
    hasChainNetwork: Boolean(chain),
    isLoading,
    isWrongChain,
    addCustomToken: handleAddCustomToken,
  }
}
