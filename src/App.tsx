import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Pharmacy from './pages/Pharmacy';
import Wards from './pages/Wards';
import Analytics from './pages/Analytics';
import MedicalRecords from './pages/MedicalRecords';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Search from './pages/Search';
import VideoConference from './pages/VideoConference';

function PrivateRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute roles={['Admin', 'Doctor', 'Staff']}><Patients /></PrivateRoute>} />
          <Route path="/doctors" element={<PrivateRoute roles={['Admin', 'Staff']}><Doctors /></PrivateRoute>} />
          <Route path="/wards" element={<PrivateRoute roles={['Admin', 'Staff']}><Wards /></PrivateRoute>} />
          <Route path="/pharmacy" element={<PrivateRoute roles={['Admin', 'Staff', 'Doctor']}><Pharmacy /></PrivateRoute>} />
          <Route path="/records" element={<PrivateRoute roles={['Admin', 'Doctor', 'Patient']}><MedicalRecords /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute roles={['Admin']}><Analytics /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute roles={['Admin']}><UserManagement /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/video-conference" element={<PrivateRoute><VideoConference /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
