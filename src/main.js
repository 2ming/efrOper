// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/fonts/iconfont.css'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import * as types from './store/mutation-types'
import * as filters from './filters'

Vue.config.productionTip = false

Vue.use(ElementUI)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {

  if(to.path == '/login' && store.state.token){
    next({
        path: '/',
        redirect: '/addstyle'
    })
    return;
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.token) {
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})

router.afterEach(route => {
  // console.log(route);
  document.title = route.meta.title
})

sync(store, router)

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  console.log(config)
  // Do something before request is sent
  // config.withCredentials = true  // 需要跨域打开此配置
  // post提交 data存在 并且 data不是FormData对象时对数据进行json化处理
  // if(config.method==='post' && config.data && config.data.constructor !== FormData){
  //   config.data = qs.stringify(config.data)
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // }
  // 开启loading动画
//  store.dispatch('popup/loading/showLoading')
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // 关闭loading动画
  //store.dispatch('popup/loading/hideLoading')
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
