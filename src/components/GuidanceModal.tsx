/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Download, ShieldCheck, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: string;
}

export const GuidanceModal: React.FC<GuidanceModalProps> = ({
  isOpen,
  onClose,
  defaultTrack = 'Generative AI & LLMs',
}) => {
  const [track, setTrack] = useState(defaultTrack);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [learningMode, setLearningMode] = useState<'offline' | 'online'>('online');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Sync track when defaultTrack changes or modal opens
  useEffect(() => {
    if (defaultTrack) {
      setTrack(defaultTrack);
    }
    if (isOpen) {
      setSubmitted(false);
      setError('');
    }
  }, [defaultTrack, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }
    setError('');
    (async () => {
      try {
        const { error: dbError } = await supabase.from('guidance_requests').insert([
          {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            track,
            learning_mode: learningMode,
          },
        ]);
        if (dbError) {
          console.error('Supabase guidance error:', dbError.message);
        }
      } catch (err) {
        console.error('Error submitting guidance request:', err);
      }
    })();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border shadow-2xl text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">
              Guidance Session Scheduled!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! We've sent the complete syllabus for{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{track}</span> to your phone and email. A senior mentor will contact you for your 1:1 call.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  alert('Downloading TopQ Gen AI Detailed Syllabus (PDF)...');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Syllabus (PDF)</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-4 h-4" /> TopQ Career Counseling
              </div>
              <h3 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Get 1:1 Guidance &amp; Syllabus
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Discuss your background with our AI architects to select the right track and review batch schedules.
              </p>
            </div>

            {/* Track selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Selected Course Track
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Generative AI & LLMs">Generative AI &amp; Large Language Models</option>
                <option value="Gen AI & Multi-Agent Engineering">Gen AI &amp; Multi-Agent Engineering</option>
                <option value="Autonomous AI Agents & Agentic Workflows">Autonomous AI Agents &amp; Agentic Workflows</option>
                <option value="Enterprise RAG & Production LLMOps">Enterprise RAG &amp; Production LLMOps</option>
                <option value="Enterprise RAG & Knowledge Systems">Enterprise RAG &amp; Knowledge Systems</option>
                <option value="Full Stack Cloud Engineering">Full Stack Cloud Engineering</option>
                <option value="Data Science & Machine Learning">Data Science &amp; Machine Learning</option>
              </select>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aditi Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Mobile & Email split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit number"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Learning mode selector */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Preferred Mode
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLearningMode('online')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    learningMode === 'online'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Live Online Interactive
                </button>
                <button
                  type="button"
                  onClick={() => setLearningMode('offline')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    learningMode === 'offline'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  In-Person (Mysore Campus)
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Submit Request &amp; Download Syllabus</span>
              <Send className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Free 1-on-1 consultation · No obligation · Instant response</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GuidanceModal;
