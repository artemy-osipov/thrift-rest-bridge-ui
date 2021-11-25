export function toBase64(s: string): string {
  return window.btoa(toBinary(s));
}

export function fromBase64(s: string): string {
  return fromBinary(window.atob(s));
}

function toBinary(s: string): string {
  const codeUnits = new Uint16Array(s.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = s.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = '';
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}

function fromBinary(s: string): string {
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = s.charCodeAt(i);
  }
  const charCodes = new Uint16Array(bytes.buffer);
  let result = '';
  for (let i = 0; i < charCodes.length; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}
