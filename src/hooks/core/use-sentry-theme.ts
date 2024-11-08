import { useEffect } from "react"

import { useAppSettingsStore } from "@/hooks/stores/use-app-settings-store"

export const useSentryTheme = () => {
  const { theme, toggleTheme } = useAppSettingsStore()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Settings theme by system device

  // useEffect(() => {
  //   const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")

  //   const handleChangeMediaTheme = (event: MediaQueryListEvent) => {
  //     toggleTheme(event.matches ? "dark" : "light")
  //   }

  //   matchMedia.addEventListener("change", handleChangeMediaTheme)

  //   return () => {
  //     matchMedia.removeEventListener("change", handleChangeMediaTheme)
  //   }
  // }, [])
}
