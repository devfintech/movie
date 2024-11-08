import { FC } from "react"

import { ConnectWalletModal } from "../modals/connect-wallet-modal"
import { RequiredChainModal } from "../modals/required-chain-modal"

interface GlobalModalProps {}

export const GlobalModal: FC<GlobalModalProps> = () => {
  return (
    <div className="global-modal">
      <ConnectWalletModal />
      <RequiredChainModal />
    </div>
  )
}
