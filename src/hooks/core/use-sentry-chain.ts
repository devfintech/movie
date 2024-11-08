import { useSearchParams } from "react-router-dom"
import useSWR from "swr"
import { useAccount } from "wagmi"

import { useWeb3Store } from "../stores/use-web3-store"

export const useSentryChain = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { chain, isConnected, isConnecting, status } = useAccount()

  const chainIdInParam = Number(searchParams.get("chain_id"))

  const { supportedChains, setChain } = useWeb3Store()

  useSWR(["sentry-chain", chain, isConnected, chainIdInParam], async () => {
    if (!chain || !isConnected) return

    const matchedChain = supportedChains.find((spChain) => spChain.id === chainIdInParam)

    if (matchedChain) {
      setChain(matchedChain)
    } else {
      setChain(chain)
    }
  })

  useSWR(["sentry-chain-param", isConnected, isConnecting], () => {
    if (isConnected || isConnecting) return

    const choosedChain = supportedChains.find((spChain) => spChain.id === chainIdInParam)

    if (!choosedChain) return

    setChain(choosedChain)
  })

  return null
}
