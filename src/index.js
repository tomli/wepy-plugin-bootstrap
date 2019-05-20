var setting = {
    filter: /\.(css|scss|less)$/
    remToRpx: 35// 这个参数可以用来调整转换rem单位到rpx单位时使用的比例
}
var postcssMpvueWxss
// const postcssMpvueWxss = require('postcss-mpvue-wxss')(optopnsMpvue);
// const postcssBootstrapWxss = require('postcss-bootstrap-wxss')();

export default class WepyPluginBootstrap {
  constructor(opts = {}) {
    this.setting = Object.assign(setting, opts)
    this.postcssMpvueWxss = require('postcss-mpvue-wxss')({
      remToRpx: this.setting.remToRpx,
      replaceTagSelector: Object.assign(require('postcss-mpvue-wxss/lib/wxmlTagMap'), {
          'button': 'button',
          '*': 'view' // 将覆盖前面的 * 选择器被清理规则
      })
    })
    this.postcssBootstrapWxss = require('postcss-bootstrap-wxss')({
      remToRpx: this.setting.remToRpx
    })
    this.postcssAll = postcss([ this.postcssMpvueWxss, this.postcssBootstrapWxss ])
  }
  apply(op) {
    let setting = this.setting
    if (op.code && setting.filter.test(op.file)) {
        this.postcssAll.process(op.code)
    }
    op.next()
  }
}
