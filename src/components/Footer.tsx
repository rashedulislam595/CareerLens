import Link from 'next/link';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_LINKS = {
  'For Job Seekers': [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'AI Career Coach', href: '/ai/chat' },
    { label: 'Resume Generator', href: '/ai/generator' },
    { label: 'Career Blog', href: '/blog' },
    { label: 'Company Reviews', href: '/jobs' },
  ],
  'For Employers': [
    { label: 'Post a Job', href: '/jobs/add' },
    { label: 'My Job Listings', href: '/jobs/manage' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/privacy#terms' },
  ],
};

const SOCIAL_LINKS = [
  { icon: '🐦', href: '#', label: 'Twitter' },
  { icon: '🔗', href: '#', label: 'LinkedIn' },
  { icon: '💻', href: '#', label: 'GitHub' },
  { icon: '📺', href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/5 mt-auto">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Career<span className="text-indigo-400">Lens</span> AI
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              The AI-powered career intelligence platform that connects talent with opportunity and helps professionals reach their full potential.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              {[
                { icon: Mail, text: 'hello@careerlens.ai' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: MapPin, text: 'San Francisco, CA' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-white/40">
                  <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

             {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-white/50 hover:text-indigo-400 transition-all duration-200 text-base"
                >
                  <span>{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} CareerLens AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-white/30">
            <span>Powered by</span>
            <span className="text-indigo-400 font-medium ml-1">Gemini AI</span>
            <span className="mx-1">•</span>
            <span className="text-emerald-400 font-medium">Groq</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
