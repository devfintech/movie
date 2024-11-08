# Unity Config App

1. Replace file index.html in folder unity game

<details>
<summary>View Code</summary>

```html
<!doctype html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Unity Web Player</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        width: 100%;
        height: 100%;
      }

      html body canvas {
        width: 100% !important;
        height: 100% !important;
      }
    </style>
  </head>

  <body style="text-align: center; padding: 0; border: 0; margin: 0;">
    <canvas
      id="unity-canvas"
      width="270"
      height="480"
      tabindex="-1"
      style="width: 270px; height: 480px; background: #231F20"
    ></canvas>
    <script src="Build/Web.loader.js"></script>
    <script>
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:
        var meta = document.createElement("meta")
        meta.name = "viewport"
        meta.content =
          "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes"
        document.getElementsByTagName("head")[0].appendChild(meta)

        var canvas = document.querySelector("#unity-canvas")
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        canvas.style.position = "fixed"

        document.body.style.textAlign = "left"
      }

      createUnityInstance(
        document.querySelector("#unity-canvas"),
        {
          arguments: [],
          dataUrl: "Build/Web.data",
          frameworkUrl: "Build/Web.framework.js",
          codeUrl: "Build/Web.wasm",
          streamingAssetsUrl: "StreamingAssets",
          companyName: "DefaultCompany",
          productName: "UnityGame",
          productVersion: "0.1.0",
          // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
          // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        },
        (progress) => {
          window.parent.postMessage(JSON.stringify({ EventName: "GameProgress", Data: progress }), "*")
        },
      )
        .then((gameInstance) => {
          window.addEventListener("message", (e) => {
            const { gameObjectName, methodName, data, type } = e.data

            switch (type) {
              case "SendMessage":
                if (!gameObjectName || !methodName) return

                let gameParameter

                switch (typeof data) {
                  case "number":
                  case "string":
                  case "boolean":
                  case "undefined":
                    gameParameter = data
                    break
                  case "bigint":
                  case "function":
                  case "symbol":
                    console.log(`[GameError/index.html]: typeof gameParameter(${typeof data}) does not support`)
                    break

                  case "object":
                  default:
                    gameParameter = JSON.stringify(data || "")
                }

                gameInstance.SendMessage(gameObjectName, methodName, gameParameter)

                break

              case "Quit":
                gameInstance.Quit()
                break

              case "SetFullscreen":
                gameInstance.SetFullscreen()
                break
            }
          })
        })
        .catch((err) => {
          window.parent.postMessage(JSON.stringify({ EventName: "GameError", Data: err }), "*")
        })
    </script>
  </body>
</html>
```

</details>

2. Declare type

<details>
    <summary>View Code: game.type.ts</summary>

```typescript
export interface GameConfig {
  url: string
}

export enum PostMessageDataType {
  SEND_MESSAGE = "SendMessage",
  QUIT_GAME = "Quit",
  SET_FULLSCREEN = "SetFullscreen",
}

export interface MessageEventDataUnity<T = any> {
  EventName: string
  Data: T
}
```

</details>

3. Create game service
<details>
    <summary>View Code: common.service.ts</summary>

```typescript
import { axiosInstance } from "@/libs/axios/axios-instance"

export class CommonService {
  async getUrlGame() {
    const { data } = await axiosInstance.request<string>({
      method: "GET",
      url: "/common/link-game",
      params: {},
    })
    return data
  }
}
```

</details>

4. Create store to save game config
<details>
    <summary>View Code: use-game-store.ts</summary>

```typescript
import { GameConfig } from "@/types/game.type"
import { create } from "zustand"

export interface GameStoreProps {
  isGameProcessing?: boolean
  mode: "local" | "s3"
  game: GameConfig

  setIsGameProcessing(isGameProcessing: boolean): void
  setMode(mode: "local" | "s3", gameUrl?: string): void
  setGame(game: GameConfig): void
}

const VERSION = "v0.0.1"

const GAME_LOCAL_URL = `${window.location.origin}/games/${VERSION}/index.html`

export const useGameStore = create<GameStoreProps>()((set, get) => {
  return {
    isGameProcessing: false,
    mode: "s3",
    game: {
      url: GAME_LOCAL_URL,
    },

    setIsGameProcessing(isGameProcessing) {
      set({ isGameProcessing })
    },
    setGame(game) {
      set({ game })
    },
    async setMode(mode) {
      set({ mode })

      if (mode === "local") {
        set({
          game: {
            url: GAME_LOCAL_URL,
          },
        })
      }
    },
  }
})
```

</details>

5. Listen game message event

<details>
    <summary>View Code: use-listen-message-event-unity.ts</summary>

```typescript
import { useGameStore } from "@/hooks/stores/use-game-store"
import { MessageEventDataUnity } from "@/types/game.type"
import { JsonUtils } from "@/utils/json-utils"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

export type MessageEventType = MessageEvent<string>

export const useListenMessageEventUnity = (callback: (data: MessageEventDataUnity) => void, deps: any[] = []) => {
  const { mode, game } = useGameStore(useShallow((state) => ({ mode: state.mode, game: state.game })))

  useEffect(() => {
    const handleListenEvent = (e: MessageEventType) => {
      if (!game?.url?.startsWith(e.origin) && mode === "s3") return

      const eventData = JsonUtils.parse(e.data, {
        onError(error) {
          console.log("🚀 ~ handleListenEvent ~ error:", error, e, mode)
        },
      }) as MessageEventDataUnity

      if (eventData) {
        callback(eventData)
      }
    }

    window.addEventListener("message", handleListenEvent)

    return () => {
      window.removeEventListener("message", handleListenEvent)
    }
  }, [mode, game?.url, ...deps])
}
```

</details>

6. Post data to the game

<details>
    <summary>View Code: use-unity-game.ts</summary>

```typescript
import { useGameStore } from "@/hooks/stores/use-game-store"
import { PostMessageDataType } from "@/types/game.type"
import { RefObject, useCallback } from "react"

export const useUnityGame = (refOrTargetId?: RefObject<HTMLIFrameElement> | string) => {
  const { game } = useGameStore()

  const handleSendMessage = useCallback(
    <T>(gameObjectName: string, methodName: string, data: T) => {
      if (typeof refOrTargetId === "string") {
        const gameElement = document.getElementById(refOrTargetId) as HTMLIFrameElement

        if (!gameElement) return false

        gameElement.contentWindow?.postMessage(
          { type: PostMessageDataType.SEND_MESSAGE, gameObjectName, methodName, data },
          game.url,
        )

        return true
      } else {
        if (!refOrTargetId?.current || !game?.url) return false

        refOrTargetId.current?.contentWindow?.postMessage(
          { type: PostMessageDataType.SEND_MESSAGE, gameObjectName, methodName, data },
          game.url,
        )

        return true
      }
    },
    [game.url, refOrTargetId],
  )

  const handleQuitGame = useCallback(() => {
    if (typeof refOrTargetId === "string") {
      const gameElement = document.getElementById(refOrTargetId) as HTMLIFrameElement

      if (!gameElement) return false

      gameElement.contentWindow?.postMessage({ type: PostMessageDataType.QUIT_GAME }, game.url)
    } else {
      if (!refOrTargetId?.current || !game?.url) return false

      refOrTargetId.current?.contentWindow?.postMessage({ type: PostMessageDataType.QUIT_GAME }, game.url)
    }
  }, [game.url, refOrTargetId])

  const handleRequestFullScreen = useCallback(() => {
    if (typeof refOrTargetId === "string") {
      const gameElement = document.getElementById(refOrTargetId) as HTMLIFrameElement

      if (!gameElement) return false

      gameElement.contentWindow?.postMessage({ type: PostMessageDataType.SET_FULLSCREEN }, game.url)
    } else {
      if (!refOrTargetId?.current || !game?.url) return false

      refOrTargetId.current?.contentWindow?.postMessage({ type: PostMessageDataType.SET_FULLSCREEN }, game.url)
    }
  }, [game.url, refOrTargetId])

  return {
    requestFullscreen: handleRequestFullScreen,
    sendMessage: handleSendMessage,
    quitGame: handleQuitGame,
  }
}
```

</details>
