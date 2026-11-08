/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - AlumniMarquee Component
 * Displays the enterprise tech ecosystem where TopQ alumni and faculty have engineered systems.
 * Includes clear disclaimer footnote to prevent false endorsement impressions.
 */

import React from 'react';

const COMPANIES = [
  { name: 'Infosys', division: 'Applied AI Labs' },
  { name: 'TCS', division: 'Cognitive Business' },
  { name: 'Wipro', division: 'AI Solutions' },
  { name: 'Accenture', division: 'GenAI Studio' },
  { name: 'Cognizant', division: 'Digital Systems' },
  { name: 'Capgemini', division: 'AI Engineering' },
  { name: 'Oracle', division: 'Cloud AI' },
  { name: 'Intel', division: 'Habana Labs' },
  { name: 'Meta', division: 'AI Research' },
  { name: 'IBM', division: 'Enterprise AI' },
];

export const AlumniMarquee: React.FC = () => {
  return (
    <section className="py-12 border-y border-slate-200/80 dark:border-slate-800 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Editorial Subtitle with WCAG AA Green */}
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
          Career Pathways &amp; Outcomes
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
          Enterprise Ecosystem We Prepare You For
        </h2>

        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Where TopQ graduates and mentors have architected production Generative AI, RAG pipelines, and multi-agent solutions.
        </p>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 pt-4">
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              className="p-4 rounded-xl bg-white/86 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center hover:scale-105 transition-all shadow-sm group hover:border-emerald-500/50"
            >
              <span className="text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {company.name}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-tight mt-0.5">
                {company.division}
              </span>
            </div>
          ))}
        </div>

        {/* Required Disclaimer Footnote */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-2 max-w-3xl mx-auto">
          * Company names reflect enterprise organizations where TopQ alumni, mentors, or advisors have engineered production systems or alumni have secured roles. Not an endorsement or official corporate sponsorship.
        </p>
      </div>
    </section>
  );
};

export default AlumniMarquee;
