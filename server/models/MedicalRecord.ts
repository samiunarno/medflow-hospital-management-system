import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  type: { type: String, enum: ['Diagnosis', 'Treatment', 'Lab Result', 'Surgery'], required: true },
  date: { type: Date, default: Date.now },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MedicalRecord', medicalRecordSchema);
