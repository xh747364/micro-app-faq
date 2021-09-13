"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.repayOrder = exports.createOrder = void 0;
var axios_1 = __importDefault(require("axios"));
var crypto_1 = __importDefault(require("crypto"));
var pay_json_1 = __importDefault(require("../pay.json"));
var createOrderUrl = 'https://developer.toutiao.com/api/apps/ecpay/v1/create_order';
var repayOrderUrl = 'https://developer.toutiao.com/api/apps/ecpay/v1/create_refund';
var SALT = pay_json_1["default"].salt;
// 字段名写错了
var exclude = ['sign', 'app_id', 'thirdparty_id'];
var app_id = pay_json_1["default"].appid;
function md5(str) {
    var _md5 = crypto_1["default"].createHash('md5');
    _md5.update(str);
    return _md5.digest('hex');
}
/**
 * 签名，为请求增加签名以验证参数没有被修改
 * @param params
 */
function sign(params) {
    return md5(Object.keys(params)
        .filter(function (key) { return !exclude.includes(key); })
        .map(function (key) { return params[key]; })
        .concat([SALT]) // 注意不要忘记添加密钥进来
        .sort()
        .join('&'));
}
// 请求创建订单接口
function createOrder(order) {
    Object.assign(order, { app_id: app_id });
    console.log('createOrder===', order);
    return axios_1["default"]({
        method: 'POST',
        url: createOrderUrl,
        data: JSON.stringify(__assign(__assign({}, order), { sign: sign(order) }))
    }).then(function (res) { return res.data; });
}
exports.createOrder = createOrder;
// 退款
function repayOrder(order) {
    Object.assign(order, { app_id: app_id });
    console.log('==退款请求==', order);
    return axios_1["default"]({
        method: 'POST',
        url: repayOrderUrl,
        data: JSON.stringify(__assign(__assign({}, order), { sign: sign(order) }))
    }).then(function (res) {
        return res.data;
    });
}
exports.repayOrder = repayOrder;
