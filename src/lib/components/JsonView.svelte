<script lang="ts" context="module">
  export type JsonContent = TextContent
</script>

<script lang="ts">
  import { JSONEditor, Mode, type TextContent } from 'svelte-jsoneditor'

  export let content: JsonContent | null
  export let readOnly = false
</script>

{#if content}
  <JSONEditor
    bind:content
    mode={Mode.text}
    mainMenuBar={false}
    statusBar={false}
    {readOnly}
  />
{/if}
