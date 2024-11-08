import { storagePrefix } from "@/configs/storage.config"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface ModalStoreProps {
  isOpenModalConnectWallet: boolean

  setIsOpenModalConnectWallet(isOpenModalConnectWallet: boolean): void
}

export const useModalStore = create<ModalStoreProps>()(
  devtools(
    (set) => {
      return {
        isOpenModalConnectWallet: false,

        setIsOpenModalConnectWallet(isOpenModalConnectWallet) {
          set({ isOpenModalConnectWallet })
        },
      }
    },
    { name: storagePrefix, store: "modal" },
  ),
)
