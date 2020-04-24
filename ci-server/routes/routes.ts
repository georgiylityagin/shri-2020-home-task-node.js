import express from 'express';
import { getSettings, postSettings } from '../controllers/settings';
import {
  getBuilds,
  postCommitHash,
  getBuildId,
  getLogs
} from '../controllers/build';


const router = express.Router();

router.get('/builds', getBuilds);
router.post('/builds/:commitHash', postCommitHash);
router.get('/builds/:buildId', getBuildId);
router.get('/builds/:buildId/logs', getLogs);

router.get('/settings', getSettings);
router.post('/settings', postSettings);

export default router;