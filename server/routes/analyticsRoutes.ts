import express from 'express';
import { getStats, getInpatientTrends } from '../controllers/analyticsController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/stats', authenticate, authorize(['Admin']), getStats);
router.get('/inpatient-trends', authenticate, authorize(['Admin']), getInpatientTrends);

export default router;
