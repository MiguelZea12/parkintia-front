'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuthRoute } from '@/hooks/useAuthRedirect';
import { PROTECTED_ROUTES } from '@/config/routes';

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();
  
  // Redirigir si ya está autenticado
  const { isLoading } = useAuthRoute(PROTECTED_ROUTES.DASHBOARD);

  const handleAuthSuccess = () => {
    router.push(PROTECTED_ROUTES.DASHBOARD);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Parkintia
          </h1>
          <p className="text-gray-600">
            Tu solución inteligente de parking
          </p>
        </div>

        {/* Form */}
        <div className="transition-all duration-300 ease-in-out">
          {isLoginMode ? (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onToggleMode={toggleMode}
            />
          ) : (
            <RegisterForm
              onSuccess={handleAuthSuccess}
              onToggleMode={toggleMode}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Parkintia. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
