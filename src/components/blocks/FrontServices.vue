<template>
  <div class="tile-row services-teasers" v-once>
    <g-link to="/services/resharpen" class="col s">
      <h3 class="h3">
        <span class="u">Восстановление режущего инструмента</span>
      </h3>
      <p>Восстановление всех режущих кромок до&nbsp;первоначального либо близкого к&nbsp;первоначальному состояния.</p>
      <p>Цена переточки составляет от&nbsp;5&nbsp;до&nbsp;30% стоимости нового инструмента.</p>
    </g-link>

    <g-link to="/services/polish" class="col s">
      <h3 class="h3">
        <span class="u">Полировка режущего инструмента</span>
      </h3>
      <p>Притупление режущих кромок напрямую влияет на&nbsp;стойкость и&nbsp;характер их&nbsp;износа, а&nbsp;значение шероховатости поверхностей отражается на&nbsp;сливе стружки.</p>
    </g-link>

    <g-link to="/services/pwd" class="col s">
      <h3 class="h3">
        <span class="u">Нанесение PVD покрытий</span>
      </h3>
      <p>Мы&nbsp;предоставляем услуги по&nbsp;нанесению износостойких и&nbsp;защитных тонкопленочных покрытий с&nbsp;высокой адгезией.</p>
    </g-link>

    <g-link to="/services/laser-engraving" class="col s">
      <h3 class="h3">
        <span class="u">Лазерная гравировка</span>
      </h3>
      <p>В&nbsp;процессе гравировки луч лазера испаряет слой материала, прожигая его на&nbsp;заданную глубину, поэтому гравировка не&nbsp;сотрется и&nbsp;не&nbsp;смоется.</p>
    </g-link>

    <g-link to="/services/packing" class="col s">
      <h3 class="h3">
        <span class="u">Упаковка режущего инструмента</span>
      </h3>
      <p>Поставляем упаковку для режущего инструмента, режущих токарных пластин, пеналов и&nbsp;другого назначения.</p>
    </g-link>

    <g-link to="/services/guhring" class="col s">
      <h3 class="h3">
        <span class="u">Поставка твердого сплава G&uuml;hring</span>
      </h3>
      <p>Мы&nbsp;предлагаем Вам поставку заготовок из&nbsp;твердого сплава G&uuml;hring напрямую с&nbsp;нашего склада в&nbsp;городе Пенза.</p>
    </g-link>
  </div>
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
  }

  &:hover {
    background-color: lighten($yellow, 35%) ;

    &::after {
      opacity: 0.7;
    }

    .u {
      color: #000000;
      border-bottom: 0;
    }
  }
}

.u {
  color: $cyan;
  border-bottom: 1px solid rgba($cyan, 0.2);
}

@include media-breakpoint-up(lg) {
  .h3 {
    font-size: 1.5rem;
  }

  .s {
    @include make-col(8);
    min-height: 220px;
  }
}
</style>
