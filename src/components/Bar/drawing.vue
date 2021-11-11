<template>
  <div class="drawing">
    <div class="left-content">
      <!-- 线条宽细 -->
      <!-- tag： 宽度最好不要为1 太细的话 由于有反锯齿等处理，另外还有光栅化的精度问题 显示不流畅 -->
      <el-slider v-model="lineWidthValue" :min="2" :max="20"></el-slider>
      <el-input-number v-model="lineWidthValue" :min="2" :max="20" :step="1" step-strictly size="mini" ></el-input-number>
      <!-- 线条颜色 -->
      <el-color-picker v-model="lineColor" show-alpha size="small"></el-color-picker>
      <div class="eraser">
        <span class="eraser-title">橡皮擦：</span>
        <div>
          <el-slider v-model="eraserWidthValue" :min="2" :max="20"></el-slider>
          <svg @click="hangleClearSome('circle')" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" :stroke="this.eraserType === 'circle' ? '#409EFF' : '#fff'" stroke-width="2" fill="#434343"/>
          </svg>
          <svg @click="hangleClearSome('square')" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" :stroke="this.eraserType === 'square' ? '#409EFF' : '#fff'" stroke-width="2" fill="#434343"/>
          </svg>
        </div>
      </div>
      <el-button type="primary" @click="handlePre" :disabled="drawList.length <= 1">上一步</el-button>
      <el-button type="primary" @click="handleNext" :disabled="!nextList.length">下一步</el-button>
      <el-button type="primary" @click="handleClear">清 除</el-button>
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
    <div class="right-content">
      <canvas ref="canvas" :width="this.width" :height="this.height" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" :class="{'eraser-cursor' : eraserType}"></canvas>
      <div v-if="canvasToImgUrl">
        <img :src="canvasToImgUrl" class="show-img" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {  // 画板的宽
      type: Number,
      default: 600,
    },
    height: {  // 画板的高
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      eleCvas: null,
      ctx: null,
      lineWidthValue: 3, // 画笔宽细
      eraserWidthValue: 5,  // 橡皮擦大小
      lineColor: 'rgba(0,0,0,1)', // 画笔颜色
      isMove: false, // 判断是否点击进行绘制
      canvasToImgUrl: null, // 存储图片
      nullCanvasUrl: null, // 存储开始时canvas的url 做非空判断
      nullInmageData: null, // 空白页面的像素点 用于对比
      drawList: [], // 存储已经绘制的步骤
      nextList: [], // 存储上一步的内容，作用于下一步
      eraserType: null,  // 画笔类型
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
    * 初始化
    */
    init() {
      this.eleCvas = this.$refs.canvas
      this.ctx = this.eleCvas.getContext('2d')
      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(0, 0, this.width, this.height)

      this.nullCanvasUrl = this.eleCvas.toDataURL()
      this.nullInmageData = this.ctx.getImageData(0, 0, this.width, this.height)
      this.drawList = [this.nullInmageData]
    },
    /**
    * 鼠标点击
    */
    mousedown(e) {
      // note: 一定要加 beginPath 和 closePath 要不然会有覆盖问题
      this.ctx.beginPath()
      const { offsetX, offsetY } = e
      // 移动到点击的点 进行绘制
      this.ctx.moveTo(offsetX, offsetY)
      this.isMove = true
      this.nextList = []
      if (this.eraserType === 'circle' || this.eraserType === 'square') {
        this.drawEraser(offsetX, offsetY)
      }
    },
    /**
    * 鼠标按下移动
    */
    mousemove(e) {
      if (this.isMove) {
        const { offsetX, offsetY } = e
        // 橡皮擦
        if (this.eraserType === 'circle' || this.eraserType === 'square') {
          this.drawEraser(offsetX, offsetY)
          return
        } else {
          // 正常绘制
          this.ctx.lineWidth = this.lineWidthValue
          this.ctx.strokeStyle = this.lineColor
          this.ctx.lineTo(e.offsetX, e.offsetY)
          this.ctx.stroke()
        }
      }
    },
    /**
    * 鼠标松开
    */
    mouseup() {
      this.ctx.closePath()
      this.isMove = false
      // 存储每一笔画动作 用于撤销
      this.drawList.push(this.ctx.getImageData(0, 0, this.width, this.height))
    },
    // 上一步
    handlePre() {
      const len = this.drawList.length
      if (len > 1) {
        const imageData = this.drawList.pop()
        // 添加到下一步数组中 便于下一步的恢复
        this.nextList.unshift(imageData)
        // note: 数组已经减去一位  之前的长度 - 2
        this.ctx.putImageData(this.drawList[len - 2], 0, 0)
      }
    },
    /**
    * 下一步
    */
    handleNext() {
      if (this.nextList.length) {
        const imageData = this.nextList.shift()
        this.ctx.putImageData(imageData, 0, 0)
        this.drawList.push(imageData)
      }
    },
    /**
    * 点击橡皮擦
    */
    hangleClearSome(val) {
      if (this.eraserType && this.eraserType === val) {
        this.eraserType = null
      } else {
        this.eraserType = val
      }
    },
    /**
    * 橡皮擦交互
    */
    drawEraser(x, y) {
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      if (this.eraserType === 'circle') {
        //   绘制圆形
        this.ctx.arc(x, y, this.eraserWidthValue, 0, Math.PI * 2, true)
      } else if (this.eraserType === 'square') {
        //   绘制矩形
        this.ctx.rect(
          x - this.eraserWidthValue,
          y - this.eraserWidthValue,
          this.eraserWidthValue * 2,
          this.eraserWidthValue * 2
        )
      } else {
        return
      }
      this.ctx.fill()
      this.ctx.closePath()
    },
    /**
    * 清除
    */
    handleClear() {
      const url = this.eleCvas.toDataURL()
      if (this.nullCanvasUrl === url) {
        this.$message({
          showClose: true,
          message: '请先进行绘制',
          type: 'warning',
        })
        return
      } else {
        // note: 重新设置宽高，即可清空画布内容
        this.eleCvas.height = this.height
        // 设置为初始样式
        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.canvasToImgUrl = null
        this.drawList = [this.nullInmageData]
        this.nextList = []
        this.$message({
          showClose: true,
          message: '清除成功',
          type: 'success',
        })
      }
    },
    /**
    * 保存
    */
    handleSave() {
      // 保存为图片
      const url = this.eleCvas.toDataURL()
      if (this.nullCanvasUrl === url) {
        this.$message({
          showClose: true,
          message: '请先进行绘制',
          type: 'warning',
        })
        return
      } else {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success',
        })
        this.canvasToImgUrl = url
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.drawing {
  display: flex;
  min-height: calc(100% - 86px);
  padding: 16px 0;
  background-color: #434343;
  .left-content {
    width: 180px;
    border-right: 1px solid black;
    padding: 0 16px;
  }
  .right-content {
    flex: 1;
  }
  canvas {
    border: 1px solid black;
    margin-bottom: 16px;
    cursor: url('../../assets/per.png'), auto;
  }
  canvas.eraser-cursor {
    cursor: pointer;
  }
  .eraser {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    &-title {
      width: 70px;
      color: #fff;
      text-align: left;
    }
    div {
      flex: 1;
      svg {
        margin: 0 8px;
        cursor: pointer;
      }
    }
  }
  .show-img {
    width: 300px;
  }
  /deep/ .el-color-picker {
    display: block;
    margin: 24px auto;
  }
  /deep/ .el-button {
    display: block;
    margin: 0 auto 16px;
    padding: 8px 16px;
    font-size: 18px;
  }
}
</style>
