import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, BookOpen } from 'lucide-react';
import { lessons, subscriptionPlans, subjects, gradeLevels } from '@/data/mockData';
import { Lesson } from '@/types';
import { useAppContext } from '@/context/AppContext';
import LessonDetailModal, { LessonDetailModalProps } from '@/components/LessonDetailModal';
import { cn } from '@/lib/utils';

export interface HomeProps {}

export function Home({}: HomeProps) {
  const { hasAccessToLesson } = useAppContext();
  const [selectedGradeId, setSelectedGradeId] = useState(gradeLevels?.[0]?.id ?? 'g9');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects?.[0]?.id ?? 'math');
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const newestLessons = useMemo(
    () =>
      lessons
        ?.slice()
        ?.sort((a, b) => b?.durationMinutes - a?.durationMinutes)
        ?.slice(0, 6),
    []
  );

  const heroLessons = useMemo(
    () =>
      lessons
        ?.filter(l => l?.gradeId === selectedGradeId && l?.subjectId === selectedSubjectId)
        ?.slice(0, 3),
    [selectedGradeId, selectedSubjectId]
  );

  const popularSubjects = useMemo(() => subjects?.slice(0, 6) ?? [], []);

  const plans = useMemo(() => subscriptionPlans ?? [], []);

  const handleOpenPreview: LessonDetailModalProps['onOpenFullLesson'] = lessonId => {
    const found = lessons?.find(l => l?.id === lessonId) ?? null;
    setPreviewLesson(found);
    setPreviewOpen(true);
  };

  const handleQuickPreview = (lesson: Lesson | null) => {
    setPreviewLesson(lesson);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <main className="mx-auto max-w-6xl px-4 py-10 space-y-16">
        <section className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-stretch">
          <div className="relative overflow-hidden rounded-[14px] bg-[#0B1B2B] text-white min-h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
              crossOrigin="anonymous"
              alt="Tafaouq hero"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="relative h-full flex flex-col justify-between p-8 lg:p-10">
              <div className="flex justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-right max-w-md ml-auto"
                >
                  <p className="text-sm font-semibold tracking-[0.25em] text-[#19B5A5] mb-3">
                    منصة مغربية 100٪
                  </p>
                  <h1 className="font-[Cairo] text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                    تفوّقك
                    <span className="inline-block border-b-4 border-[#19B5A5] pb-1 mr-2">
                      يبدأ من هنا
                    </span>
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-[#D9E2EC] font-[Tajawal] leading-relaxed">
                    دروس تفاعلية، فروض مصححة، وتتبع دقيق لتقدمك
                    عبر جميع المستويات الإعدادية والثانوية.
                  </p>
                  <div className="mt-6 flex flex-row-reverse items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md bg-[#19B5A5] px-5 py-2.5 text-sm font-semibold text-black tracking-[0.18em]"
                    >
                      ابدأ الآن
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-xs font-medium text-white/90 tracking-[0.22em]"
                    >
                      استكشف المستويات
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-wrap justify-end gap-2">
                  {gradeLevels
                    ?.slice()
                    ?.sort((a, b) => a?.order - b?.order)
                    ?.slice(0, 6)
                    ?.map(grade => (
                      <button
                        key={grade?.id}
                        type="button"
                        onClick={() => setSelectedGradeId(grade?.id)}
                        className={cn(
                          'px-3 py-1.5 rounded-md text-xs font-[Tajawal] border border-white/20 text-white/80 hover:text-white transition',
                          selectedGradeId === grade?.id && 'bg-white text-[#0B1B2B]'
                        )}
                      >
                        {grade?.nameAr ?? ''}
                      </button>
                    ))}
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {subjects?.slice(0, 6)?.map(subject => (
                    <button
                      key={subject?.id}
                      type="button"
                      onClick={() => setSelectedSubjectId(subject?.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-md text-[11px] font-[Tajawal] border border-white/15 text-white/70 hover:text-white transition',
                        selectedSubjectId === subject?.id && 'bg-[#19B5A5] text-black border-transparent'
                      )}
                    >
                      {subject?.nameAr ?? ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[14px] bg-white shadow-sm border border-[#D9E2EC] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-[Cairo] text-lg text-[#0B1B2B]">دروس مقترحة لك</h2>
                <span className="text-[11px] font-[Tajawal] text-[#5B6B7A]">
                  مستوى {gradeLevels?.find(g => g?.id === selectedGradeId)?.nameAr ?? ''}
                </span>
              </div>
              <div className="space-y-3">
                {heroLessons?.map(lesson => (
                  <button
                    key={lesson?.id}
                    type="button"
                    onClick={() => handleQuickPreview(lesson ?? null)}
                    className="w-full flex flex-row-reverse items-center justify-between gap-3 rounded-md border border-[#D9E2EC] px-3 py-2 hover:border-[#19B5A5] hover:bg-[#F5F7FA] transition"
                  >
                    <div className="flex-1 text-right">
                      <p className="font-[Tajawal] text-sm text-[#0B1B2B] line-clamp-1">
                        {lesson?.title ?? ''}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#5B6B7A]">
                        {lesson?.durationMinutes ?? 0} دقيقة •{' '}
                        {lesson?.accessLevel === 'free' ? 'مجاني' : 'مميز'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-[10px] font-semibold tracking-[0.25em]',
                          hasAccessToLesson(lesson) ? 'text-[#19B5A5]' : 'text-[#F97316]'
                        )}
                      >
                        {hasAccessToLesson(lesson) ? 'متاح' : 'محتوى مميز'}
                      </span>
                      <Play className="h-4 w-4 text-[#19B5A5]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] bg-white shadow-sm border border-[#D9E2EC] p-5">
              <h3 className="font-[Cairo] text-base text-[#0B1B2B] mb-3 text-right">
                مواد شائعة بين الطلاب
              </h3>
              <div className="flex flex-wrap justify-end gap-2">
                {popularSubjects?.map(subject => (
                  <div
                    key={subject?.id}
                    className="px-3 py-1.5 rounded-md bg-[#F5F7FA] text-[11px] font-[Tajawal] text-[#0B1B2B]"
                  >
                    {subject?.nameAr ?? ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between flex-row-reverse">
            <h2 className="font-[Cairo] text-xl text-[#0B1B2B]">أحدث الدروس المضافة</h2>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-[#D9E2EC] px-3 py-1.5 text-[11px] font-[Tajawal] text-[#5B6B7A]"
            >
              عرض كل الدروس
              <ArrowLeft className="h-3 w-3" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {newestLessons?.map(lesson => (
              <motion.button
                key={lesson?.id}
                type="button"
                whileHover={{ y: -3 }}
                onClick={() => handleQuickPreview(lesson ?? null)}
                className="group text-right rounded-[14px] bg-white border border-[#D9E2EC] overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
                    crossOrigin="anonymous"
                    alt={lesson?.title ?? ''}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-[Tajawal] text-white">
                    {lesson?.accessLevel === 'free' ? 'درس مجاني' : 'درس مميز'}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <p className="font-[Tajawal] text-sm text-[#0B1B2B] line-clamp-2">
                    {lesson?.title ?? ''}
                  </p>
                  <p className="text-[11px] text-[#5B6B7A]">
                    {lesson?.durationMinutes ?? 0} دقيقة •{' '}
                    {subjects?.find(s => s?.id === lesson?.subjectId)?.nameAr ?? ''}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-[10px] font-semibold tracking-[0.28em] text-[#19B5A5]">
                      مشاهدة سريعة
                    </span>
                    <BookOpen className="h-4 w-4 text-[#0B1B2B]" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-start">
          <div className="rounded-[14px] bg-white border border-[#D9E2EC] p-6 space-y-4">
            <h2 className="font-[Cairo] text-xl text-[#0B1B2B] text-right">كيف تعمل منصة تفوّق؟</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                'اختر مستواك وموادك المفضلة',
                'تابع الشروحات والفيديوهات التفاعلية',
                'اختبر نفسك وتتبع تقدمك لحظة بلحظة',
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-md bg-[#F5F7FA] px-4 py-4 text-right flex flex-col gap-2"
                >
                  <span className="text-xs font-semibold tracking-[0.28em] text-[#19B5A5]">
                    خطوة {index + 1}
                  </span>
                  <p className="font-[Tajawal] text-sm text-[#0B1B2B] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[14px] bg-white border border-[#D9E2EC] p-6 space-y-4">
            <h3 className="font-[Cairo] text-lg text-[#0B1B2B] text-right">خطط الاشتراك</h3>
            <div className="space-y-3">
              {plans?.slice(0, 2)?.map(plan => (
                <div
                  key={plan?.id}
                  className="flex flex-row-reverse items-center justify-between rounded-md bg-[#F5F7FA] px-4 py-3"
                >
                  <div className="text-right">
                    <p className="font-[Tajawal] text-sm text-[#0B1B2B]">
                      {plan?.name ?? ''}
                    </p>
                    <p className="text-[11px] text-[#5B6B7A]">
                      ابتداءً من {plan?.priceMonthly ?? 0} {plan?.currency ?? 'MAD'} / شهر
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-[#19B5A5] px-3 py-1.5 text-[11px] font-semibold text-black tracking-[0.18em]"
                  >
                    اختر الخطة
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.3fr,1fr] items-start">
          <div className="rounded-[14px] bg-white border border-[#D9E2EC] p-6 space-y-4">
            <h2 className="font-[Cairo] text-xl text-[#0B1B2B] text-right">الأسئلة المتكررة</h2>
            <div className="space-y-3">
              {[
                'هل الدروس مطابقة للمنهاج المغربي الرسمي؟',
                'هل يمكنني تجربة المنصة مجاناً قبل الاشتراك؟',
                'هل المحتوى مناسب لجميع المستويات؟',
              ].map((q, idx) => (
                <details
                  key={q}
                  className="rounded-md border border-[#D9E2EC] bg-[#F5F7FA]"
                >
                  <summary className="cursor-pointer px-4 py-3 text-right font-[Tajawal] text-sm text-[#0B1B2B] flex flex-row-reverse items-center justify-between">
                    {q}
                    <span className="ml-2 text-xs text-[#5B6B7A]">{idx === 0 ? 'مهم' : ''}</span>
                  </summary>
                  <div className="px-4 pb-4 text-right text-[13px] font-[Tajawal] text-[#5B6B7A] leading-relaxed">
                    نعم، يتم إعداد جميع الدروس والتمارين بعناية من طرف أساتذة مغاربة
                    معتمدين وبحسب الإطار المرجعي الرسمي.
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div className="rounded-[14px] bg-[#0B1B2B] text-white p-6 space-y-4">
            <h3 className="font-[Cairo] text-lg text-right">ابقَ على اطلاع</h3>
            <p className="text-[13px] font-[Tajawal] text-[#D9E2EC] text-right leading-relaxed">
              اشترك في نشرتنا لتتوصل بآخر الدروس، الفروض المحروسة، وتنبيهات الفروض الموحدة.
            </p>
            <form
              className="space-y-3"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="flex flex-row-reverse gap-2">
                <input
                  type="email"
                  required
                  placeholder="بريدك الإلكتروني"
                  className="h-10 flex-1 rounded-md border border-white/20 bg-transparent px-3 text-right text-xs font-[Tajawal] placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#19B5A5]"
                />
                <button
                  type="submit"
                  className="h-10 rounded-md bg-[#19B5A5] px-4 text-[11px] font-semibold text-black tracking-[0.18em]"
                >
                  اشترك
                </button>
              </div>
              <p className="text-[10px] text-[#D9E2EC] font-[Tajawal] text-right">
                لن نشارك بريدك مع أي جهة أخرى. يمكنك إلغاء الاشتراك متى شئت.
              </p>
            </form>
          </div>
        </section>
      </main>
      <LessonDetailModal
        lesson={previewLesson}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onOpenFullLesson={handleOpenPreview}
      />
    </div>
  );
}

export default Home;