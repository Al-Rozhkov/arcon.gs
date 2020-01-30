<template>
  <tr>
    <td class="td td-flex">
      <g-link :to="node.path" class="link-flex">
        <h2 class="h2">{{ node.id.toUpperCase() }}</h2>
        <g-image v-if="node.photos && node.photos.length > 0" :src="node.photos[0]" class="ill" />
      </g-link>
    </td>

    <td class="td">
      <material-icon v-for="(m, index) in node.mainUsage" :key="index" :mat-id="m" />
    </td>

    <td class="td">
      <material-icon
        v-for="(m, index) in node.possibleUsage"
        :key="index"
        :mat-id="m"
        :mat-main="false"
      />
    </td>

    <td class="td">
      <svg-icon :icon-id="'coating-' + node.coating" :size="30" />
    </td>

    <td class="td">
      <svg-cogs-icon v-for="(obj, index) in node.cogs" :key="index" :cogs="obj" />
    </td>

    <td class="td">
      <svg-icon
        v-if="node.grooveInclination && node.grooveInclination.length > 0"
        icon-id="cogs-angle"
      >
        <text
          transform="matrix(1 0 0 1 27 16)"
          style="font-size:12px;"
        >{{ node.grooveInclination[0]}}&#xB0;</text>
        <text
          v-if="node.grooveInclination[1]"
          transform="matrix(1 0 0 1 27 28)"
          style="font-size:12px;"
        >{{ node.grooveInclination[1]}}&#xB0;</text>
      </svg-icon>
    </td>
  </tr>
</template>

<script>
import SvgIcon from '~/components/catalog/SvgFeatureIcon.vue'
import SvgCogsIcon from '~/components/catalog/SvgCogsIcon.vue'
import MaterialIcon from '~/components/catalog/MaterialIcon.vue'

export default {
  components: {
    SvgIcon,
    SvgCogsIcon,
    MaterialIcon
  },

  props: {
    node: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.link-flex {
  @extend %grid-row-wrap;
  color: $black;

  &:hover {
    h2.h2 {
      color: $link-hover-color;
    }
  }
}

.td {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.3rem 0.5rem;
}

.h2 {
  padding-top: 0.75rem;
  padding-right: 0.5rem;
  font-size: 1.5rem;
}

.ill {
  margin-left: auto;
  margin-right: 0;
}
</style>
