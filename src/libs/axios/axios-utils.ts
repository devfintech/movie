import axios, { AxiosError } from "axios"

export const isAxiosError = <T = any>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export const getAxiosError = <T = { errorMsg: string; errorCode: string }>(error: unknown) => {
  if (isAxiosError<T>(error)) {
    return error.response?.data
  }
}
