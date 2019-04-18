<template>
  <tr>
    <td>
      <h2>{{ node.series.toUpperCase() }}</h2>
    </td>
    <td>
      {{ node.myField }}
    </td>
    <td>
      <svg-icon
        :icon-id="'coating-' + node.coating"
        :size="30"
      />
    </td>
    <td>
      <g-image
        v-if="node.imgTeaser"
        :src="node.imgTeaser"
      />
    </td>
  </tr>
</template>

<script>
import SvgIcon from '~/components/catalog/SvgFeatureIcon'
import MaterialIcon from '~/components/catalog/MaterialIcon'

export default {
  components: {
    SvgIcon,
    MaterialIcon
  },

  props: {
    node: {
      type: Object,
      required: true
    }
  },

  data: () => {
    return {
      toolExpanded: false
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
    }
  },

  methods: {
    expandTool() {
      this.toolExpanded = !this.toolExpanded
    }
  }
}
</script>

<style lang="scss">
.series-item {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 20px;
  border-bottom: 1px solid fade-out($color: #000000, $amount: .9);
  margin-top: -1px;

  &:last-child {
    border-bottom: 0;
  }

  @include media-breakpoint-up(lg) {
    padding: 20px 30px;
  }

  /* &.expanded {
    border-left: 2px solid fade-out($color: #000000, $amount: .95)
  } */

  header {
    max-width: 30%;
    flex: 0 0 30%;
    cursor: pointer;

    &:hover {
      &:before {
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 5px 60px 0 rgba(0,0,0,0.1);
        z-index: -1;
      }
    }
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

  h3 {
    font-size: 1.75rem;
    margin: 0 0 1rem;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* &:hover {
    // background: #ffffff;
    border-bottom: 1px solid transparent;
    // box-shadow: 0px 5px 60px 0 rgba(0,0,0,0.1);
  } */
}

.series-details {
  width: 100%;
  padding-top: 0;
  padding-bottom: 1.5rem;

  @include media-breakpoint-up(md) {
    width: 70%;
    margin: 0 0 0 auto;
    padding-left: 40px;
  }
}

.series-scheme img {
  min-width: 360px;
  height: auto;
}

.table-thead,
.table-row {
  width: 100%;

}

.table-col,
.table-thead-col {
  padding: .2rem .3rem;
}

.d-table {
  margin: 0 -.3rem;

  .table-thead {
    font-weight: bold;
    border-bottom: 1px solid $gray-300;
    margin-bottom: 1rem;
  }

  .table-row:hover {
    background: fade-out($color: $yellow, $amount: .8);

    .hd {
      visibility: visible;
    }
  }

  .td {
    padding-right: 1.25rem;
  }

  .hd {
    visibility: hidden;
  }

  /* .serial {
    max-width: 8rem;
    flex: 2 1 8rem;
  }

  .d1, .d2, .d3, .r {
    max-width: 4rem;
    flex: 1 1 4rem;
  }

  .l1, .l2, .ap, .z {
    max-width: 3rem;
    flex: 1 1 3rem;
  } */

  .table-row .form {
    text-transform: uppercase;
  }
}
</style>
