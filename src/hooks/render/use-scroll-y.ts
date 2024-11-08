import { useEffect, useState } from "react"

const SCROLL_HEIGHT = 50

export const useScrollY = (scrollHeight: number = SCROLL_HEIGHT) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setVisible(window.scrollY > scrollHeight)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollHeight])

  return { visible }
}
