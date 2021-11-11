<template>
  <div id="app">
    <div class="left-menu">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <template v-for="(item, index) in routers">
          <!-- 有子路由 -->
          <el-submenu v-if="item.children && item.children.length" :key="index" :index="item.path">
            <template slot="title">
              <p :class="route.includes(item.path) ? 'el-submenu-active' : ''">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </p>
            </template>
            <!-- 二级路由 -->
            <template v-for="(subItem, subIndex) in item.children">
              <!-- 有三级路由的 -->
              <!-- <el-submenu
                v-if="subItem.children && subItem.children.length"
                :key="'subMenu' + subIndex"
                :index="subItem.path"
                class="thi-el-menu"
              >
                <template slot="title">
                  <p
                    :class="route.includes(subItem.path) ? 'el-submenu-active' : ''"
                  >
                    <i :class="subItem.icon"></i>
                    <span>{{ subItem.title }}</span>
                  </p>
                </template>
                <el-menu-item
                  v-for="(thiItem, thiIndex) in subItem.children"
                  :key="'thi' + thiIndex"
                  :index="thiItem.path"
                  >{{ thiItem.title }}</el-menu-item
                >
              </el-submenu> -->

              <!-- 只有二级路由 -->
              <el-menu-item :key="'subMenu' + subIndex" :index="subItem.path">
                <i :class="subItem.icon"></i>
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
              <!-- 如果是三级路由 -->
              <!-- <el-menu-item
                  v-for="(thiItem, thiIndex) in subItem.children"
                  :key="'thi' + thiIndex"
                  :index="thiItem.path"
                  >{{ thiItem.title }}</el-menu-item
                > -->
            </template>
          </el-submenu>

          <!-- 没有子路由 只有一级路由 -->
          <el-menu-item v-else :key="index" :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div :class="['right-content', { 'right-content-top': isMargin }]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  computed: {
    routers() {
      return this.$router.options.routes
    },
    route() {
      return this.$route.matched.map(item => {
        return item.path
      })
    },
    isMargin() {
      return this.route && this.route.length >= 3 ? true : false
    },
  },
  watch: {
    $route: {
      handler: function(route) {
        this.defaultActive = route.path
      },
      immediate: true,
    },
  },
  data() {
    return {
      keyPath: [],
      defaultActive: '',
    }
  },
  created() {
    // this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.findActive()
    },
    findActive(arr) {
      if (!arr || !arr.length) return
      let _arr = arr[0]
      this.defaultActive = _arr.path
      if (_arr.children && _arr.children.length) {
        this.findActive(_arr.children)
      }
    },
    handleOpen(key, keyPath) {
      if (keyPath && keyPath.length === 2) {
        console.log(this.route)
      }
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      if (keyPath && keyPath.length >= 3) {
        this.keyPath = keyPath
      } else {
        this.keyPath = []
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  .left-menu {
    width: 220px;
  }
  .right-content {
    overflow: auto;
    flex: 1;
    border: 1px solid red;
    margin: 16px;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
  }
  .right-content.right-content-top {
    margin: 60px 16px 16px;
  }
  /deep/.el-menu-vertical-demo.el-menu {
    height: 100%;
  }
  /deep/ .el-menu-item,
  .el-submenu {
    text-align: left;
  }
  .el-submenu-active,
  .el-submenu-active > i {
    color: rgb(255, 208, 75);
  }
  /deep/.thi-el-menu.el-submenu.is-opened .el-menu {
    display: flex;
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
    background-color: #fff !important;
    .el-menu-item {
      color: rgb(0, 0, 0) !important;
      background-color: #fff !important;
      min-width: auto;
      border-bottom: 2px solid transparent;
      &.is-active {
        color: #ffd04b !important;
        border-bottom: 2px solid #ffd04b;
      }
      &:hover {
        color: #ffd04b !important;
      }
    }
  }
}
</style>
