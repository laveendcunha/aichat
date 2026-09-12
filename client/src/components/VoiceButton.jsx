import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

export default function VoiceButton({ onTranscript, disabled, initialText = '' }) {
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setErrorMsg(null);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let newlyFinalized = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          newlyFinalized += (newlyFinalized ? ' ' : '') + transcriptPart.trim();
        } else {
          interimTranscript += transcriptPart;
        }
      }

      if (newlyFinalized) {
        if (finalTranscriptRef.current) {
          finalTranscriptRef.current += ' ' + newlyFinalized;
        } else {
          finalTranscriptRef.current = newlyFinalized;
        }
      }

      const fullText = (
        finalTranscriptRef.current +
        (finalTranscriptRef.current && interimTranscript ? ' ' : '') +
        interimTranscript
      ).trim();

      if (fullText) {
        onTranscript(fullText);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        setErrorMsg('Microphone permission was denied. Please allow microphone access in your browser settings.');
        isListeningRef.current = false;
        setIsListening(false);
      } else if (event.error === 'no-speech') {
        // Silence detected, will auto-restart if still listening
      } else if (event.error === 'audio-capture') {
        setErrorMsg('No microphone found or audio capture failed.');
        isListeningRef.current = false;
        setIsListening(false);
      } else if (event.error === 'network') {
        setErrorMsg('Network error occurred during speech recognition.');
        isListeningRef.current = false;
        setIsListening(false);
      } else if (event.error !== 'aborted') {
        setErrorMsg('Voice recognition issue. Please try again or type.');
      }

      setTimeout(() => setErrorMsg(null), 4000);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch (err) {
          console.warn('Could not auto-restart speech recognition:', err);
          isListeningRef.current = false;
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isListeningRef.current = false;
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
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition || !recognitionRef.current) {
      setErrorMsg('Voice input is not supported in this browser. Please type your question instead.');
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }

    if (isListening) {
      isListeningRef.current = false;
      setIsListening(false);
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error('Error stopping speech recognition:', err);
      }
    } else {
      finalTranscriptRef.current = initialText.trim();
      isListeningRef.current = true;
      setIsListening(true);
      setErrorMsg(null);

      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        isListeningRef.current = false;
        setIsListening(false);
        setErrorMsg('Could not start voice input. Please try again.');
        setTimeout(() => setErrorMsg(null), 4000);
      }
    }
  };

  return (
    <div className="relative flex items-center gap-1.5">
      
      {/* Speech Error Feedback Tooltip */}
      {errorMsg && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-rose-950/95 border border-rose-500/50 text-xs text-rose-200 font-medium whitespace-nowrap shadow-xl flex items-center gap-2 z-50 animate-bounce">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Microphone Toggle Button */}
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        id="voice-mic-button"
        aria-label={isListening ? "Stop voice input" : "Start voice input"}
        title={isListening ? "Stop voice input" : "Start voice input"}
        className={`relative px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer flex items-center gap-2 ${
          isListening
            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-400/50 animate-pulse'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
      >
        {isListening ? (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-200 animate-ping shrink-0" />
            <MicOff className="w-4 h-4 text-rose-100" />
            <span className="font-bold text-xs tracking-wide">Listening...</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs">Voice</span>
          </>
        )}
      </button>

    </div>
  );
}

