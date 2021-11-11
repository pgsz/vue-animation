<template>
  <main class="wrap_containt" id="dragCon">
    <section class="left">
      <div
        class="select-item"
        v-for="(item, index) in projectdatas"
        :key="index"
        draggable="true"
        @dragstart="dragstart(item.name, $event)"
        @mousedown="handleDragMousedown"
      >
        {{ item.name }}
      </div>
    </section>
    <section class="main" @drop="handleDrop" @dragover="dragover">
      <div
        v-for="(item, index) in componentList"
        :key="index"
        class="select-item"
        :style="{ top: item.top + 'px', left: item.left + 'px' }"
        @mousedown="mousedown(index, $event)"
        @mousemove="mousemove"
        @mouseup="mouseup"
      >
        {{ item.name }}
      </div>
    </section>
  </main>
</template>
<script>
const leftScreenX = 358
const topScreenY = 18
export default {
  data() {
    return {
      projectdatas: [
        { id: 1, name: '葡萄' },
        { id: 2, name: '芒果' },
        { id: 3, name: '木瓜' },
        { id: 4, name: '榴莲' },
      ],
      domName: null,
      dragXPoint: 0,
      dragYPoint: 0,
      componentList: [],
      moveIndex: null,
      moveXPoint: 0,
      moveYPoint: 0,
      isMove: false,
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleDragMousedown(e) {
      this.dragXPoint = e.offsetX
      this.dragYPoint = e.offsetY
    },
    //  拖拽元素事件
    dragstart: function(name) {
      //   console.log('开始拖拽 -- dragstart')
      this.domName = name
    },
    // 目标元素 存放容器
    handleDrop: function(e) {
      //   console.log('目标元素中放下 -- drop')
      e.preventDefault()
      this.componentList.push({
        name: this.domName,
        left: e.offsetX - this.dragXPoint,
        top: e.offsetY - this.dragYPoint,
      })
      // console.log(this.componentList)
    },
    dragover: function(e) {
      // tag: 一定要
      //   console.log('目标元素中拖拽 -- dragover')
      e.preventDefault()
    },
    mousedown(index, e) {
      e.preventDefault()
      this.moveIndex = index
      this.moveXPoint = e.offsetX
      this.moveYPoint = e.offsetY
      this.isMove = true
    },
    mousemove(e) {
      if (this.isMove) {
        e.preventDefault()
        this.componentList[this.moveIndex].left = e.clientX - this.moveXPoint - leftScreenX
        this.componentList[this.moveIndex].top = e.clientY - this.moveYPoint - topScreenY
      }
    },
    mouseup() {
      this.isMove = false
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap_containt {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  .left {
    width: 100px;
    height: 100%;
    .select-item {
      margin: 10px auto;
    }
  }
  .main {
    flex: 1;
    height: 100%;
    margin-left: 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    .select-item {
      position: absolute;
    }
  }
}

.select-item {
  display: inline-block;
  background-color: #5bc0de;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 20px;
  color: #fff;
}
[v-cloak] {
  display: none;
}
</style>
