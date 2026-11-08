/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - WhatsAppButton Component
 * Floating admission assistance button with safe responsive positioning,
 * non-blocking tooltip, and 48px accessible tap targets.
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ArrowUp } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show top arrow once user scrolls down past hero
      setShowScrollTop(window.scrollY > 220);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const phoneNumber = '+9199845042209';
  const whatsappUrl = `https://wa.me/9199845042209?text=${encodeURIComponent(
    'Hi TopQ Academy, I would like to enquire about the Gen AI & Multi-Agent engineering cohorts in Mysore & Online.'
  )}`;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none">
      {/* Scroll to Top Arrow Button - sits directly on top of WhatsApp button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top of the page"
          title="Back to Top"
          className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/92 dark:bg-slate-900/90 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white border border-slate-300/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-xl shadow-slate-950/15 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
        </button>
      )}

      {/* Tooltip Dialog positioned safely ABOVE the button */}
      {showTooltip && (
        <div className="mb-2 rounded-2xl p-3.5 border shadow-2xl text-left w-72 bg-white/95 dark:bg-slate-900/95 border-slate-300 dark:border-slate-700 backdrop-blur-xl relative text-xs">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close WhatsApp advisor tooltip"
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-slate-950 dark:text-white flex items-center gap-1.5 pr-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>TopQ Academic Advisory</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Chat directly with our advisor at <strong>+91 99845042209</strong> for syllabus PDFs, campus visits in Saraswathipuram, and fee waivers.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Open WhatsApp Chat →
          </a>
        </div>
      )}

      {/* Floating Action Button with min 48px tap target */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with TopQ Academy (+91 99845042209)"
        className="flex items-center justify-center gap-2 w-12 h-12 sm:w-auto sm:px-4 sm:py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
        title="Chat on WhatsApp (+91 99845042209)"
      >
        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
