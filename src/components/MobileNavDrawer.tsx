import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { X, Home, BookOpen, Users, Settings, Circle as LogOut, Circle as LogIn, User, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import { gradeLevels } from '@/data/mockData';

export interface MobileNavDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MobileNavDrawer({
  open = false,
  onOpenChange = () => undefined,
}: MobileNavDrawerProps) {
  const navigate = useNavigate();
  const { user, role, subscriptionStatus, logout } = useAppContext();

  const isSubscribed =
    subscriptionStatus === 'active' || subscriptionStatus === 'trialing';

  const topGrades = React.useMemo(
    () => gradeLevels?.slice(0, 5) ?? [],
    []
  );

  const handleNavigate = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  const handleLogout = async () => {
    await logout();
    onOpenChange(false);
    navigate('/');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex max-w-xs w-full outline-none">
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="relative flex h-full w-full flex-col bg-[#F5F7FA] text-[#0B1B2B] shadow-xl"
          >
            <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-[#D9E2EC]">
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#5B6B7A]">
                  تفوق | TAFAOUQ
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold">
                    {user?.fullName ?? 'زائر'}
                  </span>
                  {role && (
                    <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#19B5A5] border border-[#D9E2EC]">
                      {role === 'student'
                        ? 'طالب'
                        : role === 'teacher'
                        ? 'أستاذ'
                        : 'مدير'}
                    </span>
                  )}
                </div>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#D9E2EC] bg-white text-[#5B6B7A] hover:bg-[#E3EDF7] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleNavigate('/')}
                  className="flex w-full items-center justify-between rounded-md bg-white px-3 py-2 text-sm font-medium text-[#0B1B2B] border border-transparent hover:border-[#19B5A5] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-[#19B5A5]" />
                    <span>الرئيسية</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('/lessons')}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-[#0B1B2B] hover:bg-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#19B5A5]" />
                    <span>الدروس</span>
                  </span>
                </button>
                {role === 'teacher' && (
                  <button
                    type="button"
                    onClick={() => handleNavigate('/teacher')}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-[#0B1B2B] hover:bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#19B5A5]" />
                      <span>لوحة الأستاذ</span>
                    </span>
                  </button>
                )}
                {role === 'admin' && (
                  <button
                    type="button"
                    onClick={() => handleNavigate('/admin')}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-[#0B1B2B] hover:bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-[#19B5A5]" />
                      <span>لوحة الإدارة</span>
                    </span>
                  </button>
                )}
              </nav>

              <div className="rounded-xl bg-white border border-[#D9E2EC] px-3 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.18em] text-[#5B6B7A]">
                    اختر المستوى
                  </span>
                  <Sparkles className="h-4 w-4 text-[#19B5A5]" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {topGrades?.map((grade) => (
                    <button
                      type="button"
                      key={grade?.id}
                      onClick={() => handleNavigate(`/grade/${grade?.id ?? ''}`)}
                      className="rounded-md border border-[#D9E2EC] bg-[#F5F7FA] px-2.5 py-1 text-[11px] font-medium text-[#0B1B2B] hover:border-[#19B5A5] hover:bg-white transition-colors"
                    >
                      {grade?.nameAr ?? ''}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleNavigate('/grades')}
                    className="rounded-md px-2.5 py-1 text-[11px] font-medium text-[#19B5A5] hover:bg-[#F5F7FA] transition-colors"
                  >
                    كل المستويات
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-dashed border-[#D9E2EC] bg-white px-3 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold tracking-[0.18em] text-[#5B6B7A] uppercase">
                      الخطة الحالية
                    </span>
                    <span className="text-sm font-semibold">
                      {isSubscribed ? 'تفوق بريميوم' : 'مجانية'}
                    </span>
                    <span className="text-[11px] text-[#5B6B7A]">
                      {isSubscribed
                        ? 'استمتع بكل الدروس والفروض بدون قيود.'
                        : 'افتح كل المسارات والفروض التفاعلية.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('/pricing')}
                    className={cn(
                      'rounded-md px-3 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase',
                      isSubscribed
                        ? 'border border-[#D9E2EC] text-[#0B1B2B] bg-[#F5F7FA]'
                        : 'bg-[#19B5A5] text-black'
                    )}
                  >
                    {isSubscribed ? 'إدارة' : 'ترقية'}
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#D9E2EC] px-4 py-3">
              {user ? (
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to="/account"
                    onClick={() => onOpenChange(false)}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-[#0B1B2B] hover:bg-white transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-[#19B5A5]" />
                    <span>حسابي</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#D9E2EC] bg-white px-3 py-1.5 text-xs font-medium text-[#5B6B7A] hover:bg-[#E3EDF7] transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleNavigate('/login')}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#D9E2EC] bg-white px-3 py-1.5 text-xs font-medium text-[#0B1B2B] hover:bg-[#E3EDF7] transition-colors"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>تسجيل الدخول</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('/signup')}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#19B5A5] px-3 py-1.5 text-xs font-semibold text-black tracking-[0.16em] uppercase"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>إنشاء حساب</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileNavDrawer;