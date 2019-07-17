<template>
  <footer class="footer">
    <div class="cnt">
      <div class="flex-row">
        <div class="col-lg-6">
          © 2015—2019
          <br />Группа компаний «Аркон»
        </div>

        <div class="col-lg-6">
          <p>
            Г. Пенза, ул. Егорова
            <br />Г. Пенза, ул. Гоголя
          </p>
          <p>Режим работы: с 8:00 до 17:00</p>
        </div>

        <div class="col-lg-6">
          <p>
            (8412)&nbsp;<span class="display-4">45-89-90</span>
          </p>
          <p><a href="mailto:sales@cvm-arcon.ru">sales@cvm-arcon.ru</a></p>
        </div>

        <div class="col-lg-6">
          <ul class="menu">
            <li class="li">
              <g-link class="a" to="/policy">
                <span>Политика конфиденциальности</span>
              </g-link>
            </li>
            <li class="li">
              <g-link class="a" to="/disclosure">
                <span>Раскрытие информации</span>
              </g-link>
            </li>
            <li class="li">
              <g-link class="a" to="/partners">
                <span>Официальные партнеры</span>
              </g-link>
            </li>
            <li class="li">
              <g-link class="a" to="/contact">
                <span>Контакты</span>
              </g-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @extend %spacing-top;

  background: $gray-100;
  position: relative;
}

.menu {
  padding: 0;
}

li.li {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0 0 0.75rem;
}

.a {
  display: block;
  line-height: 1.3;

  span {
    @include link-underline();
  }
}
</style>
