import { JsonUtils } from "@/libs/json-utils"

export enum Env {
  development = "development",
  staging = "staging",
  production = "production",
}

export const supportedEnvs = [Env.development, Env.staging, Env.production]

export const ENV: Env =
  supportedEnvs.find((supportedEnv) => supportedEnv === import.meta.env.VITE_ENV) || Env.development

export const isProduction = ENV === Env.production

export const isLocalDev = !import.meta.env.PROD

export const isEnabledLocalDevMode = JsonUtils.parse(import.meta.env.VITE_ENABLE_LOCAL_DEV_MODE)
