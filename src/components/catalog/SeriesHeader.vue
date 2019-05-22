<template>
  <div class="series-header">
    
    <header :to="node.path">
      <div class="series-title">
        <h2>{{ node.id.toUpperCase() }}</h2>

        <svg-plain-icon
          v-if="node.fusion"
          icon-id="series-fusion"
          :width="100"
          :height="25"
        />
      </div>
      
      <g-image
        v-if="node.productImg.length > 0"
        :src="node.productImg[0]"
        :alt="node.id"
        class="series-img"
      />
    </header>

    <div class="series-body">
      <div class="flex-row">
        <div class="series-material">
          <material-icon
            v-for="(m, index) in node.mainUsage"
            :key="index"
            :mat-id="m"
          />
        </div>
        <div class="series-attr">
          <svg-icon
            v-for="icon in seriesFeatures"
            :key="icon"
            :icon-id="icon"
          />
        </div>
      </div>

      <div class="series-desc" v-html="node.body" />
    </div>

  </div>
</template>

<script>
import SvgPlainIcon from '~/components/catalog/SvgPlainIcon'
import SvgIcon from '~/components/catalog/SvgFeatureIcon'
import MaterialIcon from '~/components/catalog/MaterialIcon'

export default {
  components: {
    SvgPlainIcon,
    SvgIcon,
    MaterialIcon
  },

  props: {
    node: {
      type: Object,
      required: true
    }
  },

  computed: {
    seriesFeatures() {
      return [
        'coating',
        'tail',
        'endShapes',
        'cogs',
        'grooveInclination'
      ].reduce((result, f) => {
        if (this.node[f] && typeof this.node[f] === "string") {
          result.push(`${f}-${this.node[f]}`)
        }
        if (this.node[f] && f === 'endShapes') {
          result = result.concat(
            this.node[f].map(shape => `form-${shape}`)
          )
        }
        return result
      }, [])
    },

    sizesValue() {
      const min = 9
      const max = 99
      const rand = min - 0.5 + Math.random() * (max - min + 1)
      return Math.round(rand)
    }
  }
}
</script>

<style lang="scss">
.series-header {
  @extend %grid-row-wrap;
  
  width: 100%;
  position: relative;
  margin-top: -1px;

  header,
  a {
    max-width: 30%;
    flex: 0 0 30%;
    display: block;
    color: $black;
  }

  a:hover {
    &:before {
      @include pseudo();
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ffffff;
      box-shadow: 0px 5px 60px 0 rgba(0,0,0,0.1);
      z-index: -1;
    }
  }

  .series-title {
    @extend %grid-row-wrap;
    align-items: baseline;
  }

  .series-body {
    max-width: 70%;
    flex: 0 0 70%;

    @include media-breakpoint-up(md) {
      padding-left: 40px;
    }
  }

  .series-attr {
    margin-left: auto;
    margin-bottom: .75rem;
  }

  h2 {
    margin: 0 0 1rem;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}

.series-details {
  width: 100%;
  padding-top: 0;
  padding-bottom: 1.5rem;
}

.series-scheme img {
  min-width: 360px;
  height: auto;
}

@include media-breakpoint-up(md) {
  .series-desc {
    font-size: 1.25rem;
  }

  .series-details {
    width: 70%;
    margin: 0 0 0 auto;
    padding-left: 40px;
  }
}
</style>
