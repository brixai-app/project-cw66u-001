import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Lock, Unlock, Star, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Lesson, LessonAccessLevel } from '@/types';
import { useAppContext } from '@/context/AppContext';

export interface LessonDetailModalProps {
  lesson?: Lesson | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpenFullLesson?: (lessonId: string) => void;
}

function accessLabel(level: LessonAccessLevel): string {
  if (level === 'free') return 'مجاني';
  if (level === 'premium') return 'مميز';
  return 'مغلق';
}

export function LessonDetailModal({
  lesson = null,
  open = false,
  onOpenChange = () => undefined,
  onOpenFullLesson = () => undefined,
}: LessonDetailModalProps) {
  const { favorites, progress, toggleFavorite, completeLesson, hasAccessToLesson, subscriptionStatus } =
    useAppContext();

  const isFavorite = React.useMemo(
    () => !!favorites?.some?.((f) => f?.lessonId === lesson?.id),
    [favorites, lesson?.id]
  );

  const isCompleted = React.useMemo(
    () => !!progress?.some?.((p) => p?.lessonId === lesson?.id && p?.completed),
    [progress, lesson?.id]
  );

  const canAccess = hasAccessToLesson(lesson ?? undefined);

  const handleFavorite = () => {
    if (!lesson?.id) return;
    toggleFavorite(lesson.id);
    toast.success(isFavorite ? 'تمت إزالة الدرس من المفضلة' : 'تمت إضافة الدرس إلى المفضلة');
  };

  const handleComplete = () => {
    if (!lesson?.id) return;
    if (!canAccess) {
      toast.error('هذه الحصة متاحة فقط للمشتركين المميزين');
      return;
    }
    completeLesson(lesson.id, null);
    toast.success('أحسنت! تم وضع علامة مكتمل على هذه الحصة');
  };

  const handleOpenFull = () => {
    if (!lesson?.id) return;
    if (!canAccess) {
      toast.error('قم بالترقية للوصول إلى هذه الحصة');
      return;
    }
    onOpenChange(false);
    onOpenFullLesson(lesson.id);
  };

  const accessBadgeClasses = cn(
    'inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold tracking-widest',
    lesson?.accessLevel === 'free' && 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    lesson?.accessLevel === 'premium' && 'bg-amber-50 text-amber-700 border border-amber-100',
    lesson?.accessLevel === 'locked' && 'bg-slate-100 text-slate-600 border border-slate-200'
  );

  return (
    <Dialog.Root open={open && !!lesson} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-fadeIn" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-6 right-1/2 z-50 w-[min(540px,100%-24px)] translate-x-1/2 rounded-[14px]',
            'bg-[#F5F7FA] shadow-2xl outline-none',
            'focus-visible:ring-2 focus-visible:ring-[#19B5A5]',
            'data-[state=open]:animate-slideUpAndFade',
            'flex flex-col overflow-hidden'
          )}
        >
          <div className="flex items-center justify-between border-b border-[#D9E2EC] bg-white px-6 py-4">
            <Dialog.Title className="text-base font-semibold tracking-wide text-[#0B1B2B]">
              معاينة الحصة
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D9E2EC] bg-white text-[#5B6B7A] transition hover:bg-[#F5F7FA]"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6B7A] text-right">
                  الحصة
                </p>
                <Dialog.Description className="text-right text-lg font-semibold leading-snug text-[#0B1B2B]">
                  {lesson?.title ?? '—'}
                </Dialog.Description>
              </div>
              {lesson?.accessLevel && (
                <span className={accessBadgeClasses}>
                  {lesson?.accessLevel === 'locked' ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <Unlock className="h-3.5 w-3.5" />
                  )}
                  <span>{accessLabel(lesson.accessLevel)}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border border-dashed border-[#D9E2EC] bg-white px-4 py-3 rounded-[12px]">
              <div className="flex items-center gap-2 text-xs text-[#5B6B7A]">
                <Clock className="h-4 w-4 text-[#19B5A5]" />
                <span>المدة التقريبية</span>
                <span className="font-semibold text-[#0B1B2B]">
                  {lesson?.durationMinutes ?? 0} دقيقة
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5B6B7A]">
                <Star className={cn('h-4 w-4', isFavorite ? 'text-amber-500' : 'text-[#D9E2EC]')} />
                <span>{isCompleted ? 'منجزة' : 'غير مكتملة'}</span>
              </div>
            </div>

            {lesson?.description && (
              <div className="space-y-1 text-right">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#5B6B7A] uppercase">
                  نظرة عامة
                </p>
                <p className="text-sm leading-relaxed text-[#0B1B2B]">
                  {lesson.description}
                </p>
              </div>
            )}

            <div className="space-y-2 text-right">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#5B6B7A] uppercase">
                الأهداف الرئيسية
              </p>
              <ul className="space-y-1.5 text-sm text-[#0B1B2B]">
                <li>فهم المفهوم الأساسي للدرس خطوة بخطوة.</li>
                <li>تطبيق القاعدة على أمثلة عملية مشابهة للامتحان.</li>
                <li>التحضير السريع عبر ملخص مركز وتمارين تفاعلية.</li>
              </ul>
            </div>

            {!canAccess && (
              <div className="rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-right text-amber-800 space-y-1">
                <p className="font-semibold">هذه الحصة ضمن المحتوى المميز</p>
                <p>
                  للوصول الكامل لكل الحصص، قم بتفعيل اشتراكك. حالياً حالتك:{' '}
                  <span className="font-semibold">{subscriptionStatus ?? 'inactive'}</span>
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-[#D9E2EC] bg-white px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleFavorite}
                className={cn(
                  'inline-flex min-w-[110px] items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold',
                  isFavorite
                    ? 'border-amber-400 bg-amber-50 text-amber-800'
                    : 'border-[#D9E2EC] bg-white text-[#0B1B2B] hover:bg-[#F5F7FA]'
                )}
              >
                <Star className={cn('h-4 w-4', isFavorite ? 'fill-amber-400 text-amber-400' : '')} />
                <span>{isFavorite ? 'في المفضلة' : 'إضافة للمفضلة'}</span>
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className={cn(
                  'inline-flex min-w-[110px] items-center justify-center rounded-md border px-3 py-2 text-xs font-semibold',
                  isCompleted
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-[#D9E2EC] bg-white text-[#0B1B2B] hover:bg-[#F5F7FA]'
                )}
              >
                {isCompleted ? 'تمت المتابعة' : 'وضع علامة مكتمل'}
              </button>
            </div>
            <motion.button
              type="button"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenFull}
              className={cn(
                'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md',
                'bg-[#19B5A5] px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase',
                'text-black transition hover:bg-[#149789]'
              )}
            >
              <span>الدخول إلى صفحة الحصة</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default LessonDetailModal;