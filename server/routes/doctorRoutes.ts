import express from 'express';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getDoctors);
router.post('/', authenticate, authorize(['Admin']), createDoctor);
router.put('/:id', authenticate, authorize(['Admin']), updateDoctor);
router.delete('/:id', authenticate, authorize(['Admin']), deleteDoctor);

export default router;
