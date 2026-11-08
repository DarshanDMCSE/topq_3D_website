/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const LeadCaptureForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('Generative AI & LLMs');
  const [experience, setExperience] = useState<'beginner' | 'experienced'>('beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    // Validate 10-digit phone
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    (async () => {
      try {
        const { error } = await supabase.from('leads').insert([
          {
            name: name.trim(),
            phone: cleanPhone,
            course,
            experience,
          },
        ]);
        if (error) {
          console.error('Supabase lead error:', error.message);
        }
      } catch (err) {
        console.error('Error submitting lead to Supabase:', err);
      } finally {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }
    })();
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Left copy */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Let's Make Your Next Step Count
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
                  A little curiosity.
                </span>{' '}
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent">
                  A lot of possibility.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Tell us where you are today. Start a conversation about where you want to go. Our lead faculty will help you map out your roadmap.
              </p>

              {/* Campus location marker */}
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Campus: Saraswathipuram, Mysore · Online Batches Available</span>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-6">
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Request Received, {name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Our lead AI academic advisor will reach out to <strong>{phone}</strong> within 2 hours to share the syllabus for <strong>{course}</strong> and schedule your 1-on-1 orientation.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                    }}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 underline hover:opacity-80 pt-2"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Explored Course Track */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                      <span>Course Track to Explore</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">1:1 Mentorship Included</span>
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    >
                      <option value="Generative AI & LLMs">Generative AI &amp; Large Language Models</option>
                      <option value="Autonomous AI Agents & Agentic Workflows">Autonomous AI Agents &amp; Agentic Workflows</option>
                      <option value="Enterprise RAG & Production LLMOps">Enterprise RAG &amp; Production LLMOps</option>
                      <option value="Full Stack Cloud Engineering">Full Stack Cloud Engineering</option>
                      <option value="Data Science & Machine Learning">Data Science &amp; Machine Learning</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Username / Full Name
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Mobile Number (10 digits)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9845540209"
                      maxLength={14}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono placeholder:text-slate-400"
                    />
                  </div>

                  {/* Experience Selector */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Your Current Experience
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setExperience('beginner')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          experience === 'beginner'
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium'
                        }`}
                      >
                        <div className="font-bold text-slate-950 dark:text-white">Beginner</div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">You belong here</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExperience('experienced')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          experience === 'experienced'
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium'
                        }`}
                      >
                        <div className="font-bold text-slate-950 dark:text-white">Experienced</div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Keep going further</div>
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium pt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Connecting...</span>
                    ) : (
                      <>
                        <span>Submit &amp; Get Instant Guidance</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 pt-1">
                    No spam. Free 1-on-1 consultation by TopQ Saraswathipuram mentors.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
