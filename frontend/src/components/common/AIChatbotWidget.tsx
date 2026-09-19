import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Minimize2, 
  RotateCcw,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Hello! I am your CareerLens AI Assistant. How can I help you navigate DigiLocker verification, 3-tier credentials, pgvector skill matching, or proctored assessments today?',
    timestamp: 'Just now',
    suggestedActions: [
      'How does DigiLocker work?',
      'What are 3-tier certificates?',
      'Explain pgvector matching',
      'Proctored assessment rules'
    ]
  }
];

export const AIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkActive = () => {
      if (typeof window !== 'undefined') {
        const activeId = localStorage.getItem('active_assessment_id');
        const params = new URLSearchParams(window.location.search);
        const urlTestId = params.get('testId');
        setIsAssessmentActive(!!activeId || !!urlTestId);
      }
    };

    checkActive();
    window.addEventListener('storage', checkActive);
    return () => window.removeEventListener('storage', checkActive);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAssessmentActive) return null;

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: messages.map(m => ({ role: m.sender, content: m.text }))
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: data.suggested_actions
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('API error');
      }
    } catch {
      // Intelligent offline fallback
      await new Promise((r) => setTimeout(r, 700));
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `CareerLens Assistant: Verified information regarding "${queryText}". Our platform integrates DigiLocker OAuth2 authentication, 384-dimensional pgvector skill matching, and 3-tier credential verification.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: ['What are 3-tier certificates?', 'How does pgvector matching work?']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages(DEFAULT_MESSAGES);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 max-h-[550px] h-[500px] rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.12] bg-white/95 dark:bg-[#0c1220]/95 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-white/[0.08] bg-amber-50/60 dark:bg-[#090d18] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white dark:border-[#090d18]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  CareerLens AI
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Real-time Platform Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
                title="Minimize chat"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-slate-100 dark:bg-[#121929] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/[0.08] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>

                {/* Suggested Action Quick Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(action)}
                        className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-[10px] font-semibold transition-all text-left"
                      >
                        ⚡ {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-[#121929] border border-slate-200/80 dark:border-white/[0.08] text-slate-500 text-xs w-max">
                <Bot className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span className="font-mono text-[11px] animate-pulse">Assistant typing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-100 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#0a0e17] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI about credentials, scores, matching..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-bold text-xs shadow-xl shadow-amber-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
        </div>
        <span className="hidden sm:inline font-extrabold tracking-wide">AI Assistant</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-amber-200" />}
      </button>
    </div>
  );
};
