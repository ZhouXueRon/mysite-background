import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 网页加载
import 'nprogress/nprogress.css' // 网页加载样式
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 网页加载条配置

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 开启网页加载条
  NProgress.start();

  // 设置网页标题
  document.title = getPageTitle(to.meta.title);

  // 获取用户信息
  const hasGetUserInfo = store.getters.user; // 获取本地用户信息

  if (to.meta.auth) {
    // 页面需要鉴权，判断是否有用户信息
    if (hasGetUserInfo) {
      // 有用户信息，直接放行
      next();
    } else {
      // 没有用户信息，判断是否有 token
      const hasToken = localStorage.getItem('adminToken');
      if (hasToken) {
        // 有 token，验证 token 是否有效
        try {
          // 有效
          await store.dispatch('user/getInfo'); // whoami
          next();
        } catch (error) {
          // 无效
          await store.dispatch('user/resetToken');
          Message.error('登录过期，请重新登录！');
          next(`/login?redirect=${to.path}`);
          NProgress.done(); // 让网页加载条走完
        }
      } else {
        // 没有 token，跳转到登录页
        next(`/login?redirect=${to.path}`);
        NProgress.done(); // 让网页加载条走完
      }
    }
  } else {
    // 页面不需要鉴权，判断是否进入的为登录页
    if (to.path === '/login' && hasGetUserInfo) {
      // 已登录状态进入登录页面，导航到首页
      next({ path: '/' })
    } else {
      next();
    }
    NProgress.done(); // 让网页加载条走完
  }

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
