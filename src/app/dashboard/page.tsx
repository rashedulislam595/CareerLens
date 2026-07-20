'use client';

import { useUserStats, useRecommendations } from '@/hooks/useJobs';
import useRequireAuth from '@/hooks/useRequireAuth';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Briefcase,
  Eye,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import JobCard from '@/components/JobCard';
import JobSkeleton from '@/components/JobSkeleton';

export default function UserDashboardPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const { data: statsData, isLoading: statsLoading } = useUserStats();
  const { data: recommendations = [], isLoading: recsLoading } = useRecommendations();

  if (authLoading || statsLoading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const stats = statsData?.stats || {
    totalJobs: 0,
    activeJobs: 0,
    totalViews: 0,
    totalApplicants: 0,
    savedJobs: 0,
  };

  const chartData = statsData?.monthlyData || [];

  return (
    <div className="pt-24 pb-32 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/50 text-sm">Analyze stats, view job trends, and explore AI recommendations.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/jobs/add" className="btn-primary py-2.5 px-5">
              Post Job Listing
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Published Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-indigo-400 bg-indigo-500/10' },
            { label: 'Active Openings', value: stats.activeJobs, icon: Briefcase, color: 'text-blue-400 bg-blue-500/10' },
            { label: 'Views', value: stats.totalViews, icon: Eye, color: 'text-amber-400 bg-amber-500/10' },
            { label: 'Applicants', value: stats.totalApplicants, icon: Users, color: 'text-emerald-400 bg-emerald-500/10' },
            { label: 'Saved Openings', value: stats.savedJobs, icon: Heart, color: 'text-pink-400 bg-pink-500/10' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-5 border border-white/5 flex flex-col justify-between">
              <div className="flex justify-between items-start gap-2 mb-4">
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{item.label}</span>
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Chart */}
          <div className="lg:col-span-2 glass-card p-6 border border-white/5 shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Monthly Postings Trend</h2>
            </div>
            {chartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff' }} />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/5 rounded-xl text-white/30 text-sm">
                No job postings record found to map analytics trends.
              </div>
            )}
          </div>

          {/* Quick AI Suggestions */}
          <div className="glass-card p-6 border border-white/5 shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">AI Quick Tips</h2>
            </div>
            <div className="flex-1 space-y-4 text-sm text-white/70">
              <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl leading-relaxed">
                🚀 <span className="font-semibold text-white">Salary Tip:</span> Your posted developer salaries match 92% of the market rates.
              </div>
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl leading-relaxed">
                📈 <span className="font-semibold text-white">Audience Tip:</span> Mid-week postings get up to 25% higher applicant views.
              </div>
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl leading-relaxed">
                💡 <span className="font-semibold text-white">Optimize description:</span> Add 3 more requirement bullet points to match expert tags.
              </div>
            </div>
          </div>
        </div>

        {/* AI Smart Recommendation Engine (Requirement 11.B) */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">
                AI Smart <span className="gradient-text">Job Recommendations</span>
              </h2>
            </div>
            <span className="text-xs text-white/40">Context-Aware AI matching</span>
          </div>

          {recsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          ) : recommendations.length === 0 ? (
            <div className="glass-card p-10 text-center border border-white/5 max-w-lg mx-auto">
              <Sparkles className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">No recommendations matching your profile</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Ensure you have set skills, experience levels, and locations on your profile page to let AI find matching opportunities.
              </p>
              <Link href="/profile" className="btn-primary">
                Update Profile
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex flex-col justify-between h-full">
                  <div className="relative flex-1">
                    {/* Top rating score badge */}
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold shadow-md shadow-indigo-600/30">
                      Match Score: {rec.matchScore}%
                    </div>
                    <JobCard job={rec.job} />
                  </div>
                  {/* Matching reason text card overlay inside layout */}
                  <div className="mt-3 text-xs text-white/60 bg-slate-800/40 p-3.5 rounded-xl border border-white/5 leading-relaxed">
                    🌟 <span className="font-semibold text-indigo-300">AI Match Reason:</span> {rec.reason}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
