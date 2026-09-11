import React from 'react';
import { RotateCcw, ShieldAlert, BookOpen, AlertTriangle } from 'lucide-react';

export default function Header({ onNewChat, onOpenEmergency, onOpenIks, messageCount }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-4 py-3 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🚦</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                Road Safety Bot
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <BookOpen className="w-3 h-3" /> IKS Hybrid
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              AI-powered road safety assistant
            </p>
          </div>
        </div>

        {/* Action Controls Header Buttons */}
        <div className="flex items-center gap-2">
          
          {/* IKS Logic Modal Trigger */}
          <button
            onClick={onOpenIks}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
            title="View Indian Knowledge System (Nyaya Pramana) 4-fold logic"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">IKS Logic</span>
          </button>

          {/* Emergency Guidance Trigger */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all cursor-pointer"
            title="View Emergency Guidance Protocol & Helpline 112/108"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency</span>
          </button>

          {/* New Chat Reset Button */}
          {messageCount > 0 && (
            <button
              onClick={onNewChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer ml-1"
              title="Start a new conversation"
              id="new-chat-button"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
