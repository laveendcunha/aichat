# 🚦 Road Safety Bot – A Hybrid AI-Based Road Safety Chatbot

A production-grade, full-stack web application developed for an **Indian Knowledge Systems (IKS)** academic experiment. The bot combines a deterministic local knowledge engine with backend-isolated AI model fallback, utilizing the 4-fold **Nyaya Pramana** logic framework (*Pratyaksha*, *Hetu*, *Anumana*, *Nigamana*) and interactive decision trees.

---

## 🎯 Academic Objective

The application demonstrates three core concepts:
1. **Hybrid Architecture**: Evaluates a deterministic local labeled knowledge base first; falls back to an AI API strictly through backend proxy only when required.
2. **Decision Support Systems**: Real interactive decision trees where user selections dynamically dictate follow-up safety interventions.
3. **Indian Logic Reasoning (IKS Nyaya)**: Explanatory 4-fold logical deduction (*Pratyaksha* → *Hetu* → *Anumana* → *Nigamana*) attached to both local dataset items and AI fallbacks.

---

## 🏛️ Indian Knowledge System (IKS) Framework

```
Observation (Situation)  ──►  Pratyaksha
Evidence / Reason        ──►  Hetu
Inference (Deduction)    ──►  Anumana
Conclusion (Action)      ──►  Nigamana
```

- **Pratyaksha (Observation)**: Direct physical observation of the user's scenario (e.g., riding without a helmet or night driving).
- **Hetu (Evidence / Reason)**: Mechanical, physical, or legal cause mandating intervention (e.g., kinetic energy absorption, deceleration force).
- **Anumana (Inference)**: Logical deduction connecting observation and evidence to unobserved risks (e.g., severe traumatic brain injury probability).
- **Nigamana (Conclusion)**: Final unambiguous safety instruction (e.g., fasten ISI/DOT certified helmet before continuing).

---

## 🔄 System Architecture

```
                 USER
                  │
        [ Text OR Voice Input ]
                  │
        (Web Speech-to-Text)
                  │
           React Frontend
                  │
           POST /api/chat
                  │
          Express Backend
                  │
   ┌──────────────┴──────────────┐
   ▼                             ▼
Decision Check            Local Knowledge Base
 (Flow Trigger)            (safetyData.json)
   │                             │
   ├─────── MATCH FOUND? ────────┤
   │             │               │
   │            YES              NO
   │             │               │
   ▼             ▼               ▼
Decision Card   Local Response  AI Service (Gemini)
 (Interactive)   (with IKS)      (with Nyaya 4-Fold)
   │             │               │
   └─────────────┼───────────────┘
                 ▼
         Structured Payload
   { source, response, reasoning }
                 │
           React Chat UI
   (Rendered with Source Badges &
    Expandable 🧠 IKS Reasoning Cards)
```

---

## 🚀 Running the Project

### Option A: Concurrent Start (Recommended)

Run from root directory `c:/Users/LAVEEN/Documents/chatbot/`:

```bash
npm install
npm run dev
```

*Starts both Backend Server (`http://localhost:5000`) and Frontend Client (`http://localhost:3000`) concurrently.*

### Option B: Separate Terminals

**1. Backend Server:**
```bash
cd server
npm install
npm run dev
```

**2. Frontend Client:**
```bash
cd client
npm install
npm run dev
```

---

## 🧪 Comprehensive Academic Test Cases

| Test # | Type | Input Query / Action | Expected Behavior & Engine |
| :--- | :--- | :--- | :--- |
| **TEST 1** | Local KB | `"Do I need to wear a helmet?"` | Source: `📚 LOCAL KNOWLEDGE` (Intent: `helmet`, with IKS Reasoning) |
| **TEST 2** | Decision Trigger | `"I am riding a bike."` | Source: `⚡ DECISION CHECK` (Helmet question card with `[ ✓ YES ]` `[ ✕ NO ]` buttons) |
| **TEST 3** | Decision Action | Click `NO` on helmet card | Bot responds: `"⚠️ Please wear a properly fitted helmet before continuing..."` |
| **TEST 4** | Local KB | `"Can I use my phone while driving?"` | Source: `📚 LOCAL KNOWLEDGE` (Intent: `mobile_phone`, advises stopping in safe place) |
| **TEST 5** | AI Fallback | `"My bike headlight stopped working while I am riding at night. What should I do?"` | Source: `🤖 AI FALLBACK` (Gemini API with 4-fold Nyaya reasoning structure) |
| **TEST 6** | Voice STT | Click Microphone & Speak: `"Should I wear a seat belt while driving?"` | Speech converts to text and triggers `seatbelt` local response |
| **TEST 7** | Danger Guard | `"I have consumed alcohol. Can I drive?"` | Strict refusal: `"Do NOT drive under any circumstances! Take a cab/rideshare."` |
| **TEST 8** | Emergency | `"There has been an accident."` | Emergency response + header/modal guidance detailing Helpline `112` / `108` |
