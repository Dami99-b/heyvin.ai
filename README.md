# Heyvin - Private Focus & Personal Sanctuary Workspace

Heyvin is an offline-friendly, completely private personal success auditor and mental sanctuary designed for ambitious young women navigating domestic responsibilities, caretaking duties, or busy home environments. It helps students and young professionals protect their study hours, practice boundary setting, and pursue high-quality academic or career objectives with absolute confidentiality.

---

## 🌸 Our Mission

In many busy or traditional households, young women bear significant domestic demands and unexpected chores that fragment their available study hours. **Heyvin** is engineered to help you plan around these duties and measure your target hours while serving as a private support buffer.

Every feature of Heyvin operates under a **Strict Privacy Guarantee**: your diaries, study hours, and notes are not sent to global servers. They reside completely securely inside your local browser workspace.

---

## ✨ Key Features

### 1. 🛡️ Ultimate Stealth Cover Switch (StudySync)
If unannounced guests or family members enter your study space, triple-clicking the top Logo or hitting an emergency hotkey instantly transforms the interface into **StudySync**—an unassuming academic syllabus directory showing educational courses (like "Intro to Statistical Models"). Your personal goals, logs, and diaries remain completely hidden until you safely toggle them back.

### 2. 📊 Focus & Time Auditing
- **Focus Indicator Simulator**: See how domestic chores, noise levels, and interruptions affect your daily learning pacing.
- **Sovereignty Score**: Measure the portion of your day that belongs truly to your own personal growth.
- **Focus Pattern Grid**: Track distraction patterns and find the absolute best daily times to study in peace.

### 3. 🧠 Therapeutic Coping & Practice Sanctuary
- **Heyvin AI Journal**: Pour out thoughts in a secure local diary and receive comforting, optimistic guidance from Gemini.
- **Boundary Rehearsal Suite**: Interactive scenarios to practice boundary phrasing with relatives before real-life interruptions happen.
- **Support Shoutbox**: Share peer support pseudonymously with a feed of other young women striving for their goals.

### 4. 🔑 Multi-Channel Safe Onboarding
Supports fast, private local logins or instant **Google Sign-In** for quick connection to your workspace.

---

## 🛠️ Tech Stack & Setup

- **Frontend**: React 18 with Vite, TypeScript, and Tailwind CSS.
- **Backend API**: Node.js & Express server to proxy AI assistance API requests securely without exposing developer keys.
- **Storage**: Safe, local device-nested data storage.

---

## 🚀 Quick Local Development Setup

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Installation
Install all project dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a local `.env` file referencing the templates provided in `.env.example`:
```env
# Gemini API key for secure private journal insights
GEMINI_API_KEY=your_gemini_key

# Google OAuth credentials for safe login
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### 4. Directing Development Servers
To boot the full-stack server under the required port config (`3000`):
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 🔒 Security Commitments

1. **Local-First Privacy**: Your diaries, plans, and reports reside on your physical computer.
2. **Zero Third-Party Tracking**: We do not use third-party analytics cookies or hidden tracking scripts.
3. **Emergency Stealth Trigger**: Accessible hotkeys instantly transition the view to a normal academy syllabus layout.
