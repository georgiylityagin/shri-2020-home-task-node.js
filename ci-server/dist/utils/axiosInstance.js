"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var https_1 = require("https");
exports.default = axios_1.default.create({
    baseURL: 'https://hw.shri.yandex/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + process.env.TOKEN
    },
    httpsAgent: new https_1.Agent({
        rejectUnauthorized: false
    })
});
