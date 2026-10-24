import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, User, ChevronDown, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import MobileNavDrawer from './MobileNavDrawer';

export interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const navigate = useNavigate();
  const { user, role, notifications, logout } = useAppContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const unreadCount = notifications?.filter((n) => n?.status === 'unread')?.length ?? 0;

  const navLinks = [
    { to: '/levels', label: 'المستويات' },
    { to: '/subjects', label: 'المواد' },
    { to: '/exams', label: 'الامتحانات' },
    { to: '/dashboard', label: 'لوحة التحكم', protected: true },
  ];

  const handleAuthClick = () => {
    if (user) {
      void logout();
      return;
    }
    navigate('/auth');
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b border-[#D9E2EC] bg-white/90 backdrop-blur',
          'font-[\'Tajawal\',system-ui,sans-serif]',
          className,
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-0" dir="rtl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="القائمة"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#D9E2EC] bg-white text-[#0B1B2B] hover:bg-[#F5F7FA] lg:hidden"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-md border border-[#D9E2EC] bg-white text-[#0B1B2B] hover:bg-[#F5F7FA] lg:flex"
              onClick={() => setIsMobileOpen(true)}
              aria-label="القائمة الجانبية"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#0B1B2B] text-white">
                <span className="text-lg font-semibold tracking-tight">ت</span>
              </div>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="font-[\'Cairo\',system-ui,sans-serif] text-base font-semibold text-[#0B1B2B]">
                  تفوق
                </span>
                <span className="text-xs text-[#5B6B7A]">منصة تعليمية مغربية</span>
              </div>
            </Link>
          </div>

          <nav className="relative hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              if (link?.protected && !user) return null;
              return (
                <Link
                  key={link?.to}
                  to={link?.to ?? '/'}
                  className="text-sm font-medium text-[#5B6B7A] transition-colors hover:text-[#0B1B2B]"
                >
                  {link?.label ?? ''}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden max-w-xs flex-1 items-center rounded-[14px] border border-[#D9E2EC] bg-[#F5F7FA] px-3 py-1.5 text-sm text-[#5B6B7A] sm:flex">
              <Search className="ml-2 h-4 w-4" />
              <input
                dir="rtl"
                placeholder="ابحث عن درس أو مادة..."
                className="h-7 w-full bg-transparent text-right text-sm text-[#0B1B2B] outline-none placeholder:text-[#9FB3C8]"
              />
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[#D9E2EC] bg-white text-[#0B1B2B] hover:bg-[#F5F7FA]"
              aria-label="الإشعارات"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -left-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF7A45] px-1 text-[10px] font-semibold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              className="flex h-9 items-center justify-center gap-2 rounded-md border border-[#D9E2EC] bg-white px-3 text-sm font-medium text-[#0B1B2B] hover:bg-[#F5F7FA]"
              onClick={handleAuthClick}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">
                {user?.fullName ?? 'تسجيل الدخول'}
              </span>
              {role && user && <ChevronDown className="h-3 w-3 text-[#9FB3C8]" />}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              className="flex h-9 items-center justify-center gap-2 rounded-md bg-[#19B5A5] px-3 text-xs font-semibold uppercase tracking-[0.18em] text-black hover:bg-[#149789]"
              onClick={() => navigate('/pricing')}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">الاشتراك</span>
            </motion.button>
          </div>
        </div>
      </header>

      <MobileNavDrawer open={isMobileOpen} onOpenChange={setIsMobileOpen} />
    </>
  );
}

export default Header;