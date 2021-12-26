<script lang="ts">
  type T = $$Generic
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
