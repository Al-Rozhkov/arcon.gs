<template>
  <div class="layout">
    <div class="container-xl d-print-none">
      <app-menu class="submenu">
        <app-menu-item to="/catalog/drills/">Сверла</app-menu-item>
        <app-menu-item to="/catalog/end-mills/">Концевые фрезы</app-menu-item>
        <app-menu-item to="/catalog/thread-mills/">Резьбовые фрезы</app-menu-item>
        <app-menu-item to="/catalog/special/" bold>Специальный инструмент (по чертежу)</app-menu-item>
      </app-menu>
    </div>

    <slot />

    <svg-sprite-coating class="d-none" />
    <svg-sprite-features class="d-none" />

    <div class="container-xl">
      <p>
        Мы можем изготовить инструмент с индивидуальными параметрами. Перейдите в раздел
        <g-link to="/catalog/special">специального инструмента.</g-link>
      </p>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import SvgSpriteCoating from '~/components/catalog/SvgSpriteCoating'
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'

export default {
  components: {
    SvgSpriteCoating,
    SvgSpriteFeatures
  }
}
</script>
