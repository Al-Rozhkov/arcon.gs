<template>
  <svg v-once>
    <defs>
      <!-- common stroke for icons -->
      <path
        id="icon_stroke_pnl"
        class="svg-fill-orange"
        d="M33.9,3a1,1,0,0,1,1,1V33.9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H33.9m0-3H4A4,4,0,0,0,0,4V33.9a4,4,0,0,0,4,4H33.9a4,4,0,0,0,4-4V4a4,4,0,0,0-4-4h0Z"
      />
    </defs>

    <!-- coat-nG -->
    <symbol id="coating-ng" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        class="svg-fill-orange"
        d="M16.747,24.91h-2.564v-4.844c0-1.045-0.551-1.805-1.406-1.805c-1.083,0-1.862,0.778-1.862,2.298
          v4.351H8.35v-8.453h1.995c0.057,0.151,0.114,0.379,0.171,0.664s0.095,0.456,0.114,0.494h0.076
          c0.741-0.912,1.748-1.367,3.021-1.367c1.957,0,3.021,1.234,3.021,3.286V24.91z"
      />
      <path
        class="svg-fill-orange"
        d="M20.567,14.025c1.271-1.273,2.925-1.92,4.996-1.92c1.424,0,2.602,0.229,3.57,0.685v2.45 c-1.006-0.531-2.107-0.797-3.343-0.797s-2.241,0.398-3.04,1.178c-0.778,0.778-1.178,1.823-1.178,3.152
          c0,1.197,0.323,2.186,0.988,2.965c0.664,0.76,1.652,1.139,2.926,1.139c0.627,0,1.178-0.094,1.69-0.285v-4.141h2.508v5.946
          c-1.159,0.475-2.622,0.722-4.427,0.722c-2.09,0-3.704-0.589-4.863-1.767c-1.14-1.179-1.709-2.717-1.709-4.616
          C18.686,16.855,19.313,15.297,20.567,14.025z"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_pnl" />
    </symbol>

    <!-- coating-TAN -->
    <symbol id="coating-tan" x="0px" y="0px" viewBox="0 0 38 38">
      <path class="svg-fill-orange" d="M13.28,15.13H10.21v9.71H7.82V15.13H4.73v-2h8.55v2Z" />
      <path
        class="svg-fill-orange"
        d="M19.77,24.83L19.05,23H15l-0.74,1.85H11.9l5-11.95h0.35l4.93,11.95H19.77ZM17,17.92l-1.3,3.25h2.63l-1.26-3.25H17Z"
      />
      <path
        class="svg-fill-orange"
        d="M25.63,24.83H23.26v-12h0.35c0.75,0.82,1.86,2,3.31,3.43s2.56,2.58,3.28,3.36h0.06V13.1h2.37V25H32.3l-6.63-7h0v6.77Z"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_pnl" />
    </symbol>

    <!-- coating-TiN -->
    <symbol id="coating-tin" x="0px" y="0px" viewBox="0 0 38 38">
      <path class="svg-fill-orange" d="M15.74,15.13H12.66v9.71H10.28V15.13H7.19v-2h8.55v2Z" />
      <path
        class="svg-fill-orange"
        d="M16.92,14.27A1.29,1.29,0,0,1,18.12,13a1.23,1.23,0,0,1,1.18,1.32A1.2,1.2,0,1,1,16.92,14.27Zm2.26,10.56H17V16.9h2.19v7.93Z"
      />
      <path
        class="svg-fill-orange"
        d="M23.7,24.83H21.33v-12h0.35c0.75,0.82,1.86,2,3.31,3.43s2.56,2.58,3.28,3.36h0.06V13.1h2.37V25H30.37l-6.63-7h0v6.77Z"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_pnl" />
    </symbol>

    <!-- coating-PP -->
    <symbol id="coating-pp" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        class="svg-fill-orange"
        d="M33.9,0H4A4,4,0,0,0,0,4V33.9a4,4,0,0,0,4,4H33.9a4,4,0,0,0,4-4V4a4,4,0,0,0-4-4h0Z"
      />
      <path
        class="svg-fill-white"
        d="M8.9,25.12L10.65,12.6h4.71c2.74,0,4,1.56,4,3.7a4.34,4.34,0,0,1-1.46,3.32A5.15,5.15,0,0,1,14.3,21H12.24l-0.57,4.16H8.9Zm4.22-10.43-0.61,4.22h1.56A2.45,2.45,0,0,0,16,18.17a2.56,2.56,0,0,0,.65-1.71c0-1-.61-1.77-2.05-1.77H13.12Z"
      />
      <path
        class="svg-fill-white"
        d="M19.84,25.12L21.59,12.6H26.3c2.74,0,4,1.56,4,3.7a4.34,4.34,0,0,1-1.46,3.32A5.15,5.15,0,0,1,25.24,21H23.19l-0.57,4.16H19.84Zm4.22-10.43-0.61,4.22H25a2.45,2.45,0,0,0,1.94-.74,2.56,2.56,0,0,0,.65-1.71c0-1-.61-1.77-2.05-1.77H24.06Z"
      />
    </symbol>
  </svg>
</template>

<style lang="scss">
.svg-fill-orange {
  fill: #f15a29;
}

.svg-fill-white {
  fill: #ffffff;
}
</style>
