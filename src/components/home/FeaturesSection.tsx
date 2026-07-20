import { Bot, Sparkles, Target, Zap, Shield, BarChart3 } from 'lucide-react';

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Career Coach',
    description: 'Get personalized career advice, interview tips, and job search strategies from your 24/7 AI coach.',
    color: 'from-indigo-500 to-purple-600',
    glow: 'shadow-indigo-500/25',
  },
  {
    icon: Sparkles,
    title: 'Content Generator',
    description: 'Generate professional cover letters, resume summaries, and LinkedIn bios with AI in seconds.',
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/25',
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'AI analyzes your profile and recommends the most relevant jobs with a detailed match explanation.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/25',
  },
  {
    icon: Zap,
    title: 'Instant Apply',
    description: 'Apply to multiple jobs quickly with your saved profile and AI-generated application materials.',
    color: 'from-blue-500 to-cyan-600',
    glow: 'shadow-blue-500/25',
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All job postings are reviewed and verified to ensure quality and legitimacy.',
    color: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/25',
  },
  {
    icon: BarChart3,
    title: 'Career Analytics',
    description: 'Track your job search progress, application rates, and career growth with detailed analytics.',
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/25',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-950" id="features">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Why CareerLens AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Land Your Dream Job</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Combine powerful AI tools with a comprehensive job marketplace to supercharge your career journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, color, glow }) => (
            <div
              key={title}
              className="p-6 glass-card hover:border-white/15 transition-all duration-300 group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg ${glow} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
