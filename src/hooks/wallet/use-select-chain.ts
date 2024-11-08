import { sleep } from "@/utils/promise"
import { useSearchParams } from "react-router-dom"
import { Chain } from "viem"
import { useAccount, useSwitchChain } from "wagmi"
import { useShallow } from "zustand/react/shallow"
import { useWeb3Store } from "../stores/use-web3-store"

export const useSelectChain = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { isSwitchingChain, setChain, setIsSwitchingChain } = useWeb3Store(
    useShallow((state) => ({
      isSwitchingChain: state.isSwitchingChain,
      chain: state.chain,
      setChain: state.setChain,
      setIsSwitchingChain: state.setIsSwitchingChain,
    })),
  )

  const { isConnected } = useAccount()

  const { switchChainAsync } = useSwitchChain()

  const handleSelectChain = async (chain: Chain) => {
    try {
      setIsSwitchingChain(true)
      // console.log("🚀 ~ handleSelectChain ~ currentChain:", currentChain, isConnected)
      if (isConnected) {
        const switchedChain = await switchChainAsync({ chainId: chain.id })

        setChain(switchedChain)

        await sleep(500)
        searchParams.delete("chain_id")

        setSearchParams(searchParams)
      } else {
        setChain(chain)

        searchParams.delete("chain_id")

        setSearchParams(searchParams)
      }
    } catch (error) {
      console.log("🚀 ~ handleSelectChain ~ error:", error)

      localStorage.clear()

      window.location.reload()
    } finally {
      setIsSwitchingChain(false)
    }
  }

  return { isSwitchingChain, selectChain: handleSelectChain }
}
