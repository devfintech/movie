import { ENV, Env, isLocalDev } from "./env.config"

const HOSTS = <const>{
  [Env.development]: "",
  [Env.staging]: "",
  [Env.production]: "",
}

export const HOST = isLocalDev ? window.location.origin : HOSTS[ENV] || window.location.origin
