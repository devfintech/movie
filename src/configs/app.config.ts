import { Theme } from "@/types/core.type"

export const appConfig = {
  appName: "My RainbowKit App",
  appDescription: "",
  appIcon: "",
  // Link register wallet connect project id
  walletConnectProjectId: "4e9f5ec3e57a15aabcc24aff263f49ae", // Get id in here: https://cloud.walletconnect.com/
  // Config version
  version: "0.0",
  // Config default theme
  theme: "dark" as Theme,
  // Config sign message wallet to backend
  signMessage: "",
} as const
