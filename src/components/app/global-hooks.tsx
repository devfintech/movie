import { FC } from "react"

import { useSentryChain } from "@/hooks/core/use-sentry-chain"
import { useSentryTheme } from "@/hooks/core/use-sentry-theme"
import { useSentryVersion } from "@/hooks/core/use-sentry-version"

interface GlobalHooksProps {}

export const GlobalHooks: FC<GlobalHooksProps> = () => {
  // ******** Optional ********
  // useSentryAuth()

  // useSentryWeb3Config()

  // ******** Hide it for landing page ********
  useSentryChain()

  // ******** Required hooks ********
  useSentryTheme()
  useSentryVersion()

  return null
}
