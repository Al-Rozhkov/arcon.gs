<template>
  <div class="root">
    <div class="nav-header">
      <nav class="nav">
        <g-link class="logo-link" to="/">
          <app-logo />
        </g-link>
        <ul class="menu main-menu">
          <li>
            <g-link to="/about">
              О компании
            </g-link>
          </li>
          <li>
            <g-link to="/tech">
              Технологии
            </g-link>
          </li>
          <li>
            <g-link to="/catalog">
              Режущий инструмент
            </g-link>
          </li>
          <li>
            <g-link to="/products">
              Продукция
            </g-link>
          </li>
          <li>
            <g-link to="/services">
              Услуги
            </g-link>
          </li>
          <li>
            <g-link to="/partners">
              Партнеры
            </g-link>
          </li>
          <li>
            <g-link to="/contact">
              Контакты
            </g-link>
          </li>
        </ul>
      </nav>
    </div>

    <slot />

    <app-footer />
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {

}
</script>


<style lang="scss">

</style>
