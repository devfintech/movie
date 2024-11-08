export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function retry<T>(
  fn: () => Promise<T>,
  { retries = 10, delay = 1000 }: { retries?: number; delay?: number } = {},
): Promise<T> {
  let lastError: Error | undefined
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (e) {
      if (e instanceof Error) {
        lastError = e
      }
      await sleep(delay)
    }
  }
  throw lastError
}
