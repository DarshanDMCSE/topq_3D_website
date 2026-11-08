/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Building2, ExternalLink } from 'lucide-react';

const MENTORS = [
  {
    name: 'Rupesh Attraknee',
    role: 'Principal AI Architect',
    prev: 'Ex-Thoughtworks & Cisco',
    expertise: 'LangGraph, Multi-Agent Swarms',
    avatar: 'RA',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Rishi Madhavan',
    role: 'Staff Gen AI Engineer',
    prev: 'Ex-Microsoft AI Core',
    expertise: 'Enterprise RAG & Hybrid Search',
    avatar: 'RM',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Jayamohan Edwards',
    role: 'Head of Machine Learning',
    prev: 'Ex-Amazon AWS Bedrock',
    expertise: 'vLLM, Model Quantization',
    avatar: 'JE',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Rout-Ravinchand',
    role: 'LLMOps & Infrastructure Lead',
    prev: 'Open Source Contributor',
    expertise: 'LangSmith, Tracing, Eval Pipelines',
    avatar: 'RR',
    color: 'from-purple-500 to-pink-600',
  },
];

export const MentorsSection: React.FC = () => {
  return (
    <section id="mentors" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Real Mentorship from Real Practitioners
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            Learn from Industry Experts &amp; Pioneers
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
            Our faculty members are active staff engineers and architects deploying production Gen AI systems every day.
          </p>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS.map((m) => (
            <div
              key={m.name}
              className="glass-card rounded-2xl p-6 border text-left hover:scale-[1.02] transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Avatar Badge with Gradient */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.color} text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform`}
                  >
                    {m.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      {m.role}
                    </p>
                  </div>
                </div>

                {/* Company & Expertise */}
                <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-slate-800/70 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{m.prev}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>{m.expertise}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>1:1 Sessions Available</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Key Placement Outcomes Strip (Matching Video 2) */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/60 dark:divide-slate-800/60">
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight tabular-nums">
                95%
              </div>
              <div className="text-sm font-bold text-slate-950 dark:text-white">
                Placement Rate
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Within 120 days of cohort completion
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-mono tracking-tight tabular-nums">
                500+
              </div>
              <div className="text-sm font-bold text-slate-950 dark:text-white">
                Hiring Partners
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Startups to Fortune 500 tech enterprises
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight tabular-nums">
                10k+
              </div>
              <div className="text-sm font-bold text-slate-950 dark:text-white">
                Learners Community
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Active alumni in Discord &amp; weekly research meetups
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
