import { storageKeys } from "@/configs/storage.config"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface VersionStoreProps {
  version: string
  setVersion(version: string): void
}

export const useVersionStore = create<VersionStoreProps>()(
  devtools(
    persist(
      (set, get) => {
        return {
          version: "0.0",

          setVersion(version) {
            set({ version })
          },
        }
      },
      {
        name: storageKeys.version,
      },
    ),
  ),
)
