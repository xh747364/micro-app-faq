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
var fs_extra_1 = __importDefault(require("fs-extra"));
var port_scanner_1 = require("../libs/port-scanner");
var pay_json_1 = __importDefault(require("../pay.json"));
var child_process_1 = require("child_process");
var os_1 = __importDefault(require("os"));
var getIpv4Address = function () {
    var interfaces = os_1["default"].networkInterfaces();
    return Object.values(interfaces)
        .map(function (iface) { return iface.filter(function (net) { return net.family === 'IPv4' && net.address !== '127.0.0.1'; }); })
        .flat();
};
var _a = getIpv4Address()[0], network = _a === void 0 ? { address: '127.0.0.1' } : _a;
var portScanner = new port_scanner_1.PortScanner();
portScanner.findAPortNotInUse([8000, 9999]).then(function (port) {
    var targetJsonStr = JSON.stringify(__assign(__assign({}, pay_json_1["default"]), { port: port, domain: network.address }));
    fs_extra_1["default"].writeFileSync(__dirname + "/../pay.json", targetJsonStr);
    fs_extra_1["default"].writeFileSync(__dirname + "/../../../payConf.js", "module.exports = " + targetJsonStr);
    child_process_1.execSync("node " + __dirname + "/../src");
});
