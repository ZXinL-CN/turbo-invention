import Vue from 'vue'
import VueRouter from 'vue-router'

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

// 路由懒加载
// const Login = () => import('@/components/Login.vue')
// const Home = () => import('@/components/Home.vue')
// const Welcome = () => import('@/components/homechildren/Welcome.vue')
// const Myself = () => import('@/components/homechildren/Myself.vue')
// const Logs = () => import('@/components/homechildren/Logs.vue')
// const Getlogbyid = () => import('@/components/homechildren/Getlogbyid.vue')
// const Addlog = () => import('@/components/homechildren/Addlog.vue')
// const Updatelog = () => import('@/components/homechildren/Updatelog.vue')
// const Members = () => import('@/components/homechildren/Members.vue')
// const MemberInfo = () => import('@/components/homechildren/MemberInfo.vue')
// const Updatepwd = () => import('@/components/homechildren/Updatepwd.vue')
// const Activities = () => import('@/components/homechildren/Activities.vue')
// const Applyactivities = () => import('@/components/homechildren/Applyactivities.vue')
// const Users = () => import('@/components/homechildren/Users.vue')
// const Draft = () => import('@/components/homechildren/Draft.vue')
// const Getdraftbyid = () => import('@/components/homechildren/Getdraftbyid.vue')
// const Updatedraft = () => import('@/components/homechildren/Updatedraft.vue')
// const Getactivity = () => import('@/components/homechildren/Getactivity.vue')
// const Getuser = () => import('@/components/homechildren/Getuser.vue')
Vue.use(VueRouter)
// 动态路由
const getactivityRule = {
  path: '/getactivity',
  component: resolve => require(['@/components/homechildren/Getactivity'], resolve)
}
const getuserRule = {
  path: '/getuser',
  component: resolve => require(['@/components/homechildren/Getuser'], resolve)
}

const router = new VueRouter({
  routes: [

    {
      path: '/',
      redirect: '/login'
    },
    // {
    //   path:'/regist2',
    //   component:resolve=> require(['@/components/regist'], resolve)
    // },
    {
      path: '/login',
      component: resolve => require(['@/components/Login'], resolve)
    },
    
    {
      path: '/home',
      component: resolve => require(['@/components/Home'], resolve),
      redirect: '/welcome',
      children: [{
          path: '/welcome',
          component: resolve => require(['@/components/homechildren/Welcome'], resolve)
        },
        {
          path: '/myself',
          component: resolve => require(['@/components/homechildren/Myself'], resolve)
        },
        {
          path: '/updatepwd',
          component: resolve => require(['@/components/homechildren/Updatepwd'], resolve)
        },
        {
          path: '/logs',
          component: resolve => require(['@/components/homechildren/Logs'], resolve)
        },
        {
          path: '/getlogbyid',
          component: resolve => require(['@/components/homechildren/Getlogbyid'], resolve)
        },
        {
          path: '/addlogaddlog',
          component: resolve => require(['@/components/homechildren/Addlog'], resolve)
        },
        {
          path: '/updatelog',
          component: resolve => require(['@/components/homechildren/Updatelog'], resolve)
        },
        {
          path: '/users',
          component: resolve => require(['@/components/homechildren/Users'], resolve)
        },
        {
          path: '/members',
          component: resolve => require(['@/components/homechildren/Members'], resolve)
        },
        {
          // 只能跳转到id为数字类型的
          path: '/memberinfo/:id(\\d+)',
          // 默认隐藏
          hidden: true,
          component: resolve => require(['@/components/homechildren/MemberInfo'], resolve)
        },
        {
          path: '/activities',
          component: resolve => require(['@/components/homechildren/Activities'], resolve)
        },
        {
          path: '/applyactivities',
          component: resolve => require(['@/components/homechildren/Applyactivities'], resolve)
        },
        {
          path: '/drafts',
          component: resolve => require(['@/components/homechildren/Draft'], resolve)
        },
        {
          path: '/getdraftbyid',
          component: resolve => require(['@/components/homechildren/Getdraftbyid'], resolve)
        },
        {
          path: '/updatedraft',
          component: resolve => require(['@/components/homechildren/Updatedraft'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/regist2',
      component: () => import('@/components/regist.vue'),
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
export function initDynamicRoutes() {
  console.log(router.app.$options.router.options)
  router.app.$options.router.options.routes[2].children.push(getuserRule)
  router.app.$options.router.options.routes[2].children.push(getactivityRule)
  router.addRoutes(router.app.$options.router.options.routes)
}
export default router
