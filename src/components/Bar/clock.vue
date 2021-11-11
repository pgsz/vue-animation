<template>
  <div class="clock">
    <div class="flip">
      <div class="digital front" data-number="0"></div>
      <div class="digital back" data-number="1"></div>
    </div>
    <div class="flip">
      <div class="digital front" data-number="0"></div>
      <div class="digital back" data-number="1"></div>
    </div>
    <em class="divider">:</em>
    <div class="flip">
      <div class="digital front" data-number="0"></div>
      <div class="digital back" data-number="1"></div>
    </div>
    <div class="flip">
      <div class="digital front" data-number="0"></div>
      <div class="digital back" data-number="1"></div>
    </div>
    <em class="divider">:</em>
    <div class="flip">
      <div class="digital front" data-number="0"></div>
      <div class="digital back" data-number="1"></div>
    </div>
    <div class="flip">
      <div class="digital front" data-number="0"></div>
      <div class="digital back" data-number="1"></div>
    </div>
  </div>
</template>
<script>
class Flipper {
  constructor(node, currentTime, nextTime, isFlipping = false, duration = 600) {
    this.isFlipping = isFlipping
    // tag: duration需要与动画延迟时间一致
    this.duration = duration
    this.flipNode = node
    this.frontNode = node.querySelector('.front')
    this.backNode = node.querySelector('.back')
    this.setFrontTime(currentTime)
    this.setBackTime(nextTime)
  }
  setFrontTime(time) {
    this.frontNode.dataset.number = time
  }
  setBackTime(time) {
    this.backNode.dataset.number = time
  }
  flipDown(currentTime, nextTime) {
    if (this.isFlipping) {
      return false
    }
    this.isFlipping = true
    this.setFrontTime(currentTime)
    this.setBackTime(nextTime)
    this.flipNode.classList.add('running')
    setTimeout(() => {
      this.flipNode.classList.remove('running')
      this.isFlipping = false
      this.setFrontTime(nextTime)
    }, this.duration)
  }
}
export default {
  name: 'clock',
  data() {
    return {
      a: 0,
      b: 0,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let flips = document.querySelectorAll('.flip')
      let now = new Date()
      let nowTimeStr = this.getTimeFromDate(new Date(now.getTime() - 1000))
      let nextTimeStr = this.getTimeFromDate(now)
      // 伪数组变真数组 使用数组的方法
      let flippers = Array.from(flips).map((flip, i) => new Flipper(flip, nowTimeStr[i], nextTimeStr[i]))
      setInterval(() => {
        let now = new Date()
        let nowTimeStr = this.getTimeFromDate(new Date(now.getTime() - 1000))
        let nextTimeStr = this.getTimeFromDate(now)
        for (let i = 0; i < flippers.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          // 翻转
          flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i])
        }
      }, 1000)
    },
    getTimeFromDate(date) {
      return date
        .toTimeString()
        .slice(0, 8)
        .split(':')
        .join('')
    },
  },
}
</script>
<style lang="scss" scoped>
.clock {
  display: flex;
  justify-content: center;
  .divider {
    font-size: 66px;
    line-height: 102px;
    font-style: normal;
  }
  .flip {
    position: relative;
    width: 60px;
    height: 100px;
    margin: 2px;
    font-size: 66px;
    line-height: 100px;
    text-align: center;
    background: white;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    // tag: 倒影效果
    -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.4));
    .digital {
      &::before,
      &::after {
        position: absolute;
        content: attr(data-number);
        left: 0;
        right: 0;
        color: white;
        background: black;
        overflow: hidden;
        perspective: 160px;
      }
      &::before {
        top: 0;
        bottom: 50%;
        border-bottom: 1px solid #666;
        border-radius: 10px 10px 0 0;
      }
      &::after {
        top: 50%;
        bottom: 0;
        line-height: 0;
        border-radius: 0 0 10px 10px;
      }
    }
    .back::before,
    .front::after {
      z-index: 1;
    }
    .back::after {
      z-index: 2;
    }
    .front::before {
      z-index: 3;
    }
    // animation
    .back::after {
      transform-origin: center top;
      transform: rotateX(0.5turn);
    }
    &.running {
      .front::before {
        transform-origin: center bottom;
        animation: frontFlipDown 0.6s ease-in-out;
        box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
        // tag: 隐藏被旋转的 div 元素的背面
        backface-visibility: hidden;
      }
      .back::after {
        animation: backFlipDown 0.6s ease-in-out;
      }
    }
  }
}
@keyframes frontFlipDown {
  to {
    transform: rotateX(0.5turn);
  }
}

@keyframes backFlipDown {
  to {
    transform: rotateX(0);
  }
}
</style>
