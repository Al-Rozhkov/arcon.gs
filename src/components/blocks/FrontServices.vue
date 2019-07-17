<template>
  <section class="srv">
    <h2 class="item w-100">Услуги</h2>

    <div class="col-lg-6 item">
      <h3 class="h3">Переточка режущего инструмента</h3>
      <p>Восстановление всех режущих кромок до первоначального либо близкого к первоначальному состояния.</p>
      <p>Цена переточки составляет от 5 до 30% стоимости нового инструмента.</p>
    </div>
    <div class="col-lg-6 item">
      <h3 class="h3">Полировка режущего инструмента</h3>
      <p>Мы рассматриваем в первую очередь возможность долгосрочного взаимовыгодного сотрудничества.</p>
    </div>
    <div class="col-lg-6 item">
      <h3 class="h3">Нанесение PVD покрытий</h3>
      <p>Мы рассматриваем в первую очередь возможность долгосрочного взаимовыгодного сотрудничества.</p>
    </div>
    <div class="col-lg-6 item">
      <h3 class="h3">Лазерная гравировка</h3>
      <p>Мы рассматриваем в первую очередь возможность долгосрочного взаимовыгодного сотрудничества.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.srv {
  @extend %grid-row-wrap;
  @include make-grid-gutter($col-selector: '.item');
}

.h3 {
  margin-top: 2rem;
  font-weight: $font-weight-base;
}
</style>
