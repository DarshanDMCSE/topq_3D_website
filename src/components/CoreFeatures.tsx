/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, Briefcase, Users, FolderGit2, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    id: 'hands-on',
    title: 'Hands-on Experience',
    desc: 'Write production-grade code from day one. Build on real GitHub repositories with automated CI/CD pipelines, unit tests, and rigorous PR reviews.',
    icon: Terminal,
    stat: '85% Lab Work',
  },
  {
    id: 'placement',
    title: '100% Placement Assistance',
    desc: 'Dedicated placement desk connects you with 500+ tech hiring partners, scheduling direct technical interviews and offer negotiation.',
    icon: Briefcase,
    stat: '₹6–13L Band',
  },
  {
    id: 'mentorship',
    title: 'Expert Mentorship',
    desc: 'Weekly 1:1 mentorship from senior architects actively deploying production Gen AI architectures in tier-1 tech companies.',
    icon: Users,
    stat: '1:1 Weekly Sync',
  },
  {
    id: 'projects',
    title: 'Real-World Projects',
    desc: 'Construct portfolio-defining enterprise capstones: autonomous customer service swarms, document intelligence RAG, and custom fine-tuned models.',
    icon: FolderGit2,
    stat: '4 Capstones',
  },
];

export const CoreFeatures: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Why TopQ Academy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            Core Program Features
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium max-w-2xl mx-auto">
            Everything you need to bridge the gap between academic theory and high-performing engineering roles.
          </p>
        </div>

        {/* 4 Feature Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="glass-card rounded-2xl p-6 border text-left flex flex-col justify-between hover:scale-[1.02] transition-all group relative overflow-hidden shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {feat.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span>Explore feature</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
