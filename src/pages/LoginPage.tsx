/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Student & Admin Login Page
 * Sleek black theme with high-contrast inputs and Supabase Auth.
 */

import React, { useState } from 'react';
import { LogIn, Sparkles, Shield, ArrowRight, Mail, Lock, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from '../lib/router';

export const LoginPage: React.FC = () => {
  const { login, profile } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      const isTopQAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('topq');
      if (isTopQAdmin || profile?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black/60 backdrop-blur-xs text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 animate-fade-in text-left selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="w-full max-w-md bg-[#0a0a0d]/95 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-950/20 space-y-6 relative overflow-hidden backdrop-blur-xl">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TopQ Academy Portal</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-zinc-400">
            Sign in to access your course syllabus, labs, and cohort updates.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="yourname@gmail.com or admin@topq.ai"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-600 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300">
                Password
              </label>
              <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer">
                Forgot?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password (e.g. topq@123)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
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
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white transition-all shadow-lg shadow-emerald-600/30 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 text-xs text-zinc-400">
          Don't have an account yet?{' '}
          <Link href="/register" className="font-bold text-emerald-400 hover:underline">
            Register Here
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 text-center pt-2 border-t border-zinc-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Connected directly to Supabase Authentication</span>
        </div>
      </div>
    </div>
  );
};
