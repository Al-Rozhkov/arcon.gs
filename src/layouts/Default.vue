<template>
  <div class="root">
    <div class="nav-header">
      <app-nav />
    </div>

    <slot />

    <app-footer />
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {

}
</script>


<style lang="scss">

</style>
