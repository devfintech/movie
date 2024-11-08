import { useCallback } from "react"
import { Address, decodeFunctionResult, encodeFunctionData } from "viem"

import { multicallAbi } from "@/constants/abi/multicall"
import { useContractAddresses } from "../address/use-contract-addresses"
import { useClientStore } from "../stores/use-client-store"

export type CallParams = {
  functionName: string
  address: Address
  args?: any[]
  abi?: any
}[]

// [*] Demo
export const useMulticallV2 = () => {
  const { publicClient } = useClientStore()

  const { MULTICALL } = useContractAddresses()

  const handleMulticallContract = useCallback(
    async (abi: any, calls: CallParams, requiredSucces: boolean = true) => {
      if (!publicClient || !publicClient?.readContract) return

      const callData = calls.map((call) => {
        return {
          target: call.address.toLowerCase() as Address,
          callData: encodeFunctionData({
            abi,
            functionName: call.functionName,
            args: call?.args || [],
          }),
        }
      })

      const tryAggregateResponse = await publicClient.readContract({
        abi: multicallAbi,
        address: MULTICALL,
        functionName: "tryAggregate",
        args: [requiredSucces, callData],
      })
      console.log("🚀 ~ file: use-multicall.ts:85 ~ tryAggregateResponse:", tryAggregateResponse)

      const txEncodedList = tryAggregateResponse

      // Decode transaction response
      const response = txEncodedList.map(function (txEndcoded, index: number) {
        return decodeFunctionResult({
          abi,
          data: txEndcoded.returnData,
          functionName: calls[index].functionName,
        })
      })
      console.log("🚀 ~ file: use-multicall.ts:97 ~ response ~ response:", response)
    },
    [MULTICALL, publicClient],
  )
}
