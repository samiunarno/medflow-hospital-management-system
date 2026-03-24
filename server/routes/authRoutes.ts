import express from 'express';
import { register, login, getPendingUsers, approveUser, getAllUsers, createUser, updateUser, deleteUser } from '../controllers/authController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Admin Routes
router.get('/admin/pending-users', authenticate, authorize(['Admin']), getPendingUsers);
router.post('/admin/approve-user/:id', authenticate, authorize(['Admin']), approveUser);
router.get('/admin/users', authenticate, authorize(['Admin']), getAllUsers);
router.post('/admin/users', authenticate, authorize(['Admin']), createUser);
router.put('/admin/users/:id', authenticate, authorize(['Admin']), updateUser);
router.delete('/admin/users/:id', authenticate, authorize(['Admin']), deleteUser);

export default router;
