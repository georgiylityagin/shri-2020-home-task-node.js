const express = require('express');
const router = express.Router();

const { startBuild } = require('../controllers/build-controller');

router.post('/build', startBuild);

module.exports = router;
