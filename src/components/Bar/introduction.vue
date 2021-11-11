<template>
  <div class="introduction">
    <h2>什么是数据可视化？</h2>
    <div :class="[{ 'v-h': visibeNum === 0 }]">
      <h3>可视化是将数据组织成易于为人所理解和认知的结构，然后用图形的方式形象地呈现出来的理论、方法和技术</h3>
      <h4>关键要素： 数据， 图形， ( 交互 )</h4>
    </div>
    <br />
    <h2 :class="[{ 'v-h': visibeNum <= 1 }]">Web 前端与可视化有什么区别？</h2>
    <div :class="[{ 'v-h': visibeNum <= 2 }]">
      <h4>
        1:技术栈的不同。Web 开发主要以 HTML 来描述结构，以 CSS 来描述表现，以 JavaScript 来描述行为。而可视化更多地要同浏览器的 Canvas、SVG、WebGL 等其他图形 API 打交道
      </h4>
      <h4>
        2:Web开发着重于处理普通的文本和多媒体信息，渲染普通的、易于阅读的文本和多媒体内容，而可视化开发则着重于处理结构化数据，渲染各种相对复杂的图表和图形元素
      </h4>
    </div>
    <br />
    <h2 :class="[{ 'v-h': visibeNum <= 3 }]">浏览器中实现可视化的四种方式:</h2>
    <div :class="[{ 'v-h': visibeNum <= 4 }]">
      <h4>1:传统的 HTML+CSS</h4>
      <h4>2:SVG</h4>
      <h4>3:Canvas2D</h4>
      <h4>4:WebGL</h4>
    </div>
    <br />
    <div :class="['piegraph', { 'v-h': visibeNum <= 5 }]">
      <div class="piegraph-list">
        <h4>HTML+CSS</h4>
        <div class="piegraph-list-item" @click="viewFullScreen(imgUrlList[1])"></div>
      </div>
      <div class="piegraph-list">
        <h4>SVG</h4>
        <div ref="svg" @click="viewFullScreen(imgUrlList[2])"></div>
      </div>
      <div class="piegraph-list">
        <h4>Canvas</h4>
        <canvas ref="canvas" @click="viewFullScreen(imgUrlList[3])"></canvas>
      </div>
      <div class="piegraph-list">
        <h4>WebGL</h4>
        <canvas ref="webgl" @click="viewFullScreen(imgUrlList[4])"></canvas>
      </div>
    </div>
    <br />
    <h2 :class="[{ 'v-h': visibeNum <= 6 }]">各优缺点：</h2>
    <table :class="[{ 'v-h': visibeNum <= 7 }]">
      <tr>
        <th></th>
        <th>优点</th>
        <th>缺点</th>
      </tr>
      <tr>
        <td>HTML+CSS</td>
        <td>简化开发，不需要引入额外的库，可以节省资源，提高网页打开的速度</td>
        <td>绘制的方式并不简洁，手动换算，性能低，不规则图形能力弱</td>
      </tr>
      <tr>
        <td>SVG</td>
        <td>不规则图形的绘制变得更简单，便利</td>
        <td>不适合数据复杂情况，增加引擎、布局计算和渲染树生成的开销，降低性能，减慢渲染速度</td>
      </tr>
      <tr>
        <td>Canvas2D</td>
        <td>指令式图形系统，直接操作绘图上下文，简单易操作和高效的渲染能力</td>
        <td>不能方便地控制它内部的图形元素，绘制的图形太多，处理大量的像素计算，遇到性能瓶颈</td>
      </tr>
      <tr>
        <td>WebGL</td>
        <td>快速、精准地操作像素，完成数数百万次计算。适合绘制 3D 场景（投影、深度检测等特性）</td>
        <td @click="viewFullScreen(imgUrlList[5])" style="cursor: pointer">更复杂</td>
      </tr>
    </table>

    <br />
    <img :src="imgUrlList[0]" :class="['xuanran', { 'v-h': visibeNum <= 8 }]" @click="viewFullScreen(imgUrlList[0])" alt=""/>
    <img :src="imgUrlList[6]" :class="['xuanran', { 'v-h': visibeNum <= 8 }]" @click="viewFullScreen(imgUrlList[6])" alt=""/>
    <br />
    <div class="handle">
      <div class="handle-btn" @click="visibeNum >= 9 ? visibeNum : visibeNum++">下一步</div>
      <div class="handle-btn" @click="visibeNum > 0 ? visibeNum-- : 0">上一步</div>
    </div>
    <div class="fullScreen" v-if="isShowFull">
      <img :src="fullImgUrl" @click="isShowFull = !isShowFull" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'introduction',
  data() {
    return {
      imgUrlList: [
        require('@/assets/xuanrangduibi.jpg'),
        require('@/assets/piegraph.jpg'),
        require('@/assets/svg.jpg'),
        require('@/assets/canvas.jpg'),
        require('@/assets/webgl.jpg'),
        require('@/assets/webgl2.jpg'),
        require('@/assets/xuanxing.png'),
      ],
      isShowFull: false, // 是否展示全图查看
      fullImgUrl: '', // 全图查看的img
      commonData: {}, // svg和canvas的数据
      visibeNum: 0,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initData()
      if (this.$refs.svg) {
        this.drawSvgPie(this.$refs.svg, this.commonData)
      }
      if (this.$refs.canvas) {
        this.drawCanvasPie(this.$refs.canvas, this.commonData)
      }
      if (this.$refs.webgl) {
        this.drawWebGL()
      }
    },
    /**
     * 初始化数据
     */
    initData() {
      const values = [30, 35, 45, 90, 160]
      const colors = ['#37c', '#3c7', 'orange', '#f73', '#ccc']
      this.commonData = {
        data: this.prepare({ values, colors }),
        center: { x: 125, y: 125 },
        radius: 125,
      }
    },
    /**
     * 组装饼图需要的格式
     */
    prepare({ values, colors }) {
      const sum = values.reduce((x, y) => x + y)
      return values.map((x, i) => [(x / sum) * 2 * Math.PI, colors[i]])
    },
    /**
     * 绘制SVG饼图
     */
    drawSvgPie(el, { data, center, radius }) {
      const paths = []
      let start = { x: center.x, y: center.y - radius }
      let deg = 0
      for (const [value, color] of data) {
        deg += value
        const end = {
          x: center.x + radius * Math.sin(deg),
          y: center.y - radius * Math.cos(deg),
        }
        const largeArc = value >= Math.PI ? 1 : 0
        /**
         * SVG指令
         * M = moveto(M X,Y)  L = lineto(L X,Y)   H = horizontal lineto(H X)  V = vertical lineto(V Y)
         * C = curveto(C X1,Y1,X2,Y2,ENDX,ENDY)   S = smooth curveto(S X2,Y2,ENDX,ENDY)
         * Q = quadratic Belzier curve(Q X,Y,ENDX,ENDY)  T = smooth quadratic Belzier curveto(T ENDX,ENDY)
         * A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)
         * Z = closepath()
         * 
         * 简单的三角形
         * <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
          <path d="M 10 25 L 40 10 40 40 10 25" fill='#000000'></path>
          </svg>
         */
        const pathD =
          `M ${center.x} ${center.y}` +
          `L ${start.x} ${start.y}` +
          `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}` +
          'Z'
        paths.push(`<path d="${pathD}" fill="${color}" />`)
        start = end
      }
      const d = radius * 2
      el.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${d}px" height="${d}px" viewBox="0 0 ${d} ${d}">` +
        paths.join('') +
        '</svg>'
    },
    /**
     * 绘制canvas饼图
     */
    drawCanvasPie(el, { data, center, radius }) {
      el.width = radius * 2
      el.height = radius * 2
      const ctx = el.getContext('2d')
      let start = -Math.PI / 2
      for (const [value, color] of data) {
        const end = start + value
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius, start, end, false)
        ctx.lineTo(center.x, center.y)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
        start = end
      }
    },
    /**
     * 绘制webgl三角形
     * 1：创建 WebGL 上下文
     * 2：创建 WebGL 程序（WebGL Program）
     * 3：将数据存入缓冲区将缓冲区
     * 4：数据读取到 GPUGPU 
     * 5：执行 WebGL 程序，输出结果
     */
    drawWebGL() {
      // 获取元素 并准备上下文
      const canvas = this.$refs.webgl
      const gl = canvas.getContext('webgl')

      // 准备着色器 （GLSL编程语言）
      const vertex = `
        attribute vec2 position;
        void main() {
          gl_PointSize = 1.0;
          gl_Position = vec4(position, 1.0, 1.0);
        }
      `
      const fragment = `
        precision mediump float;
        void main()
        {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }    
      `
      // 创建顶点着色器
      const vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, vertex)
      gl.compileShader(vertexShader)
      // 创建片元着色器
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, fragment)
      gl.compileShader(fragmentShader)
      // 创建 WebGLProgram 对象
      const program = gl.createProgram()
      // shader 关联到这个 WebGL 程序
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      // WebGLProgram 对象链接到 WebGL 上下文对象上
      gl.linkProgram(program)
      // 通过 useProgram 选择启用这个 WebGLProgram 对象
      gl.useProgram(program)
      // 准备三个顶点 （WebGL 使用的数据需要用类型数组定义，默认格式是 Float32Array）
      const points = new Float32Array([-1, -1, 0, 1, 1, -1])
      // 创建缓存对象
      const bufferId = gl.createBuffer()
      // 绑定为当前操作对象
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
      // 当前数据写入缓存对象
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
      // 获取顶点着色器中的position变量的地址
      const vPosition = gl.getAttribLocation(program, 'position')
      // 给变量设置长度和类型
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
      // 激活这个变量
      gl.enableVertexAttribArray(vPosition)
      // 当前画布的内容清除
      gl.clear(gl.COLOR_BUFFER_BIT)
      // 进行绘制 (webgl支持的图元类型有七种，分别是 gl.POINTS(点), gl.LINES(线段), gl.LINE_STRIP(线条), gl.LINE_LOOP(回路), gl.TRIANGLES(三角形), gl.TRIANGLE_STRIP(三角带), gl.TRIANGLE_FAN(三角扇))
      gl.drawArrays(gl.TRIANGLES, 0, points.length / 2) // 实心三角形
      // gl.drawArrays(gl.LINE_LOOP, 0, points.length / 2) // 空心三角形
    },
    /**
     * 全屏查看
     */
    viewFullScreen(val) {
      this.isShowFull = true
      this.fullImgUrl = val
    },
  },
}
</script>
<style lang="scss" scoped>
.introduction {
  padding: 0 24px 24px;
  text-align: left;
  position: relative;
  .xuanran {
    width: 500px;
    cursor: pointer;
  }
  .v-h {
    visibility: hidden;
  }
  .piegraph {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-list {
      text-align: center;
    }
    .piegraph-list-item {
      display: inline-block;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background-image: conic-gradient(
        #37c 30deg,
        #3c7 30deg,
        #3c7 65deg,
        orange 65deg,
        orange 110deg,
        #f73 110deg,
        #f73 200deg,
        #ccc 200deg
      );
    }
  }
  table,
  table tr th,
  table tr td {
    width: 100%;
    border: 1px solid #000;
  }

  table tr {
    th,
    td {
      width: calc((100% - 120px) / 2);
      padding: 4px 8px;
    }
    th:first-of-type,
    td:first-of-type {
      width: 120px;
    }
  }
  .handle {
    position: fixed;
    top: 80px;
    right: 45px;
  }
  .handle-btn {
    $color: rgba(64, 158, 255, 0.7);
    display: inline-block;
    position: relative;
    margin: 0 20px;
    width: 60px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border: 2px solid $color;
    border-radius: 10px;
    background: $color;
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
      border: 2px solid $color;
      transition: all 0.5s;
      animation: clippath 3s infinite linear;
      border-radius: 10px;
    }
    &::after {
      animation: clippath 3s infinite -1.5s linear;
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
  .fullScreen {
    position: fixed;
    z-index: 1;
    left: 230px;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      max-width: 80%;
      cursor: pointer;
    }
  }
}
</style>
