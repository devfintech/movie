import { WarningFilled } from "@ant-design/icons"
import { FC, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAccount } from "wagmi"

import { useWeb3Store } from "@/hooks/stores/use-web3-store"
import { useActive } from "@/hooks/wallet/use-active"
import { useSelectChain } from "@/hooks/wallet/use-select-chain"
import { Button } from "@/libs/ui/button"
import { Modal } from "@/libs/ui/modal"

interface RequiredChainModalProps {}

export const RequiredChainModal: FC<RequiredChainModalProps> = () => {
  const { disconnectWallet } = useActive()
  const { chain, isConnected } = useAccount()

  const { selectChain } = useSelectChain()

  const { supportedChains, chain: chainStore } = useWeb3Store()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isSwitchingChain, setIsSwitchingChain] = useState(false)

  const [searchParams] = useSearchParams()

  const chainIdInParam = Number(searchParams.get("chain_id"))

  const selectedChainInParam = useMemo(
    () => supportedChains.find((spChain) => spChain.id === chainIdInParam),
    [chainIdInParam, supportedChains],
  )

  useEffect(() => {
    if (!selectedChainInParam) {
      if (isConnected && !chain) {
        setIsOpenModal(true)
      } else {
        setIsOpenModal(false)
      }
      return
    }

    if (chainIdInParam !== chain?.id && isConnected) {
      setIsOpenModal(true)
    } else {
      setIsOpenModal(false)
    }
  }, [selectedChainInParam, chain?.id, chainIdInParam, isConnected, chain])

  return (
    <>
      <Modal
        className="border-cool-400 rounded-lg border"
        open={isOpenModal}
        width={400}
        title="Switch chain"
        closable={false}
        key={`${chain?.name || chainStore.name}`}
      >
        <div className="">
          <div className="my-4 flex flex-col items-center justify-center gap-4">
            <WarningFilled className="text-warning-500 animate-pulse text-6xl" />
            <p className="text-warning text-lg font-medium">You are in wrong chain</p>
          </div>

          <div className="flex w-full items-center justify-center gap-3">
            <Button
              className="flex-1"
              type="primary"
              async
              onClick={async () => {
                try {
                  setIsSwitchingChain(true)

                  await selectChain(selectedChainInParam || chainStore)

                  setIsOpenModal(false)
                } catch (error) {
                  console.log("🚀 ~ onClick={ ~ error:", error)
                } finally {
                  setIsSwitchingChain(false)
                }
              }}
            >
              Switch network
            </Button>
            <Button
              className="flex-1"
              type="dashed"
              disabled={isSwitchingChain}
              onClick={() => {
                disconnectWallet()
                setIsOpenModal(false)
              }}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
