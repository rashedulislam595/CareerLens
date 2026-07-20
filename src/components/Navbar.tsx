'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn, getInitials } from '@/lib/utils';
import {
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Bot,
  Sparkles,
  User,
  ChevronDown,
} from 'lucide-react';

const PUBLIC_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const AUTH_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/jobs/add', label: 'Post Job', icon: PlusCircle },
  { href: '/jobs/manage', label: 'My Jobs', icon: Settings },
  { href: '/ai/generator', label: 'AI Generator', icon: Sparkles },
  { href: '/ai/chat', label: 'AI Coach', icon: Bot },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setProfileOpen(false);
  };

  const links = isAuthenticated ? AUTH_LINKS : PUBLIC_LINKS;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 transition-all duration-300">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Career<span className="text-indigo-400">Lens</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const IconComponent = 'icon' in link ? (link.icon as React.ComponentType<{ className?: string }>) : null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(user?.name || 'U')
                    )}
                  </div>
                  <span className="text-sm text-white/80 max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className={cn('w-4 h-4 text-white/50 transition-transform', profileOpen && 'rotate-180')} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-slate-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl shadow-black/30 py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10 mb-1">
                      <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                      <p className="text-xs text-white/50 truncate">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => {
              const IconComponent = 'icon' in link ? (link.icon as React.ComponentType<{ className?: string }>) : null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-center text-sm text-white/80 hover:text-white border border-white/20 rounded-xl">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-center text-sm bg-indigo-600 text-white rounded-xl font-medium">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
