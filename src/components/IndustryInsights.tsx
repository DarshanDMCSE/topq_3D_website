/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp, BarChart3, Globe2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const INSIGHTS = [
  {
    org: 'World Economic Forum',
    report: 'Future of Jobs Report',
    title: 'AI and the changing balance of work',
    summary: 'Analysis of automated cognitive tasks augmented with high-touch architectural decisions in technical teams.',
    stat: '85M Shifts',
  },
  {
    org: 'Stanford FSI & AI Index',
    report: 'Global AI Survey',
    title: 'New skills: A different way to learn',
    summary: 'How project-based RAG and multi-agent development replace passive textbook memorization for software engineers.',
    stat: '3.4x Demand',
  },
  {
    org: 'Tech Workforce Insights',
    report: 'Engineering Trends',
    title: 'Enterprise restructuring toward AI-native talent',
    summary: 'Why tech giants are aggressive in recruiting engineers skilled in LangGraph, vector search, and local SLMs.',
    stat: '64% Adoption',
  },
  {
    org: 'Global Tech Employment Index',
    report: 'Hiring Barometer',
    title: 'A closer look at AI opportunities',
    summary: 'The surge in demand for AI System Architects, RAG Evaluators, and Agentic Workflow Designers across banking and healthcare.',
    stat: '+140% Postings',
  },
  {
    org: 'McKinsey Global Institute',
    report: 'Economic Impact of AI',
    title: 'Estimated net job creation by sector',
    summary: 'Forecasting 170M+ net new high-skill engineering and domain-specific AI orchestration roles by 2030.',
    stat: '$4.4T Value',
  },
];

export const IndustryInsights: React.FC = () => {
  const [insights, setInsights] = useState(INSIGHTS);

  useEffect(() => {
    async function loadInsights() {
      try {
        const { data, error } = await supabase
          .from('insights')
          .select('org, report, title, summary, stat')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setInsights(data);
        }
      } catch (err) {
        // Fall back gracefully to static items
      }
    }
    loadInsights();
  }, []);

  return (
    <section id="ai-impact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Market Signals &amp; Research
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            The AI Job Market is Transforming
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
            Independent research shows traditional coding roles are rapidly pivoting to generative engineering and multi-agent architectures.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border text-left flex flex-col justify-between hover:scale-[1.02] transition-all group shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.org}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    {item.stat}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <span>Read excerpt</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryInsights;
