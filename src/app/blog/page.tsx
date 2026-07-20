import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const POSTS = [
  {
    title: 'How to Land a Remote Job in 2026: The Ultimate Guide',
    excerpt: 'Explore structural shifts in international remote work, interviewing tips, and skills in demand today.',
    date: 'July 15, 2026',
    author: 'Sarah Chen',
    category: 'Remote Work',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600',
  },
  {
    title: 'Writing Cover Letters That Actually Get Read by Hiring Managers',
    excerpt: 'AI is changing recruiters perspectives. Discover how to stand out by customizing each application letter.',
    date: 'June 28, 2026',
    author: 'Marcus Johnson',
    category: 'AI Tips',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
  },
  {
    title: 'Understanding match rates: Optimize your resume profiles',
    excerpt: 'Learn how scoring engines index your skills and projects, and the best ways to format experience.',
    date: 'May 12, 2026',
    author: 'David Kim',
    category: 'Job Search',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Career <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-white/50 max-w-md mx-auto text-sm sm:text-base">
            Expert career advice, technical guides, and platform updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <div
              key={post.title}
              className="glass-card flex flex-col border border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="h-44 w-full bg-slate-800 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </span>
                  </div>
                  <h3 className="font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 mt-auto"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
