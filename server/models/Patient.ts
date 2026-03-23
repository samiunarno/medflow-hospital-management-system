import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patient_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contact: { type: String, required: true },
  type: { type: String, enum: ['Outpatient', 'Inpatient'], required: true },
  current_bed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed' },
  admission_date: { type: Date },
  discharge_date: { type: Date },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Patient', patientSchema);
