import useSWR from "swr"
import { Address, erc20Abi, formatUnits } from "viem"
import { useClientStore } from "../stores/use-client-store"

export const useBalanceUnsupported = ({
  token,
  address,
  chainId,
  enabled,
  refreshKey,
  refreshInterval,
}: {
  token?: Address | ""
  address?: Address
  chainId?: number
  enabled?: boolean
  refreshKey?: string
  refreshInterval?: number
} = {}) => {
  const { account, publicClient } = useClientStore({ chainId })

  const response = useSWR(
    ["get-balance-unsupported", publicClient, account, token, address, chainId, enabled, refreshKey],
    async () => {
      const _enabled = enabled ?? true

      if (!publicClient || !_enabled) return

      const _account = address || account

      if (!_account) return

      let value: bigint = 0n
      let decimals: number = 18
      let symbol: string = ""
      let formatted: string = ""

      if (token) {
        const [_value, _decimals, _symbol] = await Promise.all([
          publicClient.readContract({
            abi: erc20Abi,
            address: token,
            functionName: "balanceOf",
            args: [_account],
          }),
          publicClient.readContract({
            abi: erc20Abi,
            address: token,
            functionName: "decimals",
          }),
          publicClient.readContract({
            abi: erc20Abi,
            address: token,
            functionName: "symbol",
          }),
        ])

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
      refreshInterval: refreshInterval,
    },
  )

  return response
}
