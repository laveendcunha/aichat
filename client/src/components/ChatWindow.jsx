import React, { useEffect, useRef } from 'react';
import Message from './Message.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';
import { ShieldAlert } from 'lucide-react';

export default function ChatWindow({ messages, isLoading, onSelectPrompt, onSelectDecisionOption, onOpenEmergency, onOpenIks }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center overflow-y-auto p-4">
        <WelcomeScreen
          onSelectPrompt={onSelectPrompt}
          onOpenEmergency={onOpenEmergency}
          onOpenIks={onOpenIks}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl w-full mx-auto">
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          onSelectDecisionOption={onSelectDecisionOption}
        />
      ))}

      {/* Loading state indicator */}
      {isLoading && (
        <div className="flex gap-3 my-4 justify-start items-center">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 shrink-0 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-xs border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
            <div className="flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
            <span className="font-medium text-slate-300">Thinking about your safety...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
