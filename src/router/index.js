import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import utils from "@/utils/index";

Vue.use(VueRouter)

const routes = [

  {
    path: '/Address',
    component: () => import(/* webpackChunkName: "Address" */ '../views/User/Address.vue'),
    name: 'Address',
    meta: {
      title: '抽奖信息登录',
    },
  },
  {
    path: '/Award',
    component: () => import(/* webpackChunkName: "Home" */ '../views/User/Award.vue'),
    name: 'Award',
    meta: {
      title: '抽奖信息查询',
    },
  },
  {
    path: '/Redirect',
    component: () => import(/* webpackChunkName: "Redirect" */ '../views/Redirect/index.vue'),
    name: 'Redirect',
    meta: {
      title: '授权页面',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const openId = utils.getStore("openId");
  if (!openId) {
    if (to.path === '/Redirect') {
      next()
    } else {
      utils.setStore("now_url", to.fullPath);//当前页url与参数放入缓存
      next('/Redirect')
    }
  } else {

    next()
  }
})

export default router
