import Vue from 'vue'
//  导入element-ui
import './plugins/element'
// 导入element-ui的css文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入echarts组件
import echarts from './plugins/echarts'
// 导入 axios
import axios from 'axios'
import less from 'less'
// 导入markdown编辑器，实现日志发布，查询，修改
import mavonEditor from 'mavon-editor'
import App from './App.vue'
import router from './router'
//  导入全局样式表
import './assets/css/global.css'
import 'mavon-editor/dist/css/index.css'

// 引入baseurl基地址
import { adressMain } from './utils/util'
// 引入公共commonjs方法 封装请求的方法
import common from './utils/common'
console.log('我是feature分支')
Vue.prototype.$echarts = echarts
Vue.use(less)
Vue.use(common)
// 接口1的默认请求地址  朱心亮
axios.defaults.baseM1URL = adressMain.Base_M1_url
// 接口2的默认请求地址  陈杰
axios.defaults.baseM2URL = adressMain.Base_M2_url

Vue.use(mavonEditor)
// 表示跨域请求是否需要凭证
// axios.defaults.withCredentials = true
// 配置请求的根路径
// axios.defaults.baseURL = 'https://www.aynu.vip:8888/api/'
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 将token放在请求头发送到服务器端
// http request 拦截器

axios.interceptors.request.use(function (config) {
  // if(objService.serAddress === '0'){
  //     axios.defaults.baseURL = objService.zhuService.baseurl;
  // }
  console.log(config)
  // let user = window.sessionStorage.getItem("user")
  // let tok = JSON.parse(user)
  const token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token // 将token放到请求头发送给服务器
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// // http response 拦截器

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
