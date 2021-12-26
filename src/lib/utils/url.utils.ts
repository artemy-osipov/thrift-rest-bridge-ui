import { goto } from '$app/navigation'

type QueryParams = { [key: string]: string }

function upsertQueryParams(params: QueryParams): URLSearchParams {
  const queryParams = new URLSearchParams(window.location.search)
  Object.entries(params).forEach(([k, v]) => {
    queryParams.set(k, v)
  })
  return queryParams
}

export function urlWithQueryParams(params: QueryParams): string {
  const queryParams = upsertQueryParams(params)
  return (
    new URL(location.pathname, location.href).href +
    '?' +
    queryParams.toString()
  )
}

export function gotoWithQueryParams(params: QueryParams) {
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    queryParams.set(k, v)
  })
  goto(`?${queryParams.toString()}`, {
    keepfocus: true,
    noscroll: true,
  })
}
