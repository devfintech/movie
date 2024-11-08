import { jwtDecode } from "jwt-decode"
import { useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { isAddressEqual } from "viem"
import { useAccount, useDisconnect } from "wagmi"

import { appConfig } from "@/configs/app.config"
import { Service } from "@/services/app.service"
import { getErrorMessage } from "@/utils/common"
import { useClientStore } from "../stores/use-client-store"
import { useUserStore } from "../stores/use-user-store"

export const useAuth = () => {
  const { t } = useTranslation()
  const { walletClient } = useClientStore()

  const { disconnect } = useDisconnect()

  const checkedFirstLoginRef = useRef<boolean>(false)

  const { userInfo, token, updateUserInfo, setToken, reset } = useUserStore()

  const { chain: currentChain, isConnected } = useAccount()

  const handleLogin = useCallback(async () => {
    if (!walletClient || !isConnected || !currentChain || checkedFirstLoginRef.current) return

    const isExpired = token && jwtDecode<{ exp: number }>(token).exp * 1000 <= Date.now()
    const isInvalidToken = !token || isExpired
    const isKeepedAddress = userInfo?.address && isAddressEqual(walletClient.account?.address, userInfo?.address)

    if (isKeepedAddress && !isInvalidToken) {
      return true
    }

    try {
      const { nonce } = await Service.auth.getNonce(walletClient.account?.address)

      if (!nonce) {
        toast.error(t("Failed to get nonce"), { toastId: "get-nonce-failed" })
        return false
      }

      // Loading....
      toast.loading(t("Please confirm the sign message on your wallet to log in"), { toastId: "sign-message" })

      checkedFirstLoginRef.current = true

      const sign = await walletClient.signMessage({
        account: walletClient.account?.address!,
        message: `${appConfig.signMessage} ${nonce}`,
      })
      const { userInfo, token } = await Service.auth.login(walletClient.account?.address, sign)
      // Success
      toast.success(t("Logged in successfully"), { toastId: "login-successfully" })

      updateUserInfo(userInfo)
      setToken(token)

      return true
    } catch (err) {
      const errorMessage = getErrorMessage(err)

      toast.error(errorMessage)
      // Error
      // Disconnect Wallet
      disconnect()

      return false
    } finally {
      toast.dismiss("sign-message")
      checkedFirstLoginRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userInfo?.address, walletClient?.account?.address, isConnected, currentChain?.id])

  const handleRefreshUserInfo = useCallback(async () => {
    if (!token) return

    try {
      const userInfo = await Service.user.getUser()
      updateUserInfo(userInfo)
    } catch (error) {
      console.log("🚀 ~ file: use-auth.ts:78 ~ handleRefreshUserInfo ~ error:", error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleLogout = async () => {
    if (walletClient) {
      disconnect()
    }
    reset()
  }

  return {
    userInfo,
    token,

    login: handleLogin,
    logout: handleLogout,
    refreshUserInfo: handleRefreshUserInfo,
  }
}
