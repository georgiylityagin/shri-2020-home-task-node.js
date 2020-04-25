"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var settings_1 = require("../controllers/settings");
var build_1 = require("../controllers/build");
var router = express_1.default.Router();
router.get('/builds', build_1.getBuilds);
router.post('/builds/:commitHash', build_1.postCommitHash);
router.get('/builds/:buildId', build_1.getBuildId);
router.get('/builds/:buildId/logs', build_1.getLogs);
router.get('/settings', settings_1.getSettings);
router.post('/settings', settings_1.postSettings);
exports.default = router;
