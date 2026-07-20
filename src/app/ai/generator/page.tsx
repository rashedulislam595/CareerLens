'use client';

import { useState } from 'react';
import useRequireAuth from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { Sparkles, Copy, Check, Download, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';


export default function AIContentGeneratorPage() {
  const { isLoading: authLoading } = useRequireAuth();

  // Form inputs
  const [type, setType] = useState<'cover-letter' | 'resume-summary' | 'linkedin-bio' | 'job-description'>('cover-letter');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('3 years');
  const [tone, setTone] = useState<'professional' | 'creative' | 'confident' | 'humble'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [additionalContext, setAdditionalContext] = useState('');

  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) {
      toast.error('Job Title is required');
      return;
    }
    setIsGenerating(true);
    try {
      const { data } = await api.post('/ai/generate', {
        type,
        jobTitle,
        company,
        skills: skills.split(',').map((s) => s.trim()).filter((s) => s),
        experience,
        tone,
        length,
        additionalContext,
      });

      if (data.success && data.data?.content) {
        setOutput(data.data.content);
        toast.success('AI Content generated successfully!');
      }
    } catch {
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-${jobTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Download started!');
  };

  if (authLoading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI Content Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            AI Content <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
            Generate high-quality cover letters, resumes summaries, bios or descriptions matching your exact needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Controls Column */}
          <form onSubmit={handleGenerate} className="glass-card p-6 sm:p-8 space-y-5 border border-white/5 shadow-xl">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Content Type
              </label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                id="gen-type"
                className="input-field cursor-pointer"
              >
                <option value="cover-letter">Cover Letter</option>
                <option value="resume-summary">Resume Professional Summary</option>
                <option value="linkedin-bio">LinkedIn Bio / About Section</option>
                <option value="job-description">Job Description</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Software Engineer"
                  id="gen-title"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Google"
                  id="gen-company"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Key Skills / Technologies (comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, TypeScript, Tailwind"
                id="gen-skills"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e: any) => setTone(e.target.value)}
                  id="gen-tone"
                  className="input-field cursor-pointer"
                >
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                  <option value="confident">Confident</option>
                  <option value="humble">Humble</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Length / Word Count
                </label>
                <select
                  value={length}
                  onChange={(e: any) => setLength(e.target.value)}
                  id="gen-length"
                  className="input-field cursor-pointer"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Additional Instructions
              </label>
              <textarea
                rows={3}
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="E.g., Emphasize remote work or specify career transitions..."
                id="gen-context"
                className="input-field py-2.5 resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  Generate Content
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Output Display Column */}
          <div className="glass-card p-6 sm:p-8 flex flex-col min-h-[520px] lg:h-[590px] border border-white/5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <span className="text-sm font-semibold text-white">Generated Output</span>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Copy to Clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {output ? (
              <div className="flex-1 bg-slate-800/40 p-5 rounded-xl border border-white/5 text-white/80 text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap">
                {output}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-800/10 border border-dashed border-white/5 rounded-xl">
                <Sparkles className="w-10 h-10 text-white/20 mb-3" />
                <p className="text-sm text-white/40 max-w-xs">
                  Fill in the details in the left panel and click Generate to see the AI output.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
