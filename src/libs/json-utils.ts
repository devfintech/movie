export class JsonUtils {
  public static parse<T = any>(
    data: string,
    {
      reviver,
      onError,
    }: { reviver?: (this: any, key: string, value: any) => any; onError?: (error: any) => void } = {},
  ): T | undefined {
    if (typeof data !== "string") return

    try {
      const response = JSON.parse(data, reviver) as T
      return response
    } catch (error: any) {
      onError && onError(error)

      return
    }
  }
  public static stringify<T>(
    data: T,
    {
      space,
      replacer,
      onError,
    }: {
      replacer?: ((this: any, key: string, value: any) => any) | undefined
      space?: string | number | undefined
      onError?: (error: any) => void
    } = {},
  ): string | undefined {
    try {
      const response = JSON.stringify(data, replacer, space)

      return response
    } catch (error: any) {
      onError && onError(error)

      return
    }
  }
}
