export type UserRole = 'student' | 'teacher' | 'admin';

export type SubscriptionStatus = 'inactive' | 'trialing' | 'active' | 'past_due' | 'canceled';

export type LessonAccessLevel = 'free' | 'premium' | 'locked';

export type NotificationType = 'system' | 'progress' | 'payment' | 'message';

export type NotificationStatus = 'unread' | 'read' | 'archived';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type SchoolCycle =
  | 'primary'
  | 'middle'
  | 'secondary';

export type GradeLevelId =
  | 'g1'
  | 'g2'
  | 'g3'
  | 'g4'
  | 'g5'
  | 'g6'
  | 'g7'
  | 'g8'
  | 'g9'
  | 'g10'
  | 'g11'
  | 'g12';

export interface GradeLevel {
  id: GradeLevelId;
  nameAr: string;
  nameFr: string;
  cycle: SchoolCycle;
  order: number;
}

export type SubjectId =
  | 'math'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'arabic'
  | 'french'
  | 'english'
  | 'history_geo'
  | 'philosophy'
  | 'islamic';

export interface Subject {
  id: SubjectId;
  nameAr: string;
  nameFr: string;
  color?: string | null;
  iconKey?: string | null;
}

export interface Unit {
  id: string;
  gradeId: GradeLevelId;
  subjectId: SubjectId;
  titleAr: string;
  titleFr?: string | null;
  order: number;
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  explanation?: string | null;
  options: QuestionOption[];
  points: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  maxScore: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  gradeId: GradeLevelId;
  subjectId: SubjectId;
  title: string;
  description?: string | null;
  durationMinutes: number;
  accessLevel: LessonAccessLevel;
  videoUrl?: string | null;
  contentUrl?: string | null;
  quizId?: string | null;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  gradeId?: GradeLevelId | null;
  subjectsTeaching?: SubjectId[] | null;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string | null;
  priceMonthly: number;
  priceYearly?: number | null;
  currency: 'MAD';
  isPopular?: boolean | null;
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startedAt: string;
  endsAt?: string | null;
  cancelAtPeriodEnd?: boolean | null;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  createdAt: string;
  readAt?: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt?: string | null;
  assignedToId?: string | null;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string | null;
  quizScore?: number | null;
  lastPositionSeconds?: number | null;
}

export interface FavoriteItem {
  id: string;
  userId: string;
  lessonId: string;
  createdAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type WithId<T> = T & { id: string };

export type EntityMap<T extends { id: string }> = Record<string, T>;

export type DomainTypes = {
  UserRole: UserRole;
  SchoolCycle: SchoolCycle;
  GradeLevel: GradeLevel;
  Subject: Subject;
  Unit: Unit;
  Lesson: Lesson;
  Quiz: Quiz;
  Question: Question;
  Subscription: Subscription;
  SubscriptionPlan: SubscriptionPlan;
  Notification: Notification;
  SupportTicket: SupportTicket;
  LessonProgress: LessonProgress;
  FavoriteItem: FavoriteItem;
};

export default DomainTypes;