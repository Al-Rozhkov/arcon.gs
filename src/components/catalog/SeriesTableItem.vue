<template>
  <div class="tr flex-row-nowrap">
    <div class="td td-name">
      <g-link :to="node.path" class="link-flex" v-tooltip="node.body">
        <h2 class="h2">{{ node.id.toUpperCase() }}</h2>
        <g-image
          v-if="node.photos && node.photos.length > 0"
          :src="node.photos[0]"
          :alt="node.body"
          class="ill"
        />
      </g-link>
    </div>

    <div class="td td-usage">
      <material-icon v-for="(m, index) in node.mainUsage" :key="index" :mat-id="m" />
    </div>

    <div class="td td-usage">
      <material-icon
        v-for="(m, index) in node.possibleUsage"
        :key="index"
        :mat-id="m"
        :mat-main="false"
      />
    </div>

    <div class="td td-single">
      <svg-icon :icon-id="'coating-' + node.coating" :size="30" />
    </div>

    <div class="td td-double">
      <svg-cogs-icon v-for="(obj, index) in node.cogs" :key="index" :cogs="obj" />
      <svg-icon
        v-if="node.cuttingFluid && node.cuttingFluid !== 'none'"
        :icon-id="'cutting-fluid-' + node.cuttingFluid"
      />
      <svg-icon v-if="node.toolLength" icon-id="tool-length">
        <text
          transform="matrix(1 0 0 1 8 34)"
          class="tool-length-text"
        >{{ node.toolLength }}</text>
      </svg-icon>
      <svg-icon v-if="node.allowanceCuttingDiameter" icon-id="allowance-cutting-diameter">
        <text
          transform="matrix(1 0 0 1 12 34)"
          class="allowance-text"
        >{{ node.allowanceCuttingDiameter }}</text>
      </svg-icon>
    </div>

    <div class="td td-single">
      <svg-icon
        v-if="node.grooveInclination && node.grooveInclination.length > 0"
        icon-id="cogs-angle"
      >
        <text
          transform="matrix(1 0 0 1 27 16)"
          style="font-size:12px;"
        >{{ Math.round(node.grooveInclination[0]) }}&#xB0;</text>
        <text
          v-if="node.grooveInclination[1]"
          transform="matrix(1 0 0 1 27 28)"
          style="font-size:12px;"
        >{{ Math.round(node.grooveInclination[1]) }}&#xB0;</text>
      </svg-icon>
    </div>
  </div>
</template>

<script>
import SvgIcon from '~/components/catalog/SvgFeatureIcon.vue'
import SvgCogsIcon from '~/components/catalog/SvgCogsIcon.vue'
import MaterialIcon from '~/components/catalog/MaterialIcon.vue'

export default {
  components: {
    SvgIcon,
    SvgCogsIcon,
    MaterialIcon,
  },

  props: {
    node: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.flex-row-nowrap {
  width: 100%;
}

.link-flex {
  @extend %grid-row-wrap;
  color: $black;

  &:hover {
    h2.h2 {
      color: $link-hover-color;
    }
  }
}

.tr {
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  &:first-child {
    border-top: 0;
  }
}

.td {
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

.td-name {
  flex: 1 1 33%;
  min-width: 200px;
}

.td-usage {
  flex: 1 1 15%;
  min-width: 120px;
}

.td-single {
  flex: 1 1 8%;
}

.td-double {
  flex: 1 1 21%;
}

.allowance-text {
  font-size: 24px;
  font-weight: 700;
  color: darken($indigo, 10%);
  fill: darken($indigo, 10%);
}

.tool-length-text {
  font-size: 20px;
  font-weight: 700;
  color: $lila;
  fill: $lila;
}
</style>
