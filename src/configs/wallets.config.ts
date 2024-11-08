import { HOST } from "./host.config"

export enum ConnectorIds {
  Injected = "injected",
  WalletConnect = "walletConnect",
  OkxWallet = "com.okex.wallet",
  BitgetWallet = "com.bitget.web3",
  MetaMaskWallet = "io.metamask",
  MetaMaskWalletMobile = "io.metamask.mobile",
  GateWallet = "io.gate.wallet",
  Coin98Wallet = "coin98.com",
  SafePalWallet = "https://www.safepal.com/download",
  PhantomWallet = "app.phantom",
  PontemWallet = "network.pontem",
  TrustWallet = "com.trustwallet.app",
}

export interface Wallet {
  injected: boolean
  name: string
  connectorId: ConnectorIds
  connectorIdMobile?: ConnectorIds
  etherId: string
  mobileOnly: boolean
  iconURI: string
  downloadUrl: string
  deepLink?: string
  isCustomDeepLink?: boolean
  getDeepLink?(url?: string, options?: { chainId?: number }): string
}

export const wallets: Wallet[] = [
  // {
  //   injected: true,
  //   name: "Injected",
  //   connectorId: ConnectorIds.Injected,
  //   etherId: "",
  //   mobileOnly: false,
  //   iconURI: "/images/wallets/injected.png",
  //   downloadUrl: "",
  //   deepLink: "",
  // },
  {
    injected: false,
    name: "MetaMask",
    connectorId: ConnectorIds.MetaMaskWallet,
    connectorIdMobile: ConnectorIds.MetaMaskWalletMobile,
    etherId: "isMetaMask",
    mobileOnly: false,
    iconURI: "/images/wallets/metamask.png",
    downloadUrl: "https://metamask.io/download/",
    deepLink: `https://metamask.app.link/dapp/${HOST}`,
    isCustomDeepLink: true,
    getDeepLink(url = HOST) {
      const walletLink = "https://metamask.app.link/dapp/"

      const deepLink = `${walletLink}${url}`

      return deepLink
    },
  },
  {
    injected: false,
    name: "OKX Wallet",
    connectorId: ConnectorIds.OkxWallet,
    etherId: "okxwallet",
    mobileOnly: false,
    iconURI: "/images/wallets/okx.jpg",
    downloadUrl: "https://www.okx.com/web3",
    deepLink: `okx://wallet/dapp/details?${HOST}`,
    isCustomDeepLink: true,
    getDeepLink(url = HOST) {
      const walletLink = "https://www.okx.com/download?deeplink="
      const okxDappLink = "okx://wallet/dapp/url?dappUrl="

      const deepLink = `${walletLink}${encodeURIComponent(okxDappLink + encodeURIComponent(url))}`

      return deepLink
    },
  },
  // {
  //   injected: false,
  //   name: "MathWallet",
  //   connectorId: ConnectorIds.Injected,
  //   etherId: "isMathWallet",
  //   mobileOnly: false,
  //   iconURI: "/images/wallets/mathwallet.png",
  //   downloadUrl: "https://mathwallet.org/",
  //   deepLink: `mathwallet://mathwallet.org?action=link&value=${HOST}`,
  // },
  {
    injected: false,
    name: "SafePal",
    connectorId: ConnectorIds.SafePalWallet,
    etherId: "isSafePal",
    mobileOnly: false,
    iconURI: "/images/wallets/safepal.png",
    downloadUrl: "https://safepal.io/download",
    deepLink: "",
  },
  // {
  //   injected: false,
  //   name: "TokenPocket",
  //   connectorId: ConnectorIds.Injected,
  //   etherId: "isTokenPocket",
  //   mobileOnly: false,
  //   iconURI: "/images/wallets/tokenpocket.png",
  //   downloadUrl: "https://www.tokenpocket.pro/",
  //   deepLink: `https://tokenpocket.github.io/applink?dappUrl=${HOST}`,
  // },
  {
    injected: false,
    name: "Coin98",
    connectorId: ConnectorIds.Coin98Wallet,
    etherId: "coin98",
    mobileOnly: false,
    iconURI: "/images/wallets/coin98.png",
    downloadUrl: "https://coin98.net/",
    isCustomDeepLink: true,
    getDeepLink(url = HOST, options) {
      const walletLink = "https://coin98.com/dapp"

      const convertedUrl = url.replace("https://", "")

      const chainId = options?.chainId

      const deepLink = `${walletLink}/${convertedUrl}/${chainId || ""}`

      return deepLink
    },
  },
  {
    injected: false,
    name: "Trust Wallet",
    connectorId: ConnectorIds.TrustWallet,
    etherId: "trustwallet",
    mobileOnly: false,
    iconURI: "/images/wallets/trustwallet.png",
    downloadUrl: "https://trustwallet.com/",
    // isCustomDeepLink: true,
    deepLink: `https://link.trustwallet.com/open_url?coin_id=714&url=${HOST}`,
  },
  // {
  //   injected: false,
  //   name: "Rice Wallet",
  //   connectorId: ConnectorIds.Injected,
  //   etherId: "isRiceWallet",
  //   mobileOnly: true,
  //   iconURI: "/images/wallets/ricewallet.png",
  //   downloadUrl: "https://ricewallet.io/",
  //   deepLink: "",
  // },
  {
    injected: false,
    name: "Wallet Connect",
    connectorId: ConnectorIds.WalletConnect,
    etherId: "",
    mobileOnly: false,
    iconURI: "/images/wallets/walletconnect.png",
    downloadUrl: "",
    deepLink: "",
  },
]
