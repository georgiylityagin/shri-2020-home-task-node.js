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
Object.defineProperty(exports, "__esModule", { value: true });
var axiosInstance_1 = __importDefault(require("../utils/axiosInstance"));
var axios_retry_1 = __importDefault(require("axios-retry"));
var github_api_1 = require("../handlers/github-api");
axios_retry_1.default(axiosInstance_1.default, { retries: 4 });
// Получение сохраненных настроек
exports.getSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var settings, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance_1.default.get('/conf')];
            case 1:
                settings = (_a.sent()).data.data;
                if (Object.keys(settings).length === 0) {
                    res.status(200).json({
                        result: 'success',
                        data: false
                    });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    result: 'success',
                    data: settings
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(504).json({
                    result: 'fail',
                    message: error_1.message,
                    reason: 'Не удалось получить сохраненный конфиг',
                });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Сохранение настроек
exports.postSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var settings, error_2, lastCommit, postBuild, error_3, currentTime_1, intervalId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                settings = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axiosInstance_1.default.post('/conf', settings)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Не удалось сохранить новые настройки');
                return [2 /*return*/, res.status(500).json({
                        result: 'fail',
                        message: error_2.message,
                        reason: 'Не удалось сохранить новые настройки'
                    })];
            case 4: return [4 /*yield*/, github_api_1.getLastCommit(settings.repoName)];
            case 5:
                lastCommit = _a.sent();
                postBuild = __assign(__assign({}, lastCommit), { branchName: settings.mainBranch });
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, axiosInstance_1.default.post('/build/request', postBuild)];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                console.error(error_3.message);
                return [2 /*return*/, res.status(500).json({
                        result: 'fail',
                        message: error_3.message,
                        reason: 'Ошибка при добавлении последнего коммита в очередь'
                    })];
            case 9:
                if (settings.period > 0) {
                    currentTime_1 = (new Date()).toISOString();
                    intervalId = void 0;
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    intervalId = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var newCommits, _i, newCommits_1, commit, postBuild_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, github_api_1.getAllCommits(settings.repoName, currentTime_1)];
                                case 1:
                                    newCommits = _a.sent();
                                    if (!(newCommits.length > 0)) return [3 /*break*/, 5];
                                    newCommits = newCommits.reverse();
                                    _i = 0, newCommits_1 = newCommits;
                                    _a.label = 2;
                                case 2:
                                    if (!(_i < newCommits_1.length)) return [3 /*break*/, 5];
                                    commit = newCommits_1[_i];
                                    postBuild_1 = __assign(__assign({}, commit), { branchName: settings.mainBranch });
                                    return [4 /*yield*/, axiosInstance_1.default.post('/build/request', postBuild_1)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5:
                                    currentTime_1 = (new Date()).toISOString();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, settings.period * 60000);
                }
                res.status(200).json({
                    result: 'success'
                });
                return [2 /*return*/];
        }
    });
}); };
