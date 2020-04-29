const path = require('path')
// alias 配置
// @ =  /src
// ~ =  /node-modules
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  

    // 选项...
    assetsDir:'static',
    publicPath: process.env.NODE_ENV === 'production'? '/demo-page/' : '/',
    // css: {
    //     extract: true,
    //     sourceMap: true
    //   },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: []
      }
    },
    // alias 配置
    chainWebpack(config) {
      config.resolve.alias
        .set('components', resolve('src/components'))
        .set('common', resolve('src/common'))
        .set('api', resolve('src/api'))
    }
    
}


