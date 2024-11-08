import { getAxiosError } from "@/libs/axios/axios-utils"

export const openLinkInNewTab = (url?: string) => {
  if (!url) return

  window.open(url, "_blank")
}

export const openLinkInNewPopup = (url?: string) => {
  if (!url) return

  window.open(url, "_blank", "rel='noopener noreferrer'")
}

export const convertErrorCodeTypeEnumToString = (error: any) => {
  const errorMessage = error.response?.data?.["errorCode"]

  const isSnakeCase = /^[A-Z]+(?:_[A-Z]+)*$/.test(errorMessage)

  return isSnakeCase ? errorMessage.replaceAll("_", " ") : errorMessage
}

export const getErrorMessage = (error: any): string => {
  const axiosError = getAxiosError(error)

  if (axiosError) {
    return axiosError?.errorMsg || convertErrorCodeTypeEnumToString(error) || error?.message
  } else {
    return error?.shortMessage || error?.message
  }
}
