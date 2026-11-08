/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, MapPin, Phone, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onOpenGuidance: () => void;
  onExploreTracks: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuidance, onExploreTracks }) => {
  return (
    <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 pt-16 pb-12 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner CTA inside Footer */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
              Elevate Your Career with TopQ Academy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Join the next cohort in Mysore or Online. Scholarships and corporate fee waivers open now.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onExploreTracks}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Explore All Tracks
            </button>
            <button
              onClick={onOpenGuidance}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Get Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs text-slate-600 dark:text-slate-400">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                Q
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                TopQ <span className="text-emerald-600 dark:text-emerald-400">Academy</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Building production-grade Generative AI, autonomous agents, and modern software skills since 2022.
            </p>
            <div className="space-y-1 pt-1 text-[11px]">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Saraswathipuram, Mysore, KA 570009</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>+91 99845042209</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>admissions@topqacademy.com</span>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Programs
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#tracks" className="hover:text-emerald-500 transition-colors">Gen AI &amp; Large Language Models</a></li>
              <li><a href="#tracks" className="hover:text-emerald-500 transition-colors">Autonomous Multi-Agent Systems</a></li>
              <li><a href="#tracks" className="hover:text-emerald-500 transition-colors">Enterprise RAG &amp; Vector Databases</a></li>
              <li><a href="#tracks" className="hover:text-emerald-500 transition-colors">Full-Stack Cloud Engineering</a></li>
              <li><a href="#tracks" className="hover:text-emerald-500 transition-colors">Applied Data Science &amp; ML</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#curriculum" className="hover:text-emerald-500 transition-colors">Curriculum Syllabus</a></li>
              <li><a href="#placement" className="hover:text-emerald-500 transition-colors">Placement Desk &amp; Salaried Roles</a></li>
              <li><a href="#ai-impact" className="hover:text-emerald-500 transition-colors">AI Research Reports &amp; Surveys</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition-colors">Mysore Campus Tour</a></li>
              <li><a href="#faq" className="hover:text-emerald-500 transition-colors">Student FAQs</a></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Terms of Enrollment</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Placement Guarantee Terms</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Student Code of Conduct</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Refund &amp; Deferral Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} TopQ Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for modern AI engineers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
