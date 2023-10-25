export async function createShortURL(url: URL): Promise<string> {
  const resp = await fetch(`https://clck.ru/--?url=${encodeURIComponent(url.toString())}`)
  return resp.text()
}
