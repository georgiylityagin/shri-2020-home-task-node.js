const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers');

router.get('/builds', controllers.getBuilds);
router.post('/builds/:commitHash', express.json(), controllers.postCommitHash);
router.get('/builds/:buildId', controllers.getBuildId);
router.get('/builds/:buildId/logs', controllers.getLogs);

router.get('/settings', controllers.getSettings);
router.post('/settings', express.json(), controllers.postSettings);

exports.router = router;
