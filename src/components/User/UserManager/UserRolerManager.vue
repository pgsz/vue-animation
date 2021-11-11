<template>
  <div class="user-roler">
    <div class="roler-left" :style="{ width: width + 'px' }"></div>
    <XHandle class="myxhandle" @widthChange="widthChange" />
    <div class="roler-right">
      <div class="arrow-button"></div>
      <svg width="0" height="0">
        <filter id="outline">
          <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="1"></feMorphology>

          <feFlood flood-color="green" flood-opacity="1" result="flood"></feFlood>
          <feComposite in="flood" in2="DILATED" operator="in" result="OUTLINE"></feComposite>

          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      <div class="scroll-wrap" :style="{ 'overflow-y': overflowY }" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <ul :class="isPlay ? 'play' : 'stop'" :style="{ willChange: isWillChange }">
          <li v-for="(item, index) in liList" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div class="g-container">
        <p>TEXT WAVE</p>
      </div>
    </div>
  </div>
</template>
<script>
import XHandle from './XHandle.vue'
export default {
  components: {
    XHandle,
  },
  data() {
    return {
      width: 200,
      res: [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '10' },
      ],
      liList: [],
      isPlay: false,
      overflowY: 'hiddren',
    }
  },
  computed: {
    isWillChange() {
      return this.res.length > 5 ? 'transform' : 'auto'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.liList = [...this.res, ...this.res]
      this.isPlay = true
    },
    mouseenter() {
      this.isPlay = false
      this.liList = [...this.res]
      this.overflowY = 'auto'
    },
    mouseleave() {
      this.isPlay = true
      this.liList = [...this.res, ...this.res]
    },
    widthChange(movement) {
      this.width -= movement
      if (this.width < 50) {
        this.width = 50
      }
      if (this.width > 500) {
        this.width = 500
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.user-roler {
  display: flex;
  width: 100%;
  height: 100%;
  .roler-left {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .roler-right {
    flex: 1;
    height: 100%;
    background-color: #f5f5f5;
    padding: 24px;
  }
  .arrow-button {
    position: relative;
    width: 180px;
    height: 64px;
    background: #f49714;
    filter: url(#outline);
    filter: drop-shadow(0px 0px 2px #000);
    &::after {
      content: '';
      position: absolute;
      width: 32px;
      height: 64px;
      top: 0;
      right: -32px;
      background: linear-gradient(-45deg, transparent 0, transparent 22px, #f49714 22px, #f49714 100%),
        linear-gradient(-135deg, transparent 0, transparent 22px, #f49714 22px, #f49714 100%);
      background-size: 32px 32px;
      background-repeat: no-repeat;
      background-position: 0 bottom, 0 top;
    }
  }
}
.scroll-wrap {
  width: 300px;
  height: 300px;
  overflow-x: hidden;
  overflow-y: hidden;
  border: 1px solid red;
  ul.play {
    animation: loop 5s linear infinite;
    animation-play-state: running;
  }
  ul.stop {
    transform: translateY(0);
    animation-play-state: paused;
  }
  li {
    width: 80%;
    height: 50px;
    border: 1px solid green;
    margin: 6px auto;
  }
  @keyframes loop {
    to {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }
}

.g-container {
  margin: auto;
}

p {
  position: relative;
  font-size: 120px;
  font-weight: bold;
  background: #fff;
  color: #000;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -923px;
    left: 50%;
    width: 2000px;
    height: 2000px;
    border-radius: 45% 48% 43% 47%;
    transform: translate(-50%, -50%);
    background: rgba(3, 169, 244, 0.85);
    animation: rotate 10s infinite linear;
    z-index: 1;
    mix-blend-mode: lighten;
  }

  &::after {
    border-radius: 43% 47% 44% 48%;
    animation: rotate 10s infinite 0.5s linear;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
