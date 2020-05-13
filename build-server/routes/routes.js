const express = require('express');
const router = express.Router();

const { notifyAgent, notifyBuildRes } = require('../controllers/agents');

router.post('/notify-agent', notifyAgent);
router.post('/notify-build-result', notifyBuildRes);

module.exports = router;
