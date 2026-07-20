'use client';

import { useState, useEffect } from 'react';
import useRequireAuth from '@/hooks/useRequireAuth';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { User, Check, Edit2, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const { isLoading: authLoading } = useRequireAuth();
  const { user, refreshUser } = useAuth();

  // Profile forms state
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setName(user.name);
        setSkills(user.profile.skills.join(', '));
        setExperience(user.profile.experience);
        setLocation(user.profile.location);
        setBio(user.profile.bio);
        setTitle(user.profile.title);
        setLinkedIn(user.profile.linkedIn || '');
        setGithub(user.profile.github || '');
      }, 0);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/users/profile', {
        name,
        profile: {
          skills: skills.split(',').map((s) => s.trim()).filter((s) => s),
          experience,
          location,
          bio,
          title,
          linkedIn,
          github,
        },
      });

      if (data.success) {
        await refreshUser();
        toast.success('Profile updated successfully!');
      }
    } catch {
      toast.error('Failed to update profile details');
    } finally {
      setSaving(false);
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
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/50">Manage your skills, experience details, and account settings.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-6 border border-white/5 shadow-xl">
          {/* Avatar and name banner info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-white/5">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border border-white/10"
              />
            )}
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                {user?.name}
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h2>
              <p className="text-sm text-white/50 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                id="prof-name"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Professional Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Full Stack Developer"
                id="prof-title"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Experience Duration
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="3 years"
                id="prof-exp"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="New York, NY"
                  id="prof-loc"
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              My Skills / Technologies (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Next.js, Node.js, Python"
              id="prof-skills"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Professional Biography
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell companies about your passion, projects, or credentials..."
              id="prof-bio"
              className="input-field py-2.5 resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                id="prof-li"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
                id="prof-gh"
                className="input-field"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4"
          >
            {saving ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                Update Profile Settings
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
