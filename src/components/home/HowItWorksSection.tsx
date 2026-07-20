import { UserPlus, Search, Bot, Briefcase } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up and build your professional profile with your skills, experience, and career goals.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    number: '02',
    icon: Bot,
    title: 'Let AI Analyze You',
    description: "Our AI studies your profile and browsing behavior to understand exactly what you're looking for.",
    color: 'from-amber-500 to-orange-600',
  },
  {
    number: '03',
    icon: Search,
    title: 'Get Smart Matches',
    description: 'Receive personalized job recommendations with AI-generated match scores and explanations.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    number: '04',
    icon: Briefcase,
    title: 'Apply with AI Help',
    description: 'Generate tailored cover letters and resume summaries for each job with one click.',
    color: 'from-pink-500 to-rose-600',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-slate-950" id="how-it-works">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How <span className="gradient-text">CareerLens AI</span> Works
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From profile to placement in 4 simple steps — powered by artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {STEPS.map(({ number, icon: Icon, title, description, color }, i) => (
            <div key={number} className="relative text-center group">
              {/* Step number */}
              <div className="relative inline-flex mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-400 z-20">
                  {i + 1}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed px-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
