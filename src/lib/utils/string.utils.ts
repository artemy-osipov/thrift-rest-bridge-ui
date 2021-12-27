export function tryParseJson(json: string): object | null {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function prettyJson(json: object): string {
  return JSON.stringify(json, null, 2)
}

export function match(text: string, term: string): boolean {
  return normalize(text).includes(normalize(term))
}

function normalize(term: string): string {
  return term.toLocaleLowerCase()
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }
  return Promise.reject(
    `unsupported: window.isSecureContext=${window.isSecureContext}`
  )
}

export function toBase64(obj: object): string {
  const json = JSON.stringify(obj)
  return window.btoa(toBinary(json))
}

export function fromBase64<T>(s: string): T {
  const json = fromBinary(window.atob(s))
  return JSON.parse(json)
}

function toBinary(s: string): string {
  const codeUnits = new Uint16Array(s.length)
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = s.charCodeAt(i)
  }
  const charCodes = new Uint8Array(codeUnits.buffer)
  let result = ''
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i])
  }
  return result
}

function fromBinary(s: string): string {
  const bytes = new Uint8Array(s.length)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = s.charCodeAt(i)
  }
  const charCodes = new Uint16Array(bytes.buffer)
  let result = ''
  for (const cc of charCodes) {
    result += String.fromCharCode(cc)
  }
  return result
}
