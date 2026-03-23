import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import Routes
import authRoutes from './server/routes/authRoutes';
import patientRoutes from './server/routes/patientRoutes';
import doctorRoutes from './server/routes/doctorRoutes';
import bedRoutes from './server/routes/bedRoutes';
import pharmacyRoutes from './server/routes/pharmacyRoutes';
import analyticsRoutes from './server/routes/analyticsRoutes';
import departmentRoutes from './server/routes/departmentRoutes';
import Department from './server/models/Department';
import User from './server/models/User';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.warn('MONGODB_URI not found in environment. Backend will not function correctly without a database connection.');
  }

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/beds', bedRoutes);
  app.use('/api/pharmacy', pharmacyRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/departments', departmentRoutes);

  // Seed Departments if empty
  const seedDepartments = async () => {
    const count = await Department.countDocuments();
    if (count === 0) {
      const depts = [
        { name: 'Cardiology', description: 'Heart and blood vessel care' },
        { name: 'Neurology', description: 'Brain and nervous system care' },
        { name: 'Orthopedics', description: 'Bone and joint care' },
        { name: 'Pediatrics', description: 'Children health care' },
        { name: 'Emergency', description: 'Urgent and critical care' }
      ];
      await Department.insertMany(depts);
      console.log('Seeded initial departments');
    }
  };

  // Seed Admin User if empty
  const seedAdmin = async () => {
    const count = await User.countDocuments();
    if (count === 0) {
      const admin = new User({
        username: 'admin',
        password: 'password123',
        role: 'Admin',
        status: 'Approved'
      });
      await admin.save();
      console.log('Seeded initial admin user: admin / password123');
    }
  };

  if (mongoose.connection.readyState === 1) {
    seedDepartments();
    seedAdmin();
  } else {
    mongoose.connection.once('open', () => {
      seedDepartments();
      seedAdmin();
    });
  }

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MedFlow Server running at http://localhost:${PORT}`);
  });
}

startServer();
