import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find().populate('department_id').populate('current_bed_id');
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
