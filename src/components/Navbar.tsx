/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Navbar Component
 * Features:
 * - Brand Wordmark & Navigation Links
 * - Light/Dark Theme Switcher
 * - Primary "Get Guidance" Action Button
 * - 3-Dots Menu Button (`MoreVertical`) opening a rich mobile/responsive vertical drawer:
 *   1. Vertical presentation of navbar items:
 *      - Gen AI Tracks
 *      - Curriculum
 *      - AI Impact
 *      - Placement Desk
 *      - FAQ
 *      (Clicking any item smoothly renders that responsive section on the page)
 *   2. Course Tracks with dedicated "Explore" buttons that smoothly scroll
 *      all the way to the bottom consultation & application form for users to fill out
 */

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  ArrowRight,
  MoreVertical,
  X,
  Bot,
  Layers,
  Cpu,
  Database,
  Code2,
  BookOpen,
  ChevronRight,
  Sparkles,
  Award,
  HelpCircle,
  GraduationCap,
  Send,
  User,
  LogIn,
  LogOut,
  Shield,
  LayoutDashboard,
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenGuidance: (trackName?: string) => void;
}

// Vertical Navigation Items matching User Screenshot
interface VerticalNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  tag: string;
}

const VERTICAL_NAV_ITEMS: VerticalNavItem[] = [
  { id: 'tracks', label: 'Gen AI Tracks', icon: Layers, tag: 'Pathways & Cohorts' },
  { id: 'curriculum', label: 'Curriculum', icon: BookOpen, tag: '16-Week Syllabus' },
  { id: 'ai-impact', label: 'AI Impact', icon: Sparkles, tag: 'Enterprise Signals' },
  { id: 'placement', label: 'Placement Desk', icon: Award, tag: 'Hiring Partners' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, tag: 'Admissions & Queries' },
];

// Course Tracks for Explore action
interface CourseCatalogItem {
  id: string;
  name: string;
  duration: string;
  level: string;
  icon: React.ElementType;
  accent: string;
  accentBg: string;
  highlights: string[];
}

const COURSES_CATALOG: CourseCatalogItem[] = [
  {
    id: 'genai-llm',
    name: 'Generative AI & LLMs',
    duration: '16 Weeks',
    level: 'Beginner to Advanced',
    icon: Bot,
    accent: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    highlights: ['Prompt Engineering & Reasoning', 'PEFT LoRA Fine-Tuning', 'vLLM High-Throughput'],
  },
  {
    id: 'multi-agent',
    name: 'Autonomous AI Agents & Workflows',
    duration: '16 Weeks',
    level: 'Intermediate to Advanced',
    icon: Layers,
    accent: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.12)',
    highlights: ['LangGraph State Graphs', 'Persistent Checkpointers', 'Human-in-the-Loop Gates'],
  },
  {
    id: 'enterprise-rag',
    name: 'Enterprise RAG & Production LLMOps',
    duration: '12 Weeks',
    level: 'Intermediate',
    icon: Database,
    accent: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.12)',
    highlights: ['Qdrant Hybrid Search (Dense+BM25)', 'Cohere Rerank 3', 'LangSmith Tracing & Guardrails'],
  },
  {
    id: 'fullstack-cloud',
    name: 'Full Stack Cloud Engineering',
    duration: '14 Weeks',
    level: 'All Levels',
    icon: Code2,
    accent: '#3b82f6',
    accentBg: 'rgba(59, 130, 246, 0.12)',
    highlights: ['React & Next.js 15', 'Node.js & FastAPIs', 'Docker Microservices'],
  },
  {
    id: 'data-science',
    name: 'Data Science & Machine Learning',
    duration: '12 Weeks',
    level: 'Foundational to Applied',
    icon: BookOpen,
    accent: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    highlights: ['PyTorch Neural Networks', 'Feature Stores & Pipeline CI/CD', 'Statistical Inference'],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenGuidance,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useRouter();
  const { user, profile, logout, isAdmin } = useAuth();

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smoothly scroll and render target section on page
  const handleJumpToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 120);
  };

  // Scroll to bottom form for users to fill
  const handleExploreToBottomForm = (courseName?: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setTimeout(() => {
          const input = document.getElementById('contact-name-input');
          if (input) input.focus();
        }, 650);
      }
    }, 120);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-nav transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 cursor-pointer"
          >
            {/* TopQ Brand Mark */}
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              TopQ <span className="text-emerald-600 dark:text-emerald-400 font-bold">Academy</span>
            </span>
          </a>

          {/* Zone 2: Desktop Horizontal Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300"
          >
            <button
              onClick={() => navigate('/genai')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Gen AI Tracks
            </button>
            <button
              onClick={() => navigate('/curriculum')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Curriculum
            </button>
            <button
              onClick={() => navigate('/aiimpact')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              AI Impact
            </button>
            <button
              onClick={() => navigate('/placementdesk')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Placement Desk
            </button>
          </nav>

          {/* Zone 3: Actions (Auth + Theme switch + Guidance + 3-DOTS MENU) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* User Session Buttons */}
            {user || profile ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                    {(profile?.name || user?.email || 'U')[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">{profile?.name?.split(' ')[0] || 'Dashboard'}</span>
                </button>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Register
                </button>
              </div>
            )}

            {/* Light/Dark Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              title={isDark ? 'Switch to Day Alpine View' : 'Switch to Night Starlight View'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Desktop Primary Action Button */}
            <button
              onClick={() => onOpenGuidance()}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <span>Get Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* 3-DOTS MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open vertical menu and course exploration"
              aria-expanded={isMobileMenuOpen}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800/90 border border-slate-200/90 dark:border-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              title="Open Navigation & Course Directory"
            >
              <MoreVertical className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </button>
          </div>
        </div>
      </header>

      {/* 3-DOTS VERTICAL DRAWER / MODAL */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation & Course Sections Menu"
          className="fixed inset-0 z-[70] flex justify-end bg-slate-950/75 backdrop-blur-md animate-fade-in"
        >
          {/* Backdrop click-to-close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-over Content Drawer */}
          <div className="relative w-full max-w-md h-full max-h-screen overflow-y-auto glass-panel border-l border-slate-200/80 dark:border-slate-800 shadow-2xl p-5 sm:p-6 flex flex-col justify-between text-left space-y-6">
            
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                      TopQ <span className="text-emerald-600 dark:text-emerald-400">Academy</span>
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Curriculum &amp; Admissions Menu
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. VERTICAL NAVIGATION LIST (Matches User Screenshot) */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Curriculum &amp; Navigation Pages
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/genai');
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          Gen AI Tracks
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          Dedicated Pathways &amp; Swarms (/genai)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/curriculum');
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          16-Week Curriculum
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          Production Syllabus &amp; Modules (/curriculum)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/aiimpact');
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          AI Impact
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          Market Signals &amp; Research (/aiimpact)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/placementdesk');
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          Placement Desk
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          500+ Hiring Partners &amp; Mock Desks (/placementdesk)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          Student Dashboard
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          My Enrolled Cohorts &amp; Labs (/dashboard)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                  </button>
                </div>
              </div>

              {/* 2. COURSES SECTION WITH "EXPLORE" BUTTON (Scrolls to bottom form) */}
              <div className="space-y-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between px-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Courses &amp; Specializations
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    Click Explore to Apply
                  </span>
                </div>

                <div className="space-y-2.5">
                  {COURSES_CATALOG.map((course) => {
                    const Icon = course.icon;
                    return (
                      <div
                        key={course.id}
                        className="glass-card rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 transition-all text-left space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: course.accentBg,
                                color: course.accent,
                              }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {course.name}
                              </h4>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                {course.duration} · {course.level}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-1">
                          {course.highlights.slice(0, 2).map((h, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-[9px] font-mono font-medium text-slate-700 dark:text-slate-300"
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        {/* EXPLORE BUTTON -> SCROLLS TO BOTTOM FORM */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            1:1 Faculty Mentorship
                          </span>
                          <button
                            type="button"
                            onClick={() => handleExploreToBottomForm(course.name)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Drawer Action */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => handleExploreToBottomForm('Generative AI & LLMs')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <span>Explore All &amp; Fill Consultation Form</span>
                <Send className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] text-slate-500 dark:text-slate-400">
                Direct Mysore Campus (Saraswathipuram) &amp; Live Online Batches
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
