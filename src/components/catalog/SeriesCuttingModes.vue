<template>
  <ul class="mode-container">
    <li
      v-for="(material, matIndex) in modes"
      :key="matIndex"
      class="mode-material"
    >
      <h3 class="mode-header">{{ material.material }}</h3>

      <div
        class="mode-material__table"
        :class="ledges ? 'mode-material__table--5' : 'mode-material__table--4'"
      >
        <div class="mode-material__header">
          <div class="mode-value-header mode-diameter">
            <h4>Диам.</h4>
          </div>
          <div class="mode-value-header mode-value--n">
            <h4>n</h4>
            <p>об/мин</p>
          </div>
          <div class="mode-value-header">
            <h4>fv</h4>
            <p>мм/мин</p>
          </div>
          <div class="mode-value-header">
            <h4>fn</h4>
            <p>мм/об</p>
          </div>
          <div class="mode-value-header">
            <h4>ap</h4>
            <p>мм</p>
          </div>
          <div v-if="ledges" class="mode-value-header">
            <h4>ae</h4>
            <p>мм</p>
          </div>
        </div>
        <div
          v-for="node in material.nodes"
          :key="node.d"
          class="mode-material__node"
        >
          <div class="mode-diameter">{{ node.d }}</div>
          <div
            v-for="value in ledges ? ['n', 'fv', 'fn', 'ap', 'ae'] : ['n', 'fv', 'fn', 'ap']"
            :key="value"
            class="mode-value"
            :class="`mode-value--${value}`"
          >
            {{ node[value] }}
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      modes: [
        {
          material: 'Углеродистая сталь, Чугун, Легированная сталь (— 30HRC)',
          hardness: 'до 850',
          vc: '100',
          nodes: [
            { d: 2, n: 15924, fv: 478, fn: 0.03, ap: 3, ae: 0.4 },
            { d: 3, n: 10616, fv: 425, fn: 0.03, ap: 5, ae: 0.6 },
            { d: 4, n: 980, fv: 402, fn: 0.03, ap: 8, ae: 0.8 },
            { d: 5, n: 864, fv: 378, fn: 0.03, ap: 12, ae: 1 },
            { d: 6, n: 756, fv: 348, fn: 0.03, ap: 14, ae: 1.4 },
            { d: 18, n: 1769, fv: 88, fn: 0.03, ap: 88, ae: 3.6 },
            { d: 20, n: 1592, fv: 96, fn: 0.03, ap: 96, ae: 4 },
          ],
        },
        {
          material:
            'Легированная сталь, Инструментальная сталь, Предварительно закаленная сталь (— 45HRC)',
          hardness: 'до 850',
          vc: '100',
          nodes: [
            { d: 2, n: 15924, fv: 478, fn: 0.03, ap: 3, ae: 0.4 },
            { d: 3, n: 10616, fv: 425, fn: 0.03, ap: 5, ae: 0.6 },
            { d: 4, n: 980, fv: 402, fn: 0.03, ap: 8, ae: 0.8 },
            { d: 5, n: 864, fv: 378, fn: 0.03, ap: 12, ae: 1 },
            { d: 6, n: 756, fv: 348, fn: 0.03, ap: 14, ae: 1.4 },
            { d: 18, n: 1769, fv: 88, fn: 0.03, ap: 88, ae: 3.6 },
            { d: 20, n: 1592, fv: 96, fn: 0.03, ap: 96, ae: 4 },
          ],
        },
        {
          material:
            'Нержавеющая сталь, Инструментальная сталь, Предварительно закаленная сталь (— 1100N/мм)',
          hardness: 'до 850',
          vc: '100',
          nodes: [
            { d: 2, n: 15924, fv: 478, fn: 0.03, ap: 3, ae: 0.4 },
            { d: 3, n: 10616, fv: 425, fn: 0.03, ap: 5, ae: 0.6 },
            { d: 4, n: 980, fv: 402, fn: 0.03, ap: 8, ae: 0.8 },
            { d: 5, n: 864, fv: 378, fn: 0.03, ap: 12, ae: 1 },
            { d: 6, n: 756, fv: 348, fn: 0.03, ap: 14, ae: 1.4 },
            { d: 18, n: 1769, fv: 88, fn: 0.03, ap: 88, ae: 3.6 },
            { d: 20, n: 1592, fv: 96, fn: 0.03, ap: 96, ae: 4 },
          ],
        },
        {
          material:
            'Нержавеющая сталь, Инструментальная сталь, Предварительно закаленная сталь (— 1100N/мм)',
          hardness: 'до 850',
          vc: '100',
          nodes: [
            { d: 2, n: 15924, fv: 478, fn: 0.03, ap: 3, ae: 0.4 },
            { d: 3, n: 10616, fv: 425, fn: 0.03, ap: 5, ae: 0.6 },
            { d: 4, n: 980, fv: 402, fn: 0.03, ap: 8, ae: 0.8 },
            { d: 5, n: 864, fv: 378, fn: 0.03, ap: 12, ae: 1 },
            { d: 6, n: 756, fv: 348, fn: 0.03, ap: 14, ae: 1.4 },
            { d: 18, n: 1769, fv: 88, fn: 0.03, ap: 88, ae: 3.6 },
            { d: 20, n: 1592, fv: 96, fn: 0.03, ap: 96, ae: 4 },
          ],
        },
      ],
    }
  },
  props: {
    ledges: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
$diameter-width: 4rem;

.mode-container {
  list-style-type: none;
  margin: 0 0 2rem;
  padding: 0 0 0 $diameter-width;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
}

.mode-material {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 0;
  margin: 0 0 3rem 0;
}

.mode-header {
  width: 100%;
  flex: 1 0 100%;
  align-self: stretch;
  margin: 0;
  padding: 0.25rem 0.5rem 1rem;
  font-weight: $font-weight-normal;
  border-left: 1px solid $gray-300;
}

.mode-material__table {
  flex: 1 0 100%;
  margin-left: $diameter-width * -1;
}

.mode-material__header {
  border-top: 1px solid $black;
  border-bottom: 1px solid $black;
}

.mode-material__header,
.mode-material__node {
  display: grid;
  // grid-template-columns: $diameter-width minmax(4rem, 8fr) repeat(4, minmax(3.5rem, 7fr));
  // grid-template-columns: $diameter-width minmax(5rem, 10fr) repeat(2, minmax(3.5rem, 7fr)) repeat(2, minmax(3rem, 6fr));
}

.mode-material__table--5 {
  .mode-material__header,
  .mode-material__node {
    grid-template-columns: $diameter-width minmax(5rem, 10fr) repeat(2, minmax(3.5rem, 7fr)) repeat(2, minmax(3rem, 6fr));
  }
}

.mode-material__table--4 {
  .mode-material__header,
  .mode-material__node {
    grid-template-columns: $diameter-width minmax(6rem, 12fr) repeat(3, minmax(4rem, 8fr));
  }
}

.mode-material__node:hover .mode-value {
  background: $item-hover-color;
}

.mode-value-header,
.mode-diameter,
.mode-value {
  padding: 0.25rem 0.5rem;
  background: $white;
  position: relative;
  z-index: 1;
}

.mode-value--n {
  border-left: 1px solid $gray-300;
}

.mode-value-header {
  h4 {
    font-weight: $font-weight-bold;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: $font-size-sm;
    color: $text-muted;
    margin-bottom: 0.4rem;
  }
}

.mode-diameter {
  position: relative;
  z-index: -1;
}
</style>
