'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterCredentials, User, AuthError } from '@/types/auth';
import { authService } from '@/services/auth.service';

// Estado inicial
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null
};

// Actions para el reducer
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: AuthError }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: AuthError }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar si hay un token guardado al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      // Verificar si estamos en el cliente
      if (typeof window === 'undefined') return;
      
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Validar el token y obtener el usuario
          const user = await authService.validateToken(token);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          // No hay token, asegurarse de que el estado esté limpio
          dispatch({ type: 'SET_USER', payload: null });
        }
      } catch (error) {
        // Token inválido, remover del localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
        }
        dispatch({ type: 'SET_USER', payload: null });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []); // Solo ejecutar una vez al montar el componente

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await authService.login(credentials);
      
      // Guardar tokens en localStorage solo en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Error al iniciar sesión',
        code: error.code,
        field: error.field
      };
      dispatch({ type: 'LOGIN_FAILURE', payload: authError });
      throw authError;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'REGISTER_START' });
      const response = await authService.register(credentials);
      
      // Guardar tokens en localStorage solo en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.user });
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Error al registrar usuario',
        code: error.code,
        field: error.field
      };
      dispatch({ type: 'REGISTER_FAILURE', payload: authError });
      throw authError;
    }
  };

  const logout = (): void => {
    // Remover tokens del localStorage solo en el cliente
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
    
    // Limpiar estado
    dispatch({ type: 'LOGOUT' });
    
    // Opcional: notificar al servidor sobre el logout
    authService.logout().catch(console.error);
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const user = await authService.getCurrentUser();
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      // Si falla la actualización, hacer logout
      logout();
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
