<template functional>
  <div class="nav-header">
    <nav class="nav">
      <g-link class="a logo-link" to="/" exact>
        <app-logo id="arconit-logo" width="140" />
      </g-link>

      <div class="nav-contact">
        <a class="nav-phone" href="tel:+78412458990">
          <span>+7&nbsp;8412&nbsp;</span>
          <span class="display-4">45-89-90</span>
        </a>
        <span class="nav-mail">gid@cvm-arcon.ru</span>
      </div>

      <ul class="menu">
        <li class="li">
          <g-link class="a" to="/about/">О компании</g-link>
        </li>
        <li class="li">
          <g-link class="a" to="/tech/">Технологии</g-link>
        </li>
        <li class="li">
          <g-link class="a highlight" to="/catalog/">Режущий инструмент</g-link>
        </li>
        <li class="li">
          <g-link class="a" to="/services/">Услуги</g-link>
        </li>
        <li class="li">
          <g-link class="a" to="/partners/">Представители</g-link>
        </li>
        <li class="li">
          <g-link class="a" to="/contact/">Контакты</g-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

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

li.li {
  margin-right: 1.5rem;
  margin-top: 0.5rem;
  padding: 0;
}

a.a {
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

.highlight {
  font-weight: $font-weight-bold;
}

.nav-contact {
  display: block;
  margin-left: auto;
  padding: 0 0 0.3rem;
  color: $black;
}

.nav-phone,
.nav-mail {
  display: block;
  text-align: right;
  color: #000000;
  white-space: nowrap;
}

.nav-mail {
  font-size: 0.8rem;
}

.logo-link {
  display: block;
  margin-right: 1.5rem;
}

@include media-breakpoint-up(xl) {
  .menu {
    flex: 0 0 auto;
  }

  .nav-contact {
    order: 10;
  }
}
</style>
