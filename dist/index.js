'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var setting = {
    filter: /app\.(wxss)$/,
    remToRpx: 35
};

var WepyPluginBootstrap = function () {
    function WepyPluginBootstrap() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, WepyPluginBootstrap);

        this.setting = Object.assign(setting, opts);
        this.postcssMpvueWxss = require('postcss-mpvue-wxss')({
            remToRpx: this.setting.remToRpx,
            replaceTagSelector: Object.assign(require('postcss-mpvue-wxss/lib/wxmlTagMap'), {
                'button': 'button',
                'textarea': 'textarea',
                '*': 'view'
            })
        });
        this.postcssBootstrapWxss = require('postcss-bootstrap-wxss')({
            remToRpx: this.setting.remToRpx
        });
        this.postcssAll = (0, _postcss2.default)([this.postcssMpvueWxss, this.postcssBootstrapWxss]);
    }

    _createClass(WepyPluginBootstrap, [{
        key: 'apply',
        value: function apply(op) {
            var setting = this.setting;
            if (!setting.filter.test(op.file)) {
                op.next();
            } else {
                op.output && op.output({
                    action: '转换适应bootstrap',
                    file: op.file
                });

                this.postcssAll.process(op.code, { from: op.file }).then(function (result) {
                    op.code = result.css;
                    op.next();
                }).catch(function (e) {
                    op.err = e;
                    op.catch();
                });
            }
        }
    }]);

    return WepyPluginBootstrap;
}();

exports.default = WepyPluginBootstrap;