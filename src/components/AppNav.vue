<template>
  <div class="nav-header">
    <nav class="nav">
      <g-link class="a logo-link" to="/" exact>
        <app-logo id="arconit-logo" width="140" />
      </g-link>

      <div class="nav-search">
        <g-link v-if="$route.path != '/search/'" class="nav-search__search" to="/search/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.5rem"
            height="1.5rem"
          >
            <path
              fill="currentColor"
              d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
            />
          </svg>
        </g-link>
        <a class="nav-search__flag" :href="langUrl">
          <app-language />
          <span class="lang-code">{{ langCode }}</span>
        </a>
      </div>

      <div class="nav-contact">
        <a class="nav-phone" href="tel:+78412500117">
          <span>+7&nbsp;8412&nbsp;</span>
          <span class="display-4">500-117</span>
        </a>
        <a href="mailto:gid@cvm-arcon.ru" class="nav-mail">gid@cvm-arcon.ru</a>
      </div>

      <ul class="menu">
        <li v-for="{ node } in $static.menu.edges" :key="node.id" class="li">
          <g-link class="a" :class="{ bold: node.bold }" :to="node.path">{{
            node.label
          }}</g-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<static-query>
query Menu {
  menu: allMenu(filter: { parent: { eq: null } }, sortBy: "weight", order: ASC) {
    edges {
      node {
        id
        path
        label
        bold
      }
    }
  }
}
</static-query>

<script>
export default {
  computed: {
    langCode() {
      return this.$context.locale === 'en-en' ? 'RU' : 'EN'
    },

    langUrl() {
      const base =
        this.$context.locale === 'ru-ru'
          ? 'https://en.arconit.ru'
          : 'https://arconit.ru'

      if (this.$route.fullPath.startsWith('/news/')) {
        return base + '/news/'
      }
      if (this.$route.fullPath.startsWith('/services/')) {
        return base + '/services/'
      }

      return base + this.$route.fullPath
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-header {
  border-bottom: 1px solid rgba($cyan, 0.2);

  @media print {
    display: none;
  }
}

.nav {
  @extend %grid-row-wrap;
  @extend %container-xl;

  align-items: flex-end;
  padding-top: 0.5rem;
}

#arconit-logo {
  pointer-events: none;

  @include media-breakpoint-up(md) {
    margin-left: -35px;
  }
}

.menu {
  flex: 0 0 100%;
  margin: 1rem 0 0;
  font-size: 1.1rem;
}

.li {
  margin-right: 1.5rem;
  margin-top: 0.5rem;
  padding: 0;
}

.a {
  display: block;
  padding: 0 0 0.3rem;
  margin-bottom: -1px;
  border-bottom: 1px solid transparent;

  &.a:hover,
  &.active,
  &.active--exact {
    border-bottom: 1px solid $red;
  }

  &.active--exact {
    color: $red;
    cursor: default;
  }

  &.logo-link.active--exact,
  &.logo-link.active--exact:hover {
    border-bottom: 1px solid transparent;
  }
}

.bold {
  font-weight: $font-weight-bold;
}

.nav-contact {
  display: none;
  padding: 0 0 0.3rem 0.3rem;
  color: $black;
}

.nav-search {
  display: flex;
  margin: 0 1rem;
  align-self: center;

  a {
    display: block;
    height: 100%;
    padding: 0.1rem 0.2rem;
    margin: auto 0.5rem;
  }
}

// .nav-search__search {}

.nav-search__flag {
  border: 1px solid $gray-200;
  border-radius: $border-radius-sm;
  display: flex;
  align-items: center;
}

.lang-code {
  margin-left: 0.4rem;
  font-size: 0.85rem;
}

.nav-phone,
.nav-mail {
  display: block;
  text-align: right;
  color: #000000;
  white-space: nowrap;
}

.logo-link {
  display: block;
  margin-right: 1.5rem;
}

@include media-breakpoint-up(sm) {
  .nav-contact {
    display: block;
    margin-left: auto;
  }
}
@include media-breakpoint-up(xl) {
  .menu {
    flex: auto;
  }

  .nav-search {
    order: 9;
  }

  .nav-contact {
    order: 10;
  }

  .nav-mail {
    font-size: 0.8rem;
  }
}
</style>
