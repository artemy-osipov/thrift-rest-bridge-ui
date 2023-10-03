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

export function encode(obj: object): string {
  const json = JSON.stringify(obj)
  return window.encodeURIComponent(json)
}

export function decode<T>(s: string): T {
  const json = window.decodeURIComponent(s)
  return JSON.parse(json)
}
