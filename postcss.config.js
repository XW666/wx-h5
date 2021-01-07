module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      // 把px单位换算成rem单位
      rootValue: 37.5,   // 设计稿宽度的1/10
      propList: ['*']  // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    }
  }
}