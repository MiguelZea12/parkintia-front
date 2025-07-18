'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, RouteUtils } from '@/config/routes';

/**
 * Hook personalizado para navegación con rutas tipadas
 * Proporciona métodos convenientes para navegar entre rutas
 */
export const useNavigation = () => {
  const router = useRouter();

  // Navegación a rutas públicas
  const goToLogin = useCallback(() => {
    router.push(PUBLIC_ROUTES.LOGIN);
  }, [router]);

  const goToRegister = useCallback(() => {
    router.push(PUBLIC_ROUTES.REGISTER);
  }, [router]);

  const goToHome = useCallback(() => {
    router.push(PUBLIC_ROUTES.HOME);
  }, [router]);

  const goToAuth = useCallback(() => {
    router.push(PUBLIC_ROUTES.AUTH);
  }, [router]);

  // Navegación a rutas protegidas
  const goToDashboard = useCallback(() => {
    router.push(PROTECTED_ROUTES.DASHBOARD);
  }, [router]);

  const goToProfile = useCallback(() => {
    router.push(PROTECTED_ROUTES.PROFILE);
  }, [router]);

  const goToSettings = useCallback(() => {
    router.push(PROTECTED_ROUTES.SETTINGS);
  }, [router]);

  // Navegación con parámetros
  const navigateTo = useCallback((path: string, params?: Record<string, string | number>) => {
    const url = RouteUtils.buildUrl(path, params);
    router.push(url);
  }, [router]);

  // Navegación con replace (no agrega al historial)
  const replaceTo = useCallback((path: string, params?: Record<string, string | number>) => {
    const url = RouteUtils.buildUrl(path, params);
    router.replace(url);
  }, [router]);

  // Navegación hacia atrás
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  // Navegación hacia adelante
  const goForward = useCallback(() => {
    router.forward();
  }, [router]);

  // Recargar página actual
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  // Verificar si una ruta es accesible (públicas siempre, protegidas solo si está autenticado)
  const canNavigateTo = useCallback((path: string, isAuthenticated: boolean): boolean => {
    if (RouteUtils.isPublicRoute(path)) {
      return true;
    }
    if (RouteUtils.isProtectedRoute(path)) {
      return isAuthenticated;
    }
    return false;
  }, []);

  return {
    // Métodos de navegación específicos
    goToLogin,
    goToRegister,
    goToHome,
    goToAuth,
    goToDashboard,
    goToProfile,
    goToSettings,
    
    // Métodos de navegación genéricos
    navigateTo,
    replaceTo,
    goBack,
    goForward,
    refresh,
    
    // Utilidades
    canNavigateTo,
    
    // Rutas constantes para uso directo
    routes: {
      public: PUBLIC_ROUTES,
      protected: PROTECTED_ROUTES
    }
  };
};
