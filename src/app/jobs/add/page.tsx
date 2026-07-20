'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useCreateJob } from '@/hooks/useJobs';
import api from '@/lib/api';
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from '@/lib/utils';
import { Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AddJobPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const createMutation = useCreateJob();
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [type, setType] = useState('remote');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [aiGeneratingTags, setAiGeneratingTags] = useState(false);

  // AI Feature: Auto-generate tags based on title/description
  const handleAutoGenerateTags = async () => {
    if (!title || !description) {
      toast.error('Please enter a job title and description first');
      return;
    }
    setAiGeneratingTags(true);
    try {
      const { data } = await api.post('/ai/tags', { title, description });
      if (data.success && data.data?.tags) {
        setTags(data.data.tags.join(', '));
        toast.success('AI successfully generated relevant tags!');
      }
    } catch {
      toast.error('AI tag generation failed');
    } finally {
      setAiGeneratingTags(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || !shortDescription || !description || !location) {
      toast.error('Please fill out all required fields');
      return;
    }

    try {
      await createMutation.mutateAsync({
        title,
        company,
        shortDescription,
        description,
        category,
        type: type as any,
        salary: {
          min: Number(minSalary) || 0,
          max: Number(maxSalary) || 0,
          currency: 'USD',
          period: 'yearly',
        },
        location,
        experienceLevel: experienceLevel as any,
        tags: tags.split(',').map((t) => t.trim()).filter((t) => t),
        imageUrl,
      });

      toast.success('Job listing published successfully!');
      router.push('/jobs/manage');
    } catch {
      toast.error('Failed to publish job listing');
    }
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
      <div className="section-container max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Post a New Job</h1>
          <p className="text-white/50">Add a new job listing to attract candidates.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-6 border border-white/5 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior React Developer"
                id="add-title"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Meta Inc."
                id="add-company"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="add-category"
                className="input-field cursor-pointer"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Job Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="add-type"
                className="input-field cursor-pointer"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Experience Level *
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                id="add-experience"
                className="input-field cursor-pointer"
              >
                {EXPERIENCE_LEVELS.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Minimum Salary ($)
              </label>
              <input
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="80000"
                id="add-minsalary"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Maximum Salary ($)
              </label>
              <input
                type="number"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="120000"
                id="add-maxsalary"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA or Remote"
                id="add-location"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Short Description (max 300 chars) *
            </label>
            <input
              type="text"
              required
              maxLength={300}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A brief summary of the role..."
              id="add-shortdesc"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Full Job Description *
            </label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description, requirements, responsibilities..."
              id="add-desc"
              className="input-field py-3 resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider">
                Skills / Tags (comma separated)
              </label>
              <button
                type="button"
                onClick={handleAutoGenerateTags}
                disabled={aiGeneratingTags}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                {aiGeneratingTags ? 'Analyzing...' : 'AI Auto-Tag'}
              </button>
            </div>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, Node.js"
              id="add-tags"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Optional Image/Cover URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              id="add-image"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4"
          >
            {createMutation.isPending ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                Publish Job Listing
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
