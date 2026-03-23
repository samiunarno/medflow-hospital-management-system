import { Request, Response } from 'express';
import Medicine from '../models/Medicine';
import Prescription from '../models/Prescription';

export const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await Medicine.find().populate('associated_department_id');
    res.json(medicines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patient_id')
      .populate('doctor_id')
      .populate('medicines.medicine_id');
    res.json(prescriptions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const dispensePrescription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prescription: any = await Prescription.findById(id).populate('medicines.medicine_id');
    if (!prescription || prescription.status === 'Dispensed') {
      return res.status(400).json({ error: 'Prescription not found or already dispensed' });
    }
    for (const item of prescription.medicines) {
      await Medicine.findByIdAndUpdate(item.medicine_id._id, { $inc: { stock_quantity: -1 } });
    }
    await Prescription.findByIdAndUpdate(id, { status: 'Dispensed' });
    res.json({ message: 'Prescription dispensed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
