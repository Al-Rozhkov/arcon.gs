<template>
  <section class="tile-row" v-once>
    <g-link to="/catalog/special/" class="col">
      <div class="mt">
        <g-image class="img" width="520" src="@/assets/img/solutions/a01.jpg" />
      </div>
      <div class="ib">
        <h3 class="h3">Монолитные сверла и&nbsp;развертки</h3>
        <p>Монолитные твердосплавные сверла и&nbsp;развертки любой длины и&nbsp;диаметра.</p>
      </div>
    </g-link>

    <g-link to="/catalog/end-mills/" class="col">
      <h3 class="h3">Концевые и&nbsp;фасонные фрезы</h3>
      <p>Готовые решения из&nbsp;твердого сплава для всех типов обработки всегда в&nbsp;наличии.</p>
      <div class="atb">
        <g-image class="img" width="520" src="@/assets/img/solutions/a02.jpg" />
      </div>
    </g-link>

    <g-link to="/catalog/thread-mills/" class="col">
      <div class="atr">
        <g-image class="img" width="520" src="@/assets/img/solutions/a03.jpg" />
      </div>
      <h3 class="h3">Резьбонарезной инструмент</h3>
      <p>Твердосплавные резьбофрезы и&nbsp;метчики для решения самых ответственных задач.</p>
    </g-link>

    <g-link to="/catalog/special/" class="col">
      <div class="mt">
        <g-image class="img" width="520" src="@/assets/img/solutions/a04.jpg" />
      </div>
      <div class="atb">
        <h3 class="h3">Токарные и&nbsp;долбежные вставки</h3>
        <p>Выберете форму хвостовика, длину и&nbsp;контур обработки в&nbsp;соответствии с&nbsp;вашими требованиями.</p>
      </div>
    </g-link>

    <g-link to="/services/resharpen/" class="col">
      <h3 class="h3">Восстановление инструмента</h3>
      <p>Переточим ваши сверла, фрезы, головки, метчики, развертки и&nbsp;др. без потери качества. Отполируем. Притупим. Нанесем покрытие.</p>
      <div class="atr">
        <g-image class="img" width="520" src="@/assets/img/solutions/a05.jpg" />
      </div>
    </g-link>

    <g-link to="/catalog/special/" class="col">
      <div class="mt">
        <g-image class="img" width="520" src="@/assets/img/solutions/a06.jpg" />
      </div>
      <h3 class="h3">Специальный инструмент</h3>
      <p>Изготовим инструмент из&nbsp;твердого сплава и&nbsp;быстрорежущей стали по&nbsp;вашим эскизам и&nbsp;чертежам.</p>
    </g-link>
  </section>
</template>

<style lang="scss" scoped>
.h3 {
  padding-top: 1.75rem;
}

.col {
  position: relative;
  background-color: #ffffff;
  color: #000000;
  border: 2px solid $gray-100;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    .img {
      transform: scale(1.03, 1.03);
    }
  }

  .img {
    transition: transform .2s ease 0s;
  }
}

// Stick to bottom
.atb {
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 0;
}
// Stick to right
.atr {
  margin-left: auto;
  margin-right: -15px;
}
// Margin top
.mt {
  margin-top: 1rem;
}

@include media-breakpoint-up(sm) {
  .atr {
    margin-right: -30px;
  }

  .col {
    @include make-col(12);
  }
}

@include media-breakpoint-up(lg) {
  .col {
    @include make-col(8);
  }
}
</style>
