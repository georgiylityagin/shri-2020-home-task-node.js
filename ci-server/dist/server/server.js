"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("../routes/routes"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/api', routes_1.default);
app.listen(3000, function (err) {
    if (err) {
        console.error(err);
    }
    console.log('CI-server is listening on port 3000');
});
