import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  associated_ward_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Department', departmentSchema);
