'use client';

import { useState, useEffect, useRef } from 'react';
import useRequireAuth from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { Bot, User, Send, Trash2, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';


interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatSession {
  _id: string;
  title: string;
}

export default function AICareerCoachPage() {
  const { isLoading: authLoading } = useRequireAuth();

  // Sessions list
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Conversation history
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchSessions = async () => {
    try {
      const { data } = await api.get('/ai/sessions');
      if (data.success) {
        setSessions(data.data.sessions);
      }
    } catch {
      toast.error('Failed to load chat history list');
    }
  };

  const fetchSessionHistory = async (sid: string) => {
    try {
      const { data } = await api.get(`/ai/sessions/${sid}`);
      if (data.success && data.data?.session) {
        setMessages(data.data.session.messages);
      }
    } catch {
      toast.error('Failed to load chat history details');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      fetchSessionHistory(activeSessionId);
    } else {
      setTimeout(() => setMessages([]), 0);
    }
  }, [activeSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (msgContent = input) => {
    const finalContent = msgContent.trim();
    if (!finalContent) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: finalContent }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Read session token the same way the axios interceptor does
      const getSessionToken = (): string | null => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; better-auth.session_token=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return localStorage.getItem('better-auth.session_token');
      };
      const sessionToken = getSessionToken();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (sessionToken) {
        headers['Authorization'] = `Bearer ${sessionToken}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/chat`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          message: finalContent,
          sessionId: activeSessionId,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.body) throw new Error('No readable stream body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantContentRef = { current: '' };

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value);
        const lines = chunkText.split('\n\n').filter((l) => l.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.chunk) {
                assistantContentRef.current += data.chunk;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: assistantContentRef.current };
                  return updated;
                });
              }
              if (data.done) {
                setIsTyping(false);
                if (!activeSessionId && data.sessionId) {
                  setActiveSessionId(data.sessionId);
                  fetchSessions();
                }
              }
              if (data.error) {
                toast.error(data.error);
                setIsTyping(false);
              }
            } catch {
              // Ignore line parses
            }
          }
        }
      }
    } catch {
      toast.error('AI session error occurred');
      setIsTyping(false);
    }
  };

  const handleDeleteSession = async (sid: string) => {
    if (!window.confirm('Delete this conversation history?')) return;
    try {
      await api.delete(`/ai/sessions/${sid}`);
      toast.success('Conversation history deleted');
      if (activeSessionId === sid) {
        setActiveSessionId(null);
      }
      fetchSessions();
    } catch {
      toast.error('Failed to delete history');
    }
  };

  const handleSuggest = (prompt: string) => {
    handleSendMessage(prompt);
  };

  if (authLoading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen flex flex-col">
      <div className="section-container flex-1 flex flex-col md:flex-row gap-6 max-w-6xl">
        {/* Left column: Sessions List */}
        <div className="md:w-64 shrink-0 flex flex-col h-[350px] md:h-[750px] glass-card p-4 border border-white/5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <span className="text-sm font-semibold text-white">Coach Sessions</span>
            <button
              onClick={() => setActiveSessionId(null)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {sessions.length === 0 ? (
              <div className="text-xs text-white/30 text-center py-6">No session history</div>
            ) : (
              sessions.map((s) => (
                <div
                  key={s._id}
                  className={`flex items-center justify-between gap-2 p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                    activeSessionId === s._id
                      ? 'bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  onClick={() => setActiveSessionId(s._id)}
                >
                  <span className="truncate max-w-[150px]">{s.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(s._id);
                    }}
                    className="p-1 rounded hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Chat Console */}
        <div className="flex-1 flex flex-col h-[600px] md:h-[750px] glass-card border border-white/5 shadow-xl overflow-hidden">
          {/* Active Session Title */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-800/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">CareerCoach AI</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && !isTyping ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Bot className="w-12 h-12 text-indigo-400 mb-4 animate-bounce" />
                <h3 className="text-lg font-bold text-white mb-2">Ask Your AI Career Coach</h3>
                <p className="text-white/50 text-sm max-w-xs mb-8">
                  Get salary negotiation tips, resume advice, practice questions or mock interview suggestions.
                </p>

                {/* Suggested follow-up prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md w-full">
                  {[
                    'How do I negotiate a higher salary?',
                    'Suggest mock interview questions for React developers',
                    'How to transition from finance to tech?',
                    'What skills are high in demand today?',
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggest(prompt)}
                      className="text-left p-3 rounded-xl bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/30 text-white/70 hover:text-indigo-400 text-xs transition-all duration-300 font-semibold"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role !== 'user' && (
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5">
                        <Bot className="w-4 h-4 text-indigo-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs sm:max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-600/15'
                          : 'bg-slate-800/80 text-white/80 rounded-tl-sm border border-white/5'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5">
                      <Bot className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="bg-slate-800/80 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 typing-dot" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 typing-dot" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Form */}
          <div className="p-4 border-t border-white/5 bg-slate-800/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask CareerCoach AI a question..."
                id="chat-input"
                className="input-field flex-1"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="btn-primary p-3 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
