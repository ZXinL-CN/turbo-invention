const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
//   devServer: {
//     proxy: {
//         '/': {
//             // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
//             target: 'http://127.0.0.1:3000/regist',
//             // 允许跨域
//             changeOrigin: true,
//             // ws: true,
//             pathRewrite: {
//                 '^/': '/'
//             }
//         }
//     }
// },
  assetsDir:'static',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css|\.jpg$|\.woff/,
        threshold: 10240,
        deleteOriginalAssets: false
      })
    ]
  }
}
