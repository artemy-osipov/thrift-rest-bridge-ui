import { browser, dev } from '$app/env'

export const USE_MOCKS: boolean =
  dev &&
  import.meta.env.VITE_API_URL === undefined &&
  env('API_URL') === undefined
export const API_URL: string = USE_MOCKS
  ? 'mocks'
  : (import.meta.env.VITE_API_URL || env('API_URL')) + ''

if (dev) {
  console.log('USE_MOCKS ' + USE_MOCKS)
  console.log('API_URL ' + API_URL)
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function env(name: string): string | undefined {
  if (browser) {
    return (window as any).env?.[name]
  } else {
    return process.env[name]
  }
}
