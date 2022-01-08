<script lang="ts">
  import { onMount } from 'svelte'
  import { USE_MOCKS } from '$lib/config/environment'

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
  <header>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="bridge.svg" width="30" height="30" alt="" />
        </div>
      </div>

      <div class="navbar-start">
        <div class="navbar-item">
          <span>Thrift Bridge</span>
        </div>
      </div>
    </nav>
  </header>
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
