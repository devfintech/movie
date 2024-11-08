import { storageKeys } from "@/configs/storage.config"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface DevStoreProps {
  isOpenDev: boolean
  setIsOpenDev(isOpenDev: boolean): void
}

export const useDevStore = create<DevStoreProps>()(
  devtools(
    persist(
      (set, get) => {
        return {
          isOpenDev: false,
          setIsOpenDev(isOpenDev) {
            set({ isOpenDev })
          },
        }
      },
      {
        name: storageKeys.dev,
      },
    ),
  ),
)
