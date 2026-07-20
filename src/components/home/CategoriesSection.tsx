import Link from 'next/link';
import { CATEGORY_ICONS, JOB_CATEGORIES } from '@/lib/utils';

const CATEGORY_COUNTS: Record<string, number> = {
  Technology: 1240,
  Design: 380,
  Marketing: 290,
  Finance: 210,
  Healthcare: 175,
  Education: 145,
  Engineering: 520,
  Sales: 310,
  HR: 120,
  Legal: 85,
  'Data Science': 430,
  Product: 295,
  Operations: 160,
  'Customer Service': 200,
  Other: 95,
};

const CATEGORY_COLORS = [
  'hover:border-indigo-500/40 hover:bg-indigo-500/10',
  'hover:border-purple-500/40 hover:bg-purple-500/10',
  'hover:border-amber-500/40 hover:bg-amber-500/10',
  'hover:border-emerald-500/40 hover:bg-emerald-500/10',
  'hover:border-blue-500/40 hover:bg-blue-500/10',
  'hover:border-pink-500/40 hover:bg-pink-500/10',
  'hover:border-cyan-500/40 hover:bg-cyan-500/10',
  'hover:border-orange-500/40 hover:bg-orange-500/10',
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-slate-900/50" id="categories">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-white/50">Explore thousands of opportunities across every industry.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {JOB_CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              href={`/jobs?category=${encodeURIComponent(cat)}`}
              className={`p-5 glass-card ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]} border border-white/8 transition-all duration-300 text-center group cursor-pointer`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {CATEGORY_ICONS[cat]}
              </div>
              <div className="text-sm font-semibold text-white mb-1 group-hover:text-white transition-colors">
                {cat}
              </div>
              <div className="text-xs text-white/40">{CATEGORY_COUNTS[cat]?.toLocaleString()} jobs</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
