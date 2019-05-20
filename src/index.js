import postcss from 'postcss';

var setting = {
    filter: /app\.(wxss)$/,
    remToRpx: 35
}

export default class WepyPluginBootstrap {
  constructor(opts = {}) {
    this.setting = Object.assign(setting, opts)
    this.postcssMpvueWxss = require('postcss-mpvue-wxss')({
      remToRpx: this.setting.remToRpx,
      replaceTagSelector: Object.assign(require('postcss-mpvue-wxss/lib/wxmlTagMap'), {
          'button': 'button',
          '*': 'view'
      })
    })
    this.postcssBootstrapWxss = require('postcss-bootstrap-wxss')({
      remToRpx: this.setting.remToRpx
    })
    this.postcssAll = postcss([ this.postcssMpvueWxss, this.postcssBootstrapWxss ])
  }
  apply(op) {
      let setting = this.setting
      if (!setting.filter.test(op.file)) {
          op.next();
      } else {
          op.output && op.output({
              action: '转换适应bootstrap',
              file: op.file
          });

          this.postcssAll.process(op.code, { from: op.file }).then((result) => {
              op.code = result.css;
              op.next();
          }).catch(e => {
                  op.err = e;
              op.catch();
          });
      }
  }
}
