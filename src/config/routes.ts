/**
 * Configuración centralizada de rutas de la aplicación
 * Esto permite mantener todas las URLs en un solo lugar y facilita el mantenimiento
 */

// Rutas públicas (no requieren autenticación)
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  AUTH: '/auth',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  ABOUT: '/about'
} as const;

// Rutas protegidas (requieren autenticación)
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PARKING: {
    ROOT: '/parking',
    SEARCH: '/parking/search',
    RESERVATIONS: '/parking/reservations',
    HISTORY: '/parking/history',
    FAVORITES: '/parking/favorites'
  },
  ADMIN: {
    ROOT: '/admin',
    USERS: '/admin/users',
    PARKING_LOTS: '/admin/parking-lots',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings'
  }
} as const;

// Rutas de API
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    UPLOAD_AVATAR: '/users/avatar'
  },
  PARKING: {
    SEARCH: '/parking/search',
    RESERVATIONS: '/parking/reservations',
    RESERVE: '/parking/reserve',
    CANCEL: '/parking/cancel',
    HISTORY: '/parking/history'
  }
} as const;

// Todas las rutas combinadas para facilidad de uso
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES
} as const;

// Utilidades para trabajar con rutas
export const RouteUtils = {
  /**
   * Verifica si una ruta es pública
   */
  isPublicRoute: (path: string): boolean => {
    const publicPaths = Object.values(PUBLIC_ROUTES);
    return publicPaths.includes(path as any);
  },

  /**
   * Verifica si una ruta es protegida
   */
  isProtectedRoute: (path: string): boolean => {
    // Función recursiva para verificar rutas anidadas
    const checkNested = (obj: any): boolean => {
      for (const value of Object.values(obj)) {
        if (typeof value === 'string') {
          if (path.startsWith(value)) return true;
        } else if (typeof value === 'object') {
          if (checkNested(value)) return true;
        }
      }
      return false;
    };

    return checkNested(PROTECTED_ROUTES);
  },

  /**
   * Obtiene la ruta de redirección por defecto después del login
   */
  getDefaultRedirectAfterLogin: (): string => {
    return PROTECTED_ROUTES.DASHBOARD;
  },

  /**
   * Obtiene la ruta de redirección por defecto después del logout
   */
  getDefaultRedirectAfterLogout: (): string => {
    return PUBLIC_ROUTES.LOGIN;
  },

  /**
   * Construye URL con parámetros de query
   */
  buildUrl: (path: string, params?: Record<string, string | number>): string => {
    if (!params) return path;
    
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    
    return `${path}?${searchParams.toString()}`;
  },

  /**
   * Obtiene la URL completa de la API
   */
  getApiUrl: (endpoint: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    return `${baseUrl}${endpoint}`;
  }
};

// Tipos TypeScript para las rutas
export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES];
export type ProtectedRoute = typeof PROTECTED_ROUTES[keyof typeof PROTECTED_ROUTES] | 
  typeof PROTECTED_ROUTES.PARKING[keyof typeof PROTECTED_ROUTES.PARKING] |
  typeof PROTECTED_ROUTES.ADMIN[keyof typeof PROTECTED_ROUTES.ADMIN];
export type ApiRoute = string;
export type AppRoute = PublicRoute | ProtectedRoute;
