import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Dispensed'], default: 'Pending' },
  medicines: [{
    medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    dosage: { type: String, required: true },
    duration: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Prescription', prescriptionSchema);
