import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useSWR from "swr"

const DetailMovie = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const slugMovie = searchParams.get("name")
  const { data: detailMovie } = useSWR(
    ["useDetailMovie", slugMovie],
    async () => {
      const res = await axios.get(`https://phim.nguonc.com/api/film/${slugMovie}`)

      return res.data?.movie
    },
    // {
    //   refreshInterval: 10000,
    //   dedupingInterval: 0,
    // },
  )

  console.log("🚀 ~ DetailMovie ~ detailMovie:", detailMovie)

  const [embed, setEmbed] = useState<string>("")
  const [m3u8, setM3u8] = useState<string>("")
  const [episode, setEpisode] = useState<number>(1)

  useEffect(() => {
    if (detailMovie) {
      setEmbed(detailMovie?.episodes[0]?.items[0]?.embed)
      setM3u8(detailMovie?.episodes[0]?.items[0]?.m3u8)
    }
  }, [])
  const navigate = useNavigate()
  return (
    <>
      <div className="relative flex h-screen w-screen flex-col gap-4 overflow-hidden">
        <div className="absolute h-screen w-screen bg-[linear-gradient(_180deg,_#01040e_8.76%,_rgba(1,_4,_14,_0)_47.49%,_#01040e_100%)]"></div>
        <img src={detailMovie?.poster_url} alt="" className="w-full max-xl:hidden" />
        <img src={detailMovie?.thumb_url} alt="" className="hidden h-full w-full max-xl:flex" />
        <div className="absolute top-0 cursor-pointer p-4 text-2xl font-medium" onClick={() => navigate(-1)}>
          Back
        </div>
        <div className="absolute bottom-0 flex flex-col gap-4 p-4">
          <div
            className="flex max-w-40 cursor-pointer items-center justify-center rounded-2xl bg-blue-900 p-3 active:scale-95"
            onClick={() => {
              window.open(embed, "_blank")
            }}
          >
            {episode}
          </div>
          <div className="flex cursor-pointer gap-2">
            {detailMovie?.episodes[0]?.items.map((item: any, index: number) => {
              return (
                <>
                  <div
                    onClick={() => {
                      setEmbed(item?.embed)
                      setEpisode(index + 1)
                    }}
                    className="rounded-lg bg-blue-900 p-1"
                  >
                    {item?.name}
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailMovie
