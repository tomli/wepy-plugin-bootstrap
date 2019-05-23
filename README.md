# wepy-plugin-bootstrap
wepy 插件，为前段开发者提供基于bootstrap开发微信小程序的供能

# 安装

    $ npm i -D wepy-plugin-bootstrap

# 使用
在 wepy.config.js 中添加以下代码:
``` 
  plugins: {
    'bootstrap': {
      filter: /app\.(wxss)$/, // 匹配需转换的wxss文件,默认只转换app.wxss
      //  示例： 转换 index.wxss 和 app.wxss 两个文件
      // filter: /(app|index)\.(wxss)$/,
      remToRpx: 35// 这个参数可以用来调整转换rem单位到rpx单位时使用的比例
    },
    'htmltag': {
       filter: /\.(wxml)$/, // 文件后缀匹配
    }
  }
``` 
 
  
  ****[如何在已有wepy项目中使用bootstrap](https://github.com/tomli/wepy-bootstrap-demo/blob/master/howtointro.md)****
  
   
# 备注
需要和[wepy-plugin-htmltag](https://github.com/ryzonqz/wepy-plugin-htmltag) 一起使用

# DEMO
  
  [wepy-bootstrap-demo](https://github.com/tomli/wepy-bootstrap-demo.git)
    
