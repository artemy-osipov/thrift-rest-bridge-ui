<script lang="ts">
  import { debounce } from 'lodash-es'
  import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte'
  import { getTemplate, proxyOperation } from '$lib/api/bridge.api'
  import type { JsonContent } from '$lib/components/JsonView.svelte'
  import JsonView from '$lib/components/JsonView.svelte'
  import LazyElement from '$lib/components/LazyElement.svelte'
  import type { OperationId, ProxyRequest } from '$lib/data/service.model'
  import {
    copyToClipboard,
    fromBase64,
    prettyJson,
    toBase64,
    tryParseJson,
  } from '$lib/utils/string.utils'
  import { urlWithQueryParams } from '$lib/utils/url.utils'
  import { page } from '$app/stores'
  import * as storage from '$lib/data/template.storage'

  export let operationId: OperationId
  let copiedUrl = false

  let endpoint: string
  let bodyContent: JsonContent = { text: '{}' }

  $: body = tryParseJson(bodyContent.text)

  let response: Promise<object> | null = null

  $: operationId, fetchRequestTemplate()
  $: operationId, endpoint, body, persistProxyRequest()

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
    const copyText = urlWithQueryParams({ form: toBase64(request) })
    copyToClipboard(copyText).then(() =>
      setTimeout(() => (copiedUrl = false), 300)
    )
  }

  function resetForm() {
    fetchOriginalRequestTemplate()
  }

  function fetchRequestTemplate() {
    const formParam = $page.url.searchParams.get('form')
    if (formParam) {
      const request: ProxyRequest = fromBase64(formParam)
      endpoint = request.endpoint
      updateBody(request.body)
    } else {
      const proxyRequest = storage.getProxyRequest(operationId)
      if (proxyRequest) {
        endpoint = proxyRequest.endpoint
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
            <a class="dropdown-item" on:click={copyPersistentUrl}>
              Copy persistent url
            </a>
          </div>
          <div class="dropdown-content">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="dropdown-item" on:click={resetForm}> Reset body </a>
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
