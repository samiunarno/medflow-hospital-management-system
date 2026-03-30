import { Request, Response } from 'express';
import Doctor from '../models/Doctor';
import User from '../models/User';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().populate('department_id').lean();
    const doctorsWithUser = await Promise.all(doctors.map(async (doc: any) => {
      const user = await User.findOne({ role: 'Doctor', reference_id: doc.doctor_id });
      return { ...doc, user_id: user?._id };
    }));
    res.json(doctorsWithUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getApprovedDoctors = async (req: Request, res: Response) => {
  try {
    const approvedDoctors = await User.find({ 
      role: 'Doctor', 
      status: 'Approved', 
      isBanned: false 
    }).select('-password');
    res.json(approvedDoctors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
