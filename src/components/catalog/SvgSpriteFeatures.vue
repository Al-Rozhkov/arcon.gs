<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-once>
    <defs>
      <symbol id="Red_tool" data-name="Red tool" viewBox="0 0 18.16 26.59">
        <polygon
          class="svg-form-tool svg-stroke-round"
          points="0.73 0.5 1.55 15.64 6.52 13.08 0.73 0.5"
        />
        <path
          class="svg-form-tool"
          d="M0.73,0.5L4.29,9.67S0.79,16.19.73,17.43s0,7.16,0,7.16a65.91,65.91,0,0,1,8-.68c2.8,0.06,9,.68,9,0.68V13.14L16.3,8.53l1.37-4.61V0.5H0.73Z"
        />
        <path
          class="svg-form-tool"
          d="M13.37,21.48s1-.23,1,0.47v2.34l-3.73-.36S12.23,21.67,13.37,21.48Z"
        />
        <path
          class="svg-stroke-round svg-fill-none"
          d="M10.34,0.5a28.26,28.26,0,0,0-5.9,8.83C2.92,12.64.73,17.43,0.73,17.43v7.16s1.27-1.25,4.81-5c1,0.62,1,1,1,1V24l2.24,0.62,4.61-3.11L15.86,9.09V0.5H10.34Z"
        />
        <path
          class="svg-form-tool"
          d="M16.29,8.53l1.37-4.61V0.5H13.18l1.18,7.78L5.42,25.86s2.69-.62,3.34-1.27C9.58,23.78,16.29,8.53,16.29,8.53Z"
        />
      </symbol>

      <!-- common stroke for square icons -->
      <path
        id="icon_stroke_panel"
        d="M33.9,3a1,1,0,0,1,1,1V33.9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H33.9m0-3H4A4,4,0,0,0,0,4V33.9a4,4,0,0,0,4,4H33.9a4,4,0,0,0,4-4V4a4,4,0,0,0-4-4h0Z"
      />
    </defs>

    <!-- form-sharp -->
    <symbol id="form-rect-sharp" x="0px" y="0px" viewBox="0 0 38 38">
      <use
        width="18.16"
        height="26.59"
        transform="translate(9.37 1.6)"
        xlink:href="#Red_tool"
        class="color-red"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-lila" />
    </symbol>

    <!-- form-sharp-r -->
    <symbol id="form-rect-r" x="0px" y="0px" viewBox="0 0 38 38">
      <text class="svg-txt" transform="translate(26.82 31.57)">R</text>
      <use
        width="18.16"
        height="26.59"
        transform="translate(6.42 0.52)"
        xlink:href="#Red_tool"
        class="color-red"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-lila" />
    </symbol>

    <!-- form-sharp-f -->
    <symbol id="form-rect-f" x="0px" y="0px" viewBox="0 0 38 38">
      <text class="svg-txt" transform="translate(26.89 31.68)">F</text>
      <use
        width="18.16"
        height="26.59"
        transform="translate(6.02 0.89)"
        xlink:href="#Red_tool"
        class="color-red"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-lila" />
    </symbol>

    <!-- form-radius -->
    <symbol id="form-radius" x="0px" y="0px" viewBox="0 0 38 38" class="color-red">
      <path
        class="svg-form-tool"
        d="M26.428,4.759c0,0,3.375,5.688,3.625,8.813 s0.438,9.313-1.813,11.25s-2.5,1.943-2.5,1.943s-3.189-0.325-5.938-1.26c-2.749-0.934-1.062-13.496-1.062-13.496l5.375-10.625
        L26.428,4.759z"
      />
      <path
        class="svg-form-tool"
        d="M8.366,1.384l3.375,17.25c0,0-2.75,3.875-3.375,5.813 c2.5,2.25,2.5,2.25,2.5,2.25s7.75,0.875,13.25-3.625c5.5-4.5,2.313-18.313, .313-18.313l-2.313-3.375H8.366z"
      />
      <path
        class="svg-form-tool"
        d="M24.115,1.384l-12.375,17.25c0,0-2.75,3.875-3.375,5.813 c0.413,0.371,1.046,0.939,1.046,0.939L27.348,1.384H24.115z"
      />
      <path
        class="svg-form-tool"
        d="M9.412,25.386 c1.454,1.311,1.454,1.311,1.454,1.311s7.75,0.875,13.25-3.625l-6.259,0.813l-7.627,0.408L9.412,25.386z"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-lila" />
    </symbol>

    <!-- form-sphere -->
    <symbol id="form-sphere" x="0px" y="0px" viewBox="0 0 38 38" class="color-red">
      <path
        class="svg-form-tool"
        d="M11.662,2.095c0,0,0.125,3.676,0.313,6.051 s0.875,7.688,0.875,7.688s-2.063,2.438-2.063,6.5s4.513,7.75,8.163,7.75c3.65,0,8.838-2.388,8.838-8.313 c0-5.55-2.625-9.375-2.625-9.375s1.313-6.227,1.313-10.301C24.412,2.095,11.662,2.095,11.662,2.095z"
      />
      <path
        class="svg-form-tool"
        d="M17.599,2.095c0,0,0.75,2.488,1.35,6.051 c-3.225,2.813-6.1,7.688-6.1,7.688s-2.063,2.438-2.063,6.5l1.313-0.563c0,0,3.26-7.373,6.411-10.216
        c4.402-3.972,7.823-6.78,7.823-6.78l0.142-2.68H17.599z"
      />
      <path
        class="svg-form-tool"
        d="M10.787,22.333c0,4.063,4.513,7.75,8.163,7.75l-1.1-2.666
        c0,0-2.583-0.834-2.792-4.459c-0.583-0.625-0.75-1-0.75-1l-2.208-0.188L10.787,22.333z"
      />
      <path
        class="svg-form-tool"
        d="M22.058,22.167h-2.902l-4.098,0.791
        c0.208,3.625,2.792,4.459,2.792,4.459C20.475,25.083,22.058,22.167,22.058,22.167z"
      />
      <path
        class="svg-form-tool"
        d="M22.058,22.167c0,0-1.583,2.916-4.208,5.25l1.1,2.666
        c0,0,5.983-1.916,6.608-7.916l-1.583-0.668L22.058,22.167z"
      />
      <path class="svg-stroke" d="M25.162,12.396c-0.688,3.125-1.252,7.044-3.104,9.771" />
      <polyline class="svg-stroke" points="27.78,22.033 25.558,22.167 24.467,15.692" />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-lila" />
    </symbol>

    <!-- tail-cylinder -->
    <symbol id="tail-cylinder" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        class="svg-stroke-hollow"
        style="stroke-linejoin:bevel;"
        d="M10.107,29.61c0,0,2.518-5.083,8.842,0 s8.843,0,8.843,0V9.027H10.107V29.61z"
      />
      <path
        class="svg-stroke-round"
        style="fill: #ffffff;"
        d="M27.793,29.61c0,0-2.519-5.083-8.843,0 s-8.842,0-8.842,0V9.027h17.686V29.61z"
      />
      <line class="svg-stroke-thin" x1="18.95" y1="14.99" x2="18.95" y2="22.907" />
      <line class="svg-stroke-thin" x1="18.95" y1="12.112" x2="18.95" y2="13.29" />
      <line class="svg-stroke-thin" x1="18.95" y1="4.423" x2="18.95" y2="10.604" />
      <line class="svg-stroke-thin" x1="18.95" y1="25.853" x2="18.95" y2="24.675" />
      <line class="svg-stroke-thin" x1="18.95" y1="33.542" x2="18.95" y2="27.36" />
      <polygon
        class="svg-stroke-round svg-fill-none"
        points="26.348,7.027 11.552,7.027 10.107,9.027 27.793,9.027"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-blue" />
    </symbol>

    <!-- tail-weldon -->
    <symbol id="tail-weldon" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        class="svg-stroke-hollow"
        style="stroke-linejoin:bevel;"
        d="M10.158,29.662c0,0,2.518-5.084,8.843,0 c6.324,5.082,8.841,0,8.841,0V9.078L10.158,29.662z"
      />
      <path
        class="svg-stroke-round"
        d="M10.158,9.078v4.653l4.601,2.021v6.495 l-4.601,2.021v5.393c0,0,2.518,5.082,8.843,0c6.324-5.084,8.841,0,8.841,0V9.078H10.158z"
      />
      <line class="svg-stroke-thin" x1="19" y1="15.041" x2="19" y2="22.959" />
      <line class="svg-stroke-thin" x1="19" y1="12.163" x2="19" y2="13.341" />
      <line class="svg-stroke-thin" x1="19" y1="4.474" x2="19" y2="10.655" />
      <line class="svg-stroke-thin" x1="19" y1="25.904" x2="19" y2="24.727" />
      <line class="svg-stroke-thin" x1="19" y1="33.594" x2="19" y2="27.412" />
      <polygon
        class="svg-stroke-round"
        points="26.396,7.078 11.603,7.078 10.158,9.078 27.842,9.078"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-blue" />
    </symbol>

    <!-- cogs-base -->
    <symbol id="cogs-base" x="0px" y="0px" viewBox="0 0 38 38">
      <path class="svg-stroke-2" d="M31.42,34.9a12.47,12.47,0,1,0-24.94,0" />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-green" />
    </symbol>

    <!-- cogs-variable -->
    <symbol id="cogs-variable" x="0px" y="0px" viewBox="0 0 38 38">
      <line class="svg-stroke" x1="8.5" y1="18.95" x2="28.4" y2="18.95" />
      <path
        class="svg-fill-black"
        d="M5.48,18.95a15.11,15.11,0,0,1,4.27,2.38L8.89,18.95l0.86-2.38A15.1,15.1,0,0,1,5.48,18.95Z"
      />
      <path
        class="svg-fill-black"
        d="M31.42,18.95a15.11,15.11,0,0,0-4.27,2.38L28,18.95l-0.86-2.38A15.1,15.1,0,0,0,31.42,18.95Z"
      />
    </symbol>

    <!-- cogs-center-cut -->
    <!-- <symbol id="cogs-center-cut" x="0px" y="0px" viewBox="0 0 38 38">
      <path class="svg-fill-red" d="M18.95,29.54a5.35,5.35,0,0,0-5.35,5.35H24.3A5.35,5.35,0,0,0,18.95,29.54Z"/>
      <rect class="svg-fill-red" x="16.29" y="22.71" width="5.37" height="14"/>
      <use width="38" height="38" xlink:href="#cogs-base" />
    </symbol>-->

    <!-- cogs-center-overlap -->
    <symbol id="cogs-center-overlap" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        class="svg-fill-red"
        d="M18.95,29.54a5.35,5.35,0,0,0-5.35,5.35H24.3A5.35,5.35,0,0,0,18.95,29.54Z"
      />
      <use width="38" height="38" xlink:href="#cogs-base" />
    </symbol>

    <!-- cogs-angle -->
    <symbol id="cogs-angle" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        style="fill:#5BA67F;"
        d="M16.394,35.574c-0.307-5.5-2.602-8.959-2.602-8.959l-0.098-0.094
        c2.024-4.28,2.42-10.225,2.42-10.225l-0.039,0.085c0.631-5.063-0.437-13.224-0.437-13.224l-0.759-0.834H0.886v33.25H16.394z"
      />
      <path class="svg-stroke-hollow" d="M14.875,1.938 c0,0-6.375,6.604-13.458,12.604" />
      <path class="svg-stroke-hollow" d="M15.233,3.954 c0,0-6.104,7.938-13.188,13.938" />
      <path
        class="svg-stroke-hollow"
        d="M15.233,1.938c0,0,0.449,3.001-0.038,6.439 c-0.778,5.498-3.946,10.314-6.776,13.347c-3.47,3.719-7.002,5.984-7.002,5.984"
      />
      <path
        class="svg-stroke-hollow"
        d="M15.422,2.772 c0,0,1.554,11.855-0.188,15.854c-2.438,5.594-6.177,10.188-13.188,16.5"
      />
      <path
        class="svg-stroke-hollow"
        d="M15.897,15.911 c0,0-0.476,7.254-3.101,11.504s-5.563,7.773-5.563,7.773"
      />
      <path class="svg-stroke-hollow" d="M13.575,26.229c0,0,1.221,4.959-0.779,9.646" />
      <path class="svg-stroke-hollow" d="M13.575,26.229c0,0,2.294,3.459,2.602,8.959" />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-green" />
    </symbol>

    <!-- cutting-arrow -->
    <symbol id="cutting-arrow" x="0px" y="0px" viewBox="0 0 38 38">
      <polygon
        class="svg-fill-teal svg-stroke"
        points="18.95 30.71 27.03 20.02 27.03 1.99 10.87 1.99 10.87 20.02 18.95 30.71"
      />
      <rect class="svg-fill-teal svg-stroke" x="10.87" y="1.94" width="16.17" height="8.08" />
      <polygon
        class="svg-fill-teal svg-stroke"
        points="20.11 10.02 13.64 23.68 15.12 25.65 22.52 10.02 20.11 10.02"
      />
      <polygon
        class="svg-fill-teal svg-stroke"
        points="27.03 10.02 26.21 10.02 17.39 28.65 18.88 30.61 27.03 13.39 27.03 10.02"
      />
      <polygon
        class="svg-fill-teal svg-stroke"
        points="14 10.02 10.87 16.64 10.87 20.02 11.37 20.69 16.42 10.02 14 10.02"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" style="fill:#2FAC66" />
    </symbol>

    <!-- cutting-t -->
    <symbol id="cutting-t" x="0px" y="0px" viewBox="0 0 38 38">
      <rect class="svg-fill-teal svg-stroke" x="15.38" y="1.93" width="7.11" height="15.92" />
      <polygon
        class="svg-fill-teal svg-stroke"
        points="21.76 30.17 16.15 30.17 6.02 23.77 15.38 17.85 22.49 17.85 31.88 23.77 21.76 30.17"
      />
      <line class="svg-form-tool" x1="27.51" y1="20.82" x2="23.58" y2="29.03" />
      <line class="svg-form-tool" x1="25.54" y1="19.9" x2="20.63" y2="30.18" />
      <line class="svg-form-tool" x1="22.56" y1="18.19" x2="16.82" y2="30.18" />
      <line class="svg-form-tool" x1="20.17" y1="17.94" x2="14.8" y2="29.16" />
      <line class="svg-form-tool" x1="16.48" y1="17.85" x2="11.87" y2="27.48" />
      <line class="svg-form-tool" x1="13.5" y1="18.98" x2="10" y2="26.3" />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" style="fill:#2FAC66" />
    </symbol>

    <!-- cutting-conus -->
    <symbol id="cutting-conus" x="0px" y="0px" viewBox="0 0 38 38">
      <polygon
        class="svg-fill-teal"
        points="14.49 30.71 23.41 30.71 27.03 10.02 27.03 1.99 10.87 1.99 10.87 10.02 14.49 30.71"
      />
      <line class="svg-stroke" x1="10.87" y1="10.02" x2="27.03" y2="10.02" />
      <polygon
        class="svg-stroke svg-fill-teal"
        points="22.11 10.02 13.9 27.36 14.49 30.71 14.73 30.71 24.52 10.02 22.11 10.02"
      />
      <polygon
        class="svg-stroke svg-fill-teal"
        points="18.42 30.71 20.83 30.71 24.92 22.07 26.34 13.97 18.42 30.71"
      />
      <polygon
        class="svg-stroke svg-fill-teal"
        points="16 10.02 12.25 17.94 12.9 21.67 18.42 10.02 16 10.02"
      />
      <polygon
        class="svg-stroke-hollow"
        points="14.49 30.71 23.41 30.71 27.03 10.02 27.03 1.99 10.87 1.99 10.87 10.02 14.49 30.71"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" style="fill:#2FAC66" />
    </symbol>

    <!-- cutting-inner-radius -->
    <symbol id="cutting-inner-radius" x="0px" y="0px" viewBox="0 0 38 38">
      <path
        class="svg-fill-teal"
        d="M13.29,24.28a4,4,0,0,1,4,4v2.43h3.31V28.28a4,4,0,0,1,4-4H27V1.94H10.87V24.28h2.43Z"
        transform="translate(0 0)"
      />
      <line class="svg-stroke" x1="27.03" y1="10.02" x2="10.87" y2="10.02" />
      <path
        class="svg-stroke-hollow svg-stroke-round"
        d="M21.11,10l-6.82,14.4a4,4,0,0,1,1.89,1.1L23.52,10H21.11Z"
        transform="translate(0 0)"
      />
      <path
        class="svg-stroke-hollow svg-stroke-round"
        d="M27,10.39L17.42,30.71h2.42l0.77-1.63v-0.8a4,4,0,0,1,2-3.45L27,15.5V10.39Z"
        transform="translate(0 0)"
      />
      <polygon
        class="svg-stroke-hollow svg-stroke-round"
        points="15 10.02 10.87 18.76 10.87 23.86 17.42 10.02 15 10.02"
      />
      <path
        class="svg-stroke-hollow"
        d="M13.29,24.28a4,4,0,0,1,4,4v2.43h3.31V28.28a4,4,0,0,1,4-4H27V1.94H10.87V24.28h2.43Z"
        transform="translate(0 0)"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" style="fill:#2FAC66" />
    </symbol>

    <!-- cutting-fluid-in -->
    <symbol id="cutting-fluid-in" x="0px" y="0px" viewBox="0 0 38 38">
      <!-- <polygon
        class="svg-fill-fusion"
        points="18.05 25.16 17.14 25.15 13.35 36.17 17.27 36.17 18.05 25.16"
      />
      <polygon
        class="svg-fill-fusion"
        points="19.96 25.2 23.74 36.17 26.05 36.17 20.72 25.2 19.96 25.2"
      />
      <polygon
        class="svg-fill-fusion"
        points="22.48 36.17 18.25 36.17 18.19 25.16 19.83 25.26 22.48 36.17"
      />-->
      <polygon
        class="svg-fill-fusion"
        points="16.47 25.16 14.55 25.15 8.8 36.17 14.73 36.17 16.47 25.16"
      />
      <polygon
        class="svg-fill-fusion"
        points="22.26 25.16 24.18 25.15 29.93 36.17 24 36.17 22.26 25.16"
      />
      <use
        width="18.16"
        height="26.59"
        transform="translate(9.37 1.6)"
        xlink:href="#Red_tool"
        style="color: #e6e7e8;"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-purple" />
    </symbol>

    <!-- cutting-fluid-out -->
    <symbol id="cutting-fluid-out" x="0px" y="0px" viewBox="0 0 38 38">
      <polygon
        class="svg-fill-fusion"
        points="21.24 6.47 22.16 6.46 26.8 36.17 25.13 36.17 21.24 6.47"
      />
      <polygon
        class="svg-fill-fusion"
        points="27.16 6.46 10.76 6.46 1.65 36.17 36.27 36.17 27.16 6.46"
      />
      <use
        width="18.16"
        height="26.59"
        transform="translate(9.37 1.6)"
        xlink:href="#Red_tool"
        style="color: #e6e7e8;"
      />
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-purple" />
    </symbol>

    <!-- allowance-cutting-diameter -->
    <symbol id="allowance-cutting-diameter" x="0px" y="0px" viewBox="0 0 38 38">
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-indigo" />
    </symbol>

    <!-- tool-length -->
    <symbol id="tool-length" x="0px" y="0px" viewBox="0 0 38 38">
      <use width="38" height="38" xlink:href="#icon_stroke_panel" class="svg-fill-lila" />
    </symbol>
  </svg>
</template>

<style lang="scss">
.svg-fill-fusion {
  fill: #60a3d9;
}

.svg-stroke-thin {
  fill: none;
  stroke: #000000;
  stroke-width: 0.5;
  stroke-miterlimit: 10;
}

.svg-fill-black {
  fill: #000000;
}

.svg-fill-lila {
  fill: $lila;
}

.svg-fill-indigo {
  fill: $indigo;
}

.svg-fill-purple {
  fill: $purple;
}

.svg-fill-blue {
  fill: #1c75bc;
}

.svg-fill-red {
  fill: #e5332a;
}

.svg-fill-green {
  fill: #8ebe3f;
}

.svg-fill-teal {
  fill: #00a199;
}

.svg-fill-none {
  fill: none;
}

.svg-stroke,
.svg-stroke-2,
.svg-stroke-hollow,
.svg-stroke-round,
.svg-form-tool {
  stroke: #000;
  stroke-miterlimit: 10;
}

.svg-stroke-2 {
  fill: none;
  stroke-width: 2px;
}

.svg-stroke-hollow {
  fill: none;
  stroke-linecap: round;
}

.svg-txt {
  isolation: isolate;
  font-size: 9px;
}

.svg-form-tool {
  fill: currentColor;
}

.svg-stroke-round {
  stroke-linejoin: round;
}

.color-red {
  color: #ee2a7b;
}
</style>
