import { useEffect, useRef, useState } from "react"

export function useViewWidth() {
  const [viewWidth, setViewWidth] = useState<number>(window.innerWidth)

  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    function handleChangeViewWidth() {
      clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        setViewWidth(window.innerWidth)
      }, 300)
    }
    window.addEventListener("resize", handleChangeViewWidth)

    return function () {
      window.removeEventListener("resize", handleChangeViewWidth)
    }
  }, [])

  return viewWidth
}
