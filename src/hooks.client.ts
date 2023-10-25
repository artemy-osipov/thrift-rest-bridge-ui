import { USE_MOCKS } from '$lib/config/environment'

if (USE_MOCKS) {
  const { init } = await import('$lib/mock/init')
  await init()
}
