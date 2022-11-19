export const wait = async (condition: () => boolean, timeout = 1000, delay = 250) => {
  if (!condition) return false
  const retry = Math.ceil(timeout / delay)
  for await (const _i of new Array(retry)) {
    if (condition()) return true
    await sleep(delay)
  }
  return false
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
