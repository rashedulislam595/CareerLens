<div align="center">

<img src="https://img.shields.io/badge/CareerLens-AI%20Powered-6366f1?style=for-the-badge&logo=sparkles&logoColor=white" alt="CareerLens AI" />

# 🚀 CareerLens AI

### *The Intelligent Career Platform — Discover, Generate & Grow*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini%203.5%20Flash-4285f4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.1-f97316?style=flat-square)](https://groq.com/)

**Client Repo:** [CareerLens](https://github.com/rashedulislam595/CareerLens) &nbsp;|&nbsp; **Server Repo:** [carearlens-server](https://github.com/rashedulislam595/CareerLens-server)

[Live Demo](#) · [API Docs](#-api-endpoints) · [Report Bug](https://github.com/rashedulislam595/CareerLens/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [AI Capabilities](#-ai-capabilities)
- [Security](#-security)
- [License](#-license)

---

## 🌟 About the Project

**CareerLens AI** is a full-stack intelligent career platform that combines traditional job discovery with cutting-edge AI capabilities. It enables job seekers to find matching opportunities, generate professional career content, and receive personalized guidance — all from one seamless platform.

Built with a modern, dark-themed UI, real-time AI streaming, and a robust REST API backend, CareerLens demonstrates a production-grade SaaS architecture.

---

## ✨ Key Features

### 👤 Authentication & User Management
- Secure email/password registration & login via **Better Auth**
- Google OAuth 2.0 social sign-in
- JWT-based session management with HTTP-only cookies
- Role-based access control (`user` / `admin`)
- Editable user profiles (skills, experience, bio, LinkedIn, GitHub, portfolio)

### 💼 Job Platform
- Full CRUD job listing management (post, edit, delete)
- Advanced filtering by category, type, location, experience level & salary range
- Save / unsave job listings
- Job application tracking (views & applicants count)
- Community review & star rating system per job
- AI-powered auto-tagging of job posts

### 🤖 AI Features

| Feature | Model | Description |
|---|---|---|
| **AI Content Generator** | Gemini 3.5 Flash | Cover letters, resume summaries, LinkedIn bios & job descriptions |
| **AI Career Coach** | Groq Llama 3.1 8B | Real-time streaming chat with career guidance, interview prep & salary advice |
| **AI Job Recommendations** | Gemini 3.5 Flash | Smart profile-based job matching with match score & reason |
| **AI Tag Generator** | Gemini 3.5 Flash | Auto-generates relevant skill tags for job postings |

### 📊 Dashboard & Analytics
- Publisher dashboard with stats (published jobs, total views, applicants, saved jobs)
- Monthly job posting trend chart (Recharts area graph)
- AI quick tips panel
- AI-matched job recommendations with match scores

---

## 🛠 Tech Stack

### Frontend — [CareerLens](https://github.com/rashedulislam595/CareerLens)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2 | Full-stack React framework (App Router) |
| **React** | 19 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | v4 | Utility-first styling |
| **TanStack Query** | v5 | Data fetching & caching |
| **Better Auth** | 1.6 | Authentication (client-side) |
| **Framer Motion** | 12 | Animations & transitions |
| **Recharts** | 3.9 | Analytics charts |
| **Axios** | 1.x | HTTP client |
| **React Toastify** | 11 | Toast notifications |
| **Lucide React** | 1.x | Icon library |
| **Zod** | 4.x | Schema validation |

### Backend — [carearlense-server](https://github.com/rashedulislam595/carearlense-server)

| Technology | Version | Purpose |
|---|---|---|
| **Express.js** | 5.x | REST API framework |
| **TypeScript** | 7.x | Type safety |
| **MongoDB + Mongoose** | 9.x | Database & ODM |
| **Better Auth** | 1.6 | Authentication (server-side) |
| **Google Generative AI** | 0.24 | Gemini AI integration |
| **Groq SDK** | 1.3 | Llama 3.1 streaming chat |
| **Helmet** | 8.x | Security headers |
| **express-rate-limit** | 8.x | API rate limiting (200 req / 15 min) |
| **Morgan** | 1.x | HTTP request logging |
| **bcryptjs** | 3.x | Password hashing |
| **jsonwebtoken** | 9.x | JWT token management |

---

## 📁 Project Structure

This project is split across **two separate repositories**:

| Repo | Description | Link |
|---|---|---|
| **CareerLens** | Next.js Frontend (Client) | [rashedulislam595/CareerLens](https://github.com/rashedulislam595/CareerLens) |
| **carearlense-server** | Express.js Backend (Server) | [rashedulislam595/carearlense-server](https://github.com/rashedulislam595/carearlense-server) |

### 📦 Client — `CareerLens`

```
CareerLens/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/           # Login page
│   │   │   └── register/        # Register page
│   │   ├── ai/
│   │   │   ├── chat/            # AI Career Coach (streaming chat)
│   │   │   └── generator/       # AI Content Generator
│   │   ├── api/
│   │   │   └── auth/            # Better Auth Next.js route handler
│   │   ├── dashboard/           # User dashboard & analytics
│   │   ├── jobs/
│   │   │   ├── [id]/            # Job detail page
│   │   │   ├── add/             # Post a new job
│   │   │   └── manage/          # Manage your job listings
│   │   ├── profile/             # User profile page
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog page
│   │   ├── contact/             # Contact page
│   │   ├── privacy/             # Privacy policy
│   │   ├── layout.tsx           # Root layout (Navbar, Footer, Providers)
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css          # Global styles & design tokens
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AIShowcaseSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── CategoriesSection.tsx
│   │   │   ├── CompaniesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── JobCard.tsx
│   │   ├── JobSkeleton.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx        # TanStack Query + Auth providers
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useJobs.ts           # React Query hooks for jobs & stats
│   │   └── useRequireAuth.ts    # Auth guard hook
│   ├── lib/
│   │   ├── api.ts               # Axios instance
│   │   ├── auth.ts              # Better Auth server config
│   │   ├── auth-client.ts       # Better Auth client config
│   │   └── utils.ts             # Utility functions
│   └── types/
│       └── index.ts             # TypeScript interfaces (User, Job, Review)
├── .env                         # Environment variables
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

### 🖥 Server — `carearlense-server`

```
carearlense-server/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   └── auth.ts              # Better Auth server setup
│   ├── controllers/
│   │   ├── ai.controller.ts     # AI generate, chat, recommend, tags
│   │   ├── job.controller.ts    # CRUD, save/unsave, filter jobs
│   │   ├── user.controller.ts   # Profile, stats
│   │   └── review.controller.ts # Job reviews & ratings
│   ├── middlewares/
│   │   ├── auth.middleware.ts   # JWT auth guard
│   │   └── error.middleware.ts  # Global error handler
│   ├── models/
│   │   ├── job.model.ts         # Job schema
│   │   ├── user.model.ts        # User schema
│   │   └── chat.model.ts        # Chat session schema
│   ├── routes/
│   │   ├── job.routes.ts
│   │   ├── ai.routes.ts
│   │   ├── user.routes.ts
│   │   └── review.routes.ts
│   ├── services/
│   │   └── ai.service.ts        # Gemini + Groq SDK integration
│   ├── scripts/
│   │   └── seed.ts              # Database seed script
│   └── index.ts                 # Express app entry point
├── .env                         # Environment variables (not committed)
├── .gitignore
├── nodemon.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18.x`
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API Key → [Get one here](https://aistudio.google.com/)
- Groq API Key → [Get one here](https://console.groq.com/)

### 1. Clone the Repositories

```bash
# Clone the frontend (client)
git clone https://github.com/rashedulislam595/CareerLens.git
cd CareerLens

# Clone the backend (server) — in a separate folder
git clone https://github.com/rashedulislam595/carearlense-server.git
cd carearlense-server
```

### 2. Install Dependencies

```bash
# Client
cd client && npm install

# Server
cd server && npm install
```

### 3. Configure Environment Variables

Copy the examples below into `.env` files in each directory.

### 4. Seed the Database (Optional)

```bash
cd server && npx tsx src/scripts/seed.ts
```

### 5. Run the Application

```bash
# Start server (port 5000)
cd server && npm run dev

# Start client (port 3000)
cd client && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 🔐 Environment Variables

### Client — `client/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_DEMO_EMAIL=demo@careerlens.ai
NEXT_PUBLIC_DEMO_PASSWORD=demo123456

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Server — `server/.env`

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

CLIENT_URL=http://localhost:3000

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000`

### Jobs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/jobs` | ❌ | Get all jobs (filters & pagination) |
| `GET` | `/api/jobs/:id` | ❌ | Get job by ID |
| `POST` | `/api/jobs` | ✅ | Create a new job |
| `PUT` | `/api/jobs/:id` | ✅ | Update a job (owner only) |
| `DELETE` | `/api/jobs/:id` | ✅ | Delete a job (owner only) |
| `POST` | `/api/jobs/:id/save` | ✅ | Toggle save / unsave a job |

### AI

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/ai/generate` | ✅ | Generate AI content |
| `POST` | `/api/ai/chat` | ✅ | Streaming AI coach chat (SSE) |
| `POST` | `/api/ai/recommend` | ✅ | Get AI job recommendations |
| `POST` | `/api/ai/tags` | ✅ | Auto-generate tags for a job |
| `GET` | `/api/ai/sessions` | ✅ | List chat sessions |
| `GET` | `/api/ai/sessions/:id` | ✅ | Get chat session history |
| `DELETE` | `/api/ai/sessions/:id` | ✅ | Delete a chat session |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | ✅ | Get current user profile |
| `PUT` | `/api/users/profile` | ✅ | Update user profile |
| `GET` | `/api/users/stats` | ✅ | Get dashboard statistics |

### Reviews

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/reviews/:jobId` | ❌ | Get reviews for a job |
| `POST` | `/api/reviews` | ✅ | Post a review & rating |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health check |

---

## 🤖 AI Capabilities

### Content Generator (Gemini 3.5 Flash)

Supports 4 content types with customizable **tone** (`professional`, `creative`, `confident`, `humble`) and **length** (`short`, `medium`, `long`):

- **Cover Letter** — ATS-friendly, personalized cover letters
- **Resume Summary** — Impactful professional profile summaries
- **LinkedIn Bio** — Engaging first-person about sections
- **Job Description** — Full JD with overview, responsibilities & requirements

### Career Coach (Groq Llama 3.1 8B — Real-time Streaming)

A real-time AI career advisor that:
- Provides salary negotiation strategies
- Generates role-specific mock interview questions
- Advises on career transitions
- Gives resume & cover letter tips
- Maintains **persistent chat session history** in MongoDB

### Smart Job Recommendations (Gemini 3.5 Flash)

Analyzes user profile (skills, experience, location) against active job listings and returns top 6 matches with:
- **Match Score** (0–100%)
- **Match Reason** (detailed explanation)

---

## 🛡 Security

- **Helmet.js** security headers on all responses
- **Rate Limiting** — 200 requests per 15 minutes per IP on `/api/*`
- **CORS** restricted to defined client origin only
- **HTTP-only cookies** for session tokens (XSS protection)
- **bcryptjs** password hashing with salt rounds: 12
- `.env` secrets excluded from version control via `.gitignore`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [Rashedul Islam](https://github.com/rashedulislam595)

⭐ **Star this repo if you found it helpful!**

</div>
