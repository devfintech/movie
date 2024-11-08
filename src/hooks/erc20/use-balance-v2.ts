import useSWR from "swr"
import { Address, erc20Abi, formatUnits } from "viem"
import { useConfig } from "wagmi"
import { multicall } from "wagmi/actions"
import { useClientStore } from "../stores/use-client-store"

export const useBalanceV2 = ({
  token,
  address,
  chainId,
  enabled = true,
  refreshKey,
  refreshInterval,
}: {
  token?: Address | ""
  address?: Address | ""
  refreshInterval?: number
  chainId?: number
  enabled?: boolean
  refreshKey?: string
} = {}) => {
  const { account, publicClient } = useClientStore({ chainId })

  const wagmiConfig = useConfig()

  const response = useSWR(
    ["get-balance", publicClient, account, token, address, chainId, enabled, refreshKey],
    async () => {
      if (!publicClient || !enabled) return

      const _account = address || account

      if (!_account) return

      let value: bigint = 0n
      let decimals: number = 18
      let symbol: string = ""
      let formatted: string = ""

      if (token) {
        const [_value, _decimals, _symbol] = await multicall(wagmiConfig, {
          contracts: [
            {
              abi: erc20Abi,
              address: token,
              functionName: "balanceOf",
              args: [_account],
            },
            {
              abi: erc20Abi,
              address: token,
              functionName: "decimals",
            },
            {
              abi: erc20Abi,
              address: token,
              functionName: "symbol",
            },
          ],
          chainId: chainId || publicClient?.chain?.id,
          allowFailure: false,
        })

        value = _value
        decimals = _decimals
        symbol = _symbol
      } else {
        value = await publicClient.getBalance({
          address: _account,
        })
        decimals = publicClient.chain?.nativeCurrency?.decimals
        symbol = publicClient.chain?.nativeCurrency?.symbol
      }

      formatted = formatUnits(value, decimals)

      return {
        value,
        formatted,
        decimals,
        symbol,
      }
    },
    {
      refreshInterval: enabled ? refreshInterval : undefined,
    },
  )

  return response
}
