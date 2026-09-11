import React from 'react';
import { ShieldCheck, Compass, Mic, BookOpen, Bot, Zap, ArrowRight } from 'lucide-react';

export default function WelcomeScreen({ onSelectPrompt, onOpenEmergency, onOpenIks }) {
  const categoryCards = [
    {
      icon: '🏍️',
      title: 'Two-Wheeler Safety',
      subtitle: 'Helmet rules & riding safety',
      prompt: 'Do I need to wear a helmet?',
      color: 'hover:border-amber-500/50 hover:bg-amber-500/5'
    },
    {
      icon: '🚗',
      title: 'Driver Safety',
      subtitle: 'Seatbelt, speed & phone guidelines',
      prompt: 'Should I wear a seat belt while driving?',
      color: 'hover:border-emerald-500/50 hover:bg-emerald-500/5'
    },
    {
      icon: '🚶',
      title: 'Pedestrian Safety',
      subtitle: 'Zebra crossing & right-of-way',
      prompt: 'Who has priority at a zebra crossing?',
      color: 'hover:border-sky-500/50 hover:bg-sky-500/5'
    },
    {
      icon: '⚠️',
      title: 'Emergency Guidance',
      subtitle: 'Crash response & Helpline 112/108',
      prompt: 'What should I do if I witness a road accident?',
      color: 'hover:border-rose-500/50 hover:bg-rose-500/5'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-center max-w-4xl mx-auto my-auto animate-fade-in space-y-6">
      
      {/* Brand Icon & Tagline */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-0.5 shadow-xl shadow-amber-500/20 mb-4">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <span className="text-3xl">🚦</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Road Safety Bot
        </h2>
        <p className="text-sm font-semibold text-amber-400 mt-1">
          Smarter decisions. Safer roads.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-2 leading-relaxed">
          Ask a question, describe a situation, or use your voice.
        </p>
      </div>

      {/* 4 Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {categoryCards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(card.prompt)}
            className={`p-4 rounded-xl glass-card text-left border border-slate-800 transition-all duration-200 ${card.color} group cursor-pointer active:scale-98 flex items-center gap-3.5 shadow-sm`}
          >
            <span className="text-2xl p-2.5 rounded-xl bg-slate-900/90 group-hover:scale-110 transition-transform">
              {card.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-slate-200 group-hover:text-amber-400 transition-colors">
                {card.title}
              </div>
              <div className="text-xs text-slate-400 truncate mt-0.5">
                {card.subtitle}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {/* How I Answer Hybrid Architecture Panel */}
      <div className="w-full max-w-2xl p-4 rounded-2xl glass-card border border-slate-800 text-left">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-400" /> How I Answer (Hybrid Architecture)
          </span>
          <button
            onClick={onOpenIks}
            className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
          >
            Learn IKS Logic →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <div className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
              <BookOpen className="w-3 h-3" /> 1. Local KB
            </div>
            <div className="text-slate-400 text-[10px]">Check safetyData dataset first</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <div className="font-bold text-amber-400 flex items-center gap-1 mb-1">
              <Zap className="w-3 h-3" /> 2. Match Rules
            </div>
            <div className="text-slate-400 text-[10px]">Evaluate interactive decisions</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <div className="font-bold text-indigo-400 flex items-center gap-1 mb-1">
              <Bot className="w-3 h-3" /> 3. AI Fallback
            </div>
            <div className="text-slate-400 text-[10px]">Execute Gemini AI only if needed</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <div className="font-bold text-sky-400 flex items-center gap-1 mb-1">
              <ShieldCheck className="w-3 h-3" /> 4. Safety Guard
            </div>
            <div className="text-slate-400 text-[10px]">4-fold IKS Nyaya Pramana output</div>
          </div>
        </div>
      </div>

    </div>
  );
}
