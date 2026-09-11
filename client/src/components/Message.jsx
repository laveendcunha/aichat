import React from 'react';
import { User, ShieldAlert, AlertCircle } from 'lucide-react';
import SourceBadge from './SourceBadge.jsx';
import DecisionCard from './DecisionCard.jsx';

export default function Message({ message, onSelectDecisionOption }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Bot Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 shrink-0 shadow-md">
          <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`max-w-[88%] sm:max-w-[78%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Source Badge for Bot */}
        {!isUser && message.source && (
          <div className="mb-1">
            <SourceBadge source={message.source} intent={message.intent} />
          </div>
        )}

        {/* Bubble Box */}
        <div
          className={`p-4 rounded-2xl shadow-sm text-sm ${
            isUser
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-xs shadow-amber-500/10'
              : 'glass-card text-slate-100 rounded-tl-xs border border-slate-800/80 shadow-slate-950/40'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
          ) : (
            <DecisionCard
              text={message.text}
              reasoning={message.reasoning}
              decisionFlow={message.decisionFlow}
              selectedOption={message.selectedOption}
              onSelectOption={(flowId, optionId, label) => 
                onSelectDecisionOption && onSelectDecisionOption(flowId, optionId, label, message.msgId)
              }
            />
          )}

          {/* Offline notice highlight */}
          {message.notice && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{message.notice}</span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className={`text-[10px] text-slate-500 px-1 font-mono ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
          <User className="w-4 h-4" />
        </div>
      )}

    </div>
  );
}
