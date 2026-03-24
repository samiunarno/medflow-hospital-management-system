import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'medflow-secret-key-2026';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role, reference_id } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const user = new User({ username, password, role, reference_id, status: 'Approved' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully. You can now login.' });
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
    if (user.status !== 'Approved') {
      return res.status(403).json({ error: `Your account is ${user.status.toLowerCase()}. Please contact admin.` });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
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
