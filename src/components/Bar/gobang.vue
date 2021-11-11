<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null, // canvas的dom
      context: null, // canvas上下文
      isBlackChess: true, // 判断黑白棋
      chessBoardSize: [20, 20], // 横竖的格子
      chessBoardPadding: 40, // padding大小
      chessBoardCellWidth: 40, // 每个格子大小
      cursorShowDistance: 20, // 鼠标距离判断 注：cursorShowDistance <= chessBoardCellWidth / 2
      chessRadius: 20, // 棋子的半径  注：chessRadius <= chessBoardCellWidth / 2  不然会棋子会重叠
      chessCollection: [], // 棋子矩阵 二维数组
      cursorPoint: {}, // 存储当前光标位置
      chessBoardBackgroundColor: 'rgba(207, 188, 137, 1)', // 背景颜色
    }
  },
  mounted() {
    /**
     * 1： 画布，棋盘和矩阵
     * 2： 鼠标移动落点事件
     * 3： 落子事件和切换
     * 4： 判断输赢事件
     */
    this.initCanvas()
    this.initChessBoard()
    this.initCollection()
    this.addChessBoardEvent()
  },
  methods: {
    /**
     * 初始化画布
     */
    initCanvas() {
      // 获取dom
      this.canvas = this.$refs.canvas
      // 设置画布大小
      this.canvas.width = this.chessBoardPadding * 2 + this.chessBoardCellWidth * this.chessBoardSize[1]
      this.canvas.height = this.chessBoardPadding * 2 + this.chessBoardCellWidth * this.chessBoardSize[0]
      // 获取canvas上下文
      this.context = this.canvas.getContext('2d')
    },

    /**
     * 初始化棋盘
     */
    initChessBoard() {
      // 绘制边框
      this.context.fillStyle = this.chessBoardBackgroundColor
      this.context.beginPath()
      this.context.rect(
        this.chessBoardPadding,
        this.chessBoardPadding,
        this.chessBoardCellWidth * this.chessBoardSize[1],
        this.chessBoardCellWidth * this.chessBoardSize[0]
      )
      this.context.fill()
      this.context.stroke()
      this.context.closePath()

      const beginX = this.chessBoardPadding
      const beginY = this.chessBoardPadding
      const endX = beginX + this.chessBoardCellWidth * this.chessBoardSize[1]
      const endY = beginY + this.chessBoardCellWidth * this.chessBoardSize[0]

      // 绘制横线
      for (let i = 1; i < this.chessBoardSize[0]; i++) {
        this.context.beginPath()
        this.context.moveTo(beginX, beginY + this.chessBoardCellWidth * i)
        this.context.lineTo(endX, beginY + this.chessBoardCellWidth * i)
        this.context.stroke()
        this.context.closePath()
      }

      // 绘制竖线
      for (let i = 1; i < this.chessBoardSize[1]; i++) {
        this.context.beginPath()
        this.context.moveTo(beginX + this.chessBoardCellWidth * i, beginY)
        this.context.lineTo(beginX + this.chessBoardCellWidth * i, endY)
        this.context.stroke()
        this.context.closePath()
      }
    },

    /**
     * 初始化棋盘落子矩阵
     */
    initCollection() {
      this.chessCollection = []

      for (let i = 0; i <= this.chessBoardSize[1]; i++) {
        this.chessCollection.push([])
        for (let j = 0; j <= this.chessBoardSize[0]; j++) {
          this.chessCollection[i].push(null)
        }
      }
    },

    /**
     * 监听事件绑定
     */
    addChessBoardEvent() {
      this.canvas.onmousemove = this.mouseMove
      this.canvas.onclick = this.mouseClick
    },

    /**
     * 鼠标移动事件
     */
    mouseMove(e) {
      const canvasX = e.offsetX
      const canvasY = e.offsetY
      const XPoint = this.locationX(canvasX)
      const YPoint = this.locationY(canvasY)

      // 如果不在棋盘某个点上，则返回
      if (XPoint === -1 || YPoint === -1 || this.existChess(XPoint, YPoint) || this.existCursor(XPoint, YPoint)) {
        return
      } else {
        // 擦除上次光标位置
        this.clearLastCursor()
        // 绘制焦点光标
        this.drawCursor(XPoint, YPoint)
        // 储存当前光标位置
        this.cursorPoint = {
          XPoint,
          YPoint,
        }
      }
    },

    /**
     * 鼠标移动事件
     */
    mouseClick(e) {
      const canvasX = e.offsetX
      const canvasY = e.offsetY
      const XPoint = this.locationX(canvasX)
      const YPoint = this.locationY(canvasY)

      // 如果不在棋盘某个点上，则返回
      if (XPoint === -1 || YPoint === -1 || this.existChess(XPoint, YPoint)) {
        return
      } else {
        // 存储棋子位置
        this.chessCollection[XPoint][YPoint] = this.isBlackChess
        // 画棋子
        this.drawChess(XPoint, YPoint, this.isBlackChess)
        // 判断是否赢了
        this.judgeWin(XPoint, YPoint)
        // 更改棋子颜色
        this.isBlackChess = !this.isBlackChess
      }
    },

    /**
     * 在重新绘制新一个光标之前，擦除上一次光标，这样就不用重新渲染棋盘了
     */
    clearLastCursor() {
      const { XPoint, YPoint } = this.cursorPoint

      // 如果没有光标储存或者该处已经有棋子了，则重绘此处
      if (typeof XPoint === 'undefined' || this.chessCollection[XPoint][YPoint] !== null) return

      const lastXPointPosition = this.chessBoardPadding + XPoint * this.chessBoardCellWidth
      const lastYPointPosition = this.chessBoardPadding + YPoint * this.chessBoardCellWidth

      // 擦除之前的光标
      this.context.strokeStyle = this.chessBoardBackgroundColor
      // Canvas：由于有反锯齿等处理，另外还有光栅化的精度问题，边缘的像素会覆盖不了的，需要增加线长宽
      this.context.lineWidth = 3

      this.context.beginPath()
      this.context.moveTo(lastXPointPosition - 6, lastYPointPosition - 6)
      this.context.lineTo(lastXPointPosition + 6, lastYPointPosition + 6)
      this.context.stroke()
      this.context.closePath()
      this.context.beginPath()
      this.context.moveTo(lastXPointPosition - 6, lastYPointPosition + 6)
      this.context.lineTo(lastXPointPosition + 6, lastYPointPosition - 6)
      this.context.stroke()
      this.context.closePath()

      // 也可使用下面这种代替上面的写法  上：还原线条 下：还原区域  缺失线段需要与还原的长度一样
      // this.context.fillStyle = this.chessBoardBackgroundColor
      // this.context.fillRect(lastXPointPosition - 6, lastYPointPosition - 6, 12 ,12)

      // 将交叉处缺失的线段补齐
      this.context.strokeStyle = 'rgb(0,0,0,1)'
      this.context.lineWidth = 1
      this.context.beginPath()

      // 处理光标边缘情况
      if (XPoint === 0) {
        this.context.moveTo(lastXPointPosition, lastYPointPosition)
      } else {
        this.context.moveTo(lastXPointPosition - 3, lastYPointPosition)
      }

      if (XPoint === this.chessBoardSize[1]) {
        this.context.lineTo(lastXPointPosition, lastYPointPosition)
      } else {
        this.context.lineTo(lastXPointPosition + 3, lastYPointPosition)
      }

      this.context.stroke()
      this.context.closePath()
      this.context.beginPath()

      // 处理光标在边缘情况
      if (YPoint === 0) {
        this.context.moveTo(lastXPointPosition, lastYPointPosition)
      } else {
        this.context.moveTo(lastXPointPosition, lastYPointPosition - 3)
      }

      if (YPoint === this.chessBoardSize[0]) {
        this.context.lineTo(lastXPointPosition, lastYPointPosition)
      } else {
        this.context.lineTo(lastXPointPosition, lastYPointPosition + 3)
      }
      this.context.stroke()
      this.context.closePath()
    },

    /**
     * 绘制棋盘焦点光标
     */
    drawCursor(XPoint, YPoint) {
      const XPointPosition = this.chessBoardPadding + XPoint * this.chessBoardCellWidth
      const YPointPosition = this.chessBoardPadding + YPoint * this.chessBoardCellWidth

      this.context.strokeStyle = 'rgb(0,0,0,1)'
      this.context.lineWidth = 1

      this.context.beginPath()
      this.context.moveTo(XPointPosition - 5, YPointPosition - 5)
      this.context.lineTo(XPointPosition + 5, YPointPosition + 5)
      this.context.stroke()
      this.context.closePath()
      this.context.beginPath()
      this.context.moveTo(XPointPosition - 5, YPointPosition + 5)
      this.context.lineTo(XPointPosition + 5, YPointPosition - 5)
      this.context.stroke()
      this.context.closePath()
    },

    /**
     * 绘制棋子
     */
    drawChess(XPoint, YPoint, isBlackChess) {
      const XPointPosition = this.chessBoardPadding + XPoint * this.chessBoardCellWidth
      const YPointPosition = this.chessBoardPadding + YPoint * this.chessBoardCellWidth

      // 渐变色
      const gradient = this.context.createRadialGradient(XPointPosition, YPointPosition, 10, XPointPosition, YPointPosition, 0)
      this.context.beginPath()
      // 绘制旗子 圆形
      this.context.arc(XPointPosition, YPointPosition, this.chessRadius, 0, 2 * Math.PI)

      if (isBlackChess) {
        gradient.addColorStop(0, '#0A0A0A')
        gradient.addColorStop(1, '#636766')
      } else {
        gradient.addColorStop(0, '#D1D1D1')
        gradient.addColorStop(1, '#F9F9F9')
      }

      this.context.fillStyle = gradient
      this.context.fill()
      this.context.closePath()
    },

    /**
     * 是否存在棋子
     */
    existChess(XPoint, YPoint) {
      return this.chessCollection[XPoint][YPoint] !== null
    },

    /**
     * 是否已经存在光标了
     */
    existCursor(XPoint, YPoint) {
      return this.cursorPoint.XPoint && this.cursorPoint.XPoint === XPoint && this.cursorPoint.YPoint === YPoint
    },

    /**
     * 计算是否有赢
     */
    judgeWin(XPoint, YPoint) {
      const XPointBeginIndex = XPoint - 4 < 0 ? 0 : XPoint - 4
      const XPointEndIndex = XPoint + 4 > this.chessBoardSize[1] ? this.chessBoardSize[1] : XPoint + 4

      const YPointBeginIndex = YPoint - 4 < 0 ? 0 : YPoint - 4
      const YPointEndIndex = YPoint + 4 > this.chessBoardSize[0] ? this.chessBoardSize[0] : YPoint + 4

      let continuousChessCount = 0

      // 横方向
      for (let i = XPointBeginIndex; i <= XPointEndIndex; i++) {
        if (this.chessCollection[i][YPoint] !== null && this.chessCollection[i][YPoint] === this.isBlackChess) {
          continuousChessCount++
        } else {
          continuousChessCount = 0
        }

        if (continuousChessCount === 5) {
          this.winAlert(this.isBlackChess)
          break
        }
      }

      continuousChessCount = 0

      // 竖方向
      for (let i = YPointBeginIndex; i <= YPointEndIndex; i++) {
        if (this.chessCollection[XPoint][i] !== null && this.chessCollection[XPoint][i] === this.isBlackChess) {
          continuousChessCount++
        } else {
          continuousChessCount = 0
        }

        if (continuousChessCount === 5) {
          this.winAlert(this.isBlackChess)
          break
        }
      }

      continuousChessCount = 0

      // 左上到右下
      // 计算移动的位置 往左上偏移
      const leftTopMinDistance = XPoint - XPointBeginIndex > YPoint - YPointBeginIndex ? YPoint - YPointBeginIndex : XPoint - XPointBeginIndex
      let i = XPoint - leftTopMinDistance
      let j = YPoint - leftTopMinDistance
      while (i <= XPointEndIndex && j <= YPointEndIndex) {
        if (this.chessCollection[i][j] !== null && this.chessCollection[i][j] === this.isBlackChess) {
          continuousChessCount++
        } else {
          continuousChessCount = 0
        }

        if (continuousChessCount === 5) {
          this.winAlert(this.isBlackChess)
          break
        }

        i++
        j++
      }

      continuousChessCount = 0

      // 左下到右上
      // 计算移动的位置 往左下偏移
      const leftBottomMinDistance = XPoint - XPointBeginIndex > YPointEndIndex - YPoint ? YPointEndIndex - YPoint : XPoint - XPointBeginIndex
      let m = XPoint - leftBottomMinDistance
      let n = YPoint + leftBottomMinDistance

      while (m <= XPointEndIndex && n >= YPointBeginIndex) {
        if (this.chessCollection[m][n] !== null && this.chessCollection[m][n] === this.isBlackChess) {
          continuousChessCount++
        } else {
          continuousChessCount = 0
        }

        if (continuousChessCount === 5) {
          this.winAlert(this.isBlackChess)
          break
        }

        m++
        n--
      }
    },

    /**
     * 计算鼠标X方位在那个点上
     */
    locationX(canvasX) {
      const XPointInt = Math.floor((canvasX - this.chessBoardPadding) / this.chessBoardCellWidth)

      // 在棋盘外的，全部返回-1
      if (canvasX < this.chessBoardPadding - this.cursorShowDistance) return -1
      if (canvasX > this.chessBoardSize[1] * this.chessBoardCellWidth + this.chessBoardPadding + this.cursorShowDistance)  return -1

      const leftPointDiff = canvasX - XPointInt * this.chessBoardCellWidth - this.chessBoardPadding
      const rightPointDiff = (XPointInt + 1) * this.chessBoardCellWidth + this.chessBoardPadding - canvasX

      // 判断相关的左右两个点哪个到达临界触发点
      if (leftPointDiff <= this.cursorShowDistance) {
        return XPointInt
      } else if (rightPointDiff <= this.cursorShowDistance) {
        return XPointInt + 1
      }

      return -1
    },

    /**
     * 计算鼠标Y方位在那个点上
     */
    locationY(canvasY) {
      const YPointInt = parseInt((canvasY - this.chessBoardPadding) / this.chessBoardCellWidth)

      // 在棋盘外的，全部返回-1
      if (canvasY < this.chessBoardPadding - this.cursorShowDistance) return -1
      if (YPointInt > this.chessBoardSize[0] * this.chessBoardCellWidth + this.chessBoardPadding + this.cursorShowDistance) return -1

      const topPointDiff = canvasY - YPointInt * this.chessBoardCellWidth - this.chessBoardPadding
      const bottomPointDiff = (YPointInt + 1) * this.chessBoardCellWidth + this.chessBoardPadding - canvasY

      // 判断相关的左右两个点哪个到达临界触发点
      if (topPointDiff <= this.cursorShowDistance) {
        return YPointInt
      } else if (bottomPointDiff <= this.cursorShowDistance) {
        return YPointInt + 1
      }

      return -1
    },

    // 判断输赢
    winAlert(isBlackChess) {
      this.$alert(`${isBlackChess ? '黑棋' : '白棋'}赢了`, '胜利', {
        confirmButtonText: '确定',
        callback: () => {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.isBlackChess = true
          this.initCollection()
          this.initChessBoard()
        },
      })
    },
  },
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #f3f2f2, 0px 0px 5px #6f6767;
  background-color: rgba(207, 188, 137, 1);
}
</style>
