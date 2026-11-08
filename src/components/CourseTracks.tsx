/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, BookOpen, Layers, Check, Clock, MapPin, Award, Code2 } from 'lucide-react';

interface CourseTracksProps {
  onOpenSyllabus: (trackName: string) => void;
}

export const CourseTracks: React.FC<CourseTracksProps> = ({ onOpenSyllabus }) => {
  const [selectedPathway, setSelectedPathway] = useState<'genai' | 'fullstack' | 'datascience'>('genai');

  // Render to bottom for filling the form when user clicks explore
  const handleExploreToForm = (courseName?: string) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('contact-name-input');
        if (input) input.focus();
      }, 600);
    } else {
      onOpenSyllabus(courseName || 'Generative AI & LLMs');
    }
  };

  return (
    <section id="tracks" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header: Learning Pathways */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Choose What You Want to Build
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            Our Learning Pathways
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium max-w-2xl mx-auto">
            Industry-aligned immersive curricula designed to take you from foundational understanding to shipping production architectures.
          </p>
        </div>

        {/* 3 Overview Pathway Cards (Matching Video 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pathway 1 */}
          <div
            onClick={() => {
              setSelectedPathway('genai');
              handleExploreToForm('Generative AI & LLMs');
            }}
            className={`glass-card rounded-2xl p-6 border transition-all cursor-pointer text-left relative overflow-hidden group ${
              selectedPathway === 'genai'
                ? 'ring-2 ring-emerald-500 shadow-xl'
                : 'hover:scale-[1.01]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Gen AI &amp; Multi-Agent Engineering
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mt-2 line-clamp-3">
              Master real-world Generative AI, autonomous agents with LangGraph, fine-tuning, and enterprise RAG systems with guaranteed placement mentorship.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Explore &amp; Fill Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pathway 2 */}
          <div
            onClick={() => {
              setSelectedPathway('fullstack');
              handleExploreToForm('Full Stack Cloud Engineering');
            }}
            className={`glass-card rounded-2xl p-6 border transition-all cursor-pointer text-left relative overflow-hidden group ${
              selectedPathway === 'fullstack'
                ? 'ring-2 ring-emerald-500 shadow-xl'
                : 'hover:scale-[1.01]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Full Stack Development
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mt-2 line-clamp-3">
              Modern full-stack cloud engineering with React, Next.js, Node.js, distributed databases, event queues, and Docker microservices.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span>Explore &amp; Fill Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pathway 3 */}
          <div
            onClick={() => {
              setSelectedPathway('datascience');
              handleExploreToForm('Data Science & Machine Learning');
            }}
            className={`glass-card rounded-2xl p-6 border transition-all cursor-pointer text-left relative overflow-hidden group ${
              selectedPathway === 'datascience'
                ? 'ring-2 ring-emerald-500 shadow-xl'
                : 'hover:scale-[1.01]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Data Science &amp; Machine Learning
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mt-2 line-clamp-3">
              Applied predictive modeling, PyTorch neural networks, feature stores, model serving, and statistical inference at scale.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Explore &amp; Fill Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Detailed Flagship Course Tracks (Matching Video 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* Flagship Track 1 */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between text-left relative">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span>FOUNDATIONS</span>
                <span aria-hidden="true">·</span>
                <span>PROMPTING</span>
                <span aria-hidden="true">·</span>
                <span>LLM APIS</span>
                <span aria-hidden="true">·</span>
                <span>RAG</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                Generative AI &amp; Large Language Models (LLMs)
              </h3>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200/60 dark:border-slate-800/60 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Learning Mode</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Project-led</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Level</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Beginner to Advanced</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Duration</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">12–16 Weeks (Mysore &amp; Online)</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Enrollment</span>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Open for Next Cohort</div>
                </div>
              </div>

              {/* Syllabus points */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Prompt Engineering, Output Structuring &amp; Reasoning Frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>OpenAI, Claude 3.5 Sonnet, Gemini &amp; Hugging Face APIs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Embeddings, Vector Databases (ChromaDB / Pinecone) &amp; Semantic Search</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Production Retrieval-Augmented Generation (RAG) with Citations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Hallucination Audits, Guardrails &amp; LLM Output Evaluations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Placement assistance &amp; portfolio showcase project</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={() => handleExploreToForm('Generative AI & LLMs')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore &amp; Fill Application Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Flagship Track 2 */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between text-left relative">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span>MULTI-AGENT SYSTEMS</span>
                <span aria-hidden="true">·</span>
                <span>LANGGRAPH</span>
                <span aria-hidden="true">·</span>
                <span>CREWAI</span>
                <span aria-hidden="true">·</span>
                <span>LOOPS</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                Autonomous AI Agents &amp; Agentic Workflows
              </h3>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200/60 dark:border-slate-800/60 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Learning Mode</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Engineering-led</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Level</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Intermediate to Advanced</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Duration</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">12–16 Weeks (Mysore &amp; Online)</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Enrollment</span>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Open for Next Cohort</div>
                </div>
              </div>

              {/* Syllabus points */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Agentic Architectures: ReAct Reasoning Loops &amp; Tool Calling</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Multi-Agent Orchestration with LangGraph, CrewAI &amp; AutoGen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Local LLM Inference with Ollama &amp; vLLM with Context Caching</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Human-in-the-Loop Approval, State Recovery &amp; Fallbacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>LLMOps Tracing, Latency/Cost Optimization &amp; Model Governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Placement assistance &amp; architecture review capstone</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={() => handleExploreToForm('Autonomous AI Agents & Agentic Workflows')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore &amp; Fill Application Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseTracks;
