<script lang="ts">
  import { debounce } from 'lodash-es'
  import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte'
  import { getTemplate, proxyOperation } from '$lib/api/bridge.api'
  import { createShortURL } from '$lib/api/short.api'
  import type { JsonContent } from '$lib/components/JsonView.svelte'
  import JsonView from '$lib/components/JsonView.svelte'
  import LazyElement from '$lib/components/LazyElement.svelte'
  import type { OperationId, ProxyRequest } from '$lib/data/service.model'
  import {
    copyToClipboard,
    decode,
    encode,
    prettyJson,
    tryParseJson,
  } from '$lib/utils/string.utils'
  import { urlWithQueryParams } from '$lib/utils/url.utils'
  import { page } from '$app/stores'
  import * as storage from '$lib/data/template.storage'

  export let operationId: OperationId
  let copiedUrl = false

  let endpoint: string
  let bodyContent: JsonContent | null
  let response: Promise<object> | null = null

  $: operationId, fetchRequestTemplate()
  $: body = tryParseJson(bodyContent?.text)
  $: endpoint, body, persistProxyRequest()

  let persistProxyRequest = debounce(() => {
    body &&
      storage.persistProxyRequest(operationId, {
        endpoint,
        body,
      })
  }, 300)

  function onProxyOperation() {
    if (endpoint && body) {
      response = proxyOperation(operationId, endpoint, body)
    }
  }

  function copyPersistentUrl() {
    copiedUrl = true
    const request: ProxyRequest = { endpoint, body: body || {} }
    const copyText = urlWithQueryParams({ form: encode(request) })
    copyToClipboard(copyText).then(() =>
      setTimeout(() => (copiedUrl = false), 300)
    )
  }

  async function copyShortPersistentUrl() {
    copiedUrl = true
    const request: ProxyRequest = { endpoint, body: body || {} }
    const url = urlWithQueryParams({ form: encode(request) })
    const copyText = await createShortURL(new URL(url))
    copyToClipboard(copyText).then(() =>
      setTimeout(() => (copiedUrl = false), 300)
    )
  }

  function resetForm() {
    bodyContent = null
    fetchOriginalRequestTemplate()
  }

  function fetchRequestTemplate() {
    bodyContent = null
    const formParam = $page.url.searchParams.get('form')
    if (formParam) {
      const request: ProxyRequest = decode(formParam)
      endpoint = request.endpoint
      updateBody(request.body)
    } else {
      const proxyRequest = storage.getProxyRequest(operationId)
      endpoint = proxyRequest.endpoint
      if (proxyRequest.body) {
        updateBody(proxyRequest.body)
      } else {
        fetchOriginalRequestTemplate()
      }
    }
  }

  function fetchOriginalRequestTemplate() {
    getTemplate(operationId).then(
      (val) => updateBody(val),
      (rej) => updateBody({ error: rej })
    )
  }

  function updateBody(json: object) {
    bodyContent = {
      text: prettyJson(json),
    }
  }
</script>

<form class="proxy-service" on:submit|preventDefault={onProxyOperation}>
  <div class="action-row">
    <input
      type="text"
      placeholder="Endpoint"
      class="input"
      class:is-danger={!endpoint}
      bind:value={endpoint}
    />
    <div class="split-button">
      <button type="submit" class="button is-info">Send</button>
      <div class="dropdown is-right is-hoverable">
        <div class="dropdown-trigger">
          <button type="button" class="button is-info">
            <span class="icon is-small">
              <FaAngleDown />
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu2" role="menu">
          <div
            class="dropdown-content"
            class:has-background-success={copiedUrl}
          >
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a
              class="dropdown-item"
              on:click={copyPersistentUrl}
              role="button"
              tabindex="0"
            >
              Copy persistent url
            </a>
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a
              class="dropdown-item"
              on:click={copyShortPersistentUrl}
              role="button"
              tabindex="0"
            >
              Copy short url
            </a>
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a
              class="dropdown-item"
              on:click={resetForm}
              role="button"
              tabindex="0"
            >
              Reset body
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="request-row">
    <JsonView bind:content={bodyContent} />
  </div>
  <hr />
  <div class="response-row">
    <LazyElement lazy={response} let:loaded={_resp}>
      <JsonView
        content={_resp && { text: prettyJson(_resp) }}
        readOnly={true}
      />
    </LazyElement>
  </div>
</form>

<style>
  form.proxy-service {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .action-row {
    display: flex;
  }

  .action-row .split-button {
    margin-left: 10px;
    display: inline-flex;
  }

  .action-row .split-button button {
    border-color: #837ea9;
  }

  .action-row .split-button > button {
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
    border-right: 0px;
  }

  .action-row .split-button .dropdown button {
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
    width: 75%;
  }

  .request-row {
    height: 40vh;
  }

  .response-row {
    height: 30vh;
  }
</style>
