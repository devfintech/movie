import { ENV, Env } from "./env.config"

export const gaConfig = <const>{
  [Env.development]: "",
  [Env.staging]: "",
  [Env.production]: "",
}

export const GA_ID = gaConfig[ENV]
