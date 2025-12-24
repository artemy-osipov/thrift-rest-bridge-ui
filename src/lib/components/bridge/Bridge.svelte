<script lang="ts">
  import type { Readable } from "svelte/store";
  import { page } from "$app/state";
  import type { OperationId } from "$lib/data/service.model";
  import { servicesStore } from "$lib/data/services.store";
  import { gotoWithQueryParams } from "$lib/utils/url.utils";
  import OperationProxy from "./OperationProxy.svelte";
  import ServiceList from "./ServiceList.svelte";

  let currentOperationId: Readable<OperationId | null> = $derived(
    servicesStore.exists(parseOperationIdFromQuery(page.url.searchParams)),
  )

  function parseOperationIdFromQuery(
    params: URLSearchParams,
  ): OperationId | null {
    const serviceId = params.get("serviceId");
    const operationName = params.get("operationName");
    return serviceId && operationName ? { serviceId, operationName } : null;
  }

  function onSelectedOperation(id: OperationId) {
    gotoWithQueryParams({ ...id })
  }
</script>

<section class="grid grid-cols-[minmax(0,20%)_1fr] h-full">
  <aside class="min-h-0 p-4">
    <ServiceList
      selected={onSelectedOperation}
      currentId={$currentOperationId}
    />
  </aside>
  <main class="overflow-auto">
    {#if $currentOperationId}
      <OperationProxy operationId={$currentOperationId} />
    {/if}
  </main>
</section>
