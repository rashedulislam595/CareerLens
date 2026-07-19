export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  profile: {
    skills: string[];
    experience: string;
    location: string;
    bio: string;
    title: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
  savedJobs: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  logo: string;
  description: string;
  shortDescription: string;
  category: string;
  type: 'remote' | 'onsite' | 'hybrid' | 'part-time';
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  location: string;
  tags: string[];
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  imageUrl: string;
  postedBy: User | string;
  status: 'active' | 'closed' | 'draft';
  views: number;
  applicants: number;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  jobId: string;
  userId: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatSession {
  _id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  job: Job;
  reason: string;
  matchScore: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

export type JobCategory =
  | 'Technology'
  | 'Design'
  | 'Marketing'
  | 'Finance'
  | 'Healthcare'
  | 'Education'
  | 'Engineering'
  | 'Sales'
  | 'HR'
  | 'Legal'
  | 'Data Science'
  | 'Product'
  | 'Operations'
  | 'Customer Service'
  | 'Other';

export type JobType = 'remote' | 'onsite' | 'hybrid' | 'part-time';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
