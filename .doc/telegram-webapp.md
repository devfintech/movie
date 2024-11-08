# Config Telegram WebApp

1. Add script telegram webapp to file index.html

```javascript
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

2. Install telegram type package

```
yarn add @types/telegram-web-app -D
```

3. Create telegram instance

<details>
<summary>View Code: telegram.ts</summary>

```typescript
import { isProduction } from "@/configs/env.config"
import { TELEGRAM_BOT_URL } from "@/configs/telegram.config"
import { ParsedInitData, UserInitData } from "@/types/telegram.type"
import { openLinkInNewTab } from "./common"
import { JsonUtils } from "./json-utils"

class Telegram {
  private readonly fakeInitData: string
  readonly botURL: string
  WebApp: WebApp
  constructor() {
    if (!window.Telegram) {
      console.error(`[Telegram]: Telegram Web App does not exists`)
    }

    this.WebApp = window.Telegram?.WebApp || {}
    this.fakeInitData = ""
    this.botURL = TELEGRAM_BOT_URL
  }

  private queryStringToObject<T>(queryString: string): T {
    return Object.fromEntries(new URLSearchParams(queryString)) as T
  }

  getInitData() {
    const initData = this.WebApp.initData
    if (!isProduction) {
      console.log("Init Data", this.WebApp.initData)
    }
    if (!initData) return

    const parsedInitData = this.queryStringToObject<ParsedInitData>(initData)

    const user = JsonUtils.parse<UserInitData>(parsedInitData.user as string, {
      onError(error) {
        console.log("🚀 ~ Telegram ~ getInitData ~ error:", error)
      },
    })

    if (!user) return

    parsedInitData.user = user

    return parsedInitData
  }

  expand() {
    return this.WebApp.expand()
  }
  close() {
    return this.WebApp.close()
  }
  enableClosingConfirmation() {
    return this.WebApp.enableClosingConfirmation()
  }
  openLink(
    url: string,
    options?:
      | {
          try_instant_view?: boolean | undefined
        }
      | undefined,
  ) {
    if (this.WebApp.platform === "android") {
      return openLinkInNewTab(url)
    }

    return window.Telegram?.WebApp?.openLink(url, options)
  }
  openTelegramLink(url: string) {
    return window.Telegram?.WebApp?.openTelegramLink(url)
  }

  showConfirm(message: string) {
    return new Promise<boolean>((resolve) => {
      this.WebApp.showConfirm(message, (ok) => {
        resolve(ok)
      })
    })
  }

  showAlert(message: string) {
    return new Promise<void>((resolve) => {
      this.WebApp.showAlert(message, () => {
        resolve()
      })
    })
  }

  showPopup(poupParams: PopupParams) {
    return new Promise<string>((resolve) => {
      this.WebApp.showPopup(poupParams, (button_id) => {
        resolve(button_id)
      })
    })
  }

  openInvoice(url: string) {
    return new Promise<{ url: string; status: "paid" | "cancelled" | "failed" | "pending" }>((resolve) => {
      this.WebApp.openInvoice(url, (url, status) => {
        resolve({ url, status })
      })
    })
  }

  get platform() {
    return this.WebApp.platform
  }

  get version() {
    return this.WebApp.version
  }
}

export const telegram = new Telegram()
```

</details>

4.
