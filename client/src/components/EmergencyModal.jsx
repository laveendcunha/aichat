import React from 'react';
import { ShieldAlert, PhoneCall, HeartPulse, X, ExternalLink, Info } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel border border-rose-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Emergency Guidance Protocol
              </h3>
              <p className="text-xs text-rose-400 font-medium">
                Immediate Action & Helpline Numbers
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

        {/* Emergency Call Action Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <a
            href="tel:112"
            className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-center group cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 text-rose-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <div className="text-lg font-extrabold text-rose-300">112</div>
            <div className="text-[11px] text-slate-400 font-medium">National Emergency</div>
          </a>

          <a
            href="tel:108"
            className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all text-center group cursor-pointer"
          >
            <HeartPulse className="w-6 h-6 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <div className="text-lg font-extrabold text-amber-300">108</div>
            <div className="text-[11px] text-slate-400 font-medium">Ambulance Service</div>
          </a>
        </div>

        {/* Action Steps */}
        <div className="space-y-2.5 text-xs text-slate-300 mb-5">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
            <span className="font-bold text-amber-400">1.</span>
            <span><strong>Ensure Personal Safety:</strong> Move away from active traffic lanes to a sidewalk or road shoulder.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
            <span className="font-bold text-amber-400">2.</span>
            <span><strong>Mark Scene:</strong> Turn on vehicle hazard warning lights or position warning triangles 50 meters back.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
            <span className="font-bold text-amber-400">3.</span>
            <span><strong>Good Samaritan Protection:</strong> Under Indian Law, bystanders who assist crash victims are legally protected from police harassment or compulsory hospital fees.</span>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <span>This application is an educational assistant and does not automatically dispatch emergency services or replace official authorities.</span>
        </div>

      </div>
    </div>
  );
}
