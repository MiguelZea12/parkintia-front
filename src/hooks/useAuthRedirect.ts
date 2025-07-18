'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RouteUtils as _RouteUtils, PUBLIC_ROUTES, PROTECTED_ROUTES } from '@/config/routes';

interface UseAuthRedirectOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  redirectIfUnauthenticated?: boolean;
}

export const useAuthRedirect = ({
  redirectTo = PUBLIC_ROUTES.HOME,
  redirectIfAuthenticated = false,
  redirectIfUnauthenticated = false
}: UseAuthRedirectOptions = {}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Esperar a que termine de cargar

    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(redirectTo);
    }

    if (redirectIfUnauthenticated && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, redirectIfAuthenticated, redirectIfUnauthenticated, router]);

  return { isAuthenticated, isLoading };
};

// Hook especializado para proteger rutas
export const useProtectedRoute = (redirectTo: string = PUBLIC_ROUTES.LOGIN) => {
  return useAuthRedirect({
    redirectTo,
    redirectIfUnauthenticated: true
  });
};

// Hook especializado para rutas de autenticación (login, register)
export const useAuthRoute = (redirectTo: string = PROTECTED_ROUTES.DASHBOARD) => {
  return useAuthRedirect({
    redirectTo,
    redirectIfAuthenticated: true
  });
};
