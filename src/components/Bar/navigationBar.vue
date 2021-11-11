<template>
  <div class="navigation-bar">
    <ul>
      <li v-for="item in barList" :key="item.id">{{ item.name }}</li>
    </ul>
    <div class="main">
      <div class="count">
      <h1>一级标题</h1>
      <h2>二级标题</h2>
      <h2>二级标题</h2>
      <h2>二级标题</h2>

      <h1>一级标题</h1>
      <h2>二级标题</h2>
      <h2>二级标题</h2>

      <h1>一级标题</h1>
      <h2>二级标题</h2>
      </div>
      <div class="particle">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <p class="coupon">
        <span>200</span>
        优惠券
      </p>
      <div class="card">
        <span></span>
        <div class="content">
          <h2>Card</h2>
          <p>
            我是一段话， 我是一段话， 我是一段话， 我是一段话， 我是一段话， 我是一段话， 我是一段话， 我是一段话，
            我是一段话， 我是一段话，
          </p>
          <a href="#">点我啦</a>
        </div>
      </div>
      <div class="radar">
        <div class="fan"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num3: 4,
      barList: [
        { name: '导航栏一', id: 1 },
        { name: '导航栏二', id: 2 },
        { name: '导航栏三', id: 3 },
        { name: '导航栏四', id: 4 },
        { name: '导航栏五', id: 5 },
      ],
    }
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.navigation-bar {
  overflow: hidden;
  .main{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
  }
  ul {
    display: flex;
    justify-content: center;
    font-size: 18px;
    li {
      padding: 8px 16px;
      position: relative;
      cursor: pointer;
      //  禁止复制
      -webkit-user-select: none; /* Chrome & Safari all */
      -moz-user-select: none; /* Firefox all */
      -ms-user-select: none; /* IE 10+ */
      user-select: none;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 100%;
        border-bottom: 2px solid #000;
        transition: all 0.3s;
      }
      &:hover::before {
        width: 100%;
        left: 0;
      }
      &:hover ~ li::before {
        left: 0;
      }
    }
  }
  .count {
    counter-reset: mcounter;
    h1::before {
      counter-increment: mcounter;
      content: counter(mcounter);
    }
    /* 设置重置 遇到h1 就重新开始计算 */
    h1 {
      counter-reset: ncounter;
    }
    h2:before {
      counter-increment: ncounter;
      content: counter(mcounter) '-' counter(ncounter) ' ';
      margin-left: 20px;
    }
  }
  .particle {
    position: relative;
    width: 500px;
    height: 500px;
    background: #000;
    overflow: hidden;
    i {
      &:before,
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        background: radial-gradient(#fff, #fff 10%, rgba(255, 255, 255, 0) 56%);
        border-radius: 50%;
        content: '';
        opacity: 0;
      }
    }
  }

  @for $i from 1 through 30 {
    .particle {
      i:nth-child(#{$i}) {
        &:before {
          $w: #{random(5) + 10}px;
          width: $w;
          height: $w;
          animation: p#{$i} #{random(5) * 0.2+10}s #{random(10) * 0.6}s infinite;
        }

        &:after {
          $w: #{random(6) + 3}px;
          width: $w;
          height: $w;
          animation: p#{$i} #{random(5) * 0.2+10}s #{random(20) * 0.6}s infinite;
        }

        @keyframes p#{$i} {
          0% {
            transform: translate3d(#{(random(500)) * (random(2) * 2-3)}px, #{(random(500)) * (random(2) * 2-3)}px, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
        }
      }
    }
  }
  .coupon {
    width: 300px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    position: relative;
    background: radial-gradient(circle at right bottom, transparent 10px, black 10px) top right / 50% 50% no-repeat,
      radial-gradient(circle at left bottom, transparent 10px, black 0) top left / 50% 50% no-repeat,
      radial-gradient(circle at right top, transparent 10px, black 0) bottom right / 50% 50% no-repeat,
      radial-gradient(circle at left top, transparent 10px, black 0) bottom left / 50% 50% no-repeat;
    filter: drop-shadow(2px 2px 2px red);
    span {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      color: red;
      font-size: 50px;
      font-weight: 400;
    }
  }
  .card {
    position: relative;
    width: 320px;
    height: 400px;
    color: #fff;
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 30px;
    transition: 0.5s;
    text-align: left;
    &:hover {
      transform: translateY(-20px);
    }
    /* 通过两个伪类来实现渐变 */
    /* 这里是为了实现渐变边框 */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #ffbc00, #ff0058);
    }
    /* 这里是为了实现渐变边框虚化 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #ffbc00, #ff0058);
      filter: blur(30px);
    }
    span {
      position: absolute;
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 6px;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 2;
    }
    /* 使左右两边颜色有一定差距 */
    span::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .content {
      position: relative;
      z-index: 10;
      padding: 20px 40px;
    }
    h2,
    p {
      color: #fff;
      margin-bottom: 10px;
    }
    p {
      line-height: 25px;
    }
    a {
      display: inline-block;
      color: #111;
      background-color: #fff;
      padding: 10px;
      text-decoration: none;
      font-weight: 700;
    }
  }
  .radar {
    overflow: hidden;
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #5ef2ff;
    box-sizing: border-box;
  }

  .radar::before {
    width: 100px; 
    height: 200px;
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    border-left: 1px solid #5ef2ff;
  }

  .radar::after {
    width: 200px; 
    height: 100px;
    content: '';
    display: block;
    box-sizing: border-box;
    border-bottom: 1px solid #5ef2ff;
  }

  .fan {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid #5ef2ff;
    width: 100px;
    height: 100px;
  }

  .fan::after {
    content: "";
    width: 100px;
    height: 100px;
    display: block;
    box-sizing: border-box;
    position: relative;
    top: -50%;
    right: -50%;
    transform-origin: 0% 100%;
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(to right, transparent, #5ef2ff);
    border-image-slice: 3;
    background: transparent;
    background-image: linear-gradient(to right, transparent, #9bfdfd);
    animation: rotateAnimate 2s linear infinite;
  }

  @keyframes rotateAnimate {
    from {
      transform: rotate(0deg) skew(-10deg)
    }
    to {
      transform: rotate(360deg) skew(-10deg)
    }
  }
}
</style>
