<template>
  <footer class="footer" v-once>
    <div class="container">
      <div class="tile-row">
        <div class="fc col-lg-6">
          © 2015—{{ currentYear }}<br />
          {{ $static.copyright.value }}
        </div>

        <div class="w-100 col-lg-6" v-html="$static.address.value"></div>

        <div class="w-100 col-lg-6">
          <p>(8412)&nbsp;<span class="display-4">500-117</span></p>
          <p>
            <a href="mailto:gid@cvm-arcon.ru">gid@cvm-arcon.ru</a>
          </p>
        </div>

        <div class="w-100 col-lg-6">
          <app-menu vertical>
            <li>
              <a href="/uploads/policy.pdf" class="menu-link">
                <span class="menu-link__u">Политика конфиденциальности</span>
              </a>
            </li>
            <app-menu-item
              v-for="{ node } in $static.menu.edges"
              :key="node.id"
              :to="node.path"
              >{{ node.label }}</app-menu-item
            >
          </app-menu>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<static-query>
query {
  copyright: t(id: "footer.copyright") {
    value
  }
  address: t(id: "footer.address") {
    value
  }
  menu: allMenuFooter(sortBy: "weight", order: ASC) {
    edges {
      node {
        id
        path
        label
      }
    }
  }
}
</static-query>
