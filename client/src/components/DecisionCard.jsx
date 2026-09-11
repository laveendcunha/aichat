import React, { useState } from 'react';
import { Eye, HelpCircle, GitCommit, CheckCircle2, ChevronDown, ChevronUp, Brain, Check, X } from 'lucide-react';

export default function DecisionCard({ text, reasoning, decisionFlow, selectedOption, onSelectOption }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. Render Interactive Decision Point UI Card
  if (decisionFlow && decisionFlow.options) {
    return (
      <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 shadow-lg my-1">
        <div className="flex items-center gap-2 font-bold text-amber-400 text-xs uppercase tracking-wider">
          <span>⚠️ Interactive Safety Assessment</span>
        </div>

        <p className="text-sm font-semibold text-slate-100 leading-relaxed">
          {decisionFlow.question}
        </p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {decisionFlow.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isYes = opt.id === 'yes';

            return (
              <button
                key={opt.id}
                onClick={() => !selectedOption && onSelectOption && onSelectOption(decisionFlow.id, opt.id, opt.label)}
                disabled={!!selectedOption}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isSelected
                    ? isYes
                      ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400'
                      : 'bg-rose-500 text-white ring-2 ring-rose-400'
                    : selectedOption
                    ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed border border-slate-700'
                    : isYes
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:scale-102 active:scale-95'
                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:scale-102 active:scale-95'
                }`}
              >
                {isYes ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Render Text + Expandable IKS 4-Fold Reasoning Section
  const hasReasoningObject = reasoning && (reasoning.pratyaksha || reasoning.hetu || reasoning.anumana || reasoning.nigamana);
  
  // Fallback string parser if reasoning object is null but text has IKS headers
  const hasTextIKS = text && (text.includes('Pratyaksha') || text.includes('Hetu') || text.includes('Anumana') || text.includes('Nigamana'));

  return (
    <div className="space-y-3">
      
      {/* Main Response Text */}
      <div className="whitespace-pre-wrap leading-relaxed text-slate-100">
        {text}
      </div>

      {/* Expandable IKS Reasoning Toggle Box */}
      {(hasReasoningObject || hasTextIKS) && (
        <div className="mt-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>🧠 IKS Nyaya Reasoning Framework</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>{isExpanded ? 'Collapse' : 'Expand Reasoning'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Expanded Reasoning Breakdown */}
          {isExpanded && (
            <div className="mt-3 space-y-2 animate-fade-in pl-1">
              
              {/* Pratyaksha */}
              <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/5">
                <div className="flex items-center gap-2 font-bold text-xs text-sky-400 mb-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>1. Observation (Pratyaksha)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {reasoning?.pratyaksha || extractIKSSection(text, 'Pratyaksha') || 'Direct physical observation of the situational parameters.'}
                </p>
              </div>

              {/* Hetu */}
              <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-400 mb-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>2. Evidence / Reason (Hetu)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {reasoning?.hetu || extractIKSSection(text, 'Hetu') || 'Causal physical or legal grounds necessitating intervention.'}
                </p>
              </div>

              {/* Anumana */}
              <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center gap-2 font-bold text-xs text-purple-400 mb-1">
                  <GitCommit className="w-3.5 h-3.5" />
                  <span>3. Inference (Anumana)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {reasoning?.anumana || extractIKSSection(text, 'Anumana') || 'Logical deduction of unobserved risk probability.'}
                </p>
              </div>

              {/* Nigamana */}
              <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>4. Conclusion (Nigamana)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {reasoning?.nigamana || extractIKSSection(text, 'Nigamana') || 'Definitive safety instruction.'}
                </p>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}

function extractIKSSection(text, key) {
  if (!text) return '';
  const regex = new RegExp(`${key}[^:]*:\\s*([^\\n]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}
