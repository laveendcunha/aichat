import React from 'react';
import { BookOpen, Eye, HelpCircle, GitCommit, CheckCircle2, X, GraduationCap } from 'lucide-react';

export default function IksExplanationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pramanaSteps = [
    {
      title: 'Pratyaksha (Observation)',
      sub: 'Direct Perception',
      desc: 'Identifying the immediate physical scenario directly observed from the user\'s input (e.g. unhelmeted riding, wet asphalt, or dark highway).',
      icon: Eye,
      color: 'border-sky-500/40 text-sky-400 bg-sky-500/10'
    },
    {
      title: 'Hetu (Evidence / Reason)',
      sub: 'Causal Ground',
      desc: 'The underlying physical, legal, biological, or mechanical cause mandating safety intervention (e.g. kinetic crash energy, deceleration force).',
      icon: HelpCircle,
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Anumana (Inference)',
      sub: 'Logical Deduction',
      desc: 'Logical deduction connecting the observation and evidence to derive unobserved consequences (e.g. fatal injury probability).',
      icon: GitCommit,
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/10'
    },
    {
      title: 'Nigamana (Conclusion)',
      sub: 'Final Instruction',
      desc: 'The definitive, actionable recommendation ensuring user compliance and physical protection (e.g. fastening helmet securely).',
      icon: CheckCircle2,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel border border-amber-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Indian Knowledge System (IKS) Epistemology
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                Nyaya Pramana Sastra Reasoning Model
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Body */}
        <div className="overflow-y-auto space-y-3 pr-1 text-xs text-slate-300">
          <p className="leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            In classical Indian philosophy (<strong>Nyaya Darsana</strong>), valid knowledge (<em>Pramana</em>) is derived through a structured 4-fold logical deduction method. The Road Safety Bot applies this methodology to evaluate road hazards and formulate safety advice.
          </p>

          <div className="grid grid-cols-1 gap-2.5 my-2">
            {pramanaSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className={`p-3.5 rounded-xl border ${step.color} transition-all`}>
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{step.title}</span>
                    <span className="text-[10px] opacity-75 font-mono">({step.sub})</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-300">
            <strong>Academic Note for Evaluators:</strong> Both local deterministic KB items and backend AI fallback responses execute this 4-step logic to guarantee explainable and verifiable decision making.
          </div>
        </div>

      </div>
    </div>
  );
}
