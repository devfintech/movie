import { defaultChain, supportedChains } from "@/configs/chains.config"
import { storageKeys } from "@/configs/storage.config"
import { ContractAddressConfig, TokenAddressConfig, TokenInfo } from "@/types/web3.type"
import { Chain } from "viem"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Web3StoreProps {
  supportedChains: Chain[]
  tokens: TokenInfo[]
  token: TokenAddressConfig
  chain: Chain
  contract: ContractAddressConfig
  enabled: boolean
  isSwitchingChain: boolean
  isReconnect: boolean

  setIsSwitchingChain(isSwitchingChain: boolean): void
  setEnabled(enabled: boolean): void
  setToken(token: TokenAddressConfig): void
  setTokens(tokens: TokenInfo[]): void
  setContract(contract: ContractAddressConfig): void
  setChain(chain: Chain): void
  setSupportedChains(supportedChains: Chain[]): void
  setIsReconnect(isReconnect: boolean): void
}

export const useWeb3Store = create<Web3StoreProps>()(
  persist(
    (set, get) => {
      return {
        tokens: [],
        supportedChains,
        chain: defaultChain,
        contract: {} as ContractAddressConfig,
        enabled: false,
        token: {} as TokenAddressConfig,
        isSwitchingChain: false,
        isReconnect: false,

        setIsSwitchingChain(isSwitchingChain) {
          set({ isSwitchingChain })
        },
        setEnabled(enabled) {
          set({ enabled })
        },
        setToken(token) {
          set({ token })
        },
        setTokens(tokens) {
          set({ tokens })
        },
        setChain(chain) {
          set({ chain })
        },
        setContract(contract) {
          set({ contract })
        },
        setSupportedChains(supportedChains) {
          set({ supportedChains })
        },
        setIsReconnect(isReconnect) {
          set({ isReconnect })
        },
      }
    },
    {
      name: storageKeys.web3,
      partialize(state) {
        return {
          chain: state.chain,
          // token: state.token,
          // tokens: state.tokens,
          // contract: state.contract,
          // supportedChains: state.supportedChains,
        }
      },
    },
  ),
)
