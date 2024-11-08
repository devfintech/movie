import { useWeb3Store } from "@/hooks/stores/use-web3-store"

export const getTxUrl = (hash: string) => {
  const { chain } = useWeb3Store.getState()
  const { blockExplorers } = chain
  if (blockExplorers) {
    const host = blockExplorers.default.url
    const url = new URL(host)
    const pathname = ["tx", hash]
    url.pathname += pathname.join("/")
    return url.toString()
  }
  return ""
}

export const getContractAddressUrl = (hash: string) => {
  const { chain } = useWeb3Store.getState()
  const { blockExplorers } = chain
  if (blockExplorers) {
    const host = blockExplorers.default.url
    const url = new URL(host)
    const pathname = ["tx", hash]
    url.pathname += pathname.join("/")
    return url.toString()
  }
  return ""
}
