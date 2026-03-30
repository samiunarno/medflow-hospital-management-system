import express from 'express';
import { getStats, getInpatientTrends } from '../controllers/analyticsController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/stats', authenticate, authorize(['Admin', 'Staff']), getStats);
router.get('/inpatient-trends', authenticate, authorize(['Admin', 'Staff']), getInpatientTrends);

export default router;
