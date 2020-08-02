<template>
  <div>
    <p class="small">Единицы измерения — мм</p>
    <table class="pi-table sticky-header">
      <thead>
        <tr>
          <th class="tc sticky-th">Обозначение</th>
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
          <td v-for="i in fields" :key="i" class="tc" :class="i">{{ node[i] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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

  data() {
    return {
      setNames: {
        name: 'Обозначение',
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
        form: 'Форма',
        step: 'Шаг',
        thread: 'Резьба',
      },
    }
  },

  computed: {
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
.pi-table {
  margin: 0 auto 0 0;

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
</style>
