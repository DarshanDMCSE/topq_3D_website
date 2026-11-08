/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Dedicated AI Impact Page (/aiimpact)
 */

import React, { useState } from 'react';
import { IndustryInsights } from '../components/IndustryInsights';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { EnrollModal } from '../components/EnrollModal';
import { Sparkles, TrendingUp, Globe2, BarChart3, GraduationCap } from 'lucide-react';

export const AIImpactPage: React.FC = () => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  return (
    <div className="space-y-16 py-8 animate-fade-in text-left">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10 shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market Intelligence &amp; Live Supabase Signals</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            How Artificial Intelligence is <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Reshaping Tech Employment
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Data aggregated from the World Economic Forum, Stanford AI Index, and McKinsey Global Institute showing the 140%+ surge in demand for AI System Architects and Multi-Agent Orchestrators.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setIsEnrollOpen(true)}
              className="py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/25 text-xs flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Upskill for the Next Wave</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Industry Insights Component (queries Supabase 'insights' table) */}
      <IndustryInsights />

      {/* Lead capture */}
      <LeadCaptureForm />

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </div>
  );
};

