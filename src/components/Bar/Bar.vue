<template>
  <div class="bar">
    <el-tabs class="tab" v-model="tabActive">
      <el-tab-pane v-for="(tab, i) in tabsInfo" :key="i" :label="tab.name" :name="tab.id"></el-tab-pane>
    </el-tabs>
    <component :is="tabActive"></component>
  </div>
</template>

<script>
import border from './border'
import myCanvas from './canvas'
import introduction from './introduction'
import gobang from './gobang'
import drawing from './drawing'
import topology from './topology'
import clock from './clock'
import scrollNums from './scrollNums'
import shootingStar from './shootingStar'
import converterColor from './converterColor'
import navigationBar from './navigationBar'
import inteCss from './inteCss'
import imageEditor from './imageEditor'
export default {
  components: {
    border,
    myCanvas,
    gobang,
    introduction,
    drawing,
    topology,
    clock,
    scrollNums,
    shootingStar,
    converterColor,
    navigationBar,
    inteCss,
    imageEditor
  },
  data() {
    return {
      tabActive: 'imageEditor',
      tabsInfo: [
        { name: 'border', id: 'border' },
        { name: 'canvas', id: 'myCanvas' },
        { name: '简介', id: 'introduction' },
        { name: '五子棋', id: 'gobang' },
        { name: '画板', id: 'drawing' },
        // { name: 'topology', id: 'topology' },
        { name: 'clock', id: 'clock' },
        { name: '数字滚动', id: 'scrollNums' },
        { name: '流星', id: 'shootingStar' },
        { name: '色彩转换', id: 'converterColor' },
        { name: '导航栏', id: 'navigationBar' },
        { name: 'CSS', id: 'inteCss' },
        { name: '图片裁切', id: 'imageEditor' },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.bar {
  height: 100%;
}
/deep/ .el-tabs__nav-scroll {
  padding: 0 20px;
}
</style>
