/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Quote, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Julius Rao',
    role: 'Software Dev II',
    company: 'Infosys Applied AI',
    avatar: 'JR',
    content:
      'The multi-agent LangGraph architecture module gave me the real tools to construct autonomous RAG pipelines. Interviewers were blown away by my GitHub capstone project.',
    rating: 5,
  },
  {
    name: 'Jean Dsouza',
    role: 'Senior AI Engineer',
    company: 'Wipro AI Solutions',
    avatar: 'JD',
    content:
      'Unlike generic tutorials that teach only basic prompt engineering, TopQ focused on vLLM serving, vector search evaluation, and production LLMOps. Completely changed my trajectory.',
    rating: 5,
  },
  {
    name: 'Leena Hosur',
    role: 'Agentic Workflow Dev',
    company: 'Capgemini Digital',
    avatar: 'LH',
    content:
      'The 1-on-1 mentorship at Saraswathipuram campus gave me direct insights from architects. Secured an offer in the ₹11 LPA bracket within 45 days of completing my capstone.',
    rating: 5,
  },
];

const FAQS = [
  {
    q: 'What are the prerequisites for the Gen AI & Multi-Agent engineering tracks?',
    a: 'Basic programming familiarity (Python or TypeScript) is helpful. For beginners, we provide a 2-week preparatory foundation covering loops, asynchronous programming, and Git before starting the transformer and agentic modules.',
  },
  {
    q: 'Are the batches conducted online or in-person at the Mysore campus?',
    a: 'Both options are available! You can join offline batches at our state-of-the-art campus in Saraswathipuram, Mysore, or join live interactive online batches with dedicated virtual lab assistants.',
  },
  {
    q: 'How does the 100% placement assistance work?',
    a: 'Our Placement Desk conducts 1:1 technical mock interviews, resume and GitHub audits, and schedules direct interview rounds with our 500+ hiring partner enterprises until you successfully receive an offer.',
  },
  {
    q: 'Will I receive an accredited certification upon completion?',
    a: 'Yes. Upon successfully defending your Capstone Project before our industry panel, you receive the accredited TopQ Professional Certificate in Generative & Agentic AI with verifiable credentials.',
  },
  {
    q: 'Are no-cost EMI and installment options supported?',
    a: 'Yes, we provide flexible payment plans including 0% interest monthly installments and corporate sponsorship assistance.',
  },
];

export const TestimonialsFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Testimonials Header with Star Rating Badge */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold">
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>Rated 4.9/5 by 2,000+ Engineers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            Hear from Our Graduated Cohorts
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium max-w-2xl mx-auto">
            Discover how engineers transitioned from traditional roles into high-growth AI architect and agentic engineering positions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border flex flex-col justify-between shadow-lg relative group hover:scale-[1.02] transition-all"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-emerald-500/60" />
                <p className="text-xs sm:text-sm text-slate-850 dark:text-slate-200 font-medium leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-950 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    {item.role} · <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="pt-10 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Good Questions. Clear Answers.
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3 text-left">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl border transition-all ${
                    isOpen ? 'ring-2 ring-emerald-500 shadow-md' : 'hover:border-emerald-500/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                      {faq.q}
                    </span>
                    <div className="p-1 rounded-lg text-slate-700 dark:text-slate-300 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsFAQ;
