import { Dropdown, MenuProps } from "antd"
import { FC } from "react"
import { BiChevronDown } from "react-icons/bi"
import { BsCheckLg } from "react-icons/bs"
import { HiGlobe } from "react-icons/hi"

import { useWeb3Store } from "@/hooks/stores/use-web3-store"
import { useSelectChain } from "@/hooks/wallet/use-select-chain"
import { Button } from "@/libs/ui/button"
import { useAccount } from "wagmi"
import { useShallow } from "zustand/react/shallow"

export const ChainSelector: FC = () => {
  const {
    supportedChains,
    chain: chainStore,
    setChain,
  } = useWeb3Store(
    useShallow((state) => ({ supportedChains: state.supportedChains, chain: state.chain, setChain: state.setChain })),
  )

  const { isSwitchingChain, selectChain } = useSelectChain()

  const { isConnecting } = useAccount()

  const items: MenuProps["items"] = supportedChains.map((chainItem) => {
    return {
      key: chainItem.id,
      label: (
        <div className="flex items-center gap-2">
          {chainItem.name}
          {chainStore?.id === chainItem?.id && <BsCheckLg className="text-success-500" />}
        </div>
      ),
      icon: <HiGlobe />,
      className: "",
      onClick: () => {
        if (chainStore?.id === chainItem?.id) return
        selectChain(chainItem)
      },
    }
  })

  if (supportedChains.length <= 1) return null

  return (
    <Dropdown menu={{ items }} disabled={isConnecting}>
      <Button className="gap-2 px-2" type="default">
        <HiGlobe />
        {isSwitchingChain ? "Loading..." : chainStore?.name}
        <BiChevronDown className="text-xl" />
      </Button>
    </Dropdown>
  )
}
