import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'CareerLens AI — Find Your Dream Career',
    template: '%s | CareerLens AI',
  },
  description:
    'CareerLens AI is the intelligent career platform that helps you discover jobs, generate professional content, and get AI-powered career coaching.',
  keywords: ['jobs', 'career', 'AI', 'job search', 'career coaching', 'resume', 'cover letter'],
  authors: [{ name: 'CareerLens AI' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CareerLens AI',
    title: 'CareerLens AI — Find Your Dream Career',
    description: 'AI-powered job discovery and career intelligence platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Providers>
      </body>
    </html>
  );
}
