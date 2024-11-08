import { Container } from "@/components/layouts/container"
import { Cat, Items, Paginate } from "@/services/movie.service"
import { Pagination } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import useSWR from "swr"

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [slug, setSlug] = useState<string>("viet-nam")
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  // const page = searchParams.get("page")
  const { data: listNational } = useSWR(
    ["useListNational", slug, page],
    async () => {
      const res = await axios.get<{
        status: string
        paginate: Paginate
        cat: Cat
        items: Items[]
      }>(`https://phim.nguonc.com/api/films/quoc-gia/${slug}`, {
        params: { page },
      })

      return res.data
    },
    // {
    //   refreshInterval: 10000,
    //   dedupingInterval: 0,
    // },
  )
  // console.log("🚀 ~ HomePage ~ listNational:", listNational)

  const handleChangePage = (page: number) => {
    setPage(page)
  }

  console.log("🚀 ~ HomePage ~ total:", total)
  useEffect(() => {
    if (listNational) {
      setTotal(listNational?.paginate?.total_page)
    }
    return
  }, [listNational])

  const national = ["viet-nam", "han-quoc", "trung-quoc"]

  return (
    <>
      <div className="">
        <div className="flex cursor-pointer gap-4">
          {national.map((item, index) => {
            return (
              <>
                <div
                  onClick={() => {
                    setSlug(item)
                  }}
                >
                  {item}
                </div>
              </>
            )
          })}
        </div>
        <Container>
          <div className="grid grid-cols-4 gap-4">
            {listNational?.items.map((item, index) => {
              return (
                <>
                  <Link to={`/detail-movie/?name=${item?.slug}`}>
                    <div className="w-60 overflow-hidden">
                      <img className="w-full" src={item.poster_url} alt="" />
                    </div>
                  </Link>
                </>
              )
            })}
          </div>
        </Container>
        <div className="mt-4 flex justify-center">
          <Pagination onChange={handleChangePage} current={page} total={total} pageSize={10} />
        </div>
      </div>
    </>
  )
}

export default HomePage
