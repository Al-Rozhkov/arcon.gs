<template>
  <nav class="nav">
    <g-link class="logo-link" to="/">
      <app-logo />
    </g-link>

    <a class="nav-phone" href="tel:+78412458990">
      +7&nbsp;8412&nbsp;45-89-90
    </a>

    <ul class="menu">
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
        <g-link class="highlight" to="/catalog">
          Режущий инструмент
        </g-link>
      </li>
      <li>
        <g-link to="/services">
          Продукция и услуги
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
</template>
