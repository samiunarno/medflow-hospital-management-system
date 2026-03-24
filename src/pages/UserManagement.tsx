import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  Users, 
  Search, 
  Plus, 
  UserPlus, 
  Shield, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  XCircle, 
  MoreVertical,
  X,
  Loader2,
  Lock,
  FileCheck,
  UserX,
  AlertTriangle,
  Ban,
  Download,
  Mail,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function UserManagement() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Staff',
    status: 'Approved'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/auth/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingUser ? `/api/auth/admin/users/${editingUser._id}` : '/api/auth/admin/users';
      const method = editingUser ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchUsers();
        setFormData({ username: '', password: '', role: 'Staff', status: 'Approved' });
        setEditingUser(null);
      }
    } catch (err) {
      console.error('Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/auth/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error('Failed to delete user');
    }
  };

  const handleAccountRequest = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/auth/admin/handle-account-request/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error('Failed to handle account request');
    }
  };

  const handleBanUser = async (id: string, isBanned: boolean) => {
    try {
      const res = await fetch(`/api/auth/admin/ban-user/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isBanned })
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error('Failed to ban/unban user');
    }
  };

  const handleApproveUser = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`/api/auth/admin/approve-user/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error('Failed to approve/reject user');
    }
  };

  const exportToCSV = () => {
    const headers = ['Username', 'Email', 'Full Name', 'Role', 'Status', 'Banned', 'Age', 'Gender', 'Phone', 'Address'];
    const csvContent = [
      headers.join(','),
      ...users.map(u => [
        u.username,
        u.email,
        u.fullName || '',
        u.role,
        u.status,
        u.isBanned ? 'Yes' : 'No',
        u.age || '',
        u.gender || '',
        u.phone || '',
        `"${u.address || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `medflow_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '', // Don't show password
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) || 
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">User Management</h1>
          <p className="text-gray-500 font-medium">Control system access and user roles.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-white/5 text-gray-400 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all border border-white/10"
          >
            <Download className="w-5 h-5" />
            Export Data Sheet
          </button>
          <button 
            onClick={() => {
              setEditingUser(null);
              setFormData({ username: '', password: '', role: 'Staff', status: 'Approved' });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <UserPlus className="w-5 h-5" />
            Create New User
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white/2 p-4 rounded-3xl border border-white/5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search users by name or role..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/2 rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="px-8 py-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">User Profile</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Contact Info</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Role & Status</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Verification</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                    Loading system users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-500">No users found matching your search.</td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className={`hover:bg-white/2 transition-colors group ${u.isBanned ? 'opacity-50 grayscale' : ''}`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                          u.role === 'Admin' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/20' :
                          u.role === 'Doctor' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' :
                          'bg-green-600/20 text-green-400 border border-green-500/20'
                        }`}>
                          {u.fullName ? u.fullName[0].toUpperCase() : u.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white flex items-center gap-2">
                            {u.fullName || u.username}
                            {u.isBanned && <Ban className="w-3 h-3 text-red-500" />}
                          </p>
                          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-3 h-3" />
                          <span className="text-[10px] font-bold">{u.email}</span>
                        </div>
                        {u.phone && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Lock className="w-3 h-3" />
                            <span className="text-[10px] font-bold">{u.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className={`w-4 h-4 ${u.role === 'Admin' ? 'text-purple-400' : 'text-blue-400'}`} />
                          <span className={`text-xs font-bold uppercase tracking-widest ${u.role === 'Admin' ? 'text-purple-400' : 'text-white'}`}>
                            {u.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            u.status === 'Approved' ? 'bg-green-500' :
                            u.status === 'Pending' ? 'bg-orange-500' :
                            'bg-red-500'
                          }`} />
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${
                            u.status === 'Approved' ? 'text-green-400' :
                            u.status === 'Pending' ? 'text-orange-400' :
                            'text-red-400'
                          }`}>
                            {u.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        {u.id_card_url ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <FileCheck className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-orange-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Unverified</span>
                          </div>
                        )}
                        {u.account_request !== 'none' && u.account_request_status === 'pending' && (
                          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20">
                            <UserX className="w-3 h-3" />
                            <span className="text-[8px] font-bold uppercase tracking-widest">{u.account_request} Request</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {u.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleApproveUser(u._id, 'Approved')}
                              className="p-2 hover:bg-green-600/10 text-green-400 rounded-lg transition-all"
                              title="Approve User"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleApproveUser(u._id, 'Rejected')}
                              className="p-2 hover:bg-red-600/10 text-red-400 rounded-lg transition-all"
                              title="Reject User"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {u.account_request !== 'none' && u.account_request_status === 'pending' && (
                          <button 
                            onClick={() => handleAccountRequest(u._id, 'approved')}
                            className="p-2 hover:bg-orange-600/10 text-orange-400 rounded-lg transition-all"
                            title="Handle Account Request"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleBanUser(u._id, !u.isBanned)}
                          className={`p-2 rounded-lg transition-all ${u.isBanned ? 'bg-red-600 text-white' : 'hover:bg-red-600/10 text-gray-500 hover:text-red-400'}`}
                          title={u.isBanned ? 'Unban User' : 'Ban User'}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(u)}
                          className="p-2 hover:bg-blue-600/10 text-gray-500 hover:text-blue-400 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(u._id)}
                          disabled={u.username === 'admin'}
                          className="p-2 hover:bg-red-600/10 text-gray-500 hover:text-red-400 rounded-lg transition-all disabled:opacity-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                      {editingUser ? 'Edit User' : 'Create User'}
                    </h2>
                    <p className="text-gray-500 text-sm font-medium">Configure system access credentials.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/5"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Username</label>
                    <input
                      type="text"
                      required
                      placeholder="ENTER USERNAME"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">
                      {editingUser ? 'New Password (Optional)' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type="password"
                        required={!editingUser}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="Admin" className="bg-[#0a0a0a]">ADMIN</option>
                        <option value="Doctor" className="bg-[#0a0a0a]">DOCTOR</option>
                        <option value="Staff" className="bg-[#0a0a0a]">STAFF</option>
                        <option value="Patient" className="bg-[#0a0a0a]">PATIENT</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="Approved" className="bg-[#0a0a0a]">APPROVED</option>
                        <option value="Pending" className="bg-[#0a0a0a]">PENDING</option>
                        <option value="Rejected" className="bg-[#0a0a0a]">REJECTED</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-white/5 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {submitting ? 'Processing...' : editingUser ? 'Update User' : 'Authorize User'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
