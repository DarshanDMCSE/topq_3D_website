/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserCheck, GitBranch, Video, Send, TrendingUp, Building, Award } from 'lucide-react';

export const PlacementDesk: React.FC = () => {
  return (
    <section id="placement" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Placement Support &amp; Guidance Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            Own Your Next High-Growth Role
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium max-w-2xl mx-auto">
            TopQ Academy bridges the gap between academic theory and real-world Gen AI engineering with comprehensive, personalized mentorship in Saraswathipuram, Mysore and Online.
          </p>
        </div>

        {/* 3 Prominent Stat Strips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border text-center shadow-lg">
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              1 : 1
            </div>
            <div className="text-base font-bold text-slate-950 dark:text-white mt-1">
              Personal AI Mentorship
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
              Customized learning pace with dedicated technical staff
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border text-center shadow-lg">
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-slate-950 dark:text-white tabular-nums">
              ₹6–13L
            </div>
            <div className="text-base font-bold text-slate-950 dark:text-white mt-1">
              Projected Salary Band
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
              Entry to mid-level Gen AI engineer packages in India
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border text-center shadow-lg">
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              50+
            </div>
            <div className="text-base font-bold text-slate-950 dark:text-white mt-1">
              Top Tech Companies
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
              Active recruitment tie-ups and referral partnerships
            </p>
          </div>
        </div>

        {/* 4 Placement Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="glass-panel rounded-2xl p-6 border shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400">01. CAREER MENTORSHIP</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              1-on-1 AI Mentorship
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Personalized career roadmaps, weekly code reviews, and direct 1-on-1 mentorship with senior AI engineers.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400">02. PORTFOLIO LAB</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              GitHub AI Portfolio
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Build production-ready open source Gen AI repositories with live cloud endpoints, traces, and documentation.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400">03. INTERVIEW READINESS</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Mock AI Interviews
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Technical mock coding sessions, prompt optimization cases, and LangGraph system design whiteboarding.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400">04. INDUSTRY PIPELINE</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Direct Referrals
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Access our network of hiring partner companies actively recruiting prompt engineers, R&amp;D devs, and agentic developers.
            </p>
          </div>
        </div>

        {/* Footnote for Verification */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center italic pt-2 max-w-3xl mx-auto">
          * Projected salary bands (₹6–13L) and referral pipeline figures based on 2024–2025 entry-to-mid career Generative AI and LLMOps compensation benchmarks in India.
        </p>
      </div>
    </section>
  );
};

export default PlacementDesk;
