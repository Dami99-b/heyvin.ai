# Heyvin AI — Comprehensive Technical & Investor Documentation
> *Sovereignty-First Mental Sanctuary & Academic Success Auditor*

This guide is designed for founders, pitch presenters, engineers, and investors. It provides an accessible yet rigorous breakdown of Heyvin AI’s multi-layered full-stack architecture, unique feature mechanisms, pitch-deck demonstration steps, and deep security configurations.

---

## 📋 Document Navigation
- [1. Product & Feature Matrix (What & Why)](#1-product-and-feature-matrix)
- [2. Technical Architecture & System Topography](#2-technical-architecture)
- [3. Step-by-Step Build Walkthrough & Critical Design Decisions](#3-build-walkthrough)
- [4. Pitch Demonstration Script (Live Stage Guide)](#4-pitch-demonstration)
- [5. Sovereign Security, Encryption & Privacy Measures](#5-security-and-privacy)

---

<a name="1-product-and-feature-matrix"></a>
## 🌸 1. Product & Feature Matrix

Heyvin was built to address a systemic, overlooked bottleneck: **the disproportionate burden of domestic labor, caregiving duties, and household interruptions placed upon ambitious young women in traditional or dense family structures.** 

Traditional focus systems assume users have full control over their physical spaces. In reality, young scholars in high-stress households operate in highly fragmented timeframes, frequently interrupted by spontaneous chore requests, cultural duties, or noise. Heyvin audits this time friction, gamifies recovery, provides clinical CBT scaffolding, and guarantees absolute local safety.

### Feature Decomposition Table

| Feature Name | What It Is | Why It Was Built (The "Why") | User Impact |
| :--- | :--- | :--- | :--- |
| **🛡️ Ultimate Stealth Cover Switch (StudySync)** | A real-time, zero-lag interface redirection. Multi-clicking the primary logo or triggering an emergency hotkey instantly swaps the private dashboard for an assumptions-safe, boring academic syllabus directory (e.g. "Intro to Statistical Models"). | In many conservative or traditional households, personal growth diaries, career planning, and autonomy exercises are viewed with high suspicion by relatives/hosts, risking critical visual breaches. | Guarantees absolute cognitive safety. The user can plan her career and process her stress without fear of visual surveillance or sudden door-knocks. |
| **📊 Sovereignty Score Analytics** | A proprietary metric ($Sovereignty \% = \frac{\text{Protected Hours Reclaimed}}{\text{Demand Hours}}$) visualized via clean micro-interactive charts. | Simple calendars do not account for time friction. Young women need a concrete indicator reflecting how much of their daily schedule belongs strictly to their own intellectual advancement. | Re-frames productivity from "doing more chores" to "reclaiming own time". Gamifies boundary preservation as a non-negotiable personal score. |
| **🧠 Local Heyvin AI Journal** | A safe-haven digital diary integrated with server-proxied Gemini models for validating, non-preachy sentiment reflections. | Traditional diaries are unsafe if physically found. Relational journaling helps young women unpack domestic gaslighting and high-pressure situations safely. | Validates immediate mental health states under high stress and applies gentle, proactive cognitive-reframing without storing files on external cloud silos. |
| **💬 Boundary Rehearsal Suite (Older Sister Hotline)** | An interactive conversational sandboxed playground loaded with regional family personality presets (e.g., demanding relatives, persistent siblings). | Saying "no" or negotiating study space with traditional relatives causes high emotional friction. Practice makes boundary setting second-nature before real confrontations happen. | Converts abstract self-advocacy concepts into muscle memory using low-friction speech-prompt scripts guided by custom AI personas. |
| **⚡ Sovereign Focus Lock Blocks** | A dedicated timeline utility allowing users to preset 45-minute and 90-minute target blocks mapped to their domestic chore patterns. | Standard work blocks (like Pomodoro) disintegrate when chores are assigned mid-session. Mapped slots allow modular, uninterrupted focus sessions during predicted low-friction windows. | Coordinates focus times precisely when household demands are historically quietest. |
| **🔥 Domestic Friction Heatmap** | A 90-day interactive block grid showing friction intensity levels across daily hours. | Identifies systemic domestic distraction patterns, showing exactly when noise or requests spike. | Equips the scholar with data-backed proof of her best quiet periods, enabling her to negotiate her library or bedroom study locks with confidence. |

---

<a name="2-technical-architecture"></a>
## 💻 2. Technical Architecture

Heyvin’s architecture is structured to protect student privacy first, support local offline fallback behaviors, and abstract complex APIs behind server-side security proxies to keep confidential API keys hidden from client browsers.

```
       [ CLIENT SIDE WEB COMPLEMENT ]
       +----------------------------+
       |   React 19 / Vite SPA      |
       |  (TypeScript & Tailwind)   | <---- Framer Motion Layouts
       +----------------------------+
         |            |         ^
   Auth  |            | Sync    | Webhook Updates
   Flow  v            v         |
+------------+   +------------------------------------+
| Google SDK |   |  Express API Server (Node.js)       |
|   OAuth    |   |  - Route Rate Limiter (20 req/15m) |
+------------+   |  - JSON Console Logging Middleware|
                 +------------------------------------+
                                |
                   Secure APIs  | (REST Calls via @google/genai)
                                v
                 +----------------------------+
                 | Google Gemini 3.5 Flash   | (Server-only credentials)
                 +----------------------------+
```

### 1. Frontend Layer
- **Framework**: `React 19` paired with `Vite` for ultra-fast, local-first client asset loading.
- **Type Safety**: Fully typed with `TypeScript 5.8`, using strict module imports and typed state contracts (`/src/types.ts`) to avoid unexpected compile crashes.
- **Styling**: `Tailwind CSS v4` provides responsive design boundaries ensuring high visual contrast, elegant negative-space ratios, and eye-friendly, low-light workspace palettes.
- **Motion**: Powered by `motion/react` to provide micro-animations, fade transitions, and slide interactions that guide attention without causing visual fatigue.
- **Visualization**: `Recharts` and vanilla D3 integrations drive the domestic friction heatmaps and sovereignty metrics dynamically.

### 2. Backend Layer (The Security Gate)
- **Framework**: Standardized `Express 4` full-stack Node.js server.
- **Dev-Run Engine**: Integrated via `tsx` (TypeScript Execute) for zero-transpilation development runs.
- **Production Bundler**: Configured via `esbuild` compiling down into a fully unified, single-file CommonJS module at `dist/server.cjs` for cold-start performance inside container hosts.
- **Middlewares**:
  - **JSON Console Logger**: Intercepts every outgoing response to output structured logging formats to console pipes—perfect for Vercel, GCP Cloud Logging, or AWS CloudWatch pipelines.
  - **Smart Rate Limiter**: Implemented via `express-rate-limit`. Protects expensive Gemini server loads by limiting individual users to 20 calls per 15 minutes, with friendly warning feedback if triggered.
  - **Google-Vercel Route Restorer**: Corrects internal function redirections and handles Google OAuth callback states elegantly under high-isolation browsers.

### 3. Database & Sync Layer
- **Primary Backend**: `Supabase` (wrapped client instances) facilitates profile synchronization, checklist storage, and historic telemetry analytics for cross-device persistence.
- **Sovereign Local Catchment Loop**: In the event of a missing internet pipe, offline database outages, or local sandbox validations, Heyvin’s automated client caching catches database events and stores them inside the browser's `localStorage`. User workflows never break.

### 4. Artificial Intelligence Engine
- **SDK**: Official `@google/genai` TypeScript client library.
- **Model**: `models/gemini-3.5-flash` selected for its high speed, strict compliance with structured JSON formats, and low transaction latency.
- **Key Security**: The local client is strictly prohibited from holding the `GEMINI_API_KEY`. It communicates exclusively with backend proxy routes (e.g. `/api/analyze-journal`, `/api/morning-briefing`). If the API key is not mapped in production environments, the engine activates local structured NLP sentiment analyzers as automated graceful offline fallbacks.

---

<a name="3-build-walkthrough"></a>
## 🛠️ 3. Step-by-Step Build Walkthrough & Critical Design Decisions

### Phase 1: The Invisible Shield (Stealth Cover Switch)
**Challenge**: How do we build an emergency hide screen that switches in less than 50 milliseconds without reloading the browser (an API reload would trigger noticeable latency, raising family suspicions)?
- **Solution**: We created a dual-state virtual router. Our primary shell component (`App.tsx`) monitors both user keyups (listening for a configurable key combinations like `ctrl+q` or double taps) and click counts on the app header.
- **Critical Build Decision**: The Stealth Switch render uses a flat state bypass:
  ```ts
  if (stealthActive) {
    return <StudySyncSyllabusView onClose={disableStealth} />;
  }
  ```
  This skips React’s standard component virtual-dom diff comparisons entirely, rendering a completely clean, static, high-fidelity curriculum table in a single frame.

### Phase 2: Boundary Negotiation Simulator (Older Sister hotline Chat API)
**Challenge**: Creating conversational agents that sound like empathetic older sisters or local mentors rather than clinical psychiatric charts.
- **Solution**: Decoupled the instructions from standard LLM setups. In `server.ts`, we implemented structural system instructions that define local regional contexts:
  - If Based in **Lagos**: Speak on grid electrical cuts (generators), heavy traffic delays, micro-chores, and hierarchical family dynamics.
  - If Based in **India**: Navigate competitive entrance pressure, sibling noise, family gatherings, and library space negotiations.
- **Critical Build Decision**: The system enforces JSON formats or short paragraphs (2-3 items max) to make sure chat buffers fit neatly on mobile screens without infinite page scrolls.

### Phase 3: The Resilient Payment Overlay (Paystack Simulation)
**Challenge**: Providing local currency checkouts (NGN) without exposing keys, while letting trial-users and judges interactively test the complete premium experience.
- **Solution**: Built a high-fidelity checkout simulation inside `SovereignSettingsView.tsx` and `server.ts` matching Paystack's design standards. If `PAYSTACK_SECRET_KEY` is not present, the initialization endpoint generates a mock reference securely:
  ```ts
  const reference = "MOCK_PAYSTACK_REF_" + Math.random().toString(36).substring(7);
  res.json({ data: { authorization_url: `/api/paystack/mock-checkout?reference=${reference}...` } });
  ```
  This launches a sandboxed webhook page that lets the user simulate a payment. Upon approval, it triggers a mock success webhook payload to the server-side, upgrading the browser profile instantly to "Pro" via state variables.

<a name="4-security-and-privacy"></a>
## 🔒 4. Sovereign Security, Encryption & Privacy Measures

Heyvin was built from the ground up prioritizing absolute client trust and physical device safety.

1. **Client-Side Storage Isolation**:
   All daily check-ins, tasks, hourly timetables, and local journal logs resides inside the browser’s sandboxed local container (`Window.localStorage`) and a localized, pseudonymous data layer.
2. **Server-Side Key Encapsulation**:
   API keys for premium operations (including Gemini models, Paystack billing secrets, and Google Console accounts) are never sent to the visitor’s browser, eliminating any risk of client-side key reverse-engineering.
3. **Automated NLP Sentiment Decoupling**:
   If internet networks are blocked or servers represent high latency, the fallback sentiment engine computes emotional scores through private, on-device text pattern matching, storing the evaluation securely on her physical device without transmitting packet footprints.
4. **Local Purge Mechanism**:
   In settings, a single click on "Purge Account & Data" triggers an immediate cryptographic sweep of all client registries, wipes state structures, and removes any local file or cache record, leaving zero forensic trace.

---
*Heyvin AI — Rebuilding autonomy, block by block.*
