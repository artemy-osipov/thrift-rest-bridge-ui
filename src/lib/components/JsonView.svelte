<script lang="ts" context="module">
  export type JsonContent = {
    text: string
  }
</script>

<script lang="ts">
  import { JSONEditor } from 'svelte-jsoneditor'

  export let content: JsonContent | null
  export let readOnly = false
</script>

{#if content}
  <JSONEditor bind:content mode={'code'} mainMenuBar={false} {readOnly} />
{/if}
