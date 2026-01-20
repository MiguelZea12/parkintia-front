'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuthRoute } from '@/hooks/useAuthRedirect';
import { useLanguage } from '@/context/LanguageContext';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '@/config/routes';
import { COLORS } from '@/config/colors';
import { ParkingCircle, MapPin, Clock, DollarSign } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  
  // Redirigir si ya está autenticado
  const { isLoading, isAuthenticated, shouldRender } = useAuthRoute(PROTECTED_ROUTES.DASHBOARD);

  const handleRegisterSuccess = () => {
    // useAuthRoute manejará la redirección automáticamente
  };

  const goToLogin = () => {
    router.push(PUBLIC_ROUTES.LOGIN);
  };

  // Mostrar loader si está verificando autenticación o ya está autenticado
  if (isLoading || isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  // No renderizar si no debería mostrarse
  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className="min-h-screen flex transition-colors duration-300"
      style={{ backgroundColor: colors.background }}
    >
      {/* Left side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
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
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              <ParkingCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              PARKINTIA
            </h1>
            <p className="text-lg text-white opacity-80">
              Smart Parking System
            </p>
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
              <MapPin className="w-5 h-5" />
              <span>Encuentra espacios al instante</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-5 h-5" />
              <span>Reserva con anticipación</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <DollarSign className="w-5 h-5" />
              <span>Ahorra tiempo y dinero</span>
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
      <div 
        className="w-full lg:w-1/2 flex items-center justify-center p-8 transition-colors duration-300"
        style={{ backgroundColor: colors.background }}
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: colors.accent }}
            >
              <ParkingCircle className="w-8 h-8 text-white" />
            </div>
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ color: colors.textPrimary }}
            >
              PARKINTIA
            </h1>
            <p 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Smart Parking System
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onToggleMode={goToLogin}
          />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p 
              className="text-xs"
              style={{ color: colors.textSecondary }}
            >
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
