<script lang="ts">
  import { onMount } from 'svelte'
  import { USE_MOCKS } from '$lib/config/environment'
  import Header from '$lib/components/layout/Header.svelte'

  let initializated = false

  onMount(async () => {
    if (USE_MOCKS) {
      const { init } = await import('$lib/mock/init')
      init().then(() => (initializated = true))
    } else {
      initializated = true
    }
  })
</script>

<section>
  <Header />
  <main>
    {#if initializated}
      <slot />
    {/if}
  </main>
</section>

<style>
  @import 'bulma/css/bulma.min.css';

  :global(html, body) {
    height: 100%;
    overflow: hidden;
  }

  section {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  main {
    flex-grow: 1;
    min-height: 0;
  }

  /* svelte-icons */
  /* hack */
  :global(span.icon > svg) {
    height: 1em;
  }
</style>
