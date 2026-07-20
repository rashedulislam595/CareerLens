'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    title: 'Senior Software Engineer at Google',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366F1&color=fff',
    rating: 5,
    text: 'CareerLens AI completely transformed my job search. The AI-generated cover letters were so good that I got callbacks from 8 out of 10 companies I applied to. Found my dream job in 3 weeks!',
  },
  {
    name: 'Marcus Johnson',
    title: 'Product Manager at Stripe',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=10B981&color=fff',
    rating: 5,
    text: 'The AI Career Coach is like having a mentor available 24/7. It helped me negotiate a 40% salary increase and completely changed how I approach job interviews.',
  },
  {
    name: 'Priya Patel',
    title: 'UX Designer at Figma',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=F59E0B&color=fff',
    rating: 5,
    text: 'The smart job recommendations are incredibly accurate. CareerLens AI matched me with Figma — a company I had never even considered — and it was a perfect fit for my skills.',
  },
  {
    name: 'David Kim',
    title: 'Data Scientist at Netflix',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=EC4899&color=fff',
    rating: 5,
    text: "I was skeptical about AI tools at first, but CareerLens AI's resume summary generator created content that I couldn't have written better myself. It perfectly captured my experience.",
  },
  {
    name: 'Emma Williams',
    title: 'Marketing Lead at Shopify',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Williams&background=8B5CF6&color=fff',
    rating: 5,
    text: 'CareerLens AI makes job searching feel less overwhelming. The platform is beautiful, intuitive, and actually helps you get hired. I recommend it to everyone I know.',
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const visible = TESTIMONIALS.slice(index, index + 3);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(TESTIMONIALS.length - 3, i + 1));

  return (
    <section className="py-20 bg-slate-950" id="testimonials">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Loved by <span className="gradient-text">10,000+ Professionals</span>
          </h2>
          <p className="text-white/50">Real stories from real people who found their dream careers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((t) => (
            <div key={t.name} className="glass-card p-6 hover:border-white/15 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.slice(0, TESTIMONIALS.length - 2).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-indigo-400 w-4' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={index >= TESTIMONIALS.length - 3}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
