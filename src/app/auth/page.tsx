'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuthRoute } from '@/hooks/useAuthRedirect';
import { useLanguage } from '@/context/LanguageContext';
import { PROTECTED_ROUTES } from '@/config/routes';
import { COLORS } from '@/config/colors';

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();
  
  // Redirigir si ya está autenticado
  const { isLoading, isAuthenticated, shouldRender } = useAuthRoute(PROTECTED_ROUTES.DASHBOARD);

  const handleAuthSuccess = () => {
    // useAuthRoute manejará la redirección automáticamente
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  // Mostrar loader si está verificando autenticación o ya está autenticado
  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.light.accent }}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  // No renderizar si no debería mostrarse
  if (!shouldRender) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient Background with Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden"
        style={{ background: COLORS.light.accent }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div 
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: COLORS.light.surface, color: COLORS.light.primary }}
            >
              P
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              PARKINTIA
            </h1>
          </div>
          
          {/* Dynamic Welcome Message */}
          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-4">
              {isLoginMode ? t('welcomeBack') : t('joinUsToday')}
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              {isLoginMode 
                ? t('signInDescription')
                : t('createAccountDescription')
              }
            </p>
          </div>

          {/* Mode Toggle Indicator */}
          <div className="mt-8 flex justify-center space-x-8">
            <div className={`text-center transition-all duration-300 ${isLoginMode ? 'opacity-100' : 'opacity-50'}`}>
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="text-sm">{t('signIn')}</span>
            </div>
            <div className={`text-center transition-all duration-300 ${!isLoginMode ? 'opacity-100' : 'opacity-50'}`}>
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-sm">{t('signUp')}</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{ background: COLORS.light.accent, color: COLORS.light.surface }}
            >
              P
            </div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.light.textPrimary }}>
              PARKINTIA
            </h1>
          </div>

          {/* Form with smooth transition */}
          <div className="transition-all duration-500 ease-in-out">
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
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: COLORS.light.textSecondary }}>
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
