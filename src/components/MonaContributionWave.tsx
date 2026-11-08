/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Gen AI Interactive Exploration & Cursor-Following Butterfly
 * Features:
 * - Animated glowing 3D-feeling Butterfly that flutters its wings and glides smoothly to cursor
 * - Bioluminescent flight trail and stardust particles
 * - Interactive Neural Activity Wave Grid reacting to the butterfly & cursor
 * - In-depth Generative AI Engineering Architecture:
 *   1. Autonomous Multi-Agent Swarms (LangGraph, MCP, Persistent State)
 *   2. Enterprise Production RAG & Vector Intelligence (Qdrant, Hybrid Retrieval)
 *   3. SLM Fine-Tuning & High-Throughput Inference (PEFT LoRA, AWQ, vLLM)
 *   4. LLMOps, Guardrails & Rigorous Evaluation (LangSmith, NeMo Guardrails)
 * - Interactive pillar selection that illuminates corresponding neural weight paths
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Bot,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Workflow,
  ArrowRight,
  TrendingUp,
  Layers,
} from 'lucide-react';

const ROWS = 7;
const COLS = 28;

// Neural / Contribution wave palette: Only 2 colors that match the mountain background
const WAVE_COLORS = [
  '#10b981', // 1. Emerald Green (Signature TopQ Brand & Alpine Mountain)
  '#06b6d4', // 2. Glacial Cyan (Alpine River & Starlight Sky)
];

// Gen AI Core Architecture Pillars
interface GenAIPillar {
  id: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  metrics: string;
  stack: string[];
  topics: string[];
  prodProject: string;
}

const GEN_AI_PILLARS: GenAIPillar[] = [
  {
    id: 'multi-agent',
    title: 'Autonomous Multi-Agent Swarms',
    tagline: 'Orchestrate collaborative AI agent swarms with deterministic state and memory.',
    icon: Bot,
    accentColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    metrics: '< 850ms Swarm Consensus',
    stack: ['LangGraph', 'AutoGen 0.4', 'CrewAI', 'Anthropic MCP', 'FastAPI'],
    topics: [
      'Directed Acyclic State Graphs & Memory Checkpointers',
      'Dynamic Tool Calling with Pydantic JSON Schema',
      'Human-in-the-Loop Approval & Escalation Gates',
      'Multi-Agent Debate & Self-Reflective Loops',
    ],
    prodProject: 'Production Autonomous Financial Analyst Swarm auditing 10-K SEC filings.',
  },
  {
    id: 'production-rag',
    title: 'Enterprise Hybrid RAG & Vector DB',
    tagline: 'Sub-120ms semantic search over millions of high-dimensional multi-modal documents.',
    icon: Database,
    accentColor: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.12)',
    metrics: '98.6% Rerank Precision',
    stack: ['Qdrant HNSW', 'Milvus 2.4', 'Cohere Rerank 3', 'BGE-M3', 'Unstructured.io'],
    topics: [
      'Dense (BGE-M3) + BM25 Sparse Hybrid Vector Fusion (RRF)',
      'Parent-Child Document Chunking & Window Retrieval',
      'Cross-Encoder Contextual Reranking Pipelines',
      'Contextual Compression & Hallucination Elimination',
    ],
    prodProject: 'Zero-Hallucination Enterprise Legal Research Engine indexing 1.5M PDF pages.',
  },
  {
    id: 'fine-tuning',
    title: 'SLM Fine-Tuning, PEFT & vLLM',
    tagline: 'Adapt open weights to proprietary domain tasks with ultra-efficient GPU quantization.',
    icon: Cpu,
    accentColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    metrics: '148 tokens/sec on Single GPU',
    stack: ['PyTorch 2.4', 'PEFT LoRA / QLoRA', 'Hugging Face TGI', 'AWQ 4-Bit', 'vLLM'],
    topics: [
      'Rank-Stabilized LoRA & QLoRA Adapter Training',
      'Continuous Batching & PagedAttention with vLLM',
      'Instruction Dataset Synthesis & Clean Deduplication',
      'Post-Training 4-Bit AWQ & GPTQ Model Quantization',
    ],
    prodProject: 'Domain-adapted Llama-3.3 8B SLM with 40% memory reduction & custom tool syntax.',
  },
  {
    id: 'llmops-eval',
    title: 'LLMOps, Guardrails & Evaluation',
    tagline: 'Continuous regression testing, output validation, and zero-trust security firewalls.',
    icon: ShieldCheck,
    accentColor: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.12)',
    metrics: '100% Schema Validation Guarantee',
    stack: ['LangSmith', 'NeMo Guardrails', 'Ragas Framework', 'DeepEval', 'OpenTelemetry'],
    topics: [
      'Distributed Token Latency & Cost Telemetry Tracing',
      'Prompt Injection & Jailbreak Defense Firewalls',
      'Automated LLM-as-a-Judge Continuous Test Harness',
      'Semantic Caching for 60%+ Cloud API Cost Savings',
    ],
    prodProject: 'Enterprise Banking Gateway with real-time PII redaction and fail-safe fallback routing.',
  },
];

// Subtle, fading sparkle particle interface for cursor & butterfly trail
interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
  shape: 'star' | 'diamond' | 'orb';
  rotation: number;
  rotSpeed: number;
  twinkleFreq: number;
}

const SPARKLE_PALETTE = [
  '#10b981', // emerald-500
  '#06b6d4', // cyan-500
  '#34d399', // emerald-400
  '#22d3ee', // cyan-400
  '#ffffff', // bright starlight
];

export const MonaContributionWave: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const lastCursorPos = useRef<{ x: number; y: number } | null>(null);

  // Direct DOM refs for zero-re-render 60fps tracking
  const targetPosRef = useRef({ x: 420, y: 110 });
  const butterflyElRef = useRef<HTMLDivElement | null>(null);
  const beamLineRef = useRef<SVGLineElement | null>(null);
  const targetCrosshairRef = useRef<HTMLDivElement | null>(null);
  const posTextRef = useRef<HTMLSpanElement | null>(null);
  const cellElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeCellsRef = useRef<Set<number>>(new Set());
  const isHoveredRef = useRef(false);
  const containerRectRef = useRef<DOMRect | null>(null);
  const containerDimRef = useRef({ width: 880, height: 230 });

  // Active pillar state for bottom content selection
  const [activePillarId, setActivePillarId] = useState<string | null>('multi-agent');

  // Spawn subtle fading sparkle particles at specified coordinate
  const spawnSparkles = (x: number, y: number, count = 1, isCursor = false) => {
    const particles = particlesRef.current;
    if (particles.length > 35) return; // Ultra-lean particle budget for maximum INP score

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isCursor ? Math.random() * 1.5 + 0.4 : Math.random() * 2.2 + 0.6;
      const color = SPARKLE_PALETTE[Math.floor(Math.random() * SPARKLE_PALETTE.length)];
      const shapes: ('star' | 'diamond' | 'orb')[] = ['star', 'diamond', 'orb'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed * 0.5,
        vy: Math.sin(angle) * speed * 0.5 - (isCursor ? 0.35 : 0.6), // gentle buoyant upward drift
        size: shape === 'star' ? Math.random() * 3 + 2.5 : Math.random() * 2.5 + 1.8,
        maxLife: Math.floor(Math.random() * 20 + 25), // ~30-45 frames
        life: 0,
        color,
        shape,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.14,
        twinkleFreq: Math.random() * 0.3 + 0.15,
      });
    }
  };

  // Generate grid cells with baseline wave pattern (only once)
  const gridCells = useMemo(() => {
    const cells: { row: number; col: number; baseColorIndex: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const waveH = Math.sin(c * 0.35 + r * 0.2) * 3 + 3;
        const isColored = r >= 6 - Math.round(waveH);
        const colorIdx = (c + r * 2) % WAVE_COLORS.length;
        cells.push({
          row: r,
          col: c,
          baseColorIndex: isColored ? colorIdx : -1,
        });
      }
    }
    return cells;
  }, []);

  // Smooth rAF tracking loop for Butterfly, Beam, Sparkles & Matrix (zero React re-renders)
  useEffect(() => {
    let animId: number;
    let currentX = 420;
    let currentY = 110;
    let currentAngle = 0;
    let butterflySparkleCounter = 0;
    let waveTick = 0;
    let isVisible = true;

    // Resize canvas to match container with DPI scaling
    const updateCanvasSize = () => {
      const canvas = sparkleCanvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      containerRectRef.current = rect;
      containerDimRef.current = { width: rect.width || 880, height: rect.height || 230 };
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.resetTransform?.();
        ctx.scale(dpr, dpr);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize, { passive: true });

    // Pause animation when scrolled offscreen to guarantee 0% main-thread load
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const tick = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(tick);
        return;
      }

      waveTick += 0.05;
      const target = targetPosRef.current;
      const dx = target.x - currentX;
      const dy = target.y - currentY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Smooth damped lerp with subtle natural flutter wobble
      const wobbleY = Math.sin(Date.now() * 0.008) * 1.5;
      const wobbleX = Math.cos(Date.now() * 0.006) * 1.2;

      currentX += dx * 0.11 + wobbleX;
      currentY += dy * 0.11 + wobbleY;

      // Realistic butterfly flight angle
      if (dist > 6) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let diff = (targetAngle - currentAngle + 180) % 360 - 180;
        currentAngle += diff * 0.14;

        if (butterflySparkleCounter++ % 3 === 0) {
          spawnSparkles(currentX, currentY + 14, 1, false);
        }
      } else {
        const targetAngle = Math.sin(Date.now() * 0.004) * 8;
        currentAngle += (targetAngle - currentAngle) * 0.1;

        if (Math.random() < 0.04) {
          spawnSparkles(currentX + (Math.random() - 0.5) * 20, currentY + (Math.random() - 0.5) * 16, 1, false);
        }
      }

      // 1. Direct GPU Transform on Butterfly element (Zero React setState overhead)
      if (butterflyElRef.current) {
        butterflyElRef.current.style.transform = `translate3d(${currentX - 36}px, ${currentY - 36}px, 0) rotate(${currentAngle}deg)`;
      }

      // 2. Direct SVG beam update
      if (beamLineRef.current) {
        beamLineRef.current.setAttribute('x1', String(currentX));
        beamLineRef.current.setAttribute('y1', String(currentY));
        beamLineRef.current.setAttribute('x2', String(target.x));
        beamLineRef.current.setAttribute('y2', String(target.y));
      }

      // 3. Update Position Text
      if (posTextRef.current) {
        posTextRef.current.textContent = `Position: (${Math.round(currentX)}, ${Math.round(currentY)})`;
      }

      // 4. Targeted Grid Tiles Highlight: localized 7x7 grid check around butterfly (replaces 196 cell scan)
      const newActiveSet = new Set<number>();
      const width = containerDimRef.current.width || 880;
      const height = containerDimRef.current.height || 230;
      const approxCol = Math.round((currentX / width) * COLS);
      const approxRow = Math.round((currentY / height) * ROWS);

      const minR = Math.max(0, approxRow - 3);
      const maxR = Math.min(ROWS - 1, approxRow + 3);
      const minC = Math.max(0, approxCol - 4);
      const maxC = Math.min(COLS - 1, approxCol + 4);

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          const idx = r * COLS + c;
          const cell = gridCells[idx];
          if (!cell) continue;
          const cellCenterX = (cell.col / COLS) * 880;
          const cellCenterY = (cell.row / ROWS) * 190;
          const distToCell = Math.hypot(cellCenterX - currentX, cellCenterY - currentY);

          if (distToCell < 95) {
            newActiveSet.add(idx);
            if (!activeCellsRef.current.has(idx)) {
              const el = cellElementsRef.current[idx];
              if (el) {
                const dynamicColor = WAVE_COLORS[(cell.col + cell.row) % WAVE_COLORS.length];
                el.style.backgroundColor = dynamicColor;
                el.style.transform = 'scale(1.22)';
                el.style.boxShadow = `0 0 14px ${dynamicColor}95`;
              }
            }
          }
        }
      }

      // Reset cells that left the radius
      for (const prevIdx of activeCellsRef.current) {
        if (!newActiveSet.has(prevIdx)) {
          const el = cellElementsRef.current[prevIdx];
          if (el) {
            const cell = gridCells[prevIdx];
            const isLit = cell.baseColorIndex >= 0;
            const baseColor = isLit
              ? WAVE_COLORS[cell.baseColorIndex % WAVE_COLORS.length]
              : 'var(--tile-empty, rgba(148, 163, 184, 0.25))';
            el.style.backgroundColor = baseColor;
            el.style.transform = 'scale(1)';
            el.style.boxShadow = isLit ? `0 2px 6px ${baseColor}30` : 'none';
          }
        }
      }
      activeCellsRef.current = newActiveSet;

      // 5. Render Canvas Sparkle Particles (using cached dims to eliminate layout thrashing)
      const canvas = sparkleCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = containerDimRef.current.width;
          const h = containerDimRef.current.height;

          ctx.clearRect(0, 0, w, h);

          const particles = particlesRef.current;
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.015;
            p.vx *= 0.96;
            p.life += 1;
            p.rotation += p.rotSpeed;

            if (p.life >= p.maxLife) {
              particles.splice(i, 1);
              continue;
            }

            const progress = p.life / p.maxLife;
            const fadeIn = Math.min(1, p.life / 5);
            const fadeOut = Math.pow(1 - progress, 1.4);
            const twinkle = 0.78 + 0.22 * Math.sin(p.life * p.twinkleFreq);
            const alpha = Math.max(0, Math.min(1, fadeIn * fadeOut * twinkle * 0.95));

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;

            if (p.shape === 'star') {
              ctx.beginPath();
              const rOuter = p.size;
              const rInner = p.size * 0.26;
              for (let s = 0; s < 8; s++) {
                const r = s % 2 === 0 ? rOuter : rInner;
                const a = (s * Math.PI) / 4;
                if (s === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
                else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
              }
              ctx.closePath();
              ctx.fill();
            } else if (p.shape === 'diamond') {
              ctx.beginPath();
              ctx.moveTo(0, -p.size);
              ctx.lineTo(p.size * 0.55, 0);
              ctx.lineTo(0, p.size);
              ctx.lineTo(-p.size * 0.55, 0);
              ctx.closePath();
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [gridCells]);

  // Handle cursor mouse move using cached rect (Zero layout reflow)
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
    if (targetCrosshairRef.current) {
      targetCrosshairRef.current.style.opacity = '1';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let rect = containerRectRef.current;
    if (!rect && containerRef.current) {
      rect = containerRef.current.getBoundingClientRect();
      containerRectRef.current = rect;
    }
    if (!rect) return;
    const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
    const y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
    targetPosRef.current = { x, y };

    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      if (targetCrosshairRef.current) {
        targetCrosshairRef.current.style.opacity = '1';
      }
    }
    if (targetCrosshairRef.current) {
      targetCrosshairRef.current.style.transform = `translate3d(${x - 4}px, ${y - 6}px, 0)`;
    }

    const prev = lastCursorPos.current;
    if (!prev) {
      lastCursorPos.current = { x, y };
      spawnSparkles(x, y, 1, true);
    } else {
      const dist = Math.hypot(x - prev.x, y - prev.y);
      if (dist > 18) {
        spawnSparkles(x, y, 1, true);
        lastCursorPos.current = { x, y };
      }
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    targetPosRef.current = { x: 420, y: 110 };
    if (targetCrosshairRef.current) {
      targetCrosshairRef.current.style.opacity = '0';
    }
  };

  const handleTouchStart = () => {
    isHoveredRef.current = true;
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    let rect = containerRectRef.current;
    if (!rect && containerRef.current) {
      rect = containerRef.current.getBoundingClientRect();
      containerRectRef.current = rect;
    }
    if (!rect) return;
    const touch = e.touches[0];
    const x = Math.max(20, Math.min(rect.width - 20, touch.clientX - rect.left));
    const y = Math.max(20, Math.min(rect.height - 20, touch.clientY - rect.top));
    targetPosRef.current = { x, y };
    if (targetCrosshairRef.current) {
      targetCrosshairRef.current.style.transform = `translate3d(${x - 4}px, ${y - 6}px, 0)`;
    }
    spawnSparkles(x, y, 1, true);
  };

  const handlePillarClick = (pillarId: string) => {
    setActivePillarId(pillarId);
    const rect = containerRectRef.current;
    const width = rect?.width || containerDimRef.current.width || 880;
    const height = rect?.height || containerDimRef.current.height || 230;
    const pillarIndex = GEN_AI_PILLARS.findIndex((p) => p.id === pillarId);
    const targetX = (width / (GEN_AI_PILLARS.length + 1)) * (pillarIndex + 1);
    const targetY = height * 0.6;
    targetPosRef.current = { x: targetX, y: targetY };
    spawnSparkles(targetX, targetY, 4, true);
  };

  const activePillar = GEN_AI_PILLARS.find((p) => p.id === activePillarId) || GEN_AI_PILLARS[0];

  return (
    <section id="gen-ai" className="py-14 relative" aria-label="Generative AI Interactive Architecture">
      {/* CSS Styles for 3D Wing Flapping Animation */}
      <style>{`
        @keyframes butterflyFlapLeft {
          0% {
            transform: perspective(300px) rotateY(0deg) scaleX(1);
          }
          50% {
            transform: perspective(300px) rotateY(68deg) scaleX(0.45);
          }
          100% {
            transform: perspective(300px) rotateY(0deg) scaleX(1);
          }
        }
        @keyframes butterflyFlapRight {
          0% {
            transform: perspective(300px) rotateY(0deg) scaleX(1);
          }
          50% {
            transform: perspective(300px) rotateY(-68deg) scaleX(0.45);
          }
          100% {
            transform: perspective(300px) rotateY(0deg) scaleX(1);
          }
        }
        .flap-wing-left {
          transform-origin: right center;
          animation: butterflyFlapLeft 0.20s ease-in-out infinite;
        }
        .flap-wing-right {
          transform-origin: left center;
          animation: butterflyFlapRight 0.20s ease-in-out infinite;
        }
        .flap-wing-left-fast {
          transform-origin: right center;
          animation: butterflyFlapLeft 0.13s ease-in-out infinite;
        }
        .flap-wing-right-fast {
          transform-origin: left center;
          animation: butterflyFlapRight 0.13s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800 pb-6 text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                GEN AI & MULTI-AGENT ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                Interactive Gen AI Systems & Neural Activity Grid
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                Move your cursor anywhere across the neural matrix — our bioluminescent AI Butterfly flutters to your cursor in real time, illuminating neural weights across core Gen AI engineering pipelines.
              </p>
            </div>

            {/* Live Status Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
                <span>Cursor Tracking: Active</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                🦋 3D Butterfly Follower
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                Sparkle Trail: Active
              </div>
            </div>
          </div>

          {/* Interactive Matrix with Cursor-Following Butterfly */}
          <div className="relative space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-emerald-500" />
                Neural Activation Matrix (Hover / Tap to move the Butterfly)
              </span>
              <span ref={posTextRef} className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                Position: (420, 110)
              </span>
            </div>

            <div
              ref={containerRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="relative rounded-2xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-7 select-none overflow-hidden cursor-crosshair min-h-[230px] shadow-inner"
            >
              {/* Subtle grid background lines */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

              {/* Crosshair indicator at cursor */}
              <div
                ref={targetCrosshairRef}
                className="absolute pointer-events-none text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold leading-none select-none z-30 transition-opacity duration-150"
                style={{
                  opacity: 0,
                  transform: 'translate3d(416px, 104px, 0)',
                }}
              >
                <div className="relative">
                  <span className="text-sm">+</span>
                  <span className="absolute -top-4 -left-3 text-[9px] font-sans font-semibold tracking-wider text-emerald-700 dark:text-emerald-300 whitespace-nowrap bg-emerald-100/90 dark:bg-emerald-950/90 px-1.5 py-0.5 rounded shadow-sm">
                    AI Target
                  </span>
                </div>
              </div>

              {/* Glowing flight trajectory from Butterfly to target */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="butterflyBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <line
                  ref={beamLineRef}
                  x1="420"
                  y1="110"
                  x2="420"
                  y2="110"
                  stroke="url(#butterflyBeam)"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* High-Performance Canvas for Subtle Fading Sparkle Particles */}
              <canvas
                ref={sparkleCanvasRef}
                className="absolute inset-0 pointer-events-none z-25 w-full h-full"
              />

              {/* Neural Tiles Grid (Zero React re-render: direct ref-targeted updates) */}
              <div
                className="grid gap-1.5 sm:gap-2.5 justify-center items-center"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                }}
              >
                {gridCells.map((cell, idx) => {
                  const isLit = cell.baseColorIndex >= 0;
                  const baseColor = isLit
                    ? WAVE_COLORS[cell.baseColorIndex % WAVE_COLORS.length]
                    : 'var(--tile-empty, rgba(148, 163, 184, 0.25))';

                  return (
                    <div
                      key={`${cell.row}-${cell.col}`}
                      ref={(el) => {
                        cellElementsRef.current[idx] = el;
                      }}
                      className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-md sm:rounded-lg transition-transform duration-200"
                      style={{
                        backgroundColor: baseColor,
                        boxShadow: isLit ? `0 2px 6px ${baseColor}30` : 'none',
                      }}
                    />
                  );
                })}
              </div>

              {/* Cursor-Following 3D Animated Butterfly */}
              <div
                ref={butterflyElRef}
                className="absolute pointer-events-none z-40 select-none will-change-transform"
                style={{
                  transform: 'translate3d(384px, 74px, 0)',
                }}
              >
                <div
                  className="w-20 h-20 relative flex items-center justify-center filter"
                  style={{
                    filter:
                      'drop-shadow(0 0 14px rgba(16, 185, 129, 0.9)) drop-shadow(0 0 24px rgba(56, 189, 248, 0.7))',
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full select-none overflow-visible"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Left Wing Gradient (2 matching theme colors: Cyan & Emerald) */}
                      <linearGradient id="leftWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>

                      {/* Right Wing Gradient (2 matching theme colors: Cyan & Emerald) */}
                      <linearGradient id="rightWingGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>

                      {/* Wing Glow Filter */}
                      <filter id="bioluminescentGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Butterfly Antennae with glowing orbs */}
                    <path
                      d="M 48 30 Q 42 16 35 12"
                      stroke="#10b981"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="35" cy="12" r="2.2" fill="#34d399" filter="url(#bioluminescentGlow)" />

                    <path
                      d="M 52 30 Q 58 16 65 12"
                      stroke="#10b981"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="65" cy="12" r="2.2" fill="#34d399" filter="url(#bioluminescentGlow)" />

                    {/* LEFT WINGS GROUP (3D Flapping) */}
                    <g className="flap-wing-left">
                      {/* Upper Forewing */}
                      <path
                        d="M 50 42 C 35 24 15 20 8 36 C 2 48 18 64 50 56 Z"
                        fill="url(#leftWingGrad)"
                        fillOpacity="0.94"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        strokeOpacity="0.7"
                      />
                      {/* Inner bioluminescent veins */}
                      <path
                        d="M 50 44 C 36 34 22 34 16 42 M 50 48 C 34 46 22 52 18 56"
                        stroke="#ffffff"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.75"
                      />
                      {/* Lower Hindwing */}
                      <path
                        d="M 50 54 C 38 60 22 66 24 78 C 26 86 42 88 50 68 Z"
                        fill="#059669"
                        fillOpacity="0.9"
                        stroke="#34d399"
                        strokeWidth="0.8"
                      />
                      {/* Wing jewel spots */}
                      <circle cx="20" cy="38" r="2.5" fill="#facc15" />
                      <circle cx="28" cy="74" r="2" fill="#38bdf8" />
                    </g>

                    {/* RIGHT WINGS GROUP (3D Flapping) */}
                    <g className="flap-wing-right">
                      {/* Upper Forewing */}
                      <path
                        d="M 50 42 C 65 24 85 20 92 36 C 98 48 82 64 50 56 Z"
                        fill="url(#rightWingGrad)"
                        fillOpacity="0.94"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        strokeOpacity="0.7"
                      />
                      {/* Inner bioluminescent veins */}
                      <path
                        d="M 50 44 C 64 34 78 34 84 42 M 50 48 C 66 46 78 52 82 56"
                        stroke="#ffffff"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.75"
                      />
                      {/* Lower Hindwing */}
                      <path
                        d="M 50 54 C 62 60 78 66 76 78 C 74 86 58 88 50 68 Z"
                        fill="#059669"
                        fillOpacity="0.9"
                        stroke="#34d399"
                        strokeWidth="0.8"
                      />
                      {/* Wing jewel spots */}
                      <circle cx="80" cy="38" r="2.5" fill="#facc15" />
                      <circle cx="72" cy="74" r="2" fill="#38bdf8" />
                    </g>

                    {/* Central Butterfly Body / Thorax */}
                    <ellipse cx="50" cy="34" rx="3.5" ry="5" fill="#0f172a" />
                    <ellipse cx="50" cy="52" rx="3" ry="12" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
                    
                    {/* Glowing emerald dorsal stripe */}
                    <line x1="50" y1="42" x2="50" y2="60" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
                    
                    {/* Eye gems */}
                    <circle cx="48" cy="33" r="1.2" fill="#38bdf8" />
                    <circle cx="52" cy="33" r="1.2" fill="#38bdf8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Generative AI Core Pillars & Architecture Breakdown */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Generative AI Engineering Pillars Taught at TopQ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Select any pillar below to inspect its production stack, benchmark metrics, and hands-on deliverables.
                </p>
              </div>

              {/* Real-time PR metric */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                32 Production Pull Requests per Fellow
              </div>
            </div>

            {/* 4 Pillar Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GEN_AI_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                const isSelected = activePillarId === pillar.id;

                return (
                  <button
                    key={pillar.id}
                    onClick={() => handlePillarClick(pillar.id)}
                    className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border relative overflow-hidden group ${
                      isSelected
                        ? 'bg-white/95 dark:bg-slate-900/95 border-emerald-500 shadow-lg scale-[1.02] ring-2 ring-emerald-500/30'
                        : 'bg-white/60 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/80 dark:hover:bg-slate-900/80'
                    }`}
                  >
                    {/* Top Accent Indicator */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-all"
                      style={{
                        backgroundColor: isSelected ? pillar.accentColor : 'transparent',
                      }}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: pillar.badgeBg,
                            color: pillar.accentColor,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {pillar.metrics.split(' ')[0]}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {pillar.tagline}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Deep Dive Detail Panel */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-50/90 to-white/90 dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: activePillar.accentColor }}
                  >
                    <activePillar.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Curriculum Deep Dive
                    </div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                      {activePillar.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Benchmark Target: <span className="font-bold">{activePillar.metrics}</span>
                </div>
              </div>

              {/* Topics & Production Deliverable */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Core Engineering Topics */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    Key Architecture Topics Covered
                  </div>
                  <ul className="space-y-2">
                    {activePillar.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Tech Stack Pills & Capstone Project */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Production Tech Stack Handled
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Shipped Production Capstone
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold">
                      {activePillar.prodProject}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MonaContributionWave;
