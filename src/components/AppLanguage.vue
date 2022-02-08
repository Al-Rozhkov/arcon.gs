<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12">
    <g v-if="$context.locale === 'ru-ru'" fill="none">
      <path fill="#00247D" d="M0 0h16v12H0z"></path>
      <path class="white" d="M1.789 12H0v-1.342L14.211 0H16v1.342z"></path>
      <path class="white" d="M14.211 12L0 1.342V0h1.789L16 10.658V12z"></path>
      <path class="red" d="M8 6l8-6h-1.2l-8 6z"></path>
      <path class="red" d="M0 .9V0l8 6H6.8zm16 10.2v.9L8 6h1.2z"></path>
      <path class="red" d="M1.2 12l8-6H8l-8 6z"></path>
      <path
        class="white"
        d="M6.667 0h2.666v4H16v4H9.333v4H6.667V8H0V4h6.667z"
      ></path>
      <path
        class="red"
        d="M7.2 0h1.6v4.8H16v2.4H8.8V12H7.2V7.2H0V4.8h7.2z"
      ></path>
    </g>
    <g v-if="$context.locale === 'en-en'" fill="none">
      <path class="white" d="M0 0h16v12H0z"></path>
      <path fill="#0039A6" d="M0 4h16v8H0z"></path>
      <path fill="#D52B1E" d="M0 8h16v4H0z"></path>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.white {
  fill: #fff;
}
.red {
  fill: #cf142b;
}
</style>
