import { axiosInstance } from "@/libs/axios/axios-instance"
import { UserInfo } from "@/types/user.type"

export class UserService {
  async getUser() {
    const { data } = await axiosInstance.get<UserInfo>("/user/get")

    return data
  }
}
