<template>
  <div class="border">
    <div class="div"></div>
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="div4"></div>
    <div class="div5">wewewew</div>
    <div class="div6">
      <div class="div7"></div>
    </div>
    <div class="div8">Hello</div>
    <div class="div9"></div>
    <div class="div10"></div>
    <button class="btn">hover me</button>
  </div>
</template>
<script>
export default {
  name: 'Border',
}
</script>
<style lang="scss" scoped>
.border {
  padding: 20px;
  $borderColor: #03a9f3;
  $linearGradient: linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
    linear-gradient(90deg, #333 0%, #333 50%, transparent 50%, transparent 100%) repeat-x,
    linear-gradient(0deg, #333 50%, transparent 0) repeat-y, linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 30px;
    width: 200px;
    height: 100px;
  }
  .div {
    position: relative;
    border: 1px solid $borderColor;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
    }
    &::before {
      top: -5px;
      left: -5px;
      border-top: 1px solid $borderColor;
      border-left: 1px solid $borderColor;
    }
    &::after {
      right: -5px;
      bottom: -5px;
      border-bottom: 1px solid $borderColor;
      border-right: 1px solid $borderColor;
    }
    &:hover::before,
    &:hover::after {
      width: calc(100% + 9px);
      height: calc(100% + 9px);
    }
  }
  .div1 {
    background: $linearGradient;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    &:hover {
      animation: linearGradientMove 0.3s infinite linear;
    }
  }
  .div2 {
    outline: 1px solid #333;
    outline-offset: -1px;
    &:hover {
      outline: none;
      background: $linearGradient;
      background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
      background-position: 0 0, 0 100%, 0 0, 100% 0;
      animation: linearGradientMove 0.3s infinite linear;
    }
  }
  .div3,
  .div4,
  .div5 {
    width: 300px;
    height: 300px;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background-repeat: no-repeat;
      animation: rotate 4s infinite linear;
    }
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      background-color: #fff;
      opacity: 1;
    }
  }
  .div3 {
    &::after {
      background-size: 50% 50%, 50% 50%;
      background-position: 0 0, 100% 0, 100% 100%, 0 100%;
      background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300),
        linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
    }
    &::before {
      animation: opacity 10s infinite linear;
    }
  }
  .div4 {
    &::after {
      background-size: 50% 50%;
      background-position: 0 0;
      background-image: linear-gradient(#399953, #399953);
    }
  }
  .div5 {
    &::after {
      background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
      background-color: black;
    }
  }
  .div6 {
    position: relative;
    // border: 1px solid red;
    border-radius: 10px;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid gold;
    }
    &::before {
      animation: clippathBefore 3s infinite linear;
    }
    &::after {
      animation: clippath 3s infinite linear;
    }
    .div7 {
      margin: 10px;
      background-color: gold;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      border-radius: 10px;
    }
  }
  .div8 {
    position: relative;
    width: 120px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border: 2px solid gold;
    border-radius: 10px;
    background: gold;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      filter: contrast(1.1);
    }
    &:active {
      filter: contrast(0.9);
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 2px solid gold;
      transition: all 0.5s;
      animation: clippath 3s infinite linear;
      border-radius: 10px;
    }
    &::after {
      animation: clippath 3s infinite -1.5s linear;
    }
  }
  .div9 {
    border: 24px solid;
    border-image: url('../../assets/logo.png');
    border-image-slice: 32;
    border-image-repeat: round;
  }
  .div10 {
    border: 10px solid;
    border-image: linear-gradient(45deg, gold, deeppink);
    border-image-slice: 1;
    clip-path: inset(0px round 10px);
    animation: huerotate 6s infinite linear;
    filter: hue-rotate(360deg);
    @keyframes huerotate {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(360deg);
      }
    }
  }
  .btn {
    position: relative;
    width: 160px;
    height: 48px;
    border: 1px solid rgba(0, 174, 209, 1);
    outline: transparent;
    overflow: hidden;
    cursor: pointer;
    transition: 0.25s;
    background-color: transparent;
    color: black;
    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(0, 174, 209, 0.5), transparent);
      transform: translateX(-100%);
      transition: 0.6s;
    }
    &:hover {
      background: transparent;
      box-shadow: 0 0 20px 10px rgba(0, 174, 209, 0.5);
    }

    &:hover::before {
      transform: translateX(100%);
    }
  }

  @keyframes linearGradientMove {
    100% {
      background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
    }
  }
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes opacity {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  @keyframes clippathBefore {
    0%,
    100% {
      clip-path: inset(95% 0 0 0 round 10px);
    }
    25% {
      clip-path: inset(0 0 0 95% round 10px);
    }
    50% {
      clip-path: inset(0 0 95% 0 round 10px);
    }
    75% {
      clip-path: inset(0 95% 0 0 round 10px);
    }
  }
  @keyframes clippath {
    0%,
    100% {
      clip-path: inset(0 0 95% 0 round 10px);
    }
    25% {
      clip-path: inset(0 95% 0 0 round 10px);
    }
    50% {
      clip-path: inset(95% 0 0 0 round 10px);
    }
    75% {
      clip-path: inset(0 0 0 95% round 10px);
    }
  }
}
</style>
