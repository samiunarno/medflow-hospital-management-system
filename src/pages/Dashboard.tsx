import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import DoctorDashboard from '../components/dashboards/DoctorDashboard';
import PatientDashboard from '../components/dashboards/PatientDashboard';
import StaffDashboard from '../components/dashboards/StaffDashboard';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any>([]);
  const [pendingUsers, setPendingUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const [statsRes, trendsRes, pendingRes] = await Promise.all([
        fetch('/api/analytics/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/analytics/inpatient-trends', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/pending-users', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (trendsRes.ok) setTrends(await trendsRes.json());
      if (pendingRes.ok) setPendingUsers(await pendingRes.json());
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/approve-user/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setPendingUsers(pendingUsers.filter((u: any) => u._id !== id));
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  switch (user?.role) {
    case 'Admin':
      return (
        <AdminDashboard 
          stats={stats} 
          trends={trends} 
          pendingUsers={pendingUsers} 
          onApprove={handleApprove} 
        />
      );
    case 'Doctor':
      return <DoctorDashboard user={user} />;
    case 'Patient':
      return <PatientDashboard user={user} />;
    case 'Staff':
      return <StaffDashboard user={user} stats={stats} />;
    default:
      return (
        <div className="bg-white p-12 rounded-[3rem] text-center shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to MedFlow</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Your account is currently being reviewed by our administrators. You will receive access once approved.
          </p>
        </div>
      );
  }
}
