<template>
  <div class="product-items-table">
    <p class="small">
      Единицы измерения — мм
    </p>
    <table class="pi-table sticky-header">
      <thead>
        <tr>
          <th>Обозначение</th>
          <th
            v-for="col in fieldsSet"
            :key="col"
            class="col"
            :class="col"
            v-html="setNames[col]"
          />
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, id) in tools"
          :key="id"
          v-tooltip="row.node.tip"
        >
          <td class="col">
            <span class="hd">{{ row.node.series.id.toUpperCase() }}</span>
            <span class="td">{{ row.node.name.toUpperCase() }}</span>
          </td>
          <td
            v-for="i in fieldsSet"
            :key="i"
            class="col"
            :class="i"
          >
            {{ row.node[i] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    fieldsSet: {
      type: Array,
      required: true
    },
    
    tools: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      setNames: {
        "name": "Обозначение",
        "d1": "D<sub>1</sub>",
        "d2": "D<sub>2</sub>",
        "d3": "D<sub>3</sub>",
        "r": "R",
        "f45": "Fх45°",
        "l1": "L<sub>1</sub>",
        "l2": "L<sub>2</sub>",
        "ap": "a<sub>p</sub>",
        "z": "Z",
        "a": "α°",
        "form": "Форма",
        "step": "Шаг",
        "thread": "Резьба"
      }
    }
  }
}
</script>


<style lang="scss">
@import '~/assets/scss/modules/table.scss';

.pi-table {
  margin: 0 auto;

  thead, tr {
    width: 100%;
  }

  .col {
    padding: .2rem 1.25rem .2rem .3rem;
    vertical-align: top;
  }

  tbody {
    td {
      border-bottom: 2px solid $white;
    }

    tr:nth-child(4n), tr:nth-child(4n-1) {
      background: fade-out($yellow, .8);
    }

    &:hover {
      tr:nth-child(4n), tr:nth-child(4n-1) {
        background: transparent;
      }

      tr:hover {
        background: fade-out($yellow, .7);

        .hd {
          visibility: visible;
        }
      }
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
}
</style>
