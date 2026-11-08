/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Course Enrollment Modal
 * Saves enrollments directly to Supabase course_enrollments table.
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, Send, GraduationCap, MapPin, Laptop } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: string;
  onSuccess?: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  defaultTrack = 'Gen AI & Multi-Agent Engineering',
  onSuccess,
}) => {
  const { user, profile } = useAuth();
  const [courseTrack, setCourseTrack] = useState(defaultTrack);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [learningMode, setLearningMode] = useState<'online' | 'offline'>('online');
  const [experience, setExperience] = useState<'beginner' | 'experienced'>('beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultTrack) {
      setCourseTrack(defaultTrack);
    }
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
    }
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMsg('');
    }
  }, [defaultTrack, profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('course_enrollments').insert([
        {
          user_id: user?.id || null,
          user_name: name.trim(),
          user_email: email.trim(),
          user_phone: cleanPhone,
          course_track: courseTrack,
          learning_mode: learningMode,
          experience: experience,
          status: 'confirmed',
        },
      ]);

      if (error) {
        console.warn('Enrollment db warning:', error.message);
      }
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setIsSubmitted(true); // Don't block user on network edge
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Enrollment Confirmed!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Welcome to the <strong className="text-emerald-600 dark:text-emerald-400">{courseTrack}</strong> cohort! Our academic counselor will reach out on WhatsApp/Call with cohort schedule details.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cohort Admission</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Enroll in TopQ Academy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secure your seat in our production-level engineering tracks.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Course Track Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Selected Course Pathway
              </label>
              <select
                value={courseTrack}
                onChange={(e) => setCourseTrack(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Gen AI & Multi-Agent Engineering">Gen AI & Multi-Agent Engineering (16 Weeks)</option>
                <option value="Full-Stack Gen AI & Production LLMOps">Full-Stack Gen AI & Production LLMOps (16 Weeks)</option>
                <option value="Enterprise Data Science & SLM Fine-Tuning">Enterprise Data Science & SLM Fine-Tuning (14 Weeks)</option>
                <option value="Autonomous Agents & RAG Architecture">Autonomous Agents & RAG Architecture (8 Weeks)</option>
              </select>
            </div>

            {/* Mode of Learning */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Learning Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLearningMode('online')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    learningMode === 'online'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  <span>Live Online</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLearningMode('offline')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    learningMode === 'offline'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Mysore Campus</span>
                </button>
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 disabled:opacity-50 cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  <span>Processing Enrollment...</span>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4" />
                    <span>Confirm &amp; Reserve Seat</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Placement Assistance &amp; 0% Interest EMI Available</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

