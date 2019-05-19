<template>
  <div class="product-items-table">
    <p class="small">
      Единицы измерения — мм
    </p>
    <table class="pi-table">
      <!-- <thead class="table-thead">
        <tr>
          <td
            v-for="(col, index) in $page.series.headers"
            :key="index"
            class="table-thead-col"
            :class="index"
            v-html="col"
          />
        </tr>
      </thead> -->
      <tbody>
        <tr v-for="(row, id) in tools.edges" :key="id" class="table-row">
          <td v-for="(col, i) in row.node" :key="i" class="table-col" :class="i">
            <span v-if="i === 'serial'" class="hd">
              {{ node.code }}
            </span>
            <span class="td">{{ col }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Array,
      required: true
    }
  }
}
</script>


<style lang="scss">
.table-thead,
.table-row {
  width: 100%;
}

.table-col,
.table-thead-col {
  padding: .2rem .3rem;
}

.pi-table {
  margin: 0 -.3rem;

  .table-thead {
    font-weight: $font-weight-bold;
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
