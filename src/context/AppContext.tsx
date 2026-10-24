import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { toast } from 'sonner';
import {
  UserRole,
  SubscriptionStatus,
  LessonProgress,
  FavoriteItem,
  Notification,
  Lesson,
} from '@/types';
import {
  lessons,
  favorites as mockFavorites,
  lessonProgress as mockProgress,
  notifications as mockNotifications,
} from '@/data/mockData';
import { supabaseClient, getCurrentSession, getCurrentUser, signOutSafely } from '@/lib/supabaseClient';

export interface AppUser {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
}

export interface AppContextState {
  user: AppUser | null;
  role: UserRole | null;
  subscriptionStatus: SubscriptionStatus;
  favorites: FavoriteItem[];
  progress: LessonProgress[];
  notifications: Notification[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (lessonId: string) => void;
  completeLesson: (lessonId: string, quizScore?: number | null) => void;
  simulateUpgrade: () => void;
  markNotificationRead: (id: string) => void;
  hasAccessToLesson: (lesson: Lesson | null | undefined) => boolean;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole | null>('student');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('inactive');
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites ?? []);
  const [progress, setProgress] = useState<LessonProgress[]>(mockProgress ?? []);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications ?? []);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await getCurrentSession();
        const currentUser = await getCurrentUser();
        if (session && currentUser) {
          const mappedUser: AppUser = {
            id: currentUser.id ?? 'unknown',
            role: (currentUser.user_metadata?.role as UserRole) ?? 'student',
            fullName: (currentUser.user_metadata?.fullName as string) ?? currentUser.email ?? 'مستخدم',
            email: currentUser.email ?? '',
          };
          setUser(mappedUser);
          setRole(mappedUser.role);
          setSubscriptionStatus('active');
        } else {
          const demoUser: AppUser = {
            id: 'demo-user',
            role: 'student',
            fullName: 'طالب تجريبي',
            email: 'demo@student.tafaouq.ma',
          };
          setUser(demoUser);
          setRole(demoUser.role);
          setSubscriptionStatus('trialing');
        }
      } catch (error) {
        toast.error('تعذر تحميل الجلسة، تم الدخول بحساب تجريبي');
        const fallbackUser: AppUser = {
          id: 'fallback-user',
          role: 'student',
          fullName: 'طالب تجريبي',
          email: 'fallback@student.tafaouq.ma',
        };
        setUser(fallbackUser);
        setRole(fallbackUser.role);
        setSubscriptionStatus('trialing');
      } finally {
        setIsLoading(false);
      }
    };
    void initAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error ?? !data?.user) {
          const demoUser: AppUser = {
            id: 'mock-login-user',
            role: 'student',
            fullName: 'طالب تجريبي',
            email,
          };
          setUser(demoUser);
          setRole(demoUser.role);
          setSubscriptionStatus('trialing');
          toast.success('تم تسجيل الدخول التجريبي بنجاح');
          return;
        }
        const mappedUser: AppUser = {
          id: data.user.id,
          role: (data.user.user_metadata?.role as UserRole) ?? 'student',
          fullName: (data.user.user_metadata?.fullName as string) ?? data.user.email ?? 'مستخدم',
          email: data.user.email ?? email,
        };
        setUser(mappedUser);
        setRole(mappedUser.role);
        setSubscriptionStatus('active');
        toast.success('تم تسجيل الدخول بنجاح');
      } catch {
        toast.error('فشل تسجيل الدخول، تم استخدام وضع تجريبي');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signup = useCallback(
    async (fullName: string, email: string, password: string, roleOverride?: UserRole) => {
      setIsLoading(true);
      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: { data: { fullName, role: roleOverride ?? 'student' } },
        });
        if (error ?? !data?.user) {
          const demoUser: AppUser = {
            id: 'mock-signup-user',
            role: roleOverride ?? 'student',
            fullName,
            email,
          };
          setUser(demoUser);
          setRole(demoUser.role);
          setSubscriptionStatus('trialing');
          toast.success('تم إنشاء حساب تجريبي بنجاح');
          return;
        }
        const mappedUser: AppUser = {
          id: data.user.id,
          role: (roleOverride ?? 'student') as UserRole,
          fullName,
          email: data.user.email ?? email,
        };
        setUser(mappedUser);
        setRole(mappedUser.role);
        setSubscriptionStatus('trialing');
        toast.success('تم إنشاء الحساب، يرجى تأكيد البريد الإلكتروني');
      } catch {
        toast.error('تعذر إنشاء الحساب، تم الانتقال لوضع تجريبي');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOutSafely();
    } finally {
      setUser(null);
      setRole(null);
      setSubscriptionStatus('inactive');
      toast.success('تم تسجيل الخروج');
      setIsLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(
    (lessonId: string) => {
      if (!user?.id) {
        toast.error('يرجى تسجيل الدخول لحفظ الدروس في المفضلة');
        return;
      }
      setFavorites(prev => {
        const existing = prev?.find(f => f.lessonId === lessonId && f.userId === user.id);
        if (existing) {
          toast.info('تمت إزالة الدرس من المفضلة');
          return prev?.filter(f => f.id !== existing.id) ?? [];
        }
        const newItem: FavoriteItem = {
          id: crypto.randomUUID(),
          userId: user.id,
          lessonId,
          createdAt: new Date().toISOString(),
        };
        toast.success('تمت إضافة الدرس إلى المفضلة');
        return [...(prev ?? []), newItem];
      });
    },
    [user?.id]
  );

  const completeLesson = useCallback(
    (lessonId: string, quizScore?: number | null) => {
      if (!user?.id) {
        toast.error('سجل الدخول لتتبع تقدمك');
        return;
      }
      setProgress(prev => {
        const existing = prev?.find(p => p.lessonId === lessonId && p.userId === user.id);
        const now = new Date().toISOString();
        if (existing) {
          const updated: LessonProgress = {
            ...existing,
            completed: true,
            completedAt: now,
            quizScore: quizScore ?? existing.quizScore ?? null,
          };
          toast.success('تم تحديث تقدم الدرس');
          return prev?.map(p => (p.id === existing.id ? updated : p)) ?? [updated];
        }
        const newProgress: LessonProgress = {
          id: crypto.randomUUID(),
          userId: user.id,
          lessonId,
          completed: true,
          completedAt: now,
          quizScore: quizScore ?? null,
          lastPositionSeconds: null,
        };
        toast.success('تهانينا! أنهيت الدرس');
        return [...(prev ?? []), newProgress];
      });
    },
    [user?.id]
  );

  const simulateUpgrade = useCallback(() => {
    setSubscriptionStatus(prev => {
      const next: SubscriptionStatus = prev === 'active' ? 'canceled' : 'active';
      if (next === 'active') {
        toast.success('تم تفعيل الاشتراك بنجاح');
      } else {
        toast.warning('تم إلغاء الاشتراك في نهاية الفترة');
      }
      return next;
    });
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev?.map(n =>
        n.id === id
          ? {
              ...n,
              status: 'read',
              readAt: n.readAt ?? new Date().toISOString(),
            }
          : n
      );
      return updated ?? [];
    });
  }, []);

  const hasAccessToLesson = useCallback(
    (lesson: Lesson | null | undefined) => {
      if (!lesson) return false;
      if (lesson.accessLevel === 'free') return true;
      if (lesson.accessLevel === 'locked') return false;
      if (role === 'admin' || role === 'teacher') return true;
      return subscriptionStatus === 'active' || subscriptionStatus === 'trialing';
    },
    [role, subscriptionStatus]
  );

  const value = useMemo<AppContextState>(
    () => ({
      user,
      role,
      subscriptionStatus,
      favorites,
      progress,
      notifications,
      isLoading,
      login,
      signup,
      logout,
      toggleFavorite,
      completeLesson,
      simulateUpgrade,
      markNotificationRead,
      hasAccessToLesson,
    }),
    [
      user,
      role,
      subscriptionStatus,
      favorites,
      progress,
      notifications,
      isLoading,
      login,
      signup,
      logout,
      toggleFavorite,
      completeLesson,
      simulateUpgrade,
      markNotificationRead,
      hasAccessToLesson,
    ]
  );

  return <AppContext.Provider value={value}>{children ?? null}</AppContext.Provider>;
};

export const useAppContext = (): AppContextState => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
};

export default AppContext;
export { AppContext };
