/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Student Dashboard Page (/dashboard)
 * Shows enrolled courses, learning progression, syllabus downloads, and cohort info.
 */

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Laptop,
  MapPin,
  ExternalLink,
  User,
  Shield,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useRouter } from '../lib/router';
import { EnrollModal } from '../components/EnrollModal';

export const DashboardPage: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const { navigate } = useRouter();

  const [myEnrollments, setMyEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  const fetchMyEnrollments = async () => {
    setLoading(true);
    try {
      if (user?.id || profile?.email) {
        const query = supabase.from('course_enrollments').select('*');
        if (user?.id) {
          query.or(`user_id.eq.${user.id},user_email.eq.${profile?.email || user.email}`);
        } else if (profile?.email) {
          query.eq('user_email', profile.email);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) {
          setMyEnrollments(data);
        }
      }
    } catch (err) {
      console.warn('Dashboard enrollment load:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEnrollments();
  }, [user, profile]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fade-in text-left">
      {/* Welcome Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Welcome back, {profile?.name || 'Engineer'}!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Track your enrolled cohorts, access production labs, and connect with industry mentors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEnrollOpen(true)}
              className="py-2.5 px-5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/20 text-xs flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enroll in Pathway</span>
            </button>
            <button
              onClick={() => navigate('/curriculum')}
              className="py-2.5 px-4 rounded-xl font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all text-xs flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Curriculum</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Enrolled Courses & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Enrolled Cohorts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
              <span>My Enrolled Cohorts</span>
            </h2>
            <span className="text-xs font-mono font-bold text-slate-500">
              {myEnrollments.length} Active
            </span>
          </div>

          {myEnrollments.length === 0 ? (
            <div className="p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4 bg-white/40 dark:bg-slate-900/40">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No active course enrollments yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Explore our industry-aligned Gen AI, Agentic Swarm, and Full-Stack cohorts to start your journey.
              </p>
              <button
                onClick={() => setIsEnrollOpen(true)}
                className="py-2.5 px-5 rounded-xl font-bold bg-emerald-600 text-white text-xs hover:bg-emerald-500 transition-all shadow-md cursor-pointer"
              >
                Browse &amp; Enroll Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myEnrollments.map((en, idx) => (
                <div
                  key={en.id || idx}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-4 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Cohort #{idx + 1}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {en.course_track}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{en.status || 'Confirmed'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                        {en.learning_mode === 'offline' ? (
                          <>
                            <MapPin className="w-3 h-3 text-emerald-500" />
                            <span>Mysore Campus</span>
                          </>
                        ) : (
                          <>
                            <Laptop className="w-3 h-3 text-blue-500" />
                            <span>Live Online</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar simulation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500">Curriculum Progress</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">25% (Week 4 of 16)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-1/4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      Registered: {en.created_at ? new Date(en.created_at).toLocaleDateString() : 'Active'}
                    </span>
                    <button
                      onClick={() => navigate('/curriculum')}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Access Lab Modules</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 16-Week Roadmap Milestone Steps */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>16-Week Cohort Milestones</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">Phase 1: Weeks 1-4</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Transformers &amp; vLLM</div>
                <div className="text-[11px] text-slate-500">Tokens, attention, local model serving</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-slate-600 dark:text-slate-400">Phase 2: Weeks 5-8</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Enterprise RAG</div>
                <div className="text-[11px] text-slate-500">Vector search, hybrid rerankers</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-slate-600 dark:text-slate-400">Phase 3: Weeks 9-12</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Multi-Agent Swarms</div>
                <div className="text-[11px] text-slate-500">LangGraph, MCP, human-in-the-loop</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-slate-600 dark:text-slate-400">Phase 4: Weeks 13-16</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Capstone &amp; Defense</div>
                <div className="text-[11px] text-slate-500">Live production audit &amp; placement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Student Profile & Resources */}
        <div className="space-y-6">
          {/* Student Card */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-500" />
              <span>Student Profile</span>
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-lg">
                {(profile?.name || 'S')[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {profile?.name || 'Student Member'}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {profile?.email || user?.email || 'N/A'}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Active Scholar</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Placement Desk:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">Registered</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Campus:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">Mysore / Hybrid</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={logout}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 font-bold transition-all text-xs cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Resources */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white">Quick Student Resources</h3>

            <a
              href="#syllabus"
              onClick={(e) => {
                e.preventDefault();
                navigate('/curriculum');
              }}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Download 16-Week Syllabus</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="https://wa.me/9199845042209"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">1:1 Academic Advisor Chat</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        onSuccess={fetchMyEnrollments}
      />
    </div>
  );
};

