import VueRouter from 'vue-router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vuex from 'vuex'

Vue.use(VueRouter)
// /*全局配置 加载条*/
// NProgress.configure({
//   // 动画方式
//   easing: 'ease-out-in',
//   // 递增进度条的速度
//   speed: 700,
//   // 是否显示加载ico
//   showSpinner: false,
//   // 自动递增间隔
//   trickleSpeed: 200,
//   // 初始化时的最小百分比
//   minimum: 0.0
// })
export default ({app}) => {
  app.router.beforeEach((to, from, next) => {
    // 进度条开始
    // if (app.store.state.waveShow === false) {
    //   app.store.commit('showHomeWave');
    //   console.log(app.store.state.waveShow)
    // }
    //
    // console.log(from.name+" ==>"+to.name)
    next()
  })
  app.router.afterEach((to, from, next) => {
    // 进度条结束
  })
}
