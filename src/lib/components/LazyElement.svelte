<script lang="ts" generics="T">
  export let lazy: Promise<T> | null = null
</script>

{#if lazy}
  {#await lazy}
    <progress class="progress is-small is-info"></progress>
  {:then loaded}
    <slot {loaded} />
  {:catch error}
    <textarea disabled value={error}></textarea>
  {/await}
{/if}
