import { axiosInstance } from "@/libs/axios/axios-instance"
import { UserInfo } from "@/types/user.type"

export class AuthService {
  async getNonce(address: string) {
    const { data } = await axiosInstance.get<{
      nonce: string
    }>("/auth/get-nonce/", {
      params: {
        address,
      },
    })

    return data
  }

  async login(address: string, sign: string) {
    const { data } = await axiosInstance.post<{
      userInfo: UserInfo
      token: string
    }>("/auth/login", {
      address,
      sign,
    })

    return data
  }
}
