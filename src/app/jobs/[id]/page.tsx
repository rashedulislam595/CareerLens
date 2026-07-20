'use client';

import { useState } from 'react';
import { useJob, useJobReviews, useCreateReview, useToggleSaveJob } from '@/hooks/useJobs';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Briefcase, Calendar, Star, Send, ShieldAlert, Heart } from 'lucide-react';
import { formatSalary, formatDate, TYPE_COLORS } from '@/lib/utils';
import { toast } from 'react-toastify';

export default function JobDetailsPage() {
  const { id } = useParams() as { id: string };
  const { user, isAuthenticated } = useAuth();
  const { data: job, isLoading } = useJob(id);
  const { data: reviewsData } = useJobReviews(id);
  const createReviewMutation = useCreateReview();
  const toggleSaveMutation = useToggleSaveJob();

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const isSaved = user?.savedJobs?.includes(id);

  const handleSaveJob = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save jobs');
      return;
    }
    try {
      const res = await toggleSaveMutation.mutateAsync(id);
      toast.success(res.saved ? 'Job saved successfully!' : 'Job unsaved successfully');
    } catch {
      toast.error('Failed to toggle save state');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || comment.length < 10) {
      toast.error('Comment must be at least 10 characters long');
      return;
    }
    try {
      await createReviewMutation.mutateAsync({ jobId: id, rating, comment });
      toast.success('Review posted successfully!');
      setComment('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Job listing not found</h2>
        <p className="text-white/50">It may have been removed or closed.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container">
        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6 sm:p-8 border border-white/5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="flex gap-4">
                  {job.logo && (
                    <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-xl object-contain bg-slate-800 p-2" />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1.5">{job.title}</h1>
                    <p className="text-indigo-400 font-semibold mb-2">{job.company}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full border ${TYPE_COLORS[job.type] || ''}`}>
                        {job.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white/60">
                        {job.experienceLevel} Level
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSaveJob}
                    className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      isSaved
                        ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-400' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={() => toast.success('Application flow initiated!')}
                    className="btn-primary py-2.5 px-6 flex-1 sm:flex-initial"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Meta Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-800/40 rounded-2xl border border-white/5 mb-8 text-sm">
                <div>
                  <div className="text-white/40 text-xs mb-1">Salary Range</div>
                  <div className="font-semibold text-white">
                    {formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency, job.salary?.period)}
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Location</div>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Posted Date</div>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{formatDate(job.createdAt)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Category</div>
                  <div className="font-semibold text-white">{job.category}</div>
                </div>
              </div>

              {/* Description Section */}
              <div className="prose prose-invert max-w-none mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Overview / Description</h3>
                <p className="text-white/70 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              {/* Key Information / Specifications */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-8 pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold text-white mb-3">Key Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/70">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="leading-relaxed">{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="mb-8 pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold text-white mb-3">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/70">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="glass-card p-6 sm:p-8 border border-white/5">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <h3 className="text-lg font-bold text-white">
                  Reviews & Ratings ({reviewsData?.total || 0})
                </h3>
                {reviewsData && reviewsData.total > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-white font-bold">{reviewsData.avgRating} / 5</span>
                  </div>
                )}
              </div>

              {/* Add Review */}
              {isAuthenticated ? (
                <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">Your Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Share your experience working here or interviewing..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      id="review-comment"
                      className="input-field flex-1"
                    />
                    <button type="submit" className="btn-primary px-4 py-2 shrink-0">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-sm text-white/40 mb-6 bg-slate-800/40 p-4 rounded-xl text-center border border-white/5">
                  Please log in to share a review for this company.
                </p>
              )}

              {/* Reviews List */}
              {reviewsData && reviewsData.reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviewsData.reviews.map((review) => (
                    <div key={review._id} className="text-sm border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {review.userId.avatar && (
                            <img
                              src={review.userId.avatar}
                              alt={review.userId.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                          )}
                          <span className="font-semibold text-white">{review.userId.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-white/80">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-white/60 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40 text-center py-6">
                  No reviews posted yet. Be the first one!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster Card */}
            <div className="glass-card p-6 border border-white/5">
              <h3 className="font-bold text-white mb-4">Job Poster Info</h3>
              <div className="flex items-center gap-3 mb-4">
                {typeof job.postedBy === 'object' && (
                  <>
                    {job.postedBy.avatar && (
                      <img
                        src={job.postedBy.avatar}
                        alt={job.postedBy.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm font-semibold text-white">{job.postedBy.name}</div>
                      <div className="text-xs text-white/40">{job.postedBy.email}</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="glass-card p-6 border border-white/5 text-sm space-y-4">
              <h3 className="font-bold text-white mb-2">Job Specifications</h3>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-white/40">Category:</span>
                <span className="text-white font-semibold">{job.category}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-white/40">Job Type:</span>
                <span className="text-white font-semibold capitalize">{job.type}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-white/40">Location:</span>
                <span className="text-white font-semibold truncate max-w-[150px]">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Views:</span>
                <span className="text-white font-semibold">{job.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
