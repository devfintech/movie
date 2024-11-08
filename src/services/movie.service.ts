import axios from "axios"
export class MovieService {
  async getListNational({ slug, page }: { slug: string; page: number }) {
    const result = await axios.get<{
      status: string
      paginate: Paginate
      cat: Cat
      items: Items[]
    }>(`/quoc-gia/${slug}`, {
      params: {
        page,
      },
    })
    return result.data?.items
  }
}
export interface Items {
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  created: string
  modified: string
  description: string
  total_episodes: number
  current_episode: string
  time: string
  quality: string
  language: string
  director: string
  casts: string
}
export interface Paginate {
  current_page: number
  total_page: number
  total_items: number
  items_per_page: number
}
export interface Cat {
  name: string
  title: string
  slug: string
}
