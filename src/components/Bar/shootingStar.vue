<template>
  <div class="shooting-star" ref="shootingStar">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
export default {
  name: 'shootingStar',
  data() {
    return {
      maxW: 0,
      maxH: 0,
      canvas: null,
      ctx: null,
      skyList: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initCanvas()
      this.drawStarList()
      this.startShootingStar()
    },
    // 初始化canvas 和 绘制夜空背景图
    initCanvas() {
      const shootingStar = this.$refs.shootingStar
      this.maxW = shootingStar.offsetWidth
      this.maxH = shootingStar.offsetHeight
      this.canvas = this.$refs.canvas
      this.canvas.width = this.maxW
      this.canvas.height = this.maxH
      this.ctx = this.canvas.getContext('2d')
      this.ctx.fillRect(0, 0, this.maxW, this.maxH)

      const maxCount = 500
      for (let i = 0; i < maxCount; i++) {
        const r = ~~(Math.random() * 3)
        const x = ~~(Math.random() * this.maxW)
        const y = ~~(Math.random() * this.maxH)

        this.skyList.push({
          x,
          y,
          r,
        })
      }
    },
    // 绘制星星
    drawStarList() {
      for (let i = 0, len = this.skyList.length; i < len; i++) {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#fff'
        this.ctx.arc(this.skyList[i]['x'], this.skyList[i]['y'], this.skyList[i]['r'], 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
      }
    },
    // 绘制流星
    drawStar(x, y) {
      this.drawStarList()
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      this.ctx.arc(x, y, 2, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()
    },
    // 绘制覆盖层
    drawCover() {
      this.ctx.beginPath()
      this.ctx.fillStyle = 'rgba(0,0,0,0.06)'
      this.ctx.rect(0, 0, this.maxW, this.maxH)
      this.ctx.fill()
      this.ctx.closePath()
    },
    // 开启流星模式
    startShootingStar() {
      let x = ~~(Math.random() * this.maxW)
      let y = 4
      const clearY = Math.random() * this.maxH
      const draw = () => {
        x -= 1
        y += 4
        if (y >= clearY) {
          this.startShootingStar()
          return
        }
        this.drawStar(x, y)
        this.drawCover()
        requestAnimationFrame(draw)
      }
      draw()
    },
  },
}
</script>
<style lang="scss" scoped>
.shooting-star {
  width: 100%;
  height: calc(100% - 54px);
}
</style>
