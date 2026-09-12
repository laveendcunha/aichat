import React from 'react';
import { BookOpen, Bot, Zap, AlertTriangle } from 'lucide-react';

export default function SourceBadge({ source, intent }) {
  if (source === 'local') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-sm" title="Verified predefined safety guidance">
        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
        <span>📚 Local Safety Knowledge</span>
        {intent && (
          <span className="ml-1 uppercase text-[9px] tracking-wider px-1.5 py-0.2 bg-emerald-950/80 rounded text-emerald-300 font-mono border border-emerald-500/30">
            {intent.replace('_', ' ')}
          </span>
        )}
      </div>
    );
  }

  if (source === 'decision') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-sm" title="Interactive safety assessment flow">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span>⚡ Safety Decision Guide</span>
      </div>
    );
  }

  if (source === 'ai_error') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/25 shadow-sm" title="AI Service Notice">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
        <span>⚠️ AI Safety Notice</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 shadow-sm" title="Generated Gemini AI safety guidance">
      <Bot className="w-3.5 h-3.5 text-indigo-400" />
      <span>🤖 Gemini AI Safety Advice</span>
    </div>
  );
}

