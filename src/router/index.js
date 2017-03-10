import Vue from 'vue'
import store from '@/store'
import * as types from '@/store/mutation-types'
import Router from 'vue-router'

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, JSON.parse(window.localStorage.getItem('user')))
}

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
      path: '/addstyle',
      name: 'addstyle',
      meta: {
          title: '新增款式',
          requireAuth: true
      },
      component: (resolve) => require(['../views/addstyle.vue'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      meta: {
          title: '测试页面',
          requireAuth: true
      },
      component: (resolve) => require(['../views/test.vue'], resolve)
    },
    {
      path: '/',
      redirect: '/addstyle'
    }
  ]
})

export default router;
