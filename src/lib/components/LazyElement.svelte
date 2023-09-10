<script lang="ts" generics="T">
  // todo https://github.com/sveltejs/svelte-eslint-parser/issues/306
  // eslint-disable-next-line no-undef
  export let lazy: Promise<T> | null = null
</script>

{#if lazy}
  {#await lazy}
    <progress class="progress is-small is-info" />
  {:then loaded}
    <slot {loaded} />
  {:catch error}
    <textarea disabled value={error} />
  {/await}
{/if}
