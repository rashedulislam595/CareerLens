'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-slate-950">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-10 gradient-border">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Stay Ahead of the <span className="gradient-text">Job Market</span>
            </h2>
            <p className="text-white/50 mb-8">
              Get weekly AI-curated job picks, career tips, and salary insights delivered directly to your inbox.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-emerald-400">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">You're subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  id="newsletter-email"
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-white/30 text-xs mt-4">
              No spam. Unsubscribe anytime. 15,000+ subscribers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
