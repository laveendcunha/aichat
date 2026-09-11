import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

export default function VoiceButton({ onTranscript, disabled }) {
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript) {
          onTranscript(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone permission denied.');
        } else if (event.error === 'no-speech') {
          setErrorMsg('No speech detected. Try again.');
        } else {
          setErrorMsg('Speech recognition error.');
        }
        setTimeout(() => setErrorMsg(null), 3500);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setErrorMsg('Speech recognition is not supported in this browser.');
      setTimeout(() => setErrorMsg(null), 3500);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  return (
    <div className="relative flex items-center gap-1.5">
      
      {/* Speech Error Feedback Tooltip */}
      {errorMsg && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-rose-950/90 border border-rose-500/40 text-[11px] text-rose-200 font-medium whitespace-nowrap shadow-lg flex items-center gap-1.5 z-50 animate-bounce">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Microphone Toggle Button */}
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        id="voice-mic-button"
        className={`relative px-3 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
          isListening
            ? 'bg-rose-500 text-white mic-active shadow-lg shadow-rose-500/40 scale-102'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        title={isListening ? 'Click to stop listening' : 'Speak your question (Web Speech API)'}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 animate-pulse" />
            <span className="font-bold text-[11px] tracking-wide">Listening...</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-[11px]">Voice</span>
          </>
        )}
      </button>

    </div>
  );
}
