<script lang="ts">
  import './layout.css';
  import Header from '$lib/components/layout/Header.svelte'
</script>

<section class="grid h-screen grid-rows-[auto_1fr]">
  <Header />
  <main class="min-h-0">
    <slot />
  </main>
</section>

<style>
  /* @import 'bulma/css/bulma.min.css'; */

  /* :global(html, body) {
    height: 100%;
    overflow: hidden;
  } */

  /* section {
    display: flex;
    flex-direction: column;
    height: 100vh;
  } */

  /* main {
    flex-grow: 1;
    min-height: 0;
  } */

  /* svelte-icons */
  /* hack */
  /* :global(span.icon > svg) {
    height: 1em;
  } */
</style>
