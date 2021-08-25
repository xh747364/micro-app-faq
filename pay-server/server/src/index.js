"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var pay_1 = require("./pay");
var pay_json_1 = __importDefault(require("../pay.json"));
var port = pay_json_1["default"].port;
var app = express_1["default"]();
app.use(body_parser_1["default"].json({ type: 'application/json' }));
// 将 HTML 请求体做为字符串处理
app.use(body_parser_1["default"].text({ type: 'text/html' }));
app.use('/create-order', function (req, resp) {
    var body = req.body;
    var order = body.order;
    pay_1.createOrder(order).then(resp.send.bind(resp))["catch"](resp.send.bind(resp));
});
app.use('/repay-order', function (req, resp) {
    var body = req.body;
    var order = body.order;
    pay_1.repayOrder(order).then(resp.send.bind(resp))["catch"](resp.send.bind(resp));
});
app.listen(port, function () {
    console.log("listening port: " + port + " ----");
});
