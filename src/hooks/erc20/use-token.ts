import useSWR from "swr"
import { Address, erc20Abi, isAddress } from "viem"
import { useConfig } from "wagmi"
import { multicall } from "wagmi/actions"
import { useShallow } from "zustand/react/shallow"
import { useWeb3Store } from "../stores/use-web3-store"

// Muticall token infos with chain support function multicall3
export const useToken = ({
  address,
  chainId,
  enabled,
}: {
  address?: Address
  chainId?: number
  enabled?: boolean
} = {}) => {
  const wagmiConfig = useConfig()

  const { chain } = useWeb3Store(useShallow((state) => ({ chain: state.chain })))

  const response = useSWR(["token-info-v2", address, chainId, enabled], async () => {
    const _enabled = enabled ?? true

    if (!address || !isAddress(address || "") || !_enabled) return

    const [name, symbol, decimals] = await multicall(wagmiConfig, {
      contracts: [
        {
          abi: erc20Abi,
          address: address,
          functionName: "name",
        },
        {
          abi: erc20Abi,
          address: address,
          functionName: "symbol",
        },
        {
          abi: erc20Abi,
          address: address,
          functionName: "decimals",
        },
      ],
      allowFailure: false,
      chainId: chainId || chain.id,
    })

    return {
      name,
      symbol,
      decimals,
      address,
    }
  })

  return response
}
