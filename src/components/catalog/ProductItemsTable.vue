<template>
  <div>
    <p class="small">{{ $static.tUnitsMeasure.value }}</p>
    <table class="table sticky-header">
      <thead>
        <tr>
          <th class="tc sticky-th">{{ $static.tDesignation.value }}</th>
          <th
            v-for="col in fields"
            :key="col"
            class="tc sticky-th"
            :class="col"
            v-html="setNames[col]"
          />
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="({ node }, id) in tools"
          :key="id"
          v-tooltip="node.tip"
          @mouseover="$emit('highlight', node.form)"
          @mouseleave="$emit('highlight', null)"
        >
          <td class="tc">
            <span class="hd">{{ node.series.toUpperCase() }}</span>
            <span class="td">{{ node.name.toUpperCase() }}</span>
          </td>
          <td v-for="i in fields" :key="i" class="tc" :class="i">
            {{ node[i] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<static-query>
query {
  tUnitsMeasure: t(id: "catalog.page.units-measure") {
    value
  }
  tDesignation: t(id: "catalog.page.designation") {
    value
  }
  tForm: t(id: "catalog.page.form") {
    value
  }
  tStep: t(id: "catalog.page.step") {
    value
  }
  tThread: t(id: "catalog.page.thread") {
    value
  }
}
</static-query>

<script>
export default {
  name: 'ProductItemsTable',

  props: {
    fieldsSet: {
      type: Array,
      default: () => [
        'a',
        'd1',
        'd2',
        'd3',
        'r',
        'f45',
        'l1',
        'l2',
        'ap',
        'z',
        'form',
        'step',
        'thread',
      ],
    },

    tools: {
      type: Array,
      required: true,
    },
  },

  computed: {
    setNames() {
      return {
        name: this.$static.tDesignation.value,
        d1: 'D<sub>1</sub>',
        d2: 'D<sub>2</sub>',
        d3: 'D<sub>3</sub>',
        r: 'R',
        f45: 'Fх45°',
        l1: 'L<sub>1</sub>',
        l2: 'L<sub>2</sub>',
        ap: 'a<sub>p</sub>',
        z: 'Z',
        a: 'α°',
        form: this.$static.tForm.value,
        step: this.$static.tStep.value,
        thread: this.$static.tThread.value,
      }
    },

    // Skip empty columns
    fields() {
      return this.fieldsSet.filter((col) => {
        for (const { node } of this.tools) {
          if (node[col]) {
            return true
          }
        }
        return false
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.sticky-header {
  position: relative;
  border-collapse: separate;
  border-spacing: 0;
}

@include media-breakpoint-up(sm) {
  th.sticky-th {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #ffffff;
    border-bottom: 1px solid $black;
    padding: 0.75rem 0.5rem 0.5rem;
  }
}

.table {
  margin: 0 auto 0 0;

  thead {
    font-weight: $font-weight-bold;
    border-bottom: 1px solid $gray-300;
  }

  thead,
  tr {
    width: 100%;
  }

  tbody {
    td {
      border-bottom: 2px solid $white;
    }

    tr:nth-child(4n),
    tr:nth-child(4n-1) {
      background: fade-out($yellow, 0.8);
    }

    &:hover {
      tr:nth-child(4n),
      tr:nth-child(4n-1) {
        background: transparent;
      }

      tr:hover {
        background: $item-hover-color;

        .hd {
          visibility: visible;
        }
      }
    }
  }
}

.tc {
  padding: 0.2rem 1.25rem 0.2rem 0.3rem;
  vertical-align: top;
}

.td {
  padding-right: 1.25rem;
}

.hd {
  visibility: hidden;
}

/*
 * Print styles
 */
@media print {
  .hd {
    visibility: visible;
  }
}
</style>
