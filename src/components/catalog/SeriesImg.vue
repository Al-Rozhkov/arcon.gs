<template>
  <img
    v-if="nodeImg"
    :src="nodeImg"
    :alt="node.series"
    class="series-img"
  />
</template>

<script>
import urlExists from '~/utils/utils'

export default {
  props: {
    node: {
      type: Object,
      required: true
    }
  },

  computed: {
    nodeImg() {
      const imgUrl = this.node.photos.length === 0
        ? `/series/${this.node.series}.jpg`
        : `/series/${this.node.photos[0]}.jpg`
      
      return (urlExists(imgUrl))
        ? imgUrl
        : false
    }
  }
}
</script>

<style lang="scss">
.series-img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
