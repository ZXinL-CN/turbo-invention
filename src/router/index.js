import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 动态路由
const getactivityRule = {
  path: '/getactivity',
  component: () => import('@/components/homechildren/Getactivity')
}
const getuserRule = {
  path: '/getuser',
  component: () => import('@/components/homechildren/Getuser')
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    // {
    //   path:'/regist2',
    //   component:resolve=> require('@/components/regist')
    // },
    {
      path: '/login',
      component: () => import('@/components/Login')
    },
    {
      path: '/home',
      component: () => import('@/components/Home'),
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: () => import('@/components/homechildren/Welcome')
      },
      {
        path: '/myself',
        component: () => import('@/components/homechildren/Myself')
      },
      {
        path: '/updatepwd',
        component: () => import('@/components/homechildren/Updatepwd')
      },
      {
        path: '/logs',
        component: () => import('@/components/homechildren/Logs')
      },
      {
        path: '/getlogbyid',
        component: () => import('@/components/homechildren/Getlogbyid')
      },
      {
        path: '/addlogaddlog',
        component: () => import('@/components/homechildren/Addlog')
      },
      {
        path: '/updatelog',
        component: () => import('@/components/homechildren/Updatelog')
      },
      {
        path: '/users',
        component: () => import('@/components/homechildren/Users')
      },
      {
        path: '/members',
        component: () => import('@/components/homechildren/Members')
      },
      {
        // 只能跳转到id为数字类型的
        path: '/memberinfo/:id(\\d+)',
        // 默认隐藏
        hidden: true,
        component: () => import('@/components/homechildren/MemberInfo')
      },
      {
        path: '/activities',
        component: () => import('@/components/homechildren/Activities')
      },
      {
        path: '/applyactivities',
        component: () => import('@/components/homechildren/Applyactivities')
      },
      {
        path: '/drafts',
        component: () => import('@/components/homechildren/Draft')
      },
      {
        path: '/getdraftbyid',
        component: () => import('@/components/homechildren/Getdraftbyid')
      },
      {
        path: '/updatedraft',
        component: () => import('@/components/homechildren/Updatedraft')
      }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/regist2',
      component: () => import('@/components/regist.vue')
    }
  ]

})

// // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next() 放行 next('/login) 强制跳转
  if (to.path === '/login') return next()
  // 从sessionStorage中获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果tokenStr为空时，直接跳转到登录页面
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})
// 根据用户权限动态路由添加
export function initDynamicRoutes () {
  console.log(router.app.$options.router.options)
  router.app.$options.router.options.routes[2].children.push(getuserRule)
  router.app.$options.router.options.routes[2].children.push(getactivityRule)
  router.addRoutes(router.app.$options.router.options.routes)
}
export default router
