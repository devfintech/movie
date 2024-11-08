# Decode event logs example

```typescript
import { xMarketAbi } from "@/constants/abi/x-market"
import useSWR from "swr"
import { decodeEventLog } from "viem"
import { useClientStore } from "../stores/use-client-store"

const hash = "0x86fc322a05b24110d3d24bc6b1ba7efd25db96b959ce35008a440e3861c0ef63"

const marketAddress = "0x65dD5b5c2fbCCcE2f4C15De281A12CC5873eB886"

export const useGetDataContracts = () => {
  const { publicClient } = useClientStore()

  const { data, error } = useSWR(["get-data-contracts", publicClient], async () => {
    if (!publicClient) return

    const { status, logs } = await publicClient.waitForTransactionReceipt({
      hash,
    })

    const data = logs
      .filter((log) => log.address.toLowerCase() === marketAddress.toLowerCase())
      .map((log) => {
        return decodeEventLog({
          abi: xMarketAbi,
          topics: log.topics,
          data: log.data,
          eventName: "PackBought",
        })
      })

    return data
  })
  console.log("🚀 ~ const{data,error}=useSWR ~ error:", error)
  console.log("🚀 ~ const{data,error}=useSWR ~ data:", data)

  return {}
}

// hash = 0x86fc322a05b24110d3d24bc6b1ba7efd25db96b959ce35008a440e3861c0ef63
```
