import { axiosInstance } from "@/libs/axios/axios-instance"
import { BaseResponse } from "@/types/core.type"
import { Web3Config } from "@/types/web3.type"

export class Web3Service {
  async getWeb3Service() {
    const { data } = await axiosInstance.get<BaseResponse<Web3Config>>("/web3/configs")

    return data.data
  }
}
