
const path = require('path');
const CompressionWebpackPlugin = require("compression-webpack-plugin") ////gzip压缩
const TerserJSPlugin = require('terser-webpack-plugin'); //正式环境的console.log
const pinlic = process.env.NODE_ENV === "production" ? '/' : '/'

// 定义压缩文件类型
const productionGzipExtensions = ['.js', '.css', '.html', '.vue', '.scss']
const proxyTargetMap = {
  prod: 'https://xxx.xxx.com/',
  randy: 'http://47.105.71.81:3306', //// 非正式
  peter: 'http://192.168.11.178:3001'// 非正式
}
let proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.prod

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: pinlic,
  outputDir: 'dist',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  lintOnSave: false,
  devServer: {
    port: 8090,
    disableHostCheck: true,

    proxy: {
      '/sns': {
        target: 'https://api.weixin.qq.com', ////代理地址，这里设置的地址会代替axios中设置的baseURL https://devwx.tranderpay.com
        // ws: true,  // 是否启用websockets
        // secure: false, // 如果是https接口，需要配置这个参数
        // changeOrigin: true, //// 如果接口跨域，需要进行这个参数配置
        // pathRewrite: {
        //   '^/api': '' // 通过pathRewrite重写地址，将前缀/api转为/
        // }
      }
    },
    before: app => { }
  },
  css: {
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false,
    // loaderOptions: {
    //   sass: {
    //     prependData: `@import "@/styles/index.scss";`
    //   }
    // }
  },
  chainWebpack: config => {
    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
  },
  configureWebpack: config => {

    if (process.env.NODE_ENV === 'production') {
      // / 为生产环境修改配置...
      // 开启压缩
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8
      }));
      config.optimization.minimizer = [new TerserJSPlugin({
        terserOptions: {
          mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接
          compress: {
            drop_console: true,//传true就是干掉所有的console.*这些函数的调用.
            drop_debugger: true, //干掉那些debugger;
            pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
          }
        }
      })]

    }

  }
}

