/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Dedicated Placement Desk Page (/placementdesk)
 */

import React, { useState } from 'react';
import { PlacementDesk } from '../components/PlacementDesk';
import { AlumniMarquee } from '../components/AlumniMarquee';
import { TestimonialsFAQ } from '../components/TestimonialsFAQ';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { EnrollModal } from '../components/EnrollModal';
import { Award, Sparkles, Building2, ShieldCheck, GraduationCap } from 'lucide-react';

export const PlacementDeskPage: React.FC = () => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  return (
    <div className="space-y-16 py-8 animate-fade-in text-left">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>100% Career &amp; Placement Guarantee Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            TopQ Placement Desk &amp; <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Hiring Partner Ecosystem
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            From technical mock rounds with senior architects to direct interview rounds across our 500+ enterprise network in Bengaluru, Mysore, and remote global hubs.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setIsEnrollOpen(true)}
              className="py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/25 text-xs flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply for Placement Cohort</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hiring Marquee */}
      <AlumniMarquee />

      {/* Detailed Placement Desk Metrics & Process */}
      <PlacementDesk />

      {/* Verified Reviews & FAQs */}
      <TestimonialsFAQ />

      {/* Lead Capture */}
      <LeadCaptureForm />

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </div>
  );
};
