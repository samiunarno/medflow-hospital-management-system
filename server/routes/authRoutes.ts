import express from 'express';
import { 
  register, 
  login, 
  getPendingUsers, 
  approveUser, 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  uploadIdCard, 
  requestAccountAction, 
  handleAccountRequest,
  banUser,
  rateDoctor,
  updateProfile
} from '../controllers/authController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// User Routes
router.post('/upload-id', authenticate, uploadIdCard);
router.post('/request-account-action', authenticate, requestAccountAction);
router.put('/profile', authenticate, updateProfile);
router.post('/rate-doctor', authenticate, rateDoctor);

export default router;
