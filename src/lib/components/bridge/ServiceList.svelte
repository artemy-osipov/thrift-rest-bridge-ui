<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte'
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte'

  import type { Operation, OperationId, Service } from '$lib/data/service.model'
  import { servicesStore } from '$lib/data/services.store'
  import type { Readable } from 'svelte/store'

  export let selected: OperationId | null

  type Events = { selected: OperationId }
  const dispatch = createEventDispatcher<Events>()

  let search: string
  let serviceListDiv: HTMLDivElement

  let filteredServices: Readable<Service[]>
  $: filteredServices = servicesStore.filtered(search)

  servicesStore.fetch().then(async () => {
    if (selected) {
      await tick()
      scrollTo(selected)
    }
  })

  function scrollTo(operationId: OperationId) {
    const elementId = `o_${operationId.serviceId}-${operationId.operationName}`
    const operationElem = serviceListDiv.querySelector(
      `li#${CSS.escape(elementId)}`
    )
    operationElem?.scrollIntoView({ block: 'center' })
  }

  function select(service: Service, operation: Operation): undefined {
    dispatch('selected', {
      serviceId: service.id,
      operationName: operation.name,
    })
    return
  }

  $: isSelected = function (service: Service, operation: Operation): boolean {
    return (
      selected != null &&
      selected.serviceId === service.id &&
      selected.operationName === operation.name
    )
  }
</script>

<form class="service-form">
  <p class="control has-icons-left">
    <input class="input" type="text" placeholder="Search" bind:value={search} />
    <span class="icon is-left">
      <FaSearch />
    </span>
  </p>

  <div class="menu service-list" bind:this={serviceListDiv}>
    {#each $filteredServices as service (service.id)}
      <p class="menu-label">
        {service.name}
      </p>
      <ul class="menu-list">
        {#each service.operations as operation (operation.name)}
          <li id="o_{service.id}-{operation.name}">
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a
              on:click|preventDefault={select(service, operation)}
              class:is-active={isSelected(service, operation)}
              >{operation.name}</a
            >
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</form>

<style>
  .service-form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .service-list {
    overflow: auto;
    margin-top: 20px;
    flex-grow: 1;
  }

  .service-list .menu-label {
    text-transform: none;
    font-size: 1em;
  }
</style>
