import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export function init() {
  return worker.start({ onUnhandledRequest: 'bypass' })
}
