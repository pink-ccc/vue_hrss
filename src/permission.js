import router from './router'
import store from './store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    // 如果有token 并且还要去登录页
    if (to.path === '/login') {
      next('/') // 则强制留在主页
      NProgress.done() // 跳到首页, 被next拦截走的, 不会自动关闭, 因为没有进入到 afterEach, 需要手动关闭
    } else {
      next()
    }
  } else {
    // 如果没有token 并且要去的路径在白名单(免登陆即可访问的页面)中则放行 不然则跳到登录页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done() // 关闭进度条效果
})
