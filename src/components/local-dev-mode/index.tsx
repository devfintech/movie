import { FC } from "react"
import { IoArrowBackSharp } from "react-icons/io5"
import { TfiReload } from "react-icons/tfi"

import { useDevStore } from "@/hooks/stores/use-dev-store"
import { cn } from "@/utils/classnames"
import { DevSettings } from "./dev-settings"
import { FakeLogin } from "./fake-login"
import { FakeRouter } from "./fake-router"

interface LocalDevModeProps {}

export const LocalDevMode: FC<LocalDevModeProps> = () => {
  const { isOpenDev, setIsOpenDev } = useDevStore()

  return (
    <div
      id="dev-options"
      className={cn(
        "fixed left-4 top-4 z-[1000000] max-h-screen  transition-all",
        !isOpenDev ? "-translate-x-full " : "translate-x-0",
      )}
    >
      <div
        style={{
          writingMode: "vertical-lr",
        }}
        className="bg-primary-500 absolute -right-10 top-1/3 z-[1000] rotate-180 cursor-pointer rounded-md border px-1 py-2 text-center text-sm font-medium  text-white"
        onClick={() => setIsOpenDev(!isOpenDev)}
      >
        {isOpenDev ? "Hide" : "Show"}
      </div>

      <div
        className={cn(
          "border-primary-500 bg-body relative max-h-screen w-full min-w-[500px] max-w-[500px]  overflow-y-auto rounded-lg border  pb-10 transition-all max-sm:min-w-[350px]",
        )}
      >
        <div className="bg-body sticky left-0 top-0 z-10 mb-4 flex items-center justify-between gap-4 border-b p-4 pb-2">
          <h3 className=" text-lg font-medium">Local Dev Mode</h3>
          <div className="flex items-center gap-5">
            <button
              className="hover:text-primary-500"
              onClick={() => {
                setIsOpenDev(false)
              }}
            >
              <IoArrowBackSharp className="text-lg" />
            </button>
            <button
              className="hover:text-primary-500"
              onClick={() => {
                window.location.reload()
              }}
            >
              <TfiReload />
            </button>
          </div>
        </div>

        <div className="space-y-4 px-4">
          <DevSettings />
          <FakeLogin />
          <FakeRouter />
        </div>
      </div>
    </div>
  )
}
