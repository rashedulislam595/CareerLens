import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Job, JobsResponse, Review, Recommendation } from '@/types';

// ─── Query Keys ────────────────────────────────────────────────────────────────
export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: Record<string, string | number | undefined>) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  my: () => [...jobKeys.all, 'my'] as const,
  saved: () => [...jobKeys.all, 'saved'] as const,
  reviews: (jobId: string) => [...jobKeys.all, 'reviews', jobId] as const,
};

// ─── Hooks ─────────────────────────────────────────────────────────────────────

export interface JobFilters {
  search?: string;
  category?: string;
  type?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export function useJobs(filters: JobFilters = {}) {
  return useQuery<JobsResponse>({
    queryKey: jobKeys.list(filters as Record<string, string | number | undefined>),
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v));
      });
      const { data } = await api.get(`/jobs?${params.toString()}`);
      return data.data;
    },
  });
}

export function useJob(id: string) {
  return useQuery<Job>({
    queryKey: jobKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/jobs/${id}`);
      return data.data.job;
    },
    enabled: !!id,
  });
}

export function useMyJobs() {
  return useQuery<Job[]>({
    queryKey: jobKeys.my(),
    queryFn: async () => {
      const { data } = await api.get('/jobs/my');
      return data.data.jobs;
    },
  });
}

export function useSavedJobs() {
  return useQuery<Job[]>({
    queryKey: jobKeys.saved(),
    queryFn: async () => {
      const { data } = await api.get('/users/saved-jobs');
      return data.data.savedJobs;
    },
  });
}

export function useJobReviews(jobId: string) {
  return useQuery<{ reviews: Review[]; avgRating: number; total: number }>({
    queryKey: jobKeys.reviews(jobId),
    queryFn: async () => {
      const { data } = await api.get(`/reviews/${jobId}`);
      return data.data;
    },
    enabled: !!jobId,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (jobData: Partial<Job>) => {
      const { data } = await api.post('/jobs', jobData);
      return data.data.job as Job;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...jobData }: Partial<Job> & { id: string }) => {
      const { data } = await api.put(`/jobs/${id}`, jobData);
      return data.data.job as Job;
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: jobKeys.detail(id) });
      qc.invalidateQueries({ queryKey: jobKeys.my() });
    },
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/jobs/${id}`);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useToggleSaveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data } = await api.post(`/jobs/${jobId}/save`);
      return data.data as { saved: boolean };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.saved() });
    },
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reviewData: { jobId: string; rating: number; comment: string }) => {
      const { data } = await api.post('/reviews', reviewData);
      return data.data.review as Review;
    },
    onSuccess: (_, { jobId }) => {
      qc.invalidateQueries({ queryKey: jobKeys.reviews(jobId) });
    },
  });
}

export function useRecommendations() {
  return useQuery<Recommendation[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const { data } = await api.post('/ai/recommend');
      return data.data.recommendations;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const { data } = await api.get('/users/stats');
      return data.data;
    },
  });
}
