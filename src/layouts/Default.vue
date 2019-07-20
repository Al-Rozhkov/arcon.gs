<template>
  <div class="layout">
    <div v-if="!!$slots.submenu" class="container-xl d-print-none">
      <slot name="submenu" />
    </div>

    <slot />
  </div>
</template>
