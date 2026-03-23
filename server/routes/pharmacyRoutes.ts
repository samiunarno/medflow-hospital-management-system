import express from 'express';
import { getMedicines, createMedicine, getPrescriptions, dispensePrescription } from '../controllers/pharmacyController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/medicines', authenticate, getMedicines);
router.post('/medicines', authenticate, authorize(['Admin', 'Staff']), createMedicine);
router.get('/prescriptions', authenticate, getPrescriptions);
router.post('/prescriptions/:id/dispense', authenticate, authorize(['Admin', 'Staff']), dispensePrescription);

export default router;
