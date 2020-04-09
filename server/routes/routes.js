const express = require('express');
const router = express.Router();
process.conf = {};

// const controllers = require('../controllers/controllers');
const { getSettings, postSettings } = require('../controllers/settings');
const { getBuilds, postCommitHash, getBuildId, getLogs } = require('../controllers/build');

router.get('/builds', getBuilds);
router.post('/builds/:commitHash', express.json(), postCommitHash);
router.get('/builds/:buildId', getBuildId);
router.get('/builds/:buildId/logs', getLogs);

router.get('/settings', getSettings);
router.post('/settings', express.json(), postSettings);

exports.router = router;
