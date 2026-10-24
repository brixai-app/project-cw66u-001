import React, { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import MobileNavDrawer from '@/components/MobileNavDrawer';
import { useAppContext } from '@/context/AppContext';

export interface AppLayoutProps {
  children?: ReactNode;
}

export function AppLayout({ children = null }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppContext();

  const handleOpenChange = (open: boolean) => {
    setMobileOpen(open ?? false);
  };

  const handleNavigate = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0B1B2B] font-['Tajawal']" dir="rtl">
      <Header onOpenMobileNav={() => setMobileOpen(true)} currentPath={location?.pathname ?? '/'} user={user ?? null} />
      <MobileNavDrawer
        open={mobileOpen}
        onOpenChange={handleOpenChange}
        currentPath={location?.pathname ?? '/'}
        onNavigate={handleNavigate}
        user={user ?? null}
      />
      <main className="pt-20 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
          {children}
        </div>
      </main>
      <footer className="border-t border-[#D9E2EC] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="font-['Cairo'] text-xs uppercase tracking-[0.25em] text-[#5B6B7A]">
              تفوق | Tafaouq
            </p>
            <p className="text-xs text-[#5B6B7A]">
              منصة تعليمية مغربية لمتابعة الدروس، التمارين، وتتبع التقدم الدراسي.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5B6B7A]">
            <button
              type="button"
              className="text-xs text-[#5B6B7A] hover:text-[#19B5A5] transition-colors"
            >
              شروط الاستخدام
            </button>
            <span className="h-3 w-px bg-[#D9E2EC]" />
            <button
              type="button"
              className="text-xs text-[#5B6B7A] hover:text-[#19B5A5] transition-colors"
            >
              سياسة الخصوصية
            </button>
            <span className="h-3 w-px bg-[#D9E2EC]" />
            <p className="text-[11px] text-[#9AA5B1]">
              © {new Date().getFullYear()} تفوق. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;