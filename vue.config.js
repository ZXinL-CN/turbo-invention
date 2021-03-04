const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    plugins:[
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css|\.jpg$|\.woff/,
        threshold: 10240,
        deleteOriginalAssets: false
      })
    ]
  }
}
