var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        utils.map();
        _this.once(egret.Event.ADDED_TO_STAGE, function () { return __awaiter(_this, void 0, void 0, function () {
            var context3d, game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context3d = new egret3d.Egret3DCanvas(this.stage);
                        egret.setRendererContext(context3d);
                        game = new GameScene(context3d);
                        return [4 /*yield*/, this.loadAssets()];
                    case 1:
                        _a.sent();
                        game.createGameScene();
                        return [2 /*return*/];
                }
            });
        }); }, _this);
        return _this;
    }
    Main.prototype.loadAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            function load(resources) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, resources_1, r;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, resources_1 = resources;
                                _a.label = 1;
                            case 1:
                                if (!(_i < resources_1.length)) return [3 /*break*/, 4];
                                r = resources_1[_i];
                                return [4 /*yield*/, RES.getResAsync(r)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
            var loading, resources, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loading = new LoadingUI();
                        this.stage.addChild(loading);
                        return [4 /*yield*/, RES.loadConfig()];
                    case 1:
                        _a.sent();
                        resources = [
                            "3d/background.jpg",
                            "3d/0_Model/Esm/Zhouyu.esm",
                            "3d/0_Model/Eam/attack.eam",
                            "3d/0_Model/Eam/idle.eam",
                            "3d/0_Model/Texture/hero_01.png"
                        ];
                        return [4 /*yield*/, load(resources)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loading);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        alert(e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}(egret.DisplayObject));
Main = __decorate([
    RES.mapConfig("config.json", function () { return "resource"; }, function (path) {
        var ext = path.substr(path.lastIndexOf(".") + 1);
        var type = "";
        if (path.indexOf("3d") >= 0) {
            type = "unit";
        }
        else {
            var typeMap = {
                "jpg": "image",
                "png": "image",
                "webp": "image",
                "json": "json",
                "fnt": "font",
                "pvr": "pvr",
                "mp3": "sound"
            };
            type = typeMap[ext];
            if (type == "json") {
                if (path.indexOf("sheet") >= 0) {
                    type = "sheet";
                }
                else if (path.indexOf("movieclip") >= 0) {
                    type = "movieclip";
                }
                ;
            }
        }
        return type;
    })
], Main);
__reflect(Main.prototype, "Main");
var utils;
(function (utils) {
    function promisify(loader, url) {
        var _this = this;
        return new Promise(function (reslove, reject) {
            loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, function () {
                reslove(loader.data);
            }, _this);
            loader.load("resource/" + url);
        });
    }
    function map() {
        var _this = this;
        RES.processor.map("unit", {
            onLoadStart: function (host, resource) { return __awaiter(_this, void 0, void 0, function () {
                var loader;
                return __generator(this, function (_a) {
                    loader = new egret3d.UnitLoader();
                    return [2 /*return*/, promisify(loader, resource.url)];
                });
            }); },
            onRemoveStart: function (host, resource) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve()];
            }); }); }
        });
    }
    utils.map = map;
})(utils || (utils = {}));
