export function tryParseJson(json?: string): object | null {
  try {
    return json && JSON.parse(json)
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
  } else {
    // text area method
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '0'
    textArea.style.top = '0'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((res, rej) => {
      document.execCommand('copy') ? res() : rej()
      textArea.remove()
    })
  }
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
