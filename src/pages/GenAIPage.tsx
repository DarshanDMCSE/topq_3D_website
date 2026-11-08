/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Dedicated Gen AI Tracks Page (/genai & /tracks)
 */

import React, { useState } from 'react';
import { CourseTracks } from '../components/CourseTracks';
import { MonaContributionWave } from '../components/MonaContributionWave';
import { CoreFeatures } from '../components/CoreFeatures';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { EnrollModal } from '../components/EnrollModal';
import { Sparkles, GraduationCap, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useRouter } from '../lib/router';

export const GenAIPage: React.FC = () => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Gen AI & Multi-Agent Engineering');
  const { navigate } = useRouter();

  const handleOpenEnroll = (track?: string) => {
    if (track) setSelectedTrack(track);
    setIsEnrollOpen(true);
  };

  return (
    <div className="space-y-16 py-8 animate-fade-in text-left">
      {/* Hero Banner for Pathways */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Pathways · Online &amp; Mysore Campus</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Generative AI &amp; Multi-Agent <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Engineering Cohorts
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Move past basic prompt templates. Master production architectures: LangGraph state machines, Model Context Protocol (MCP), fine-tuning local SLMs, vLLM continuous batching, and zero-trust LLM security.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleOpenEnroll('Gen AI & Multi-Agent Engineering')}
              className="py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/25 text-xs flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enroll in 16-Week Cohort</span>
            </button>

            <button
              onClick={() => navigate('/curriculum')}
              className="py-3 px-5 rounded-xl font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 16-Week Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pathways Overview Grid */}
      <CourseTracks onOpenSyllabus={(track) => handleOpenEnroll(track)} />

      {/* Interactive Neural Architecture Wave */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MonaContributionWave />
      </div>

      {/* Core Learning Ecosystem Features */}
      <CoreFeatures />

      {/* Contact and Lead Logging */}
      <LeadCaptureForm />

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        defaultTrack={selectedTrack}
      />
    </div>
  );
};

