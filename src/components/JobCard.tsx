import Link from 'next/link';
import { Job } from '@/types';
import { MapPin, Briefcase, Calendar, Star, ChevronRight } from 'lucide-react';
import { formatSalary, formatDate, TYPE_COLORS } from '@/lib/utils';

export default function JobCard({ job }: { job: Job }) {
  // Use mock rating or average review rating
  const rating = 4.8;

  return (
    <div className="glass-card flex flex-col h-full border border-white/5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group overflow-hidden">
      {/* Media Image */}
      <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
        {job.imageUrl ? (
          <img
            src={job.imageUrl}
            alt={job.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-slate-900 flex items-center justify-center">
            <Briefcase className="w-10 h-10 text-white/20" />
          </div>
        )}
        {/* Job Type Badge */}
        <span
          className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
            TYPE_COLORS[job.type] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
          }`}
        >
          {job.type}
        </span>
      </div>

      {/* Info Container */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Company & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {job.logo && (
              <img src={job.logo} alt={job.company} className="w-6 h-6 rounded-md object-contain" />
            )}
            <span className="text-sm text-white/50 font-medium truncate max-w-[150px]">{job.company}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-white/80">{rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
          {job.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed flex-1">
          {job.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-1 pt-4 border-t border-white/5 text-xs text-white/50 mb-5">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-indigo-400 font-semibold truncate">
              {formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency, job.salary?.period)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{formatDate(job.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end uppercase tracking-wider font-semibold text-indigo-300">
            {job.experienceLevel}
          </div>
        </div>

        {/* View Details Button */}
        <Link
          href={`/jobs/${job._id}`}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-indigo-500 text-indigo-400 hover:text-white text-sm font-semibold transition-all duration-300"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
