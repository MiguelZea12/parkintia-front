'use client';

import { useState, useCallback } from 'react';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

export const useAuthForm = () => {
  const { login, register, error, isLoading, clearError } = useAuth();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateLoginForm = useCallback((credentials: LoginCredentials): boolean => {
    const errors: Record<string, string> = {};

    if (!credentials.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'El email no es válido';
    }

    if (!credentials.password) {
      errors.password = 'La contraseña es requerida';
    } else if (credentials.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  const validateRegisterForm = useCallback((credentials: RegisterCredentials): boolean => {
    const errors: Record<string, string> = {};

    if (!credentials.name) {
      errors.name = 'El nombre es requerido';
    } else if (credentials.name.length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!credentials.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'El email no es válido';
    }

    if (!credentials.password) {
      errors.password = 'La contraseña es requerida';
    } else if (credentials.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!credentials.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    clearError();
    setFormErrors({});

    if (!validateLoginForm(credentials)) {
      return false;
    }

    try {
      await login(credentials);
      return true;
    } catch (error) {
      return false;
    }
  }, [login, validateLoginForm, clearError]);

  const handleRegister = useCallback(async (credentials: RegisterCredentials) => {
    clearError();
    setFormErrors({});

    if (!validateRegisterForm(credentials)) {
      return false;
    }

    try {
      await register(credentials);
      return true;
    } catch (error) {
      return false;
    }
  }, [register, validateRegisterForm, clearError]);

  const clearFormErrors = useCallback(() => {
    setFormErrors({});
    clearError();
  }, [clearError]);

  return {
    handleLogin,
    handleRegister,
    formErrors,
    authError: error,
    isLoading,
    clearFormErrors,
    validateLoginForm,
    validateRegisterForm
  };
};
