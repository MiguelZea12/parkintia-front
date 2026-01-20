'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface UseAuthRedirectOptions {
  redirectTo: string;
  checkAuth?: boolean;
}

export const useAuthRedirect = ({ redirectTo, checkAuth = true }: UseAuthRedirectOptions) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Solo proceder si no estamos cargando y necesitamos verificar auth
    if (!checkAuth || isLoading || hasRedirected.current) {
      return;
    }

    // Verificar si necesitamos redirigir
    const shouldRedirect = !isAuthenticated;

    if (shouldRedirect) {
      hasRedirected.current = true;
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, checkAuth, router]);

  return {
    isLoading,
    isAuthenticated,
    shouldRender: !isLoading && (isAuthenticated || !checkAuth)
  };
};

// Hook para rutas protegidas (usuarios deben estar autenticados)
export const useProtectedRoute = () => {
  return useAuthRedirect({ 
    redirectTo: '/login', 
    checkAuth: true 
  });
};

// Hook para rutas de autenticación (usuarios autenticados son redirigidos)
export const useAuthRoute = (DASHBOARD: string) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const hasRedirected = useRef(false);
  const prevAuthenticated = useRef(isAuthenticated);

  useEffect(() => {
    // Si el estado de autenticación cambió de false a true, resetear hasRedirected
    if (prevAuthenticated.current === false && isAuthenticated === true) {
      hasRedirected.current = false;
    }
    prevAuthenticated.current = isAuthenticated;

    // Solo proceder si no estamos cargando y no hemos redirigido ya
    if (isLoading || hasRedirected.current) {
      return;
    }

    // Si el usuario está autenticado, redirigir al dashboard inmediatamente
    if (isAuthenticated) {
      hasRedirected.current = true;
      router.push(DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router, DASHBOARD]);

  return {
    isLoading,
    isAuthenticated,
    shouldRender: !isLoading && !isAuthenticated
  };
};