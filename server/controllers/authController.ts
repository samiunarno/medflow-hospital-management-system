import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'medflow-secret-key-2026';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, reference_id, fullName, gender, age, address, phone, patientType, doctorType } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or Email already exists' });
    }
    const user = new User({ 
      username, 
      email, 
      password, 
      role, 
      reference_id, 
      fullName, 
      gender, 
      age, 
      address, 
      phone, 
      patientType, 
      doctorType,
      status: 'Pending' // New users must be approved by admin
    });
    await user.save();
    res.status(201).json({ message: 'Registration successful. Your account is pending admin approval.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: any = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.isBanned) {
      return res.status(403).json({ error: 'Your account has been banned. Please contact support.' });
    }
    if (user.status !== 'Approved') {
      return res.status(403).json({ error: `Your account is ${user.status.toLowerCase()}. Please contact admin.` });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role, email: user.email, fullName: user.fullName } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ status: 'Pending' });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await User.findByIdAndUpdate(id, { status });
    res.json({ message: `User ${status.toLowerCase()} successfully` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role, status } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const user = new User({ username, password, role, status: status || 'Approved' });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, role, status, password } = req.body;
    const updateData: any = { username, role, status };
    if (password) {
      const user: any = await User.findById(id);
      user.password = password;
      await user.save();
      return res.json({ message: 'User updated successfully (including password)' });
    }
    await User.findByIdAndUpdate(id, updateData);
    res.json({ message: 'User updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadIdCard = async (req: any, res: Response) => {
  try {
    const { id_card_url } = req.body;
    await User.findByIdAndUpdate(req.user.id, { 
      id_card_url, 
      id_card_uploaded_at: new Date() 
    });
    res.json({ message: 'ID Card uploaded successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const requestAccountAction = async (req: any, res: Response) => {
  try {
    const { action } = req.body; // 'deactivate' or 'delete'
    await User.findByIdAndUpdate(req.user.id, { 
      account_request: action,
      account_request_status: 'pending'
    });
    res.json({ message: `Account ${action} request submitted to admin` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handleAccountRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    const user: any = await User.findById(id);
    
    if (status === 'approved') {
      if (user.account_request === 'delete') {
        await User.findByIdAndDelete(id);
        return res.json({ message: 'User deleted as requested' });
      } else if (user.account_request === 'deactivate') {
        await User.findByIdAndUpdate(id, { 
          status: 'Rejected', // Deactivated users are set to Rejected status
          account_request: 'none',
          account_request_status: 'approved'
        });
        return res.json({ message: 'User deactivated as requested' });
      }
    } else {
      await User.findByIdAndUpdate(id, { 
        account_request: 'none',
        account_request_status: 'rejected'
      });
      res.json({ message: 'Account request rejected' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const banUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;
    await User.findByIdAndUpdate(id, { isBanned });
    res.json({ message: `User ${isBanned ? 'banned' : 'unbanned'} successfully` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const rateDoctor = async (req: any, res: Response) => {
  try {
    const { doctorId, rating, comment } = req.body;
    const doctor: any = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const existingRatingIndex = doctor.ratings.findIndex((r: any) => r.raterId.toString() === req.user.id);
    if (existingRatingIndex > -1) {
      doctor.ratings[existingRatingIndex] = { raterId: req.user.id, rating, comment, createdAt: new Date() };
    } else {
      doctor.ratings.push({ raterId: req.user.id, rating, comment, createdAt: new Date() });
    }

    const totalRating = doctor.ratings.reduce((acc: number, r: any) => acc + r.rating, 0);
    doctor.averageRating = totalRating / doctor.ratings.length;
    
    await doctor.save();
    res.json({ message: 'Rating submitted successfully', averageRating: doctor.averageRating });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { fullName, gender, age, address, phone, patientType, doctorType, password } = req.body;
    const user: any = await User.findById(req.user.id);
    
    if (fullName) user.fullName = fullName;
    if (gender) user.gender = gender;
    if (age) user.age = age;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (patientType) user.patientType = patientType;
    if (doctorType) user.doctorType = doctorType;
    
    if (password) {
      user.password = password;
    }
    
    await user.save();
    res.json({ message: 'Profile updated successfully', user: { id: user._id, username: user.username, role: user.role, email: user.email, fullName: user.fullName } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
