import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { camelizeKeys, decamelizeKeys } from "humps"
import { Chain } from "viem"

import { API_URL, API_URLS_FOR_CHAINS } from "@/configs/endpoints.config"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { useWeb3Store } from "@/hooks/stores/use-web3-store"
import { toast } from "react-toastify"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30s
  headers: {},
})

function onRequestFulfilled(config: InternalAxiosRequestConfig) {
  const { token } = useUserStore.getState()
  const { chain } = useWeb3Store.getState()

  if (chain) {
    const apiMatchedWithChain = API_URLS_FOR_CHAINS.TESTNET.chains.find(
      (chainConfig: Chain) => chainConfig?.id === chain.id,
    )
    if (apiMatchedWithChain) {
      config.baseURL = API_URLS_FOR_CHAINS.TESTNET.url
    } else {
      const apiMatchedWithChain = API_URLS_FOR_CHAINS.MAINNET.chains.find(
        (chainConfig: Chain) => chainConfig?.id === chain.id,
      )

      if (apiMatchedWithChain) {
        config.baseURL = API_URLS_FOR_CHAINS.MAINNET.url
      }
    }
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  config.params = decamelizeKeys(config.params)
  config.data = decamelizeKeys(config.data)
  return config
}

function onResponseFulfilled(response: AxiosResponse) {
  response.statusText = ""
  response.data = camelizeKeys(response.data.data)
  return Promise.resolve(response)
}

function onResponseRejected(error: AxiosError) {
  if (error?.code === "ERR_NETWORK") {
    toast.error("Network Error. This could be a CORS issue or a dropped internet connection.", {
      toastId: "network-error",
    })
  }

  if (error.response?.data) {
    error.response.data = camelizeKeys<any>(error.response.data)
  }
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequestFulfilled)
axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected)
