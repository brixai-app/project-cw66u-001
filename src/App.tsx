import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider, useAppContext } from '@/context/AppContext';
import AppLayout from '@/components/AppLayout';
import Home from '@/pages/Home';

function StudentDashboard() {
  return (
    <div className="px-4 py-6">
      <h1 className="font-[Cairo] text-2xl font-semibold text-[#0B1B2B]">
        لوحة الطالب
      </h1>
      <p className="mt-2 font-[Tajawal] text-sm text-[#5B6B7A]">
        سيتم إضافة محتوى لوحة الطالب قريباً.
      </p>
    </div>
  );
}

function TeacherDashboard() {
  return (
    <div className="px-4 py-6">
      <h1 className="font-[Cairo] text-2xl font-semibold text-[#0B1B2B]">
        لوحة الأستاذ
      </h1>
      <p className="mt-2 font-[Tajawal] text-sm text-[#5B6B7A]">
        سيتم إضافة أدوات إدارة الدروس قريباً.
      </p>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="px-4 py-6">
      <h1 className="font-[Cairo] text-2xl font-semibold text-[#0B1B2B]">
        لوحة الإدارة
      </h1>
      <p className="mt-2 font-[Tajawal] text-sm text-[#5B6B7A]">
        سيتم إضافة أدوات الإشراف والتقارير قريباً.
      </p>
    </div>
  );
}

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'admin')[];
}

export function ProtectedRoute({
  children = null,
  allowedRoles = ['student', 'teacher', 'admin'],
}: ProtectedRouteProps) {
  const { user, role, isLoading } = useAppContext();
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#19B5A5] border-t-transparent" />
      </div>
    );
  }
  if (!user || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export function App() {
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  }, []);
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-white text-[#0B1B2B]">
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher"
                element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </div>
        <Toaster
          position="top-center"
          richColors
          dir="rtl"
          toastOptions={{
            classNames: {
              toast:
                'font-[Tajawal] text-sm rounded-[14px] shadow-md border border-[#D9E2EC] bg-white',
              title: 'font-[Cairo] text-sm text-[#0B1B2B]',
              description: 'text-xs text-[#5B6B7A]',
            },
          }}
        />
      </HashRouter>
    </AppProvider>
  );
}

export default App;