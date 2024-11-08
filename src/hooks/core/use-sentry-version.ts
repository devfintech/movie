import { appConfig } from "@/configs/app.config"
import { storageKeys } from "@/configs/storage.config"
import { sleep } from "@/utils/promise"
import { useSearchParams } from "react-router-dom"
import useSWR from "swr"
import { createStorage, useDisconnect } from "wagmi"
import { useVersionStore } from "../stores/use-version-store"

const storage = createStorage({ storage: localStorage })

export const useSentryVersion = () => {
  const { version: storedVersion, setVersion: setStoredVersion } = useVersionStore()

  const { disconnectAsync } = useDisconnect()

  const [searchParams, setSearchParams] = useSearchParams()

  useSWR(
    ["sentry-version", storedVersion, appConfig.version],
    async () => {
      if (storedVersion !== appConfig.version) {
        await sleep(1000)
        for (const stk in storageKeys) {
          localStorage.removeItem(storageKeys[stk as keyof typeof storageKeys])
        }

        sessionStorage.clear()

        await storage.removeItem("store")

        setStoredVersion(appConfig.version)

        try {
          await disconnectAsync()
        } catch (error) {
          console.log("🚀 ~ error:", error)
        }

        searchParams.delete("chain_id")
        setSearchParams(searchParams)

        // Reload Page
        // @ts-ignore
        window.location.reload()
      }
    },
    // {
    //   keepPreviousData: true,
    // },
  )
}
