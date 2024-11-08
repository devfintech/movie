import { FaDownload } from "react-icons/fa"

import { ConnectorIds, wallets } from "@/configs/wallets.config"
import { useModalStore } from "@/hooks/stores/use-modals-store"
import { useActive } from "@/hooks/wallet/use-active"
import { Modal } from "@/libs/ui/modal"
import { cn } from "@/utils/classnames"

const hasInjectedProvider = typeof window !== "undefined" && typeof window["ethereum"] !== "undefined"

export const ConnectWalletModal = () => {
  const { isOpenModalConnectWallet, setIsOpenModalConnectWallet } = useModalStore()
  const { connectors, connect } = useActive()

  return (
    <Modal
      className=""
      classNames={{
        content: cn("!p-4"),
      }}
      width={320}
      title="Connect Wallet"
      open={isOpenModalConnectWallet}
      onCancel={() => setIsOpenModalConnectWallet(false)}
    >
      <div className="mt-3 grid grid-cols-1 gap-y-2">
        {wallets.map((wallet) => {
          if (!wallet.injected || (wallet.injected && hasInjectedProvider)) {
            const connector: any = connectors.find(
              (conn) => conn.id === wallet.connectorId || conn.id === wallet.connectorIdMobile,
            )

            if (
              wallet.connectorId === ConnectorIds?.WalletConnect &&
              !connectors.find((connector) => connector.id === ConnectorIds.WalletConnect)
            )
              return

            return (
              <div
                key={wallet.name}
                className="hover:bg-primary-500 flex items-stretch justify-between gap-2 overflow-hidden rounded-lg"
              >
                <button
                  className="group flex flex-1 flex-row items-center justify-between gap-2  px-2 py-2"
                  onClick={() => connect(wallet)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={wallet.iconURI}
                      title={wallet.name}
                      role="button"
                      className="w-10 rounded-sm  object-contain transition-all group-hover:scale-105"
                    />
                    <p className="text-base font-semibold">{wallet.name}</p>
                  </div>
                </button>

                {!connector && (
                  <button className="hover:text-primary-300 flex items-center justify-center p-1 px-2">
                    <FaDownload />
                  </button>
                )}
              </div>
            )
          }
        })}
      </div>
    </Modal>
  )
}
