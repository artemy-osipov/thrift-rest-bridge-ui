<script lang="ts">
  import type { Readable } from 'svelte/store'
  import { page } from '$app/stores'
  import type { OperationId } from '$lib/data/service.model'
  import { servicesStore } from '$lib/data/services.store'
  import { gotoWithQueryParams } from '$lib/utils/url.utils'
  import OperationProxy from './OperationProxy.svelte'
  import ServiceList from './ServiceList.svelte'

  let currentOperationId: Readable<OperationId | null>
  $: currentOperationId = servicesStore.exists(
    parseOperationIdFromQuery($page.url.searchParams)
  )

  function parseOperationIdFromQuery(
    params: URLSearchParams
  ): OperationId | null {
    const serviceId = params.get('serviceId')
    const operationName = params.get('operationName')
    if (serviceId && operationName) {
      return {
        serviceId,
        operationName,
      }
    }
    return null
  }

  function onSelectedOperation(event: CustomEvent<OperationId>) {
    gotoWithQueryParams({ ...event.detail })
  }
</script>

<section>
  <nav>
    <ServiceList
      on:selected={onSelectedOperation}
      selected={$currentOperationId}
    />
  </nav>
  <main>
    {#if $currentOperationId}
      <OperationProxy operationId={$currentOperationId} />
    {/if}
  </main>
</section>

<style>
  section {
    display: flex;
    height: 100%;
  }

  nav {
    width: 20%;
    min-width: 200px;
    background-color: #d3d3d3;
  }

  main {
    flex-grow: 1;
  }

  nav,
  main {
    padding: 10px;
    overflow: hidden;
  }
</style>
