import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserQuery } from '@/entities/user';
import { LoginPage } from '@/pages/login';
import { RoundsListPage } from '@/pages/rounds-list';
import { RoundDetailPage } from '@/pages/round-detail';
import { ROUTES } from '@/shared/config';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, isLoading } = useUserQuery();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return <>{children}</>;
};

export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.ROUNDS}
          element={
            <ProtectedRoute>
              <RoundsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ROUND}
          element={
            <ProtectedRoute>
              <RoundDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};