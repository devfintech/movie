import { Service } from "@/services/app.service"
import useSWR from "swr"
import { useShallow } from "zustand/react/shallow"
import { useWeb3Store } from "../stores/use-web3-store"

export const useSentryWeb3Config = () => {
  const { setSupportedChains, setChain, setContract, setEnabled, setToken } = useWeb3Store(
    useShallow((state) => ({
      setSupportedChains: state.setSupportedChains,
      setChain: state.setChain,
      setContract: state.setContract,
      setEnabled: state.setEnabled,
      setToken: state.setToken,
    })),
  )

  const response = useSWR(
    ["sentry-web3-config"],
    async () => {
      const response = await Service.web3.getWeb3Service()

      const { chain, supportedChains } = response

      if (supportedChains) {
        setSupportedChains(supportedChains)
      }

      if (chain) {
        setChain(chain)
      }

      return response
    },
    {
      onSuccess() {
        setEnabled(true)
      },
      onError() {
        setEnabled(true)
      },
    },
  )

  return response
}
