<template>
  <div class="canvas">
    <h1>{{ title }}</h1>
    <svg
      ref="svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="800"
      height="800"
      viewBox="0 0 1600 1600"
      @mousemove="mousemove"
    ></svg>
    <br />
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="50" viewBox="0 0 50 50">
      <path d="M 10 25 L 40 10 40 40 10 25" fill="#ffffff"></path>
    </svg>
    <br />
    <canvas ref="canvasOne"></canvas>
    <canvas ref="webgl"></canvas>
    <canvas ref="canvasTwo"></canvas>
    <canvas ref="canvasThree" @mousedown="ctxThreeDown" @mousemove="ctxThreeMove" @mouseup="ctxThreeUp"></canvas>
    <canvas ref="canvasFour" @mousedown="ctxFourDown" @mousemove="ctxFourMove" @mouseup="ctxFourUp"></canvas>
    <canvas ref="canvasFive"></canvas>
    <canvas ref="canvasSix"></canvas>
    <canvas ref="canvasServe"></canvas>
    <canvas ref="canvasEight"></canvas>
    <canvas ref="canvasNine"></canvas>
    <canvas ref="canvasTen"></canvas>
    <canvas ref="canvasElevent"></canvas>
  </div>
</template>

<script>
/**
 *  Canvas 更偏向于渲染层，能提供底层图形渲染的API 出色的喧渲染能力  但是很难直接抽取其中的图形对象进行操作
 */
import * as d3 from 'd3'
import hierarchy from '@/assets/hierarchy.js'

// 小球
class Ball {
  constructor() {
    this.x = 0
    this.y = 0
    this.radius = 15
  }
  draw(cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.fillStyle = 'red'
    cxt.beginPath()
    cxt.arc(0, 0, this.radius, 0, Math.PI * 2)
    cxt.fill()
    cxt.restore()
  }
}
// 小球
class BallTen {
  constructor() {
    this.x = 0
    this.y = 0
    this.radius = 15
  }
  draw(cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.fillStyle = 'red'
    cxt.beginPath()
    cxt.arc(0, 0, this.radius, 0, Math.PI * 2)
    cxt.fill()
    cxt.restore()
  }
}
// 弹簧
class Spring {
  constructor(length) {
    // 弹簧底座位置坐标
    this.x = 0
    this.y = 0
    this.angle = 0
    // 弹簧长度
    this.length = length
  }
  draw(cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.rotate(this.angle)
    cxt.strokeStyle = 'green'
    cxt.beginPath()
    cxt.moveTo(0, 0)
    let n = 20 // 上下峰值总个数
    let h = 20 // 底部直线长度
    let d = (this.length - 2 * h) / n
    cxt.lineTo(h, 0)
    for (let i = 0; i < n; i++) {
      let dir = i % 2 == 0 ? 1 : -1
      cxt.quadraticCurveTo(h + d * (i + 0.5), 20 * dir, h + d * (i + 1), 0)
    }
    cxt.lineTo(this.length, 0)
    cxt.stroke()
    cxt.restore()
  }
}
class Arrow {
  constructor(x, y, color, angle) {
    //箭头中心x坐标，默认值为0
    this.x = x || 0
    //箭头中心y坐标，默认值为0
    this.y = y || 0
    //颜色，默认值为“#FF0099”
    this.color = color || 'blue'
    //旋转角度，默认值为0
    this.angle = angle || 0
  }
  stroke(cxt) {
    cxt.save()
    // 将画布的左上角移至箭头的中心点 从而可旋转使自己不会偏移位置
    cxt.translate(this.x, this.y)
    cxt.rotate(this.angle)
    cxt.strokeStyle = this.color
    cxt.beginPath()
    cxt.moveTo(-20, -10)
    cxt.lineTo(0, -10)
    cxt.lineTo(0, -20)
    cxt.lineTo(20, 0)
    cxt.lineTo(0, 20)
    cxt.lineTo(0, 10)
    cxt.lineTo(-20, 10)
    cxt.closePath()
    cxt.stroke()
    cxt.restore()
  }
}
export default {
  name: 'myCanvas',
  data() {
    return {
      img: require('@/assets/下载.jpg'),
      title: 'SVG',
      activeTarget: null,
      ctxThree: null,
      isMoveThree: false,
      canvasFour: null,
      ctxFour: null,
      isMoveFour: false,
      distance: 100, // 起始距离
      ctxFourX: 0, // 点击偏移量
      ctxFourY: 0,
      ctxFourLastX: 0, // 最后停留位置
      ctxFourLastY: 0,
    }
  },
  mounted() {
    this.drawImage()
    this.init()
    this.drawWebGL()
    this.drawCanvas()
    this.drawCanvasThree()
    this.drawCanvasFour()
    this.drawCanvasFive()
    this.drawCanvasServe()
    this.drawCanvasSix()
    this.drawCanvasEight()
    this.drawCanvasNine()
    this.drawCanvasTen()
    this.drawCanvasElevent()
  },
  methods: {
    /**
     * 矢量： 有方向有大小
     * 标量： 无方向有大小
     * v: 速度; v0: 初速度;v1: 末速度; a: 加速度; t：时间; s: 距离
     */
    init() {
      // 使用d3处理数据
      const data = hierarchy
      const regions = d3
        .hierarchy(data)
        .sum(() => 1)
        .sort((a, b) => b.value - a.value)
      const pack = d3
        .pack()
        .size([1600, 1600])
        .padding(3)

      const root = pack(regions)

      const svgroot = this.$refs.svg
      if (svgroot) {
        this.draw(svgroot, root)
      }
    },
    // 绘制svg
    draw(parent, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) {
      const children = node.children
      const { x, y, r } = node
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x)
      circle.setAttribute('cy', y)
      circle.setAttribute('r', r)
      circle.setAttribute('fill', fillStyle)
      circle.setAttribute('data-name', node.data.name)
      parent.appendChild(circle)
      if (children) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        for (let i = 0; i < children.length; i++) {
          this.draw(group, children[i], { fillStyle, textColor })
        }
        group.setAttribute('data-name', node.data.name)
        parent.appendChild(group)
      } else {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttribute('fill', textColor)
        text.setAttribute('font-family', 'Arial')
        text.setAttribute('font-size', '1.5rem')
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('x', x)
        text.setAttribute('y', y)
        const name = node.data.name
        text.textContent = name
        parent.appendChild(text)
      }
    },
    // 获取鼠标移入的文字
    getTitle(target) {
      const name = target.getAttribute('data-name') || 'SVG'
      if (target.parentNode && target.parentNode.nodeName === 'g') {
        const parentName = target.parentNode.getAttribute('data-name')
        return `${parentName}-${name}`
      }
      return name
    },
    // 移动事件
    mousemove(evt) {
      let target = evt.target
      if (target.nodeName === 'text') target = target.previousSibling // 获取上一个同胞节点
      if (this.activeTarget !== target) {
        if (this.activeTarget) this.activeTarget.setAttribute('fill', 'rgba(0, 0, 0, 0.2)')
      }
      target.setAttribute('fill', 'rgba(0, 128, 0, 0.1)')
      this.title = this.getTitle(target)
      this.activeTarget = target
    },
    // canvas绘制
    drawImage() {
      let canvas = this.$refs.canvasOne
      if (canvas) {
        const img = new Image()
        img.src = this.img
        img.onload = () => {
          // 设置画布宽高 默认为300*150
          canvas.setAttribute('width', img.width)
          canvas.setAttribute('height', img.height)
          let ct = canvas.getContext('2d')
          // 图片
          ct.drawImage(img, 0, 0)
          // 绘制已填色的矩形
          ct.fillStyle = 'rgba(255, 255, 255, 0.5)'
          ct.save() // 暂存状态
          ct.translate(100, 100) // 平移
          // ct.rect(0, 0, 200, 100)
          // ct.fill()
          ct.fillRect(0, 0, 200, 100) // 此行相当于上面两行 绘制一个填充的矩形（有背景颜色，默认为黑色）
          ct.clearRect(50, 25, 100, 50) // 清除指定矩形区域，让清除部分完全透明。
          ct.strokeRect(60, 35, 80, 30) // 绘制一个矩形的边框
          ct.restore() // 恢复状态
          // 三角形
          ct.beginPath()
          ct.fillStyle = 'green'
          ct.moveTo(125, 50)
          ct.lineTo(150, 75)
          ct.lineTo(150, 25)
          ct.fill()
          // 笑脸
          ct.beginPath()
          ct.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制
          ct.moveTo(110, 75) // 一定要 要不然会连接起来
          ct.arc(75, 75, 35, 0, Math.PI, false) // 口(顺时针)
          ct.moveTo(65, 65)
          ct.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼
          ct.moveTo(95, 65)
          ct.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
          ct.stroke()
          // 绘制文字
          ct.font = `20px normal`
          ct.fillStyle = 'rgba(0,0,0,1)'
          ct.fillText('测试canvas', 10, 20)
        }
      }
    },
    // webGL绘制
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
      // 进行绘制
      // gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)
      gl.drawArrays(gl.LINE_LOOP, 0, points.length / 2)
    },
    // 获取正多变形
    getPolygonPoints(n, r) {
      const stepAngle = (2 * Math.PI) / n
      let initAngle = 0
      const pointArray = []
      for (let i = 0; i < n; i++) {
        // 存储x坐标
        pointArray.push(r * Math.cos(initAngle))
        // 存储y坐标
        pointArray.push(r * Math.sin(initAngle))

        initAngle += stepAngle
      }

      return pointArray
    },
    // canvasTwo 的绘制
    drawCanvas() {
      const canvas = this.$refs.canvasTwo
      canvas.width = 512
      canvas.height = 256
      const ct = canvas.getContext('2d')
      const img = new Image()
      img.src = this.img
      img.onload = () => {
        ct.drawImage(img, 0, 0, 200, 200)
        const imageData = ct.getImageData(0, 0, 100, 100)
        let length = imageData.data.length
        for (let index = 0; index < length; index += 4) {
          let r = imageData.data[index]
          let g = imageData.data[index + 1]
          let b = imageData.data[index + 2]
          // 计算灰度
          let gray = r * 0.299 + g * 0.587 + b * 0.114
          imageData.data[index] = gray
          imageData.data[index + 1] = gray
          imageData.data[index + 2] = gray
        }
        // 更新新数据
        ct.putImageData(imageData, 0, 0)

        // 背景设置
        const pattern = ct.createPattern(img, null)
        ct.fillStyle = pattern
        ct.fillRect(450, 0, 50, 50)

        ct.lineWidth = 2
        ct.beginPath()
        ct.strokeStyle = 'rgb(0,0,0,1)'
        ct.lineJoin = 'bevel'
        ct.moveTo(76, 255)
        ct.lineTo(276, 255)
        ct.lineTo(176, 156)
        ct.lineTo(76, 255)
        ct.stroke()
        ct.moveTo(236, 255)
        ct.lineTo(436, 255)
        ct.lineTo(336, 156)
        ct.lineTo(236, 255)
        ct.stroke()
        ct.closePath()
        ct.beginPath()
        ct.strokeStyle = 'blue'
        ct.fillStyle = 'rgba(255, 255, 0, 0.4)'
        ct.arc(256, 106, 90, 0, Math.PI * 2, true)
        ct.stroke()
        ct.fill()
        ct.closePath()

        // // 让整个画布呈现绿色。
        // ct.beginPath()
        // ct.fillStyle = 'green';
        // ct.fillRect(0, 0, canvas.width, canvas.height); // 宽高为画布的宽和高

        // 只保留镜头这个圆下的内容
        ct.beginPath()
        ct.arc(256, 106, 50, 0, Math.PI * 2)
        ct.save()
        // 添加阴影
        ct.shadowOffsetX = 2
        ct.shadowOffsetY = 2
        ct.shadowColor = 'green'
        ct.shadowBlur = 5
        ct.stroke()
        // 截切
        // ct.clip()
        ct.closePath()
        ct.restore()
        // ct.drawImage(img, 0, 0)
        ct.strokeStyle = 'black'
        ct.fillStyle = 'rgba(0, 0, 0, 1)'
        // 绘制实心文本
        ct.fillText('hello world', 0, 20) // 将 hello world 这个内容从 100 100 这个点开始渲染。
        // 绘制空心文本
        ct.strokeText('hello world', 0, 40)
        // 首先我们画一条基准线，让文字按照这条线对齐
        ct.strokeStyle = 'blue'
        ct.moveTo(5, 100)
        ct.lineTo(508, 100)
        ct.stroke()
        ct.font = '20px 宋体'
        // 枚举可用的对齐方式。
        ct.textBaseline = 'top'
        ct.fillText('Top', 5, 100)
        ct.textBaseline = 'bottom'
        ct.fillText('Bottom', 50, 100)
        ct.textBaseline = 'middle'
        ct.fillText('Middle', 120, 100)
        ct.textBaseline = 'alphabetic'
        ct.fillText('Alphabetic', 200, 100)
        ct.textBaseline = 'hanging'
        ct.fillText('Hanging', 300, 100)
        ct.textBaseline = 'ideographic'
        ct.fillText('ideographic', 400, 100)

        // 将画布中心移入到这个点
        // ct.translate(462, 50)
        // setInterval(() => {
        //   // 每次绘制之前先清空画布
        //   ct.clearRect(-30,  -30, 60, 60)
        //   // 每次旋转 1 度
        //   ct.rotate(Math.PI / 180)
        //   // 绘制实心矩形。
        //   ct.fillRect(-25, -25, 50, 50)
        // }, 16)

        // 创建径向渐变，得到渐变对象。
        const clg = ct.createLinearGradient(0, 200, 100, 200)
        // 通过渐变对象来添加颜色
        clg.addColorStop(0, 'red')
        clg.addColorStop(1, 'orange')

        // 将得到的渐变色添加到填充样式中。
        ct.fillStyle = clg
        ct.fillRect(0, 200, 100, 50)

        ct.beginPath()
        const crg = ct.createRadialGradient(100, 200, 0, 100, 200, 40)
        crg.addColorStop(0, 'green')
        crg.addColorStop(1, 'black')
        ct.fillStyle = crg
        // ct.globalAlpha  = 0.8
        ct.globalCompositeOperation = 'xor'
        ct.arc(100, 200, 40, 0, Math.PI * 2)
        ct.fill()
        ct.closePath()

        ct.beginPath()
        ct.moveTo(20, 20)
        ct.lineTo(100, 20)
        ct.arcTo(150, 20, 150, 70, 20) // 创建弧 startx, starty 表示弧的起始点。endx, endy表示弧的终点。r 表示你弧的半径。
        ct.lineTo(150, 120)
        ct.stroke()
        ct.closePath()

        ct.beginPath()
        ct.moveTo(20, 20)
        // 将控制点设置在线段中间
        ct.quadraticCurveTo(60, 80, 100, 20) // cox, coy 表示控制点坐标。endx, endy 表示结束点坐标。
        ct.stroke()
      }
    },
    // canvasThree 绘制
    drawCanvasThree() {
      const canvasThree = this.$refs.canvasThree
      canvasThree.width = 500
      canvasThree.height = 300
      this.ctxThree = canvasThree.getContext('2d')
    },
    // 点击
    ctxThreeDown(e) {
      // 记录位置
      this.ctxThree.moveTo(e.offsetX, e.offsetY)
      this.isMoveThree = true
    },
    // 移动
    ctxThreeMove(e) {
      if (this.isMoveThree) {
        // 移动
        this.ctxThree.lineTo(e.offsetX, e.offsetY)
        this.ctxThree.stroke()
      }
    },
    // 松开
    ctxThreeUp() {
      this.isMoveThree = false
    },
    // canvasFour 绘制
    drawCanvasFour() {
      this.canvasFour = this.$refs.canvasFour
      this.canvasFour.width = 500
      this.canvasFour.height = 300
      this.ctxFour = this.canvasFour.getContext('2d')
      this.ctxFour.rect(this.distance, this.distance, this.distance, this.distance)
      this.ctxFour.fill()
      this.ctxFourLastX = this.distance
      this.ctxFourLastY = this.distance
    },
    // 点击
    ctxFourDown(e) {
      this.isMoveFour = true
      // 计算点击的偏移量
      this.ctxFourX = e.offsetX - this.ctxFourLastX
      this.ctxFourY = e.offsetY - this.ctxFourLastY
      this.ctxFour.moveTo(e.offsetX, e.offsetY)
    },
    // 移动
    ctxFourMove(e) {
      if (this.isMoveFour && this.ctxFour.isPointInPath(e.offsetX, e.offsetY)) {
        this.ctxFour.clearRect(0, 0, this.canvasFour.width, this.canvasFour.height)
        this.ctxFour.beginPath()
        this.ctxFourLastX = e.offsetX - this.ctxFourX
        this.ctxFourLastY = e.offsetY - this.ctxFourY
        this.ctxFour.rect(this.ctxFourLastX, this.ctxFourLastY, this.distance, this.distance)
        this.ctxFour.fill()
        this.ctxFour.closePath()
      }
    },
    // 松开
    ctxFourUp() {
      this.isMoveFour = false
    },
    // canvasFive 的绘制
    drawCanvasFive() {
      const eleCvas = this.$refs.canvasFive
      const cxt = eleCvas.getContext('2d')
      //初始化变量，也就是初始化圆的X轴坐标为0
      let x = 0
      let v = 0
      let v1 = 0
      const a = 200
      const t = 1 / 60
      //动画循环
      ;(function frame() {
        window.requestAnimationFrame(frame)
        //每次动画循环都先清空画布，再重绘新的图形
        cxt.clearRect(0, 0, eleCvas.width, eleCvas.height)
        //绘制圆
        cxt.beginPath()
        cxt.arc(x, 70, 20, 0, (360 * Math.PI) / 180, true)
        cxt.closePath()
        cxt.fillStyle = 'red'
        cxt.fill()
        //变量递增 假设60fps 一次1/60
        // v＝v0＋at 当前速度公式
        // s＝v0t＋at＾2/2 运行距离
        v1 = v + a * t
        // x =  x + (v +  v1) / 2 * t
        x = x + v * t + (a * t * t) / 2
        v = v1
      })()
    },
    /**
     * setTimeOut(fn,time) 和setInterval(fn,time)
     * 优点：动画的时间间隔可以自定义。
     * 缺点：隐藏浏览器标签后，会依旧运行，造成资源浪费。不能按时执行，与浏览器刷新频率不同步。
     * requestAnimationFrame(fn)
     * 优点：性能更优良。隐藏浏览器标签后，便不会运行。与浏览器刷新频率同步。
     * 缺点：动画的时间间隔无法自定义
     */
    // canvasSix 的绘制  定时器
    drawCanvasSix() {
      const eleCvas = this.$refs.canvasSix
      const cxt = eleCvas.getContext('2d')
      // 红球半径
      const r1 = 10
      let x1
      let y1
      // 红球轨迹圆心和半径
      const x = 150
      const y = 75
      const r = 60
      // 每帧运行弧度
      const interval = 0.02
      // 初始弧度
      let currentAngle = 0
      //动画循环
      cxt.fillStyle = 'red'
      setInterval(() => {
        //每次动画循环都先清空画布，再重绘新的图形
        cxt.clearRect(0, 0, eleCvas.width, eleCvas.height)
        //绘制圆
        cxt.beginPath()
        cxt.arc(x, y, r, 0, Math.PI * 2)
        cxt.closePath()
        cxt.stroke()
        cxt.beginPath()
        currentAngle += interval
        x1 = x + Math.cos(currentAngle) * r
        // y1 = y + Math.sin(currentAngle) * r
        y1 = y
        cxt.arc(x1, y1, r1, 0, Math.PI * 2)
        cxt.closePath()
        cxt.fill()
      }, 16) // 1000 / 60
    },
    drawCanvasServe() {
      const eleCvas = this.$refs.canvasServe
      const cxt = eleCvas.getContext('2d')
      // 红球半径
      const r1 = 10
      let x1
      let y1
      // 红球轨迹圆心和半径
      const x = 150
      const y = 75
      const r = 60
      // 每帧运行弧度
      const interval = 0.02
      // 初始弧度
      let currentAngle = 0
      //动画循环
      cxt.fillStyle = 'red'
      ;(function frame() {
        window.requestAnimationFrame(frame)
        //每次动画循环都先清空画布，再重绘新的图形
        cxt.clearRect(0, 0, eleCvas.width, eleCvas.height)
        //绘制圆
        cxt.beginPath()
        cxt.arc(x, y, r, 0, Math.PI * 2)
        cxt.closePath()
        cxt.stroke()
        cxt.beginPath()
        currentAngle += interval
        x1 = x + Math.cos(currentAngle) * r
        y1 = y + Math.sin(currentAngle) * r
        cxt.arc(x1, y1, r1, 0, Math.PI * 2)
        cxt.closePath()
        cxt.fill()
      })()
    },
    // canvasServe 的绘制
    drawCanvasEight() {
      const eleCvas = this.$refs.canvasEight
      const cxt = eleCvas.getContext('2d')
      // 初始化数据
      // Y轴初始速度为0，重力加速度为0.2，反弹系数为-0.8
      let vy = 0
      const gravity = 0.2
      const bounce = -0.8
      // const bounce = -1
      const r = 10
      let x = eleCvas.width / 2,
        y = 0
      cxt.fillStyle = 'red'
      ;(function drawFrame() {
        y += vy
        // 边界检测
        if (y > eleCvas.height - r) {
          y = eleCvas.height - r
          // 速度反向并且减小
          vy = vy * bounce
          // 处理无限循环
          if (vy > -0.2) {
            return
          }
        }
        cxt.clearRect(0, 0, eleCvas.width, eleCvas.height)
        window.requestAnimationFrame(drawFrame)
        cxt.beginPath()
        cxt.arc(x, y, r, 0, Math.PI * 2)
        cxt.closePath()
        cxt.fill()
        vy += gravity
      })()
    },
    // canvasNine 的绘制
    drawCanvasNine() {
      const eleCvas = this.$refs.canvasNine
      const cxt = eleCvas.getContext('2d')
      const ball = new Ball()
      let vx = 3
      let vy = 2
      ball.x = eleCvas.width / 2
      ball.y = eleCvas.height / 2
      const { width, height } = eleCvas
      ;(function drawFrame() {
        window.requestAnimationFrame(drawFrame)
        cxt.clearRect(0, 0, width, height)
        ball.x += vx
        ball.y += vy
        // 边界处理
        if (ball.x > width - ball.radius) {
          ball.x = width - ball.radius
          vx = -vx
        }
        if (ball.x < ball.radius) {
          ball.x = ball.radius
          vx = -vx
        }
        if (ball.y > height - ball.radius) {
          ball.y = height - ball.radius
          vy = -vy
        }
        if (ball.y < ball.radius) {
          ball.y = ball.radius
          vy = -vy
        }
        ball.draw(cxt)
      })()
    },
    // canvasTen 的绘制
    drawCanvasTen() {
      const eleCvas = this.$refs.canvasTen
      const cxt = eleCvas.getContext('2d')
      // 初始弹簧长度
      const initLength = 200
      // 振幅
      const amplitude = 120
      const k = 0.01
      const spring = new Spring(initLength)
      const ball = new BallTen()
      spring.x = 0
      spring.y = eleCvas.height / 2
      ball.x = eleCvas.width / 2
      ball.y = eleCvas.height / 2

      ball.x += amplitude
      let vx = 0
      ;(function drawFrame() {
        window.requestAnimationFrame(drawFrame)
        cxt.clearRect(0, 0, eleCvas.width, eleCvas.height)
        let x = ball.x - spring.x - initLength
        // k 劲度系数 x 形变量(m) 又力为 f = ma 当m为1时 f = a; 这样力可以做为加速度使用
        let f = -k * x
        vx += f
        // 定义时间为1 则得到下面球的位置
        ball.x += vx
        spring.length = ball.x - spring.x
        spring.draw(cxt)
        ball.draw(cxt)
      })()
    },
    // canvasElevent 的绘制
    // todo: 有问题 待修改
    drawCanvasElevent() {
      const eleCvas = this.$refs.canvasElevent
      const mouse = { x: 0, y: 0 }
      const arrow = new Arrow(150, 75)
      eleCvas.addEventListener('mousemove', event => {
        mouse.x = event.pageX - eleCvas.offsetLeft
        mouse.y = event.pageY - eleCvas.offsetTop
      })
      const cxt = eleCvas.getContext('2d')
      cxt.fillStyle = 'red'
      let v = 2
      let mousex = 0
      let mousey = 0
      ;(function drawFrame() {
        cxt.clearRect(0, 0, eleCvas.width, eleCvas.height)
        window.requestAnimationFrame(drawFrame)
        if (mouse.x !== mousex || mouse.y !== mousey) {
          mousex = mouse.x
          mousey = mouse.y
          arrow.angle = Math.atan2(mouse.y - arrow.y, mouse.x - arrow.x)
        }
        const vx = Math.cos(arrow.angle) * v
        const vy = Math.sin(arrow.angle) * v
        arrow.x += vx
        arrow.y += vy
        arrow.stroke(cxt)
      })()
    },
  },
}
</script>
<style lang="scss" scoped>
canvas {
  border: 1px solid black;
  margin: 24px;
}
</style>
