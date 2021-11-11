<template>
  <div class="mapbox" id="mapbox" :style="'width:' + width + ';height:' + height">
    <table
      class="imgbox"
      id="imgbox"
      @mousedown="holdDown"
      @mouseup="holdUp"
      :style="'top: ' + imgtop + 'px;left: ' + imgleft + 'px;'"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="margin:0 auto;"
    >
      <tr>
        <td>
         <img
            id="backgroundImg"
            draggable="false"
            :width="imgWidth + '%'"
            src="@/assets/下载.jpg"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    //图片路径
    img: {
      type: String,
      default: '',
    },
    //盒子的宽
    width: {
      type: String,
      default: '100%',
    },
    //盒子的高
    height: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
      imgtop: 0, //图片距离左边的距离
      imgleft: 0, //图片距离上边的距离
      imgWidth: 100, //图片宽度百分比
      DownUp: false, //用来判断鼠标是否长按
    }
  },
  created() {},
  mounted() {
    document.onmousemove = this.mouseMove
    //等待图片加载
    setTimeout(() => {
      this.getbackgroundImgWidth()
    }, 500)
  },
  beforeDestroy() {
    document.onmousemove = null
  },
  methods: {
    //鼠标按下
    holdDown() {
      this.DownUp = true
    },
    //鼠标松开
    holdUp() {
      this.DownUp = false
    },
    //ev：鼠标对象，id：盒子的id 判断鼠标是否在盒子内
    inBoxIsoutbox(id, ev = event || window.event) {
      let map = document.getElementById(id)
      if (
        this.mousePosition(ev).x > map.offsetLeft + map.offsetWidth ||
        this.mousePosition(ev).x < map.offsetLeft ||
        this.mousePosition(ev).y > map.offsetTop + map.offsetHeight ||
        this.mousePosition(ev).y < map.offsetTop
      ) {
        return false
      } else {
        return true
      }
    },
    //兼容后，返回X，Y
    mousePosition(ev) {
      if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY }
      }
      return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop,
      }
    },
    // 鼠标移动触发该方法
    mouseMove(ev) {
      ev = ev || window.event
      if (this.inBoxIsoutbox('mapbox', ev)) {
        // 鼠标在盒子内
        this.runWheel(true)
      } else {
        // 鼠标在盒子外
        this.runWheel(false)
        this.holdUp()
      }
      if (this.DownUp) {
        // 鼠标长按时改变图片位置
        this.imgtop = this.imgtop + ev.movementY
        this.imgleft = this.imgleft + ev.movementX
      }
    },
    // 开启监听鼠标滑轮
    runWheel(isWheel) {
      //判断依据是 是否在盒子内部
      //true 就是开启
      if (isWheel) {
        document.documentElement.style.overflow = 'hidden'
        //兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
        //判断鼠标滚轮滚动方向
        if (window.addEventListener) {
          //FF,火狐浏览器会识别该方法
          window.addEventListener('DOMMouseScroll', this.wheel, false)
        }
        window.onmousewheel = document.onmousewheel = this.wheel //W3C
      } else {
        //false就是关闭
        document.documentElement.style.overflow = ''
        if (window.addEventListener) {
          //FF,火狐浏览器会识别该方法
          window.addEventListener('DOMMouseScroll', null, false)
        }
        window.onmousewheel = document.onmousewheel = null //W3C
      }
    },
    //统一处理滚轮滚动事件，中间件
    wheel(event) {
      let delta = 0
      if (!event) event = window.event
      if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120
        if (window.opera) delta = -delta //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3
      }
      if (delta) this.handle(delta)
    },
    //上下滚动时的具体处理函数
    handle(delta) {
      if (delta < 0) {
        //向下滚动
        if (this.imgWidth > 10) {
          this.imgWidth = this.imgWidth - 1
        }
      } else {
        //向上滚动
        if (this.imgWidth < 500) {
          this.imgWidth = this.imgWidth + 1
        }
      }
    },
    //获取背景图片的宽度或高度，和实际距离相除得到 系数distanceCoefficient
    getbackgroundImgWidth() {
      if (this.actualDistanceWidth !== 0) {
        let backgroundImg = document.getElementById('backgroundImg')
        this.distanceCoefficient = backgroundImg.width / this.actualDistanceWidth
      } else if (this.actualDistanceHeight !== 0) {
        let backgroundImg = document.getElementById('backgroundImg')
        this.distanceCoefficient = backgroundImg.height / this.actualDistanceWidth
      }
    },
  },
}
</script>
<style scoped>
.mapbox {
  overflow: hidden;
  position: relative;
  text-align: center;
}
.imgbox {
  position: absolute;
}
.imgbox img {
  cursor: pointer;
}
</style>
