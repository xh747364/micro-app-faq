"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PortScanner = void 0;
var net_1 = __importDefault(require("net"));
var PortScanner = /** @class */ (function () {
    function PortScanner(host) {
        if (host === void 0) { host = '127.0.0.1'; }
        this.host = '127.0.0.1';
        if (typeof host !== 'string') {
            throw new Error('param host can only be a string');
        }
    }
    PortScanner.prototype.scan = function (port) {
        var _this = this;
        var scanRes = { status: null };
        return new Promise(function (resolve) {
            if (typeof port !== 'number') {
                throw new Error('PortScanner error: param port must be a number');
            }
            if (port < 1 || port > 65535) {
                throw new Error('PortScanner error: port must be in range [1-65535]');
            }
            var socket = new net_1["default"].Socket();
            var timeout = 200;
            socket.on('connect', function () {
                scanRes.status = 'connect';
                socket.destroy();
            });
            socket.on('timeout', function () {
                scanRes.status = 'timeout';
                socket.destroy();
            });
            socket.on('error', function () {
                scanRes.status = 'error';
                socket.destroy();
            });
            socket.on('close', function () {
                resolve(scanRes);
            });
            socket.setTimeout(timeout);
            socket.connect(port, _this.host);
        });
    };
    PortScanner.prototype.findAPortNotInUse = function (range) {
        return __awaiter(this, void 0, void 0, function () {
            var from, to, currentPort, portStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from = range[0], to = range[1];
                        currentPort = from;
                        _a.label = 1;
                    case 1:
                        if (!(currentPort <= to)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.scan(currentPort)];
                    case 2:
                        portStatus = _a.sent();
                        if (portStatus.status !== 'connect') {
                            return [2 /*return*/, currentPort];
                        }
                        currentPort++;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    return PortScanner;
}());
exports.PortScanner = PortScanner;
