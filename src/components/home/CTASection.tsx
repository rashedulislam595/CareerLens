import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-slate-950" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 section-container">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto border-indigo-500/20 gradient-border">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Ready to Accelerate Your Career?
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Take the Next Step In Your <span className="gradient-text">Professional Journey</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of professionals using CareerLens AI to find better jobs, negotiate higher salaries, and excel in their roles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary px-8 py-3.5 text-base w-full sm:w-auto">
              Get Started for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/jobs" className="btn-secondary px-8 py-3.5 text-base w-full sm:w-auto">
              Browse Job Openings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
