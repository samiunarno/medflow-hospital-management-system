import express from 'express';
import { register, login, getPendingUsers, approveUser } from '../controllers/authController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin/pending-users', authenticate, authorize(['Admin']), getPendingUsers);
router.post('/admin/approve-user/:id', authenticate, authorize(['Admin']), approveUser);

export default router;
