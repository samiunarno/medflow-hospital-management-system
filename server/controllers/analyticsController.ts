import { Request, Response } from 'express';
import Patient from '../models/Patient';
import Bed from '../models/Bed';
import Department from '../models/Department';
import Doctor from '../models/Doctor';

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalBeds = await Bed.countDocuments();
    const occupiedBeds = await Bed.countDocuments({ status: 'Occupied' });
    const totalDepartments = await Department.countDocuments();

    res.json({
      totalPatients,
      totalDoctors,
      totalBeds,
      occupiedBeds,
      totalDepartments,
      bedOccupancy: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInpatientTrends = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find({ type: 'Inpatient' });
    const trends: any = {};
    patients.forEach(p => {
      if (p.admission_date) {
        const date = p.admission_date.toISOString().split('T')[0];
        trends[date] = (trends[date] || 0) + 1;
      }
    });
    const sortedTrends = Object.keys(trends).sort().map(date => ({
      date,
      count: trends[date]
    }));
    res.json(sortedTrends);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
