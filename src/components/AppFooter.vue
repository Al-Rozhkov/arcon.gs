<template>
  <footer class="footer" v-once>
    <div class="cnt">
      <div class="tile-row">
        <div class="fc col-lg-6">
          © 2015—2021
          <br />Группа компаний «Аркон»
        </div>

        <div class="w-100 col-lg-6">
          <p>
            ООО "ЦВМ&nbsp;"Аркон", ИНН&nbsp;5834118947, ОГРН&nbsp;1175835013364
          </p>
          <p>Россия, 440052, Пензенская обл., г.&nbsp;Пенза, ул.&nbsp;Гоголя, д.&nbsp;51/53</p>
        </div>

        <div class="w-100 col-lg-6">
          <p>(8412)&nbsp;<span class="display-4">500-117</span></p>
          <p>
            <a href="mailto:gid@cvm-arcon.ru">gid@cvm-arcon.ru</a>
          </p>
        </div>

        <div class="w-100 col-lg-6">
          <app-menu vertical>
            <app-menu-item to="/policy"
              >Политика конфиденциальности</app-menu-item
            >
            <app-menu-item to="/disclosure">Раскрытие информации</app-menu-item>
            <app-menu-item to="/partners">Представители</app-menu-item>
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
