import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './router/index'

const router = new VueRouter({
  routes,
})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import fps from 'fps-indicator'
fps({
  position: 'top-right',
  style: `
    font-size: 24px;
    padding: 24px 40px;
  `,
})

// topology中有影响到全局的样式 自定义的放在其下面
import './style/index.scss'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
