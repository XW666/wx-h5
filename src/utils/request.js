import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';
// 根据环境不同引入不同api地址
import baseUrl from '@/config'

// create an axios instancenpm np
const service = axios.create({
  baseUrl, // url = base api url + request url// url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    // loading
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    })

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {

      if (res.status === 400) {
        Toast({
          message: res.message,
          className: "totast-cum",
        });
      }
      return Promise.reject(res)
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    Toast({
      message: "系统失联，请稍后！！!",
      className: "totast-cum toast-yellow",
    });
    return Promise.reject(error)
  }
)

export default service