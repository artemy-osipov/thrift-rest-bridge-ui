import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'

const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),

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
