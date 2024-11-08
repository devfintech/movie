import { wallets } from "@/configs/wallets.config"
import { useModalStore } from "@/hooks/stores/use-modals-store"
import { useActive } from "@/hooks/wallet/use-active"
import { Modal } from "@/libs/ui/modal"

const hasInjectedProvider = typeof window !== "undefined" && typeof window["ethereum"] !== "undefined"

export const ConnectWalletModalV2 = () => {
  const { isOpenModalConnectWallet, setIsOpenModalConnectWallet } = useModalStore()
  const { connect } = useActive()

  return (
    <Modal
      className="border-cool-400 rounded-lg border"
      width={280}
      title="Connect Wallet"
      open={isOpenModalConnectWallet}
      onCancel={() => setIsOpenModalConnectWallet(false)}
    >
      <div className=" flex flex-col gap-2">
        {wallets.map((wallet) => {
          if (!wallet.injected || (wallet.injected && hasInjectedProvider)) {
            return (
              <button
                className="hover:text-primary-500 group flex items-center gap-4 overflow-hidden"
                key={wallet.name}
                onClick={() => connect(wallet)}
              >
                <img
                  src={wallet.iconURI}
                  title={wallet.name}
                  role="button"
                  className="border-muted/50 w-10 rounded-full border  object-contain transition-all group-hover:scale-105"
                />
                <p className=" font-semibold">{wallet.name}</p>
              </button>
            )
          }
        })}
      </div>
    </Modal>
  )
}
