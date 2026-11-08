# TopQ Academy - Interactive 3D Gen AI Platform

A production-grade, highly performant web application featuring a scroll-driven **3D Mountain Ascent experience** (Three.js), real-time **Neural Activation Matrix**, and complete **Supabase PostgreSQL & Auth** integration.

---

## 🌟 Key Features

- **Procedural 3D Mountain Ascent (Three.js)**:
  - Interactive camera elevation and hiker character tracking based on scroll depth.
  - Adaptive frame pacing (30fps idle / 60fps active motion) keeping Core Web Vitals **INP < 50ms**.
  - Dynamic day/night theme transitions and responsive river/terrain shaders.
- **Interactive Neural Activation Matrix**:
  - Bioluminescent AI Butterfly cursor follower with stardust particle trail.
  - Direct DOM ref updates and zero-reflow layout math for instant rendering.
- **Enterprise Curriculum & Pathways**:
  - Detailed modules for Autonomous Multi-Agent Workflows (LangGraph), Production RAG (Qdrant), SLM Fine-Tuning, and LLMOps.
- **Full Authentication & Admin Portal**:
  - Supabase JWT authentication with Row Level Security (RLS).
  - Admin management portal for managing cohorts, counseling requests, and student enrollments with Excel export.
- **Instant Responsiveness**:
  - Optimized for **Core Web Vitals**: INP < 50ms, LCP < 1.6s, CLS < 0.01.
  - `touch-action: manipulation` eliminating mobile double-tap delays.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **3D Graphics**: Three.js (WebGL 2), HTML5 Canvas 2D
- **Backend & Database**: Supabase (PostgreSQL 15+, Row Level Security, Supabase Auth)
- **Bundler & Tooling**: Vite 8

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/DarshanDMCSE/topq_3D_website.git
cd topq_3D_website

# Install dependencies
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
```

---

## 📜 License
Apache-2.0 License
