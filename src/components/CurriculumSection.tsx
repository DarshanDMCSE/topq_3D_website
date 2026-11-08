/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Layers, Code, Database, Cpu, ShieldCheck, Rocket } from 'lucide-react';

interface ModuleItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  topics: string[];
  techStack: string[];
}

const MODULES: ModuleItem[] = [
  {
    id: 'm1',
    number: '01',
    title: 'Foundations of Gen AI & Advanced Prompt Engineering',
    duration: '2 Weeks',
    icon: Code,
    topics: [
      'Transformer Architecture & Attention Mechanism Demystified',
      'System Prompts, Few-shot Demonstrations & Chain-of-Thought (CoT)',
      'Structured Outputs: Pydantic & JSON Schema Constraints',
      'API Integration: OpenAI GPT-4o, Claude 3.5 Sonnet & Gemini 2.5',
    ],
    techStack: ['OpenAI API', 'Anthropic Claude', 'Google GenAI', 'Pydantic'],
  },
  {
    id: 'm2',
    number: '02',
    title: 'Enterprise RAG Pipelines & Vector Databases',
    duration: '3 Weeks',
    icon: Database,
    topics: [
      'Chunking Strategies: Recursive, Semantic & Markdown Hierarchy',
      'Vector Embeddings: OpenAI text-embedding-3 & BGE-m3',
      'Vector Stores: Qdrant, Pinecone & Hybrid Sparse-Dense Search',
      'Query Expansion, Hypothetical Document Embeddings (HyDE) & Cross-Encoder Rerankers',
      'Context Window Optimization & Hallucination Mitigation with Citations',
    ],
    techStack: ['Qdrant', 'Pinecone', 'ChromaDB', 'Cohere Rerank', 'LlamaIndex'],
  },
  {
    id: 'm3',
    number: '03',
    title: 'Autonomous Agents & Multi-Agent Workflows',
    duration: '3 Weeks',
    icon: Layers,
    topics: [
      'ReAct Framework: Reasoning, Action, Observation Loops',
      'Function Calling & Dynamic Tool Orchestration',
      'Cyclical State Graphs with LangGraph: Nodes, Edges & Memory Checkpointers',
      'Human-in-the-Loop Interrupts & Resumption Workflows',
      'Hierarchical Multi-Agent Teams: Planner, Researcher, Coder, Critic',
    ],
    techStack: ['LangGraph', 'LangChain', 'CrewAI', 'AutoGen', 'Tavily Search'],
  },
  {
    id: 'm4',
    number: '04',
    title: 'Open-Weight Models, Fine-Tuning & Quantization',
    duration: '2 Weeks',
    icon: Cpu,
    topics: [
      'Open Weights: Llama 3.3, Mistral, Qwen 2.5 & DeepSeek',
      'Parameter-Efficient Fine-Tuning (PEFT) & LoRA / QLoRA',
      'Dataset Preparation, Instruct-Tuning & Tokenizer Alignment',
      'Inference Acceleration with vLLM, TensorRT-LLM & Ollama',
      'Model Quantization: AWQ, GPTQ & GGUF 4-bit precision',
    ],
    techStack: ['PyTorch', 'Hugging Face', 'vLLM', 'Ollama', 'LoRA / PEFT'],
  },
  {
    id: 'm5',
    number: '05',
    title: 'Production LLMOps, Guardrails & Evaluation',
    duration: '2 Weeks',
    icon: ShieldCheck,
    topics: [
      'Observability & Distributed Tracing with LangSmith & Arize Phoenix',
      'Automated Evaluation Frameworks: RAGAS, DeepEval & LLM-as-a-Judge',
      'Semantic Caching (Redis) & Token Budget / Cost Optimization',
      'Security & Guardrails: NeMo Guardrails, Prompt Injection Defense & PII Redaction',
      'CI/CD Testing Pipelines for Prompt Regressions',
    ],
    techStack: ['LangSmith', 'RAGAS', 'NeMo Guardrails', 'Redis', 'Docker'],
  },
  {
    id: 'm6',
    number: '06',
    title: 'Production Capstone Project & Architecture Defense',
    duration: '3 Weeks',
    icon: Rocket,
    topics: [
      'Architecting an Enterprise Multi-Agent Copilot for Real-World Industry Scenarios',
      'Full-Stack Integration with Next.js / React Frontend and Python Backend',
      'Streaming Tokens (SSE) & Real-Time Agent Thought Visualization',
      'Technical Code Review & Architecture Defense with Industry Mentors',
      'Placement Portfolio Preparation & Live Demo Deployment',
    ],
    techStack: ['FastAPI', 'Next.js', 'PostgreSQL', 'LangGraph', 'Cloud Run / AWS'],
  },
];

export const CurriculumSection: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<string>('m1');

  return (
    <section id="curriculum" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Engineered for Mastery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
            Comprehensive Curriculum Designed for Your Success
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium max-w-2xl mx-auto">
            16 intensive weeks combining engineering rigor, architecture trade-offs, and shipping real AI software.
          </p>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {MODULES.map((mod) => {
            const isExpanded = expandedModule === mod.id;
            const Icon = mod.icon;

            return (
              <div
                key={mod.id}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                  isExpanded
                    ? 'ring-2 ring-emerald-500 shadow-xl'
                    : 'hover:border-emerald-500/40'
                }`}
              >
                {/* Header row */}
                <button
                  id={`module-header-${mod.id}`}
                  aria-expanded={isExpanded}
                  aria-controls={`module-content-${mod.id}`}
                  onClick={() => setExpandedModule(isExpanded ? '' : mod.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      {mod.number}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                        {mod.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                        <span>{mod.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>{mod.topics.length} In-Depth Topics</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div
                    id={`module-content-${mod.id}`}
                    role="region"
                    aria-labelledby={`module-header-${mod.id}`}
                    className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-200/70 dark:border-slate-800/70 space-y-4"
                  >
                    {/* Topics Grid */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        What You Will Build &amp; Master:
                      </div>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {mod.topics.map((t, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills (Interactive button-style tags) */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Technologies &amp; Libraries:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mod.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 border border-emerald-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
