import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Trash2, 
  LogOut, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const { user, token, logout } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate upload
    setTimeout(async () => {
      try {
        const res = await fetch('/api/auth/upload-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id_card_url: 'https://picsum.photos/seed/id/800/500' })
        });
        if (res.ok) {
          setUploadSuccess(true);
        }
      } catch (err) {
        console.error('Upload failed');
      } finally {
        setIsUploading(false);
      }
    }, 1500);
  };

  const handleAccountRequest = async (action: 'deactivate' | 'delete') => {
    if (!window.confirm(`Are you sure you want to request account ${action}?`)) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/request-account-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        setRequestStatus(`Your ${action} request has been sent to the admin.`);
      }
    } catch (err) {
      console.error('Request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Account Settings</h1>
            <p className="text-gray-500 font-medium">Manage your identity and account status.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-[2rem] p-8 text-center">
            <div className="w-24 h-24 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center text-blue-400 text-4xl font-display font-bold mx-auto mb-6">
              {user?.username[0].toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user?.username}</h2>
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-6">{user?.role}</p>
            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] font-bold px-4 py-2 bg-green-500/10 text-green-400 rounded-full uppercase tracking-widest">
                Active Session
              </span>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full flex items-center justify-between p-6 bg-red-600/5 border border-red-500/10 rounded-2xl text-red-400 hover:bg-red-600 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-widest">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        </div>

        {/* Main Settings */}
        <div className="md:col-span-2 space-y-8">
          {/* ID Verification Section */}
          <section className="bg-white/2 border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Identity Verification</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Required for all users to ensure system security.</p>
              </div>
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div className="p-8 space-y-6">
              {uploadSuccess ? (
                <div className="flex items-center gap-4 p-6 bg-green-500/5 border border-green-500/20 rounded-2xl">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Verification Pending</p>
                    <p className="text-xs text-gray-500">Your ID has been uploaded and is awaiting admin review.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-orange-400">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-xs font-bold uppercase tracking-widest">Action Required</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Please upload a clear photo of your Passport or National ID card. This is required for administrative verification.
                  </p>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-3xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all cursor-pointer group">
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="w-8 h-8 text-gray-600 group-hover:text-blue-400 transition-colors" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Click to upload Passport/NID</span>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={handleIdUpload} disabled={isUploading} />
                  </label>
                </div>
              )}
            </div>
          </section>

          {/* Account Actions Section */}
          <section className="bg-white/2 border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Account Management</h3>
              <p className="text-xs text-gray-500 font-medium mt-1">Deactivate or permanently delete your account.</p>
            </div>
            <div className="p-8 space-y-6">
              {requestStatus ? (
                <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl text-blue-400 text-sm font-bold text-center uppercase tracking-widest">
                  {requestStatus}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleAccountRequest('deactivate')}
                    disabled={isSubmitting}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Deactivate</h4>
                    <p className="text-[10px] text-gray-500 font-medium">Temporarily disable your account access.</p>
                  </button>

                  <button 
                    onClick={() => handleAccountRequest('delete')}
                    disabled={isSubmitting}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-red-600/10 hover:border-red-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Delete Account</h4>
                    <p className="text-[10px] text-gray-500 font-medium">Permanently remove all your data from MedFlow.</p>
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
