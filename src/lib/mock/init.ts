import { setupWorker } from 'msw'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export function init() {
  return worker.start({ onUnhandledRequest: 'bypass' })
}
