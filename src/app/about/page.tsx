import Link from 'next/link';
import { Target, Users, Landmark } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            About <span className="gradient-text">CareerLens AI</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            We are redefining how talent meets opportunities. By combining modern recruitment models with agentic AI services, we give job seekers and hiring companies the competitive edge they deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 border border-white/5 text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Our Mission</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              To democratize professional guidance and match job seekers with roles where they excel.
            </p>
          </div>
          <div className="glass-card p-6 border border-white/5 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Our Community</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Over 10,000 active professionals use our platforms weekly to optimize portfolios.
            </p>
          </div>
          <div className="glass-card p-6 border border-white/5 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-4">
              <Landmark className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Modern Stack</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Built on React, Next.js, and MongoDB, running under Gemini & Groq APIs.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 border border-white/5 space-y-6">
          <h2 className="text-2xl font-bold text-white">How CareerLens AI is Different</h2>
          <p className="text-white/70 leading-relaxed">
            Most job search platforms are simple bulletin boards. CareerLens is an active agent. Our platform analyzes user skills and interests in real-time, providing actionable coaching recommendations instead of just static lists.
          </p>
          <p className="text-white/70 leading-relaxed">
            Additionally, our AI content studio helps users write cover letters that are uniquely customized to specific job descriptions, drastically increasing interview callback rates.
          </p>
          <div className="pt-4">
            <Link href="/register" className="btn-primary">
              Join Our Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
