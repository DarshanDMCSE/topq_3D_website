/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Dedicated Standalone Admin Portal
 * Accessible at /admin and /admin/
 * Completely separate from the public marketing pages.
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Shield,
  Layers,
  Sparkles,
  Laptop,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
  LogOut,
  ExternalLink,
  ChevronRight,
  Database,
  FileSpreadsheet,
  Lock,
  KeyRound,
  LogIn,
  AlertCircle,
  ShieldAlert,
  Eye,
  EyeOff,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ExcelExportModal } from '../components/ExcelExportModal';
import { useRouter } from '../lib/router';
import { MountainBackground } from '../components/MountainBackground';

export const AdminPage: React.FC = () => {
  const { user, profile, session, login, logout, loading: authLoading } = useAuth();
  const { navigate } = useRouter();

  // Admin authentication form states
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Admin data states
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [guidance, setGuidance] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enrollments' | 'users' | 'leads' | 'guidance'>('enrollments');
  const [searchTerm, setSearchTerm] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Course Enrollments
      const { data: enrollData } = await supabase
        .from('course_enrollments')
        .select('*')
        .order('created_at', { ascending: false });
      if (enrollData) setEnrollments(enrollData);

      // 2. Fetch Contact Leads
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (leadsData) setLeads(leadsData);

      // 3. Fetch Guidance Requests
      const { data: guidanceData } = await supabase
        .from('guidance_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (guidanceData) setGuidance(guidanceData);

      // 4. Fetch User Registrations
      const { data: regData } = await supabase
        .from('user_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      if (regData) setRegistrations(regData);
    } catch (err) {
      console.warn('Admin load note:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session || user) {
      fetchAllData();
    }
  }, [session, user]);

  const isTopQAdmin = (email?: string | null, role?: string | null) => {
    if (role === 'admin') return true;
    if (!email) return false;
    const em = email.toLowerCase().trim();
    return (
      em === 'topq@gmail.com' ||
      em === 'topq@123gmail.com' ||
      em === 'topq123@gmail.com' ||
      em === 'admin@topq.ai' ||
      em.includes('admin') ||
      em.startsWith('topq')
    );
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!adminEmail.trim() || !adminPassword) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setIsAuthenticating(true);
    const res = await login(adminEmail, adminPassword);
    setIsAuthenticating(false);

    if (res.error) {
      setAuthError(res.error);
    } else {
      // Check if user is a TopQ Administrator: strictly disallow students / regular users
      const isAdm = isTopQAdmin(adminEmail, profile?.role);
      if (!isAdm) {
        await logout();
        setAuthError('Access Denied: Student & user accounts are not permitted. Only authorized TopQ Admins may access the Admin Portal.');
        return;
      }
      fetchAllData();
    }
  };

  // Filter list by search term
  const filterList = (list: any[]) => {
    if (!searchTerm.trim()) return list;
    const term = searchTerm.toLowerCase();
    return list.filter((item) => {
      const name = (item.user_name || item.name || '').toLowerCase();
      const email = (item.user_email || item.email || '').toLowerCase();
      const phone = (item.user_phone || item.phone || '').toLowerCase();
      const course = (item.course_track || item.course || item.track || '').toLowerCase();
      return name.includes(term) || email.includes(term) || phone.includes(term) || course.includes(term);
    });
  };

  const filteredEnrollments = filterList(enrollments);
  const filteredRegistrations = filterList(registrations);
  const filteredLeads = filterList(leads);
  const filteredGuidance = filterList(guidance);

  // 1. If NOT authenticated via Supabase, show dedicated Admin Login Gate
  if (!session && !user) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-center p-4 selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
        {/* 3D Mountain Animation background */}
        <MountainBackground isDark={true} />

        <div className="w-full max-w-md bg-[#0a0a0d]/95 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-950/20 space-y-6 relative overflow-hidden backdrop-blur-xl">
          {/* Emerald accent bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Restricted to TopQ Administrators</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              TopQ Admin Portal
            </h1>
            <p className="text-xs text-zinc-400">
              Enter your TopQ Administrator credentials to access cohorts, enrollments, and data exports.
            </p>
          </div>

          {/* Error Alert */}
          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="topq@gmail.com"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-600 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password (e.g. topq@123)"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-600 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white transition-all shadow-lg shadow-emerald-600/30 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <span>Authenticating via Supabase...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Unlock Admin Console</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Return to website */}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
            <button
              onClick={() => navigate('/')}
              className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
            <span className="text-[10px] text-emerald-400 font-mono">Supabase Auth Live</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. If authenticated as a STUDENT / regular user (NOT a TopQ Admin), strictly DENY access
  const currentUserEmail = user?.email || profile?.email;
  const isAuthorizedAdmin = isTopQAdmin(currentUserEmail, profile?.role);

  if (!isAuthorizedAdmin) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-center p-4 selection:bg-rose-500/30 selection:text-rose-300 font-sans">
        <MountainBackground isDark={true} />

        <div className="w-full max-w-md bg-[#0a0a0d]/95 border border-rose-900/40 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-rose-950/30 space-y-6 relative overflow-hidden backdrop-blur-xl text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Shield className="w-3.5 h-3.5" />
              <span>Restricted to TopQ Administrators</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Access Restricted
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You are currently signed in as <span className="font-mono text-zinc-200 font-bold">{currentUserEmail}</span> (Student Account). The TopQ Admin Console is strictly reserved for authorized administrators only.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              <span>Go to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={async () => {
                await logout();
              }}
              className="w-full py-2.5 px-4 rounded-xl font-semibold border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out &amp; Log In as Admin</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors pt-2 cursor-pointer"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* 1. DEDICATED ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Admin Header & Brand */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/25">
                TQ
              </div>
              <div>
                <h2 className="text-sm font-black tracking-tight uppercase text-white flex items-center gap-1.5">
                  <span>TopQ Admin</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Console
                  </span>
                </h2>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'enrollments'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4" />
                <span>Course Enrollments</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'enrollments' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {enrollments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Registered Users</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'users' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {registrations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4" />
                <span>Contact Leads</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('guidance')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'guidance'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Guidance Inquiries</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'guidance' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {guidance.length}
              </span>
            </button>
          </nav>

          {/* Quick Excel Action */}
          <div className="px-3 pt-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-emerald-400 border border-slate-700 font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Return to Website & Admin Profile */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Public Website</span>
          </button>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                A
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] truncate">{profile?.name || user?.email?.split('@')[0] || 'Administrator'}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{profile?.email || user?.email || 'admin@topq.ai'}</div>
              </div>
            </div>

            <button
              onClick={async () => {
                await logout();
              }}
              title="Lock Admin Console / Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN ADMIN CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Console</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-white capitalize">
              {activeTab === 'enrollments'
                ? 'Course Enrollments'
                : activeTab === 'users'
                ? 'Registered Student Accounts'
                : activeTab === 'leads'
                ? 'Contact Leads'
                : 'Guidance Consultations'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, phone, course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            {/* Refresh */}
            <button
              onClick={fetchAllData}
              title="Refresh database"
              className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Download Excel Button */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="py-2 px-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Excel</span>
            </button>
          </div>
        </header>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 4 Stat Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('enrollments')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'enrollments'
                  ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Course Enrollments</span>
                <GraduationCap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1.5">{enrollments.length}</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Confirmed cohorts</div>
            </div>

            <div
              onClick={() => setActiveTab('users')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-blue-500/10 border-blue-500/40 ring-1 ring-blue-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Registered Students</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1.5">{registrations.length}</div>
              <div className="text-[10px] text-blue-400 font-semibold mt-0.5">Active profiles</div>
            </div>

            <div
              onClick={() => setActiveTab('leads')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Contact Inquiries</span>
                <Phone className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1.5">{leads.length}</div>
              <div className="text-[10px] text-amber-400 font-semibold mt-0.5">Landing page leads</div>
            </div>

            <div
              onClick={() => setActiveTab('guidance')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'guidance'
                  ? 'bg-purple-500/10 border-purple-500/40 ring-1 ring-purple-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Guidance Consultations</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1.5">{guidance.length}</div>
              <div className="text-[10px] text-purple-400 font-semibold mt-0.5">Syllabus downloads</div>
            </div>
          </div>

          {/* Active Data Table Container */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* TAB 1: COURSE ENROLLMENTS */}
            {activeTab === 'enrollments' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3.5">Student Name</th>
                      <th className="px-5 py-3.5">Contact Details</th>
                      <th className="px-5 py-3.5">Course Pathway</th>
                      <th className="px-5 py-3.5">Mode</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Enrolled Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredEnrollments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                          No course enrollments found yet.
                        </td>
                      </tr>
                    ) : (
                      filteredEnrollments.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-white">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                                {(item.user_name || item.name || 'S')[0]?.toUpperCase()}
                              </div>
                              <div>
                                <div>{item.user_name || item.name}</div>
                                <div className="text-[10px] text-slate-400 font-normal capitalize">
                                  {item.experience || 'Beginner'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-slate-300">
                            <div>{item.user_email || item.email}</div>
                            <div className="text-emerald-400 font-mono text-[11px]">{item.user_phone || item.phone}</div>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-white">
                            {item.course_track || item.course}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 capitalize border border-slate-700">
                              {item.learning_mode === 'offline' ? (
                                <>
                                  <MapPin className="w-3 h-3 text-emerald-400" />
                                  <span>Mysore Campus</span>
                                </>
                              ) : (
                                <>
                                  <Laptop className="w-3 h-3 text-blue-400" />
                                  <span>Live Online</span>
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{item.status || 'Confirmed'}</span>
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">
                            {item.created_at ? new Date(item.created_at).toLocaleString() : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: REGISTERED USERS */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3.5">Student Account</th>
                      <th className="px-5 py-3.5">Email</th>
                      <th className="px-5 py-3.5">Phone</th>
                      <th className="px-5 py-3.5">Role</th>
                      <th className="px-5 py-3.5">Last Active</th>
                      <th className="px-5 py-3.5">Registered Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                          No registered user accounts found.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((u, idx) => (
                        <tr key={u.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-white flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                              {(u.name || 'U')[0]?.toUpperCase()}
                            </div>
                            <span>{u.name || 'Student'}</span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-300">{u.email}</td>
                          <td className="px-5 py-3.5 font-mono text-slate-300">{u.phone || 'N/A'}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === 'admin'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {u.role || 'student'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">
                            {u.last_login ? new Date(u.last_login).toLocaleString() : 'N/A'}
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: CONTACT LEADS */}
            {activeTab === 'leads' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3.5">Name</th>
                      <th className="px-5 py-3.5">Mobile Phone</th>
                      <th className="px-5 py-3.5">Interested Course</th>
                      <th className="px-5 py-3.5">Experience</th>
                      <th className="px-5 py-3.5">Submission Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                          No contact leads found.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-white">{item.name}</td>
                          <td className="px-5 py-3.5 font-mono text-emerald-400 font-semibold">{item.phone}</td>
                          <td className="px-5 py-3.5 text-slate-200">{item.course}</td>
                          <td className="px-5 py-3.5 capitalize">{item.experience}</td>
                          <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">
                            {item.created_at ? new Date(item.created_at).toLocaleString() : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 4: GUIDANCE CONSULTATIONS */}
            {activeTab === 'guidance' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3.5">Candidate</th>
                      <th className="px-5 py-3.5">Contact Details</th>
                      <th className="px-5 py-3.5">Requested Track</th>
                      <th className="px-5 py-3.5">Mode</th>
                      <th className="px-5 py-3.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredGuidance.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                          No guidance requests found.
                        </td>
                      </tr>
                    ) : (
                      filteredGuidance.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-white">{item.name}</td>
                          <td className="px-5 py-3.5">
                            <div className="text-emerald-400 font-mono">{item.phone}</div>
                            <div className="text-[11px] text-slate-400">{item.email || 'No email'}</div>
                          </td>
                          <td className="px-5 py-3.5 text-slate-200">{item.track}</td>
                          <td className="px-5 py-3.5 capitalize">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                              {item.learning_mode}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">
                            {item.created_at ? new Date(item.created_at).toLocaleString() : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Excel Export Modal (Asks past 24hrs, 1day ago, past 1week, custom date) */}
      <ExcelExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        enrollments={enrollments}
        leads={leads}
        guidance={guidance}
        registrations={registrations}
      />
    </div>
  );
};

