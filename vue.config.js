const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env.NODE_ENV   // eslint-disable-line
const envVariable = {
  development: 'development',
  production: 'production'
}
module.exports = {  // eslint-disable-line
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源目录 (js, css, img, fonts)
  assetsDir: 'assets',
  // 是否为生产环境构建生成 source map
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    // 默认打开浏览器
    open: true,
    // 端口号
    port: 9095,
    hot: true,
    host: 'localhost',
  },
  // webpack 配置
  chainWebpack: config => {
    //增加打包文件大小分析
    if(env === envVariable.production){
      config.plugin('webpack-bundle-analyzer').use(new BundleAnalyzerPlugin({
        analyzerPort: 9096
      }))
    }
  },
  //webpack配置
  configureWebpack: config => {
    //警告 webpack 的性能提示
    (config.performance = {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      },
    }),
      // 打包忽略
      (config.externals = {
        //
      })
  },
}
