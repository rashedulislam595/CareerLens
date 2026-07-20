'use client';

import { useMyJobs, useDeleteJob } from '@/hooks/useJobs';
import useRequireAuth from '@/hooks/useRequireAuth';
import Link from 'next/link';
import { Briefcase, Eye, Trash2, ShieldAlert } from 'lucide-react';
import { formatSalary } from '@/lib/utils';
import { toast } from 'react-toastify';

export default function ManageJobsPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const { data: jobs = [], isLoading, refetch } = useMyJobs();
  const deleteMutation = useDeleteJob();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Job listing deleted successfully!');
      refetch();
    } catch {
      toast.error('Failed to delete job listing');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Job Listings</h1>
            <p className="text-white/50 text-sm">View, track, or delete job postings you have published.</p>
          </div>
          <Link href="/jobs/add" className="btn-primary py-2.5 px-5">
            Post Another Job
          </Link>
        </div>

        {/* Content table/grid */}
        {jobs.length === 0 ? (
          <div className="glass-card p-12 text-center border border-white/5">
            <Briefcase className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No jobs posted yet</h3>
            <p className="text-white/50 max-w-sm mx-auto text-sm mb-6">
              You haven't published any job openings yet. Start publishing to find qualified candidates.
            </p>
            <Link href="/jobs/add" className="btn-primary">
              Create First Listing
            </Link>
          </div>
        ) : (
          <div className="glass-card border border-white/5 overflow-hidden shadow-xl">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-800/60 text-white/40 font-semibold uppercase tracking-wider">
                    <th className="p-4 pl-6">Job Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Salary Range</th>
                    <th className="p-4">Views / Applicants</th>
                    <th className="p-4 pr-6 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-white/2 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="font-semibold text-white mb-0.5">{job.title}</div>
                        <div className="text-xs text-white/40 flex items-center gap-2">
                          <span>{job.company}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span className="capitalize text-indigo-400">{job.type}</span>
                        </div>
                      </td>
                      <td className="p-4 text-white/70">{job.category}</td>
                      <td className="p-4 text-white/70">
                        {formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency, job.salary?.period)}
                      </td>
                      <td className="p-4 text-white/70">
                        <div className="flex gap-4">
                          <span>{job.views} views</span>
                          <span>{job.applicants} applicants</span>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/jobs/${job._id}`}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-white/5">
              {jobs.map((job) => (
                <div key={job._id} className="p-5 space-y-4">
                  <div>
                    <div className="font-bold text-white mb-0.5">{job.title}</div>
                    <div className="text-xs text-white/40">
                      {job.company} • {job.location} • <span className="text-indigo-400 capitalize">{job.type}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                    <div>
                      <span className="text-white/30 block">Category</span>
                      {job.category}
                    </div>
                    <div>
                      <span className="text-white/30 block">Salary Range</span>
                      {formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency, job.salary?.period)}
                    </div>
                    <div className="col-span-2">
                      <span className="text-white/30 block">Stats</span>
                      {job.views} views • {job.applicants} applicants
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/jobs/${job._id}`}
                      className="flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-semibold transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
