<template>
  <section class="news-teasers">
    <vue-glide type="carousel" bound :breakpoints="breakpoints" :gap="32" :perView="4" :peek="30">
      <vue-glide-slide v-for="(node, index) in $static.news.edges" :key="index" class="item">
        <template v-if="!node.node.nopage">
          <news-teaser :node="node.node" />
        </template>

        <template v-else>
          <h3 class="h2">{{ node.node.title }}</h3>
          <div v-html="node.node.content" />
        </template>
      </vue-glide-slide>
      <template slot="control">
        <arrow-prev class="glide__arrow glide__arrow--left" data-glide-dir="<" />
        <arrow-next class="glide__arrow glide__arrow--right" data-glide-dir=">" />
      </template>
    </vue-glide>
  </section>
</template>

<static-query>
query RecentNews {
  news: allNews(limit: 8, sortBy: "date") {
    edges{
      node {
        id
        path
        content
        title
        date(format: "D MMMM YYYY", locale: "RU")
        image(width: 275, height: 160, fit: contain, background: "#ffffff", quality: 100)
        nopage
      }
    }
  }
}
</static-query>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import ArrowNext from '~/components/ArrowNext.vue'
import ArrowPrev from '~/components/ArrowPrev.vue'
import NewsTeaser from '~/components/NewsTeaser.vue'

export default {
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    ArrowNext,
    ArrowPrev,
    NewsTeaser
  },

  data() {
    return {
      breakpoints: {
        1320: {
          perView: 4
        },
        992: {
          perView: 3
        },
        768: {
          perView: 2
        },
        576: {
          perView: 1
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-teasers {
  margin: 0 -15px 3rem;
  backface-visibility: unset !important;
}

.news-teasers-header {
  font-weight: normal;
  text-align: right;
  border-bottom: 1px solid $gray-400;
  position: relative;
}

.news-all {
  background: #ffffff;
  padding: 1rem;
  margin-top: -2rem;
}

.item {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.h2 {
  font-size: 1.7rem;
  font-weight: $font-weight-base;
}

.glide__arrow {
  margin-top: -40px;
}

@include media-breakpoint-up(md) {
  .news-teasers {
    margin: 0 -15px 4rem;
  }

  .glide__arrow--left {
    left: -30px;
  }
  .glide__arrow--right {
    right: -30px;
  }
}

@include media-breakpoint-up(lg) {
  .news-teasers {
    margin: 0 -30px 6rem;
  }

  .glide__arrow--left {
    left: -45px;
  }
  .glide__arrow--right {
    right: -45px;
  }
}
</style>
