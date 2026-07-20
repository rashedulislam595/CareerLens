'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Bot, ArrowRight, Copy, Check } from 'lucide-react';

const DEMO_TABS = [
  {
    id: 'generator',
    icon: Sparkles,
    label: 'AI Generator',
    href: '/ai/generator',
    preview: {
      input: 'Full Stack Developer at TechCorp, 3 years React/Node.js',
      output: `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the Full Stack Developer position at TechCorp. With 3 years of hands-on experience in React and Node.js, I have developed a strong foundation in building scalable, high-performance web applications.

Throughout my career, I have successfully delivered multiple production-grade applications, collaborating closely with cross-functional teams to translate complex requirements into elegant technical solutions...`,
    },
  },
  {
    id: 'chat',
    icon: Bot,
    label: 'AI Career Coach',
    href: '/ai/chat',
    preview: {
      messages: [
        { role: 'user', text: 'How do I negotiate a higher salary?' },
        { role: 'assistant', text: `Great question! Here's a proven approach:

**1. Research market rates** — Use Glassdoor, Levels.fyi, and LinkedIn Salary to benchmark.

**2. Time it right** — Negotiate after receiving the offer, not before.

**3. Give a range** — Anchor 15-20% above your target.

**4. Highlight your value** — Lead with specific achievements and metrics.

**5. Be confident but flexible** — Consider the full package (equity, PTO, remote).

Would you like help crafting your negotiation script?` },
      ],
    },
  },
];

export default function AIShowcaseSection() {
  const [activeTab, setActiveTab] = useState('generator');
  const [copied, setCopied] = useState(false);
  const tab = DEMO_TABS.find((t) => t.id === activeTab)!;

  const handleCopy = () => {
    if (tab.preview && 'output' in tab.preview && tab.preview.output) {
      navigator.clipboard.writeText(tab.preview.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-20 bg-slate-900/50" id="ai-features">
      <div className="section-container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Bot className="w-3.5 h-3.5" />
            AI Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See <span className="gradient-text">AI in Action</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Experience the power of our AI tools with these live previews.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-slate-800/50 rounded-xl border border-white/5 w-fit mx-auto">
            {DEMO_TABS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Demo Card */}
          <div className="glass-card p-6 sm:p-8">
            {activeTab === 'generator' && 'output' in tab.preview && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Input</div>
                  <div className="p-4 bg-slate-800/60 rounded-xl border border-white/5 text-sm text-white/70">
                    <div className="mb-2"><span className="text-indigo-400">Type:</span> Cover Letter</div>
                    <div className="mb-2"><span className="text-indigo-400">Job:</span> {tab.preview.input}</div>
                    <div><span className="text-indigo-400">Tone:</span> Professional</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">AI Output</div>
                    <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/20 text-sm text-white/70 leading-relaxed max-h-48 overflow-y-auto">
                    {tab.preview.output}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && 'messages' in tab.preview && Array.isArray(tab.preview.messages) && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {tab.preview.messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-sm'
                        : 'bg-slate-800 text-white/80 rounded-tl-sm border border-white/5'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <Link href={tab.href} className="btn-primary">
                Try {tab.label} Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
