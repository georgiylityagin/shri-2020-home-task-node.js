const express = require('express');
const router = express.Router();

const buildControllers = require("../controllers/build");
const settingsControllers = require("../controllers/settings");

router.get("/builds", buildControllers.getBuilds);
router.post("/builds/:commitHash", express.json(), buildControllers.postCommitHash);
router.get("/builds/:buildId", buildControllers.getBuildId);
router.get("/builds/:buildId/logs", buildControllers.getLogs);

router.get("/settings", settingsControllers.getSetting);
router.post("/settings", express.json(), settingsControllers.postSetting);

exports.router = router;
