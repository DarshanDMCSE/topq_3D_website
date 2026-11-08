/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Student Registration Page
 * Black theme with strict 10-digit numeric phone validation & mandatory @gmail.com email.
 */

import React, { useState } from 'react';
import { UserPlus, Sparkles, ShieldCheck, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from '../lib/router';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { navigate } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Strictly allow ONLY numbers (0-9) and up to 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Strip everything that is not a numeric digit (no letters, no symbols)
    const digitsOnly = rawVal.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (errorMsg) setErrorMsg('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Name validation
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    // 2. Email validation: @gmail.com is strictly mandatory
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@gmail.com') || cleanEmail === '@gmail.com' || cleanEmail.includes(' ')) {
      setErrorMsg('A valid Gmail address is required (must end with @gmail.com).');
      return;
    }

    // 3. Phone validation: exactly 10 digits, numbers only
    if (phone.length !== 10) {
      setErrorMsg('Phone number must be exactly 10 digits (numbers only, no alphabets or symbols).');
      return;
    }

    // 4. Password length
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    const res = await register(name, cleanEmail, password, phone);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      navigate('/dashboard');
    }
  };

  const isGmailValid = email.trim().toLowerCase().endsWith('@gmail.com') && email.trim().length > 10;
  const isPhoneValid = phone.length === 10;

  return (
    <div className="min-h-screen bg-black/60 backdrop-blur-xs text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 animate-fade-in text-left selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="w-full max-w-md bg-[#0a0a0d]/95 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-950/20 space-y-6 relative overflow-hidden backdrop-blur-xl">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TopQ Student Registration</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-xs text-zinc-400">
            Join the cohort to access production AI curricula and lab projects.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-600 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Email Address - Mandatory @gmail.com */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300">
                Email Address
              </label>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">
                @gmail.com required
              </span>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={handleEmailChange}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-zinc-900/90 text-white placeholder-zinc-600 text-xs outline-none transition-colors ${
                  email && !isGmailValid
                    ? 'border-rose-500/60 focus:border-rose-500'
                    : isGmailValid
                    ? 'border-emerald-500/60 focus:border-emerald-500'
                    : 'border-zinc-800 focus:border-emerald-500'
                }`}
                required
              />
              {isGmailValid && (
                <CheckCircle className="w-4 h-4 text-emerald-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
            </div>
            <p className="text-[10px] text-zinc-500">
              Must end with <strong className="text-zinc-400">@gmail.com</strong>
            </p>
          </div>

          {/* Mobile Phone - Numbers only, exactly 10 digits */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300">
                Mobile Number
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">
                {phone.length}/10 digits
              </span>
            </div>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-zinc-900/90 text-white placeholder-zinc-600 text-xs font-mono outline-none transition-colors ${
                  phone && !isPhoneValid
                    ? 'border-amber-500/60 focus:border-amber-500'
                    : isPhoneValid
                    ? 'border-emerald-500/60 focus:border-emerald-500'
                    : 'border-zinc-800 focus:border-emerald-500'
                }`}
                required
              />
              {isPhoneValid && (
                <CheckCircle className="w-4 h-4 text-emerald-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
            </div>
            <p className="text-[10px] text-zinc-500">
              Numbers only. Alphabets and special characters are blocked.
            </p>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-600 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white transition-all shadow-lg shadow-emerald-600/30 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Account</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 text-xs text-zinc-400">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-emerald-400 hover:underline">
            Log In Here
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center pt-1 border-t border-zinc-900">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Secure authentication via Supabase</span>
        </div>
      </div>
    </div>
  );
};
