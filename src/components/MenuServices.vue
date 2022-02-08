<template>
  <app-menu v-once>
    <app-menu-item
      v-for="{ node } in $static.services.edges"
      :key="node.id"
      :to="node.path"
    >{{ node.title }}</app-menu-item>
  </app-menu>
</template>

<static-query>
query Services {
  services: allService(sortBy: "weight", order: ASC) {
    edges{
      node {
        path
        title
      }
    }
  }
}
</static-query>
