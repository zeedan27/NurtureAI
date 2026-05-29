# NurtureAI 🥗👶🩺

NurtureAI is a state-of-the-art, mobile-first maternal and child health support web application designed specifically for rural Bangladesh contexts. Operating in both English and Bangla, it equips mothers and community health workers with AI-driven triage guidance, comprehensive tracking tools, and evidence-based clinical information.

---

## 🚀 Key Features

### 1. 🩺 IMCI-Based Symptom Triage Engine
* **Hybrid Rule & AI Engine**: Runs a local, instant rule-based safety net first to classify symptoms (Level 1–4) under Integrated Management of Childhood Illness (IMCI) protocols, followed by an automated **Groq Llama-3.3 AI** enhancement.
* **Empathetic AI Advice**: Delivers rapid, bulleted, standardized checklists on home care, when to visit a Community Health Worker (CHW), or emergency hospital referrals.
* **Instant Sharing**: Level 2+ triage warnings generate a one-tap WhatsApp pre-formatted alert to share with emergency contacts or health clinics.

### 2. 💉 Interactive EPI Vaccination Tracker
* **National Schedule Alignment**: Tracks standard Bangladesh Expanded Programme on Immunization (EPI) doses from birth up to 15 months.
* **Bilingual Vaccine Detail Cards**: Tap any vaccine to instantly open a bottom details sheet showing what disease it prevents, potential consequences if missed, and normal side effects.
* **Progress Badging & Completion**: Tracks records dynamically per child and displays a celebration receipt with an offline "Save to Gallery" capability.

### 3. 🥗 Premium Child Nutrition & Local Recipes
* **Automatic Age-Band Tabs**: The app automatically identifies your child's age band (6-8M, 8-12M, 12-24M, 2-5Y), selects it by default, and marks it with a `👶` indicator.
* **High-Fidelity Drawer Modals**: View calorie tags and prep times at a glance. Tap any card to trigger a full-height `90vh` slide-up modal detailing localized ingredients (e.g., Semolina Porridge, Khichuri) and cooking guides.
* **MUAC Tape Guidance**: Provides step-by-step mid-upper arm circumference measurement instructions with green/yellow/red color interpretation bands for acute malnutrition detection.

### 4. 🧠 Traditional Myth Fact-Checker Chatbot
* **Cache-First Verified Beliefs**: Instantly matches queries against 30+ pre-seeded traditional maternal beliefs in Bangladesh (e.g., honey for newborns, teething fevers).
* **Groq AI Verification**: Caregivers can type custom beliefs to receive an empathetic, non-judgmental fact-check validated against WHO, UNICEF, and AAP pediatric standards.

### 5. 📋 Daily Care & Milestones Checklists
* **Task Celebrations**: Caregivers can mark interactive daily care lists (breastfeeding, outdoor light, massage) and view developmental milestones (motor, cognitive, social) with custom completion animations.

---

## 🛠️ Technological Stack

* **Frontend Framework**: Next.js 16 (Turbopack compiler)
* **Styling**: Tailwind CSS v4 & custom hardware-accelerated drawer transitions
* **State Management**: Zustand (with persistent localStorage middleware)
* **AI Model Engine**: Groq API (`llama-3.3-70b-versatile`)
* **Language**: Fully bilingual (Bangla 🇧🇩 / English 🇬🇧) toggled globally

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database connection for local storage/prisma
DATABASE_URL=file:./db/custom.db

# Groq API Key for Symptom Triage & Myth Chatbot
GROQ_API_KEY=your_groq_api_key_here
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the mobile-first dashboard.

### 3. Production Build
Ensure all types and components build successfully:
```bash
npm run build
```

---

## 📄 License
This project is prepared as part of the health-tech hackathon. All medical content is based on WHO IMCI and Bangladesh EPI standards. Please consult qualified doctors for medical emergencies.
