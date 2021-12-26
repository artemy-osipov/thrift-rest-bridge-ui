import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { viteOptimizeDeps } from 'svelte-jsoneditor/config'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      fallback: 'index.html',
    }),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      optimizeDeps: {
        include: [...viteOptimizeDeps],
      },
    },
  },
}

export default config
