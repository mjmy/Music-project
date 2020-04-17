const path = require('path')
module.exports = {
    // 选项...
    // assetsDir:'static',
    publicPath: './',
    // css: {
    //     extract: true,
    //     sourceMap: true
    //   },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: []
      }
    }
}

