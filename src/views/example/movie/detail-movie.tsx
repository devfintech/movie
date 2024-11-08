import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useSWR from "swr"
import VideoPlayer from "../video"

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

  const [embed, setEmbed] = useState<string>()
  const [m3u8, setM3u8] = useState<string>()
  console.log("🚀 ~ DetailMovie ~ m3u8:", m3u8)
  //   console.log("🚀 ~ DetailMovie ~ embed:", embed)

  useEffect(() => {
    if (detailMovie) {
      setEmbed(detailMovie?.episodes[0]?.items[0]?.embed)
      setM3u8(detailMovie?.episodes[0]?.items[0]?.m3u8)
    }
  }, [searchParams])

  return (
    <>
      <div>
        <div>{embed}</div>
        <VideoPlayer
          src={`https://cors-anywhere.herokuapp.com/https://sing.phimmoi.net/a69218b85c210a4250320777f4bf549f/hls.m3u8`}
        />
        <div className="flex cursor-pointer gap-2">
          {detailMovie?.episodes[0]?.items.map((item: any) => {
            return (
              <>
                <div onClick={() => setEmbed(item?.embed)} className="rounded-lg bg-blue-900 p-1">
                  {item?.name}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default DetailMovie
