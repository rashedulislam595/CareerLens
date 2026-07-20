'use client';

import { useState } from 'react';
import { useJobs } from '@/hooks/useJobs';
import JobCard from '@/components/JobCard';
import JobSkeleton from '@/components/JobSkeleton';
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, Briefcase } from 'lucide-react';
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from '@/lib/utils';

export default function ExploreJobsPage() {
  // Filter states
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useJobs({
    search,
    category,
    type,
    location,
    experienceLevel,
    sort,
    page,
    limit: 8,
  });

  const jobs = data?.jobs || [];
  const pagination = data?.pagination;

  const handleClearFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    setType('');
    setExperienceLevel('');
    setSort('-createdAt');
    setPage(1);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Explore <span className="gradient-text">Job Opportunities</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base">
            Find the perfect matching job listings from curated tech companies.
          </p>
        </div>

        {/* Search Bar & Primary Controls */}
        <div className="glass-card p-4 mb-6 border border-white/5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search job title, keywords or company..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="input-field pl-12"
                id="explore-search"
              />
            </div>
            <div className="relative lg:w-64">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setPage(1);
                }}
                className="input-field pl-12"
                id="explore-location"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 ${
                  showFilters ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : ''
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <div className="relative flex-1 sm:flex-none">
                <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-field pl-12 pr-8 appearance-none cursor-pointer"
                  id="explore-sort"
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="createdAt">Oldest First</option>
                  <option value="-salary.max">Highest Salary</option>
                  <option value="salary.min">Lowest Salary</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 border-t border-white/5">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="input-field cursor-pointer"
                  id="filter-category"
                >
                  <option value="">All Categories</option>
                  {JOB_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Job Type
                </label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPage(1);
                  }}
                  className="input-field cursor-pointer"
                  id="filter-type"
                >
                  <option value="">All Types</option>
                  {JOB_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => {
                    setExperienceLevel(e.target.value);
                    setPage(1);
                  }}
                  className="input-field cursor-pointer"
                  id="filter-experience"
                >
                  <option value="">All Levels</option>
                  {EXPERIENCE_LEVELS.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {(search || location || category || type || experienceLevel) && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleClearFilters}
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <JobSkeleton key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="glass-card p-12 text-center border border-white/5">
            <Briefcase className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No jobs found</h3>
            <p className="text-white/50 max-w-sm mx-auto text-sm">
              We couldn't find any job listings matching your current search parameters. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage((p) => p - 1)}
                  className="btn-secondary px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <div className="flex items-center gap-1.5 px-3">
                  {[...Array(pagination.pages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPage(idx + 1)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold border flex items-center justify-center transition-all ${
                        page === idx + 1
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                          : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!pagination.hasNext}
                  onClick={() => setPage((p) => p + 1)}
                  className="btn-secondary px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
