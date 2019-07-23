<template>
  <section class="tile-row" v-once>
    <div class="col col-title">
      <h2 class="h2">Услуги</h2>
    </div>

    <div class="col tile-body">
      <div class="tile-row">
        <g-link to="/services/resharpen" class="col s">
          <h3 class="h3">Переточка режущего инструмента</h3>
          <p>Восстановление всех режущих кромок до&nbsp;первоначального либо близкого к&nbsp;первоначальному состояния.</p>
          <p>Цена переточки составляет от&nbsp;5&nbsp;до&nbsp;30% стоимости нового инструмента.</p>
        </g-link>
        <g-link to="/services/polish" class="col s">
          <h3 class="h3">Полировка режущего инструмента</h3>
          <p>Притупление режущих кромок напрямую влияет на&nbsp;стойкость и&nbsp;характер их&nbsp;износа, а&nbsp;значение шероховатости поверхностей отражается на&nbsp;сливе стружки.</p>
        </g-link>
        <g-link to="/services/pwd" class="col s">
          <h3 class="h3">Нанесение PVD покрытий</h3>
          <p>Мы&nbsp;рассматриваем в&nbsp;первую очередь возможность долгосрочного взаимовыгодного сотрудничества.</p>
        </g-link>
        <g-link to="/services/laser-engraving" class="col s">
          <h3 class="h3">Лазерная гравировка</h3>
          <p>В&nbsp;процессе гравировки луч лазера испаряет слой материала, прожигая его на&nbsp;заданную глубину, поэтому гравировка не&nbsp;сотрется и&nbsp;не&nbsp;смоется.</p>
        </g-link>
        <g-link to="/services/packing" class="col s">
          <h3 class="h3">Упаковка режущего инструмента</h3>
          <p>Мы&nbsp;рассматриваем в&nbsp;первую очередь возможность долгосрочного взаимовыгодного сотрудничества.</p>
        </g-link>
        <g-link to="/services/guhring" class="col s">
          <h3 class="h3">Поставка твердого сплава G&uuml;hring</h3>
          <p>Мы&nbsp;предлагаем Вам поставку заготовок из&nbsp;твердого сплава G&uuml;hring напрямую с&nbsp;нашего склада в&nbsp;городе Пенза.</p>
        </g-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.h3 {
  margin-top: 0;
  font-weight: $font-weight-base;
}

.s {
  position: relative;
  padding-top: 1.5rem;
  padding-bottom: 0.75rem;
  background-color: #ffffff;
  border: 2px solid transparent;
  color: $black;
  cursor: pointer;
  transition: background-color 0.4s ease-out;

  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    opacity: 0.25;
    z-index: 10;
    transition: opacity 0.5s ease-out;
  }

  &:hover {
    background-color: $gray-200;

    &::after {
      opacity: 0.7;
    }
  }
}

@include media-breakpoint-up(lg) {
  .h2 {
    font-size: 4rem;
    color: $gray-200;
  }

  .h3 {
    font-size: 1.5rem;
  }

  .col-title {
    @include make-col(6);
  }

  .tile-body {
    @include make-col(18);
  }

  .s {
    @include make-col(8);
    min-height: 220px;
  }
}
</style>
