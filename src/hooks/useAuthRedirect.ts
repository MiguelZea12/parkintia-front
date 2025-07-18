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
  const redirectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpiar timeout previo si existe
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
    }

    // Solo proceder si no estamos cargando y necesitamos verificar auth
    if (!checkAuth || isLoading || hasRedirected.current) {
      return;
    }

    // Verificar si necesitamos redirigir
    const shouldRedirect = !isAuthenticated;

    if (shouldRedirect) {
      hasRedirected.current = true;
      
      // Usar un pequeño delay para evitar problemas de hidratación
      redirectTimeout.current = setTimeout(() => {
        router.push(redirectTo);
      }, 100);
    }

    // Cleanup
    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
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
  const redirectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpiar timeout previo si existe
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
    }

    // Solo proceder si no estamos cargando
    if (isLoading || hasRedirected.current) {
      return;
    }

    // Si el usuario está autenticado, redirigir al dashboard
    if (isAuthenticated) {
      hasRedirected.current = true;
      
      // Usar un pequeño delay para evitar problemas de hidratación
      redirectTimeout.current = setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    }

    // Cleanup
    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, [isAuthenticated, isLoading, router]);

  return {
    isLoading,
    isAuthenticated,
    shouldRender: !isLoading && !isAuthenticated
  };
};