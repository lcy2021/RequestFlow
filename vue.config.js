'use strict'

const name = 'Request' // page title

const port = 8848 // dev port

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'public',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    devtool: 'source-map'
  }
}
