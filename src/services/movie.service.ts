import { axiosInstance } from "@/libs/axios/axios-instance"

export class MovieService {
  async getListNational({ slug, page }: { slug: string; page: number }) {
    const result = await axiosInstance.get(`/quoc-gia/${slug}`, {
      params: {
        page,
      },
    })
    return result.data?.items || []
  }
}
