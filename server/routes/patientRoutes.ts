import express from 'express';
import { getPatients, createPatient, updatePatient, deletePatient } from '../controllers/patientController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getPatients);
router.post('/', authenticate, authorize(['Admin', 'Staff']), createPatient);
router.put('/:id', authenticate, authorize(['Admin', 'Staff', 'Doctor']), updatePatient);
router.delete('/:id', authenticate, authorize(['Admin']), deletePatient);

export default router;
