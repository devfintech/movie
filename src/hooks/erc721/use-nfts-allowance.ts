import { popError, popPending, popPendingConfirm, popSuccess, popWeb3Errors } from "@/utils/pop"
import useSWR from "swr"
import { Address, BaseError, erc721Abi } from "viem"
import { useClientStore } from "../stores/use-client-store"

export const useNftsAllowance = (address: Address, spender: Address) => {
  const { publicClient, account, walletClient } = useClientStore()

  const { data: allowanceNfts, mutate: refetchAllowanceNfts } = useSWR(
    ["check-allowance-nfts", publicClient, account, address, spender],
    async () => {
      if (!account || !publicClient) return

      const response = await publicClient.readContract({
        abi: erc721Abi,
        address,
        functionName: "isApprovedForAll",
        args: [account, spender],
      })
      return response
    },
  )

  const handleApproveNfts = async () => {
    try {
      if (!walletClient || !publicClient) return

      popPendingConfirm()

      const hash = await walletClient.writeContract({
        abi: erc721Abi,
        address,
        functionName: "setApprovalForAll",
        args: [spender, true],
      })

      popPending({ message: "Approve nfts is processing", hash })

      const { status } = await publicClient.waitForTransactionReceipt({
        hash,
      })
      if (status === "success") {
        popSuccess({ message: "Approve NFTs successfully", hash })
        refetchAllowanceNfts()
      } else {
        popError({ message: "Approve NFTs failed", hash })
      }
    } catch (error) {
      popWeb3Errors(error as BaseError, "Approve NFTs failed")
    }
  }

  return {
    allowanceNfts,
    refetchAllowanceNfts,
    approveNfts: handleApproveNfts,
  }
}
