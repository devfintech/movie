export const storagePrefix = "persited" as const

export const storageKeyConfigs = {
  appSettings: "app-settings",
  user: "user",
  client: "client",
  tokens: "tokens",
  web3: "web3",
  dev: "dev",
  version: "version",
} as const

type StorageValue<T> = `${typeof storagePrefix}__${string & T}`

// type StorageValue<T> = T extends infer G
//   ? `${typeof storagePrefix}-${string & G}`
//   : `${typeof storagePrefix}-${string}`

type ValueOf<T> = T[keyof T]

type StorageKeyType<T extends object> = {
  [Property in keyof T]: StorageValue<T[Property]>
}

const generateStorageKeys = <T extends object>(storageKey: T) => {
  const keys = Object.keys(storageKey) as (keyof T)[]
  const values = Object.values(storageKey) as ValueOf<T>[]

  const result = keys.reduce((prev, cur, index) => {
    return {
      ...prev,
      [cur]: `${storagePrefix}__${values[index]}`,
    }
  }, {}) as StorageKeyType<T>
  return result
}

export const storageKeys = generateStorageKeys(storageKeyConfigs)
