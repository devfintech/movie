import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { appConfig } from "@/configs/app.config"
import { storageKeyConfigs, storageKeys, storagePrefix } from "@/configs/storage.config"
import { Theme } from "@/types/core.type"

export const updateDataTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme)
}

export interface AppSettingsStoreProps {
  theme: Theme
  toggleTheme(theme?: Theme): void
}

export const useAppSettingsStore = create<AppSettingsStoreProps>()(
  devtools(
    persist(
      (set, get) => {
        return {
          theme: appConfig.theme,

          toggleTheme(theme) {
            const state = get()
            const autoSelected = state.theme === "dark" ? "light" : "dark"
            const color = theme || autoSelected
            document.documentElement.setAttribute("data-theme", color)

            set({ theme: color })
          },
        }
      },
      {
        name: storageKeys.appSettings,
      },
    ),
    {
      name: storagePrefix,
      store: storageKeyConfigs.appSettings,
    },
  ),
)
