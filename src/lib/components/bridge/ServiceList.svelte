<script lang="ts">
  import { onMount, tick } from "svelte";

  import type {
    Operation,
    OperationId,
    Service,
  } from "$lib/data/service.model";
  import { servicesStore } from "$lib/data/services.store";
  import type { Readable } from "svelte/store";

  interface Props {
    currentId: OperationId | null;
    selected: (id: OperationId) => void;
  }

  let { currentId, selected }: Props = $props();

  let search: string = $state("");
  let serviceListDiv: HTMLDivElement;

  let filteredServices: Readable<Service[]> = $derived(
    servicesStore.filtered(search),
  );

  onMount(() => {
    servicesStore.fetch().then(async () => {
      if (currentId) {
        await tick();
        scrollTo(currentId);
      }
    })
  })

  function scrollTo(operationId: OperationId) {
    const elementId = `o_${operationId.serviceId}-${operationId.operationName}`;
    const operationElem = serviceListDiv.querySelector(
      `li#${CSS.escape(elementId)}`,
    );
    operationElem?.scrollIntoView({ block: "center" });
  }

  function select(service: Service, operation: Operation) {
    selected({
      serviceId: service.id,
      operationName: operation.name,
    });
  }

  function isSelected(service: Service, operation: Operation): boolean {
    return (
      currentId != null &&
      currentId.serviceId === service.id &&
      currentId.operationName === operation.name
    );
  }
</script>

<div class="h-full w-full flex flex-col">
  <div class="input-group flex flex-row">
    <input
      class="ig-input"
      type="search"
      placeholder="Search"
      bind:value={search}
    />
  </div>

  <div class="p-4 space-y-6 h-full overflow-auto" bind:this={serviceListDiv}>
    {#each $filteredServices as service (service.id)}
      <div>
        <button
          class="w-full text-left font-semibold text-gray-500 mb-2 hover:text-gray-700"
          onclick={() => (search = service.name)}
        >
          {service.name}
        </button>

        <ul class="space-y-1">
          {#each service.operations as operation (operation.name)}
            <li id="o_{service.id}-{operation.name}">
              <button
                class="w-full text-left block px-3 py-2 text-sm rounded hover:preset-tonal hover:text-gray-400"
                class:preset-tonal={isSelected(service, operation)}
                onclick={() => select(service, operation)}
              >
                {operation.name}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
