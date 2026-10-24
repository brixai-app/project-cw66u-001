import {
  GradeLevel,
  GradeLevelId,
  Subject,
  SubjectId,
  Unit,
  Lesson,
  Quiz,
  Question,
  SubscriptionPlan,
  Notification,
  LessonProgress,
  FavoriteItem,
  PaginatedResult,
} from '@/types';

export const gradeLevels: GradeLevel[] = [
  { id: 'g1', nameAr: 'الأولى ابتدائي', nameFr: '1ère Année Primaire', cycle: 'primary', order: 1 },
  { id: 'g6', nameAr: 'السادسة ابتدائي', nameFr: '6ème Année Primaire', cycle: 'primary', order: 6 },
  { id: 'g9', nameAr: 'الثالثة إعدادي', nameFr: '3ème Année Collège', cycle: 'middle', order: 9 },
  { id: 'g12', nameAr: 'الثانية بكالوريا', nameFr: '2ème Année Bac', cycle: 'secondary', order: 12 },
];

export const subjects: Subject[] = [
  { id: 'math', nameAr: 'الرياضيات', nameFr: 'Mathématiques', color: '#19B5A5', iconKey: 'math' },
  { id: 'physics', nameAr: 'الفيزياء', nameFr: 'Physique', color: '#1262D6', iconKey: 'physics' },
  { id: 'arabic', nameAr: 'اللغة العربية', nameFr: 'Arabe', color: '#F2994A', iconKey: 'arabic' },
  { id: 'french', nameAr: 'اللغة الفرنسية', nameFr: 'Français', color: '#2D9CDB', iconKey: 'french' },
  { id: 'english', nameAr: 'اللغة الإنجليزية', nameFr: 'Anglais', color: '#9B51E0', iconKey: 'english' },
];

export const units: Unit[] = [
  {
    id: 'u-g9-math-1',
    gradeId: 'g9',
    subjectId: 'math',
    titleAr: 'الدوال العددية',
    titleFr: 'Fonctions numériques',
    order: 1,
  },
  {
    id: 'u-g9-physics-1',
    gradeId: 'g9',
    subjectId: 'physics',
    titleAr: 'التحريك',
    titleFr: 'Cinématique',
    order: 1,
  },
  {
    id: 'u-g12-math-1',
    gradeId: 'g12',
    subjectId: 'math',
    titleAr: 'الاحتمالات',
    titleFr: 'Probabilités',
    order: 1,
  },
];

export const lessons: Lesson[] = [
  {
    id: 'l-g9-math-1',
    unitId: 'u-g9-math-1',
    gradeId: 'g9',
    subjectId: 'math',
    title: 'مفهوم الدالة وتمثيلها البياني',
    description: 'مراجعة شاملة لمفهوم الدالة العددية وكيفية تمثيلها بيانياً مع أمثلة مغربية.',
    durationMinutes: 25,
    accessLevel: 'free',
    videoUrl: 'https://videos.pexels.com/video1',
    contentUrl: 'https://docs.example.com/lesson1',
    quizId: 'q-l-g9-math-1',
  },
  {
    id: 'l-g9-math-2',
    unitId: 'u-g9-math-1',
    gradeId: 'g9',
    subjectId: 'math',
    title: 'الدالة الخطية والتناسبية',
    description: 'تمييز بين الدالة الخطية والتناسبية مع تمارين تفاعلية.',
    durationMinutes: 30,
    accessLevel: 'premium',
    videoUrl: 'https://videos.pexels.com/video2',
    contentUrl: 'https://docs.example.com/lesson2',
    quizId: 'q-l-g9-math-2',
  },
  {
    id: 'l-g9-physics-1',
    unitId: 'u-g9-physics-1',
    gradeId: 'g9',
    subjectId: 'physics',
    title: 'الحركة المستقيمة المنتظمة',
    description: 'تعلم كيفية وصف حركة جسم في خط مستقيم بسرعة ثابتة.',
    durationMinutes: 20,
    accessLevel: 'free',
    videoUrl: 'https://videos.pexels.com/video3',
    contentUrl: 'https://docs.example.com/lesson3',
    quizId: 'q-l-g9-physics-1',
  },
  {
    id: 'l-g12-math-1',
    unitId: 'u-g12-math-1',
    gradeId: 'g12',
    subjectId: 'math',
    title: 'المتغيرات العشوائية المنفصلة',
    description: 'مقدمة عملية في المتغيرات العشوائية وجداول التوزيع.',
    durationMinutes: 35,
    accessLevel: 'premium',
    videoUrl: 'https://videos.pexels.com/video4',
    contentUrl: 'https://docs.example.com/lesson4',
    quizId: 'q-l-g12-math-1',
  },
];

const baseQuestions: Question[] = [
  {
    id: 'q1',
    type: 'single_choice',
    text: 'ما هو تعريف الدالة؟',
    explanation: 'الدالة هي علاقة تربط كل عنصر من مجموعة الانطلاق بعنصر وحيد من مجموعة الوصول.',
    points: 2,
    options: [
      { id: 'q1o1', text: 'علاقة تربط عددين فقط', isCorrect: false },
      { id: 'q1o2', text: 'علاقة بين مجموعتين حيث كل عنصر يقابل عنصراً واحداً', isCorrect: true },
      { id: 'q1o3', text: 'متتالية عددية خاصة', isCorrect: false },
    ],
  },
  {
    id: 'q2',
    type: 'true_false',
    text: 'كل دالة خطية هي دالة تناسبية.',
    explanation: 'ليست كل دالة خطية تناسبية لأن الدالة التناسبية يجب أن تمر من أصل المعلم.',
    points: 2,
    options: [
      { id: 'q2o1', text: 'صحيح', isCorrect: false },
      { id: 'q2o2', text: 'خطأ', isCorrect: true },
    ],
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'q-l-g9-math-1',
    lessonId: 'l-g9-math-1',
    title: 'اختبار قصير: مفهوم الدالة',
    durationMinutes: 10,
    questions: baseQuestions,
    maxScore: baseQuestions.reduce((s, q) => s + (q?.points ?? 0), 0),
  },
  {
    id: 'q-l-g9-math-2',
    lessonId: 'l-g9-math-2',
    title: 'اختبار: الدالة الخطية',
    durationMinutes: 12,
    questions: baseQuestions,
    maxScore: baseQuestions.reduce((s, q) => s + (q?.points ?? 0), 0),
  },
  {
    id: 'q-l-g9-physics-1',
    lessonId: 'l-g9-physics-1',
    title: 'اختبار: الحركة المستقيمة',
    durationMinutes: 8,
    questions: baseQuestions,
    maxScore: baseQuestions.reduce((s, q) => s + (q?.points ?? 0), 0),
  },
  {
    id: 'q-l-g12-math-1',
    lessonId: 'l-g12-math-1',
    title: 'اختبار: المتغيرات العشوائية',
    durationMinutes: 15,
    questions: baseQuestions,
    maxScore: baseQuestions.reduce((s, q) => s + (q?.points ?? 0), 0),
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'خطة البداية',
    description: 'وصول إلى الدروس المجانية واختبارات تجريبية.',
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'MAD',
    isPopular: false,
    features: ['دروس مجانية مختارة', 'اختبارات سريعة', 'لوحة تقدم أساسية'],
  },
  {
    id: 'plus',
    name: 'تفوق بلس',
    description: 'أفضل خيار لمعظم التلاميذ للتحضير للامتحانات.',
    priceMonthly: 79,
    priceYearly: 790,
    currency: 'MAD',
    isPopular: true,
    features: ['وصول لجميع الدروس', 'اختبارات شاملة', 'متابعة تقدم مفصلة', 'تحميل الملخصات PDF'],
  },
  {
    id: 'family',
    name: 'خطة العائلة',
    description: 'حسابات متعددة بسعر مميز لأفراد الأسرة.',
    priceMonthly: 149,
    priceYearly: 1490,
    currency: 'MAD',
    isPopular: false,
    features: ['حتى 4 حسابات', 'لوحة ولي الأمر', 'دعم أولوية عبر البريد'],
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u-student-1',
    type: 'progress',
    title: 'أحسنت! أنهيت 3 دروس هذا الأسبوع',
    message: 'استمر على نفس الوتيرة للوصول إلى هدفك قبل الامتحان الجهوي.',
    status: 'unread',
    createdAt: new Date().toISOString(),
    readAt: null,
    metadata: { completedLessons: 3 },
  },
  {
    id: 'n2',
    userId: 'u-student-1',
    type: 'system',
    title: 'تحديث جديد في مادة الرياضيات',
    message: 'تمت إضافة وحدة جديدة حول الاحتمالات لثانية بكالوريا.',
    status: 'read',
    createdAt: new Date().toISOString(),
    readAt: new Date().toISOString(),
    metadata: { subjectId: 'math' },
  },
];

export const lessonProgress: LessonProgress[] = [
  {
    id: 'p1',
    userId: 'u-student-1',
    lessonId: 'l-g9-math-1',
    completed: true,
    completedAt: new Date().toISOString(),
    quizScore: 8,
    lastPositionSeconds: 900,
  },
  {
    id: 'p2',
    userId: 'u-student-1',
    lessonId: 'l-g9-math-2',
    completed: false,
    completedAt: null,
    quizScore: null,
    lastPositionSeconds: 120,
  },
];

export const favorites: FavoriteItem[] = [
  {
    id: 'f1',
    userId: 'u-student-1',
    lessonId: 'l-g9-math-1',
    createdAt: new Date().toISOString(),
  },
];

export function getGradeById(id: GradeLevelId): GradeLevel | undefined {
  return gradeLevels?.find((g) => g?.id === id);
}

export function getSubjectById(id: SubjectId): Subject | undefined {
  return subjects?.find((s) => s?.id === id);
}

export function getUnitsByGradeAndSubject(gradeId: GradeLevelId, subjectId: SubjectId): Unit[] {
  return units?.filter((u) => u?.gradeId === gradeId && u?.subjectId === subjectId) ?? [];
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons?.filter((l) => l?.unitId === unitId) ?? [];
}

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return quizzes?.find((q) => q?.lessonId === lessonId);
}

export function getNotificationsForUser(userId: string): Notification[] {
  return notifications?.filter((n) => n?.userId === userId) ?? [];
}

export function getPaginatedLessons(
  page: number,
  pageSize: number,
): PaginatedResult<Lesson> {
  const start = (page - 1) * pageSize;
  const items = lessons?.slice(start, start + pageSize) ?? [];
  return { items, total: lessons?.length ?? 0, page, pageSize };
}

export const mockData = {
  gradeLevels,
  subjects,
  units,
  lessons,
  quizzes,
  subscriptionPlans,
  notifications,
  lessonProgress,
  favorites,
  getGradeById,
  getSubjectById,
  getUnitsByGradeAndSubject,
  getLessonsByUnit,
  getQuizByLessonId,
  getNotificationsForUser,
  getPaginatedLessons,
};

export default mockData;
export const items = (mockData as any)?.items ?? (mockData as any)?.products ?? [];
