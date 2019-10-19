<template>
  <Layout>
    <main class="cnt">
      <h1>Технологии</h1>

      <section class="tile-root">
        <div class="tile-row">
          <g-link to="/tech#grinding" class="col left1">
            <h2 class="h2">Шлифовальная обработка</h2>
            <p
              class="p"
            >Шлифование круглое наружное, бесцентровое, плоское, координатное, круглое внутреннее</p>
          </g-link>

          <g-link to="/tech#electroerosion" class="col right1">
            <h2 class="h2">Электроэрозионная обработка</h2>
            <p
              class="p"
            >Cтанки проволочно-вырезные, позволяющие обрабатывать контур сложной формы в&nbsp;зонах без возможности захода режущего инструмента, с&nbsp;высокой повторяемостью.</p>
            <p
              class="p"
            >Cтанки прошивные для формирования глухих пазов, с&nbsp;минимальными радиусами на&nbsp;всех контактных точках.</p>
          </g-link>
        </div>

        <div class="tile-row">
          <g-link to="/tech#milling" class="col left2">
            <h2 class="h2">Фрезерная ЧПУ обработка</h2>
            <p
              class="p"
            >Обработка ведется полным циклом, от&nbsp;создания 3д-моделей, разработки управляющих программ, ведения техпроцесса с&nbsp;промежуточными операциями контроля.</p>
          </g-link>

          <g-link to="/tech#lathe" class="col right2">
            <h2 class="h2">Токарная&nbsp;ЧПУ обработка</h2>
            <p class="p">Максимальный обрабатываемый наружный диаметр&nbsp;&mdash; 457&nbsp;мм.</p>
            <p class="p">Максимальная длина точения&nbsp;&mdash; 584&nbsp;мм.</p>
          </g-link>
        </div>
      </section>

      <section class="tile-row sticky-sidebar pb">
        <aside class="col-md-6 aside">
          <app-menu vertical>
            <app-menu-item to="/tech#grinding">Шлифовальная обработка</app-menu-item>
            <app-menu-item to="/tech#electroerosion">Электроэрозионная обработка</app-menu-item>
            <app-menu-item to="/tech#milling">Фрезерная&nbsp;ЧПУ обработка</app-menu-item>
            <app-menu-item to="/tech#lathe">Токарная&nbsp;ЧПУ обработка</app-menu-item>
          </app-menu>
        </aside>

        <div class="col-md-18 text-body pb">
          <section id="grinding" class="pb">
            <h2>Шлифовальная обработка</h2>

            <p>Шлифование&nbsp;&mdash; вид обработки, отличающийся от&nbsp;точения и&nbsp;фрезерования. В&nbsp;первую очередь, это выражается в&nbsp;размерах допусков, которые нужно обеспечить&nbsp;&mdash; в&nbsp;большинстве случаев, речь ведется о&nbsp;долях сотых миллиметра либо&nbsp;же об&nbsp;одной-двух сотых миллиметра. Нельзя не&nbsp;отметить и&nbsp;особенности обрабатываемых материалов&nbsp;&mdash; это, как правило, закаленные стали, твердый сплав, керамика. Их&nbsp;объединяет&nbsp;то, что обработка стандартным режущим инструментом является процессом, зависящим от&nbsp;большего количества факторов (марка стали, метод термообработки и&nbsp;твердость, навыки, опыт и&nbsp;внимательность исполнителя, жесткость конструкции оборудования, стойкость инструмента). Также ключевым значением является шероховатость поверхности. Тонким точением или чистовым фрезерованием мы&nbsp;можем в&nbsp;отдельных случаях обеспечить Ra=0,8 и&nbsp;даже Ra=0.4. Но&nbsp;при серийном изготовлении деталей с&nbsp;указанными значениями шероховатости процесс корректировки вылета и&nbsp;диаметра режущего инструмента, его замена или восстановление значительно повышает трудоемкость и&nbsp;себестоимость процесса.</p>
            <p>Мы&nbsp;специализируемся на&nbsp;выполнении следующих шлифовальных операций:</p>
            <ul>
              <li>шлифование круглое наружное;</li>
              <li>шлифование бесцентровое;</li>
              <li>шлифование плоское;</li>
              <li>шлифование координатное;</li>
              <li>шлифование круглое внутреннее.</li>
            </ul>
          </section>

          <section id="electroerosion" class="pb">
            <h2>Электроэрозионная обработка</h2>

            <p>Электроэрозионная обработка заключается в&nbsp;изменении формы, размеров, шероховатости и&nbsp;свойств поверхности заготовки под воздействием электрических разрядов в&nbsp;результате электрической эрозии, что значительно расширяет возможности производства.</p>
            <p>Перечень оборудования, применяющего принцип электроэрозионной обработки и&nbsp;представленного на&nbsp;нашем предприятии включает:</p>
            <ul>
              <li>станки проволочно-вырезные, позволяющие обрабатывать контур сложной формы в&nbsp;зонах без возможности захода режущего инструмента, с&nbsp;высокой повторяемостью;</li>
              <li>станки прошивные для формирования глухих пазов, с&nbsp;минимальными радиусами на&nbsp;всех контактных точках.</li>
            </ul>
          </section>

          <section id="milling" class="pb">
            <h2>Фрезерная ЧПУ обработка</h2>

            <p>Мы&nbsp;предоставляем услуги фрезерной обработки (3, 3+1, 5&nbsp;осей). Обработка ведется полным циклом, от&nbsp;создания 3д-моделей, разработки управляющих программ, ведения техпроцесса с&nbsp;промежуточными операциями контроля.</p>
            <p>
              Также мы&nbsp;имеем возможность оказания услуг по&nbsp;3д-моделированию, разработке&nbsp;КД, сдачи управляющей программы на&nbsp;станках заказчика под ключ.
              Максимальные габариты, которые мы&nbsp;можем обработать&nbsp;&mdash; 1370&times;630&nbsp;мм.
            </p>
            <p>Максимальный вес&nbsp;&mdash; 1500&nbsp;кг. При анализе возможности установки детали на&nbsp;станок следует помнить про необходимость учета размеров и&nbsp;веса оснастки.</p>
          </section>

          <section id="lathe" class="pb">
            <h2>Токарная ЧПУ обработка</h2>

            <p>Правильный выбор оборудования для токарной обработки часто позволяет повысить эффективность работы, исключить дополнительные переналадки и&nbsp;операции. В&nbsp;частности, это обеспечивается применением оси&nbsp;Y с&nbsp;приводным инструментом.</p>
            <p>Обработка ведется полным циклом, от&nbsp;создания 3д-моделей, разработки управляющих программ, ведения техпроцесса с&nbsp;промежуточными операциями контроля. Все машины укомплектованы барфидерами для непрерывной подачи заготовок.</p>
            <p>Максимальный обрабатываемый наружный диаметр&nbsp;&mdash; 457&nbsp;мм.</p>
            <p>Максимальная длина точения&nbsp;&mdash; 584&nbsp;мм.</p>
          </section>
        </div>
      </section>

      <catalog-block />
    </main>
  </Layout>
</template>

<script>
import CatalogBlock from '~/components/blocks/CatalogBlock.vue'

export default {
  components: {
    CatalogBlock
  },

  metaInfo: {
    title: 'Технологии'
  }
}
</script>

<style lang="scss" scoped>
.tile-root {
  margin-bottom: 120px;
}

.h2 {
  font-weight: $font-weight-base;
}

.p {
  max-width: 460px;
}

.h2,
.p {
  position: relative;
  z-index: 20;
}

.col {
  position: relative;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background: gray('100');
  border: 2px solid $white;
  min-height: 280px;
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
    transition: opacity 0.5s ease-out;
  }

  &:hover::after {
    opacity: 0.7;
  }
}

.left1::after {
  background-image: url(/img/tech/shlif.jpg);
}

.right1::after {
  background-image: url(/img/tech/electroeroz.jpg);
}

.left2::after {
  background-image: url(/img/tech/frezer.jpg);
}

.right2::after {
  background-image: url(/img/tech/tokar.jpg);
}

.sticky-sidebar {
  align-items: flex-start;
}

@include media-breakpoint-up(md) {
  .aside {
    position: sticky;
    top: 2rem;
  }

  .col-md-6 {
    @include make-col(6);
  }

  .col-md-18 {
    @include make-col(18);
  }
}

@include media-breakpoint-up(lg) {
  .left1 {
    @include make-col(9);
  }

  .right1 {
    @include make-col(15);
  }

  .left2 {
    @include make-col(11);
  }

  .right2 {
    @include make-col(13);
  }
}
</style>
