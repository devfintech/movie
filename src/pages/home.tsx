import { Container } from "@/components/layouts/container"
import { Service } from "@/services/app.service"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [listNational, setListNational] = useState<any>()
  console.log("🚀 ~ HomePage ~ listNational:", listNational)
  useEffect(() => {
    const fetchListNational = async () => {
      const res = await Service.movie.getListNational({ slug: "viet-nam", page: 1 })
      if (res) {
        setListNational(res)
      }
    }
    fetchListNational()
  }, [])
  return (
    <>
      <div className="">
        <Container></Container>
      </div>
    </>
  )
}

export default HomePage
