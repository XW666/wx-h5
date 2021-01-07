import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//vant按需加载
import './plugins/vant'
//移动端rem适配
import 'amfe-flexible/index.js'
// //全局样式
import '@/styles/index.scss'
//自定义指令
import webTitle from '@/directive/webTitle'
Vue.directive('webTitle', webTitle);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
