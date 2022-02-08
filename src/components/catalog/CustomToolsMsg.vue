<template>
  <div v-once>
    <p class="lead">
      {{ $static.tMsgCustomTools.value }}
      <g-link to="/catalog/custom/">{{ $static.tMsgCustomToolsLink.value }}</g-link
      >.
    </p>
  </div>
</template>

<static-query>
query ProductFilters {
  tMsgCustomTools: t(id: "catalog.overview.msg-custom-tools") {
    value
  }
  tMsgCustomToolsLink: t(id: "catalog.overview.msg-custom-tools-link-text") {
    value
  }
}
</static-query>