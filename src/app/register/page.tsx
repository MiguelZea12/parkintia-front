'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuthRoute } from '@/hooks/useAuthRedirect';
import { useLanguage } from '@/context/LanguageContext';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '@/config/routes';
import { COLORS } from '@/config/colors';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  // Redirigir si ya está autenticado
  const { isLoading } = useAuthRoute(PROTECTED_ROUTES.DASHBOARD);

  const handleRegisterSuccess = () => {
    router.push(PROTECTED_ROUTES.DASHBOARD);
  };

  const goToLogin = () => {
    router.push(PUBLIC_ROUTES.LOGIN);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.gradients.primary }}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient Background with Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden"
        style={{ background: COLORS.gradients.primary }}
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
              style={{ backgroundColor: COLORS.secondary.white, color: COLORS.primary.dark }}
            >
              P
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              PARKINTIA
            </h1>
          </div>
          
          {/* Welcome Message */}
          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-4">
              {t('joinUsToday')}
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              {t('createAccountDescription')}
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-4 text-white/90">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Find parking spots instantly</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Reserve in advance</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Save time and money</span>
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

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{ background: COLORS.gradients.primary, color: COLORS.secondary.white }}
            >
              P
            </div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.text.dark }}>
              PARKINTIA
            </h1>
          </div>

          {/* Register Form */}
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onToggleMode={goToLogin}
          />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: COLORS.text.light }}>
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
