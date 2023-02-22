import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      fallback: 'index.html',
    }),
    paths: {
      base: dev ? '' : '/__BASE_URL',
    },
  },
}

export default config
