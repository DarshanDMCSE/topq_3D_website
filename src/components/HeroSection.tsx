/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - HeroSection Component
 * Accessible hero with WCAG AA compliant typography, soft readability backing,
 * verified placement footnote, and floating tech nodes.
 */

import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronDown, Cpu, Layers } from 'lucide-react';

interface HeroSectionProps {
  onOpenGuidance: () => void;
  onExploreTracks: () => void;
}

interface HeroSectionProps {
  onOpenGuidance: () => void;
  onExploreTracks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenGuidance,
  onExploreTracks,
}) => {
  return (
    <section id="hero" className="relative pt-4 pb-12 md:pt-8 md:pb-16" aria-label="Hero Introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Layout - Clean & Open with 3D Mountain View */}
        <div className="max-w-3xl space-y-6 text-left relative z-10 py-2 sm:py-3">
          {/* Cohort Kicker with Translucent Glass */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-emerald-500/40 text-xs font-bold tracking-wider text-emerald-800 dark:text-emerald-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse shrink-0" />
            <span>TopQ-Inverse'26</span>
            <span aria-hidden="true" className="text-emerald-500/60">·</span>
            <span>Gen AI &amp; Multi-Agent Engineering Cohorts</span>
          </div>

          {/* Main Headline (Open, Transparent Backing, Perfectly Crisp) */}
          <div className="relative">
            <div className="absolute -inset-4 bg-white/20 dark:bg-slate-950/30 rounded-3xl blur-xl -z-10 pointer-events-none" />
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-950 dark:text-white drop-shadow-sm dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              style={{ textWrap: 'balance' }}
            >
              Learn{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                In–Demand Skills
              </span>
              . Build Your Tech Career.
            </h1>
          </div>

          {/* Subtitle with High-Contrast Atmosphere */}
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 font-medium leading-relaxed max-w-2xl drop-shadow-sm dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Build production-grade Gen AI systems, RAG pipelines, autonomous multi-agent swarms with LangGraph, and prepare for your next career with industry certification in Mysore &amp; Online.
          </p>

          {/* Value Pillars with Glass Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/75 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Placement Assistance*</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/75 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Hands-on Experience</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/75 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Internship Opportunities</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onExploreTracks}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenGuidance}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-900 dark:text-white bg-white/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md border border-slate-300 dark:border-slate-700 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer shadow-sm"
            >
              <span>Our Journey</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>

          {/* Required Footnote for Verification */}
          <p className="text-[11px] text-slate-600 dark:text-slate-300 pt-1">
            * Placement assistance includes unlimited 1:1 resume audits, portfolio reviews, and direct referral interview rounds with partner tech firms until placement.
          </p>
        </div>

        {/* Certificate Callout Banner with AA Contrast */}
        <div className="mt-14 glass-card rounded-2xl p-6 sm:p-8 border shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Industry Accredited
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                Professional Certificate in Generative &amp; Agentic AI
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Co-designed with principal architects from top tech firms to transition engineers into high-value AI roles.
              </p>
            </div>

            {/* 4 Core Pillars */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Agentic-first depth</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Multi-agent loops, reflection &amp; tool orchestration.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Workflow orchestration</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  State graphs, human-in-the-loop &amp; checkpointing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Active industry experts</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Mentors actively deploying Gen AI in tier-1 companies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Production-style Capstone</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  End-to-end multi-agent enterprise Copilot portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Cue */}
        <div className="pt-8 flex flex-col items-center justify-center text-center">
          <a
            href="#tracks"
            className="group inline-flex flex-col items-center gap-1 text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>Scroll to Explore Mountain Journey</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-emerald-600 dark:text-emerald-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
