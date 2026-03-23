import express from 'express';
import { getBeds, assignBed, dischargePatient } from '../controllers/bedController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getBeds);
router.post('/assign', authenticate, authorize(['Admin', 'Staff']), assignBed);
router.post('/discharge', authenticate, authorize(['Admin', 'Staff', 'Doctor']), dischargePatient);

export default router;
