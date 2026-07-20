'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Sparkles, Play, MapPin, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HERO_WORDS = ['Dream Career', 'Next Opportunity', 'Perfect Role', 'Ideal Position'];

const TRENDING = ['React Developer', 'AI Engineer', 'UX Designer', 'Product Manager'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[80px]" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400/60 rounded-full animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 section-container text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Career Intelligence Platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Discover Your
          <br />
          <span className="relative gradient-text" key={wordIndex}>
            {HERO_WORDS[wordIndex]}
          </span>
          <br />
          <span className="text-white/80 text-4xl sm:text-5xl lg:text-6xl">with AI</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          CareerLens AI matches you with the perfect opportunities, generates professional content, and provides an AI career coach—all in one platform.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title, skills, company..."
              className="input-field pl-12"
              id="hero-search"
            />
          </div>
          <div className="relative sm:w-52">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location..."
              className="input-field pl-12"
              id="hero-location"
            />
          </div>
          <button type="submit" className="btn-primary px-6 whitespace-nowrap">
            <Search className="w-4 h-4" />
            Search Jobs
          </button>
        </form>

        {/* Trending searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-sm text-white/40">Trending:</span>
          {TRENDING.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearch(tag);
                router.push(`/jobs?search=${encodeURIComponent(tag)}`);
              }}
              className="px-3 py-1 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/jobs" className="btn-primary text-base px-8 py-3">
            <Briefcase className="w-5 h-5" />
            Browse All Jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/ai/chat" className="btn-secondary text-base px-8 py-3">
            <Play className="w-5 h-5" />
            Meet Your AI Coach
          </Link>
        </div>

        {/* Hero Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '50K+', label: 'Active Jobs' },
            { value: '10K+', label: 'Companies' },
            { value: '95%', label: 'Match Rate' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-white/40">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
        <div className="w-1 h-1 rounded-full bg-white/30" />
      </div>
    </section>
  );
}
