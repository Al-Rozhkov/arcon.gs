<template>
  <footer class="footer" v-once>
    <div class="cnt">
      <div class="tile-row">
        <div class="fc col-lg-6">
          © 2015—2019
          <br />Группа компаний «Аркон»
        </div>

        <div class="w-100 col-lg-6">
          <p>
            Г. Пенза, ул. Егорова
            <br />Г. Пенза, ул. Гоголя
          </p>
        </div>

        <div class="w-100 col-lg-6">
          <p>
            (8412)&nbsp;<span class="display-4">45-89-90</span>
          </p>
          <p>
            <a href="mailto:gid@cvm-arcon.ru">gid@cvm-arcon.ru</a>
          </p>
        </div>

        <div class="w-100 col-lg-6">
          <app-menu vertical>
            <app-menu-item to="/policy">Политика конфиденциальности</app-menu-item>
            <app-menu-item to="/disclosure">Раскрытие информации</app-menu-item>
            <app-menu-item to="/partners">Официальные партнеры</app-menu-item>
            <app-menu-item to="/contact">Контакты</app-menu-item>
          </app-menu>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  @extend %spacing-top;

  background: $gray-100;
  position: relative;
}
</style>
