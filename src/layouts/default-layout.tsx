import { FC, useEffect } from "react"
import { Outlet } from "react-router-dom"

interface DefaultLayoutProps {}

export const DefaultLayout: FC<DefaultLayoutProps> = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F12") {
        event.preventDefault()
      }

      if (event.ctrlKey && event.shiftKey && event.key === "I") {
        event.preventDefault()
      }

      if (event.ctrlKey && event.shiftKey && event.key === "J") {
        event.preventDefault()
      }

      if (event.ctrlKey && event.key === "U") {
        event.preventDefault()
      }
    }

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault()
    }

    const detectConsoleOpen = () => {
      const element = new Image()
      Object.defineProperty(element, "id", {
        get: function () {
          window.location.href = "about:blank"
        },
      })
      console.log(element)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", handleContextMenu)

    detectConsoleOpen()

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])
  return (
    <div>
      {/* <Header /> */}
      <main className="">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
