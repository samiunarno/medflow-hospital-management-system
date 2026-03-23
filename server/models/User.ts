import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'Admin' | 'Doctor' | 'Patient' | 'Staff';
  reference_id?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Doctor', 'Patient', 'Staff'], required: true },
  reference_id: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre<IUser>('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
