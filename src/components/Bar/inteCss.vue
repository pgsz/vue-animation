<template>
  <div class="inte-css">
    <ul class="strip-loading">
      <li v-for="v in 6" :key="v" :style="`--line-index: ${v}`"></li>
    </ul>
    <hr />
    <div class="heart-loading">
      <ul style="--line-count: 9">
        <li v-for="v in 9" :key="v" :class="`line-${v}`" :style="`--line-index: ${v}`"></li>
      </ul>
    </div>
    <hr />
    <div class="track-btn" @mousemove="move">
      <span>妙用CSS变量，让你的CSS变得更心动</span>
    </div>
    <hr />
    <div class="test-class">
      <p>哇哇哇哇</p>
      <p>额鹅鹅鹅</p>
    </div>
    <hr />
    <ul class="hover-tips" ref="ul">
      <li v-for="(item, index) in colorsList" :key="index" :data-name="item.name" :data-color="item.color"></li>
    </ul>
    <hr />
    <p class="blink-text tac">🔥若对CSS技巧很感兴趣，请关注我喔</p>
    <hr />
    <div class="square-bg"></div>
    <img src="../../assets/下载.jpg" alt="" class="mask-bg" />
    <hr />
    <div class="shadow"></div>
    <div class="heart-shape"></div>
    <div class="auto-typing">Do You Want To Know More About CSS Development Skill</div>
    <hr />
    <div class="mixin">CSS技巧很感兴趣</div>
    <hr />
    <ul class="accordion">
      <li v-for="index in 6" :key="'acc' + index"></li>
    </ul>
    <hr />
    <div class="accordion-two">
      <input id="collapse1" type="checkbox" hidden />
      <input id="collapse2" type="checkbox" hidden />
      <input id="collapse3" type="checkbox" hidden />
      <article>
        <label for="collapse1">列表1</label>
        <p>
          内容1
          <br />
          内容2
          <br />
          内容3
          <br />
          内容4
        </p>
      </article>
      <article>
        <label for="collapse2">列表2</label>
        <p>
          内容1
          <br />
          内容2
          <br />
          内容3
          <br />
          内容4
        </p>
      </article>
      <article>
        <label for="collapse3">列表3</label>
        <p>
          内容1
          <br />
          内容2
          <br />
          内容3
          <br />
          内容4
        </p>
      </article>
    </div>
    <hr />
    <div class="auth">
      <input id="login-btn" type="radio" name="auth" checked hidden />
      <input id="logon-btn" type="radio" name="auth" hidden />
      <div class="auth-title">
        <label for="login-btn">登录</label>
        <label for="logon-btn">注册</label>
        <em></em>
      </div>
      <div class="auth-form">
        <form>
          <div>
            <input type="text" placeholder="请输入手机" pattern="^1[3456789]\d{9}$" required />
            <label>手机</label>
          </div>
          <div>
            <input type="password" placeholder="请输入密码(6到20位字符)" pattern="^[\dA-Za-z_]{6,20}$" required />
            <label>密码</label>
          </div>
          <button type="button">登录</button>
        </form>
        <form>
          <div>
            <input type="text" placeholder="请输入手机" pattern="^1[3456789]\d{9}$" required />
            <label>手机</label>
          </div>
          <div>
            <input type="password" placeholder="请输入密码(6到20位字符)" pattern="^[\dA-Za-z_]{6,20}$" required />
            <label>密码</label>
          </div>
          <button type="button">登录</button>
        </form>
      </div>
    </div>
    <div class="bruce flex-ct-y" data-title="放大镜">
      <div
        class="magnifier"
        ref="magnifier"
        @mousemove="bruceMove"
        @mouseenter="bruceEnter"
        @mouseleave="bruceLwave"
        :style="{ '--size': currentSize }"
      ></div>
    </div>
    <div class="bruce flex-ct-x" data-title="滚动渐变背景">
      <div ref="bg" class="dynamic-bg">
        <header></header>
        <main @scroll="scroll">
          <div>
            <p>
              网易公司（NASDAQ:
              NTES），1997年由创始人兼CEO丁磊先生在广州创办，2000年在美国NASDAQ股票交易所挂牌上市，是中国领先的互联网技术公司。在开发互联网应用、服务及其它技术方面，始终保持中国业界领先地位。本着对中国互联网发展强烈的使命感，缔造美好生活的愿景，网易利用最先进的互联网技术，加强人与人之间信息的交流和共享。
            </p>
            <p>
              网易公司推出了门户网站、在线游戏、电子邮箱、在线教育、电子商务、在线音乐、网易bobo等多种服务。网易在广州天河智慧城的总部项目计划2019年1月建成，网易游戏总部将入驻。2016年，游戏业务营业收入在网易总营收中占比73.3%。2011年，网易杭州研究院启用。网易传媒等业务在北京。网易在杭州上线了网易考拉海购、网易云音乐等项目。
            </p>
            <p>
              网易2019全年财报显示，网易公司2019年全年净收入为592.4亿元；基于非美国通用会计准则，归属于网易公司股东的持续经营净利润为156.6亿元。
            </p>
            <p>
              2019年，网易深入推进战略聚焦，坚守内容消费领域，积极布局游戏、教育、音乐、电商等核心赛道，取得重大突破。在保持稳健增长的同时，网易有道、创新及其他等业务板块爆发强大潜力，为未来的长期发展提供源源不断的动能。
            </p>
          </div>
        </main>
      </div>
    </div>
    <div class="bounding-client-rect" ref="bounding"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorsList: [
        { name: '姨妈红', color: '#f66' },
        { name: '基佬紫', color: '#66f' },
        { name: '箩底橙', color: '#f90' },
        { name: '姣婆蓝', color: '#09f' },
        { name: '大粪青', color: '#9c3' },
        { name: '原谅绿', color: '#3c9' },
      ],
      arr: [
        { name: '苹果', id: 1 },
        { name: '香蕉', id: 2 },
        { name: '苹果', id: 3 },
        { name: '香蕉', id: 4 },
      ],
      currentSize: 0,
      bgStyle: {},
    }
  },
  created() {},
  mounted() {},
  methods: {
    removeDuplication(arr = [], name = 'name') {
      if (!Array.isArray(arr)) return '请传入数组'
      let hash = {}
      return arr.reduce((acc, cur) => {
        hash[cur[name]] ? '' : (hash[cur[name]] = true && acc.push(cur))
        return acc
      }, [])
    },
    move(e) {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop
      e.target.style.setProperty('--x', `${x}px`)
      e.target.style.setProperty('--y', `${y}px`)
    },
    bruceMove(e) {
      e.target.style.setProperty('--x', `${e.offsetX}px`)
      e.target.style.setProperty('--y', `${e.offsetY}px`)
    },
    bruceEnter() {
      this.currentSize = '100px'
    },
    bruceLwave() {
      this.currentSize = 0
    },
    scroll(e) {
      const top = e.target.scrollTop
      if (top <= 250) {
        this.bgStyle.setProperty('--scrolly', 250 - top)
      } else {
        this.bgStyle.setProperty('--scrolly', 0)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.inte-css {
  display: flex;
  flex-wrap: wrap;
  .strip-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    li {
      --time: calc(var(--line-index) * 200ms);
      border-radius: 3px;
      width: 6px;
      height: 30px;
      background-color: #f66;
      animation: beat 1.5s ease-in-out var(--time) infinite;
      & + li {
        margin-left: 5px;
      }
    }
    @keyframes beat {
      0%,
      100% {
        transform: scaleY(1);
      }
      50% {
        transform: scaleY(0.5);
      }
    }
  }
  .heart-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    ul {
      display: flex;
      justify-content: space-between;
      width: 150px;
      height: 10px;
    }
    li {
      --Θ: calc(var(--line-index) / var(--line-count) * 0.5turn);
      --time: calc((var(--line-index) - 1) * 40ms);
      border-radius: 5px;
      width: 10px;
      height: 10px;
      background-color: #3c9;
      filter: hue-rotate(var(--Θ));
      animation-duration: 1s;
      animation-delay: var(--time);
      animation-iteration-count: infinite;
      &.line-1,
      &.line-9 {
        animation-name: beat-1;
      }
      &.line-2,
      &.line-8 {
        animation-name: beat-2;
      }
      &.line-3,
      &.line-7 {
        animation-name: beat-3;
      }
      &.line-4,
      &.line-6 {
        animation-name: beat-4;
      }
      &.line-5 {
        animation-name: beat-5;
      }
    }
    @keyframes beat-1 {
      0%,
      10%,
      90%,
      100% {
        height: 10px;
      }
      45%,
      55% {
        height: 30px;
        transform: translate3d(0, -15px, 0);
      }
    }
    @keyframes beat-2 {
      0%,
      10%,
      90%,
      100% {
        height: 10px;
      }
      45%,
      55% {
        height: 60px;
        transform: translate3d(0, -30px, 0);
      }
    }
    @keyframes beat-3 {
      0%,
      10%,
      90%,
      100% {
        height: 10px;
      }
      45%,
      55% {
        height: 80px;
        transform: translate3d(0, -40px, 0);
      }
    }
    @keyframes beat-4 {
      0%,
      10%,
      90%,
      100% {
        height: 10px;
      }
      45%,
      55% {
        height: 90px;
        transform: translate3d(0, -30px, 0);
      }
    }
    @keyframes beat-5 {
      0%,
      10%,
      90%,
      100% {
        height: 10px;
      }
      45%,
      55% {
        height: 90px;
        transform: translate3d(0, -20px, 0);
      }
    }
  }
  .track-btn {
    margin-top: 50px;
    overflow: hidden;
    position: relative;
    border-radius: 25px;
    width: 400px;
    height: 50px;
    background-color: #66f;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    span {
      position: relative;
      pointer-events: none;
    }
    &::before {
      --size: 0;
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: var(--size);
      height: var(--size);
      background-image: radial-gradient(circle closest-side, #09f, transparent);
      content: '';
      transform: translate3d(-50%, -50%, 0);
      transition: width 200ms ease, height 200ms ease;
    }
    &:hover::before {
      --size: 400px;
    }
  }
  .test-class {
    color: green;
    & > p + p {
      color: red;
    }
  }
  $color-list: #f66 #66f #f90 #09f #9c3 #3c9;
  .hover-tips {
    display: flex;
    width: 200px;
    justify-content: space-between;
    li {
      position: relative;
      padding: 2px;
      border: 2px solid transparent;
      border-radius: 100%;
      width: 24px;
      height: 24px;
      background-clip: content-box;
      cursor: pointer;
      transition: all 300ms;
      @each $color in $color-list {
        $index: index($color-list, $color);
        &:nth-child(#{$index}) {
          background-color: $color;
          &:hover {
            border-color: $color;
          }
        }
      }
      &::before,
      &::after {
        position: absolute;
        left: 50%;
        bottom: 100%;
        opacity: 0;
        transform: translate3d(0, -30px, 0);
        transition: all 300ms;
      }
      &::before {
        margin: 0 0 12px -35px;
        border-radius: 5px;
        width: 70px;
        height: 30px;
        background-color: rgba(#000, 0.5);
        line-height: 30px;
        text-align: center;
        color: #fff;
        content: attr(data-name);
      }
      &::after {
        margin-left: -6px;
        border: 6px solid transparent;
        border-top-color: rgba(#000, 0.5);
        width: 0;
        height: 0;
        content: '';
      }
      &:hover {
        &::before,
        &::after {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    }
  }
  .blink-text {
    width: 100%;
    background-image: linear-gradient(-45deg, #f66 30%, #fff 50%, #f66 70%);
    background-size: 200%;
    background-clip: text;
    background-blend-mode: hard-light;
    font-weight: bold;
    font-size: 20px;
    color: transparent;
    animation: shine 2s infinite;
    @keyframes shine {
      from {
        background-position: 100%;
      }
      to {
        background-position: 0;
      }
    }
  }
  .square-bg {
    width: 500px;
    height: 300px;
    // background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
    //   linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
    // background-position: 0 0, 20px 20px;
    // background-size: 40px 40px;
    background-color: #3c9;
    background-image: linear-gradient(0deg, #fff 5%, transparent 5%, transparent),
      linear-gradient(90deg, #fff 5%, transparent 5%, transparent);
    background-position: 0 0, 20px 20px;
    background-size: 20px 20px;
  }
  .mask-bg {
    mask: url('../../assets/logo.png') no-repeat center center;
  }
  .shadow {
    margin: 50px;
    border: 1px solid #f66;
    width: 200px;
    height: 200px;
    box-shadow: -10px 0 5px -5px #f66;
  }
  .heart-shape {
    width: 200px;
    height: 200px;
    margin: 200px auto;
    background-color: #f66;
    transform: rotateZ(45deg);
    position: relative;
    &::before,
    &::after {
      width: 100%;
      height: 100%;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 100%;
      background-color: #f66;
    }
    &::before {
      transform: translateX(-50%);
    }
    &::after {
      transform: translateY(-50%);
    }
  }
  @mixin typing($count: 0, $duration: 0, $delay: 0) {
    overflow: hidden;
    border-right: 1px solid transparent;
    width: #{$count + 1}ch;
    font-family: Consolas, Monaco, monospace;
    white-space: nowrap;
    animation: typing #{$duration}s steps($count + 1) #{$delay}s infinite backwards,
      caret 500ms steps(1) #{$delay}s infinite forwards;
  }
  .auto-typing {
    font-weight: bold;
    font-size: 30px;
    color: #09f;
    @include typing(52, 5);
  }
  @keyframes caret {
    50% {
      border-right-color: currentColor;
    }
  }
  @keyframes typing {
    from {
      width: 0;
    }
  }
  @mixin colors($text: #000000, $background: transparent, $border: transparent) {
    color: $text;
    background-color: $background;
    border-color: $border;
  }
  .mixin {
    width: 200px;
    height: 30px;
    margin: 10px;
    line-height: 30px;
    // @include colors(red, green, black);
    $content: red;
    $content: green !default;
    color: $content;
    border: 1px solid;
  }
  .accordion {
    margin: 20px;
    display: flex;
    width: 600px;
    height: 200px;
    li {
      flex: 1;
      cursor: pointer;
      transition: all 300ms;
      @each $color in $color-list {
        $index: index($color-list, $color);
        &:nth-child(#{$index}) {
          background-color: $color;
          &:hover {
            flex: 3;
            background-color: #ccc;
          }
        }
      }
    }
  }
  .accordion-two {
    width: 300px;
    article {
      cursor: pointer;
      & + article {
        margin-top: 5px;
      }
    }
    input {
      &:nth-child(1):checked ~ article:nth-of-type(1) p,
      &:nth-child(2):checked ~ article:nth-of-type(2) p,
      &:nth-child(3):checked ~ article:nth-of-type(3) p {
        border-bottom-width: 1px;
        max-height: 600px;
      }
    }
    label {
      display: block;
      padding: 0 20px;
      height: 40px;
      background-color: #f66;
      cursor: pointer;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
    }
    p {
      overflow: hidden;
      padding: 0 20px;
      border: 1px solid #f66;
      border-top: none;
      border-bottom-width: 0;
      max-height: 0;
      line-height: 30px;
      transition: all 500ms;
    }
  }
  .auth {
    overflow: hidden;
    border-radius: 2px;
    width: 320px;
    background-color: #fff;
    border: 5px solid #999999;
    .auth-title {
      display: flex;
      position: relative;
      border-bottom: 1px solid #eee;
      height: 40px;
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        cursor: pointer;
        transition: all 300ms;
        &:hover {
          color: #66f;
        }
      }
      em {
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 1px;
        width: 50%;
        height: 2px;
        background-color: #f66;
        transition: all 300ms cubic-bezier(0.4, 0.4, 0.25, 1.35);
      }
    }
    .auth-form {
      display: flex;
      width: 200%;
      height: 250px;
      transition: all 300ms cubic-bezier(0.4, 0.4, 0.25, 1.35);
      form {
        flex: 1;
        padding: 20px;
      }
      div {
        display: flex;
        flex-direction: column-reverse;
        & + div {
          margin-top: 10px;
        }
      }
      input {
        padding: 10px;
        border: 1px solid #e9e9e9;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        outline: none;
        transition: all 300ms;
        &:focus:valid {
          border-color: #09f;
        }
        &:focus:invalid {
          border-color: #f66;
        }
        &:not(:placeholder-shown) + label {
          height: 30px;
          opacity: 1;
          font-size: 14px;
        }
      }
      label {
        overflow: hidden;
        padding: 0 10px;
        height: 0;
        opacity: 0;
        line-height: 30px;
        font-weight: bold;
        font-size: 0;
        transition: all 300ms;
      }
      button {
        margin-top: 10px;
        border: none;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        outline: none;
        background-color: #09f;
        cursor: pointer;
        color: #fff;
        transition: all 300ms;
      }
    }
  }
  #login-btn:checked {
    & ~ .auth-title {
      label:nth-child(1) {
        font-weight: bold;
        color: #f66;
      }
      em {
        transform: translate(0, 0);
      }
    }
    & ~ .auth-form {
      transform: translate(0, 0);
    }
  }
  #logon-btn:checked {
    & ~ .auth-title {
      label:nth-child(2) {
        font-weight: bold;
        color: #f66;
      }
      em {
        transform: translate(160px, 0);
      }
    }
    & ~ .auth-form {
      transform: translate(-50%, 0);
    }
  }
  $ratio: 2;
  $box-w: 600px;
  $box-h: 400px;
  $box-bg: '../../assets/下载.jpg';
  $outbox-w: $box-w * $ratio;
  $outbox-h: $box-h * $ratio;
  .magnifier {
    --x: 0;
    --y: 0;
    --size: 0;
    overflow: hidden;
    position: relative;
    width: $box-w;
    height: $box-h;
    background: url($box-bg) no-repeat center/100% 100%;
    cursor: pointer;
    &::before {
      $scale-x: calc(var(--size) / #{$ratio} - #{$ratio} * var(--x));
      $scale-y: calc(var(--size) / #{$ratio} - #{$ratio} * var(--y));
      position: absolute;
      left: var(--x);
      top: var(--y);
      border-radius: 100%;
      width: var(--size);
      height: var(--size);
      background: #333 url($box-bg) no-repeat $scale-x $scale-y/$outbox-w $outbox-h;
      box-shadow: 1px 1px 3px rgba(#000, 0.5);
      content: '';
      will-change: left, top;
      transform: translate(-50%, -50%);
    }
    // &:hover::before {
    //   --size: 100px;
    // }
  }
  .dynamic-bg {
    --scrolly: 250;
    overflow: hidden;
    position: relative;
    border: 1px solid #66f;
    width: 400px;
    height: 400px;
    header {
      --Θ: calc(var(--scrolly) * 2deg);
      --size: calc(1500px - var(--scrolly) * 2px);
      --x: calc(var(--size) / 2 * -1);
      --y: calc(var(--scrolly) * -1px);
      --ratio: calc(50% - var(--scrolly) / 20 * 1%);
      position: absolute;
      left: 50%;
      bottom: 100%;
      margin: 0 0 var(--y) var(--x);
      border-radius: var(--ratio);
      width: var(--size);
      height: var(--size);
      background-color: #3c9;
      filter: hue-rotate(var(--Θ));
      animation: rotate 5s linear infinite;
    }
    main {
      overflow: auto;
      position: relative;
      width: 100%;
      height: 100%;
      div {
        padding: 300px 20px 50px;
      }
      p {
        line-height: 1.2;
        text-align: justify;
        text-indent: 2em;
      }
    }
  }
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
  .bounding-client-rect {
    width: 400px;
    height: 400px;
    border: 1px solid green;
  }
}
</style>
