import { Switch } from "antd"
import { FC, useState } from "react"
import { useDisconnect } from "wagmi"

import { ENV } from "@/configs/env.config"
import { useAppSettingsStore } from "@/hooks/stores/use-app-settings-store"
import { useVersionStore } from "@/hooks/stores/use-version-store"
import { Button } from "@/libs/ui/button"
import { sleep } from "@/utils/promise"

interface DevSettingsProps {}

export const DevSettings: FC<DevSettingsProps> = () => {
  const [isLoadingThemeChanged, setIsLoadingThemeChanged] = useState(false)
  const { theme, toggleTheme } = useAppSettingsStore()

  const { disconnectAsync } = useDisconnect()

  const { version } = useVersionStore()

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <p className="">Enviroment: </p>
        <div className="flex items-center gap-4 font-medium">
          <p className="capitalize">{ENV}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <p className="">Version: </p>
        <div className="flex items-center gap-2 font-medium">
          <p className="font-medium">{version}</p>
          <Button
            size="small"
            type="primary"
            className="h-6 px-2 text-[10px]"
            async
            onClick={async () => {
              localStorage.clear()
              sessionStorage.clear()
              await sleep(500)

              try {
                await disconnectAsync()
              } catch (error) {
                console.log("🚀 ~ onClick={ ~ error:", error)
              }

              window.location.reload()
            }}
          >
            Clear Cache
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm">
        <p className="">Theme: </p>
        <div className="flex items-center gap-2 font-medium">
          <Switch
            size="default"
            loading={isLoadingThemeChanged}
            checked={theme === "dark"}
            onChange={async () => {
              setIsLoadingThemeChanged(true)
              toggleTheme()
              await sleep(1000)
              setIsLoadingThemeChanged(false)
            }}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
      </div>
    </div>
  )
}
