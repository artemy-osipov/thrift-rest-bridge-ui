<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
</script>

<AppBar>
  <AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
    <AppBar.Lead>
      <img src="bridge.svg" alt="bridge" class="size-7" />
    </AppBar.Lead>
    <AppBar.Headline>
      <p class="text-xl">Thrift Bridge</p>
    </AppBar.Headline>
    <AppBar.Trail>
      <a
        class="btn-icon hover:preset-tonal size-7"
        rel="noreferrer"
        href="https://github.com/artemy-osipov/thrift-rest-bridge-ui"
        aria-label="github"
        target="_blank"
      >
        <img src="github.svg" alt="github" class="size-7"/>
      </a>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>
