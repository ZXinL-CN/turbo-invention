console.log('我是feature分支')
import Vue from 'vue'
//  导入element-ui插件
// import './plugins/element'
import ELEMENT from 'element-ui'
// 导入element-ui的css文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入 axios
import axios from 'axios'

// 导入markdown编辑器，实现日志发布，查询，修改
import mavonEditor from 'mavon-editor'
import App from './App.vue'
import router from './router'
//  导入全局样式表
import './assets/css/global.css'
import 'mavon-editor/dist/css/index.css'
Vue.use(ELEMENT)
Vue.use(mavonEditor)
axios.defaults.withCredentials = true
// 配置请求的根路径
axios.defaults.baseURL = 'https://www.aynu.vip:8888/api/'
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 将token放在请求头发送到服务器端
// http request 拦截器
axios.interceptors.request.use(function (config) {
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
