module.exports = {
  // 关闭eslint代码规范
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter'
    }
  }
}
